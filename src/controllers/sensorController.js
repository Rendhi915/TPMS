const { PrismaClient } = require('../../prisma/generated/client');
const { broadcastSensorUpdate } = require('../services/websocketService');

const prisma = new PrismaClient();

// ==========================================
// SENSOR DATA INGESTION CONTROLLER (Direct Write - No Queue)
// ==========================================

const ingestTirePressureData = async (req, res) => {
  try {
    const sensorData = req.body;
    const payload = sensorData.data || sensorData;

    // Extract sensor identifiers
    const sensorNo = payload.sensorNo || sensorData.sensorNo || null;
    const tireNo = payload.tireNo || sensorData.tireNo || null;
    const deviceId = sensorData.deviceId || payload.deviceId || null;

    if (!sensorNo && !tireNo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: sensorNo or tireNo',
      });
    }

    // Find sensor by sensorNo or by deviceId + tireNo
    let sensor = null;
    if (sensorNo) {
      sensor = await prisma.sensor.findUnique({
        where: { sensorNo: sensorNo },
        include: { device: true },
      });
    } else if (deviceId && tireNo) {
      const device = await prisma.device.findUnique({
        where: { deviceId: deviceId },
      });
      if (device) {
        sensor = await prisma.sensor.findFirst({
          where: {
            device_id: device.id,
            tireNo: parseInt(tireNo),
            deleted_at: null,
          },
          include: { device: true },
        });
      }
    }

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found. Please register the sensor first.',
      });
    }

    // Extract sensor values
    const tiprValue = payload.tiprValue || payload.pressureKpa || payload.pressure || null;
    const tempValue = payload.tempValue || payload.tempCelsius || payload.temperature || null;
    const bat = payload.bat || payload.battery_level || payload.battery || null;

    // Insert directly to sensor_data table
    const sensorDataRecord = await prisma.sensor_data.create({
      data: {
        sensor_id: sensor.id,
        tiprValue: tiprValue ? parseFloat(tiprValue) : null,
        tempValue: tempValue ? parseFloat(tempValue) : null,
        bat: bat ? parseFloat(bat) : null,
      },
    });

    // Update device battery levels if available
    if (sensor.device && (payload.bat1 || payload.bat2 || payload.bat3)) {
      await prisma.device.update({
        where: { id: sensor.device_id },
        data: {
          bat1: payload.bat1 ? parseFloat(payload.bat1) : undefined,
          bat2: payload.bat2 ? parseFloat(payload.bat2) : undefined,
          bat3: payload.bat3 ? parseFloat(payload.bat3) : undefined,
        },
      });
    }

    // Broadcast real-time update via WebSocket
    try {
      broadcastSensorUpdate({
        type: 'tire_pressure',
        sensorNo: sensor.sensorNo,
        tireNo: sensor.tireNo,
        deviceId: sensor.device?.deviceId,
        data: {
          pressure: tiprValue,
          temperature: tempValue,
          battery: bat,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Tire pressure data ingested successfully',
      data: {
        id: sensorDataRecord.id,
        sensor_id: sensor.id,
        tireNo: sensor.tireNo,
        sensorNo: sensor.sensorNo,
        tiprValue: sensorDataRecord.tiprValue,
        tempValue: sensorDataRecord.tempValue,
        bat: sensorDataRecord.bat,
        created_at: sensorDataRecord.created_at,
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

// ==========================================
// INGEST DEVICE STATUS DATA (GPS, Battery, Lock)
// ==========================================

const ingestDeviceStatusData = async (req, res) => {
  try {
    const payload = req.body;
    const deviceId = payload.deviceId || payload.device_id;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: deviceId',
      });
    }

    // Find device
    const device = await prisma.device.findUnique({
      where: { deviceId: deviceId },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found. Please register the device first.',
      });
    }

    // Update device battery levels and lock status
    const deviceUpdate = {};
    if (payload.bat1 !== undefined) deviceUpdate.bat1 = parseFloat(payload.bat1);
    if (payload.bat2 !== undefined) deviceUpdate.bat2 = parseFloat(payload.bat2);
    if (payload.bat3 !== undefined) deviceUpdate.bat3 = parseFloat(payload.bat3);
    if (payload.lock !== undefined) deviceUpdate.lock = payload.lock;

    if (Object.keys(deviceUpdate).length > 0) {
      await prisma.device.update({
        where: { id: device.id },
        data: deviceUpdate,
      });
    }

    // If GPS data included, write to location table
    let locationRecord = null;
    if (payload.latitude && payload.longitude) {
      locationRecord = await prisma.location.create({
        data: {
          device_id: device.id,
          latitude: parseFloat(payload.latitude),
          longitude: parseFloat(payload.longitude),
          speed: payload.speed ? parseFloat(payload.speed) : null,
          heading: payload.heading ? parseFloat(payload.heading) : null,
          altitude: payload.altitude ? parseFloat(payload.altitude) : null,
          accuracy: payload.accuracy ? parseFloat(payload.accuracy) : null,
          timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
        },
      });

      // Broadcast location update via WebSocket
      try {
        broadcastSensorUpdate({
          type: 'location',
          deviceId: device.deviceId,
          truck_id: device.truck_id,
          data: {
            latitude: locationRecord.latitude,
            longitude: locationRecord.longitude,
            speed: locationRecord.speed,
            heading: locationRecord.heading,
          },
          timestamp: locationRecord.timestamp.toISOString(),
        });
      } catch (wsError) {
        console.log('WebSocket broadcast failed:', wsError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Device status data ingested successfully',
      data: {
        device_id: device.id,
        deviceId: device.deviceId,
        updated: deviceUpdate,
        location: locationRecord
          ? {
              id: locationRecord.id,
              latitude: locationRecord.latitude,
              longitude: locationRecord.longitude,
              speed: locationRecord.speed,
              timestamp: locationRecord.timestamp,
            }
          : null,
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

// ==========================================
// INGEST LOCK STATE DATA
// ==========================================

const ingestLockStateData = async (req, res) => {
  try {
    const payload = req.body;
    const deviceId = payload.deviceId || payload.device_id;
    const lockState = payload.lock !== undefined ? payload.lock : payload.lockState;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: deviceId',
      });
    }

    if (lockState === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: lock or lockState',
      });
    }

    // Find device
    const device = await prisma.device.findUnique({
      where: { deviceId: deviceId },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found. Please register the device first.',
      });
    }

    // Update device lock status
    const updatedDevice = await prisma.device.update({
      where: { id: device.id },
      data: {
        lock: lockState,
      },
    });

    // Broadcast lock state update via WebSocket
    try {
      broadcastSensorUpdate({
        type: 'lock_state',
        deviceId: device.deviceId,
        truck_id: device.truck_id,
        data: {
          lock: updatedDevice.lock,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Lock state updated successfully',
      data: {
        device_id: updatedDevice.id,
        deviceId: updatedDevice.deviceId,
        lock: updatedDevice.lock,
      },
    });
  } catch (error) {
    console.error('Error updating lock state:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lock state',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// GET LAST SENSOR DATA
// ==========================================

const getLastRetrievedData = async (req, res) => {
  try {
    const { limit = 15, device_id, sensor_id } = req.query;

    const where = {};
    if (sensor_id) where.sensor_id = sensor_id;
    if (device_id) {
      where.sensor = {
        device_id: device_id,
      };
    }

    // Query sensor_data with sensor and device info
    const sensorDataRecords = await prisma.sensor_data.findMany({
      where,
      include: {
        sensor: {
          include: {
            device: {
              select: {
                id: true,
                sn: true,
                truck_id: true,
                status: true,
              },
            },
          },
        },
      },
      orderBy: {
        recorded_at: 'desc',
      },
      take: parseInt(limit),
    });

    // Format the data
    const formattedData = sensorDataRecords.map((record) => ({
      id: record.id,
      sensor_id: record.sensor_id,
      sensorNo: record.sensor?.sensorNo,
      tireNo: record.sensor?.tireNo,
      device_sn: record.sensor?.device?.sn,
      truck_id: record.sensor?.device?.truck_id,
      tiprValue: record.tiprValue,
      tempValue: record.tempValue,
      bat: record.bat,
      exType: record.exType,
      recorded_at: record.recorded_at,
    }));

    res.status(200).json({
      success: true,
      message: 'Sensor data retrieved successfully',
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

// ==========================================
// SENSOR CRUD OPERATIONS
// ==========================================

/**
 * GET /api/sensors - Get all sensors with pagination and filters
 */
const getAllSensors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Filters
    const { device_id, status, tireNo, search } = req.query;

    const where = {
      deleted_at: null,
    };

    if (device_id) {
      where.device_id = device_id; // UUID
    }

    if (status) {
      where.status = status;
    }

    if (tireNo) {
      where.tireNo = parseInt(tireNo);
    }

    if (search) {
      where.OR = [
        { sn: { contains: search, mode: 'insensitive' } },
        { sensorNo: { contains: search, mode: 'insensitive' } },
        { simNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get sensors with device and truck info
    const [sensors, total] = await Promise.all([
      prisma.sensor.findMany({
        where,
        skip,
        take: limit,
        include: {
          device: {
            include: {
              truck: {
                select: {
                  id: true,
                  name: true,
                  plate: true,
                  status: true,
                },
              },
            },
          },
        },
        orderBy: [{ device_id: 'asc' }, { tireNo: 'asc' }],
      }),
      prisma.sensor.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        sensors,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get all sensors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sensors',
      error: error.message,
    });
  }
};

/**
 * GET /api/sensors/:id - Get sensor by ID
 */
const getSensorById = async (req, res) => {
  try {
    const sensorId = parseInt(req.params.id);

    // Validate sensor ID
    if (isNaN(sensorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sensor ID provided',
      });
    }

    const sensor = await prisma.sensor.findFirst({
      where: {
        id: sensorId,
        deleted_at: null,
      },
      include: {
        device: {
          include: {
            truck: {
              select: {
                id: true,
                name: true,
                plate: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found',
      });
    }

    res.json({
      success: true,
      data: sensor,
    });
  } catch (error) {
    console.error('Get sensor by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sensor',
      error: error.message,
    });
  }
};

/**
 * POST /api/sensors/create - Create new sensor
 */
const createSensor = async (req, res) => {
  try {
    const { sn, device_id, tireNo, simNumber, sensorNo, sensor_lock, status } = req.body;

    // Validation
    if (!sn || !device_id || tireNo === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: sn, device_id, tireNo',
      });
    }

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { id: device_id }, // UUID
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    // Check for duplicate sn
    const existingSensor = await prisma.sensor.findFirst({
      where: {
        sn,
        deleted_at: null,
      },
    });

    if (existingSensor) {
      return res.status(400).json({
        success: false,
        message: 'Sensor with this SN already exists',
      });
    }

    // Check for duplicate sensorNo if provided
    if (sensorNo) {
      const existingSensorNo = await prisma.sensor.findFirst({
        where: {
          sensorNo,
          deleted_at: null,
        },
      });

      if (existingSensorNo) {
        return res.status(400).json({
          success: false,
          message: 'Sensor with this sensorNo already exists',
        });
      }
    }

    // Create sensor
    const sensor = await prisma.sensor.create({
      data: {
        sn,
        device_id: device_id, // UUID
        tireNo: parseInt(tireNo),
        simNumber: simNumber || null,
        sensorNo: sensorNo || null,
        sensor_lock: sensor_lock ? parseInt(sensor_lock) : 0, // 0=unlocked, 1=locked
        status: status || 'active',
      },
      include: {
        device: {
          include: {
            truck: {
              select: {
                id: true,
                name: true,
                plate: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Sensor created successfully',
      data: sensor,
    });
  } catch (error) {
    console.error('Create sensor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sensor',
      error: error.message,
    });
  }
};

/**
 * PUT /api/sensors/:id - Update sensor
 */
const updateSensor = async (req, res) => {
  try {
    const sensorId = parseInt(req.params.id);
    const { sn, device_id, tireNo, simNumber, sensorNo, sensor_lock, status } = req.body;

    // Validate sensor ID
    if (isNaN(sensorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sensor ID provided',
      });
    }

    // Check if sensor exists
    const existingSensor = await prisma.sensor.findFirst({
      where: {
        id: sensorId,
        deleted_at: null,
      },
    });

    if (!existingSensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found',
      });
    }

    // Check if device_id is being updated and exists
    if (device_id && device_id !== existingSensor.device_id) {
      const deviceIdInt = parseInt(device_id);
      const device = await prisma.device.findUnique({
        where: { id: deviceIdInt },
      });

      if (!device) {
        return res.status(404).json({
          success: false,
          message: 'Device not found',
        });
      }
    }

    // Check for duplicate sn if being updated
    if (sn && sn !== existingSensor.sn) {
      const duplicateSn = await prisma.sensor.findFirst({
        where: {
          sn,
          deleted_at: null,
          NOT: {
            id: sensorId,
          },
        },
      });

      if (duplicateSn) {
        return res.status(400).json({
          success: false,
          message: 'Sensor with this SN already exists',
        });
      }
    }

    // Check for duplicate sensorNo if being updated
    if (sensorNo && sensorNo !== existingSensor.sensorNo) {
      const duplicateSensorNo = await prisma.sensor.findFirst({
        where: {
          sensorNo,
          deleted_at: null,
          NOT: {
            id: sensorId,
          },
        },
      });

      if (duplicateSensorNo) {
        return res.status(400).json({
          success: false,
          message: 'Sensor with this sensorNo already exists',
        });
      }
    }

    // Build update data
    const updateData = {};

    if (sn !== undefined) updateData.sn = sn;
    if (device_id !== undefined) updateData.device_id = device_id; // UUID
    if (tireNo !== undefined) updateData.tireNo = parseInt(tireNo);
    if (simNumber !== undefined) updateData.simNumber = simNumber;
    if (sensorNo !== undefined) updateData.sensorNo = sensorNo;
    if (sensor_lock !== undefined) updateData.sensor_lock = parseInt(sensor_lock);
    if (status !== undefined) updateData.status = status;

    // Update sensor
    const sensor = await prisma.sensor.update({
      where: { id: sensorId },
      data: updateData,
      include: {
        device: {
          include: {
            truck: {
              select: {
                id: true,
                name: true,
                plate: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Sensor updated successfully',
      data: sensor,
    });
  } catch (error) {
    console.error('Update sensor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update sensor',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/sensors/:id - Soft delete sensor
 */
const deleteSensor = async (req, res) => {
  try {
    const sensorId = parseInt(req.params.id);

    // Validate sensor ID
    if (isNaN(sensorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sensor ID provided',
      });
    }

    // Check if sensor exists
    const sensor = await prisma.sensor.findFirst({
      where: {
        id: sensorId,
        deleted_at: null,
      },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found',
      });
    }

    // Soft delete
    await prisma.sensor.update({
      where: { id: sensorId },
      data: {
        deleted_at: new Date(),
        status: 'inactive',
      },
    });

    res.json({
      success: true,
      message: 'Sensor deleted successfully',
    });
  } catch (error) {
    console.error('Delete sensor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete sensor',
      error: error.message,
    });
  }
};

// ==========================================
// MODULE EXPORTS
// ==========================================

module.exports = {
  ingestTirePressureData,
  ingestDeviceStatusData,
  ingestLockStateData,
  getLastRetrievedData,
  // CRUD Operations
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
};
