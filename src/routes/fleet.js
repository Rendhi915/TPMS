const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/auth');

// Compatibility endpoint: GET /api/fleet/locations
// Maps to the same handler as /api/trucks/realtime/locations
router.get('/locations', authMiddleware, truckController.getRealtimeLocations);

module.exports = router;
