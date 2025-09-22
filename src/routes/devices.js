const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/auth');

// ==========================================
// DEVICE ROUTES
// ==========================================

// GET /api/devices - Get all devices with filters and pagination
router.get('/', authMiddleware, deviceController.getAllDevices);

// GET /api/devices/:deviceId - Get specific device details
router.get('/:deviceId', authMiddleware, deviceController.getDeviceById);

// POST /api/devices - Create new device
router.post('/', authMiddleware, deviceController.createDevice);

// PUT /api/devices/:deviceId - Update device
router.put('/:deviceId', authMiddleware, deviceController.updateDevice);

// DELETE /api/devices/:deviceId - Delete/deactivate device
router.delete('/:deviceId', authMiddleware, deviceController.deleteDevice);

// ==========================================
// SENSOR ROUTES (nested under devices)
// ==========================================

// GET /api/devices/sensors - Get all sensors with filters
router.get('/sensors/all', authMiddleware, deviceController.getAllSensors);

// GET /api/devices/sensors/:sensorId - Get specific sensor details
router.get('/sensors/:sensorId', authMiddleware, deviceController.getSensorById);

// POST /api/devices/sensors - Create new sensor
router.post('/sensors', authMiddleware, deviceController.createSensor);

// PUT /api/devices/sensors/:sensorId - Update sensor
router.put('/sensors/:sensorId', authMiddleware, deviceController.updateSensor);

// DELETE /api/devices/sensors/:sensorId - Delete/deactivate sensor
router.delete('/sensors/:sensorId', authMiddleware, deviceController.deleteSensor);

module.exports = router;
