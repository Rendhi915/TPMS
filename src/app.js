const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration - Secure for production
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://connectis.my.id',
  'http://localhost:3000',
  'http://localhost:5173', // Vite default
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fleet Management Server is running',
    timestamp: new Date().toISOString(),
    server_ip: req.socket.localAddress,
    client_ip: req.ip,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fleet Management API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth/login',
      trucks: '/api/trucks',
      dashboard: '/api/dashboard/stats',
    },
    server_info: {
      server_ip: req.socket.localAddress,
      client_ip: req.ip,
      timestamp: new Date().toISOString(),
    },
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
