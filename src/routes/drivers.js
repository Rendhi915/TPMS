const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../prisma/generated/client');
const authMiddleware = require('../middleware/auth');
const {
  validateDriverCreate,
  validateDriverUpdate,
  validateIntParam,
  validatePagination,
} = require('../middleware/crudValidation');

const prisma = new PrismaClient();

// Normalize incoming driver payload to accept both snake_case and camelCase
const normalizeDriverPayload = (req, res, next) => {
  const b = req.body || {};

  // Map license_number (from validation) to database field
  if (b.license_number && !b.licenseNumber) b.licenseNumber = b.license_number;

  // Map telephone to phone (database uses 'phone')
  if (b.telephone && !b.phone) b.phone = b.telephone;

  next();
};

// GET /api/drivers - Get all drivers with filters and pagination
router.get('/', authMiddleware, validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 50, status, vendorId } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      deleted_at: null,
    };
    if (status) where.status = status;
    if (vendorId) where.vendor_id = parseInt(vendorId);

    const [drivers, total] = await Promise.all([
      prisma.drivers.findMany({
        where,
        include: {
          vendors: {
            select: {
              id: true,
              name_vendor: true,
              telephone: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
        skip: skip,
        take: parseInt(limit),
      }),
      prisma.drivers.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    const driversData = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      telephone: driver.phone, // Map phone to telephone for frontend
      email: driver.email,
      license_number: driver.license_number,
      license_type: driver.license_type,
      license_expiry: driver.license_expiry,
      status: driver.status,
      vendor: driver.vendors
        ? {
            id: driver.vendors.id,
            name: driver.vendors.name_vendor,
            telephone: driver.vendors.telephone,
          }
        : null,
      created_at: driver.created_at,
      updated_at: driver.updated_at,
    }));

    res.status(200).json({
      success: true,
      data: {
        drivers: driversData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      message: 'Drivers retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting drivers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get drivers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/drivers/expiring-licenses - Get drivers with expiring licenses
// IMPORTANT: This route MUST be defined BEFORE /:driverId to avoid being caught as a driverId param
router.get('/expiring-licenses', authMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));

    const drivers = await prisma.drivers.findMany({
      where: {
        license_expiry: {
          lte: futureDate,
        },
        status: 'aktif',
        deleted_at: null,
      },
      include: {
        vendors: {
          select: {
            id: true,
            name_vendor: true,
          },
        },
      },
      orderBy: {
        license_expiry: 'asc',
      },
    });

    const driversData = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      telephone: driver.phone, // Map phone to telephone for frontend
      license_number: driver.license_number,
      license_type: driver.license_type,
      license_expiry: driver.license_expiry,
      status: driver.status,
      vendor: driver.vendors
        ? {
            id: driver.vendors.id,
            name: driver.vendors.name_vendor,
          }
        : null,
    }));

    res.status(200).json({
      success: true,
      data: driversData,
      message: `Drivers with licenses expiring in ${days} days retrieved successfully`,
    });
  } catch (error) {
    console.error('Error getting drivers with expiring licenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get drivers with expiring licenses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/drivers/:driverId - Get specific driver details
router.get('/:driverId', authMiddleware, validateIntParam('driverId'), async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await prisma.drivers.findUnique({
      where: {
        id: parseInt(driverId),
        deleted_at: null,
      },
      include: {
        vendors: {
          select: {
            id: true,
            name_vendor: true,
            address: true,
            telephone: true,
          },
        },
      },
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
      });
    }

    const driverData = {
      id: driver.id,
      name: driver.name,
      telephone: driver.phone, // Map phone to telephone for frontend
      email: driver.email,
      license_number: driver.license_number,
      license_type: driver.license_type,
      license_expiry: driver.license_expiry,
      status: driver.status,
      vendor: driver.vendors
        ? {
            id: driver.vendors.id,
            name: driver.vendors.name_vendor,
            address: driver.vendors.address,
            telephone: driver.vendors.telephone,
          }
        : null,
      created_at: driver.created_at,
      updated_at: driver.updated_at,
    };

    res.status(200).json({
      success: true,
      data: driverData,
      message: 'Driver details retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting driver details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get driver details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// POST /api/drivers - Create new driver
router.post('/', authMiddleware, normalizeDriverPayload, validateDriverCreate, async (req, res) => {
  try {
    const {
      name,
      telephone,
      phone, // Accept both telephone and phone
      email,
      license_number,
      license_type = 'B1',
      license_expiry,
      vendor_id,
      status = 'aktif',
    } = req.body;

    // Parse license_expiry if provided, otherwise use far future
    const licenseExpiryDate = license_expiry ? new Date(license_expiry) : new Date('2099-12-31');

    const driver = await prisma.drivers.create({
      data: {
        name,
        phone: phone || telephone || null, // Use phone or telephone
        email: email || null,
        license_number,
        license_type,
        license_expiry: licenseExpiryDate,
        vendor_id: vendor_id ? parseInt(vendor_id) : null,
        status,
      },
      include: {
        vendors: {
          select: {
            id: true,
            name_vendor: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: driver.id,
        name: driver.name,
        telephone: driver.phone, // Return as telephone for frontend
        email: driver.email,
        license_number: driver.license_number,
        license_type: driver.license_type,
        license_expiry: driver.license_expiry,
        status: driver.status,
        vendor: driver.vendors
          ? {
              id: driver.vendors.id,
              name: driver.vendors.name_vendor,
            }
          : null,
        created_at: driver.created_at,
      },
      message: 'Driver created successfully',
    });
  } catch (error) {
    console.error('Error creating driver:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create driver',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// PUT /api/drivers/:driverId - Update driver
router.put(
  '/:driverId',
  authMiddleware,
  normalizeDriverPayload,
  validateDriverUpdate,
  async (req, res) => {
    try {
      const { driverId } = req.params;
      const {
        name,
        telephone,
        phone, // Accept both
        email,
        license_number,
        license_type,
        license_expiry,
        vendor_id,
        status,
      } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (telephone !== undefined || phone !== undefined) updateData.phone = phone || telephone;
      if (email !== undefined) updateData.email = email;
      if (license_number !== undefined) updateData.license_number = license_number;
      if (license_type !== undefined) updateData.license_type = license_type;
      if (license_expiry !== undefined) updateData.license_expiry = new Date(license_expiry);
      if (vendor_id !== undefined) updateData.vendor_id = vendor_id ? parseInt(vendor_id) : null;
      if (status !== undefined) updateData.status = status;
      updateData.updated_at = new Date();

      const driver = await prisma.drivers.update({
        where: {
          id: parseInt(driverId),
        },
        data: updateData,
        include: {
          vendors: {
            select: {
              id: true,
              name_vendor: true,
            },
          },
        },
      });

      res.status(200).json({
        success: true,
        data: {
          id: driver.id,
          name: driver.name,
          telephone: driver.phone, // Return as telephone for frontend
          email: driver.email,
          license_number: driver.license_number,
          license_type: driver.license_type,
          license_expiry: driver.license_expiry,
          status: driver.status,
          vendor: driver.vendors
            ? {
                id: driver.vendors.id,
                name: driver.vendors.name_vendor,
              }
            : null,
          updated_at: driver.updated_at,
        },
        message: 'Driver updated successfully',
      });
    } catch (error) {
      console.error('Error updating driver:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Driver not found',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to update driver',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
);

// DELETE /api/drivers/:driverId - Soft delete driver
router.delete('/:driverId', authMiddleware, validateIntParam('driverId'), async (req, res) => {
  try {
    const { driverId } = req.params;

    // Check if driver exists and not already deleted
    const existingDriver = await prisma.drivers.findUnique({
      where: {
        id: parseInt(driverId),
        deleted_at: null,
      },
    });

    if (!existingDriver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
      });
    }

    // Soft delete
    await prisma.drivers.update({
      where: {
        id: parseInt(driverId),
      },
      data: {
        deleted_at: new Date(),
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Driver deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting driver:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete driver',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

module.exports = router;
