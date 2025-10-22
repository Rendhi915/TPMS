// Routes for sensor data processing
const express = require('express');
const router = express.Router();
const {
  processSensorData,
  processBulkSensorData,
  getUnprocessedData,
} = require('../controllers/sensorDataController');
const authMiddleware = require('../middleware/auth');

/**
 * @route   POST /api/sensor-data/process
 * @desc    Process single sensor data record
 * @access  Public (should be authenticated in production)
 * @body    { cmd: string, sn: string, data: object }
 *
 * Example:
 * {
 *   "cmd": "tpdata",
 *   "sn": "987654321",
 *   "data": {
 *     "tireNo": 1,
 *     "tiprValue": 248.2,
 *     "tempValue": 38.2,
 *     "bat": 85
 *   }
 * }
 */
router.post('/process', processSensorData);

/**
 * @route   POST /api/sensor-data/bulk
 * @desc    Process multiple sensor data records at once
 * @access  Public (should be authenticated in production)
 * @body    { data: array }
 *
 * Example:
 * {
 *   "data": [
 *     {
 *       "cmd": "tpdata",
 *       "sn": "987654321",
 *       "data": { "tireNo": 1, "tiprValue": 248.2, "tempValue": 38.2, "bat": 85 }
 *     },
 *     {
 *       "cmd": "device",
 *       "sn": "3462682374",
 *       "data": { "lng": 115.6044, "lat": -3.5454, "bat1": 85, "bat2": 90, "bat3": 88, "lock": 1 }
 *     }
 *   ]
 * }
 */
router.post('/bulk', processBulkSensorData);

/**
 * @route   GET /api/sensor-data/unprocessed
 * @desc    Get unprocessed sensor data records
 * @access  Private
 * @query   limit (optional, default: 100)
 * @query   cmd_type (optional, filter by command type)
 */
router.get('/unprocessed', authMiddleware, getUnprocessedData);

module.exports = router;
