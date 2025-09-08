const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/auth');

// This router provides compatibility endpoints for truck location history
// All endpoints require authentication

// GET /api/location-history/:truckName
router.get('/:truckName', authMiddleware, truckController.getTruckLocationsByName);

// GET /api/tracking/:truckName/history
// GET /api/vehicles/:truckName/history
router.get('/:truckName/history', authMiddleware, truckController.getTruckLocationsByName);

module.exports = router;
