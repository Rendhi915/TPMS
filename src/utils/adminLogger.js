const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure log directory exists
const logDir = path.join(__dirname, '../../log');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create admin activity logger
const adminLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length
        ? JSON.stringify(
            meta,
            (key, value) => {
              return typeof value === 'bigint' ? value.toString() : value;
            },
            2
          )
        : '';
      return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}`;
    })
  ),
  defaultMeta: { service: 'fleet-management-admin' },
  transports: [
    // Admin activity log file
    new winston.transports.File({
      filename: path.join(logDir, 'admin-activity.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      tailable: true,
    }),
    // Error log file
    new winston.transports.File({
      filename: path.join(logDir, 'admin-errors.log'),
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 3,
      tailable: true,
    }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  adminLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? JSON.stringify(
                meta,
                (key, value) => {
                  return typeof value === 'bigint' ? value.toString() : value;
                },
                2
              )
            : '';
          return `🔐 [ADMIN] [${timestamp}] ${level}: ${message} ${metaStr}`;
        })
      ),
    })
  );
}

// Admin activity logging functions
const logAdminActivity = (action, details = {}) => {
  adminLogger.info(`Admin Activity: ${action}`, {
    action,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    ...details,
  });
};

const logServerStartup = (serverInfo) => {
  adminLogger.info('Fleet Management Server Started', {
    action: 'SERVER_STARTUP',
    port: serverInfo.port,
    environment: serverInfo.environment,
    websocketUrl: serverInfo.websocketUrl,
    databaseStatus: serverInfo.databaseStatus,
    startupTime: serverInfo.startupTime,
    processId: process.pid,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
};

const logServerShutdown = (reason) => {
  adminLogger.info('Fleet Management Server Shutdown', {
    action: 'SERVER_SHUTDOWN',
    reason,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    processId: process.pid,
  });
};

const logDatabaseConnection = (status, details = {}) => {
  adminLogger.info(`Database Connection: ${status}`, {
    action: 'DATABASE_CONNECTION',
    status,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

const logWebSocketConnection = (clientInfo) => {
  adminLogger.info('WebSocket Client Connected', {
    action: 'WEBSOCKET_CLIENT_CONNECT',
    clientId: clientInfo.clientId,
    clientIp: clientInfo.ip,
    userAgent: clientInfo.userAgent || 'Unknown',
    timestamp: new Date().toISOString(),
  });
};

const logWebSocketDisconnection = (clientInfo) => {
  adminLogger.info('WebSocket Client Disconnected', {
    action: 'WEBSOCKET_CLIENT_DISCONNECT',
    clientId: clientInfo.clientId,
    connectionDuration: clientInfo.connectionDuration,
    reason: clientInfo.reason || 'Unknown',
    timestamp: new Date().toISOString(),
  });
};

const logAdminOperation = (operation, userId, details = {}) => {
  adminLogger.info(`Admin Operation: ${operation}`, {
    action: 'ADMIN_OPERATION',
    operation,
    userId,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

const logSystemHealth = (healthData) => {
  adminLogger.info('System Health Check', {
    action: 'SYSTEM_HEALTH_CHECK',
    ...healthData,
    timestamp: new Date().toISOString(),
  });
};

const logError = (error, context = {}) => {
  adminLogger.error('System Error', {
    action: 'SYSTEM_ERROR',
    error: error.message,
    stack: error.stack,
    ...context,
    timestamp: new Date().toISOString(),
  });
};

const logSecurityEvent = (event, details = {}) => {
  adminLogger.warn(`Security Event: ${event}`, {
    action: 'SECURITY_EVENT',
    event,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

// Performance monitoring
const logPerformanceMetric = (metric, value, unit = 'ms') => {
  adminLogger.info(`Performance Metric: ${metric}`, {
    action: 'PERFORMANCE_METRIC',
    metric,
    value,
    unit,
    timestamp: new Date().toISOString(),
  });
};

// Daily summary logging
const logDailySummary = (summaryData) => {
  adminLogger.info('Daily Activity Summary', {
    action: 'DAILY_SUMMARY',
    date: new Date().toISOString().split('T')[0],
    ...summaryData,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  adminLogger,
  logAdminActivity,
  logServerStartup,
  logServerShutdown,
  logDatabaseConnection,
  logWebSocketConnection,
  logWebSocketDisconnection,
  logAdminOperation,
  logSystemHealth,
  logError,
  logSecurityEvent,
  logPerformanceMetric,
  logDailySummary,
};
