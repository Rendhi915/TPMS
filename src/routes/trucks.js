const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/auth');
const { uploadTruckImage } = require('../middleware/uploadImage');
const {
  validateTruckCreate,
  validateTruckUpdate,
  validateUUIDParam,
  validatePagination,
} = require('../middleware/crudValidation');

// GET /api/trucks - Get all trucks with filters
router.get('/', authMiddleware, validatePagination, truckController.getAllTrucks);

// GET /api/trucks/summary - Get truck status summary
router.get('/summary', authMiddleware, truckController.getTruckSummary);

// GET /api/trucks/by-status - Get trucks by status
router.get('/by-status', authMiddleware, truckController.getTrucksByStatus);

// GET /api/trucks/realtime/locations - Get real-time truck locations (GeoJSON)
router.get('/realtime/locations', authMiddleware, truckController.getRealtimeLocations);

// Place truckName route BEFORE generic :id to avoid conflicts
// GET /api/trucks/:truckName/locations - Get truck location history by truck name
router.get('/:truckName/locations', authMiddleware, truckController.getTruckLocationsByName);

// GET /api/trucks/:id - Get specific truck details (protected)
router.get('/:id', authMiddleware, truckController.getTruckById);

// GET /api/trucks/:id/tires - Get truck tire pressures (protected)
router.get('/:id/tires', authMiddleware, truckController.getTruckTires);

// GET /api/trucks/:id/history - Get truck location history
router.get('/:id/history', authMiddleware, truckController.getTruckLocationHistory);

// GET /api/trucks/:id/alerts - Get truck alerts (protected)
router.get('/:id/alerts', authMiddleware, truckController.getTruckAlerts);

// GET /api/trucks/:id/location-history - Get truck location history (alternative)
router.get('/:id/location-history', authMiddleware, truckController.getTruckLocationHistoryAlt);

// PUT /api/trucks/:id/status - Update truck status (protected)
router.put('/:id/status', authMiddleware, truckController.updateTruckStatus);

// PUT /api/trucks/:id/alerts/:alertId/resolve - Resolve truck alert (protected)
router.put('/:id/alerts/:alertId/resolve', authMiddleware, truckController.resolveAlert);

// PUT /api/trucks/bulk/status - Bulk update truck status (protected)
router.put('/bulk/status', authMiddleware, truckController.bulkUpdateTruckStatus);

// POST /api/trucks - Create new truck (protected)
router.post(
  '/',
  authMiddleware,
  uploadTruckImage,
  validateTruckCreate,
  truckController.createTruck
);

// PUT /api/trucks/:id - Update truck (protected)
router.put(
  '/:id',
  authMiddleware,
  uploadTruckImage,
  validateTruckUpdate,
  truckController.updateTruck
);

// DELETE /api/trucks/:id - Delete truck (protected)
router.delete('/:id', authMiddleware, validateUUIDParam('id'), truckController.deleteTruck);

// Compatibility routes moved to src/routes/history.js and mounted in routes/index.js

module.exports = router;
