const prismaService = require('../services/simplePrismaService');
const { deleteImage } = require('../middleware/uploadImage');

// ==========================================
// TRUCK CONTROLLER - PRISMA VERSION
// ==========================================

const getAllTrucks = async (req, res) => {
  try {
    console.log('🚛 getAllTrucks called with query:', req.query);

    const filters = {
      status: req.query.status,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 50,
      search: req.query.search,
      minFuel: req.query.minFuel ? parseFloat(req.query.minFuel) : undefined,
      maxFuel: req.query.maxFuel ? parseFloat(req.query.maxFuel) : undefined,
      hasAlerts: req.query.hasAlerts,
      vendor: req.query.vendor,
      vendorId: req.query.vendorId,
    };

    console.log('🔍 Filters applied:', filters);

    // Validate limit (prevent excessive queries)
    if (filters.limit > 200) {
      filters.limit = 200;
    }

    console.log('📊 Calling prismaService.getAllTrucks...');
    const result = await prismaService.getAllTrucks(filters);
    console.log('✅ prismaService.getAllTrucks completed successfully');

    // Add null checks for result
    if (!result) {
      console.error('❌ prismaService.getAllTrucks returned null/undefined');
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch trucks - no data returned',
        error: 'Service returned null result',
      });
    }

    if (!result.trucks) {
      console.error('❌ result.trucks is null/undefined');
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch trucks - invalid data structure',
        error: 'Missing trucks array in result',
      });
    }

    console.log(`📋 Retrieved ${result.trucks.length} trucks`);

    res.status(200).json({
      success: true,
      data: result,
      message: `Retrieved ${result.trucks.length} trucks successfully`,
    });
  } catch (error) {
    console.error('❌ Error in getAllTrucks:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trucks',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getTruckById = async (req, res) => {
  try {
    const truckId = req.params.id; // UUID expected

    const truck = await prismaService.getTruckById(truckId);

    res.status(200).json({
      success: true,
      data: truck,
      message: 'Truck details retrieved successfully',
    });
  } catch (error) {
    console.error('Error in getTruckById:', error);

    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getTruckTires = async (req, res) => {
  try {
    const truckId = req.params.id; // UUID string accepted

    const tireData = await prismaService.getTruckTires(truckId);

    res.status(200).json({
      success: true,
      data: tireData,
      message: 'Tire pressure data retrieved successfully',
    });
  } catch (error) {
    console.error('Error in getTruckTires:', error);

    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch tire pressure data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
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
      Pragma: 'no-cache',
      Expires: '0',
      'Content-Type': 'application/json',
    });

    res.status(200).json({
      success: true,
      data: geoJsonData,
      message: `Retrieved ${geoJsonData.features.length} truck locations`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in getRealtimeLocations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch real-time locations',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
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
        message: 'Invalid truck ID provided',
      });
    }

    // Validate status
    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updatedTruck = await prismaService.updateTruckStatus(truckId, status);

    // Broadcast update via WebSocket if available
    try {
      const { broadcastTruckStatusUpdate } = require('../services/websocketService');
      broadcastTruckStatusUpdate({
        truckId: truckId,
        status: status,
        timestamp: new Date().toISOString(),
      });
    } catch (wsError) {
      console.log('WebSocket broadcast failed:', wsError.message);
      // Continue without WebSocket broadcast
    }

    res.status(200).json({
      success: true,
      data: updatedTruck,
      message: 'Truck status updated successfully',
    });
  } catch (error) {
    console.error('Error in updateTruckStatus:', error);

    if (error.message === 'Truck not found') {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update truck status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
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

    // Calculate time range
    const since = new Date();
    since.setHours(since.getHours() - parseInt(hours));

    // Get locations via device.locations (location table)
    const truck = await prismaService.prisma.truck.findUnique({
      where: { id: truckId },
      include: {
        devices: {
          where: { deleted_at: null },
          include: {
            locations: {
              where: {
                created_at: { gte: since },
              },
              orderBy: { created_at: 'desc' },
              take: parseInt(limit),
            },
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

    // Flatten locations from all devices
    const locationHistory = truck.devices.flatMap((device) => device.locations);

    // Sort by timestamp
    locationHistory.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Format as GeoJSON LineString for tracking
    const coordinates = locationHistory
      .slice()
      .reverse() // Oldest first for proper line drawing
      .map((point) => [parseFloat(point.long), parseFloat(point.lat)]);

    const geoJsonTrack = {
      type: 'Feature',
      properties: {
        truckId: truckId,
        timeRange: `${hours} hours`,
        totalPoints: coordinates.length,
      },
      geometry: {
        type: 'LineString',
        coordinates: coordinates,
      },
    };

    res.status(200).json({
      success: true,
      data: {
        track: geoJsonTrack,
        points: locationHistory.map((point) => ({
          latitude: parseFloat(point.lat),
          longitude: parseFloat(point.long),
          speed: parseFloat(point.speed || 0),
          heading: point.heading,
          timestamp: point.created_at,
        })),
      },
      message: `Retrieved ${locationHistory.length} location points for the last ${hours} hours`,
    });
  } catch (error) {
    console.error('Error in getTruckLocationHistory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch location history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const getTruckAlerts = async (req, res) => {
  try {
    const truckId = req.params.id;
    const { resolved = false, limit = 50 } = req.query;

    const alerts = await prismaService.prisma.alert_events.findMany({
      where: {
        truck_id: truckId,
        status: resolved === 'true' ? 'resolved' : 'active',
      },
      include: {
        alert: {
          select: {
            id: true,
            code: true,
            name: true,
            severity: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      data: {
        truckId: truckId,
        alerts: alerts.map((alert) => ({
          id: alert.id,
          code: alert.alert?.code || 'unknown',
          name: alert.alert?.name || 'Unknown',
          severity: alert.alert?.severity || 'warning',
          message: alert.message,
          value: alert.value,
          status: alert.status,
          createdAt: alert.created_at,
          resolvedAt: alert.resolved_at,
        })),
        totalCount: alerts.length,
      },
      message: `Retrieved ${alerts.length} alerts`,
    });
  } catch (error) {
    console.error('Error in getTruckAlerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck alerts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const resolveAlert = async (req, res) => {
  try {
    const { truckId, alertId } = req.params;

    const resolvedAlert = await prismaService.prisma.alert_events.updateMany({
      where: {
        id: alertId,
        truck_id: truckId,
        status: 'active',
        deleted_at: null,
      },
      data: {
        status: 'resolved',
        resolved_at: new Date(),
        updated_at: new Date(),
      },
    });

    if (resolvedAlert.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found or already resolved',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Alert resolved successfully',
    });
  } catch (error) {
    console.error('Error in resolveAlert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resolve alert',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
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
        message: 'truckIds must be a non-empty array',
      });
    }

    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Bulk update (truck IDs are UUIDs now)
    const updateResult = await prismaService.prisma.truck.updateMany({
      where: {
        id: { in: truckIds },
        deleted_at: null,
      },
      data: {
        status: status,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        updatedCount: updateResult.count,
        status: status,
      },
      message: `Updated status for ${updateResult.count} trucks`,
    });
  } catch (error) {
    console.error('Error in bulkUpdateTruckStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update truck status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// New function for getting truck locations by truck plate
const getTruckLocationsByName = async (req, res) => {
  try {
    const truckPlate = decodeURIComponent(req.params.truckName); // keeping param name for compatibility
    const { timeRange = '24h', limit = 200, minSpeed = 0 } = req.query;

    console.log(`Getting location history for truck plate: ${truckPlate}`);

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

    // Find truck by plate with locations from devices
    const truck = await prismaService.prisma.truck.findFirst({
      where: {
        plate: truckPlate,
        deleted_at: null,
      },
      select: {
        id: true,
        plate: true,
        type: true,
        devices: {
          where: { deleted_at: null },
          select: {
            locations: {
              where: {
                created_at: { gte: since },
                speed: { gte: parseFloat(minSpeed) },
              },
              orderBy: { created_at: 'desc' },
              take: parseInt(limit),
              select: {
                id: true,
                lat: true,
                long: true,
                speed: true,
                heading: true,
                created_at: true,
              },
            },
          },
        },
      },
    });

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: `Truck with plate '${truckPlate}' not found`,
      });
    }

    // Flatten locations from all devices
    const locations = truck.devices
      .flatMap((device) => device.locations)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((pos) => ({
        id: pos.id,
        latitude: parseFloat(pos.lat),
        longitude: parseFloat(pos.long),
        speed: parseFloat(pos.speed) || 0,
        heading: parseFloat(pos.heading) || 0,
        timestamp: pos.created_at,
      }));

    // Create GeoJSON track
    const coordinates = locations
      .slice()
      .reverse() // Oldest first for proper line drawing
      .map((point) => [point.longitude, point.latitude]);

    const geoJsonTrack = {
      type: 'Feature',
      properties: {
        truckPlate: truckPlate,
        truckId: truck.id,
        timeRange: timeRange,
        totalPoints: coordinates.length,
        minSpeed: minSpeed,
      },
      geometry: {
        type: 'LineString',
        coordinates: coordinates,
      },
    };

    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });

    res.status(200).json({
      success: true,
      data: locations, // Frontend expects data to be the array directly
      truck: {
        id: truck.id,
        plate: truckPlate,
        type: truck.type,
      },
      track: geoJsonTrack,
      summary: {
        totalPoints: locations.length,
        timeRange: `${hoursBack} hours`,
        minSpeed: minSpeed,
        avgSpeed:
          locations.length > 0
            ? (locations.reduce((sum, loc) => sum + loc.speed, 0) / locations.length).toFixed(1)
            : 0,
      },
      message: `Retrieved ${locations.length} location points for truck ${truckPlate} over the last ${hoursBack} hours`,
    });
  } catch (error) {
    console.error('Error in getTruckLocationsByName:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck location history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// ==========================================
// TRUCK CRUD OPERATIONS
// ==========================================

const createTruck = async (req, res) => {
  try {
    const { name, plate, type, status, driver_id, vendor_id, model, year, vin } = req.body;

    // Handle uploaded image
    let imageUrl = null;
    if (req.file) {
      // Store relative path: /uploads/trucks/filename.jpg
      imageUrl = `/uploads/trucks/${req.file.filename}`;
    }

    // Validate required fields
    if (!plate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: plate',
      });
    }

    // Check if truck with same plate already exists
    const existingTruck = await prismaService.prisma.truck.findFirst({
      where: {
        plate: plate,
        deleted_at: null,
      },
    });

    if (existingTruck) {
      // Delete uploaded file if truck already exists
      if (req.file) {
        deleteImage(imageUrl);
      }
      return res.status(409).json({
        success: false,
        message: 'Truck with this plate already exists',
      });
    }

    // Validate vendor_id if provided
    if (vendor_id) {
      const vendor = await prismaService.prisma.vendors.findUnique({
        where: { id: parseInt(vendor_id) },
      });
      if (!vendor) {
        if (req.file) deleteImage(imageUrl);
        return res.status(400).json({
          success: false,
          message: 'Invalid vendor_id: vendor not found',
        });
      }
    }

    // Validate driver_id if provided
    if (driver_id) {
      const driver = await prismaService.prisma.drivers.findUnique({
        where: { id: parseInt(driver_id) },
      });
      if (!driver) {
        if (req.file) deleteImage(imageUrl);
        return res.status(400).json({
          success: false,
          message: 'Invalid driver_id: driver not found',
        });
      }
    }

    // Validate status
    const validStatuses = ['active', 'inactive', 'maintenance'];
    const truckStatus = status || 'active';
    if (!validStatuses.includes(truckStatus)) {
      if (req.file) deleteImage(imageUrl);
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const truck = await prismaService.prisma.truck.create({
      data: {
        name: name || plate, // Use plate as name if name not provided
        plate,
        type,
        model,
        year: year ? parseInt(year) : null,
        vin,
        status: truckStatus,
        driver_id: driver_id ? parseInt(driver_id) : null,
        vendor_id: vendor_id ? parseInt(vendor_id) : null,
        image: imageUrl,
      },
      include: {
        vendor: {
          select: {
            id: true,
            name_vendor: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            license_number: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: truck,
      message: 'Truck created successfully',
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      deleteImage(`/uploads/trucks/${req.file.filename}`);
    }
    console.error('Error creating truck:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create truck',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const updateTruck = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, plate, type, status, driver_id, vendor_id, model, year, vin } = req.body;

    // Check if truck exists
    const existingTruck = await prismaService.prisma.truck.findUnique({
      where: { id: id },
    });

    if (!existingTruck) {
      // Delete uploaded file if truck not found
      if (req.file) {
        deleteImage(`/uploads/trucks/${req.file.filename}`);
      }
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    // Check for plate conflict with other trucks
    if (plate && plate !== existingTruck.plate) {
      const conflictTruck = await prismaService.prisma.truck.findFirst({
        where: {
          plate: plate,
          id: { not: id },
          deleted_at: null,
        },
      });

      if (conflictTruck) {
        if (req.file) deleteImage(`/uploads/trucks/${req.file.filename}`);
        return res.status(409).json({
          success: false,
          message: 'Another truck with this plate already exists',
        });
      }
    }

    // Validate vendor_id if provided
    if (vendor_id && vendor_id !== existingTruck.vendor_id) {
      const vendor = await prismaService.prisma.vendors.findUnique({
        where: { id: parseInt(vendor_id) },
      });
      if (!vendor) {
        if (req.file) deleteImage(`/uploads/trucks/${req.file.filename}`);
        return res.status(400).json({
          success: false,
          message: 'Invalid vendor_id: vendor not found',
        });
      }
    }

    // Validate driver_id if provided
    if (driver_id && driver_id !== existingTruck.driver_id) {
      const driver = await prismaService.prisma.drivers.findUnique({
        where: { id: parseInt(driver_id) },
      });
      if (!driver) {
        if (req.file) deleteImage(`/uploads/trucks/${req.file.filename}`);
        return res.status(400).json({
          success: false,
          message: 'Invalid driver_id: driver not found',
        });
      }
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['active', 'inactive', 'maintenance'];
      if (!validStatuses.includes(status)) {
        if (req.file) deleteImage(`/uploads/trucks/${req.file.filename}`);
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (plate !== undefined) updateData.plate = plate;
    if (type !== undefined) updateData.type = type;
    if (model !== undefined) updateData.model = model;
    if (year !== undefined) updateData.year = year ? parseInt(year) : null;
    if (vin !== undefined) updateData.vin = vin;
    if (status !== undefined) updateData.status = status;
    if (driver_id !== undefined) updateData.driver_id = driver_id ? parseInt(driver_id) : null;
    if (vendor_id !== undefined) updateData.vendor_id = vendor_id ? parseInt(vendor_id) : null;

    // Handle image upload
    if (req.file) {
      const newImageUrl = `/uploads/trucks/${req.file.filename}`;
      updateData.image = newImageUrl;

      // Delete old image if exists
      if (existingTruck.image) {
        deleteImage(existingTruck.image);
      }
    }

    updateData.updated_at = new Date();

    const truck = await prismaService.prisma.truck.update({
      where: { id: id },
      data: updateData,
      include: {
        vendor: {
          select: {
            id: true,
            name_vendor: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            license_number: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: truck,
      message: 'Truck updated successfully',
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      deleteImage(`/uploads/trucks/${req.file.filename}`);
    }
    console.error('Error updating truck:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update truck',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

const deleteTruck = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if truck exists and get related data
    const truck = await prismaService.prisma.truck.findUnique({
      where: { id: id },
      include: {
        devices: { take: 1 },
        alert_events: { take: 1 },
      },
    });

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found',
      });
    }

    // Check if truck has associated data that would prevent deletion
    const hasData = truck.devices.length > 0 || truck.alert_events.length > 0;

    if (hasData) {
      return res.status(400).json({
        success: false,
        message:
          'Cannot delete truck with associated devices or alerts. Consider soft-deleting by setting deleted_at instead.',
        data: {
          device_count: truck.devices.length,
          has_alerts: truck.alert_events.length > 0,
        },
      });
    }

    // Soft delete truck (set deleted_at)
    await prismaService.prisma.truck.update({
      where: { id: id },
      data: {
        deleted_at: new Date(),
      },
    });

    // Delete associated image file
    if (truck.image) {
      deleteImage(truck.image);
    }

    res.status(200).json({
      success: true,
      message: 'Truck deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting truck:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete truck',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// GET TRUCK SUMMARY
const getTruckSummary = async (req, res) => {
  try {
    const statusCounts = await prismaService.prisma.truck.groupBy({
      by: ['status'],
      where: {
        deleted_at: null,
      },
      _count: {
        _all: true,
      },
    });

    const summary = {
      total: 0,
      operational: 0,
      maintenance: 0,
      inactive: 0,
    };

    statusCounts.forEach((item) => {
      const count = item._count._all;
      summary.total += count;

      if (item.status === 'operational') summary.operational = count;
      else if (item.status === 'maintenance') summary.maintenance = count;
      else if (item.status === 'inactive') summary.inactive = count;
    });

    res.status(200).json({
      success: true,
      data: summary,
      message: 'Truck summary retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting truck summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch truck summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// GET TRUCKS BY STATUS
const getTrucksByStatus = async (req, res) => {
  try {
    const { status = 'operational', page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const [trucks, total] = await Promise.all([
      prismaService.prisma.truck.findMany({
        where: {
          status: status,
          deleted_at: null,
        },
        include: {
          vendor: {
            select: {
              id: true,
              name_vendor: true,
            },
          },
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
        skip: skip,
        take: parseInt(limit),
      }),
      prismaService.prisma.truck.count({
        where: {
          status: status,
          deleted_at: null,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        trucks: trucks.map((truck) => ({
          id: truck.id,
          name: truck.name,
          plate: truck.plate,
          model: truck.model,
          type: truck.type,
          status: truck.status,
          vendor: truck.vendor
            ? {
                id: truck.vendor.id,
                name: truck.vendor.name_vendor,
              }
            : null,
          driver: truck.driver,
          created_at: truck.created_at,
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      message: `Retrieved ${trucks.length} trucks with status: ${status}`,
    });
  } catch (error) {
    console.error('Error getting trucks by status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trucks by status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// GET TRUCK LOCATION HISTORY (alternative endpoint)
const getTruckLocationHistoryAlt = async (req, res) => {
  try {
    const truckId = req.params.id;
    const { limit = 50, startDate, endDate } = req.query;

    // Get device for this truck
    const device = await prismaService.prisma.device.findFirst({
      where: {
        truck_id: truckId,
        deleted_at: null,
      },
      select: { id: true },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'No device found for this truck',
      });
    }

    const where = {
      device_id: device.id,
    };

    if (startDate || endDate) {
      where.recorded_at = {};
      if (startDate) where.recorded_at.gte = new Date(startDate);
      if (endDate) where.recorded_at.lte = new Date(endDate);
    }

    const locations = await prismaService.prisma.location_history.findMany({
      where,
      orderBy: {
        recorded_at: 'desc',
      },
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      data: {
        truck_id: truckId,
        device_id: device.id,
        locations: locations.map((loc) => ({
          id: loc.id,
          lat: loc.lat,
          long: loc.long,
          altitude: loc.altitude,
          recorded_at: loc.recorded_at,
        })),
        count: locations.length,
      },
      message: `Retrieved ${locations.length} location records`,
    });
  } catch (error) {
    console.error('Error getting truck location history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch location history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
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
  getTruckLocationsByName,
  createTruck,
  updateTruck,
  deleteTruck,
  getTruckSummary,
  getTrucksByStatus,
  getTruckLocationHistoryAlt,
};
