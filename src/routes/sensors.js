const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { validateSensorData, handleValidationErrors } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// POST /api/sensors/tpdata - Tire pressure data ingestion
router.post(
  '/tpdata',
  validateSensorData('tpdata'),
  handleValidationErrors,
  sensorController.ingestTirePressureData
);

// POST /api/sensors/hubdata - Hub temperature data ingestion
router.post(
  '/hubdata',
  validateSensorData('hubdata'),
  handleValidationErrors,
  sensorController.ingestHubTemperatureData
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

// POST /api/sensors/raw - Generic raw sensor data ingestion (for any sensor type)
router.post('/raw', sensorController.ingestRawSensorData);

// GET /api/sensors/last - Get last retrieved sensor data (with auth & rate limiting)
router.get('/last', rateLimiter, authMiddleware, sensorController.getLastRetrievedData);

// GET /api/sensors/queue/stats - Get sensor processing queue statistics
router.get('/queue/stats', authMiddleware, sensorController.getQueueStats);

// POST /api/sensors/queue/process - Manually trigger queue processing (admin only)
router.post('/queue/process', authMiddleware, sensorController.processQueue);

module.exports = router;
