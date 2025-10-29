const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const prismaService = require('../services/simplePrismaService');
const { logAdminActivity, logAdminOperation, logSecurityEvent } = require('../utils/adminLogger');
const { broadcastAdminActivity } = require('../services/websocketService');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fleet-management-secret-key-change-in-production';

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    // Find user by email (username field now contains email)
    let user;
    try {
      user = await prismaService.prisma.user_admin.findFirst({
        where: {
          email: username, // username field contains email
          status: 'active',
          deleted_at: null,
        },
      });
    } catch (error) {
      console.log('user_admin table error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Database error',
      });
    }

    if (!user) {
      // Log failed login attempt
      logSecurityEvent('FAILED_LOGIN_ATTEMPT', {
        username,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        reason: 'User not found',
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password (password field is already hashed in database)
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Log failed login attempt - wrong password
      logSecurityEvent('FAILED_LOGIN_ATTEMPT', {
        username: user.username,
        userId: user.id,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        reason: 'Invalid password',
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    try {
      await prismaService.prisma.user_admin.update({
        where: { id: user.id },
        data: {
          last_login: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.log('Failed to update last login:', error.message);
    }

    // Log successful admin login
    logAdminOperation('USER_LOGIN', user.id, {
      name: user.name,
      email: user.email,
      role: user.role,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      loginTime: new Date().toISOString(),
      sessionDuration: '24h',
    });

    // Log admin activity for real-time monitoring
    const adminActivityData = {
      adminId: user.id,
      adminName: user.name,
      adminEmail: user.email,
      adminRole: user.role,
      clientIp: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      loginMethod: 'web_frontend',
      tokenExpiry: '24h',
    };

    logAdminActivity('ADMIN_LOGIN_SUCCESS', adminActivityData);

    // Broadcast admin login activity via WebSocket for real-time monitoring
    broadcastAdminActivity({
      type: 'admin_login',
      action: 'ADMIN_LOGIN_SUCCESS',
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      details: {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        loginTime: new Date().toISOString(),
        method: 'web_frontend',
      },
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    req.user = user;
    next();
  });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await prismaService.prisma.user_admin.findFirst({
      where: {
        id: req.user.userId,
        status: 'active',
        deleted_at: null,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.last_login,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  login,
  verifyToken,
  getCurrentUser,
};
