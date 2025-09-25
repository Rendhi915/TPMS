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
      where.truck_status_event = {
        some: {
          status: status,
        },
      };
    }

    // Search filter
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fuel filters - using fuel level events
    if (minFuel !== undefined || maxFuel !== undefined) {
      const fuelWhere = {};
      if (minFuel !== undefined) fuelWhere.gte = parseFloat(minFuel);
      if (maxFuel !== undefined) fuelWhere.lte = parseFloat(maxFuel);

      where.fuel_level_event = {
        some: {
          fuel_percent: fuelWhere,
        },
      };
    }

    // Alerts filter
    if (hasAlerts === 'true') {
      where.alert_event = {
        some: { acknowledged: false },
      };
    }

    try {
      // Get trucks with relations
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleet_group: true,
          alert_event: {
            where: { acknowledged: false },
            select: {
              id: true,
              type: true,
              severity: true,
              detail: true,
              occurred_at: true,
            },
            take: 5,
          },
          _count: {
            select: {
              alert_event: {
                where: { acknowledged: false },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
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
        }),
        // Active alerts count
        this.prisma.alert_event.count({
          where: { acknowledged: false },
        }),
        // Get total truck count for low tire calculation
        this.prisma.truck.count(),
      ]);

      // Get status breakdown from truck_status_event table
      const latestStatusEvents = await this.prisma.$queryRaw`
        SELECT DISTINCT ON (truck_id) truck_id, status
        FROM truck_status_event
        ORDER BY truck_id, changed_at DESC
      `;
      
      // Count trucks by their latest status
      const statusCounts = latestStatusEvents.reduce((acc, item) => {
        const status = item.status || 'unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      // Format status counts with defaults
      const formattedStatusCounts = {
        active: statusCounts.active || 0,
        inactive: statusCounts.inactive || 0,
        maintenance: statusCounts.maintenance || 0,
      };

      return {
        totalTrucks: truckStats._count._all,
        activeTrucks: formattedStatusCounts.active,
        inactiveTrucks: formattedStatusCounts.inactive,
        maintenanceTrucks: formattedStatusCounts.maintenance,
        averageFuel: 0, // Will be calculated from fuel_level_event if needed
        totalPayload: 0, // Not available in current schema
        alertsCount,
        lowTirePressureCount: 0, // Will be calculated from tire_pressure_event if needed
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
      // Get total truck count
      const totalTrucks = await this.prisma.truck.count();
      
      // Get status breakdown from truck_status_event table
      const latestStatusEvents = await this.prisma.$queryRaw`
        SELECT DISTINCT ON (truck_id) truck_id, status
        FROM truck_status_event
        ORDER BY truck_id, changed_at DESC
      `;
      
      // Count trucks by their latest status
      const statusCounts = latestStatusEvents.reduce((acc, item) => {
        const status = item.status || 'unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const summary = {
        total_trucks: totalTrucks,
        active: statusCounts.active || 0,
        inactive: statusCounts.inactive || 0,
        maintenance: statusCounts.maintenance || 0,
      };

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
