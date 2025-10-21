const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../prisma/generated/client');
const authMiddleware = require('../middleware/auth');
const {
  validateVendorCreate,
  validateVendorUpdate,
  validateIntParam,
  validatePagination,
} = require('../middleware/crudValidation');

const prisma = new PrismaClient();

// GET /api/vendors - Get all vendors
router.get('/', authMiddleware, validatePagination, async (req, res) => {
  try {
    const vendors = await prisma.vendors.findMany({
      include: {
        trucks: {
          select: {
            id: true,
            name: true,
            code: true,
            model: true,
          },
        },
        drivers: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const vendorsWithCounts = vendors.map((vendor) => ({
      ...vendor,
      truckCount: vendor.trucks.length,
      driverCount: vendor.drivers.length,
    }));

    res.status(200).json({
      success: true,
      data: vendorsWithCounts,
      message: 'Vendors retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting vendors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vendors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/vendors/:vendorId - Get specific vendor details
router.get('/:vendorId', authMiddleware, validateIntParam('vendorId'), async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await prisma.vendors.findUnique({
      where: {
        id: parseInt(vendorId),
      },
      include: {
        trucks: {
          include: {
            truck_status_event: {
              orderBy: {
                changed_at: 'desc',
              },
              take: 1,
            },
          },
        },
        drivers: {
          where: {
            status: 'aktif',
          },
        },
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const vendorData = {
      id: vendor.id,
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
      email: vendor.email,
      contactPerson: vendor.contactPerson,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
      trucks: vendor.trucks.map((truck) => ({
        id: truck.id,
        name: truck.name,
        code: truck.code,
        model: truck.model,
        status: truck.truck_status_event[0]?.status || 'active',
        created_at: truck.created_at,
      })),
      drivers: vendor.drivers,
      truck_count: vendor.trucks.length,
      driver_count: vendor.drivers.length,
    };

    res.status(200).json({
      success: true,
      data: vendorData,
      message: 'Vendor details retrieved successfully',
    });
  } catch (error) {
    console.error('Error getting vendor details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vendor details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/vendors/:vendorId/trucks - Get trucks for specific vendor
router.get(
  '/:vendorId/trucks',
  authMiddleware,
  validateIntParam('vendorId'),
  validatePagination,
  async (req, res) => {
    try {
      const { vendorId } = req.params;
      const { page = 1, limit = 50 } = req.query;

      const skip = (page - 1) * limit;

      const [trucks, total] = await Promise.all([
        prisma.truck.findMany({
          where: {
            vendorId: parseInt(vendorId),
          },
          include: {
            vendor: {
              select: {
                name: true,
              },
            },
            truck_status_event: {
              orderBy: {
                changed_at: 'desc',
              },
              take: 1,
            },
          },
          orderBy: {
            name: 'asc',
          },
          skip: skip,
          take: parseInt(limit),
        }),
        prisma.truck.count({
          where: {
            vendorId: parseInt(vendorId),
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      const trucksData = trucks.map((truck) => ({
        id: truck.id,
        name: truck.name,
        code: truck.code,
        model: truck.model,
        status: truck.truck_status_event[0]?.status || 'active',
        created_at: truck.created_at,
        vendorName: truck.vendor?.name,
      }));

      res.status(200).json({
        success: true,
        data: {
          trucks: trucksData,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: total,
            totalPages: totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
        message: 'Vendor trucks retrieved successfully',
      });
    } catch (error) {
      console.error('Error getting vendor trucks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get vendor trucks',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
);

// POST /api/vendors - Create new vendor
router.post('/', authMiddleware, validateVendorCreate, async (req, res) => {
  try {
    const { name, address, phone, email, contactPerson } = req.body;

    console.log('📝 Creating vendor with data:', {
      name,
      address,
      phone,
      email,
      contactPerson,
    });

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: name',
      });
    }

    // Check if vendor with same name already exists
    const existingVendor = await prisma.vendors.findFirst({
      where: {
        name: name,
      },
    });

    if (existingVendor) {
      return res.status(409).json({
        success: false,
        message: 'Vendor with this name already exists',
      });
    }

    const vendor = await prisma.vendors.create({
      data: {
        name,
        address: address || null,
        phone: phone || null,
        email: email || null,
        contactPerson: contactPerson || null,
      },
    });

    console.log('✅ Vendor created successfully:', vendor.id);

    res.status(201).json({
      success: true,
      data: vendor,
      message: 'Vendor created successfully',
    });
  } catch (error) {
    console.error('❌ Error creating vendor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create vendor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// PUT /api/vendors/:vendorId - Update vendor
router.put('/:vendorId', authMiddleware, validateVendorUpdate, async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { name, address, phone, email, contactPerson } = req.body;

    console.log('📝 Updating vendor ID:', vendorId);
    console.log('📝 Update data received:', {
      name,
      address,
      phone,
      email,
      contactPerson,
    });

    // Check if vendor exists
    const existingVendor = await prisma.vendors.findUnique({
      where: { id: parseInt(vendorId) },
    });

    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    console.log('📋 Current vendor data:', existingVendor);

    // Check if name is being changed and if new name already exists
    if (name && name !== existingVendor.name) {
      const duplicateVendor = await prisma.vendors.findFirst({
        where: {
          name: name,
          id: { not: parseInt(vendorId) },
        },
      });

      if (duplicateVendor) {
        return res.status(409).json({
          success: false,
          message: 'Vendor with this name already exists',
        });
      }
    }

    // Build update data - only include fields that are provided
    const updateData = {};
    if (name !== undefined && name !== null) updateData.name = name;
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    updateData.updatedAt = new Date();

    console.log('🔄 Updating with data:', updateData);

    const vendor = await prisma.vendors.update({
      where: { id: parseInt(vendorId) },
      data: updateData,
      include: {
        trucks: {
          select: {
            id: true,
            name: true,
            code: true,
            model: true,
          },
        },
        drivers: {
          select: {
            id: true,
            name: true,
            phone: true,
            status: true,
          },
        },
      },
    });

    console.log('✅ Vendor updated successfully:', vendor.id);

    res.status(200).json({
      success: true,
      data: {
        ...vendor,
        truckCount: vendor.trucks.length,
        driverCount: vendor.drivers.length,
      },
      message: 'Vendor updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating vendor:', error);
    console.error('Error details:', error.stack);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update vendor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// DELETE /api/vendors/:vendorId - Delete vendor (with validation)
router.delete('/:vendorId', authMiddleware, validateIntParam('vendorId'), async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Check if vendor exists
    const vendor = await prisma.vendors.findUnique({
      where: { id: parseInt(vendorId) },
      include: {
        trucks: true,
        drivers: true,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Check if vendor has associated trucks or drivers
    if (vendor.trucks.length > 0 || vendor.drivers.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          'Cannot delete vendor with associated trucks or drivers. Please reassign or remove them first.',
        data: {
          truck_count: vendor.trucks.length,
          driver_count: vendor.drivers.length,
        },
      });
    }

    await prisma.vendors.delete({
      where: { id: parseInt(vendorId) },
    });

    res.status(200).json({
      success: true,
      message: 'Vendor deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete vendor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

module.exports = router;
