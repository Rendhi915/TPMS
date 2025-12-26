const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/auth');

// GET /alerts - Get all alerts with pagination and filters
router.get('/', authMiddleware, alertController.getAlerts);

// GET /alerts/active - Get active alerts only
router.get('/active', authMiddleware, alertController.getActiveAlerts);

// GET /alerts/stats - Get alert statistics
router.get('/stats', authMiddleware, alertController.getAlertStats);

// GET /alerts/:id - Get single alert by ID
router.get('/:id', authMiddleware, alertController.getAlertById);

// PATCH /alerts/:id/resolve - Resolve an alert
router.patch('/:id/resolve', authMiddleware, alertController.resolveAlert);

// DELETE /alerts/:id - Delete an alert (soft delete)
router.delete('/:id', authMiddleware, alertController.deleteAlert);

module.exports = router;
