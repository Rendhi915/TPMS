const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/auth');
const { getHistoryWithSensors, getHistoryStats } = require('../services/sensorHistoryService');

router.get('/trucks/:id', authMiddleware, async (req, res) => {
  try {
    const truckId = parseInt(req.params.id);
    const { start_date, end_date, limit } = req.query;

    if (isNaN(truckId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID',
      });
    }

    const timeline = await getHistoryWithSensors(truckId, {
      startDate: start_date,
      endDate: end_date,
      limit: limit ? parseInt(limit) : 100,
    });

    res.json({
      success: true,
      truck_id: truckId,
      count: timeline.length,
      data: timeline,
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get('/trucks/:id/timeline', authMiddleware, async (req, res) => {
  try {
    const truckId = parseInt(req.params.id);
    const { start_date, end_date, limit } = req.query;

    if (isNaN(truckId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID',
      });
    }

    const timeline = await getHistoryWithSensors(truckId, {
      startDate: start_date,
      endDate: end_date,
      limit: limit ? parseInt(limit) : 100,
    });

    res.json({
      success: true,
      truck_id: truckId,
      count: timeline.length,
      data: timeline,
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get('/trucks/:id/stats', authMiddleware, async (req, res) => {
  try {
    const truckId = parseInt(req.params.id);
    const { start_date, end_date } = req.query;

    if (isNaN(truckId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID',
      });
    }

    const stats = await getHistoryStats(truckId, {
      startDate: start_date,
      endDate: end_date,
    });

    res.json({
      success: true,
      truck_id: truckId,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get('/:truckName', authMiddleware, truckController.getTruckLocationsByName);

router.get('/:truckName/history', authMiddleware, truckController.getTruckLocationsByName);

module.exports = router;
