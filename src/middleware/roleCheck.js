/**
 * Role-Based Access Control Middleware
 * Provides role checking utilities for user management endpoints
 */

/**
 * Middleware to require specific role(s)
 * @param {string|string[]} allowedRoles - Single role or array of allowed roles
 * @returns {Function} Express middleware
 */
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      // Normalize allowedRoles to array
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Check if user's role is in allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions. Required role(s): ' + roles.join(', '),
          userRole: req.user.role,
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error checking user permissions',
      });
    }
  };
};

/**
 * Middleware to require any of the specified roles
 * Alias for requireRole (same functionality)
 * @param {string[]} roles - Array of allowed roles
 * @returns {Function} Express middleware
 */
const requireAnyRole = (roles) => {
  return requireRole(roles);
};

/**
 * Middleware to require superadmin role
 * @returns {Function} Express middleware
 */
const requireSuperAdmin = () => {
  return requireRole('superadmin');
};

/**
 * Middleware to require admin or superadmin role
 * @returns {Function} Express middleware
 */
const requireAdmin = () => {
  return requireRole(['admin', 'superadmin']);
};

/**
 * Middleware to check if user can modify target user
 * Rules:
 * - Superadmin can modify anyone
 * - Admin can modify operator and viewer
 * - Users can only modify themselves (for profile updates)
 *
 * @param {boolean} allowSelf - Allow users to modify their own data
 * @returns {Function} Express middleware
 */
const canModifyUser = (allowSelf = false) => {
  return async (req, res, next) => {
    try {
      const currentUser = req.user;
      const targetUserId = parseInt(req.params.id);

      // Check if user is authenticated
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      // Allow if modifying self (for profile updates)
      if (allowSelf && currentUser.id === targetUserId) {
        return next();
      }

      // Superadmin can modify anyone
      if (currentUser.role === 'superadmin') {
        return next();
      }

      // Admin can modify operator and viewer
      if (currentUser.role === 'admin') {
        // Get target user to check their role
        const { PrismaClient } = require('../../prisma/generated/client');
        const prisma = new PrismaClient();

        const targetUser = await prisma.user_admin.findUnique({
          where: { id: targetUserId },
          select: { role: true, status: true },
        });

        await prisma.$disconnect();

        if (!targetUser) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }

        // Admin cannot modify superadmin or other admins
        if (['superadmin', 'admin'].includes(targetUser.role)) {
          return res.status(403).json({
            success: false,
            message: 'Admins cannot modify superadmin or other admin accounts',
          });
        }

        return next();
      }

      // Other roles cannot modify anyone
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to modify users',
      });
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error checking user permissions',
      });
    }
  };
};

/**
 * Check if user can create accounts with specific role
 * Rules:
 * - Superadmin can create any role
 * - Admin can create operator and viewer only
 * - Others cannot create accounts
 */
const canCreateRole = () => {
  return (req, res, next) => {
    try {
      const currentUser = req.user;
      const targetRole = req.body.role;

      // Check if user is authenticated
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      // Superadmin can create any role
      if (currentUser.role === 'superadmin') {
        return next();
      }

      // Admin can create operator and viewer only
      if (currentUser.role === 'admin') {
        if (!['operator', 'viewer'].includes(targetRole)) {
          return res.status(403).json({
            success: false,
            message: 'Admins can only create operator or viewer accounts',
          });
        }
        return next();
      }

      // Other roles cannot create accounts
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to create user accounts',
      });
    } catch (error) {
      console.error('Role creation check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error checking role permissions',
      });
    }
  };
};

module.exports = {
  requireRole,
  requireAnyRole,
  requireSuperAdmin,
  requireAdmin,
  canModifyUser,
  canCreateRole,
};
