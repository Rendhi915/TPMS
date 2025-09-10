const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../prisma/generated/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/vendors - Get all vendors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const vendors = await prisma.vendors.findMany({
      include: {
        trucks: {
          select: {
            id: true,
            name: true,
            code: true,
            model: true
          }
        },
        drivers: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      },
      orderBy: {
        nama_vendor: 'asc'
      }
    });
    
    const vendorsWithCounts = vendors.map(vendor => ({
      id: vendor.id,
      name: vendor.nama_vendor,
      address: vendor.address,
      phone: vendor.nomor_telepon,
      email: vendor.email,
      contact_person: vendor.kontak_person,
      created_at: vendor.created_at,
      updated_at: vendor.updated_at,
      truck_count: vendor.trucks.length,
      driver_count: vendor.drivers.length,
      trucks: vendor.trucks,
      drivers: vendor.drivers
    }));
    
    res.status(200).json({
      success: true,
      data: vendorsWithCounts,
      message: 'Vendors retrieved successfully'
    });

  } catch (error) {
    console.error('Error getting vendors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vendors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/vendors/:vendorId - Get specific vendor details
router.get('/:vendorId', authMiddleware, async (req, res) => {
  try {
    const { vendorId } = req.params;
    
    const vendor = await prisma.vendors.findUnique({
      where: {
        id: parseInt(vendorId)
      },
      include: {
        trucks: {
          include: {
            truck_status_event: {
              orderBy: {
                changed_at: 'desc'
              },
              take: 1
            }
          }
        },
        drivers: {
          where: {
            status: 'aktif'
          }
        }
      }
    });
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
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
      trucks: vendor.trucks.map(truck => ({
        id: truck.id,
        name: truck.name,
        code: truck.code,
        model: truck.model,
        status: truck.truck_status_event[0]?.status || 'active',
        created_at: truck.created_at
      })),
      drivers: vendor.drivers,
      truck_count: vendor.trucks.length,
      driver_count: vendor.drivers.length
    };
    
    res.status(200).json({
      success: true,
      data: vendorData,
      message: 'Vendor details retrieved successfully'
    });

  } catch (error) {
    console.error('Error getting vendor details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vendor details',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/vendors/:vendorId/trucks - Get trucks for specific vendor
router.get('/:vendorId/trucks', authMiddleware, async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const [trucks, total] = await Promise.all([
      prisma.truck.findMany({
        where: {
          vendor_id: parseInt(vendorId)
        },
        include: {
          vendor: {
            select: {
              nama_vendor: true
            }
          },
          truck_status_event: {
            orderBy: {
              changed_at: 'desc'
            },
            take: 1
          }
        },
        orderBy: {
          name: 'asc'
        },
        skip: skip,
        take: parseInt(limit)
      }),
      prisma.truck.count({
        where: {
          vendor_id: parseInt(vendorId)
        }
      })
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    const trucksData = trucks.map(truck => ({
      id: truck.id,
      name: truck.name,
      code: truck.code,
      model: truck.model,
      status: truck.truck_status_event[0]?.status || 'active',
      created_at: truck.created_at,
      vendor_name: truck.vendor?.nama_vendor
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
          hasPrev: page > 1
        }
      },
      message: 'Vendor trucks retrieved successfully'
    });

  } catch (error) {
    console.error('Error getting vendor trucks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vendor trucks',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
