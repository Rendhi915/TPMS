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
      cacheStatus: 'live'
    };
    
    res.status(200).json({
      success: true,
      data: {
        ...stats,
        metadata
      },
      message: 'Dashboard statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ==========================================
// ADVANCED DASHBOARD OPERATIONS
// ==========================================

const getFleetSummary = async (req, res) => {
  try {
    const [stats, recentAlerts, fuelStats, performanceMetrics] = await Promise.all([
      prismaService.getDashboardStats(),
      getRecentAlerts(),
      getFuelAnalytics(),
      getFleetPerformanceMetrics()
    ]);

    res.status(200).json({
      success: true,
      data: {
        fleetOverview: stats,
        recentAlerts,
        fuelAnalytics: fuelStats,
        performance: performanceMetrics,
        generatedAt: new Date().toISOString()
      },
      message: 'Fleet summary retrieved successfully'
    });

  } catch (error) {
    console.error('Error in getFleetSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fleet summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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
      prismaService.prisma.alert_event.count({
        where: {
          occurred_at: { gte: since }
        }
      }),
      // Breakdown by severity (numeric severity)
      prismaService.prisma.alert_event.groupBy({
        by: ['severity'],
        where: {
          occurred_at: { gte: since }
        },
        _count: { _all: true }
      }),
      // Top alert types (sort in JS due to Prisma groupBy orderBy limitations)
      prismaService.prisma.alert_event.groupBy({
        by: ['type'],
        where: { occurred_at: { gte: since } },
        _count: { _all: true }
      }).then(results => results.sort((a, b) => (b._count._all || 0) - (a._count._all || 0)).slice(0, 5))
    ]);

    // Format severity breakdown (keep numeric keys if severities are numeric, or map to buckets if desired)
    const severityMap = {};
    severityBreakdown.forEach(item => {
      const key = item.severity == null ? 'unknown' : String(item.severity);
      severityMap[key] = item._count._all;
    });

    res.status(200).json({
      success: true,
      data: {
        timeRange,
        totalAlerts: alertStats,
        severityBreakdown: severityMap,
        topAlertTypes: topAlertTypes.map(item => ({
          type: item.type,
          count: item._count._all
        })),
        generatedAt: new Date().toISOString()
      },
      message: `Alert summary for ${timeRange} retrieved successfully`
    });

  } catch (error) {
    console.error('Error in getAlertSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alert summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getFuelReport = async (req, res) => {
  try {
    // Time window for fuel analytics
    const now = new Date();
    const since24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [fuelAggRows, latestFuelRows, fuelTrends] = await Promise.all([
      // Overall fuel statistics from recent events
      prismaService.prisma.$queryRaw`
        SELECT 
          AVG(fuel_percent) AS avg_fuel,
          MIN(fuel_percent) AS min_fuel,
          MAX(fuel_percent) AS max_fuel
        FROM fuel_level_event
        WHERE changed_at >= ${since24h}
      `,
      // Latest fuel per truck in the last 24h using DISTINCT ON (Postgres)
      prismaService.prisma.$queryRaw`
        SELECT DISTINCT ON (fle.truck_id)
          fle.truck_id,
          fle.fuel_percent,
          fle.changed_at,
          t.name AS truck_name
        FROM fuel_level_event fle
        JOIN truck t ON t.id = fle.truck_id
        WHERE fle.changed_at >= ${since24h}
        ORDER BY fle.truck_id, fle.changed_at DESC
      `,
      // Fuel consumption trends (placeholder/mocked as before)
      getFuelConsumptionTrend()
    ]);

    const agg = Array.isArray(fuelAggRows) && fuelAggRows.length ? fuelAggRows[0] : { avg_fuel: null, min_fuel: null, max_fuel: null };
    const overview = {
      averageFuel: agg.avg_fuel != null ? parseFloat(agg.avg_fuel) : 0,
      minFuel: agg.min_fuel != null ? parseFloat(agg.min_fuel) : 0,
      maxFuel: agg.max_fuel != null ? parseFloat(agg.max_fuel) : 0
    };

    // Distribution by ranges from latest readings
    const distribution = { high: 0, medium: 0, low: 0, critical: 0 };
    latestFuelRows.forEach(row => {
      const v = parseFloat(row.fuel_percent || 0);
      if (v >= 75) distribution.high += 1;
      else if (v >= 50) distribution.medium += 1;
      else if (v >= 25) distribution.low += 1;
      else distribution.critical += 1;
    });

    // Low fuel trucks from latest readings (< 25%)
    const lowFuelTrucks = latestFuelRows
      .filter(row => (row.fuel_percent || 0) < 25)
      .sort((a, b) => (a.fuel_percent || 0) - (b.fuel_percent || 0))
      .map(row => ({
        id: row.truck_id,
        truckNumber: row.truck_name,
        fuel: row.fuel_percent != null ? parseFloat(row.fuel_percent) : 0,
        driver: null,
        lastUpdate: row.changed_at
      }));

    res.status(200).json({
      success: true,
      data: {
        overview,
        distribution,
        lowFuelTrucks,
        trends: fuelTrends,
        generatedAt: new Date().toISOString()
      },
      message: 'Fuel report generated successfully'
    });

  } catch (error) {
    console.error('Error in getFuelReport:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate fuel report',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getMaintenanceReport = async (req, res) => {
  try {
    // In current schema there is no maintenance table or fields on truck.
    // We'll derive status breakdown from the latest truck_status_event per truck
    // and return empty arrays for overdue/upcoming placeholders.

    const latestStatusCounts = await prismaService.prisma.$queryRaw`
      SELECT tse.status, COUNT(*) AS count
      FROM (
        SELECT DISTINCT ON (truck_id) truck_id, status, changed_at
        FROM truck_status_event
        ORDER BY truck_id, changed_at DESC
      ) tse
      GROUP BY tse.status
    `;

    const statusBreakdown = { active: 0, inactive: 0, maintenance: 0 };
    (latestStatusCounts || []).forEach(row => {
      const key = String(row.status);
      const cnt = parseInt(row.count || 0);
      if (key in statusBreakdown) statusBreakdown[key] = cnt;
    });

    res.status(200).json({
      success: true,
      data: {
        statusBreakdown,
        overdueMaintenance: [],
        upcomingMaintenance: [],
        generatedAt: new Date().toISOString()
      },
      message: 'Maintenance report generated successfully'
    });
  } catch (error) {
    console.error('Error in getMaintenanceReport:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate maintenance report',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
// HELPER FUNCTIONS
// ==========================================

async function getRecentAlerts() {
  const alerts = await prismaService.prisma.alert_event.findMany({
    where: {
      acknowledged: false,
      occurred_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    },
    include: {
      truck: {
        select: { name: true }
      }
    },
    orderBy: { occurred_at: 'desc' },
    take: 10
  });

  return alerts.map(alert => ({
    id: alert.id,
    type: alert.type,
    severity: alert.severity,
    message: alert.detail?.message || null,
    truckName: alert.truck?.name || null,
    createdAt: alert.occurred_at
  }));
}

async function getFuelAnalytics() {
  // Use recent fuel events (last 24h)
  const rows = await prismaService.prisma.$queryRaw`
    SELECT 
      AVG(fuel_percent) AS avg_fuel,
      COUNT(CASE WHEN fuel_percent < 25 THEN 1 END) AS low_fuel_count,
      COUNT(CASE WHEN fuel_percent < 10 THEN 1 END) AS critical_fuel_count
    FROM fuel_level_event
    WHERE changed_at >= NOW() - INTERVAL '24 hours'
  `;

  const r = Array.isArray(rows) && rows.length ? rows[0] : { avg_fuel: null, low_fuel_count: 0, critical_fuel_count: 0 };
  return {
    averageFuel: r.avg_fuel != null ? parseFloat(r.avg_fuel) : 0,
    lowFuelCount: parseInt(r.low_fuel_count || 0),
    criticalFuelCount: parseInt(r.critical_fuel_count || 0)
  };
}

async function getFleetPerformanceMetrics() {
  // Compute from recent GPS positions (last 1h). Payload not tracked in current schema.
  const rows = await prismaService.prisma.$queryRaw`
    SELECT 
      AVG(speed_kph) AS avg_speed,
      MAX(speed_kph) AS max_speed
    FROM gps_position
    WHERE ts >= NOW() - INTERVAL '1 hour'
  `;

  const r = Array.isArray(rows) && rows.length ? rows[0] : { avg_speed: null, max_speed: null };
  return {
    averageSpeed: r.avg_speed != null ? parseFloat(r.avg_speed) : 0,
    maxSpeed: r.max_speed != null ? parseFloat(r.max_speed) : 0,
    averagePayload: 0,
    totalPayload: 0
  };
}

async function getFuelConsumptionTrend() {
  // This would ideally use time-series data
  // For now, return mock trend data
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      averageFuel: 65 + Math.random() * 20 // Mock data
    });
  }
  
  return days;
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
  getDashboardStats,
  getFleetSummary,
  getAlertSummary,
  getFuelReport,
  getMaintenanceReport
};