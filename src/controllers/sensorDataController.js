// Controller for processing raw sensor data from vendor
const { PrismaClient } = require('../../prisma/generated/client');
const prisma = new PrismaClient();

/**
 * Process incoming sensor data from vendor
 * Handles 4 command types: tpdata, hubdata, device, state
 *
 * Expected JSON format:
 * {
 *   "cmd": "tpdata|hubdata|device|state",
 *   "sn": "device_serial_number",
 *   "data": { ... command-specific data ... }
 * }
 */
async function processSensorData(req, res) {
  try {
    const { cmd, sn, data } = req.body;

    // Validate required fields
    if (!cmd || !sn || !data) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: cmd, sn, data',
      });
    }

    // Store raw data first for audit trail
    const rawDataRecord = await prisma.sensor_data_raw.create({
      data: {
        device_sn: sn,
        cmd_type: cmd,
        raw_json: data,
        processed: false,
      },
    });

    // Find device by serial number
    const device = await prisma.device.findUnique({
      where: { sn },
      include: {
        truck: true,
        sensor: true,
      },
    });

    if (!device) {
      // Mark raw data as processed (even though failed) so it doesn't retry
      await prisma.sensor_data_raw.update({
        where: { id: rawDataRecord.id },
        data: {
          processed: true,
        },
      });

      return res.status(404).json({
        success: false,
        error: `Device not found for SN: ${sn}`,
        rawDataId: rawDataRecord.id,
      });
    }

    let result;

    // Process based on command type
    switch (cmd.toLowerCase()) {
      case 'tpdata':
        result = await processTireData(device, data, rawDataRecord.id);
        break;

      case 'hubdata':
        result = await processHubData(device, data, rawDataRecord.id);
        break;

      case 'device':
        result = await processDeviceData(device, data, rawDataRecord.id);
        break;

      case 'state':
        result = await processStateData(device, data, rawDataRecord.id);
        break;

      default:
        await prisma.sensor_data_raw.update({
          where: { id: rawDataRecord.id },
          data: {
            processed: true,
          },
        });

        return res.status(400).json({
          success: false,
          error: `Unknown command type: ${cmd}`,
          rawDataId: rawDataRecord.id,
        });
    }

    // Mark raw data as processed
    await prisma.sensor_data_raw.update({
      where: { id: rawDataRecord.id },
      data: { processed: true },
    });

    return res.status(200).json({
      success: true,
      message: `Data processed successfully for command: ${cmd}`,
      rawDataId: rawDataRecord.id,
      result,
    });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}

/**
 * Process tire pressure and temperature data (tpdata)
 * Maps: tiprValue -> pressure_kpa, tempValue -> temp_celsius, tireNo -> tire_no
 */
async function processTireData(device, data, _rawDataId) {
  const records = [];

  // Data can be single object or array
  const dataArray = Array.isArray(data) ? data : [data];

  for (const item of dataArray) {
    const recordData = {
      device_id: device.id,
      truck_id: device.truck_id,
      tire_no: item.tireNo || item.tire_no,
      pressure_kpa: item.tiprValue || item.pressure_kpa,
      temp_celsius: item.tempValue || item.temp_celsius,
      ex_type: item.exType || item.ex_type || '1,3',
      battery_level: item.bat || item.battery_level,
    };

    // Only add raw_data_id if the field exists in schema
    // This allows the code to work even before migration
    // if (rawDataId) {
    //   recordData.raw_data_id = rawDataId;
    // }

    const record = await prisma.tire_pressure_event.create({
      data: recordData,
    });
    records.push(record);
  }

  return {
    type: 'tire_pressure_event',
    count: records.length,
    records: records.map((r) => r.id),
  };
}

/**
 * Process hub temperature data (hubdata)
 * Maps: tempValue -> temp_celsius, tireNo -> hub_no
 */
async function processHubData(device, data, _rawDataId) {
  const records = [];

  const dataArray = Array.isArray(data) ? data : [data];

  for (const item of dataArray) {
    const recordData = {
      device_id: device.id,
      truck_id: device.truck_id,
      hub_no: item.tireNo || item.hub_no,
      temp_celsius: item.tempValue || item.temp_celsius,
      battery_level: item.bat || item.battery_level,
    };

    // Only add raw_data_id if the field exists in schema
    // if (rawDataId) {
    //   recordData.raw_data_id = rawDataId;
    // }

    const record = await prisma.hub_temperature_event.create({
      data: recordData,
    });
    records.push(record);
  }

  return {
    type: 'hub_temperature_event',
    count: records.length,
    records: records.map((r) => r.id),
  };
}

/**
 * Process device GPS and battery data (device)
 * Creates both GPS position and device status records
 * Maps: lng/lat -> pos (PostGIS), bat1 -> host_bat, bat2 -> repeater1_bat, bat3 -> repeater2_bat
 */
async function processDeviceData(device, data, _rawDataId) {
  const results = { gps: null, deviceStatus: null };

  // Process GPS data if coordinates are present
  if (data.lng && data.lat) {
    // Use raw SQL for PostGIS geography insertion
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO gps_position (device_id, truck_id, ts, pos, speed_kph, heading_deg, hdop, source)
      VALUES ($1::uuid, $2::uuid, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography, $6, $7, $8, $9)
    `,
      device.id,
      device.truck_id,
      data.ts ? new Date(data.ts) : new Date(),
      data.lng,
      data.lat,
      data.speed || null,
      data.heading || null,
      data.hdop || null,
      'vendor'
    );

    results.gps = 'created';
  }

  // Process device battery status if battery data is present
  if (
    data.bat1 !== undefined ||
    data.bat2 !== undefined ||
    data.bat3 !== undefined ||
    data.lock !== undefined
  ) {
    const statusData = {
      device_id: device.id,
      truck_id: device.truck_id,
      host_bat: data.bat1,
      repeater1_bat: data.bat2,
      repeater2_bat: data.bat3,
      lock_state: data.lock,
    };

    // Only add raw_data_id if the field exists in schema
    // if (rawDataId) {
    //   statusData.raw_data_id = rawDataId;
    // }

    const statusRecord = await prisma.device_status_event.create({
      data: statusData,
    });

    results.deviceStatus = statusRecord.id;
  }

  return {
    type: 'device_data',
    gps: results.gps,
    deviceStatus: results.deviceStatus,
  };
}

/**
 * Process lock state data (state)
 * Maps: is_lock -> is_lock
 */
async function processStateData(device, data, _rawDataId) {
  const recordData = {
    device_id: device.id,
    truck_id: device.truck_id,
    is_lock: data.is_lock !== undefined ? data.is_lock : data.lock,
  };

  // Only add raw_data_id if the field exists in schema
  // if (rawDataId) {
  //   recordData.raw_data_id = rawDataId;
  // }

  const record = await prisma.lock_event.create({
    data: recordData,
  });

  return {
    type: 'lock_event',
    id: record.id,
    isLock: record.is_lock,
  };
}

/**
 * Process bulk sensor data
 * Accepts array of sensor data records
 */
async function processBulkSensorData(req, res) {
  try {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Expected array of data records',
      });
    }

    const results = {
      success: [],
      failed: [],
    };

    for (const record of data) {
      try {
        // Process each record individually
        const { cmd, sn, data: itemData } = record;

        if (!cmd || !sn || !itemData) {
          results.failed.push({
            record,
            error: 'Missing required fields',
          });
          continue;
        }

        // Store raw data
        const rawDataRecord = await prisma.sensor_data_raw.create({
          data: {
            device_sn: sn,
            cmd_type: cmd,
            raw_json: itemData,
            processed: false,
          },
        });

        // Find device
        const device = await prisma.device.findUnique({
          where: { sn },
          include: {
            truck: true,
            sensor: true,
          },
        });

        if (!device) {
          await prisma.sensor_data_raw.update({
            where: { id: rawDataRecord.id },
            data: {
              processed: true,
            },
          });

          results.failed.push({
            record,
            error: `Device not found for SN: ${sn}`,
          });
          continue;
        }

        // Process based on command
        let result;
        switch (cmd.toLowerCase()) {
          case 'tpdata':
            result = await processTireData(device, itemData, rawDataRecord.id);
            break;
          case 'hubdata':
            result = await processHubData(device, itemData, rawDataRecord.id);
            break;
          case 'device':
            result = await processDeviceData(device, itemData, rawDataRecord.id);
            break;
          case 'state':
            result = await processStateData(device, itemData, rawDataRecord.id);
            break;
          default:
            await prisma.sensor_data_raw.update({
              where: { id: rawDataRecord.id },
              data: {
                processed: true,
              },
            });
            results.failed.push({
              record,
              error: `Unknown command type: ${cmd}`,
            });
            continue;
        }

        // Mark as processed
        await prisma.sensor_data_raw.update({
          where: { id: rawDataRecord.id },
          data: { processed: true },
        });

        results.success.push({
          cmd,
          sn,
          rawDataId: rawDataRecord.id,
          result,
        });
      } catch (error) {
        results.failed.push({
          record,
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Bulk processing completed',
      summary: {
        total: data.length,
        success: results.success.length,
        failed: results.failed.length,
      },
      results,
    });
  } catch (error) {
    console.error('Error processing bulk sensor data:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}

/**
 * Get unprocessed sensor data
 */
async function getUnprocessedData(req, res) {
  try {
    const { limit = 100, cmd_type } = req.query;

    const where = {
      processed: false,
    };

    if (cmd_type) {
      where.cmd_type = cmd_type;
    }

    const unprocessed = await prisma.sensor_data_raw.findMany({
      where,
      take: parseInt(limit),
      orderBy: { received_at: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: unprocessed.length,
      data: unprocessed,
    });
  } catch (error) {
    console.error('Error fetching unprocessed data:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}

module.exports = {
  processSensorData,
  processBulkSensorData,
  getUnprocessedData,
};
