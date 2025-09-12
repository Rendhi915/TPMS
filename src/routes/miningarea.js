const express = require('express');
const router = express.Router();
const miningAreaController = require('../controllers/miningAreaController');
const authMiddleware = require('../middleware/auth');

// GET /api/mining-area - Get all mining areas (GeoJSON) (protected)
router.get('/', authMiddleware, miningAreaController.getMiningAreas);

// GET /api/mining-area/:zoneName/trucks - Get trucks in specific zone (protected)
router.get('/:zoneName/trucks', authMiddleware, miningAreaController.getTrucksInZone);

// GET /api/mining-area/statistics - Get zone statistics (protected)
router.get('/statistics', authMiddleware, miningAreaController.getZoneStatistics);

// GET /api/mining-area/activity - Get zone activity report (protected)
router.get('/activity', authMiddleware, miningAreaController.getZoneActivityReport);

// GET /api/mining-area/trucks/:truckId/zones - Check which zones a truck is in (protected)
router.get('/trucks/:truckId/zones', authMiddleware, miningAreaController.checkTruckInZones);

// GET /api/mining-area/nearby - Get nearby trucks (protected)
router.get('/nearby', authMiddleware, miningAreaController.getNearbyTrucks);

// POST /api/mining-area - Create new mining zone (protected)
router.post('/', authMiddleware, miningAreaController.createMiningZone);

// PUT /api/mining-area/:zoneId - Update mining zone (protected)
router.put('/:zoneId', authMiddleware, miningAreaController.updateMiningZone);

// DELETE /api/mining-area/:zoneId - Delete/deactivate mining zone (protected)
router.delete('/:zoneId', authMiddleware, miningAreaController.deleteMiningZone);

module.exports = router;
