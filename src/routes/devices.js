const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/auth');
const {
  validateDeviceCreate,
  validateDeviceUpdate,
  validateSensorCreate,
  validateSensorUpdate,
  validateUUIDParam,
  validatePagination
} = require('../middleware/crudValidation');

// ==========================================
// DEVICE ROUTES
// ==========================================

// GET /api/devices - Get all devices with filters and pagination
router.get('/', authMiddleware, validatePagination, deviceController.getAllDevices);

// GET /api/devices/:deviceId - Get specific device details
router.get('/:deviceId', authMiddleware, validateUUIDParam('deviceId'), deviceController.getDeviceById);

// POST /api/devices - Create new device
router.post('/', authMiddleware, validateDeviceCreate, deviceController.createDevice);

// PUT /api/devices/:deviceId - Update device
router.put('/:deviceId', authMiddleware, validateDeviceUpdate, deviceController.updateDevice);

// DELETE /api/devices/:deviceId - Delete/deactivate device
router.delete('/:deviceId', authMiddleware, validateUUIDParam('deviceId'), deviceController.deleteDevice);

// ==========================================
// SENSOR ROUTES (nested under devices)
// ==========================================

// GET /api/devices/sensors - Get all sensors with filters
router.get('/sensors/all', authMiddleware, validatePagination, deviceController.getAllSensors);

// GET /api/devices/sensors/:sensorId - Get specific sensor details
router.get('/sensors/:sensorId', authMiddleware, validateUUIDParam('sensorId'), deviceController.getSensorById);

// POST /api/devices/sensors - Create new sensor
router.post('/sensors', authMiddleware, validateSensorCreate, deviceController.createSensor);

// PUT /api/devices/sensors/:sensorId - Update sensor
router.put('/sensors/:sensorId', authMiddleware, validateSensorUpdate, deviceController.updateSensor);

// DELETE /api/devices/sensors/:sensorId - Delete/deactivate sensor
router.delete('/sensors/:sensorId', authMiddleware, validateUUIDParam('sensorId'), deviceController.deleteSensor);

module.exports = router;
