const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

// GET /api/dashboard/stats - Get basic dashboard statistics
router.get('/stats', authMiddleware, dashboardController.getDashboardStats);

// GET /api/dashboard/fleet-summary - Get comprehensive fleet summary
router.get('/fleet-summary', authMiddleware, dashboardController.getFleetSummary);

// GET /api/dashboard/alerts - Get alert summary
router.get('/alerts', authMiddleware, dashboardController.getAlertSummary);

// GET /api/dashboard/maintenance - Get maintenance report
router.get('/maintenance', authMiddleware, dashboardController.getMaintenanceReport);

// GET /api/dashboard/recent-alerts - Get recent alerts
router.get('/recent-alerts', authMiddleware, dashboardController.getRecentAlerts);

// GET /api/dashboard/fleet-performance - Get fleet performance metrics
router.get('/fleet-performance', authMiddleware, dashboardController.getFleetPerformanceMetrics);

module.exports = router;
