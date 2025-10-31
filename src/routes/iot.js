const express = require('express');
const router = express.Router();
const iotDataController = require('../controllers/iotDataController');
const authMiddleware = require('../middleware/auth');

/**
 * POST /api/iot/data
 *
 * Single endpoint to handle multiple IoT data types based on 'cmd' field
 *
 * Supported cmd types:
 * - tpdata: Temperature & Pressure data (updates sensor_data)
 * - hubdata: Hub/Device data (updates device)
 * - state: Device state (updates device status)
 * - lock: Lock status (updates device or sensor)
 *
 * Authentication: Required
 */
router.post('/data', authMiddleware, iotDataController.handleIoTData);

module.exports = router;
