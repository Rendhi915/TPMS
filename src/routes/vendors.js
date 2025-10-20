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
        nama_vendor: 'asc',
      },
    });

    // Return both naming conventions for frontend compatibility
    const vendorsWithCounts = vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.nama_vendor, // frontend uses 'name'
      nama_vendor: vendor.nama_vendor, // database field
      address: vendor.address,
      phone: vendor.nomor_telepon, // frontend uses 'phone'
      nomor_telepon: vendor.nomor_telepon, // database field
      email: vendor.email,
      contact_person: vendor.kontak_person, // frontend uses 'contact_person'
      kontak_person: vendor.kontak_person, // database field
      created_at: vendor.created_at,
      updated_at: vendor.updated_at,
      truck_count: vendor.trucks.length,
      driver_count: vendor.drivers.length,
      trucks: vendor.trucks,
      drivers: vendor.drivers,
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
      name: vendor.nama_vendor,
      address: vendor.address,
      phone: vendor.nomor_telepon,
      email: vendor.email,
      contact_person: vendor.kontak_person,
      created_at: vendor.created_at,
      updated_at: vendor.updated_at,
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
            vendor_id: parseInt(vendorId),
          },
          include: {
            vendor: {
              select: {
                nama_vendor: true,
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
            vendor_id: parseInt(vendorId),
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
        vendor_name: truck.vendor?.nama_vendor,
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
    // Support both 'nama_vendor' and 'name' from frontend
    const nama_vendor = req.body.nama_vendor || req.body.name;
    const address = req.body.address;
    const nomor_telepon = req.body.nomor_telepon || req.body.phone;
    const email = req.body.email;
    const kontak_person = req.body.kontak_person || req.body.contact_person;

    console.log('📝 Creating vendor with data:', {
      nama_vendor,
      address,
      nomor_telepon,
      email,
      kontak_person,
    });

    // Validate required fields
    if (!nama_vendor) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: name or nama_vendor',
      });
    }

    // Check if vendor with same name already exists
    const existingVendor = await prisma.vendors.findFirst({
      where: {
        nama_vendor: nama_vendor,
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
        nama_vendor,
        address: address || null,
        nomor_telepon: nomor_telepon || null,
        email: email || null,
        kontak_person: kontak_person || null,
      },
    });

    console.log('✅ Vendor created successfully:', vendor.id);

    res.status(201).json({
      success: true,
      data: {
        id: vendor.id,
        name: vendor.nama_vendor,
        address: vendor.address,
        phone: vendor.nomor_telepon,
        email: vendor.email,
        contact_person: vendor.kontak_person,
        created_at: vendor.created_at,
        updated_at: vendor.updated_at,
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

    // Support both frontend field names and database field names
    const nama_vendor = req.body.nama_vendor || req.body.name;
    const address = req.body.address;
    const nomor_telepon = req.body.nomor_telepon || req.body.phone;
    const email = req.body.email;
    const kontak_person = req.body.kontak_person || req.body.contact_person;

    console.log('📝 Updating vendor ID:', vendorId);
    console.log('📝 Update data received:', {
      nama_vendor,
      address,
      nomor_telepon,
      email,
      kontak_person,
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

    // Check if nama_vendor is being changed and if new name already exists
    if (nama_vendor && nama_vendor !== existingVendor.nama_vendor) {
      const duplicateVendor = await prisma.vendors.findFirst({
        where: {
          nama_vendor: nama_vendor,
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
    if (nama_vendor !== undefined && nama_vendor !== null) updateData.nama_vendor = nama_vendor;
    if (address !== undefined) updateData.address = address;
    if (nomor_telepon !== undefined) updateData.nomor_telepon = nomor_telepon;
    if (email !== undefined) updateData.email = email;
    if (kontak_person !== undefined) updateData.kontak_person = kontak_person;
    updateData.updated_at = new Date();

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
            status: true,
          },
        },
      },
    });

    console.log('✅ Vendor updated successfully:', vendor.id);

    // Return response with both naming conventions for frontend compatibility
    res.status(200).json({
      success: true,
      data: {
        id: vendor.id,
        name: vendor.nama_vendor,
        nama_vendor: vendor.nama_vendor,
        address: vendor.address,
        phone: vendor.nomor_telepon,
        nomor_telepon: vendor.nomor_telepon,
        email: vendor.email,
        contact_person: vendor.kontak_person,
        kontak_person: vendor.kontak_person,
        created_at: vendor.created_at,
        updated_at: vendor.updated_at,
        trucks: vendor.trucks,
        drivers: vendor.drivers,
        truck_count: vendor.trucks.length,
        driver_count: vendor.drivers.length,
      },
      message: 'Vendor updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating vendor:', error);
    console.error('Error details:', error.stack);
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
