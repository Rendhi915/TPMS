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
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const [vendors, total] = await Promise.all([
      prisma.vendors.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          trucks: {
            where: { deleted_at: null },
            select: {
              id: true,
              name: true,
              plate: true,
              model: true,
              status: true,
            },
          },
          drivers: {
            where: { deleted_at: null },
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
        orderBy: {
          name_vendor: 'asc',
        },
        skip: skip,
        take: parseInt(limit),
      }),
      prisma.vendors.count({
        where: { deleted_at: null },
      }),
    ]);

    const vendorsWithCounts = vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name_vendor,
      address: vendor.address,
      telephone: vendor.telephone,
      email: vendor.email,
      contact_person: vendor.contact_person,
      created_at: vendor.created_at,
      updated_at: vendor.updated_at,
      trucks: vendor.trucks,
      drivers: vendor.drivers,
      truckCount: vendor.trucks.length,
      driverCount: vendor.drivers.length,
    }));

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        vendors: vendorsWithCounts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
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
          where: { deleted_at: null },
          select: {
            id: true,
            name: true,
            plate: true,
            model: true,
            status: true,
            created_at: true,
          },
        },
        drivers: {
          where: {
            status: 'aktif',
            deleted_at: null,
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
      name: vendor.name_vendor,
      address: vendor.address,
      telephone: vendor.telephone,
      email: vendor.email,
      contact_person: vendor.contact_person,
      created_at: vendor.created_at,
      updated_at: vendor.updated_at,
      trucks: vendor.trucks,
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
            vendor_id: parseInt(vendorId),
            deleted_at: null,
          },
          include: {
            vendors: {
              select: {
                name_vendor: true,
              },
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
            vendor_id: parseInt(vendorId),
            deleted_at: null,
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      const trucksData = trucks.map((truck) => ({
        id: truck.id,
        name: truck.name,
        plate: truck.plate,
        model: truck.model,
        type: truck.type,
        status: truck.status,
        created_at: truck.created_at,
        vendor_name: truck.vendors?.name_vendor,
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
    const { name, address, telephone, email, contact_person } = req.body;

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
        name_vendor: name,
        deleted_at: null,
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
        name_vendor: name,
        address: address || null,
        telephone: telephone || null,
        email: email || null,
        contact_person: contact_person || null,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: vendor.id,
        name: vendor.name_vendor,
        address: vendor.address,
        telephone: vendor.telephone,
        email: vendor.email,
        contact_person: vendor.contact_person,
        created_at: vendor.created_at,
      },
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
    const { name, address, telephone, email, contact_person } = req.body;

    // Check if vendor exists
    const existingVendor = await prisma.vendors.findUnique({
      where: {
        id: parseInt(vendorId),
        deleted_at: null,
      },
    });

    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Check if name is being changed and if new name already exists
    if (name && name !== existingVendor.name_vendor) {
      const duplicateVendor = await prisma.vendors.findFirst({
        where: {
          name_vendor: name,
          id: { not: parseInt(vendorId) },
          deleted_at: null,
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
    if (name !== undefined && name !== null) updateData.name_vendor = name;
    if (address !== undefined) updateData.address = address;
    if (telephone !== undefined) updateData.telephone = telephone;
    if (email !== undefined) updateData.email = email;
    if (contact_person !== undefined) updateData.contact_person = contact_person;
    updateData.updated_at = new Date();

    const vendor = await prisma.vendors.update({
      where: { id: parseInt(vendorId) },
      data: updateData,
      include: {
        trucks: {
          where: { deleted_at: null },
          select: {
            id: true,
            name: true,
            plate: true,
            model: true,
            status: true,
          },
        },
        drivers: {
          where: { deleted_at: null },
          select: {
            id: true,
            name: true,
            telephone: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        id: vendor.id,
        name: vendor.name_vendor,
        address: vendor.address,
        telephone: vendor.telephone,
        email: vendor.email,
        contact_person: vendor.contact_person,
        trucks: vendor.trucks,
        drivers: vendor.drivers,
        truck_count: vendor.trucks.length,
        driver_count: vendor.drivers.length,
        updated_at: vendor.updated_at,
      },
      message: 'Vendor updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating vendor:', error);
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

// DELETE /api/vendors/:vendorId - Soft delete vendor (with validation)
router.delete('/:vendorId', authMiddleware, validateIntParam('vendorId'), async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Check if vendor exists
    const vendor = await prisma.vendors.findUnique({
      where: {
        id: parseInt(vendorId),
        deleted_at: null,
      },
      include: {
        trucks: {
          where: { deleted_at: null },
        },
        drivers: {
          where: { deleted_at: null },
        },
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Check if vendor has active trucks or drivers
    if (vendor.trucks.length > 0 || vendor.drivers.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          'Cannot delete vendor with active trucks or drivers. Please reassign or remove them first.',
        data: {
          truck_count: vendor.trucks.length,
          driver_count: vendor.drivers.length,
        },
      });
    }

    // Soft delete
    await prisma.vendors.update({
      where: { id: parseInt(vendorId) },
      data: { deleted_at: new Date() },
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
