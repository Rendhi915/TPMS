const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { validateSensorData, handleValidationErrors } = require('../middleware/validation');
const { validatePagination, validateIntParam } = require('../middleware/crudValidation');
const authMiddleware = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// ==========================================
// DATA INGESTION ROUTES (No Auth)
// ==========================================

// POST /api/sensors/tpdata - Tire pressure data ingestion
router.post(
  '/tpdata',
  validateSensorData('tpdata'),
  handleValidationErrors,
  sensorController.ingestTirePressureData
);

// POST /api/sensors/device - GPS & device status data ingestion
router.post(
  '/device',
  validateSensorData('device'),
  handleValidationErrors,
  sensorController.ingestDeviceStatusData
);

// POST /api/sensors/state - Lock state data ingestion
router.post(
  '/state',
  validateSensorData('state'),
  handleValidationErrors,
  sensorController.ingestLockStateData
);

// GET /api/sensors/last - Get last retrieved sensor data (with auth & rate limiting)
router.get('/last', rateLimiter, authMiddleware, sensorController.getLastRetrievedData);

// ==========================================
// CRUD ROUTES (With Auth)
// ==========================================

// POST /api/sensors/create - Create new sensor
router.post('/create', authMiddleware, sensorController.createSensor);

// GET /api/sensors - Get all sensors with pagination
router.get('/', authMiddleware, validatePagination, sensorController.getAllSensors);

// GET /api/sensors/:id - Get sensor by ID
router.get('/:id', authMiddleware, validateIntParam('id'), sensorController.getSensorById);

// PUT /api/sensors/:id - Update sensor
router.put('/:id', authMiddleware, validateIntParam('id'), sensorController.updateSensor);

// DELETE /api/sensors/:id - Delete sensor (soft delete)
router.delete('/:id', authMiddleware, validateIntParam('id'), sensorController.deleteSensor);

module.exports = router;
