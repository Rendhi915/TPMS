const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/auth');

router.get('/locations', authMiddleware, truckController.getRealtimeLocations);

module.exports = router;
