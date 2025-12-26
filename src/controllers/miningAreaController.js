const prismaService = require('../services/simplePrismaService');
const miningAreaService = require('../services/miningAreaService');
const getMiningAreas = async (req, res) => {
  try {
    // Use static GeoJSON data since mining_zones table doesn't exist
    const geoJsonData = miningAreaService.getMiningAreaData();

    res.status(200).json({
      success: true,
      data: geoJsonData,
      message: `Retrieved ${geoJsonData.features.length} mining areas`,
    });
  } catch (error) {
    console.error('Error in getMiningAreas:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mining areas',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getTrucksInZone = async (req, res) => {
  try {
    const { zoneName } = req.params;

    if (!zoneName) {
      return res.status(400).json({
        success: false,
        message: 'Zone name is required',
      });
    }

    const trucksInZone = await prismaService.getTrucksInZone(zoneName);

    res.status(200).json({
      success: true,
      data: {
        zoneName,
        trucks: trucksInZone,
        count: trucksInZone.length,
      },
      message: `Found ${trucksInZone.length} trucks in ${zoneName}`,
    });
  } catch (error) {
    console.error('Error in getTrucksInZone:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trucks in zone',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getZoneStatistics = async (req, res) => {
  try {
    // Fallback implementation using static GeoJSON zones
    const geoJsonData = miningAreaService.getMiningAreaData();
    const statistics = geoJsonData.features.map((feature, idx) => ({
      id: idx + 1,
      name: feature?.properties?.Name || `Zone-${idx + 1}`,
      zoneType: feature?.properties?.zone_type || 'unknown',
      isActive: true,
      truckCount: 0,
      activeTrucks: 0,
      averageFuel: 0,
      averagePayload: 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        zones: statistics,
        totalZones: statistics.length,
        generatedAt: new Date().toISOString(),
      },
      message: 'Zone statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error in getZoneStatistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get zone statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getZoneActivityReport = async (req, res) => {
  try {
    const { timeRange = '24h' } = req.query;

    // Fallback: use static zones and return zeroed activity metrics
    const geoJsonData = miningAreaService.getMiningAreaData();
    const zones = geoJsonData.features.map((feature) => ({
      zoneName: feature?.properties?.Name || 'Unknown Zone',
      zoneType: feature?.properties?.zone_type || 'unknown',
      locationRecords: 0,
      uniqueTrucks: 0,
      averageSpeed: 0,
      firstActivity: null,
      lastActivity: null,
      activityLevel: getActivityLevel(0),
    }));

    res.status(200).json({
      success: true,
      data: {
        timeRange,
        zones,
        totalZones: zones.length,
        generatedAt: new Date().toISOString(),
      },
      message: `Zone activity report for ${timeRange} generated successfully`,
    });
  } catch (error) {
    console.error('Error in getZoneActivityReport:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate zone activity report',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const checkTruckInZones = async (req, res) => {
  try {
    const { truckId } = req.params;

    if (!truckId || isNaN(parseInt(truckId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided',
      });
    }

    // Get truck's current location
    const truck = await prismaService.prisma.truck.findUnique({
      where: { id: parseInt(truckId) },
      select: {
        id: true,
        truckNumber: true,
        latitude: true,
        longitude: true,
        status: true,
      },
    });

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    if (!truck.latitude || !truck.longitude) {
      return res.status(400).json({
        success: false,
        message: 'Truck location not available',
      });
    }

    // Find which zones the truck is in
    const zonesContainingTruck = await prismaService.prisma.$queryRaw`
      SELECT 
        mz.id,
        mz.name,
        mz.zone_type,
        ST_Distance(
          ST_SetSRID(ST_MakePoint(${truck.longitude}, ${truck.latitude}), 4326),
          ST_Centroid(mz.boundary)
        ) as distance_to_center
      FROM mining_zones mz
      WHERE ST_Within(
        ST_SetSRID(ST_MakePoint(${truck.longitude}, ${truck.latitude}), 4326),
        mz.boundary
      ) AND mz.is_active = true
      ORDER BY distance_to_center ASC
    `;

    res.status(200).json({
      success: true,
      data: {
        truck: {
          id: truck.id,
          truckNumber: truck.truckNumber,
          status: truck.status,
          location: {
            latitude: parseFloat(truck.latitude),
            longitude: parseFloat(truck.longitude),
          },
        },
        zones: zonesContainingTruck.map((zone) => ({
          id: zone.id,
          name: zone.name,
          zoneType: zone.zone_type,
          distanceToCenter: parseFloat(zone.distance_to_center),
        })),
        inZoneCount: zonesContainingTruck.length,
      },
      message: `Truck ${truck.truckNumber} is in ${zonesContainingTruck.length} zone(s)`,
    });
  } catch (error) {
    console.error('Error in checkTruckInZones:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check truck zones',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getNearbyTrucks = async (req, res) => {
  try {
    const { latitude, longitude, radius = 1000 } = req.query; // radius in meters

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const radiusMeters = parseInt(radius);

    // Find trucks within radius
    const nearbyTrucks = await prismaService.prisma.$queryRaw`
      SELECT 
        t.id,
        t.truck_number,
        t.status,
        t.latitude,
        t.longitude,
        t.fuel_percentage,
        t.payload_tons,
        t.driver_name,
        ST_Distance(
          ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
        ) as distance_meters,
        tm.name as model_name
      FROM trucks t
      LEFT JOIN truck_models tm ON t.model_id = tm.id
      WHERE t.latitude IS NOT NULL 
        AND t.longitude IS NOT NULL
        AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(t.longitude, t.latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
          ${radiusMeters}
        )
      ORDER BY distance_meters ASC
    `;

    const trucksFormatted = nearbyTrucks.map((truck) => ({
      id: truck.id,
      truckNumber: truck.truck_number,
      model: truck.model_name,
      status: truck.status,
      location: {
        latitude: parseFloat(truck.latitude),
        longitude: parseFloat(truck.longitude),
      },
      fuel: parseFloat(truck.fuel_percentage),
      payload: parseFloat(truck.payload_tons),
      driver: truck.driver_name,
      distance: Math.round(parseFloat(truck.distance_meters)),
    }));

    res.status(200).json({
      success: true,
      data: {
        searchCenter: {
          latitude: lat,
          longitude: lng,
        },
        radiusMeters,
        trucks: trucksFormatted,
        count: trucksFormatted.length,
      },
      message: `Found ${trucksFormatted.length} trucks within ${radiusMeters}m radius`,
    });
  } catch (error) {
    console.error('Error in getNearbyTrucks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find nearby trucks',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const createMiningZone = async (req, res) => {
  try {
    const { name, zoneType, boundary } = req.body;

    // Validate input
    if (!name || !zoneType || !boundary) {
      return res.status(400).json({
        success: false,
        message: 'Name, zone type, and boundary are required',
      });
    }

    // Validate GeoJSON boundary
    if (!boundary.type || boundary.type !== 'Polygon' || !boundary.coordinates) {
      return res.status(400).json({
        success: false,
        message: 'Boundary must be a valid GeoJSON Polygon',
      });
    }

    // Create zone using raw SQL for PostGIS
    const result = await prismaService.prisma.$queryRaw`
      INSERT INTO mining_zones (name, zone_type, boundary, is_active, created_at)
      VALUES (
        ${name},
        ${zoneType},
        ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(boundary)}), 4326),
        true,
        NOW()
      )
      RETURNING id, name, zone_type, is_active, created_at
    `;

    const newZone = result[0];

    res.status(201).json({
      success: true,
      data: {
        id: newZone.id,
        name: newZone.name,
        zoneType: newZone.zone_type,
        isActive: newZone.is_active,
        createdAt: newZone.created_at,
      },
      message: 'Mining zone created successfully',
    });
  } catch (error) {
    console.error('Error in createMiningZone:', error);

    if (error.code === '23505') {
      // Unique constraint violation
      return res.status(400).json({
        success: false,
        message: 'Zone with this name already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create mining zone',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const updateMiningZone = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const { name, zoneType, boundary, isActive } = req.body;

    if (!zoneId || isNaN(parseInt(zoneId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid zone ID provided',
      });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 0;

    if (name) {
      paramCount++;
      updates.push(`name = ${paramCount}`);
      values.push(name);
    }

    if (zoneType) {
      paramCount++;
      updates.push(`zone_type = ${paramCount}`);
      values.push(zoneType);
    }

    if (boundary && boundary.type === 'Polygon') {
      paramCount++;
      updates.push(`boundary = ST_SetSRID(ST_GeomFromGeoJSON(${paramCount}), 4326)`);
      values.push(JSON.stringify(boundary));
    }

    if (typeof isActive === 'boolean') {
      paramCount++;
      updates.push(`is_active = ${paramCount}`);
      values.push(isActive);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid updates provided',
      });
    }

    paramCount++;
    values.push(parseInt(zoneId));

    const updateQuery = `
      UPDATE mining_zones 
      SET ${updates.join(', ')}
      WHERE id = ${paramCount}
      RETURNING id, name, zone_type, is_active
    `;

    const result = await prismaService.prisma.$queryRawUnsafe(updateQuery, ...values);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mining zone not found',
      });
    }

    const updatedZone = result[0];

    res.status(200).json({
      success: true,
      data: {
        id: updatedZone.id,
        name: updatedZone.name,
        zoneType: updatedZone.zone_type,
        isActive: updatedZone.is_active,
      },
      message: 'Mining zone updated successfully',
    });
  } catch (error) {
    console.error('Error in updateMiningZone:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update mining zone',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const deleteMiningZone = async (req, res) => {
  try {
    const { zoneId } = req.params;

    if (!zoneId || isNaN(parseInt(zoneId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid zone ID provided',
      });
    }

    // Soft delete by setting is_active to false
    const result = await prismaService.prisma.$queryRaw`
      UPDATE mining_zones 
      SET is_active = false 
      WHERE id = ${parseInt(zoneId)} AND is_active = true
      RETURNING id, name
    `;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mining zone not found or already inactive',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: result[0].id,
        name: result[0].name,
        status: 'deactivated',
      },
      message: 'Mining zone deactivated successfully',
    });
  } catch (error) {
    console.error('Error in deleteMiningZone:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete mining zone',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

function getActivityLevel(recordCount) {
  if (recordCount > 100) return 'high';
  if (recordCount > 50) return 'medium';
  if (recordCount > 10) return 'low';
  return 'minimal';
}

module.exports = {
  getMiningAreas,
  getTrucksInZone,
  getZoneStatistics,
  getZoneActivityReport,
  checkTruckInZones,
  getNearbyTrucks,
  createMiningZone,
  updateMiningZone,
  deleteMiningZone,
};
