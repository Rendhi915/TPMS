const prismaService = require('../services/simplePrismaService');

// ==========================================
// TRUCK CONTROLLER - PRISMA VERSION
// ==========================================

const getAllTrucks = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 50,
      search: req.query.search,
      minFuel: req.query.minFuel ? parseFloat(req.query.minFuel) : undefined,
      maxFuel: req.query.maxFuel ? parseFloat(req.query.maxFuel) : undefined,
      hasAlerts: req.query.hasAlerts
    };

    // Validate limit (prevent excessive queries)
    if (filters.limit > 200) {
      filters.limit = 200;
    }

    const result = await prismaService.getAllTrucks(filters);
    
    res.status(200).json({
      success: true,
      data: result,
      message: `Retrieved ${result.trucks.length} trucks successfully`
    });

  } catch (error) {
    console.error('Error in getAllTrucks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trucks',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getTruckById = async (req, res) => {
  try {
    const truckId = req.params.id;
    
    // Validate truck ID
    if (!truckId || isNaN(parseInt(truckId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided'
      });
    }

    const truck = await prismaService.getTruckById(truckId);
    
    res.status(200).json({
      success: true,
      data: truck,
      message: 'Truck details retrieved successfully'
    });

  } catch (error) {
    console.error('Error in getTruckById:', error);
    
    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getTruckTires = async (req, res) => {
  try {
    const truckId = req.params.id;
    
    // Validate truck ID
    if (!truckId || isNaN(parseInt(truckId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided'
      });
    }

    const tireData = await prismaService.getTruckTires(truckId);
    
    res.status(200).json({
      success: true,
      data: tireData,
      message: 'Tire pressure data retrieved successfully'
    });

  } catch (error) {
    console.error('Error in getTruckTires:', error);
    
    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch tire pressure data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getRealtimeLocations = async (req, res) => {
  try {
    const { status } = req.query;
    
    const geoJsonData = await prismaService.getRealtimeLocations(status);
    
    // Set cache headers for real-time data
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json'
    });
    
    res.status(200).json({
      success: true,
      data: geoJsonData,
      message: `Retrieved ${geoJsonData.features.length} truck locations`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in getRealtimeLocations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch real-time locations',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const updateTruckStatus = async (req, res) => {
  try {
    const truckId = req.params.id;
    const { status } = req.body;
    
    // Validate truck ID
    if (!truckId || isNaN(parseInt(truckId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided'
      });
    }
    
    // Validate status
    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updatedTruck = await prismaService.updateTruckStatus(truckId, status);
    
    // Broadcast update via WebSocket if available
    try {
      const { broadcastTruckStatusUpdate } = require('../services/websocketService');
      broadcastTruckStatusUpdate({
        truckId: truckId,
        status: status,
        timestamp: new Date().toISOString()
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
      // Continue without WebSocket broadcast
    }
    
    res.status(200).json({
      success: true,
      data: updatedTruck,
      message: 'Truck status updated successfully'
    });

  } catch (error) {
    console.error('Error in updateTruckStatus:', error);
    
    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update truck status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ==========================================
// ADVANCED TRUCK OPERATIONS
// ==========================================

const getTruckLocationHistory = async (req, res) => {
  try {
    const truckId = req.params.id;
    const { hours = 24, limit = 100 } = req.query;
    
    // Validate truck ID
    if (!truckId || isNaN(parseInt(truckId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided'
      });
    }

    // Calculate time range
    const since = new Date();
    since.setHours(since.getHours() - parseInt(hours));

    const locationHistory = await prismaService.prisma.locationHistory.findMany({
      where: {
        truckId: truckId,
        recordedAt: {
          gte: since
        }
      },
      orderBy: {
        recordedAt: 'desc'
      },
      take: parseInt(limit)
    });

    // Format as GeoJSON LineString for tracking
    const coordinates = locationHistory
      .reverse() // Oldest first for proper line drawing
      .map(point => [parseFloat(point.longitude), parseFloat(point.latitude)]);

    const geoJsonTrack = {
      type: "Feature",
      properties: {
        truckId: truckId,
        timeRange: `${hours} hours`,
        totalPoints: coordinates.length
      },
      geometry: {
        type: "LineString",
        coordinates: coordinates
      }
    };

    res.status(200).json({
      success: true,
      data: {
        track: geoJsonTrack,
        points: locationHistory.map(point => ({
          latitude: parseFloat(point.latitude),
          longitude: parseFloat(point.longitude),
          speed: parseFloat(point.speed),
          heading: point.heading,
          fuel: point.fuelPercentage ? parseFloat(point.fuelPercentage) : null,
          timestamp: point.recordedAt
        }))
      },
      message: `Retrieved ${locationHistory.length} location points for the last ${hours} hours`
    });

  } catch (error) {
    console.error('Error in getTruckLocationHistory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch location history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getTruckAlerts = async (req, res) => {
  try {
    const truckId = req.params.id;
    const { resolved = false, limit = 50 } = req.query;
    
    // Validate truck ID (should be 4-digit format like 0001)
    if (!truckId || !/^\d{4}$/.test(truckId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID provided. Expected 4-digit format (e.g., 0001)'
      });
    }

    const alerts = await prismaService.prisma.truckAlert.findMany({
      where: {
        truckId: truckId,
        isResolved: resolved === 'true' ? true : false
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      data: {
        truckId: truckId,
        alerts: alerts.map(alert => ({
          id: alert.id,
          type: alert.alertType,
          severity: alert.severity,
          message: alert.message,
          isResolved: alert.isResolved,
          createdAt: alert.createdAt,
          resolvedAt: alert.resolvedAt
        })),
        totalCount: alerts.length
      },
      message: `Retrieved ${alerts.length} alerts`
    });

  } catch (error) {
    console.error('Error in getTruckAlerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const resolveAlert = async (req, res) => {
  try {
    const { truckId, alertId } = req.params;
    
    // Validate IDs
    if (!truckId || isNaN(parseInt(truckId)) || !alertId || isNaN(parseInt(alertId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid truck ID or alert ID provided'
      });
    }

    const resolvedAlert = await prismaService.prisma.truckAlert.updateMany({
      where: {
        id: parseInt(alertId),
        truckId: truckId,
        isResolved: false
      },
      data: {
        isResolved: true,
        resolvedAt: new Date()
      }
    });

    if (resolvedAlert.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found or already resolved'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Alert resolved successfully'
    });

  } catch (error) {
    console.error('Error in resolveAlert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resolve alert',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ==========================================
// BULK OPERATIONS
// ==========================================

const bulkUpdateTruckStatus = async (req, res) => {
  try {
    const { truckIds, status } = req.body;
    
    // Validate input
    if (!Array.isArray(truckIds) || truckIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'truckIds must be a non-empty array'
      });
    }
    
    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Bulk update
    const updateResult = await prismaService.prisma.truck.updateMany({
      where: {
        id: {
          in: truckIds.filter(id => /^\d{4}$/.test(id))
        }
      },
      data: {
        status: status,
        updatedAt: new Date()
      }
    });

    res.status(200).json({
      success: true,
      data: {
        updatedCount: updateResult.count,
        status: status
      },
      message: `Updated status for ${updateResult.count} trucks`
    });

  } catch (error) {
    console.error('Error in bulkUpdateTruckStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update truck status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// New function for getting truck locations by truck name
const getTruckLocationsByName = async (req, res) => {
  try {
    const truckName = decodeURIComponent(req.params.truckName);
    const { timeRange = '24h', limit = 200, minSpeed = 0 } = req.query;
    
    console.log(`Getting location history for truck: ${truckName}`);
    
    // Parse time range
    let hoursBack = 24;
    if (timeRange.endsWith('h')) {
      hoursBack = parseInt(timeRange.replace('h', '')) || 24;
    } else if (timeRange.endsWith('d')) {
      hoursBack = (parseInt(timeRange.replace('d', '')) || 1) * 24;
    }
    
    // Calculate time range
    const since = new Date();
    since.setHours(since.getHours() - hoursBack);
    
    // First, find the truck by name
    const truck = await prismaService.prisma.$queryRaw`
      SELECT id, name, model FROM truck 
      WHERE name = ${truckName}
      LIMIT 1
    `;
    
    if (truck.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Truck with name '${truckName}' not found`
      });
    }
    
    const truckId = truck[0].id;
    
    // Get GPS positions for this truck
    const gpsPositions = await prismaService.prisma.$queryRaw`
      SELECT 
        id,
        truck_id,
        ts,
        ST_X(pos::geometry) as longitude,
        ST_Y(pos::geometry) as latitude,
        speed_kph,
        heading_deg,
        hdop,
        source
      FROM gps_position 
      WHERE truck_id = ${truckId}
        AND ts >= ${since}::timestamptz
        AND speed_kph >= ${parseFloat(minSpeed)}
      ORDER BY ts DESC
      LIMIT ${parseInt(limit)}
    `;
    
    // Format response (convert BigInt to string)
    const locations = gpsPositions.map(pos => ({
      id: pos.id.toString(),
      latitude: parseFloat(pos.latitude),
      longitude: parseFloat(pos.longitude),
      speed: parseFloat(pos.speed_kph) || 0,
      heading: parseFloat(pos.heading_deg) || 0,
      hdop: parseFloat(pos.hdop) || 0,
      timestamp: pos.ts,
      source: pos.source
    }));
    
    // Create GeoJSON track
    const coordinates = locations
      .reverse() // Oldest first for proper line drawing
      .map(point => [point.longitude, point.latitude]);
    
    const geoJsonTrack = {
      type: "Feature",
      properties: {
        truckName: truckName,
        truckId: truckId,
        timeRange: timeRange,
        totalPoints: coordinates.length,
        minSpeed: minSpeed
      },
      geometry: {
        type: "LineString",
        coordinates: coordinates
      }
    };
    
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    res.status(200).json({
      success: true,
      data: locations, // Frontend expects data to be the array directly
      truck: {
        id: truckId,
        truckName: truckName,
        model: truck[0].model
      },
      track: geoJsonTrack,
      summary: {
        totalPoints: locations.length,
        timeRange: `${hoursBack} hours`,
        minSpeed: minSpeed,
        avgSpeed: locations.length > 0 ? 
          (locations.reduce((sum, loc) => sum + loc.speed, 0) / locations.length).toFixed(1) : 0
      },
      message: `Retrieved ${locations.length} location points for truck ${truckName} over the last ${hoursBack} hours`
    });
    
  } catch (error) {
    console.error('Error in getTruckLocationsByName:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck location history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getAllTrucks,
  getTruckById,
  getTruckTires,
  getRealtimeLocations,
  updateTruckStatus,
  getTruckLocationHistory,
  getTruckAlerts,
  resolveAlert,
  bulkUpdateTruckStatus,
  getTruckLocationsByName
};