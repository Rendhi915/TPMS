const { prisma } = require('../config/prisma');
const getLiveTracking = async (req, res) => {
  try {
    console.log('📍 Getting live tracking data for all trucks...');

    // Get all active trucks with their devices and latest location
    const trucks = await prisma.truck.findMany({
      where: {
        deleted_at: null,
        status: 'active',
      },
      select: {
        id: true,
        plate: true,
        name: true,
        model: true,
        type: true,
        status: true,
        device: {
          where: { deleted_at: null },
          select: {
            id: true,
            sn: true,
            status: true,
            bat1: true,
            bat2: true,
            bat3: true,
            sensor: {
              where: { deleted_at: null },
              select: {
                id: true,
                sn: true,
                tireNo: true,
                sensorNo: true,
                tempValue: true,
                tirepValue: true,
                exType: true,
                bat: true,
                updated_at: true,
              },
            },
          },
        },
        drivers: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    // 🔥 CRITICAL FIX: Fetch locations separately with truck_id filter to prevent mixing
    // Get latest location for each truck (filtered by truck_id)
    const truckIds = trucks.map((t) => t.id);

    // Build query dynamically - PostgreSQL DISTINCT ON gets first row per group
    const latestLocations =
      truckIds.length > 0
        ? await prisma.$queryRawUnsafe(`
          SELECT DISTINCT ON (truck_id) 
            id, device_id, truck_id, lat, long, recorded_at, created_at
          FROM location
          WHERE truck_id IN (${truckIds.join(',')})
          ORDER BY truck_id, created_at DESC
        `)
        : [];

    // Create lookup map for locations by truck_id
    const locationMap = {};
    latestLocations.forEach((loc) => {
      locationMap[loc.truck_id] = loc;
    });

    // Format response for frontend
    const liveData = trucks.map((truck) => {
      const device = truck.device[0]; // Get first device
      const location = locationMap[truck.id]; // Get latest location for THIS truck only

      return {
        truck_id: truck.id,
        plate_number: truck.plate,
        truck_name: truck.name,
        model: truck.model,
        type: truck.type,
        status: truck.status,
        driver: truck.drivers
          ? {
              id: truck.drivers.id,
              name: truck.drivers.name,
              phone: truck.drivers.phone,
            }
          : null,
        device: device
          ? {
              id: device.id,
              serial_number: device.sn,
              status: device.status,
              battery: {
                bat1: device.bat1,
                bat2: device.bat2,
                bat3: device.bat3,
                average: Math.round((device.bat1 + device.bat2 + device.bat3) / 3),
              },
            }
          : null,
        location: location
          ? {
              latitude: parseFloat(location.lat),
              longitude: parseFloat(location.long),
              recorded_at: location.recorded_at,
              last_update: location.created_at,
            }
          : null,
        sensors: device?.sensor || [],
        sensor_summary: device?.sensor
          ? {
              total_sensors: device.sensor.length,
              avg_temperature: (
                device.sensor.reduce((sum, s) => sum + (s.tempValue || 0), 0) / device.sensor.length
              ).toFixed(1),
              avg_pressure: (
                device.sensor.reduce((sum, s) => sum + (s.tirepValue || 0), 0) /
                device.sensor.length
              ).toFixed(1),
              critical_count: device.sensor.filter((s) => s.exType === 'critical').length,
              warning_count: device.sensor.filter((s) => s.exType === 'warning').length,
            }
          : null,
      };
    });

    // Filter out trucks without location data (optional)
    const trucksWithLocation = liveData.filter((t) => t.location !== null);

    console.log(
      `✅ Live tracking data: ${trucksWithLocation.length}/${trucks.length} trucks have location data`
    );

    res.status(200).json({
      success: true,
      message: 'Live tracking data retrieved successfully',
      data: {
        trucks: liveData,
        summary: {
          total_trucks: trucks.length,
          trucks_with_location: trucksWithLocation.length,
          trucks_without_location: trucks.length - trucksWithLocation.length,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in getLiveTracking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live tracking data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getTruckTracking = async (req, res) => {
  try {
    const truckId = parseInt(req.params.id);

    if (isNaN(truckId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID',
      });
    }

    // Optional limit parameter - if not provided, return ALL history
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    console.log(
      `📍 Getting tracking data for truck ${truckId}${limit ? ` (limit: ${limit})` : ' (all history)'}`
    );

    const truck = await prisma.truck.findUnique({
      where: { id: truckId },
      select: {
        id: true,
        plate: true,
        name: true,
        model: true,
        type: true,
        status: true,
        device: {
          where: { deleted_at: null },
          select: {
            id: true,
            sn: true,
            status: true,
            location: {
              where: {
                truck_id: truckId, // 🔥 CRITICAL FIX: Only get locations for THIS truck
              },
              orderBy: { created_at: 'desc' },
              ...(limit && { take: limit }), // Only apply limit if provided
              select: {
                id: true,
                lat: true,
                long: true,
                recorded_at: true,
                created_at: true,
              },
            },
            sensor: {
              where: { deleted_at: null },
              select: {
                id: true,
                sn: true,
                tireNo: true,
                sensorNo: true,
                tempValue: true,
                tirepValue: true,
                exType: true,
                bat: true,
                updated_at: true,
              },
            },
          },
        },
        drivers: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
    });

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    const device = truck.device[0];

    const trackingData = {
      truck_id: truck.id,
      plate_number: truck.plate,
      truck_name: truck.name,
      model: truck.model,
      type: truck.type,
      status: truck.status,
      driver: truck.drivers,
      device: device
        ? {
            id: device.id,
            serial_number: device.sn,
            status: device.status,
          }
        : null,
      current_location: device?.location[0]
        ? {
            latitude: parseFloat(device.location[0].lat),
            longitude: parseFloat(device.location[0].long),
            recorded_at: device.location[0].recorded_at,
          }
        : null,
      location_history: device?.location
        ? device.location.map((loc) => ({
            latitude: parseFloat(loc.lat),
            longitude: parseFloat(loc.long),
            recorded_at: loc.recorded_at,
            created_at: loc.created_at,
          }))
        : [],
      sensors: device?.sensor || [],
    };

    console.log(
      `✅ Retrieved ${trackingData.location_history.length} location history records for truck ${truckId}`
    );

    res.status(200).json({
      success: true,
      message: 'Truck tracking data retrieved successfully',
      data: trackingData,
      meta: {
        location_history_count: trackingData.location_history.length,
        limit_applied: limit || 'unlimited',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in getTruckTracking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck tracking data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = {
  getLiveTracking,
  getTruckTracking,
};
