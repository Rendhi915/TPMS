const prismaService = require('../services/simplePrismaService');

// ==========================================
// DASHBOARD CONTROLLER - PRISMA VERSION
// ==========================================

const getDashboardStats = async (req, res) => {
  try {
    const stats = await prismaService.getDashboardStats();

    // Add performance metadata
    const metadata = {
      dataFreshness: 'real-time',
      lastUpdated: new Date().toISOString(),
      cacheStatus: 'live',
    };

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        metadata,
      },
      message: 'Dashboard statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// ADVANCED DASHBOARD OPERATIONS
// ==========================================

const getFleetSummary = async (req, res) => {
  try {
    const [stats, recentAlerts, performanceMetrics] = await Promise.all([
      prismaService.getDashboardStats(),
      getRecentAlerts(),
      getFleetPerformanceMetrics(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        fleetOverview: stats,
        recentAlerts,
        performance: performanceMetrics,
        generatedAt: new Date().toISOString(),
      },
      message: 'Fleet summary retrieved successfully',
    });
  } catch (error) {
    console.error('Error in getFleetSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fleet summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getAlertSummary = async (req, res) => {
  try {
    const { timeRange = '24h' } = req.query;

    // Calculate time range
    const since = new Date();
    switch (timeRange) {
      case '1h':
        since.setHours(since.getHours() - 1);
        break;
      case '24h':
        since.setHours(since.getHours() - 24);
        break;
      case '7d':
        since.setDate(since.getDate() - 7);
        break;
      case '30d':
        since.setDate(since.getDate() - 30);
        break;
      default:
        since.setHours(since.getHours() - 24);
    }

    const [alertStats, severityBreakdown, topAlertTypes] = await Promise.all([
      // Total alerts in time range
      prismaService.prisma.alert_events.count({
        where: {
          created_at: { gte: since },
        },
      }),
      // Breakdown by severity - alert_events doesn't have severity, group by status instead
      prismaService.prisma.alert_events.groupBy({
        by: ['status'],
        where: {
          created_at: { gte: since },
        },
        _count: { _all: true },
      }),
      // Top alert types - use alert relation to get code
      prismaService.prisma.alert_events.findMany({
        where: {
          created_at: { gte: since },
        },
        include: {
          alert: {
            select: {
              code: true,
              name: true,
            },
          },
        },
      }),
    ]);

    // Count alert codes manually since alert_events doesn't have code directly
    const alertCodeCounts = {};
    topAlertTypes.forEach((event) => {
      const code = event.alert?.code || 'unknown';
      alertCodeCounts[code] = (alertCodeCounts[code] || 0) + 1;
    });

    const sortedAlertTypes = Object.entries(alertCodeCounts)
      .map(([code, count]) => ({ code, _count: { _all: count } }))
      .sort((a, b) => b._count._all - a._count._all)
      .slice(0, 5);

    // Format status breakdown (was severity)
    const statusMap = {};
    severityBreakdown.forEach((item) => {
      const key = item.status || 'unknown';
      statusMap[key] = item._count._all;
    });

    res.status(200).json({
      success: true,
      data: {
        timeRange,
        totalAlerts: alertStats,
        statusBreakdown: statusMap,
        topAlertCodes: sortedAlertTypes.map((item) => ({
          code: item.code,
          count: item._count._all,
        })),
        generatedAt: new Date().toISOString(),
      },
      message: `Alert summary for ${timeRange} retrieved successfully`,
    });
  } catch (error) {
    console.error('Error in getAlertSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alert summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getMaintenanceReport = async (req, res) => {
  try {
    // Get truck status breakdown from truck table
    const statusCounts = await prismaService.prisma.truck.groupBy({
      by: ['status'],
      where: {
        deleted_at: null,
      },
      _count: { _all: true },
    });

    const statusBreakdown = { active: 0, inactive: 0, maintenance: 0 };
    statusCounts.forEach((row) => {
      const key = String(row.status);
      const cnt = row._count._all || 0;
      if (key in statusBreakdown) statusBreakdown[key] = cnt;
    });

    res.status(200).json({
      success: true,
      data: {
        statusBreakdown,
        overdueMaintenance: [],
        upcomingMaintenance: [],
        generatedAt: new Date().toISOString(),
      },
      message: 'Maintenance report generated successfully',
    });
  } catch (error) {
    console.error('Error in getMaintenanceReport:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate maintenance report',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// GET RECENT ALERTS
const getRecentAlertsController = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const alerts = await prismaService.prisma.alert_events.findMany({
      where: {
        status: 'active',
        created_at: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        truck: {
          select: {
            id: true,
            plate: true,
            name: true,
          },
        },
        alert: {
          select: { code: true, name: true, severity: true },
        },
        device: {
          select: {
            id: true,
            sn: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: parseInt(limit),
    });

    const formattedAlerts = alerts.map((alert) => ({
      id: alert.id,
      code: alert.alert?.code || 'unknown',
      name: alert.alert?.name || 'Unknown Alert',
      severity: alert.alert?.severity || 'warning',
      message: alert.message,
      value: alert.value,
      status: alert.status,
      truck: alert.truck
        ? {
            id: alert.truck.id,
            plate: alert.truck.plate,
            name: alert.truck.name,
          }
        : null,
      device: alert.device
        ? {
            id: alert.device.id,
            sn: alert.device.sn,
          }
        : null,
      created_at: alert.created_at,
      resolved_at: alert.resolved_at,
    }));

    res.status(200).json({
      success: true,
      data: {
        alerts: formattedAlerts,
        count: formattedAlerts.length,
      },
      message: 'Recent alerts retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting recent alerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recent alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// GET FLEET PERFORMANCE
const getFleetPerformanceController = async (req, res) => {
  try {
    const metrics = await getFleetPerformanceMetrics();

    res.status(200).json({
      success: true,
      data: metrics,
      message: 'Fleet performance metrics retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting fleet performance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get fleet performance',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// HELPER FUNCTIONS
// ==========================================

async function getRecentAlerts() {
  const alerts = await prismaService.prisma.alert_events.findMany({
    where: {
      status: 'active',
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    include: {
      truck: {
        select: { plate: true },
      },
      alert: {
        select: { code: true, name: true },
      },
    },
    orderBy: { created_at: 'desc' },
    take: 10,
  });

  return alerts.map((alert) => ({
    id: alert.id,
    code: alert.alert?.code || 'unknown',
    name: alert.alert?.name || 'Unknown Alert',
    message: alert.message,
    truckPlate: alert.truck?.plate || null,
    createdAt: alert.created_at,
  }));
}

async function getFleetPerformanceMetrics() {
  // Since location table doesn't have speed/heading, return basic metrics
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const [recentLocationCount, totalTrucks, activeTrucks] = await Promise.all([
    prismaService.prisma.location.count({
      where: {
        created_at: { gte: oneHourAgo },
      },
    }),
    prismaService.prisma.truck.count({
      where: { deleted_at: null },
    }),
    prismaService.prisma.truck.count({
      where: {
        status: 'operational',
        deleted_at: null,
      },
    }),
  ]);

  return {
    activeVehicles: activeTrucks,
    totalVehicles: totalTrucks,
    recentLocationUpdates: recentLocationCount,
    utilizationRate: totalTrucks > 0 ? ((activeTrucks / totalTrucks) * 100).toFixed(2) : 0,
    // Speed/payload metrics not available in current schema
    averageSpeed: null,
    maxSpeed: null,
    averagePayload: null,
    totalPayload: null,
  };
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
  getDashboardStats,
  getFleetSummary,
  getAlertSummary,
  getMaintenanceReport,
  getRecentAlerts: getRecentAlertsController,
  getFleetPerformanceMetrics: getFleetPerformanceController,
};
