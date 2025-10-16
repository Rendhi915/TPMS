const pool = require('../config/database');
const { broadcastSensorUpdate } = require('../services/websocketService');

// ==========================================
// SENSOR DATA INGESTION CONTROLLER
// ==========================================

async function resolveDeviceSnByTruckId(truckId) {
  if (!truckId) return null;
  try {
    const q = `
      SELECT sn FROM device
      WHERE truck_id = $1
      AND (removed_at IS NULL OR removed_at > NOW())
      ORDER BY installed_at DESC
      LIMIT 1
    `;
    const r = await pool.query(q, [truckId]);
    return r.rows[0]?.sn || null;
  } catch (e) {
    console.log('resolveDeviceSnByTruckId error:', e.message);
    return null;
  }
}

async function resolveTruckIdByAlternateKeys({
  truckId,
  truck_id,
  truckCode,
  code,
  truckName,
  name,
}) {
  // If we already have a UUID, return it
  if (truckId) return truckId;
  if (truck_id) return truck_id;
  try {
    // Try by code first
    if (truckCode || code) {
      const q = `SELECT id FROM truck WHERE code = $1 LIMIT 1`;
      const r = await pool.query(q, [truckCode || code]);
      if (r.rows[0]?.id) return r.rows[0].id;
    }
    // Then by name
    if (truckName || name) {
      const q2 = `SELECT id FROM truck WHERE name = $1 LIMIT 1`;
      const r2 = await pool.query(q2, [truckName || name]);
      if (r2.rows[0]?.id) return r2.rows[0].id;
    }
  } catch (e) {
    console.log('resolveTruckIdByAlternateKeys error:', e.message);
  }
  return null;
}

const ingestTirePressureData = async (req, res) => {
  try {
    const sensorData = req.body;
    const payload = sensorData.data || sensorData; // support both shapes

    // Accept multiple input shapes: { sn, data: {...} } or { deviceSn, ... } or { truckId, ... }
    let deviceSn = sensorData.sn || sensorData.deviceSn || null;
    const resolvedTruckId = await resolveTruckIdByAlternateKeys({
      truckId: sensorData.truckId,
      truck_id: sensorData.truck_id,
      truckCode: sensorData.truckCode,
      code: sensorData.code,
      truckName: sensorData.truckName,
      name: sensorData.name,
    });
    if (!deviceSn && resolvedTruckId) {
      deviceSn = await resolveDeviceSnByTruckId(resolvedTruckId);
    }

    if (!deviceSn) {
      // As a fallback, create a virtual device SN tied to the truckId so data can still be queued
      if (
        resolvedTruckId ||
        sensorData.truckId ||
        sensorData.truck_id ||
        sensorData.truckCode ||
        sensorData.code ||
        sensorData.truckName ||
        sensorData.name
      ) {
        const ident =
          resolvedTruckId ||
          sensorData.truckId ||
          sensorData.truck_id ||
          sensorData.truckCode ||
          sensorData.code ||
          sensorData.truckName ||
          sensorData.name;
        deviceSn = `virtual-${ident}`;
      } else {
        return res.status(400).json({
          success: false,
          message:
            'Missing device serial number (sn). Provide sn/deviceSn or a valid truckId with an assigned device.',
        });
      }
    }

    // Prepare raw JSON data with all fields preserved
    const rawJsonData = {
      sn: deviceSn,
      truckId: resolvedTruckId || null,
      simNumber: sensorData.simNumber || payload.simNumber || null,
      data: {
        tireNo: payload.tireNo || null,
        exType: payload.exType || null,
        tiprValue: payload.tiprValue || payload.pressureKpa || payload.pressure || null,
        tempValue: payload.tempValue || payload.tempCelsius || null,
        bat: payload.bat || payload.battery_level || null,
      },
    };

    // Insert raw sensor data first
    const rawDataQuery = `
      INSERT INTO sensor_data_raw (device_sn, cmd_type, raw_json, received_at, truck_id)
      VALUES ($1, 'tpdata', $2, NOW(), $3)
      RETURNING id
    `;

    const rawResult = await pool.query(rawDataQuery, [
      deviceSn,
      JSON.stringify(rawJsonData),
      resolvedTruckId || null,
    ]);

    // Broadcast real-time update via WebSocket
    try {
      broadcastSensorUpdate({
        type: 'tire_pressure',
        deviceSn: deviceSn,
        data: {
          tireNo: payload.tireNo,
          pressure: payload.tiprValue ?? payload.pressureKpa ?? payload.pressure ?? null,
          temperature: payload.tempValue ?? payload.tempCelsius ?? null,
          battery: payload.bat ?? null,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Tire pressure data received successfully',
      data: {
        rawDataId: rawResult.rows[0].id,
        deviceSn: deviceSn,
        processingStatus: 'queued',
      },
    });
  } catch (error) {
    console.error('Error ingesting tire pressure data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ingest tire pressure data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const ingestHubTemperatureData = async (req, res) => {
  try {
    const sensorData = req.body;
    const payload = sensorData.data || sensorData;

    // Prepare raw JSON data with all fields preserved
    const rawJsonData = {
      sn: sensorData.sn,
      simNumber: sensorData.simNumber || payload.simNumber || null,
      dataType: sensorData.dataType || payload.dataType || null,
      data: {
        tireNo: payload.tireNo || payload.hub_no || null,
        exType: payload.exType || null,
        tempValue: payload.tempValue || payload.tempCelsius || payload.temp_celsius || null,
        bat: payload.bat || payload.battery_level || null,
      },
    };

    // Insert raw sensor data
    const rawDataQuery = `
      INSERT INTO sensor_data_raw (device_sn, cmd_type, raw_json, received_at)
      VALUES ($1, 'hubdata', $2, NOW())
      RETURNING id
    `;

    const rawResult = await pool.query(rawDataQuery, [sensorData.sn, JSON.stringify(rawJsonData)]);

    // Broadcast real-time update
    try {
      broadcastSensorUpdate({
        type: 'hub_temperature',
        deviceSn: sensorData.sn,
        data: {
          tireNo: sensorData.data.tireNo,
          temperature: sensorData.data.tempValue,
          battery: sensorData.data.bat,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Hub temperature data received successfully',
      data: {
        rawDataId: rawResult.rows[0].id,
        deviceSn: sensorData.sn,
        processingStatus: 'queued',
      },
    });
  } catch (error) {
    console.error('Error ingesting hub temperature data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ingest hub temperature data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const ingestDeviceStatusData = async (req, res) => {
  try {
    const sensorData = req.body;
    const payload = sensorData.data || sensorData;

    // Prepare raw JSON data with all fields preserved
    const rawJsonData = {
      sn: sensorData.sn,
      data: {
        lng: payload.lng || payload.longitude || null,
        lat: payload.lat || payload.latitude || null,
        bat1: payload.bat1 || payload.host_bat || null,
        bat2: payload.bat2 || payload.repeater1_bat || null,
        bat3: payload.bat3 || payload.repeater2_bat || null,
        lock: payload.lock || payload.lock_state || null,
      },
    };

    // Insert raw sensor data
    const rawDataQuery = `
      INSERT INTO sensor_data_raw (device_sn, cmd_type, raw_json, received_at)
      VALUES ($1, 'device', $2, NOW())
      RETURNING id
    `;

    const rawResult = await pool.query(rawDataQuery, [sensorData.sn, JSON.stringify(rawJsonData)]);

    // Broadcast GPS update immediately for real-time tracking
    try {
      broadcastSensorUpdate({
        type: 'gps_update',
        deviceSn: sensorData.sn,
        data: {
          longitude: sensorData.data.lng,
          latitude: sensorData.data.lat,
          batteryLevels: {
            host: sensorData.data.bat1,
            repeater1: sensorData.data.bat2,
            repeater2: sensorData.data.bat3,
          },
          lockState: sensorData.data.lock,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Device status data received successfully',
      data: {
        rawDataId: rawResult.rows[0].id,
        deviceSn: sensorData.sn,
        processingStatus: 'queued',
      },
    });
  } catch (error) {
    console.error('Error ingesting device status data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ingest device status data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const ingestLockStateData = async (req, res) => {
  try {
    const sensorData = req.body;
    const payload = sensorData.data || sensorData;

    // Prepare raw JSON data with all fields preserved
    const rawJsonData = {
      sn: sensorData.sn,
      data: {
        is_lock: payload.is_lock || payload.isLocked || null,
      },
    };

    // Insert raw sensor data
    const rawDataQuery = `
      INSERT INTO sensor_data_raw (device_sn, cmd_type, raw_json, received_at)
      VALUES ($1, 'state', $2, NOW())
      RETURNING id
    `;

    const rawResult = await pool.query(rawDataQuery, [sensorData.sn, JSON.stringify(rawJsonData)]);

    // Broadcast lock state update
    try {
      broadcastSensorUpdate({
        type: 'lock_state',
        deviceSn: sensorData.sn,
        data: {
          isLocked: sensorData.data.is_lock,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Lock state data received successfully',
      data: {
        rawDataId: rawResult.rows[0].id,
        deviceSn: sensorData.sn,
        processingStatus: 'queued',
      },
    });
  } catch (error) {
    console.error('Error ingesting lock state data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ingest lock state data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const ingestRawSensorData = async (req, res) => {
  try {
    const { deviceSn, cmdType, data } = req.body;

    // Validate required fields
    if (!deviceSn || !cmdType || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: deviceSn, cmdType, data',
      });
    }

    // Insert raw sensor data
    const rawDataQuery = `
      INSERT INTO sensor_data_raw (device_sn, cmd_type, raw_json, received_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id
    `;

    const rawResult = await pool.query(rawDataQuery, [
      deviceSn,
      cmdType,
      JSON.stringify({ sn: deviceSn, cmd: cmdType, data }),
    ]);

    res.status(201).json({
      success: true,
      message: 'Raw sensor data received successfully',
      data: {
        rawDataId: rawResult.rows[0].id,
        deviceSn: deviceSn,
        cmdType: cmdType,
        processingStatus: 'queued',
      },
    });
  } catch (error) {
    console.error('Error ingesting raw sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ingest raw sensor data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// QUEUE MANAGEMENT
// ==========================================

const getQueueStats = async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_items,
        COUNT(*) FILTER (WHERE processed = false) as pending_items,
        COUNT(*) FILTER (WHERE processed = true) as processed_items,
        COUNT(*) FILTER (WHERE cmd_type = 'device') as gps_items,
        COUNT(*) FILTER (WHERE cmd_type = 'tpdata') as tire_pressure_items,
        COUNT(*) FILTER (WHERE cmd_type = 'hubdata') as hub_temp_items,
        COUNT(*) FILTER (WHERE cmd_type = 'state') as lock_state_items,
        MIN(received_at) as oldest_item,
        MAX(received_at) as newest_item
      FROM sensor_data_raw
      WHERE received_at >= NOW() - INTERVAL '24 hours'
    `;

    const result = await pool.query(statsQuery);
    const stats = result.rows[0];

    // Get processing performance stats
    const performanceQuery = `
      SELECT * FROM get_queue_stats()
    `;

    let performanceStats = {};
    try {
      const perfResult = await pool.query(performanceQuery);
      performanceStats = perfResult.rows[0] || {};
    } catch (perfError) {
      console.log('Performance stats not available:', perfError.message);
    }

    res.status(200).json({
      success: true,
      data: {
        queue: {
          totalItems: parseInt(stats.total_items),
          pendingItems: parseInt(stats.pending_items),
          processedItems: parseInt(stats.processed_items),
          oldestItem: stats.oldest_item,
          newestItem: stats.newest_item,
        },
        breakdown: {
          gpsItems: parseInt(stats.gps_items),
          tirePressureItems: parseInt(stats.tire_pressure_items),
          hubTempItems: parseInt(stats.hub_temp_items),
          lockStateItems: parseInt(stats.lock_state_items),
        },
        performance: performanceStats,
      },
      message: 'Queue statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting queue stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get queue statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const processQueue = async (req, res) => {
  try {
    const { batchSize = 100 } = req.body;

    // Validate batch size
    if (batchSize > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Batch size cannot exceed 1000',
      });
    }

    // Process queue batch
    const processQuery = `SELECT * FROM process_sensor_queue_batch($1)`;
    const result = await pool.query(processQuery, [batchSize]);

    const processResult = result.rows[0];

    res.status(200).json({
      success: true,
      data: {
        processedCount: processResult.processed_count,
        errorCount: processResult.error_count,
        batchSize: batchSize,
      },
      message: `Processed ${processResult.processed_count} sensor data items`,
    });
  } catch (error) {
    console.error('Error processing queue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process sensor queue',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// GET LAST RETRIEVED DATA
// ==========================================

const getLastRetrievedData = async (req, res) => {
  try {
    const { limit = 15, cmd_type, device_sn } = req.query;

    // Build WHERE clause
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (cmd_type) {
      conditions.push(`cmd_type = $${paramIndex}`);
      params.push(cmd_type);
      paramIndex++;
    }

    if (device_sn) {
      conditions.push(`device_sn = $${paramIndex}`);
      params.push(device_sn);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Query to get last retrieved data from sensor_data_raw
    const query = `
      SELECT 
        CAST(ROW_NUMBER() OVER (ORDER BY received_at DESC) AS INTEGER) as id,
        device_sn as sn,
        cmd_type as cmd,
        received_at as "createdAt",
        raw_json
      FROM sensor_data_raw
      ${whereClause}
      ORDER BY received_at DESC
      LIMIT $${paramIndex}
    `;

    params.push(parseInt(limit));

    const result = await pool.query(query, params);

    // Format the data according to the expected structure
    const formattedData = result.rows.map((row) => {
      const baseData = {
        id: row.id,
        sn: row.sn,
        cmd: row.cmd,
        createdAt: row.createdAt,
      };

      // Parse raw_json and extract relevant fields based on cmd type
      const rawData = row.raw_json;

      if (row.cmd === 'tpdata') {
        // Tire pressure data
        const data = rawData.data || rawData;
        return {
          ...baseData,
          simNumber: data.simNumber || rawData.simNumber || null,
          tireNo: data.tireNo || rawData.tireNo || null,
          exType: data.exType || rawData.exType || null,
          tiprValue: data.tiprValue || data.pressureKpa || data.pressure || null,
          tempValue: data.tempValue || data.tempCelsius || null,
          bat: data.bat || data.battery_level || null,
        };
      } else if (row.cmd === 'hubdata') {
        // Hub temperature data
        const data = rawData.data || rawData;
        return {
          ...baseData,
          simNumber: data.simNumber || rawData.simNumber || null,
          dataType: data.dataType || rawData.dataType || null,
          tireNo: data.tireNo || rawData.tireNo || data.hub_no || rawData.hub_no || null,
          exType: data.exType || rawData.exType || null,
          tempValue: data.tempValue || data.tempCelsius || data.temp_celsius || null,
          bat: data.bat || data.battery_level || null,
        };
      } else if (row.cmd === 'device') {
        // GPS/Device status data
        const data = rawData.data || rawData;
        return {
          ...baseData,
          lng: data.lng || data.longitude || null,
          lat: data.lat || data.latitude || null,
          bat1: data.bat1 || data.host_bat || null,
          bat2: data.bat2 || data.repeater1_bat || null,
          bat3: data.bat3 || data.repeater2_bat || null,
          lock: data.lock || data.lock_state || null,
        };
      } else if (row.cmd === 'state') {
        // Lock state data
        const data = rawData.data || rawData;
        return {
          ...baseData,
          is_lock: data.is_lock || data.isLocked || null,
        };
      }

      // Default: return base data with raw_json
      return {
        ...baseData,
        ...rawData,
      };
    });

    res.status(200).json({
      message: 'Data retrieved successfully',
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    console.error('Error getting last retrieved data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sensor data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = {
  ingestTirePressureData,
  ingestHubTemperatureData,
  ingestDeviceStatusData,
  ingestLockStateData,
  ingestRawSensorData,
  getQueueStats,
  processQueue,
  getLastRetrievedData,
};
