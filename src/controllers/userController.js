/**
 * User Management Controller
 * Handles CRUD operations for user_admin table
 */

const { PrismaClient } = require('../../prisma/generated/client');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs').promises;

const prisma = new PrismaClient();

/**
 * Get current user profile
 * GET /api/users/me
 */
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user_admin.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        department: true,
        bio: true,
        avatar: true,
        two_factor_enabled: true,
        last_login: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Split name into firstName and lastName for frontend
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    res.json({
      success: true,
      data: {
        ...user,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile',
      error: error.message,
    });
  }
};

/**
 * Update current user profile
 * PUT /api/users/me
 */
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, name, phone, department, bio } = req.body;

    // Combine firstName and lastName if provided, otherwise use name
    let fullName = name;
    if (firstName || lastName) {
      fullName = `${firstName || ''} ${lastName || ''}`.trim();
    }

    const updateData = {};
    if (fullName) updateData.name = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (department !== undefined) updateData.department = department;
    if (bio !== undefined) updateData.bio = bio;
    updateData.updated_at = new Date();

    const updatedUser = await prisma.user_admin.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        department: true,
        bio: true,
        avatar: true,
        two_factor_enabled: true,
        last_login: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Split name for frontend
    const nameParts = updatedUser.name.split(' ');
    const firstNameResult = nameParts[0] || '';
    const lastNameResult = nameParts.slice(1).join(' ') || '';

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        ...updatedUser,
        firstName: firstNameResult,
        lastName: lastNameResult,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

/**
 * Change current user password
 * PATCH /api/users/me/password
 */
const changeMyPassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    // Get user with password
    const user = await prisma.user_admin.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user_admin.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message,
    });
  }
};

/**
 * Upload user avatar
 * POST /api/users/me/avatar
 */
const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // Generate avatar URL path
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    // Get old avatar to delete it
    const user = await prisma.user_admin.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    // Update user avatar
    const updatedUser = await prisma.user_admin.update({
      where: { id: userId },
      data: {
        avatar: avatarPath,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    // Delete old avatar file if exists
    if (user.avatar) {
      try {
        const oldAvatarPath = path.join(__dirname, '../..', user.avatar);
        await fs.unlink(oldAvatarPath);
      } catch (err) {
        console.error('Failed to delete old avatar:', err.message);
        // Continue even if deletion fails
      }
    }

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: avatarPath,
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error.message,
    });
  }
};

/**
 * Delete user avatar
 * DELETE /api/users/me/avatar
 */
const deleteAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get current avatar
    const user = await prisma.user_admin.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    if (!user.avatar) {
      return res.status(404).json({
        success: false,
        message: 'No avatar to delete',
      });
    }

    // Update user to remove avatar
    await prisma.user_admin.update({
      where: { id: userId },
      data: {
        avatar: null,
        updated_at: new Date(),
      },
    });

    // Delete avatar file
    try {
      const avatarPath = path.join(__dirname, '../..', user.avatar);
      await fs.unlink(avatarPath);
    } catch (err) {
      console.error('Failed to delete avatar file:', err.message);
      // Continue even if deletion fails
    }

    res.json({
      success: true,
      message: 'Avatar deleted successfully',
    });
  } catch (error) {
    console.error('Delete avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete avatar',
      error: error.message,
    });
  }
};

/**
 * Toggle two-factor authentication
 * PATCH /api/users/me/two-factor
 */
const toggleTwoFactor = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { enabled } = req.body;

    if (typeof enabled !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'enabled field must be a boolean',
      });
    }

    const updatedUser = await prisma.user_admin.update({
      where: { id: userId },
      data: {
        two_factor_enabled: enabled,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        two_factor_enabled: true,
      },
    });

    res.json({
      success: true,
      message: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'} successfully`,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Toggle 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle two-factor authentication',
      error: error.message,
    });
  }
};

/**
 * Get all users (Admin/Superadmin only)
 * GET /api/users
 */
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {
      deleted_at: null,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user_admin.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          department: true,
          avatar: true,
          two_factor_enabled: true,
          last_login: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
      }),
      prisma.user_admin.count({ where }),
    ]);

    // Add firstName/lastName to each user
    const usersWithNames = users.map((user) => {
      const nameParts = user.name.split(' ');
      return {
        ...user,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
      };
    });

    res.json({
      success: true,
      data: usersWithNames,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};

/**
 * Get user by ID (Admin/Superadmin only)
 * GET /api/users/:id
 */
const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await prisma.user_admin.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        department: true,
        bio: true,
        avatar: true,
        two_factor_enabled: true,
        last_login: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user || user.deleted_at) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Split name
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    res.json({
      success: true,
      data: {
        ...user,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
};

/**
 * Create new user (Admin/Superadmin only)
 * POST /api/users
 */
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, name, email, password, role, phone, department, bio, status } =
      req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and role are required',
      });
    }

    // Combine firstName and lastName if provided
    let fullName = name;
    if (firstName || lastName) {
      fullName = `${firstName || ''} ${lastName || ''}`.trim();
    }

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Validate role
    const validRoles = ['superadmin', 'admin', 'operator', 'viewer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user_admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user_admin.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        role,
        phone: phone || null,
        department: department || null,
        bio: bio || null,
        status: status || 'active',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        department: true,
        bio: true,
        avatar: true,
        two_factor_enabled: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Split name for response
    const nameParts = newUser.name.split(' ');
    const firstNameResult = nameParts[0] || '';
    const lastNameResult = nameParts.slice(1).join(' ') || '';

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        ...newUser,
        firstName: firstNameResult,
        lastName: lastNameResult,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message,
    });
  }
};

/**
 * Update user (Admin/Superadmin only)
 * PUT /api/users/:id
 */
const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { firstName, lastName, name, email, role, phone, department, bio, status } = req.body;

    // Check if user exists
    const existingUser = await prisma.user_admin.findUnique({
      where: { id: userId },
    });

    if (!existingUser || existingUser.deleted_at) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Combine firstName and lastName if provided
    let fullName = name;
    if (firstName !== undefined || lastName !== undefined) {
      fullName = `${firstName || ''} ${lastName || ''}`.trim();
    }

    // Build update data
    const updateData = { updated_at: new Date() };
    if (fullName) updateData.name = fullName;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (phone !== undefined) updateData.phone = phone;
    if (department !== undefined) updateData.department = department;
    if (bio !== undefined) updateData.bio = bio;
    if (status !== undefined) updateData.status = status;

    // Update user
    const updatedUser = await prisma.user_admin.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        department: true,
        bio: true,
        avatar: true,
        two_factor_enabled: true,
        last_login: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Split name for response
    const nameParts = updatedUser.name.split(' ');
    const firstNameResult = nameParts[0] || '';
    const lastNameResult = nameParts.slice(1).join(' ') || '';

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        ...updatedUser,
        firstName: firstNameResult,
        lastName: lastNameResult,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

/**
 * Update user status (Admin/Superadmin only)
 * PATCH /api/users/:id/status
 */
const updateUserStatus = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Check if user exists
    const existingUser = await prisma.user_admin.findUnique({
      where: { id: userId },
    });

    if (!existingUser || existingUser.deleted_at) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent modifying own status
    if (req.user.userId === userId) {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify your own status',
      });
    }

    // Update status
    const updatedUser = await prisma.user_admin.update({
      where: { id: userId },
      data: {
        status,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    res.json({
      success: true,
      message: `User status updated to ${status}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: error.message,
    });
  }
};

/**
 * Delete user (soft delete) (Admin/Superadmin only)
 * DELETE /api/users/:id
 */
const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const existingUser = await prisma.user_admin.findUnique({
      where: { id: userId },
    });

    if (!existingUser || existingUser.deleted_at) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent deleting own account
    if (req.user.userId === userId) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete your own account',
      });
    }

    // Soft delete user
    await prisma.user_admin.update({
      where: { id: userId },
      data: {
        deleted_at: new Date(),
        status: 'inactive',
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};

module.exports = {
  // Profile management
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  uploadAvatar,
  deleteAvatar,
  toggleTwoFactor,

  // User management (Admin)
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
};
