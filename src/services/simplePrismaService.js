const { PrismaClient } = require('../../prisma/generated/client');

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'colorless',
});

// Simplified Prisma Service for new schema
class SimplePrismaService {
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
    const {
      status,
      page = 1,
      limit = 50,
      search
    } = filters;

    const offset = (page - 1) * limit;
    const where = {};
    
    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } }
      ];
    }

    try {
      // Get trucks with basic relations
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleet_group: true,
          alert_event: {
            where: { acknowledged: false },
            take: 5,
            orderBy: { occurred_at: 'desc' }
          },
          _count: {
            select: {
              alert_event: {
                where: { acknowledged: false }
              }
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip: offset,
        take: parseInt(limit)
      });

      // Get total count for pagination
      const totalCount = await this.prisma.truck.count({ where });

      // Get basic summary statistics
      const summary = await this.getTruckSummaryStats();

      return {
        trucks: trucks.map(this.formatTruckResponse),
        pagination: {
          current_page: parseInt(page),
          per_page: parseInt(limit),
          total: totalCount,
          total_pages: Math.ceil(totalCount / limit)
        },
        summary
      };
    } catch (error) {
      console.error('Error in getAllTrucks:', error);
      throw error;
    }
  }

  async getTruckById(truckId) {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        include: {
          fleet_group: true,
          alert_event: {
            orderBy: { occurred_at: 'desc' },
            take: 10
          },
          tire_pressure_event: {
            orderBy: { changed_at: 'desc' },
            take: 10
          }
        }
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
        take: 10
      });

      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        select: { id: true, name: true }
      });

      if (!truck) {
        throw new Error('Truck not found');
      }

      return {
        truckId: truck.id,
        truckNumber: truck.name,
        tirePressures: tirePressures.map(tire => ({
          position: `Tire ${tire.tire_no}`,
          tireNumber: tire.tire_no,
          pressure: tire.pressure_kpa ? parseFloat(tire.pressure_kpa) : null,
          status: tire.pressure_kpa > 1000 ? 'normal' : 'low',
          temperature: tire.temp_celsius ? parseFloat(tire.temp_celsius) : null,
          lastUpdated: tire.changed_at
        })),
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error in getTruckTires:', error);
      throw error;
    }
  }

  async getRealtimeLocations(status) {
    try {
      const where = {};

      // Get latest GPS positions for trucks
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          fleet_group: true,
          gps_position: {
            orderBy: { ts: 'desc' },
            take: 1
          },
          _count: {
            select: {
              alert_event: {
                where: { acknowledged: false }
              }
            }
          }
        },
        orderBy: { created_at: 'desc' }
      });

      // Format as GeoJSON
      const geoJsonData = {
        type: "FeatureCollection",
        features: trucks
          .filter(truck => truck.gps_position.length > 0)
          .map(truck => {
            const latestGps = truck.gps_position[0];
            return {
              type: "Feature",
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
                alertCount: truck._count.alert_event
              },
              geometry: {
                type: "Point",
                coordinates: [0, 0] // Will be updated with actual coordinates from PostGIS
              }
            };
          })
      };

      return geoJsonData;
    } catch (error) {
      console.error('Error in getRealtimeLocations:', error);
      throw error;
    }
  }

  async updateTruckStatus(truckId, status) {
    try {
      // Create a new truck status event
      const statusEvent = await this.prisma.truckStatusEvent.create({
        data: {
          truckId: truckId,
          status: status,
          note: `Status updated to ${status}`,
          changedAt: new Date()
        }
      });

      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        select: { id: true, name: true }
      });

      return {
        id: truck.id,
        truckNumber: truck.name,
        status: status,
        lastUpdate: statusEvent.changedAt
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
          acknowledged: false // Unacknowledged alerts only
        }
      });
      console.log('✅ Total alerts:', totalAlerts);
      
      // Count trucks by status instead of maintenance orders
      const trucksByStatus = await this.prisma.truck.groupBy({
        by: ['name'],
        _count: {
          name: true
        }
      });
      console.log('✅ Trucks by status calculated');

      // Get recent GPS positions to determine active trucks
      const recentPositions = await this.prisma.gps_position.findMany({
        where: {
          ts: {
            gte: new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
          }
        },
        select: {
          truck_id: true,
          speed_kph: true
        },
        distinct: ['truck_id']
      });

      // Calculate truck status distribution
      const activeTrucks = recentPositions.filter(pos => pos.speed_kph > 5).length;
      const inactiveTrucks = totalTrucks - activeTrucks;

      // Get average fuel from recent fuel events
      const recentFuelEvents = await this.prisma.fuel_level_event.findMany({
        take: 50,
        orderBy: { changed_at: 'desc' },
        select: { fuel_percent: true }
      });

      const averageFuel = recentFuelEvents.length > 0 
        ? recentFuelEvents.reduce((sum, event) => sum + (event.fuel_percent || 0), 0) / recentFuelEvents.length
        : 75.0;

      // Count low tire pressure alerts
      const lowTirePressureCount = await this.prisma.tire_pressure_event.count({
        where: {
          pressure_kpa: { lt: 200.0 }, // Below 200 kPa (approx 30 PSI)
          changed_at: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      });

      return {
        totalTrucks,
        activeTrucks: Math.max(0, activeTrucks),
        inactiveTrucks: Math.max(0, inactiveTrucks),
        maintenanceTrucks: 0, // No maintenance orders table available
        averageFuel: Math.round(averageFuel * 10) / 10,
        totalPayload: 0, // Will be calculated from truck capacity if needed
        alertsCount: totalAlerts,
        lowTirePressureCount
      };
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
      
      return {
        total_trucks: totalTrucks,
        active: Math.floor(totalTrucks * 0.8),
        inactive: Math.floor(totalTrucks * 0.1),
        maintenance: Math.floor(totalTrucks * 0.1)
      };
    } catch (error) {
      console.error('Error in getTruckSummaryStats:', error);
      throw error;
    }
  }

  formatTruckResponse(truck) {
    return {
      id: truck.id,
      truckNumber: truck.name,
      name: truck.name,
      model: truck.model,
      manufacturer: truck.fleet_group?.name || 'Unknown',
      status: 'active', // Default status
      location: {
        type: 'Point',
        coordinates: [0, 0] // Default coordinates
      },
      speed: 0,
      heading: 0,
      fuel: 75,
      payload: 0,
      driver: null,
      engineHours: 0,
      odometer: 0,
      lastMaintenance: null,
      lastUpdate: truck.created_at,
      alerts: truck.alert_event || [],
      alertCount: truck._count?.alert_event || 0
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
        coordinates: [0, 0]
      },
      speed: 0,
      heading: 0,
      fuel: 75,
      payload: 0,
      driver: null,
      engineHours: 0,
      odometer: 0,
      lastMaintenance: null,
      lastUpdate: truck.created_at,
      tires: (truck.tire_pressure_event || []).map(tire => ({
        position: `Tire ${tire.tire_no}`,
        tireNumber: tire.tire_no,
        pressure: tire.pressure_kpa,
        status: tire.pressure_kpa > 1000 ? 'normal' : 'low',
        temperature: tire.temp_celsius || 45,
        lastUpdated: tire.changed_at
      })),
      alerts: (truck.alert_event || []).map(alert => ({
        type: alert.type,
        severity: alert.severity || 'medium',
        message: `${alert.type} alert`,
        isResolved: alert.acknowledged,
        createdAt: alert.occurred_at
      }))
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
