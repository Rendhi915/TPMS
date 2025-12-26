const express = require('express');
const authRoutes = require('./auth');
const truckRoutes = require('./trucks');
const dashboardRoutes = require('./dashboard');
const miningAreaRoutes = require('./miningarea');
const fleetRoutes = require('./fleet');
const vendorRoutes = require('./vendors');
const driverRoutes = require('./drivers');
const iotRoutes = require('./iot'); 
const alertRoutes = require('./alerts'); 
const historyRoutes = require('./history');
const userRoutes = require('./users');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/trucks', truckRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mining-area', miningAreaRoutes);
router.use('/vendors', vendorRoutes);
router.use('/drivers', driverRoutes);
router.use('/fleet', fleetRoutes);
router.use('/iot', iotRoutes); 
router.use('/alerts', alertRoutes); 
router.use('/history', historyRoutes); 
router.use('/location-history', require('./history'));
router.use('/tracking', require('./history'));

module.exports = router;
