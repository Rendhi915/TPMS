// src/services/databaseService.js
const { PrismaClient } = require('@prisma/client');

// Create Prisma instance with proper configuration
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty',
});

// Database connection health check
async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { status: 'unhealthy', error: error.message, timestamp: new Date() };
  }
}

// Helper functions for common operations
const DatabaseHelpers = {
  /**
   * Execute raw spatial queries safely
   */
  async executeSpatialQuery(query, params = []) {
    try {
      return await prisma.$queryRawUnsafe(query, ...params);
    } catch (error) {
      console.error('Spatial query error:', error);
      throw error;
    }
  },

  /**
   * Get trucks within radius of a point
   */
  async getTrucksWithinRadius(latitude, longitude, radiusKm) {
    const query = `
      SELECT 
        t.id,
        t.truck_number as "truckNumber",
        t.status,
        t.latitude,
        t.longitude,
        t.speed,
        t.fuel_percentage as "fuelPercentage",
        t.driver_name as "driverName",
        ST_Distance(
          ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
          ST_SetSRID(ST_MakePoint($1, $2), 4326)
        ) * 111.139 as "distanceKm"
      FROM trucks t
      WHERE ST_DWithin(
        ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3
      )
      AND t.latitude IS NOT NULL 
      AND t.longitude IS NOT NULL
      AND t.status = 'active'
      ORDER BY "distanceKm" ASC
    `;

    return await this.executeSpatialQuery(query, [longitude, latitude, radiusKm / 111.139]);
  },

  /**
   * Get trucks in specific mining zone
   */
  async getTrucksInZone(zoneName) {
    const query = `
      SELECT 
        t.id,
        t.truck_number as "truckNumber",
        t.status,
        t.latitude,
        t.longitude,
        t.speed,
        t.fuel_percentage as "fuelPercentage",
        t.payload_tons as "payloadTons",
        t.driver_name as "driverName",
        mz.name as "zoneName",
        mz.zone_type as "zoneType",
        ST_Distance(
          ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
          ST_Centroid(mz.boundary)
        ) * 111.139 as "distanceFromCenterKm"
      FROM trucks t
      JOIN mining_zones mz ON ST_Within(
        ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
        mz.boundary
      )
      WHERE mz.name = $1
        AND mz.is_active = true 
        AND t.latitude IS NOT NULL 
        AND t.longitude IS NOT NULL
      ORDER BY "distanceFromCenterKm" ASC
    `;

    return await this.executeSpatialQuery(query, [zoneName]);
  },

  /**
   * Check if point is within any mining zone
   */
  async getZoneAtPoint(latitude, longitude) {
    const query = `
      SELECT 
        mz.id,
        mz.name,
        mz.zone_type as "zoneType",
        mz.is_active as "isActive"
      FROM mining_zones mz
      WHERE ST_Within(
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        mz.boundary
      )
      AND mz.is_active = true
      LIMIT 1
    `;

    const result = await this.executeSpatialQuery(query, [longitude, latitude]);
    return result[0] || null;
  },

  /**
   * Bulk update truck locations with transaction
   */
  async bulkUpdateTruckLocations(updates) {
    return await prisma.$transaction(async (tx) => {
      const results = [];
      const locationHistories = [];

      for (const update of updates) {
        const { id, latitude, longitude, speed, heading, fuelPercentage } = update;

        // Update truck
        const truck = await tx.truck.update({
          where: { id: parseInt(id) },
          data: {
            latitude: latitude ? parseFloat(latitude) : undefined,
            longitude: longitude ? parseFloat(longitude) : undefined,
            speed: speed !== undefined ? parseFloat(speed) : undefined,
            heading: heading !== undefined ? parseInt(heading) : undefined,
            fuelPercentage: fuelPercentage !== undefined ? parseFloat(fuelPercentage) : undefined,
            updatedAt: new Date(),
          },
          select: { id: true, truckNumber: true },
        });

        results.push(truck);

        // Prepare location history entry
        if (latitude !== undefined && longitude !== undefined) {
          locationHistories.push({
            truckId: parseInt(id),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            speed: speed !== undefined ? parseFloat(speed) : 0,
            heading: heading !== undefined ? parseInt(heading) : 0,
            fuelPercentage: fuelPercentage !== undefined ? parseFloat(fuelPercentage) : null,
            recordedAt: new Date(),
          });
        }
      }

      // Bulk create location histories
      if (locationHistories.length > 0) {
        await tx.locationHistory.createMany({
          data: locationHistories,
        });
      }

      return results;
    });
  },

  /**
   * Get trucks with alerts summary
   */
  async getTrucksWithAlerts() {
    return await prisma.truck.findMany({
      where: {
        alerts: {
          some: { isResolved: false },
        },
      },
      select: {
        id: true,
        truckNumber: true,
        status: true,
        latitude: true,
        longitude: true,
        driverName: true,
        _count: {
          select: {
            alerts: {
              where: { isResolved: false },
            },
          },
        },
        alerts: {
          where: { isResolved: false },
          select: {
            id: true,
            alertType: true,
            severity: true,
            message: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
      orderBy: {
        alerts: {
          _count: 'desc',
        },
      },
    });
  },

  /**
   * Create alert with automatic severity detection
   */
  async createAlert(truckId, alertType, message, customSeverity = null) {
    const severityMap = {
      'Low Fuel': 'high',
      'Engine Warning': 'critical',
      'Tire Pressure Low': 'medium',
      'Tire Pressure High': 'medium',
      'GPS Signal Lost': 'high',
      'Overload Warning': 'high',
      'Scheduled Maintenance': 'low',
      'Speed Limit Exceeded': 'medium',
      'Geofence Violation': 'medium',
    };

    const severity = customSeverity || severityMap[alertType] || 'medium';

    return await prisma.truckAlert.create({
      data: {
        truckId: parseInt(truckId),
        alertType,
        severity,
        message,
        isResolved: false,
      },
      include: {
        truck: {
          select: { truckNumber: true },
        },
      },
    });
  },

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(timeRangeHours = 24) {
    const timeAgo = new Date(Date.now() - timeRangeHours * 60 * 60 * 1000);

    const [totalDistance, avgSpeed, fuelConsumption, alertsCreated, trucksActive] =
      await Promise.all([
        // Calculate total distance from location history
        prisma.$queryRaw`
        SELECT COALESCE(SUM(
          ST_Distance(
            ST_SetSRID(ST_MakePoint(lng1, lat1), 4326),
            ST_SetSRID(ST_MakePoint(lng2, lat2), 4326)
          ) * 111.139
        ), 0) as total_distance_km
        FROM (
          SELECT 
            latitude as lat1, longitude as lng1,
            LEAD(latitude) OVER (PARTITION BY truck_id ORDER BY recorded_at) as lat2,
            LEAD(longitude) OVER (PARTITION BY truck_id ORDER BY recorded_at) as lng2
          FROM location_history 
          WHERE recorded_at >= ${timeAgo}
          AND latitude IS NOT NULL AND longitude IS NOT NULL
        ) distances
        WHERE lat2 IS NOT NULL AND lng2 IS NOT NULL
      `,

        // Average speed
        prisma.locationHistory.aggregate({
          where: {
            recordedAt: { gte: timeAgo },
            speed: { gt: 0 },
          },
          _avg: { speed: true },
        }),

        // Fuel consumption estimate (simplified)
        prisma.$queryRaw`
        SELECT 
          AVG(fuel_start - fuel_end) as avg_fuel_consumption
        FROM (
          SELECT 
            truck_id,
            FIRST_VALUE(fuel_percentage) OVER (
              PARTITION BY truck_id ORDER BY recorded_at ASC
            ) as fuel_start,
            FIRST_VALUE(fuel_percentage) OVER (
              PARTITION BY truck_id ORDER BY recorded_at DESC
            ) as fuel_end
          FROM location_history 
          WHERE recorded_at >= ${timeAgo}
          AND fuel_percentage IS NOT NULL
        ) fuel_data
        GROUP BY truck_id
      `,

        // Alerts created in time range
        prisma.truckAlert.count({
          where: {
            createdAt: { gte: timeAgo },
          },
        }),

        // Active trucks count
        prisma.truck.count({
          where: { status: 'active' },
        }),
      ]);

    return {
      timeRangeHours,
      totalDistanceKm: totalDistance[0]?.total_distance_km || 0,
      averageSpeed: avgSpeed._avg.speed || 0,
      estimatedFuelConsumption: fuelConsumption[0]?.avg_fuel_consumption || 0,
      alertsGenerated: alertsCreated,
      activeTrucks: trucksActive,
    };
  },

  /**
   * Clean old location history data
   */
  async cleanOldLocationHistory(daysToKeep = 30) {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

    const deleted = await prisma.locationHistory.deleteMany({
      where: {
        recordedAt: { lt: cutoffDate },
      },
    });

    return deleted.count;
  },
};

// Middleware for database connection
const databaseMiddleware = async (req, res, next) => {
  try {
    // Check if database is connected
    await prisma.$queryRaw`SELECT 1`;
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({
      success: false,
      error: 'Database service unavailable',
    });
  }
};

// Graceful shutdown handler
async function gracefulShutdown() {
  console.log('Closing database connections...');
  await prisma.$disconnect();
  console.log('Database connections closed.');
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = {
  prisma,
  healthCheck,
  DatabaseHelpers,
  databaseMiddleware,
  gracefulShutdown,
};
