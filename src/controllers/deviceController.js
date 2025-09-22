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
        { sn: { contains: search, mode: 'insensitive' } },
        { sim_number: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by status (active = not removed)
    if (status === 'active') {
      where.removed_at = null;
    } else if (status === 'inactive') {
      where.removed_at = { not: null };
    }

    const [devices, total] = await Promise.all([
      prisma.device.findMany({
        where,
        include: {
          truck: {
            select: {
              id: true,
              name: true,
              code: true,
              model: true,
            },
          },
          sensor: {
            select: {
              id: true,
              type: true,
              position_no: true,
              sn: true,
            },
          },
        },
        orderBy: {
          installed_at: 'desc',
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
            name: true,
            code: true,
            model: true,
          },
        },
        sensor: {
          select: {
            id: true,
            type: true,
            position_no: true,
            sn: true,
            installed_at: true,
            removed_at: true,
          },
        },
        device_status_event: {
          orderBy: { reported_at: 'desc' },
          take: 10,
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
    const { truck_id, sn, sim_number } = req.body;

    // Validate required fields
    if (!truck_id || !sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: truck_id, sn',
      });
    }

    // Check if device with same serial number already exists
    const existingDevice = await prisma.device.findUnique({
      where: { sn: sn },
    });

    if (existingDevice) {
      return res.status(409).json({
        success: false,
        message: 'Device with this serial number already exists',
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
        sn,
        sim_number,
      },
      include: {
        truck: {
          select: {
            id: true,
            name: true,
            code: true,
            model: true,
          },
        },
      },
    });

    // Create device assignment record
    await prisma.device_truck_assignment.create({
      data: {
        device_id: device.id,
        truck_id: truck_id,
        is_active: true,
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
    const { truck_id, sn, sim_number } = req.body;

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

    // Check if serial number is being changed and if new SN already exists
    if (sn && sn !== existingDevice.sn) {
      const duplicateDevice = await prisma.device.findUnique({
        where: { sn: sn },
      });

      if (duplicateDevice) {
        return res.status(409).json({
          success: false,
          message: 'Device with this serial number already exists',
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

      // Create new assignment record if truck is being changed
      await prisma.device_truck_assignment.updateMany({
        where: {
          device_id: deviceId,
          is_active: true,
        },
        data: {
          is_active: false,
          removed_at: new Date(),
        },
      });

      await prisma.device_truck_assignment.create({
        data: {
          device_id: deviceId,
          truck_id: truck_id,
          is_active: true,
        },
      });
    }

    const updateData = {};
    if (truck_id !== undefined) updateData.truck_id = truck_id;
    if (sn !== undefined) updateData.sn = sn;
    if (sim_number !== undefined) updateData.sim_number = sim_number;

    const device = await prisma.device.update({
      where: { id: deviceId },
      data: updateData,
      include: {
        truck: {
          select: {
            id: true,
            name: true,
            code: true,
            model: true,
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
        sensor: true,
        gps_position: { take: 1 },
        tire_pressure_event: { take: 1 },
        device_status_event: { take: 1 },
      },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    // Check if device has associated data
    const hasData =
      device.sensor.length > 0 ||
      device.gps_position.length > 0 ||
      device.tire_pressure_event.length > 0 ||
      device.device_status_event.length > 0;

    if (hasData) {
      // Soft delete - mark as removed
      const updatedDevice = await prisma.device.update({
        where: { id: deviceId },
        data: {
          removed_at: new Date(),
        },
      });

      // Deactivate assignments
      await prisma.device_truck_assignment.updateMany({
        where: {
          device_id: deviceId,
          is_active: true,
        },
        data: {
          is_active: false,
          removed_at: new Date(),
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
    const { page = 1, limit = 50, device_id, type, status } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (device_id) where.device_id = device_id;
    if (type) where.type = type;

    // Filter by status (active = not removed)
    if (status === 'active') {
      where.removed_at = null;
    } else if (status === 'inactive') {
      where.removed_at = { not: null };
    }

    const [sensors, total] = await Promise.all([
      prisma.sensor.findMany({
        where,
        include: {
          device: {
            select: {
              id: true,
              sn: true,
              truck: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
        orderBy: [{ device_id: 'asc' }, { position_no: 'asc' }],
        skip: skip,
        take: parseInt(limit),
      }),
      prisma.sensor.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        sensors,
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
            sn: true,
            truck: {
              select: {
                id: true,
                name: true,
                code: true,
                model: true,
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
    const { device_id, type, position_no, sn } = req.body;

    // Validate required fields
    if (!device_id || !position_no) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: device_id, position_no',
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

    // Check if sensor with same serial number already exists (if SN provided)
    if (sn) {
      const existingSensor = await prisma.sensor.findUnique({
        where: { sn: sn },
      });

      if (existingSensor) {
        return res.status(409).json({
          success: false,
          message: 'Sensor with this serial number already exists',
        });
      }
    }

    // Check if position is already occupied on this device
    const existingPosition = await prisma.sensor.findFirst({
      where: {
        device_id: device_id,
        position_no: position_no,
        removed_at: null,
      },
    });

    if (existingPosition) {
      return res.status(409).json({
        success: false,
        message: `Position ${position_no} is already occupied on this device`,
      });
    }

    const sensor = await prisma.sensor.create({
      data: {
        device_id,
        type,
        position_no: parseInt(position_no),
        sn,
      },
      include: {
        device: {
          select: {
            id: true,
            sn: true,
            truck: {
              select: {
                id: true,
                name: true,
                code: true,
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
    const { device_id, type, position_no, sn } = req.body;

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

    // Check serial number conflicts
    if (sn && sn !== existingSensor.sn) {
      const duplicateSensor = await prisma.sensor.findUnique({
        where: { sn: sn },
      });

      if (duplicateSensor) {
        return res.status(409).json({
          success: false,
          message: 'Sensor with this serial number already exists',
        });
      }
    }

    // Check position conflicts
    if (
      position_no &&
      (position_no !== existingSensor.position_no || device_id !== existingSensor.device_id)
    ) {
      const conflictSensor = await prisma.sensor.findFirst({
        where: {
          device_id: device_id || existingSensor.device_id,
          position_no: parseInt(position_no),
          removed_at: null,
          id: { not: sensorId },
        },
      });

      if (conflictSensor) {
        return res.status(409).json({
          success: false,
          message: `Position ${position_no} is already occupied on this device`,
        });
      }
    }

    const updateData = {};
    if (device_id !== undefined) updateData.device_id = device_id;
    if (type !== undefined) updateData.type = type;
    if (position_no !== undefined) updateData.position_no = parseInt(position_no);
    if (sn !== undefined) updateData.sn = sn;

    const sensor = await prisma.sensor.update({
      where: { id: sensorId },
      data: updateData,
      include: {
        device: {
          select: {
            id: true,
            sn: true,
            truck: {
              select: {
                id: true,
                name: true,
                code: true,
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

    // Soft delete - mark as removed
    const updatedSensor = await prisma.sensor.update({
      where: { id: sensorId },
      data: {
        removed_at: new Date(),
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
};
