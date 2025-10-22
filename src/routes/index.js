const express = require('express');
const authRoutes = require('./auth');
const truckRoutes = require('./trucks');
const dashboardRoutes = require('./dashboard');
const sensorRoutes = require('./sensors');
const sensorDataRoutes = require('./sensor-data');
const miningAreaRoutes = require('./miningarea');
const fleetRoutes = require('./fleet');
const vendorRoutes = require('./vendors');
const driverRoutes = require('./drivers');
const deviceRoutes = require('./devices');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/trucks', truckRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mining-area', miningAreaRoutes);
router.use('/sensors', sensorRoutes);
router.use('/sensor-data', sensorDataRoutes);
router.use('/vendors', vendorRoutes);
router.use('/drivers', driverRoutes);
router.use('/devices', deviceRoutes);
router.use('/fleet', fleetRoutes);

// Additional routes for frontend compatibility
// Use dedicated history router to avoid path duplication like /location-history/location-history/:plateNumber
router.use('/location-history', require('./history'));
router.use('/tracking', require('./history'));

module.exports = router;
