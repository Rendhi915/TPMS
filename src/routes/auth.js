const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/refresh (optional)
router.post('/refresh', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Token refresh not implemented yet',
  });
});

// POST /api/auth/logout (optional)
router.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

module.exports = router;
