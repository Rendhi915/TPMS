const { PrismaClient } = require('../../prisma/generated/client');
const prisma = new PrismaClient();

// ==========================================
// IOT DATA CONTROLLER - UNIFIED ENDPOINT
// ==========================================
/**
 * Single endpoint with TWO PATHS:
 *
 * PATH 1: IoT Hardware Data (no 'method' field)
 *   Format: { sn: "...", cmd: "tpdata|hubdata|device|state", data: {...} }
 *   Purpose: Save live sensor/device readings
 *
 * PATH 2: Admin CRUD Operations (has 'method' field)
 *   Format: { cmd: "device|sensor", method: "create|read|update|delete", data: {...} }
 *   Purpose: Manage master data (device/sensor records)
 */

const handleIoTData = async (req, res) => {
  try {
    console.log('📥 [IoT Data] Request:', JSON.stringify(req.body, null, 2));

    const { sn, cmd, method, data } = req.body;

    if (!cmd) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: cmd',
      });
    }

    console.log(`📡 [IoT] cmd: ${cmd}, method: ${method || 'none (IoT Hardware)'}`);

    // =============================================
    // PATH 1: IoT Hardware Data (No method)
    // =============================================
    if (!method) {
      if (!sn || !data) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields for IoT hardware: sn, data',
        });
      }

      switch (cmd.toLowerCase()) {
        case 'tpdata':
          return await handleTPData(sn, data, res);
        case 'hubdata':
          return await handleHubData(sn, data, res);
        case 'device':
          return await handleDeviceData(sn, data, res);
        case 'state':
          return await handleStateData(sn, data, res);
        default:
          return res.status(400).json({
            success: false,
            message: `Invalid cmd for IoT hardware: ${cmd}`,
            error: 'cmd must be: tpdata, hubdata, device, state',
          });
      }
    }

    // =============================================
    // PATH 2: Admin CRUD Operations (Has method)
    // =============================================
    else {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: data',
        });
      }

      switch (cmd.toLowerCase()) {
        case 'device':
          return await handleDeviceCRUD(method, data, res);
        case 'sensor':
          return await handleSensorCRUD(method, data, res);
        default:
          return res.status(400).json({
            success: false,
            message: `Invalid cmd for CRUD: ${cmd}`,
            error: 'cmd must be: device, sensor',
          });
      }
    }
  } catch (error) {
    console.error('❌ Error in handleIoTData:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process IoT data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// PATH 1: IoT HARDWARE DATA HANDLERS
// ==========================================

/**
 * TPDATA - Tire Pressure & Temperature Data
 * Payload: { sn: "SENSOR123", cmd: "tpdata", data: { tireNo, tiprValue, tempValue, exType, bat, simNumber } }
 */
const handleTPData = async (sn, data, res) => {
  try {
    const { tireNo, tiprValue, tempValue, exType, bat, simNumber } = data;

    const sensor = await prisma.sensor.findUnique({
      where: { sn },
      include: {
        device: {
          include: {
            truck: { select: { id: true, plate: true, name: true } },
          },
        },
      },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: `Sensor not found: ${sn}`,
      });
    }

    const updateData = { updated_at: new Date() };
    if (tiprValue !== undefined) updateData.tirepValue = parseFloat(tiprValue);
    if (tempValue !== undefined) updateData.tempValue = parseFloat(tempValue);
    if (exType !== undefined) updateData.exType = exType;
    if (bat !== undefined) updateData.bat = parseInt(bat);
    if (tireNo !== undefined) updateData.tireNo = parseInt(tireNo);
    if (simNumber !== undefined) updateData.simNumber = simNumber;

    const updated = await prisma.sensor.update({
      where: { sn },
      data: updateData,
    });

    console.log(`✅ [TPDATA] Sensor ${sn} - Temp:${tempValue}°C Press:${tiprValue}kPa`);

    res.status(200).json({
      success: true,
      data: {
        sensor_id: updated.id,
        sensor_sn: sn,
        tireNo: updated.tireNo,
        device_id: sensor.device_id,
        truck_id: sensor.device.truck_id,
        truck_plate: sensor.device.truck?.plate,
        tempValue: updated.tempValue,
        tirepValue: updated.tirepValue,
        exType: updated.exType,
        bat: updated.bat,
        updated_at: updated.updated_at,
      },
      message: 'Sensor data updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleTPData:', error);
    throw error;
  }
};

/**
 * HUBDATA - Hub Temperature Data
 * Payload: { sn: "SENSOR123", cmd: "hubdata", data: { tireNo, tempValue, exType, bat, simNumber } }
 */
const handleHubData = async (sn, data, res) => {
  try {
    const { tireNo, tempValue, exType, bat, simNumber } = data;

    const sensor = await prisma.sensor.findUnique({
      where: { sn },
      include: {
        device: {
          include: {
            truck: { select: { id: true, plate: true, name: true } },
          },
        },
      },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: `Sensor not found: ${sn}`,
      });
    }

    const updateData = { updated_at: new Date() };
    if (tempValue !== undefined) updateData.tempValue = parseFloat(tempValue);
    if (exType !== undefined) updateData.exType = exType;
    if (bat !== undefined) updateData.bat = parseInt(bat);
    if (tireNo !== undefined) updateData.tireNo = parseInt(tireNo);
    if (simNumber !== undefined) updateData.simNumber = simNumber;

    const updated = await prisma.sensor.update({
      where: { sn },
      data: updateData,
    });

    console.log(`✅ [HUBDATA] Sensor ${sn} - Hub Temp:${tempValue}°C`);

    res.status(200).json({
      success: true,
      data: {
        sensor_id: updated.id,
        sensor_sn: sn,
        tireNo: updated.tireNo,
        device_id: sensor.device_id,
        truck_id: sensor.device.truck_id,
        truck_plate: sensor.device.truck?.plate,
        tempValue: updated.tempValue,
        exType: updated.exType,
        bat: updated.bat,
        updated_at: updated.updated_at,
      },
      message: 'Hub sensor data updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleHubData:', error);
    throw error;
  }
};

/**
 * DEVICE - Device Location & Battery Data
 * Payload: { sn: "DEVICE123", cmd: "device", data: { lng, lat, bat1, bat2, bat3, lock } }
 */
const handleDeviceData = async (sn, data, res) => {
  try {
    const { lng, lat, bat1, bat2, bat3, lock } = data;

    const device = await prisma.device.findUnique({
      where: { sn },
      include: {
        truck: { select: { id: true, plate: true, name: true } },
      },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${sn}`,
      });
    }

    // Update device (battery & lock)
    const deviceUpdateData = { updated_at: new Date() };
    if (bat1 !== undefined) deviceUpdateData.bat1 = parseInt(bat1);
    if (bat2 !== undefined) deviceUpdateData.bat2 = parseInt(bat2);
    if (bat3 !== undefined) deviceUpdateData.bat3 = parseInt(bat3);
    if (lock !== undefined) deviceUpdateData.lock = parseInt(lock);

    const updatedDevice = await prisma.device.update({
      where: { sn },
      data: deviceUpdateData,
    });

    // Create new location record if GPS data provided
    let newLocation = null;
    if (lng !== undefined && lat !== undefined) {
      newLocation = await prisma.location.create({
        data: {
          device_id: device.id,
          lat: parseFloat(lat),
          long: parseFloat(lng),
          recorded_at: new Date(),
        },
      });
    }

    console.log(`✅ [DEVICE] Device ${sn} - GPS:${lat},${lng} Battery:${bat1}/${bat2}/${bat3}`);

    res.status(200).json({
      success: true,
      data: {
        device_id: updatedDevice.id,
        device_sn: sn,
        truck_id: device.truck_id,
        truck_plate: device.truck?.plate,
        bat1: updatedDevice.bat1,
        bat2: updatedDevice.bat2,
        bat3: updatedDevice.bat3,
        lock: updatedDevice.lock,
        location: newLocation
          ? {
              location_id: newLocation.id,
              lat: newLocation.lat,
              lng: newLocation.long,
              recorded_at: newLocation.recorded_at,
            }
          : null,
        updated_at: updatedDevice.updated_at,
      },
      message: 'Device data updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleDeviceData:', error);
    throw error;
  }
};

/**
 * STATE - Device Lock Status
 * Payload: { sn: "DEVICE123", cmd: "state", data: { is_lock: 1 } }
 */
const handleStateData = async (sn, data, res) => {
  try {
    const { is_lock } = data;

    if (is_lock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: is_lock',
      });
    }

    const device = await prisma.device.findUnique({
      where: { sn },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${sn}`,
      });
    }

    const updated = await prisma.device.update({
      where: { sn },
      data: {
        lock: parseInt(is_lock),
        updated_at: new Date(),
      },
    });

    console.log(`✅ [STATE] Device ${sn} - Lock:${is_lock}`);

    res.status(200).json({
      success: true,
      data: {
        device_id: updated.id,
        device_sn: sn,
        lock: updated.lock,
        updated_at: updated.updated_at,
      },
      message: 'Device lock status updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleStateData:', error);
    throw error;
  }
};

// ==========================================
// PATH 2: ADMIN CRUD OPERATIONS
// ==========================================

/**
 * Device CRUD Handler
 * Routes to: deviceCreate, deviceRead, deviceUpdate, deviceDelete
 */
const handleDeviceCRUD = async (method, data, res) => {
  try {
    switch (method.toLowerCase()) {
      case 'create':
        return await deviceCreate(data, res);
      case 'read':
        return await deviceRead(data, res);
      case 'update':
        return await deviceUpdate(data, res);
      case 'delete':
        return await deviceDelete(data, res);
      default:
        return res.status(400).json({
          success: false,
          message: `Invalid method for device: ${method}`,
          error: 'method must be: create, read, update, delete',
        });
    }
  } catch (error) {
    console.error('❌ Error in handleDeviceCRUD:', error);
    throw error;
  }
};

/**
 * Sensor CRUD Handler
 * Routes to: sensorCreate, sensorRead, sensorUpdate, sensorDelete
 */
const handleSensorCRUD = async (method, data, res) => {
  try {
    switch (method.toLowerCase()) {
      case 'create':
        return await sensorCreate(data, res);
      case 'read':
        return await sensorRead(data, res);
      case 'update':
        return await sensorUpdate(data, res);
      case 'delete':
        return await sensorDelete(data, res);
      default:
        return res.status(400).json({
          success: false,
          message: `Invalid method for sensor: ${method}`,
          error: 'method must be: create, read, update, delete',
        });
    }
  } catch (error) {
    console.error('❌ Error in handleSensorCRUD:', error);
    throw error;
  }
};

// ==========================================
// DEVICE CRUD FUNCTIONS
// ==========================================

const deviceCreate = async (data, res) => {
  try {
    const { truck_id, sn, sim_number, status } = data;

    if (!truck_id || !sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: truck_id, sn',
      });
    }

    // Check if device already exists
    const existing = await prisma.device.findUnique({ where: { sn } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Device with SN ${sn} already exists`,
      });
    }

    // Check if truck exists
    const truck = await prisma.truck.findUnique({ where: { id: truck_id } });
    if (!truck) {
      return res.status(404).json({
        success: false,
        message: `Truck not found: ${truck_id}`,
      });
    }

    const device = await prisma.device.create({
      data: {
        truck_id,
        sn,
        sim_number: sim_number || null,
        status: status || 'active',
        bat1: 0,
        bat2: 0,
        bat3: 0,
        lock: 0,
      },
      include: {
        truck: { select: { id: true, plate: true, name: true } },
      },
    });

    console.log(`✅ [CREATE] Device ${sn} created`);

    res.status(201).json({
      success: true,
      data: device,
      message: 'Device created successfully',
    });
  } catch (error) {
    console.error('❌ Error in deviceCreate:', error);
    throw error;
  }
};

const deviceRead = async (data, res) => {
  try {
    const { id, page = 1, limit = 50, truck_id, status, search } = data;

    // Read single device by ID
    if (id) {
      const device = await prisma.device.findUnique({
        where: { id: parseInt(id) },
        include: {
          truck: { select: { id: true, plate: true, name: true, type: true } },
          sensor: {
            where: { deleted_at: null },
            select: { id: true, sn: true, tireNo: true, sensorNo: true, status: true },
          },
          location: {
            orderBy: { recorded_at: 'desc' },
            take: 10,
          },
        },
      });

      if (!device) {
        return res.status(404).json({
          success: false,
          message: `Device not found: ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: device,
        message: 'Device retrieved successfully',
      });
    }

    // Read list of devices with filters
    const where = { deleted_at: null };
    if (truck_id) where.truck_id = parseInt(truck_id);
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { sn: { contains: search, mode: 'insensitive' } },
        { sim_number: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [devices, total] = await Promise.all([
      prisma.device.findMany({
        where,
        include: {
          truck: { select: { id: true, plate: true, name: true } },
          sensor: {
            where: { deleted_at: null },
            select: { id: true, sn: true, tireNo: true },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.device.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        devices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      message: 'Devices retrieved successfully',
    });
  } catch (error) {
    console.error('❌ Error in deviceRead:', error);
    throw error;
  }
};

const deviceUpdate = async (data, res) => {
  try {
    const { id, truck_id, sn, sim_number, status } = data;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: id',
      });
    }

    const existing = await prisma.device.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${id}`,
      });
    }

    // Check if new SN already exists
    if (sn && sn !== existing.sn) {
      const duplicate = await prisma.device.findUnique({ where: { sn } });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Device with SN ${sn} already exists`,
        });
      }
    }

    // Check if truck exists
    if (truck_id && truck_id !== existing.truck_id) {
      const truck = await prisma.truck.findUnique({ where: { id: truck_id } });
      if (!truck) {
        return res.status(404).json({
          success: false,
          message: `Truck not found: ${truck_id}`,
        });
      }
    }

    const updateData = { updated_at: new Date() };
    if (truck_id !== undefined) updateData.truck_id = truck_id;
    if (sn !== undefined) updateData.sn = sn;
    if (sim_number !== undefined) updateData.sim_number = sim_number;
    if (status !== undefined) updateData.status = status;

    const device = await prisma.device.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        truck: { select: { id: true, plate: true, name: true } },
      },
    });

    console.log(`✅ [UPDATE] Device ${id} updated`);

    res.status(200).json({
      success: true,
      data: device,
      message: 'Device updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in deviceUpdate:', error);
    throw error;
  }
};

const deviceDelete = async (data, res) => {
  try {
    const { id } = data;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: id',
      });
    }

    const device = await prisma.device.findUnique({
      where: { id: parseInt(id) },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${id}`,
      });
    }

    // Soft delete
    const updated = await prisma.device.update({
      where: { id: parseInt(id) },
      data: { deleted_at: new Date() },
    });

    console.log(`✅ [DELETE] Device ${id} soft deleted`);

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Device deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error in deviceDelete:', error);
    throw error;
  }
};

// ==========================================
// SENSOR CRUD FUNCTIONS
// ==========================================

const sensorCreate = async (data, res) => {
  try {
    const { device_id, sn, tireNo, simNumber, sensorNo, status } = data;

    if (!device_id || !sn || !tireNo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: device_id, sn, tireNo',
      });
    }

    // Check if sensor already exists
    const existing = await prisma.sensor.findUnique({ where: { sn } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Sensor with SN ${sn} already exists`,
      });
    }

    // Check if device exists
    const device = await prisma.device.findUnique({ where: { id: device_id } });
    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${device_id}`,
      });
    }

    // Check if tireNo already occupied
    const conflict = await prisma.sensor.findFirst({
      where: {
        device_id,
        tireNo: parseInt(tireNo),
        deleted_at: null,
      },
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: `Tire position ${tireNo} already occupied on this device`,
      });
    }

    const sensor = await prisma.sensor.create({
      data: {
        device_id,
        sn,
        tireNo: parseInt(tireNo),
        simNumber: simNumber || null,
        sensorNo: sensorNo ? parseInt(sensorNo) : null,
        status: status || 'active',
        sensor_lock: 0,
      },
      include: {
        device: {
          include: {
            truck: { select: { id: true, plate: true, name: true } },
          },
        },
      },
    });

    console.log(`✅ [CREATE] Sensor ${sn} created`);

    res.status(201).json({
      success: true,
      data: sensor,
      message: 'Sensor created successfully',
    });
  } catch (error) {
    console.error('❌ Error in sensorCreate:', error);
    throw error;
  }
};

const sensorRead = async (data, res) => {
  try {
    const { id, page = 1, limit = 50, device_id, status } = data;

    // Read single sensor by ID
    if (id) {
      const sensor = await prisma.sensor.findUnique({
        where: { id: parseInt(id) },
        include: {
          device: {
            include: {
              truck: { select: { id: true, plate: true, name: true } },
            },
          },
        },
      });

      if (!sensor) {
        return res.status(404).json({
          success: false,
          message: `Sensor not found: ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: sensor,
        message: 'Sensor retrieved successfully',
      });
    }

    // Read list of sensors with filters
    const where = { deleted_at: null };
    if (device_id) where.device_id = parseInt(device_id);
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const [sensors, total] = await Promise.all([
      prisma.sensor.findMany({
        where,
        include: {
          device: {
            include: {
              truck: { select: { id: true, plate: true, name: true } },
            },
          },
        },
        orderBy: [{ device_id: 'asc' }, { tireNo: 'asc' }],
        skip,
        take: parseInt(limit),
      }),
      prisma.sensor.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        sensors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      message: 'Sensors retrieved successfully',
    });
  } catch (error) {
    console.error('❌ Error in sensorRead:', error);
    throw error;
  }
};

const sensorUpdate = async (data, res) => {
  try {
    const { id, device_id, sn, tireNo, simNumber, sensorNo, status } = data;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: id',
      });
    }

    const existing = await prisma.sensor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Sensor not found: ${id}`,
      });
    }

    // Check if new SN already exists
    if (sn && sn !== existing.sn) {
      const duplicate = await prisma.sensor.findUnique({ where: { sn } });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Sensor with SN ${sn} already exists`,
        });
      }
    }

    // Check if device exists
    if (device_id && device_id !== existing.device_id) {
      const device = await prisma.device.findUnique({ where: { id: device_id } });
      if (!device) {
        return res.status(404).json({
          success: false,
          message: `Device not found: ${device_id}`,
        });
      }
    }

    // Check tireNo conflicts
    if (tireNo && (tireNo !== existing.tireNo || device_id !== existing.device_id)) {
      const conflict = await prisma.sensor.findFirst({
        where: {
          device_id: device_id || existing.device_id,
          tireNo: parseInt(tireNo),
          deleted_at: null,
          id: { not: parseInt(id) },
        },
      });

      if (conflict) {
        return res.status(409).json({
          success: false,
          message: `Tire position ${tireNo} already occupied on this device`,
        });
      }
    }

    const updateData = { updated_at: new Date() };
    if (device_id !== undefined) updateData.device_id = device_id;
    if (sn !== undefined) updateData.sn = sn;
    if (tireNo !== undefined) updateData.tireNo = parseInt(tireNo);
    if (simNumber !== undefined) updateData.simNumber = simNumber;
    if (sensorNo !== undefined) updateData.sensorNo = parseInt(sensorNo);
    if (status !== undefined) updateData.status = status;

    const sensor = await prisma.sensor.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        device: {
          include: {
            truck: { select: { id: true, plate: true, name: true } },
          },
        },
      },
    });

    console.log(`✅ [UPDATE] Sensor ${id} updated`);

    res.status(200).json({
      success: true,
      data: sensor,
      message: 'Sensor updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in sensorUpdate:', error);
    throw error;
  }
};

const sensorDelete = async (data, res) => {
  try {
    const { id } = data;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: id',
      });
    }

    const sensor = await prisma.sensor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: `Sensor not found: ${id}`,
      });
    }

    // Soft delete
    const updated = await prisma.sensor.update({
      where: { id: parseInt(id) },
      data: { deleted_at: new Date() },
    });

    console.log(`✅ [DELETE] Sensor ${id} soft deleted`);

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Sensor deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error in sensorDelete:', error);
    throw error;
  }
};

module.exports = {
  handleIoTData,
};
