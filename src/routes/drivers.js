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

// GET /api/drivers - Get all drivers with filters and pagination
router.get('/', authMiddleware, validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 50, status, vendorId } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (vendorId) where.vendorId = parseInt(vendorId);

    const [drivers, total] = await Promise.all([
      prisma.drivers.findMany({
        where,
        include: {
          vendor: {
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
      prisma.drivers.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        drivers,
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

// GET /api/drivers/:driverId - Get specific driver details
router.get('/:driverId', authMiddleware, validateIntParam('driverId'), async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await prisma.drivers.findUnique({
      where: {
        id: parseInt(driverId),
      },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true,
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

    res.status(200).json({
      success: true,
      data: driver,
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
router.post('/', authMiddleware, validateDriverCreate, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      licenseNumber,
      licenseType,
      licenseExpiry,
      idCardNumber,
      vendorId,
      status = 'aktif',
    } = req.body;

    // Validate required fields
    if (!name || !licenseNumber || !licenseType || !licenseExpiry || !idCardNumber) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: name, licenseNumber, licenseType, licenseExpiry, idCardNumber',
      });
    }

    const driver = await prisma.drivers.create({
      data: {
        name,
        phone,
        email,
        address,
        licenseNumber,
        licenseType,
        licenseExpiry: new Date(licenseExpiry),
        idCardNumber,
        vendorId: vendorId ? parseInt(vendorId) : null,
        status,
      },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: driver,
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
router.put('/:driverId', authMiddleware, validateDriverUpdate, async (req, res) => {
  try {
    const { driverId } = req.params;
    const {
      name,
      phone,
      email,
      address,
      licenseNumber,
      licenseType,
      licenseExpiry,
      idCardNumber,
      vendorId,
      status,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (licenseNumber !== undefined) updateData.licenseNumber = licenseNumber;
    if (licenseType !== undefined) updateData.licenseType = licenseType;
    if (licenseExpiry !== undefined) updateData.licenseExpiry = new Date(licenseExpiry);
    if (idCardNumber !== undefined) updateData.idCardNumber = idCardNumber;
    if (vendorId !== undefined) updateData.vendorId = vendorId ? parseInt(vendorId) : null;
    if (status !== undefined) updateData.status = status;

    const driver = await prisma.drivers.update({
      where: {
        id: parseInt(driverId),
      },
      data: updateData,
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: driver,
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
});

// DELETE /api/drivers/:driverId - Delete driver permanently
router.delete('/:driverId', authMiddleware, validateIntParam('driverId'), async (req, res) => {
  try {
    const { driverId } = req.params;

    // Hard delete - permanently remove from database
    await prisma.drivers.delete({
      where: {
        id: parseInt(driverId),
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

// GET /api/drivers/expiring-licenses - Get drivers with expiring licenses
router.get('/expiring-licenses', authMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));

    const drivers = await prisma.drivers.findMany({
      where: {
        licenseExpiry: {
          lte: futureDate,
        },
        status: 'aktif',
      },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        licenseExpiry: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: drivers,
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

module.exports = router;
