const { prisma } = require('../config/prisma');
const { broadcastAlertResolved } = require('../services/websocketService');

// ==========================================
// GET ALL ALERTS
// ==========================================
const getAlerts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      severity,
      status,
      truck_id,
      device_id,
      sensor_id,
      date_from,
      date_to,
      date, // For filtering specific day (YYYY-MM-DD)
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (severity) {
      where.alert = { severity };
    }

    if (status) {
      where.status = status;
    }

    if (truck_id) {
      where.truck_id = parseInt(truck_id);
    }

    if (device_id) {
      where.device_id = parseInt(device_id);
    }

    if (sensor_id) {
      where.sensor_id = parseInt(sensor_id);
    }

    // Date filtering
    if (date) {
      // Filter for specific day (00:00:00 to 23:59:59)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.created_at = {
        gte: startOfDay,
        lte: endOfDay,
      };
    } else if (date_from || date_to) {
      // Date range filtering
      where.created_at = {};

      if (date_from) {
        where.created_at.gte = new Date(date_from);
      }

      if (date_to) {
        const endDate = new Date(date_to);
        endDate.setHours(23, 59, 59, 999);
        where.created_at.lte = endDate;
      }
    }

    // Get alerts with relations
    const [alerts, total] = await Promise.all([
      prisma.alert_events.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          alert: {
            select: {
              id: true,
              code: true,
              name: true,
              description: true,
              severity: true,
            },
          },
          truck: {
            select: {
              id: true,
              name: true,
              plate: true,
              model: true,
            },
          },
          device: {
            select: {
              id: true,
              sn: true,
            },
          },
          sensor: {
            select: {
              id: true,
              sn: true,
              tireNo: true,
            },
          },
        },
      }),
      prisma.alert_events.count({ where }),
    ]);

    res.json({
      success: true,
      data: alerts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('❌ Error getting alerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// GET ACTIVE ALERTS
// ==========================================
const getActiveAlerts = async (req, res) => {
  try {
    const { severity, truck_id } = req.query;

    const where = {
      status: 'active',
    };

    if (severity) {
      where.alert = { severity };
    }

    if (truck_id) {
      where.truck_id = parseInt(truck_id);
    }

    const alerts = await prisma.alert_events.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        alert: true,
        truck: {
          select: {
            id: true,
            name: true,
            plate: true,
            model: true,
          },
        },
        device: {
          select: {
            id: true,
            sn: true,
          },
        },
        sensor: {
          select: {
            id: true,
            sn: true,
            tireNo: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: alerts,
      count: alerts.length,
    });
  } catch (error) {
    console.error('❌ Error getting active alerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// GET ALERT STATISTICS
// ==========================================
const getAlertStats = async (req, res) => {
  try {
    const { truck_id, days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const where = {
      created_at: {
        gte: startDate,
      },
    };

    if (truck_id) {
      where.truck_id = parseInt(truck_id);
    }

    // Get stats
    const [totalAlerts, activeAlerts, resolvedAlerts, criticalAlerts, warningAlerts, alertsByType] =
      await Promise.all([
        // Total alerts in period
        prisma.alert_events.count({ where }),

        // Active alerts
        prisma.alert_events.count({
          where: { ...where, status: 'active' },
        }),

        // Resolved alerts
        prisma.alert_events.count({
          where: { ...where, status: 'resolved' },
        }),

        // Critical alerts
        prisma.alert_events.count({
          where: {
            ...where,
            alert: { severity: 'critical' },
          },
        }),

        // Warning alerts
        prisma.alert_events.count({
          where: {
            ...where,
            alert: { severity: 'warning' },
          },
        }),

        // Alerts by type
        prisma.alert_events.groupBy({
          by: ['alert_id'],
          where,
          _count: true,
        }),
      ]);

    // Get alert type details
    const alertTypeCounts = await Promise.all(
      alertsByType.map(async (item) => {
        const alert = await prisma.alert.findUnique({
          where: { id: item.alert_id },
        });
        return {
          code: alert.code,
          name: alert.name,
          severity: alert.severity,
          count: item._count,
        };
      })
    );

    res.json({
      success: true,
      data: {
        summary: {
          total: totalAlerts,
          active: activeAlerts,
          resolved: resolvedAlerts,
          critical: criticalAlerts,
          warning: warningAlerts,
        },
        byType: alertTypeCounts.sort((a, b) => b.count - a.count),
        period: {
          days: parseInt(days),
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('❌ Error getting alert stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alert statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// GET ALERT BY ID
// ==========================================
const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await prisma.alert_events.findUnique({
      where: { id: parseInt(id) },
      include: {
        alert: true,
        truck: {
          select: {
            id: true,
            name: true,
            plate: true,
            model: true,
            vin: true,
          },
        },
        device: {
          select: {
            id: true,
            sn: true,
            sim_number: true,
          },
        },
        sensor: {
          select: {
            id: true,
            sn: true,
            tireNo: true,
            tempValue: true,
            tirepValue: true,
            exType: true,
          },
        },
      },
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found',
      });
    }

    res.json({
      success: true,
      data: alert,
    });
  } catch (error) {
    console.error('❌ Error getting alert by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alert',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// RESOLVE ALERT
// ==========================================
const resolveAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const alert = await prisma.alert_events.findUnique({
      where: { id: parseInt(id) },
      include: {
        alert: true,
        truck: true,
        device: true,
        sensor: true,
      },
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found',
      });
    }

    if (alert.status === 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Alert already resolved',
      });
    }

    const updatedAlert = await prisma.alert_events.update({
      where: { id: parseInt(id) },
      data: {
        status: 'resolved',
        resolved_at: new Date(),
        message: notes ? `${alert.message}\nResolution notes: ${notes}` : alert.message,
      },
      include: {
        alert: true,
        truck: true,
        device: true,
        sensor: true,
      },
    });

    // Broadcast alert resolved
    broadcastAlertResolved({
      id: updatedAlert.id,
      alert_code: updatedAlert.alert.code,
      alert_name: updatedAlert.alert.name,
      severity: updatedAlert.alert.severity,
      truck_id: updatedAlert.truck_id,
      truck_plate: updatedAlert.truck?.plate,
      resolved_at: updatedAlert.resolved_at,
    });

    res.json({
      success: true,
      data: updatedAlert,
      message: 'Alert resolved successfully',
    });
  } catch (error) {
    console.error('❌ Error resolving alert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resolve alert',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// DELETE ALERT
// ==========================================
const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await prisma.alert_events.findUnique({
      where: { id: parseInt(id) },
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found',
      });
    }

    // Soft delete by setting status to 'deleted'
    await prisma.alert_events.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: 'Alert deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting alert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete alert',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = {
  getAlerts,
  getActiveAlerts,
  getAlertStats,
  getAlertById,
  resolveAlert,
  deleteAlert,
};
