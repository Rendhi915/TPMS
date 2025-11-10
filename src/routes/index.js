const express = require('express');
const authRoutes = require('./auth');
const truckRoutes = require('./trucks');
const dashboardRoutes = require('./dashboard');
const miningAreaRoutes = require('./miningarea');
const fleetRoutes = require('./fleet');
const vendorRoutes = require('./vendors');
const driverRoutes = require('./drivers');
const iotRoutes = require('./iot'); // UNIFIED ENDPOINT - handles device, sensor CRUD + IoT ingestion

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/trucks', truckRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mining-area', miningAreaRoutes);
router.use('/vendors', vendorRoutes);
router.use('/drivers', driverRoutes);
router.use('/fleet', fleetRoutes);
router.use('/iot', iotRoutes); // POST /api/iot/data - Single endpoint for device/sensor CRUD + IoT hardware data

// Additional routes for frontend compatibility
// Use dedicated history router to avoid path duplication like /location-history/location-history/:plateNumber
router.use('/location-history', require('./history'));
router.use('/tracking', require('./history'));

module.exports = router;
