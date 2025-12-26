const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
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
      // Log semua request origin untuk debugging
      console.log('[CORS] Request from origin:', origin);
      
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow ngrok domains (*.ngrok-free.app, *.ngrok.io, *.ngrok.app)
      if (origin && (origin.includes('.ngrok-free.app') || origin.includes('.ngrok.io') || origin.includes('.ngrok.app'))) {
        console.log('[CORS] ✅ Ngrok origin allowed:', origin);
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log('[CORS] ✅ Whitelisted origin allowed:', origin);
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV === 'development') {
          console.log('[CORS] ✅ Development mode - allowing origin:', origin);
          callback(null, true);
        } else {
          console.log('[CORS] ❌ Origin blocked:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging middleware
app.use(requestLogger);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const { prisma } = require('./config/prisma');
    
    // Check database connection
    let dbStatus = 'unknown';
    let dbLatency = 0;
    try {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      dbLatency = Date.now() - start;
      dbStatus = 'healthy';
    } catch (error) {
      dbStatus = 'unhealthy';
    }

    const health = {
      status: dbStatus === 'healthy' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '2.0.0',
      checks: {
        database: {
          status: dbStatus,
          latency_ms: dbLatency,
        },
        memory: {
          used_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total_mb: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          status: process.memoryUsage().heapUsed / process.memoryUsage().heapTotal < 0.9 ? 'healthy' : 'warning',
        },
      },
    };

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : 'Health check failed',
    });
  }
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
