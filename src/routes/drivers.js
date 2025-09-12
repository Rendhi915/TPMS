const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../prisma/generated/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/drivers - Get all drivers
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 50, status, vendor_id } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (vendor_id) where.vendor_id = parseInt(vendor_id);

    const [drivers, total] = await Promise.all([
      prisma.drivers.findMany({
        where,
        include: {
          vendor: {
            select: {
              id: true,
              nama_vendor: true,
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
router.get('/:driverId', authMiddleware, async (req, res) => {
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
            nama_vendor: true,
            address: true,
            nomor_telepon: true,
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
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      license_number,
      license_type,
      license_expiry,
      id_card_number,
      vendor_id,
      status = 'aktif',
    } = req.body;

    // Validate required fields
    if (!name || !license_number || !license_type || !license_expiry || !id_card_number) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: name, license_number, license_type, license_expiry, id_card_number',
      });
    }

    const driver = await prisma.drivers.create({
      data: {
        name,
        phone,
        email,
        address,
        license_number,
        license_type,
        license_expiry: new Date(license_expiry),
        id_card_number,
        vendor_id: vendor_id ? parseInt(vendor_id) : null,
        status,
      },
      include: {
        vendor: {
          select: {
            id: true,
            nama_vendor: true,
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
router.put('/:driverId', authMiddleware, async (req, res) => {
  try {
    const { driverId } = req.params;
    const {
      name,
      phone,
      email,
      address,
      license_number,
      license_type,
      license_expiry,
      id_card_number,
      vendor_id,
      status,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (license_number !== undefined) updateData.license_number = license_number;
    if (license_type !== undefined) updateData.license_type = license_type;
    if (license_expiry !== undefined) updateData.license_expiry = new Date(license_expiry);
    if (id_card_number !== undefined) updateData.id_card_number = id_card_number;
    if (vendor_id !== undefined) updateData.vendor_id = vendor_id ? parseInt(vendor_id) : null;
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
            nama_vendor: true,
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

// DELETE /api/drivers/:driverId - Delete driver (soft delete by setting status to nonaktif)
router.delete('/:driverId', authMiddleware, async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await prisma.drivers.update({
      where: {
        id: parseInt(driverId),
      },
      data: {
        status: 'nonaktif',
      },
    });

    res.status(200).json({
      success: true,
      data: driver,
      message: 'Driver deactivated successfully',
    });
  } catch (error) {
    console.error('Error deactivating driver:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate driver',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/drivers/expiring-licenses - Get drivers with expiring licenses
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
      },
      include: {
        vendor: {
          select: {
            id: true,
            nama_vendor: true,
          },
        },
      },
      orderBy: {
        license_expiry: 'asc',
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
