/**
 * User Management Routes
 * Handles all user-related endpoints with role-based access control
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { requireAdmin, canModifyUser, canCreateRole } = require('../middleware/roleCheck');
const upload = require('../middleware/avatarUpload');

// ==========================================
// PROFILE MANAGEMENT (Authenticated Users)
// ==========================================

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private (All authenticated users)
 */
router.get('/me', authMiddleware, userController.getMyProfile);

/**
 * @route   PUT /api/users/me
 * @desc    Update current user profile
 * @access  Private (All authenticated users)
 */
router.put('/me', authMiddleware, userController.updateMyProfile);

/**
 * @route   PATCH /api/users/me/password
 * @desc    Change current user password
 * @access  Private (All authenticated users)
 */
router.patch('/me/password', authMiddleware, userController.changeMyPassword);

/**
 * @route   POST /api/users/me/avatar
 * @desc    Upload user avatar
 * @access  Private (All authenticated users)
 */
router.post('/me/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);

/**
 * @route   DELETE /api/users/me/avatar
 * @desc    Delete user avatar
 * @access  Private (All authenticated users)
 */
router.delete('/me/avatar', authMiddleware, userController.deleteAvatar);

/**
 * @route   PATCH /api/users/me/two-factor
 * @desc    Toggle two-factor authentication
 * @access  Private (All authenticated users)
 */
router.patch('/me/two-factor', authMiddleware, userController.toggleTwoFactor);

// ==========================================
// USER MANAGEMENT (Admin/Superadmin Only)
// ==========================================

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination and filters
 * @access  Private (Admin/Superadmin only)
 * @query   page, limit, search, role, status
 */
router.get('/', authMiddleware, requireAdmin(), userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin/Superadmin only)
 */
router.get('/:id', authMiddleware, requireAdmin(), userController.getUserById);

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Private (Admin/Superadmin only)
 * @body    firstName, lastName (or name), email, password, role, phone, department, bio, status
 * @rules   Superadmin can create any role
 *          Admin can only create operator and viewer
 */
router.post('/', authMiddleware, requireAdmin(), canCreateRole(), userController.createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (Admin/Superadmin only)
 * @rules   Superadmin can modify anyone
 *          Admin can only modify operator and viewer
 */
router.put('/:id', authMiddleware, requireAdmin(), canModifyUser(false), userController.updateUser);

/**
 * @route   PATCH /api/users/:id/status
 * @desc    Update user status (active/inactive/suspended)
 * @access  Private (Admin/Superadmin only)
 * @rules   Cannot modify own status
 */
router.patch('/:id/status', authMiddleware, requireAdmin(), userController.updateUserStatus);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (soft delete)
 * @access  Private (Admin/Superadmin only)
 * @rules   Cannot delete own account
 *          Superadmin can delete anyone
 *          Admin can only delete operator and viewer
 */
router.delete(
  '/:id',
  authMiddleware,
  requireAdmin(),
  canModifyUser(false),
  userController.deleteUser
);

module.exports = router;
