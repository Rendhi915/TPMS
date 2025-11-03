const express = require('express');
const router = express.Router();
const iotDataController = require('../controllers/iotDataController');
const authMiddleware = require('../middleware/auth');

router.post('/data', authMiddleware, iotDataController.handleIoTData);

module.exports = router;
