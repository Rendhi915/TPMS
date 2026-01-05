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
  'http://127.0.0.1:5173',
  'http://192.168.43.40:5173', // Network IP
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Log semua request origin untuk debugging
      console.log('[CORS] Request from origin:', origin);

      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow ngrok domains (*.ngrok-free.app, *.ngrok.io, *.ngrok.app)
      if (
        origin &&
        (origin.includes('.ngrok-free.app') ||
          origin.includes('.ngrok.io') ||
          origin.includes('.ngrok.app'))
      ) {
        console.log('[CORS] ✅ Ngrok origin allowed:', origin);
        return callback(null, true);
      }

      // Allow any localhost/127.0.0.1 with any port in development
      if (
        origin &&
        (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))
      ) {
        console.log('[CORS] ✅ Localhost origin allowed:', origin);
        return callback(null, true);
      }

      // Allow any 192.168.x.x network in development
      if (origin && origin.match(/http:\/\/192\.168\.\d+\.\d+:\d+/)) {
        console.log('[CORS] ✅ Local network origin allowed:', origin);
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
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // 24 hours
  })
);

// Add additional CORS headers middleware for extra safety
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Cache-Control, Pragma, Expires'
    );
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images with CORS headers
app.use(
  '/uploads',
  (req, res, next) => {
    // Add CORS headers for images to prevent ERR_BLOCKED_BY_RESPONSE
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, '../uploads'))
);

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
          status:
            process.memoryUsage().heapUsed / process.memoryUsage().heapTotal < 0.9
              ? 'healthy'
              : 'warning',
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
