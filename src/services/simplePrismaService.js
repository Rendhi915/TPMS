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
    const where = { deleted_at: null }; // Only non-deleted trucks

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { plate: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Vendor filter
    if (vendorId) {
      where.vendor_id = parseInt(vendorId);
    } else if (vendor) {
      where.vendors = { name_vendor: { equals: vendor, mode: 'insensitive' } };
    }

    console.log('📋 Query where clause:', JSON.stringify(where, null, 2));

    try {
      console.log('📊 Fetching trucks from database...');

      // Get trucks with basic relations
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          vendors: {
            select: {
              id: true,
              name_vendor: true,
              telephone: true,
              email: true,
            },
          },
          drivers: {
            select: {
              id: true,
              name: true,
              phone: true,
              license_number: true,
            },
          },
          device: {
            where: { deleted_at: null },
            select: {
              id: true,
              sn: true,
              bat1: true,
              bat2: true,
              bat3: true,
              lock: true,
              status: true,
            },
            take: 1,
          },
          alert_events: {
            where: { status: 'active' },
            take: 5,
            orderBy: { created_at: 'desc' },
          },
          _count: {
            select: {
              alert_events: {
                where: { status: 'active' },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
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
      // Ensure truckId is an integer
      const id = typeof truckId === 'string' ? parseInt(truckId) : truckId;

      if (isNaN(id)) {
        throw new Error('Invalid truck ID provided');
      }

      const truck = await this.prisma.truck.findUnique({
        where: { id: id },
        include: {
          vendors: {
            select: {
              id: true,
              name_vendor: true,
              telephone: true,
              email: true,
            },
          },
          drivers: {
            select: {
              id: true,
              name: true,
              phone: true,
              license_number: true,
              license_type: true,
            },
          },
          device: {
            where: { deleted_at: null },
            include: {
              sensor: {
                where: { deleted_at: null },
              },
              location: {
                orderBy: { created_at: 'desc' },
                take: 1,
              },
            },
          },
          alert_events: {
            orderBy: { created_at: 'desc' },
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
      // Ensure truckId is an integer
      const id = typeof truckId === 'string' ? parseInt(truckId) : truckId;

      if (isNaN(id)) {
        throw new Error('Invalid truck ID provided');
      }

      const truck = await this.prisma.truck.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          device: {
            where: { deleted_at: null },
            include: {
              sensor: {
                where: { deleted_at: null },
                select: {
                  id: true,
                  tireNo: true,
                  tempValue: true,
                  tirepValue: true,
                  bat: true,
                  status: true,
                  updated_at: true,
                },
              },
            },
          },
        },
      });

      if (!truck) {
        throw new Error('Truck not found');
      }

      // Collect sensor data from all devices/sensors
      const tirePressures = [];
      for (const dev of truck.device) {
        for (const sens of dev.sensor) {
          tirePressures.push({
            position: `Tire ${sens.tireNo}`,
            tireNumber: sens.tireNo,
            pressure: sens.tirepValue ? parseFloat(sens.tirepValue) : null,
            status: sens.tirepValue && sens.tirepValue > 30 ? 'normal' : 'low',
            temperature: sens.tempValue ? parseFloat(sens.tempValue) : null,
            battery: sens.bat || null,
            lastUpdated: sens.updated_at,
          });
        }
      }

      // Sort by tire number
      tirePressures.sort((a, b) => a.tireNumber - b.tireNumber);

      return {
        truckId: truck.id,
        truckNumber: truck.name,
        tirePressures,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Error in getTruckTires:', error);
      throw error;
    }
  }

  async getRealtimeLocations(status) {
    try {
      const where = { deleted_at: null };
      if (status) {
        where.status = status;
      }

      // Get trucks with their latest location
      const trucks = await this.prisma.truck.findMany({
        where,
        include: {
          vendors: {
            select: {
              id: true,
              name_vendor: true,
            },
          },
          drivers: {
            select: {
              id: true,
              name: true,
            },
          },
          device: {
            where: { deleted_at: null },
            include: {
              location: {
                orderBy: { created_at: 'desc' },
                take: 1,
              },
              sensor: {
                where: { 
                  status: 'active'
                  // REMOVED: tempValue/tirepValue not null filter
                  // Allow sensors without data - will show as 0 in frontend
                },
                select: {
                  id: true,
                  tireNo: true,
                  sensorNo: true,
                  tempValue: true,
                  tirepValue: true,
                  exType: true,
                  updated_at: true,
                },
                orderBy: { tireNo: 'asc' },
              },
            },
            take: 1,
          },
          alert_events: {
            where: { status: 'active' },
            select: {
              id: true,
              message: true,
              value: true,
              created_at: true,
              alert_id: true,
            },
            orderBy: { created_at: 'desc' },
            take: 5, // Last 5 active alerts
          },
          _count: {
            select: {
              alert_events: {
                where: { status: 'active' },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
      });

      // Format as GeoJSON
      const geoJsonData = {
        type: 'FeatureCollection',
        features: trucks
          .filter((truck) => truck.device.length > 0 && truck.device[0].location.length > 0)
          .map((truck) => {
            const latestLocation = truck.device[0].location[0];
            const sensors = truck.device[0].sensor || [];
            
            // Debug logging for tire data
            if (sensors.length === 0) {
              console.warn(`⚠️  No sensors found for truck ${truck.plate} (device: ${truck.device[0]?.id})`);
            }
            
            // ALWAYS include tire data - even if sensors are empty, return empty array
            const tireData = sensors.map(sensor => ({
              tireNo: sensor.tireNo || 0,
              sensorNo: sensor.sensorNo || 'N/A',
              temperature: sensor.tempValue !== null && sensor.tempValue !== undefined ? sensor.tempValue : 0,
              pressure: sensor.tirepValue !== null && sensor.tirepValue !== undefined ? sensor.tirepValue : 0,
              status: sensor.exType || 'unknown',
              lastUpdate: sensor.updated_at || new Date(),
            }));
            
            // Format active alerts
            const alerts = (truck.alert_events || []).map(alert => ({
              id: alert.id,
              message: alert.message,
              value: alert.value,
              createdAt: alert.created_at,
            }));
            
            // Log tire data for debugging
            if (tireData.length > 0) {
              console.log(`✅ ${truck.plate}: ${tireData.length} tires with data`);
            } else {
              console.error(`❌ ${truck.plate}: NO TIRE DATA!`);
            }
            
            return {
              type: 'Feature',
              properties: {
                id: truck.id,
                truckNumber: truck.name,
                name: truck.name,
                model: truck.model,
                plate: truck.plate,
                status: truck.status || 'active',
                driver: truck.drivers?.name || null,
                vendor: truck.vendors?.name_vendor || null,
                lastUpdate: latestLocation.created_at,
                alertCount: truck._count.alert_events,
                alerts: alerts, // Active alerts
                tireData: tireData, // Tire sensor data - ALWAYS INCLUDED
                tireCount: tireData.length,
              },
              geometry: {
                type: 'Point',
                coordinates: [parseFloat(latestLocation.long), parseFloat(latestLocation.lat)],
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
      // Ensure truckId is an integer
      const id = typeof truckId === 'string' ? parseInt(truckId) : truckId;

      if (isNaN(id)) {
        throw new Error('Invalid truck ID provided');
      }

      // Update truck status directly (no event table anymore)
      const truck = await this.prisma.truck.update({
        where: { id: id },
        data: {
          status: newStatus,
          updated_at: new Date(),
        },
        select: {
          id: true,
          name: true,
          status: true,
          updated_at: true,
        },
      });

      return {
        id: truck.id,
        truckNumber: truck.name,
        status: truck.status,
        lastUpdate: truck.updated_at,
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

      // Get basic counts
      const totalTrucks = await this.prisma.truck.count({
        where: { deleted_at: null },
      });
      console.log('✅ Total trucks:', totalTrucks);

      // Count active alerts
      const totalAlerts = await this.prisma.alert_events.count({
        where: { status: 'active' },
      });
      console.log('✅ Total active alerts:', totalAlerts);

      // Get trucks by status (status field now exists in truck table)
      const statusCounts = await this.prisma.truck.groupBy({
        by: ['status'],
        where: { deleted_at: null },
        _count: { status: true },
      });

      const trucksByStatus = statusCounts.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {});

      console.log('✅ Trucks by status:', trucksByStatus);

      // Get sensor data stats (low tire pressure count)
      const lowTireCount = await this.prisma.sensor_data.count({
        where: {
          tiprValue: { lt: 100 }, // Assuming pressure in bar, < 100 is low
          recorded_at: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      console.log('✅ Low tire pressure count:', lowTireCount);

      const result = {
        totalTrucks,
        activeTrucks: trucksByStatus.active || 0,
        inactiveTrucks: trucksByStatus.inactive || 0,
        maintenanceTrucks: trucksByStatus.maintenance || 0,
        averageFuel: 0, // No fuel data in new schema
        totalPayload: 0, // Not available
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
      const totalTrucks = await this.prisma.truck.count({
        where: { deleted_at: null },
      });

      // Get trucks by status from truck table (status field exists now)
      const statusCounts = await this.prisma.truck.groupBy({
        by: ['status'],
        where: { deleted_at: null },
        _count: { status: true },
      });

      const trucksByStatus = statusCounts.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {});

      const totalAlerts = await this.prisma.alert_events.count({
        where: { status: 'active' },
      });

      return {
        total: totalTrucks,
        active: trucksByStatus.active || 0,
        inactive: trucksByStatus.inactive || 0,
        maintenance: trucksByStatus.maintenance || 0,
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
      // Get status counts from truck table
      const statusCounts = await this.prisma.truck.groupBy({
        by: ['status'],
        where: { deleted_at: null },
        _count: { status: true },
      });

      return statusCounts.map((item) => ({
        status: item.status,
        _count: { status: item._count.status },
      }));
    } catch (error) {
      console.error('Error in getTrucksByStatus:', error);
      throw error;
    }
  }

  formatTruckResponse(truck) {
    // Simplified formatter - return truck data with devices
    return {
      id: truck.id,
      name: truck.name,
      vin: truck.vin,
      plate: truck.plate,
      model: truck.model,
      year: truck.year,
      type: truck.type,
      status: truck.status,
      vendor_id: truck.vendor_id,
      driver_id: truck.driver_id,
      image: truck.image,
      vendor: truck.vendors
        ? {
            id: truck.vendors.id,
            name: truck.vendors.name_vendor,
            telephone: truck.vendors.telephone,
            email: truck.vendors.email,
          }
        : null,
      driver: truck.drivers
        ? {
            id: truck.drivers.id,
            name: truck.drivers.name,
            phone: truck.drivers.phone,
            license_number: truck.drivers.license_number,
          }
        : null,
      devices: truck.device
        ? truck.device.map((device) => ({
            id: device.id,
            sn: device.sn,
            sim_number: device.sim_number,
            bat1: device.bat1,
            bat2: device.bat2,
            bat3: device.bat3,
            lock: device.lock,
            status: device.status,
          }))
        : [],
      created_at: truck.created_at,
      updated_at: truck.updated_at,
    };
  }

  formatTruckDetailResponse(truck) {
    // Format detailed truck response with sensors and locations
    const formatted = this.formatTruckResponse(truck);

    // Add sensor data from devices if available
    if (truck.device) {
      formatted.devices = truck.device.map((device) => ({
        id: device.id,
        deviceId: device.sn,
        bat1: device.bat1,
        bat2: device.bat2,
        bat3: device.bat3,
        lock: device.lock,
        status: device.status,
        sensors: device.sensor
          ? device.sensor.map((sensor) => ({
              id: sensor.id,
              sensorId: sensor.sn,
              tireNo: sensor.tireNo,
              simNumber: sensor.simNumber,
              sensorNo: sensor.sensorNo,
              sensor_lock: sensor.sensor_lock,
              temperature: sensor.tempValue,
              pressure: sensor.tirepValue,
              battery: sensor.bat,
              status: sensor.status,
            }))
          : [],
        lastLocation:
          device.location && device.location[0]
            ? {
                lat: device.location[0].lat,
                long: device.location[0].long,
                timestamp: device.location[0].created_at,
              }
            : null,
      }));
    }

    // Add active alerts from alert_events
    formatted.alerts = truck.alert_events
      ? truck.alert_events
          .filter((alert) => alert.status === 'active')
          .map((alert) => ({
            id: alert.id,
            type: alert.type,
            severity: alert.severity,
            message: alert.message,
            created_at: alert.created_at,
          }))
      : [];

    return formatted;
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
      // Analyze tables for better query planning - updated to new table names
      // Skip if tables don't exist yet
      await this.prisma.$executeRaw`ANALYZE truck, alert_events, location`;

      return { message: 'Database optimization completed' };
    } catch (error) {
      console.error('Error optimizing database:', error);
      // Don't throw error, just log it - optimization is not critical
      return { message: 'Database optimization failed (non-critical)', error: error.message };
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
