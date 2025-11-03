const { PrismaClient } = require('../../prisma/generated/client');

const prisma = new PrismaClient();

// ==========================================
// DEVICE CRUD OPERATIONS
// ==========================================

const getAllDevices = async (req, res) => {
  try {
    const { page = 1, limit = 50, truck_id, status, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (truck_id) where.truck_id = truck_id;
    if (search) {
      where.OR = [
        { deviceId: { contains: search, mode: 'insensitive' } },
        { simNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by status and deleted_at
    if (status) {
      where.status = status;
    }
    where.deleted_at = null; // Always exclude soft-deleted devices

    const [devices, total] = await Promise.all([
      prisma.device.findMany({
        where,
        include: {
          truck: {
            select: {
              id: true,
              plate: true,
              type: true,
              status: true,
            },
          },
          sensors: {
            where: { deleted_at: null },
            select: {
              id: true,
              tireNo: true,
              simNumber: true,
              sensorNo: true,
              sensor_lock: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        skip: skip,
        take: parseInt(limit),
      }),
      prisma.device.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        devices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      message: 'Devices retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting devices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get devices',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getDeviceById = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
      include: {
        truck: {
          select: {
            id: true,
            plate: true,
            type: true,
            status: true,
          },
        },
        sensors: {
          where: { deleted_at: null },
          select: {
            id: true,
            tireNo: true,
            simNumber: true,
            sensorNo: true,
            sensor_lock: true,
            created_at: true,
            deleted_at: true,
          },
        },
        locations: {
          orderBy: { created_at: 'desc' },
          take: 10,
          select: {
            id: true,
            lat: true,
            long: true,
            speed: true,
            heading: true,
            created_at: true,
          },
        },
      },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    res.status(200).json({
      success: true,
      data: device,
      message: 'Device details retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting device details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get device details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const createDevice = async (req, res) => {
  try {
    const { truck_id, deviceId, simNumber, bat1, bat2, bat3, lock, status } = req.body;

    // Validate required fields
    if (!truck_id || !deviceId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: truck_id, deviceId',
      });
    }

    // Check if device with same deviceId already exists
    const existingDevice = await prisma.device.findUnique({
      where: { deviceId: deviceId },
    });

    if (existingDevice) {
      return res.status(409).json({
        success: false,
        message: 'Device with this deviceId already exists',
      });
    }

    // Validate truck exists
    const truck = await prisma.truck.findUnique({
      where: { id: truck_id },
    });

    if (!truck) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck_id: truck not found',
      });
    }

    const device = await prisma.device.create({
      data: {
        truck_id,
        deviceId,
        simNumber,
        bat1: bat1 || 0,
        bat2: bat2 || 0,
        bat3: bat3 || 0,
        lock: lock || 0,
        status: status || 'active',
      },
      include: {
        truck: {
          select: {
            id: true,
            plate: true,
            type: true,
            status: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: device,
      message: 'Device created successfully',
    });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create device',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { truck_id, deviceId: newDeviceId, simNumber, bat1, bat2, bat3, lock, status } = req.body;

    // Check if device exists
    const existingDevice = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    // Check if deviceId is being changed and if new deviceId already exists
    if (newDeviceId && newDeviceId !== existingDevice.deviceId) {
      const duplicateDevice = await prisma.device.findUnique({
        where: { deviceId: newDeviceId },
      });

      if (duplicateDevice) {
        return res.status(409).json({
          success: false,
          message: 'Device with this deviceId already exists',
        });
      }
    }

    // Validate truck if being changed
    if (truck_id && truck_id !== existingDevice.truck_id) {
      const truck = await prisma.truck.findUnique({
        where: { id: truck_id },
      });

      if (!truck) {
        return res.status(400).json({
          success: false,
          message: 'Invalid truck_id: truck not found',
        });
      }
    }

    const updateData = {};
    if (truck_id !== undefined) updateData.truck_id = truck_id;
    if (newDeviceId !== undefined) updateData.deviceId = newDeviceId;
    if (simNumber !== undefined) updateData.simNumber = simNumber;
    if (bat1 !== undefined) updateData.bat1 = bat1;
    if (bat2 !== undefined) updateData.bat2 = bat2;
    if (bat3 !== undefined) updateData.bat3 = bat3;
    if (lock !== undefined) updateData.lock = lock;
    if (status !== undefined) updateData.status = status;

    const device = await prisma.device.update({
      where: { id: deviceId },
      data: updateData,
      include: {
        truck: {
          select: {
            id: true,
            plate: true,
            type: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: device,
      message: 'Device updated successfully',
    });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update device',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
      include: {
        sensors: { where: { deleted_at: null } },
        locations: { take: 1 },
      },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    // Check if device has associated data
    const hasData = device.sensors.length > 0 || device.locations.length > 0;

    if (hasData) {
      // Soft delete - mark as removed
      const updatedDevice = await prisma.device.update({
        where: { id: deviceId },
        data: {
          deleted_at: new Date(),
        },
      });

      res.status(200).json({
        success: true,
        data: updatedDevice,
        message: 'Device deactivated successfully (soft delete due to associated data)',
      });
    } else {
      // Hard delete if no associated data
      await prisma.device.delete({
        where: { id: deviceId },
      });

      res.status(200).json({
        success: true,
        message: 'Device deleted successfully',
      });
    }
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete device',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// SENSOR CRUD OPERATIONS
// ==========================================

const getAllSensors = async (req, res) => {
  try {
    const { page = 1, limit = 50, device_id } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (device_id) where.device_id = device_id;
    where.deleted_at = null;

    const [sensors, total] = await Promise.all([
      prisma.sensor.findMany({
        where,
        include: {
          device: {
            select: {
              id: true,
              sn: true,
              truck_id: true,
              status: true,
              truck: {
                select: {
                  id: true,
                  plate: true,
                  name: true,
                  type: true,
                },
              },
            },
          },
        },
        orderBy: [{ device_id: 'asc' }, { tireNo: 'asc' }],
        skip: skip,
        take: parseInt(limit),
      }),
      prisma.sensor.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    const sensorsData = sensors.map((sensor) => ({
      id: sensor.id,
      sn: sensor.sn,
      device_id: sensor.device_id,
      tireNo: sensor.tireNo,
      sensorNo: sensor.sensorNo,
      simNumber: sensor.simNumber,
      sensor_lock: sensor.sensor_lock,
      status: sensor.status,
      created_at: sensor.created_at,
      device: sensor.device
        ? {
            id: sensor.device.id,
            sn: sensor.device.sn,
            truck: sensor.device.truck,
          }
        : null,
    }));

    res.status(200).json({
      success: true,
      data: {
        sensors: sensorsData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      message: 'Sensors retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting sensors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get sensors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getSensorById = async (req, res) => {
  try {
    const { sensorId } = req.params;

    const sensor = await prisma.sensor.findUnique({
      where: { id: sensorId },
      include: {
        device: {
          select: {
            id: true,
            deviceId: true,
            truck: {
              select: {
                id: true,
                plate: true,
                type: true,
                status: true,
              },
            },
          },
        },
        sensor_data: {
          orderBy: { created_at: 'desc' },
          take: 10,
          select: {
            id: true,
            tiprValue: true,
            tempValue: true,
            bat: true,
            created_at: true,
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

    res.status(200).json({
      success: true,
      data: sensor,
      message: 'Sensor details retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting sensor details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get sensor details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const createSensor = async (req, res) => {
  try {
    const { device_id, tireNo, simNumber, sensorNo, sensor_lock } = req.body;

    // Validate required fields
    if (!device_id || !tireNo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: device_id, tireNo',
      });
    }

    // Validate device exists
    const device = await prisma.device.findUnique({
      where: { id: device_id },
    });

    if (!device) {
      return res.status(400).json({
        success: false,
        message: 'Invalid device_id: device not found',
      });
    }

    // Check if sensorNo already exists (if provided)
    if (sensorNo) {
      const existingSensor = await prisma.sensor.findUnique({
        where: { sensorNo: sensorNo },
      });

      if (existingSensor) {
        return res.status(409).json({
          success: false,
          message: 'Sensor with this sensorNo already exists',
        });
      }
    }

    // Check if tireNo is already occupied on this device
    const existingPosition = await prisma.sensor.findFirst({
      where: {
        device_id: device_id,
        tireNo: parseInt(tireNo),
        deleted_at: null,
      },
    });

    if (existingPosition) {
      return res.status(409).json({
        success: false,
        message: `Tire position ${tireNo} is already occupied on this device`,
      });
    }

    const sensor = await prisma.sensor.create({
      data: {
        device_id,
        tireNo: parseInt(tireNo),
        simNumber,
        sensorNo,
        sensor_lock: sensor_lock || 0,
      },
      include: {
        device: {
          select: {
            id: true,
            deviceId: true,
            truck: {
              select: {
                id: true,
                plate: true,
                type: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: sensor,
      message: 'Sensor created successfully',
    });
  } catch (error) {
    console.error('Error creating sensor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sensor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const updateSensor = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { device_id, tireNo, simNumber, sensorNo, sensor_lock } = req.body;

    // Check if sensor exists
    const existingSensor = await prisma.sensor.findUnique({
      where: { id: sensorId },
    });

    if (!existingSensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found',
      });
    }

    // Validate device if being changed
    if (device_id && device_id !== existingSensor.device_id) {
      const device = await prisma.device.findUnique({
        where: { id: device_id },
      });

      if (!device) {
        return res.status(400).json({
          success: false,
          message: 'Invalid device_id: device not found',
        });
      }
    }

    // Check sensorNo conflicts
    if (sensorNo && sensorNo !== existingSensor.sensorNo) {
      const duplicateSensor = await prisma.sensor.findUnique({
        where: { sensorNo: sensorNo },
      });

      if (duplicateSensor) {
        return res.status(409).json({
          success: false,
          message: 'Sensor with this sensorNo already exists',
        });
      }
    }

    // Check tireNo conflicts
    if (tireNo && (tireNo !== existingSensor.tireNo || device_id !== existingSensor.device_id)) {
      const conflictSensor = await prisma.sensor.findFirst({
        where: {
          device_id: device_id || existingSensor.device_id,
          tireNo: parseInt(tireNo),
          deleted_at: null,
          id: { not: sensorId },
        },
      });

      if (conflictSensor) {
        return res.status(409).json({
          success: false,
          message: `Tire position ${tireNo} is already occupied on this device`,
        });
      }
    }

    const updateData = {};
    if (device_id !== undefined) updateData.device_id = device_id;
    if (tireNo !== undefined) updateData.tireNo = parseInt(tireNo);
    if (simNumber !== undefined) updateData.simNumber = simNumber;
    if (sensorNo !== undefined) updateData.sensorNo = sensorNo;
    if (sensor_lock !== undefined) updateData.sensor_lock = sensor_lock;

    const sensor = await prisma.sensor.update({
      where: { id: sensorId },
      data: updateData,
      include: {
        device: {
          select: {
            id: true,
            deviceId: true,
            truck: {
              select: {
                id: true,
                plate: true,
                type: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: sensor,
      message: 'Sensor updated successfully',
    });
  } catch (error) {
    console.error('Error updating sensor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update sensor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const deleteSensor = async (req, res) => {
  try {
    const { sensorId } = req.params;

    // Check if sensor exists
    const sensor = await prisma.sensor.findUnique({
      where: { id: sensorId },
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: 'Sensor not found',
      });
    }

    // Soft delete - mark as deleted
    const updatedSensor = await prisma.sensor.update({
      where: { id: sensorId },
      data: {
        deleted_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      data: updatedSensor,
      message: 'Sensor deactivated successfully',
    });
  } catch (error) {
    console.error('Error deleting sensor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete sensor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// CREATE DEVICE WITH SENSORS (Combined Endpoint)
// ==========================================

const createDeviceWithSensors = async (req, res) => {
  try {
    const {
      // Device fields
      truck_id,
      deviceId,
      simNumber,
      bat1,
      bat2,
      bat3,
      lock,
      status,
      // Sensors array
      sensors,
    } = req.body;

    // Validate required device fields
    if (!deviceId || !simNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required device fields: deviceId, simNumber',
      });
    }

    // Validate truck exists if provided
    if (truck_id) {
      const truck = await prisma.truck.findUnique({
        where: { id: truck_id },
      });

      if (!truck) {
        return res.status(400).json({
          success: false,
          message: 'Invalid truck_id: truck not found',
        });
      }
    }

    // Check if deviceId already exists
    const existingDevice = await prisma.device.findUnique({
      where: { deviceId: deviceId },
    });

    if (existingDevice) {
      return res.status(409).json({
        success: false,
        message: 'Device with this deviceId already exists',
      });
    }

    // Validate sensors array if provided
    if (sensors && Array.isArray(sensors)) {
      // Check for duplicate tireNo in input
      const tireNumbers = sensors.map((s) => s.tireNo);
      const duplicateTireNo = tireNumbers.filter(
        (item, index) => tireNumbers.indexOf(item) !== index
      );

      if (duplicateTireNo.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Duplicate tire positions in request: ${duplicateTireNo.join(', ')}`,
        });
      }

      // Check for duplicate sensorNo in input
      const sensorNumbers = sensors.filter((s) => s.sensorNo).map((s) => s.sensorNo);
      const duplicateSensorNo = sensorNumbers.filter(
        (item, index) => sensorNumbers.indexOf(item) !== index
      );

      if (duplicateSensorNo.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Duplicate sensorNo in request: ${duplicateSensorNo.join(', ')}`,
        });
      }

      // Check if any sensorNo already exists in database
      if (sensorNumbers.length > 0) {
        const existingSensors = await prisma.sensor.findMany({
          where: {
            sensorNo: {
              in: sensorNumbers,
            },
          },
        });

        if (existingSensors.length > 0) {
          return res.status(409).json({
            success: false,
            message: `SensorNo already exists: ${existingSensors.map((s) => s.sensorNo).join(', ')}`,
          });
        }
      }
    }

    // Create device and sensors in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create device
      const newDevice = await tx.device.create({
        data: {
          truck_id: truck_id || null,
          deviceId,
          simNumber,
          bat1: bat1 || null,
          bat2: bat2 || null,
          bat3: bat3 || null,
          lock: lock || 0,
          status: status || 'active',
        },
      });

      // Create sensors if provided
      let createdSensors = [];
      if (sensors && Array.isArray(sensors) && sensors.length > 0) {
        for (const sensorData of sensors) {
          if (!sensorData.tireNo) {
            throw new Error('Each sensor must have a tireNo');
          }

          const sensor = await tx.sensor.create({
            data: {
              device_id: newDevice.id,
              tireNo: parseInt(sensorData.tireNo),
              simNumber: sensorData.simNumber || null,
              sensorNo: sensorData.sensorNo || null,
              sensor_lock: sensorData.sensor_lock || 0,
            },
          });

          createdSensors.push(sensor);
        }
      }

      // Fetch complete device with relations
      const completeDevice = await tx.device.findUnique({
        where: { id: newDevice.id },
        include: {
          truck: {
            select: {
              id: true,
              plate: true,
              type: true,
              status: true,
            },
          },
          sensors: {
            where: { deleted_at: null },
            orderBy: { tireNo: 'asc' },
          },
        },
      });

      return completeDevice;
    });

    res.status(201).json({
      success: true,
      data: result,
      message: `Device created successfully with ${result.sensors.length} sensor(s)`,
    });
  } catch (error) {
    console.error('Error creating device with sensors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create device with sensors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  createDeviceWithSensors,
};
