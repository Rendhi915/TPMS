const { PrismaClient } = require('../../prisma/generated/client');

// Initialize Prisma Client with optimizations
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'colorless',
});

// Prisma Service Class
class PrismaService {
  constructor() {
    this.prisma = prisma;
  }

  // Connection management
  async connect() {
    try {
      await this.prisma.$connect();
      console.log('✅ Prisma connected to database');
    } catch (error) {
      console.error('❌ Prisma connection failed:', error);
      throw error;
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  // Health check
  async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', timestamp: new Date() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message, timestamp: new Date() };
    }
  }

  // ==========================================
  // TRUCK OPERATIONS
  // ==========================================

  async getAllTrucks(filters = {}) {
    const { status, page = 1, limit = 50, search, minFuel, maxFuel, hasAlerts } = filters;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};

    // Filter by status - using truck status events
    if (status && status !== 'all') {
      where.truckStatusEvents = {
        some: {
          status: status,
        },
      };
    }

    // Search filter
    if (search) {
      where.OR = [
        { plateNumber: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fuel filters - using fuel level events
    if (minFuel !== undefined || maxFuel !== undefined) {
      const fuelWhere = {};
      if (minFuel !== undefined) fuelWhere.gte = parseFloat(minFuel);
      if (maxFuel !== undefined) fuelWhere.lte = parseFloat(maxFuel);

      where.fuelLevelEvents = {
        some: {
          fuelPercent: fuelWhere,
        },
      };
    }

    // Alerts filter
    if (hasAlerts === 'true') {
      where.alertEvents = {
        some: { acknowledged: false },
      };
    }

    try {
      // Get trucks with relations
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleetGroup: true,
          alertEvents: {
            where: { acknowledged: false },
            select: {
              id: true,
              type: true,
              severity: true,
              detail: true,
              occurredAt: true,
            },
            take: 5,
          },
          _count: {
            select: {
              alertEvents: {
                where: { acknowledged: false },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: parseInt(limit),
      });

      // Get total count for pagination
      const totalCount = await this.prisma.truck.count({ where });

      // Get summary statistics
      const summary = await this.getTruckSummaryStats();

      return {
        trucks: trucks.map(this.formatTruckResponse),
        pagination: {
          current_page: parseInt(page),
          per_page: parseInt(limit),
          total: totalCount,
          total_pages: Math.ceil(totalCount / limit),
        },
        summary,
      };
    } catch (error) {
      console.error('Error in getAllTrucks:', error);
      throw error;
    }
  }

  async getTruckById(truckId) {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id: parseInt(truckId) },
        include: {
          model: true,
          tirePressures: {
            orderBy: { tireNumber: 'asc' },
          },
          alerts: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!truck) {
        throw new Error('Truck not found');
      }

      return this.formatTruckDetailResponse(truck);
    } catch (error) {
      console.error('Error in getTruckById:', error);
      throw error;
    }
  }

  async getTruckTires(truckId) {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id: parseInt(truckId) },
        select: {
          id: true,
          truckNumber: true,
          tirePressures: {
            orderBy: { tireNumber: 'asc' },
          },
        },
      });

      if (!truck) {
        throw new Error('Truck not found');
      }

      return {
        truckId: truck.id,
        truckNumber: truck.truckNumber,
        tirePressures: truck.tirePressures.map((tire) => ({
          position: tire.tirePosition,
          tireNumber: tire.tireNumber,
          pressure: parseFloat(tire.pressurePsi),
          status: tire.status,
          temperature: tire.temperature ? parseFloat(tire.temperature) : null,
          lastUpdated: tire.recordedAt,
        })),
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Error in getTruckTires:', error);
      throw error;
    }
  }

  async getRealtimeLocations(status) {
    try {
      const where = {
        AND: [{ latitude: { not: null } }, { longitude: { not: null } }],
      };

      if (status && status !== 'all') {
        where.status = status;
      }

      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          model: true,
          _count: {
            select: {
              alerts: {
                where: { isResolved: false },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      // Format as GeoJSON
      const geoJsonData = {
        type: 'FeatureCollection',
        features: trucks.map((truck) => ({
          type: 'Feature',
          properties: {
            id: truck.id,
            truckNumber: truck.truckNumber,
            model: truck.model?.name,
            status: truck.status,
            speed: parseFloat(truck.speed),
            heading: truck.heading,
            fuel: parseFloat(truck.fuelPercentage),
            payload: parseFloat(truck.payloadTons),
            driver: truck.driverName,
            lastUpdate: truck.updatedAt,
            alertCount: truck._count.alerts,
          },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(truck.longitude), parseFloat(truck.latitude)],
          },
        })),
      };

      return geoJsonData;
    } catch (error) {
      console.error('Error in getRealtimeLocations:', error);
      throw error;
    }
  }

  async updateTruckStatus(truckId, status) {
    try {
      const updatedTruck = await this.prisma.truck.update({
        where: { id: parseInt(truckId) },
        data: {
          status,
          updatedAt: new Date(),
        },
      });

      return {
        id: updatedTruck.id,
        truckNumber: updatedTruck.truckNumber,
        status: updatedTruck.status,
        lastUpdate: updatedTruck.updatedAt,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Truck not found');
      }
      console.error('Error in updateTruckStatus:', error);
      throw error;
    }
  }

  // ==========================================
  // DASHBOARD OPERATIONS
  // ==========================================

  async getDashboardStats() {
    try {
      const [truckStats, alertsCount, lowTireCount] = await Promise.all([
        // Truck statistics
        this.prisma.truck.aggregate({
          _count: {
            _all: true,
          },
          _avg: {
            fuelPercentage: true,
          },
          _sum: {
            payloadTons: true,
          },
        }),
        // Active alerts count
        this.prisma.truckAlert.count({
          where: { isResolved: false },
        }),
        // Low tire pressure count
        this.prisma.truck.count({
          where: {
            tirePressures: {
              some: { status: 'low' },
            },
          },
        }),
      ]);

      // Get status breakdown
      const statusStats = await this.prisma.truck.groupBy({
        by: ['status'],
        _count: {
          _all: true,
        },
      });

      // Format status counts
      const statusCounts = {
        active: 0,
        inactive: 0,
        maintenance: 0,
      };

      statusStats.forEach((stat) => {
        statusCounts[stat.status] = stat._count._all;
      });

      return {
        totalTrucks: truckStats._count._all,
        activeTrucks: statusCounts.active,
        inactiveTrucks: statusCounts.inactive,
        maintenanceTrucks: statusCounts.maintenance,
        averageFuel: parseFloat(truckStats._avg.fuelPercentage) || 0,
        totalPayload: parseFloat(truckStats._sum.payloadTons) || 0,
        alertsCount,
        lowTirePressureCount: lowTireCount,
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }

  // ==========================================
  // MINING AREA OPERATIONS (with PostGIS)
  // ==========================================

  async getMiningAreasWithGeometry() {
    try {
      // Use raw SQL for PostGIS geometry operations
      const areas = await this.prisma.$queryRaw`
        SELECT 
          id,
          name,
          zone_type,
          ST_AsGeoJSON(boundary) as boundary_geojson,
          is_active,
          created_at
        FROM mining_zones
        WHERE is_active = true
      `;

      return {
        type: 'FeatureCollection',
        features: areas.map((area) => ({
          type: 'Feature',
          properties: {
            id: area.id,
            name: area.name,
            zoneType: area.zone_type,
            isActive: area.is_active,
            createdAt: area.created_at,
          },
          geometry: JSON.parse(area.boundary_geojson),
        })),
      };
    } catch (error) {
      console.error('Error in getMiningAreasWithGeometry:', error);
      throw error;
    }
  }

  async getTrucksInZone(zoneName) {
    try {
      // Use raw SQL for spatial query
      const trucksInZone = await this.prisma.$queryRaw`
        SELECT 
          t.id,
          t.truck_number,
          t.status,
          ST_Distance(
            ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
            ST_Centroid(mz.boundary)
          ) as distance_from_center
        FROM trucks t
        JOIN mining_zones mz ON ST_Within(
          ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326),
          mz.boundary
        )
        WHERE mz.name = ${zoneName}
          AND mz.is_active = true
          AND t.latitude IS NOT NULL
          AND t.longitude IS NOT NULL
        ORDER BY distance_from_center ASC
      `;

      return trucksInZone.map((truck) => ({
        truckId: truck.id,
        truckNumber: truck.truck_number,
        status: truck.status,
        distanceFromCenter: parseFloat(truck.distance_from_center),
      }));
    } catch (error) {
      console.error('Error in getTrucksInZone:', error);
      throw error;
    }
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  async getTruckSummaryStats() {
    try {
      const statusStats = await this.prisma.truck.groupBy({
        by: ['status'],
        _count: {
          _all: true,
        },
      });

      const summary = {
        total_trucks: 0,
        active: 0,
        inactive: 0,
        maintenance: 0,
      };

      statusStats.forEach((stat) => {
        summary.total_trucks += stat._count._all;
        summary[stat.status] = stat._count._all;
      });

      return summary;
    } catch (error) {
      console.error('Error in getTruckSummaryStats:', error);
      throw error;
    }
  }

  formatTruckResponse(truck) {
    return {
      id: truck.id,
      truckNumber: truck.truckNumber,
      model: truck.model?.name,
      manufacturer: truck.model?.manufacturer,
      status: truck.status,
      location: {
        type: 'Point',
        coordinates: [parseFloat(truck.longitude || 0), parseFloat(truck.latitude || 0)],
      },
      speed: parseFloat(truck.speed),
      heading: truck.heading,
      fuel: parseFloat(truck.fuelPercentage),
      payload: parseFloat(truck.payloadTons),
      driver: truck.driverName,
      engineHours: truck.engineHours,
      odometer: truck.odometer,
      lastMaintenance: truck.lastMaintenance,
      lastUpdate: truck.updatedAt,
      alerts: truck.alerts || [],
      alertCount: truck._count?.alerts || truck.alerts?.length || 0,
    };
  }

  formatTruckDetailResponse(truck) {
    return {
      id: truck.id,
      truckNumber: truck.truckNumber,
      model: truck.model?.name,
      manufacturer: truck.model?.manufacturer,
      capacity: truck.model?.capacityTons,
      fuelTank: truck.model?.fuelTankCapacity,
      status: truck.status,
      location: {
        type: 'Point',
        coordinates: [parseFloat(truck.longitude || 0), parseFloat(truck.latitude || 0)],
      },
      speed: parseFloat(truck.speed),
      heading: truck.heading,
      fuel: parseFloat(truck.fuelPercentage),
      payload: parseFloat(truck.payloadTons),
      driver: truck.driverName,
      engineHours: truck.engineHours,
      odometer: truck.odometer,
      lastMaintenance: truck.lastMaintenance,
      lastUpdate: truck.updatedAt,
      tirePressures: truck.tirePressures.map((tire) => ({
        position: tire.tirePosition,
        tireNumber: tire.tireNumber,
        pressure: parseFloat(tire.pressurePsi),
        status: tire.status,
        temperature: tire.temperature ? parseFloat(tire.temperature) : null,
        lastUpdated: tire.recordedAt,
      })),
      alerts: truck.alerts.map((alert) => ({
        type: alert.alertType,
        severity: alert.severity,
        message: alert.message,
        isResolved: alert.isResolved,
        createdAt: alert.createdAt,
      })),
    };
  }

  // ==========================================
  // PERFORMANCE UTILITIES
  // ==========================================

  async getConnectionInfo() {
    try {
      const result = await this.prisma.$queryRaw`
        SELECT 
          COUNT(*) as active_connections,
          current_database() as database_name,
          version() as db_version
        FROM pg_stat_activity 
        WHERE state = 'active'
      `;

      return result[0];
    } catch (error) {
      console.error('Error getting connection info:', error);
      throw error;
    }
  }

  async optimizeDatabase() {
    try {
      // Analyze tables for better query planning
      await this.prisma.$executeRaw`ANALYZE truck, tire_pressure_event, alert_event, gps_position`;

      return { message: 'Database optimization completed' };
    } catch (error) {
      console.error('Error optimizing database:', error);
      throw error;
    }
  }
}

// Create singleton instance
const prismaService = new PrismaService();

// Graceful shutdown handling
process.on('beforeExit', async () => {
  await prismaService.disconnect();
});

process.on('SIGINT', async () => {
  await prismaService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prismaService.disconnect();
  process.exit(0);
});

module.exports = prismaService;
