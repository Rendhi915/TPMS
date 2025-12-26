const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fleet-management-secret-key-change-in-production';
const TESTING_MODE = process.env.TESTING_MODE === 'true';

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header first
    const authHeader = req.headers.authorization;
    const hasToken = authHeader && authHeader.startsWith('Bearer ');
    
    // ==========================================
    // TESTING MODE BYPASS (only if no token provided)
    // ==========================================
    // Skip JWT authentication when TESTING_MODE=true AND no token is provided
    // If token IS provided, validate it normally
    // 🚨 SECURITY: Only allow in development environment
    if (TESTING_MODE && process.env.NODE_ENV !== 'production' && !hasToken) {
      console.log('⚠️  [TESTING MODE] JWT authentication bypassed - using default admin user');
      req.user = {
        userId: 1,
        username: 'admin',
        role: 'admin',
      };
      return next();
    }
    
    // Force disable TESTING_MODE in production
    if (TESTING_MODE && process.env.NODE_ENV === 'production') {
      console.error('🚨 SECURITY ALERT: TESTING_MODE is enabled in PRODUCTION! Disabling...');
      // Fall through to normal JWT validation
    }

    // Normal JWT validation
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No valid token provided.',
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token is missing.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication error occurred.',
    });
  }
};

// Optional middleware for role-based access
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      });
    }

    next();
  };
};

module.exports = authMiddleware;
module.exports.requireRole = requireRole;
