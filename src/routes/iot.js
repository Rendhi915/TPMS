const express = require('express');
const router = express.Router();
const iotDataController = require('../controllers/iotDataController');
const authMiddleware = require('../middleware/auth');
const { iotHardwareRateLimit, adminCrudRateLimit } = require('../middleware/iotRateLimiter');
const {
  validateIoTData,
  validateCreateDevice,
  validateUpdateDevice,
  validateGetDevices,
  validateDeviceId,
  validateCreateSensor,
  validateUpdateSensor,
  validateGetSensors,
  validateSensorId,
} = require('../middleware/iotValidation');

// ==========================================
// UNIFIED ENDPOINT - Untuk IoT Hardware
// ==========================================
// Endpoint ini digunakan untuk:
// 1. IoT Hardware mengirim data sensor (tpdata, hubdata, device, state)
// 2. Admin CRUD operations (legacy support)
router.post(
  '/data',
  authMiddleware,
  iotHardwareRateLimit,
  validateIoTData,
  iotDataController.handleIoTData
);

// ==========================================
// RESTful ENDPOINTS - Device Management
// ==========================================
// GET /iot/devices - List all devices (with filters & pagination)
router.get(
  '/devices',
  authMiddleware,
  adminCrudRateLimit,
  validateGetDevices,
  iotDataController.getDevices
);

// GET /iot/devices/:id - Get single device by ID
router.get(
  '/devices/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateDeviceId,
  iotDataController.getDevice
);

// POST /iot/devices - Create new device
router.post(
  '/devices',
  authMiddleware,
  adminCrudRateLimit,
  validateCreateDevice,
  iotDataController.createDevice
);

// PUT /iot/devices/:id - Update device
router.put(
  '/devices/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateUpdateDevice,
  iotDataController.updateDevice
);

// DELETE /iot/devices/:id - Delete device (soft delete)
router.delete(
  '/devices/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateDeviceId,
  iotDataController.deleteDevice
);

// ==========================================
// RESTful ENDPOINTS - Sensor Management
// ==========================================
// GET /iot/sensors - List all sensors (with filters & pagination)
router.get(
  '/sensors',
  authMiddleware,
  adminCrudRateLimit,
  validateGetSensors,
  iotDataController.getSensors
);

// GET /iot/sensors/:id - Get single sensor by ID
router.get(
  '/sensors/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateSensorId,
  iotDataController.getSensor
);

// POST /iot/sensors - Create new sensor
router.post(
  '/sensors',
  authMiddleware,
  adminCrudRateLimit,
  validateCreateSensor,
  iotDataController.createSensor
);

// PUT /iot/sensors/:id - Update sensor
router.put(
  '/sensors/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateUpdateSensor,
  iotDataController.updateSensor
);

// DELETE /iot/sensors/:id - Delete sensor (soft delete)
router.delete(
  '/sensors/:id',
  authMiddleware,
  adminCrudRateLimit,
  validateSensorId,
  iotDataController.deleteSensor
);

module.exports = router;
