const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// GET /api/vendors - Get all vendors/fleet groups
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        description,
        created_at,
        created_at as updated_at,
        (SELECT COUNT(*) FROM truck WHERE fleet_group_id = fleet_group.id) as truck_count
      FROM fleet_group 
      ORDER BY name ASC
    `;
    
    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      data: result.rows,
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
    
    const vendorQuery = `
      SELECT 
        id,
        name,
        description,
        created_at,
        created_at as updated_at
      FROM fleet_group 
      WHERE id = $1
    `;
    
    const vendorResult = await pool.query(vendorQuery, [vendorId]);
    
    if (vendorResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    // Get trucks for this vendor
    const trucksQuery = `
      SELECT 
        t.id,
        t.name,
        t.code,
        t.model,
        (
          SELECT tse.status
          FROM truck_status_event tse
          WHERE tse.truck_id = t.id
          ORDER BY tse.changed_at DESC
          LIMIT 1
        ) as status,
        t.created_at
      FROM truck t
      WHERE t.fleet_group_id = $1
      ORDER BY t.name ASC
    `;
    
    const trucksResult = await pool.query(trucksQuery, [vendorId]);
    
    const vendor = vendorResult.rows[0];
    vendor.trucks = trucksResult.rows;
    vendor.truck_count = trucksResult.rows.length;
    
    res.status(200).json({
      success: true,
      data: vendor,
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
    
    const offset = (page - 1) * limit;
    
    const trucksQuery = `
      SELECT 
        t.id,
        t.name,
        t.code,
        t.model,
        (
          SELECT tse.status
          FROM truck_status_event tse
          WHERE tse.truck_id = t.id
          ORDER BY tse.changed_at DESC
          LIMIT 1
        ) as status,
        t.created_at,
        fg.name as vendor_name
      FROM truck t
      JOIN fleet_group fg ON t.fleet_group_id = fg.id
      WHERE t.fleet_group_id = $1
      ORDER BY t.name ASC
      LIMIT $2 OFFSET $3
    `;
    
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM truck 
      WHERE fleet_group_id = $1
    `;
    
    const [trucksResult, countResult] = await Promise.all([
      pool.query(trucksQuery, [vendorId, limit, offset]),
      pool.query(countQuery, [vendorId])
    ]);
    
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);
    
    res.status(200).json({
      success: true,
      data: {
        trucks: trucksResult.rows,
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
