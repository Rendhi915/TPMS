const { PrismaClient } = require('../../prisma/generated/client');
const prisma = new PrismaClient();

// ==========================================
// IOT DATA CONTROLLER
// Handles incoming IoT data based on cmd type
// ==========================================

/**
 * Single endpoint to handle multiple data types based on 'cmd' field
 * 
 * CMD Types:
 * - tpdata: Temperature & Pressure data (updates sensor_data table)
 * - hubdata: Hub/Device data (updates device table)
 * - state: Device state data (updates device table)
 * - lock: Lock status (updates device or sensor table)
 */
const handleIoTData = async (req, res) => {
  try {
    const { cmd } = req.body;

    if (!cmd) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: cmd',
        error: 'cmd field is required to determine data type',
      });
    }

    console.log(`📡 [IoT Data] Received cmd: ${cmd}`);

    // Route to appropriate handler based on cmd
    switch (cmd.toLowerCase()) {
      case 'tpdata':
        return await handleTPData(req, res);
      
      case 'hubdata':
        return await handleHubData(req, res);
      
      case 'state':
        return await handleStateData(req, res);
      
      case 'lock':
        return await handleLockData(req, res);
      
      default:
        return res.status(400).json({
          success: false,
          message: `Invalid cmd type: ${cmd}`,
          error: 'cmd must be one of: tpdata, hubdata, state, lock',
        });
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
// TPDATA - Temperature & Pressure Data
// Updates sensor table directly (no sensor_data table)
// All records stay in sensor table for history
// ==========================================
/**
 * Expected payload:
 * {
 *   "cmd": "tpdata",
 *   "sn": "SENSOR123",           // Sensor serial number
 *   "tempValue": 85.5,           // Temperature value
 *   "tirepValue": 32.5,          // Tire pressure value
 *   "exType": "normal",          // Exception type (optional)
 *   "bat": 85                    // Battery level (optional)
 * }
 * 
 * Note: Data is updated directly in sensor table
 * - For live dashboard: Get latest by `ORDER BY updated_at DESC LIMIT 1`
 * - For history: Get all records with `WHERE created_at BETWEEN ... ORDER BY created_at`
 */
const handleTPData = async (req, res) => {
  try {
    const { sn, tempValue, tirepValue, exType, bat } = req.body;

    // Validate required fields
    if (!sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: sn (sensor serial number)',
      });
    }

    // Find sensor by serial number
    const sensor = await prisma.sensor.findUnique({
      where: { sn: sn },
      include: {
        device: {
          select: {
            truck_id: true,
            truck: {
              select: {
                id: true,
                plate: true,
                name: true,
              },
            },
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

    // Update sensor with new data
    const updateData = {
      updated_at: new Date(),
    };

    if (tempValue !== undefined) updateData.tempValue = parseFloat(tempValue);
    if (tirepValue !== undefined) updateData.tirepValue = parseFloat(tirepValue);
    if (exType !== undefined) updateData.exType = exType;
    if (bat !== undefined) updateData.bat = parseInt(bat);

    const updatedSensor = await prisma.sensor.update({
      where: { sn: sn },
      data: updateData,
    });

    console.log(`✅ [TPDATA] Updated sensor ${sn} with T:${tempValue}°C P:${tirepValue}PSI`);

    res.status(200).json({
      success: true,
      data: {
        sensor_id: updatedSensor.id,
        sensor_sn: sn,
        tireNo: updatedSensor.tireNo,
        device_id: sensor.device_id,
        truck_id: sensor.device.truck_id,
        truck_plate: sensor.device.truck?.plate,
        truck_name: sensor.device.truck?.name,
        tempValue: updatedSensor.tempValue,
        tirepValue: updatedSensor.tirepValue,
        exType: updatedSensor.exType,
        bat: updatedSensor.bat,
        updated_at: updatedSensor.updated_at,
      },
      message: 'Sensor data updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleTPData:', error);
    throw error;
  }
};

// ==========================================
// HUBDATA - Hub/Device Data
// Updates device table (bat1, bat2, bat3, etc.)
// ==========================================
/**
 * Expected payload:
 * {
 *   "cmd": "hubdata",
 *   "sn": "DEVICE123",           // Device serial number
 *   "bat1": 85,                  // Battery 1 level
 *   "bat2": 90,                  // Battery 2 level
 *   "bat3": 88,                  // Battery 3 level
 *   "sim_number": "1234567890"   // SIM number (optional)
 * }
 */
const handleHubData = async (req, res) => {
  try {
    const { sn, bat1, bat2, bat3, sim_number } = req.body;

    // Validate required fields
    if (!sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: sn (device serial number)',
      });
    }

    // Find device by serial number
    const device = await prisma.device.findUnique({
      where: { sn: sn },
      include: {
        truck: {
          select: {
            id: true,
            plate: true,
            name: true,
          },
        },
      },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${sn}`,
      });
    }

    // Update device data
    const updateData = {
      updated_at: new Date(),
    };

    if (bat1 !== undefined) updateData.bat1 = parseInt(bat1);
    if (bat2 !== undefined) updateData.bat2 = parseInt(bat2);
    if (bat3 !== undefined) updateData.bat3 = parseInt(bat3);
    if (sim_number !== undefined) updateData.sim_number = sim_number;

    const updatedDevice = await prisma.device.update({
      where: { sn: sn },
      data: updateData,
    });

    console.log(`✅ [HUBDATA] Updated device ${sn}`);

    res.status(200).json({
      success: true,
      data: {
        device_id: updatedDevice.id,
        device_sn: sn,
        truck_id: device.truck.id,
        truck_plate: device.truck.plate,
        bat1: updatedDevice.bat1,
        bat2: updatedDevice.bat2,
        bat3: updatedDevice.bat3,
        sim_number: updatedDevice.sim_number,
        updated_at: updatedDevice.updated_at,
      },
      message: 'Device data updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleHubData:', error);
    throw error;
  }
};

// ==========================================
// STATE - Device State Data
// Updates device status
// ==========================================
/**
 * Expected payload:
 * {
 *   "cmd": "state",
 *   "sn": "DEVICE123",           // Device serial number
 *   "status": "active"           // Status: active, inactive, maintenance
 * }
 */
const handleStateData = async (req, res) => {
  try {
    const { sn, status } = req.body;

    // Validate required fields
    if (!sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: sn (device serial number)',
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: status',
      });
    }

    // Validate status value
    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Find device by serial number
    const device = await prisma.device.findUnique({
      where: { sn: sn },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device not found: ${sn}`,
      });
    }

    // Update device status
    const updatedDevice = await prisma.device.update({
      where: { sn: sn },
      data: {
        status: status,
        updated_at: new Date(),
      },
    });

    console.log(`✅ [STATE] Updated device ${sn} status to ${status}`);

    res.status(200).json({
      success: true,
      data: {
        device_id: updatedDevice.id,
        device_sn: sn,
        status: updatedDevice.status,
        updated_at: updatedDevice.updated_at,
      },
      message: 'Device state updated successfully',
    });
  } catch (error) {
    console.error('❌ Error in handleStateData:', error);
    throw error;
  }
};

// ==========================================
// LOCK - Lock Status Data
// Updates lock status on device or sensor
// ==========================================
/**
 * Expected payload:
 * {
 *   "cmd": "lock",
 *   "sn": "DEVICE123 or SENSOR123", // Device or Sensor serial number
 *   "lock": 1,                       // Lock status: 0=unlocked, 1=locked
 *   "type": "device"                 // Type: "device" or "sensor" (optional, auto-detect if not provided)
 * }
 */
const handleLockData = async (req, res) => {
  try {
    const { sn, lock, type } = req.body;

    // Validate required fields
    if (!sn) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: sn',
      });
    }

    if (lock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: lock',
      });
    }

    const lockValue = parseInt(lock);

    // Validate lock value
    if (![0, 1].includes(lockValue)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lock value. Must be 0 (unlocked) or 1 (locked)',
      });
    }

    let updated = false;
    let result = {};

    // If type is specified, update that type only
    if (type === 'device') {
      const device = await prisma.device.update({
        where: { sn: sn },
        data: {
          lock: lockValue,
          updated_at: new Date(),
        },
      });
      
      result = {
        type: 'device',
        device_id: device.id,
        device_sn: sn,
        lock: device.lock,
        updated_at: device.updated_at,
      };
      updated = true;
    } else if (type === 'sensor') {
      const sensor = await prisma.sensor.update({
        where: { sn: sn },
        data: {
          sensor_lock: lockValue,
        },
      });
      
      result = {
        type: 'sensor',
        sensor_id: sensor.id,
        sensor_sn: sn,
        lock: sensor.sensor_lock,
      };
      updated = true;
    } else {
      // Auto-detect: try device first, then sensor
      try {
        const device = await prisma.device.update({
          where: { sn: sn },
          data: {
            lock: lockValue,
            updated_at: new Date(),
          },
        });
        
        result = {
          type: 'device',
          device_id: device.id,
          device_sn: sn,
          lock: device.lock,
          updated_at: device.updated_at,
        };
        updated = true;
      } catch (deviceError) {
        // If device not found, try sensor
        try {
          const sensor = await prisma.sensor.update({
            where: { sn: sn },
            data: {
              sensor_lock: lockValue,
            },
          });
          
          result = {
            type: 'sensor',
            sensor_id: sensor.id,
            sensor_sn: sn,
            lock: sensor.sensor_lock,
          };
          updated = true;
        } catch (sensorError) {
          // Neither found
          return res.status(404).json({
            success: false,
            message: `Device or Sensor not found: ${sn}`,
          });
        }
      }
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Device or Sensor not found: ${sn}`,
      });
    }

    console.log(`✅ [LOCK] Updated ${result.type} ${sn} lock status to ${lockValue}`);

    res.status(200).json({
      success: true,
      data: result,
      message: `${result.type} lock status updated successfully`,
    });
  } catch (error) {
    console.error('❌ Error in handleLockData:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: `Device or Sensor not found: ${req.body.sn}`,
      });
    }
    
    throw error;
  }
};

module.exports = {
  handleIoTData,
};
