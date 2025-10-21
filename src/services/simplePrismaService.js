const { PrismaClient } = require('../../prisma/generated/client');

// Initialize Prisma Client with optimized settings
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'colorless',
});

// Simplified Prisma Service for new schema
class SimplePrismaService {
  constructor() {
    this.prisma = prisma;
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
  }

  // Connection management with retry
  async connect() {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempting database connection (${attempt}/${this.maxRetries})...`);
        await this.prisma.$connect();
        console.log('✅ Prisma connected to database successfully');

        // Test the connection
        await this.prisma.$queryRaw`SELECT 1`;
        console.log('✅ Database connection verified');

        return;
      } catch (error) {
        lastError = error;
        console.error(`❌ Connection attempt ${attempt} failed:`, error.message);

        if (attempt < this.maxRetries) {
          console.log(`⏳ Retrying in ${this.retryDelay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        }
      }
    }

    console.error('❌ All connection attempts failed');
    throw lastError;
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
    console.log('🔍 SimplePrismaService.getAllTrucks called with filters:', filters);

    const { page = 1, limit = 50, search, vendor, vendorId } = filters;

    const offset = (page - 1) * limit;
    const where = {};

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Vendor filter by id or name
    if (vendorId) {
      where.fleet_group_id = vendorId;
    } else if (vendor) {
      where.fleet_group = { name: { equals: vendor } };
    }

    console.log('📋 Query where clause:', JSON.stringify(where, null, 2));

    try {
      console.log('📊 Fetching trucks from database...');

      // Get trucks with basic relations and latest sensor data
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleetGroup: true,
          vendor: true,
          alert_event: {
            where: { acknowledged: false },
            take: 5,
            orderBy: { occurred_at: 'desc' },
          },
          fuel_level_event: {
            take: 1,
            orderBy: { changed_at: 'desc' },
            select: { fuel_percent: true, changed_at: true },
          },
          tire_pressure_event: {
            take: 24, // enough to cover 8 tires * 3 readings
            orderBy: { changed_at: 'desc' },
            select: {
              tire_no: true,
              pressure_kpa: true,
              temp_celsius: true,
              battery_level: true,
              changed_at: true,
            },
          },
          hub_temperature_event: {
            take: 1,
            orderBy: { changed_at: 'desc' },
            select: { temp_celsius: true, changed_at: true },
          },
          _count: {
            select: {
              alert_event: {
                where: { acknowledged: false },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: parseInt(limit),
      });

      console.log(`✅ Found ${trucks.length} trucks in database`);

      // Get total count for pagination
      console.log('📊 Getting total count...');
      const totalCount = await this.prisma.truck.count({ where });
      console.log(`📊 Total trucks count: ${totalCount}`);

      // Get basic summary statistics
      console.log('📊 Getting summary statistics...');
      const summary = await this.getTruckSummaryStats();
      console.log('✅ Summary statistics retrieved');

      console.log('🔄 Formatting truck responses...');
      const formattedTrucks = trucks.map((t) => this.formatTruckResponse(t));
      console.log(`✅ Formatted ${formattedTrucks.length} truck responses`);

      const result = {
        trucks: formattedTrucks,
        pagination: {
          current_page: parseInt(page),
          per_page: parseInt(limit),
          total: totalCount,
          total_pages: Math.ceil(totalCount / limit),
        },
        summary,
      };

      console.log('✅ getAllTrucks completed successfully');
      return result;
    } catch (error) {
      console.error('❌ Error in SimplePrismaService.getAllTrucks:', error);
      console.error('❌ Error stack:', error.stack);
      throw error;
    }
  }

  async getTruckById(truckId) {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        include: {
          fleetGroup: true,
          vendor: true,
          alert_event: {
            orderBy: { occurred_at: 'desc' },
            take: 10,
          },
          tire_pressure_event: {
            orderBy: { changed_at: 'desc' },
            take: 10,
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
      const tirePressures = await this.prisma.tire_pressure_event.findMany({
        where: { truck_id: truckId },
        orderBy: { changed_at: 'desc' },
        take: 10,
      });

      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        select: { id: true, name: true },
      });

      if (!truck) {
        throw new Error('Truck not found');
      }

      return {
        truckId: truck.id,
        truckNumber: truck.name,
        tirePressures: tirePressures.map((tire) => ({
          position: `Tire ${tire.tire_no}`,
          tireNumber: tire.tire_no,
          pressure: tire.pressure_kpa ? parseFloat(tire.pressure_kpa) : null,
          status: tire.pressure_kpa > 1000 ? 'normal' : 'low',
          temperature: tire.temp_celsius ? parseFloat(tire.temp_celsius) : null,
          lastUpdated: tire.changed_at,
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
      const where = {};
      if (status) {
        where.status = status;
      }

      // Get latest GPS positions for trucks
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleetGroup: true,
          vendor: true,
          gps_position: {
            orderBy: { ts: 'desc' },
            take: 1,
          },
          _count: {
            select: {
              alert_event: {
                where: { acknowledged: false },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      // Format as GeoJSON
      const geoJsonData = {
        type: 'FeatureCollection',
        features: trucks
          .filter((truck) => truck.gps_position.length > 0)
          .map((truck) => {
            const latestGps = truck.gps_position[0];
            return {
              type: 'Feature',
              properties: {
                id: truck.id,
                truckNumber: truck.name,
                name: truck.name,
                model: truck.model,
                status: 'active', // Default status
                speed: latestGps.speedKph || 0,
                heading: latestGps.headingDeg || 0,
                fuel: 75, // Default fuel level
                payload: 0, // Default payload
                driver: null,
                lastUpdate: latestGps.ts,
                alertCount: truck._count.alert_event,
              },
              geometry: {
                type: 'Point',
                coordinates: [0, 0], // Will be updated with actual coordinates from PostGIS
              },
            };
          }),
      };

      return geoJsonData;
    } catch (error) {
      console.error('Error in getRealtimeLocations:', error);
      throw error;
    }
  }

  async updateTruckStatus(truckId, newStatus) {
    try {
      // Create a new truck status event
      const statusEvent = await this.prisma.truckStatusEvent.create({
        data: {
          truckId: truckId,
          status: newStatus,
          note: `Status updated to ${newStatus}`,
          changedAt: new Date(),
        },
      });

      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        select: { id: true, name: true },
      });

      return {
        id: truck.id,
        truckNumber: truck.name,
        status: newStatus,
        lastUpdate: statusEvent.changedAt,
      };
    } catch (error) {
      console.error('Error in updateTruckStatus:', error);
      throw error;
    }
  }

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================

  async getDashboardStats() {
    try {
      console.log('🔍 Starting getDashboardStats...');

      // Get basic counts from actual tables
      const totalTrucks = await this.prisma.truck.count();
      console.log('✅ Total trucks:', totalTrucks);

      const totalAlerts = await this.prisma.alert_event.count({
        where: {
          acknowledged: false, // Unacknowledged alerts only
        },
      });
      console.log('✅ Total alerts:', totalAlerts);

      // Get trucks by status from truck_status_event table (truck table doesn't have status field)
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

      console.log('✅ Trucks by status calculated', statusCounts);

      // Get low tire pressure count (tires with pressure < 1000 kPa)
      const lowTireCount = await this.prisma.tire_pressure_event.count({
        where: {
          pressure_kpa: {
            lt: 1000,
          },
          changed_at: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      // Get average fuel level from recent events
      const fuelStats = await this.prisma.$queryRaw`
        SELECT AVG(fuel_percent) as avg_fuel
        FROM fuel_level_event
        WHERE changed_at >= NOW() - INTERVAL '24 hours'
      `;

      const avgFuel =
        fuelStats.length > 0 && fuelStats[0].avg_fuel ? parseFloat(fuelStats[0].avg_fuel) : 0;

      const result = {
        totalTrucks,
        activeTrucks: statusCounts.active || 0,
        inactiveTrucks: statusCounts.inactive || 0,
        maintenanceTrucks: statusCounts.maintenance || 0,
        averageFuel: avgFuel,
        totalPayload: 0, // Not available in current schema
        alertsCount: totalAlerts,
        lowTirePressureCount: lowTireCount,
      };

      console.log('✅ Dashboard stats completed:', result);
      return result;
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  async getTruckSummaryStats() {
    try {
      const totalTrucks = await this.prisma.truck.count();

      // Since truck table doesn't have status field, get status from truck_status_event
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

      const totalAlerts = await this.prisma.alert_event.count({
        where: {
          acknowledged: false,
        },
      });

      return {
        total: totalTrucks,
        active: statusCounts.active || 0,
        inactive: statusCounts.inactive || 0,
        maintenance: statusCounts.maintenance || 0,
        alerts: totalAlerts,
      };
    } catch (error) {
      console.error('Error in getTruckSummaryStats:', error);
      // Return default values if query fails
      return {
        total: 0,
        active: 0,
        inactive: 0,
        maintenance: 0,
        alerts: 0,
      };
    }
  }

  async getTrucksByStatus() {
    try {
      // Since truck table doesn't have status field, get status from truck_status_event
      const latestStatusEvents = await this.prisma.$queryRaw`
        SELECT DISTINCT ON (truck_id) truck_id, status
        FROM truck_status_event
        ORDER BY truck_id, changed_at DESC
      `;

      // Group by status
      const statusGroups = latestStatusEvents.reduce((acc, item) => {
        const status = item.status || 'unknown';
        if (!acc[status]) {
          acc[status] = { status, _count: { status: 0 } };
        }
        acc[status]._count.status++;
        return acc;
      }, {});

      return Object.values(statusGroups);
    } catch (error) {
      console.error('Error in getTrucksByStatus:', error);
      throw error;
    }
  }

  formatTruckResponse(truck) {
    // Latest fuel
    const latestFuel =
      Array.isArray(truck.fuel_level_event) && truck.fuel_level_event.length > 0
        ? truck.fuel_level_event[0]
        : null;

    // Latest hub temperature
    const latestHubTemp =
      Array.isArray(truck.hub_temperature_event) && truck.hub_temperature_event.length > 0
        ? truck.hub_temperature_event[0]
        : null;

    // Build latest per-tire map (dedupe by tire_no)
    const tireMap = new Map();
    if (Array.isArray(truck.tire_pressure_event)) {
      for (const e of truck.tire_pressure_event) {
        if (!tireMap.has(e.tire_no)) {
          tireMap.set(e.tire_no, e); // since sorted desc, first seen is latest
        }
      }
    }
    const tires = Array.from(tireMap.values())
      .sort((a, b) => a.tire_no - b.tire_no)
      .map((t) => ({
        position: `Tire ${t.tire_no}`,
        tireNumber: t.tire_no,
        pressure: t.pressure_kpa != null ? parseFloat(t.pressure_kpa) : null,
        temperature: t.temp_celsius != null ? parseFloat(t.temp_celsius) : null,
        battery: t.battery_level != null ? parseInt(t.battery_level) : null,
        status: t.pressure_kpa != null ? (t.pressure_kpa > 1000 ? 'normal' : 'low') : 'unknown',
        lastUpdated: t.changed_at,
      }));

    // Aggregate battery across tires
    const batteryLevels = tires.map((t) => t.battery).filter((v) => typeof v === 'number');
    const avgBattery = batteryLevels.length
      ? Math.round(batteryLevels.reduce((s, v) => s + v, 0) / batteryLevels.length)
      : null;

    return {
      id: truck.id,
      truckNumber: truck.name,
      name: truck.name,
      model: truck.model,
      manufacturer: truck.fleet_group?.name || 'Unknown',
      status: 'active',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
      speed: 0,
      heading: 0,
      fuel: latestFuel?.fuel_percent != null ? parseFloat(latestFuel.fuel_percent) : 0,
      sensors: {
        fuelPercent: latestFuel?.fuel_percent != null ? parseFloat(latestFuel.fuel_percent) : 0,
        tires,
        batteryAvg: avgBattery,
        hubTemperature:
          latestHubTemp?.temp_celsius != null ? parseFloat(latestHubTemp.temp_celsius) : null,
      },
      payload: 0,
      driver: null,
      engineHours: 0,
      odometer: 0,
      lastMaintenance: null,
      lastUpdate: truck.createdAt,
      alerts: truck.alert_event || [],
      alertCount: truck._count?.alert_event || 0,
    };
  }

  formatTruckDetailResponse(truck) {
    return {
      id: truck.id,
      truckNumber: truck.name,
      name: truck.name,
      model: truck.model,
      manufacturer: truck.fleet_group?.name || 'Unknown',
      capacity: null,
      fuelTank: null,
      status: 'active',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
      speed: 0,
      heading: 0,
      fuel: 75,
      payload: 0,
      driver: null,
      engineHours: 0,
      odometer: 0,
      lastMaintenance: null,
      lastUpdate: truck.createdAt,
      tires: (truck.tire_pressure_event || []).map((tire) => ({
        position: `Tire ${tire.tire_no}`,
        tireNumber: tire.tire_no,
        pressure: tire.pressure_kpa,
        status: tire.pressure_kpa > 1000 ? 'normal' : 'low',
        temperature: tire.temp_celsius || 45,
        lastUpdated: tire.changed_at,
      })),
      alerts: (truck.alert_event || []).map((alert) => ({
        type: alert.type,
        severity: alert.severity || 'medium',
        message: `${alert.type} alert`,
        isResolved: alert.acknowledged,
        createdAt: alert.occurred_at,
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
const simplePrismaService = new SimplePrismaService();

// Graceful shutdown handling
process.on('beforeExit', async () => {
  await simplePrismaService.disconnect();
});

process.on('SIGINT', async () => {
  await simplePrismaService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await simplePrismaService.disconnect();
  process.exit(0);
});

module.exports = simplePrismaService;
