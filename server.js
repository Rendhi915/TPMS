const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const crypto = require('crypto');
const express = require('express');
const app = require('./src/app');
require('dotenv').config();

// Import services
const prismaService = require('./src/services/simplePrismaService');
const websocketService = require('./src/services/websocketService');
const queueProcessingService = require('./src/services/queueProcessingService');
const {
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
} = require('./src/utils/adminLogger');

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
// Public base URL used for logs and client references
// In production, default to the deployed domain unless overridden
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://be-tpms.connectis.my.id';
// Derive WebSocket base URL from PUBLIC_BASE_URL with correct scheme
const WS_BASE_URL = `${PUBLIC_BASE_URL.startsWith('https') ? 'wss' : 'ws'}://${PUBLIC_BASE_URL.replace(/^https?:\/\//, '')}`;

// ==========================================
// WEBSOCKET MESSAGE HANDLERS
// ==========================================

class WebSocketServer {
  constructor() {
    this.clients = new Map();
    this.subscriptions = {
      truckUpdates: new Set(),
      alerts: new Set(),
      dashboard: new Set(),
    };
    this.isReady = false;
    this.server = null;
    this.wss = null;
  }

  // Generate unique client ID
  generateClientId() {
    return crypto.randomUUID();
  }

  // Initialize WebSocket server
  async initialize() {
    try {
      // Initialize database first
      await this.initializeDatabase();

      // Create HTTP server with Express app for REST API + WebSocket upgrade
      this.server = http.createServer(app);

      // Create WebSocket server
      this.wss = new WebSocket.Server({
        server: this.server,
        path: '/ws',
        perMessageDeflate: {
          zlibDeflateOptions: {
            level: 3,
          },
        },
      });

      this.setupWebSocketHandlers();
      this.startRealtimeBroadcast();

      // Initialize websocket service with this server instance
      websocketService.initialize(this);
      console.log('📡 WebSocket handlers configured');

      return this.server;
    } catch (error) {
      console.error('❌ WebSocket server initialization failed:', error);
      throw error;
    }
  }

  // Database initialization
  async initializeDatabase() {
    try {
      console.log('🔄 Initializing Prisma database connection...');
      logDatabaseConnection('CONNECTING', { action: 'database_init_start' });

      await prismaService.connect();

      const health = await prismaService.healthCheck();
      if (health.status === 'healthy') {
        console.log('✅ Database connection healthy');
        logDatabaseConnection('CONNECTED', {
          status: 'healthy',
          database_health: health,
        });
        this.isReady = true;
      } else {
        throw new Error(`Database health check failed: ${health.error}`);
      }

      const connectionInfo = await prismaService.getConnectionInfo();
      console.log(`📊 Database: ${connectionInfo.database_name}`);
      console.log(`🔌 Active connections: ${connectionInfo.active_connections}`);

      logDatabaseConnection('OPTIMIZING', {
        database_name: connectionInfo.database_name,
        active_connections: connectionInfo.active_connections,
      });

      await prismaService.optimizeDatabase();
      console.log('⚡ Database optimization completed');
      logDatabaseConnection('OPTIMIZED', { action: 'database_optimization_completed' });
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      logError(error, {
        context: 'database_initialization',
        environment: NODE_ENV,
      });
      this.isReady = false;

      if (NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  }

  // Setup WebSocket event handlers
  setupWebSocketHandlers() {
    this.wss.on('connection', (ws, request) => {
      const clientId = this.generateClientId();
      const clientInfo = {
        id: clientId,
        ws: ws,
        subscriptions: new Set(),
        connectedAt: new Date(),
        lastPing: new Date(),
        ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
      };

      this.clients.set(clientId, clientInfo);
      console.log(`📱 Client connected: ${clientId} from ${clientInfo.ip}`);

      // Add client to websocket service
      websocketService.addClient(clientId, clientInfo);

      // Log WebSocket connection
      logWebSocketConnection({
        clientId: clientId,
        ip: clientInfo.ip,
        userAgent: request.headers['user-agent'],
      });

      // Send connection acknowledgment
      this.sendMessage(ws, {
        type: 'connection_ack',
        data: {
          clientId: clientId,
          serverTime: new Date().toISOString(),
          availableSubscriptions: ['truck_updates', 'alerts', 'dashboard'],
        },
      });

      // Handle incoming messages
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          console.error(`❌ Invalid message from client ${clientId}:`, error);
          this.sendError(ws, 'INVALID_MESSAGE', 'Invalid JSON format');
        }
      });

      // Handle client disconnect
      ws.on('close', (code, reason) => {
        console.log(`📱 Client disconnected: ${clientId} (${code}: ${reason})`);

        // Log WebSocket disconnection
        const connectionDuration = Date.now() - clientInfo.connectedAt.getTime();
        logWebSocketDisconnection({
          clientId: clientId,
          connectionDuration: Math.round(connectionDuration / 1000), // in seconds
          reason: reason?.toString() || `Code: ${code}`,
        });

        // Remove client from websocket service
        websocketService.removeClient(clientId);
        this.handleDisconnect(clientId);
      });

      // Handle ping/pong for connection health
      ws.on('pong', () => {
        if (this.clients.has(clientId)) {
          this.clients.get(clientId).lastPing = new Date();
        }
      });

      // Handle connection errors
      ws.on('error', (error) => {
        console.error(`❌ WebSocket error for client ${clientId}:`, error);
        this.handleDisconnect(clientId);
      });
    });

    // Handle server errors
    this.wss.on('error', (error) => {
      console.error('❌ WebSocket server error:', error);
    });

    console.log('📡 WebSocket handlers configured');
  }

  // Handle incoming WebSocket messages
  async handleMessage(clientId, message) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { type, data, requestId } = message;

    try {
      switch (type) {
        case 'ping':
          this.sendMessage(client.ws, {
            type: 'pong',
            requestId,
            timestamp: new Date().toISOString(),
          });
          break;

        case 'subscribe':
          const channel = message.channel || data?.channel;
          if (!channel) {
            this.sendError(
              client.ws,
              'MISSING_CHANNEL',
              'Channel is required for subscription',
              requestId
            );
            break;
          }
          await this.handleSubscription(clientId, channel);
          websocketService.addSubscription(clientId, channel);
          this.sendMessage(client.ws, {
            type: 'subscription_ack',
            requestId,
            data: { channel: channel, status: 'subscribed' },
          });
          break;

        case 'unsubscribe':
          const unsubChannel = message.channel || data?.channel;
          if (!unsubChannel) {
            this.sendError(
              client.ws,
              'MISSING_CHANNEL',
              'Channel is required for unsubscription',
              requestId
            );
            break;
          }
          this.handleUnsubscription(clientId, unsubChannel);
          websocketService.removeSubscription(clientId, unsubChannel);
          this.sendMessage(client.ws, {
            type: 'subscription_ack',
            requestId,
            data: { channel: unsubChannel, status: 'unsubscribed' },
          });
          break;

        case 'get_trucks':
          const trucks = await this.getTrucks(data?.filters);
          this.sendMessage(client.ws, {
            type: 'trucks_data',
            requestId,
            data: trucks,
          });
          break;

        case 'get_dashboard':
          const dashboardData = await this.getDashboardData();
          this.sendMessage(client.ws, {
            type: 'dashboard_data',
            requestId,
            data: dashboardData,
          });
          break;

        case 'get_truck_details':
          const truckDetails = await this.getTruckDetails(data.truckId);
          this.sendMessage(client.ws, {
            type: 'truck_details',
            requestId,
            data: truckDetails,
          });
          break;

        case 'update_truck_status':
          const updateResult = await this.updateTruckStatus(data.truckId, data.status);
          // Log admin operation
          logAdminOperation('UPDATE_TRUCK_STATUS', clientId, {
            truckId: data.truckId,
            newStatus: data.status,
            clientIp: client.ip || 'unknown',
          });
          this.sendMessage(client.ws, {
            type: 'truck_status_updated',
            requestId,
            data: updateResult,
          });
          break;

        case 'resolve_alert':
          const alertResult = await this.resolveAlert(data.alertId);

          // Log admin operation
          logAdminOperation('RESOLVE_ALERT', clientId, {
            alertId: data.alertId,
            clientIp: client.ip || 'unknown',
          });

          this.sendMessage(client.ws, {
            type: 'alert_resolved',
            requestId,
            data: alertResult,
          });
          break;

        case 'health_check':
          const health = await this.getSystemHealth();

          // Log system health check
          logSystemHealth(health);

          this.sendMessage(client.ws, {
            type: 'health_status',
            requestId,
            data: health,
          });
          break;

        default:
          this.sendError(
            client.ws,
            'UNKNOWN_MESSAGE_TYPE',
            `Unknown message type: ${type}`,
            requestId
          );
      }
    } catch (error) {
      console.error(`❌ Error handling message ${type} from client ${clientId}:`, error);
      this.sendError(client.ws, 'INTERNAL_ERROR', error.message, requestId);
    }
  }

  // Handle subscriptions
  async handleSubscription(clientId, channel) {
    const client = this.clients.get(clientId);
    if (!client) return;

    client.subscriptions.add(channel);

    switch (channel) {
      case 'truck_updates':
        this.subscriptions.truckUpdates.add(clientId);
        // Send initial data
        const locations = await prismaService.getRealtimeLocations();
        this.sendMessage(client.ws, {
          type: 'truck_locations',
          data: locations,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'alerts':
        this.subscriptions.alerts.add(clientId);
        // Send current unresolved alerts
        const alerts = await this.getUnresolvedAlerts();
        this.sendMessage(client.ws, {
          type: 'current_alerts',
          data: alerts,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'dashboard':
        this.subscriptions.dashboard.add(clientId);
        // Send dashboard data
        const dashboardData = await this.getDashboardData();
        this.sendMessage(client.ws, {
          type: 'dashboard_data',
          data: dashboardData,
          timestamp: new Date().toISOString(),
        });
        break;
    }

    console.log(`🔔 Client ${clientId} subscribed to ${channel}`);
  }

  // Handle unsubscriptions
  handleUnsubscription(clientId, channel) {
    const client = this.clients.get(clientId);
    if (!client) return;

    client.subscriptions.delete(channel);

    switch (channel) {
      case 'truck_updates':
        this.subscriptions.truckUpdates.delete(clientId);
        break;
      case 'alerts':
        this.subscriptions.alerts.delete(clientId);
        break;
      case 'dashboard':
        this.subscriptions.dashboard.delete(clientId);
        break;
    }

    console.log(`🔕 Client ${clientId} unsubscribed from ${channel}`);
  }

  // Handle client disconnect
  handleDisconnect(clientId) {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Remove from all subscriptions
    this.subscriptions.truckUpdates.delete(clientId);
    this.subscriptions.alerts.delete(clientId);
    this.subscriptions.dashboard.delete(clientId);

    // Remove client
    this.clients.delete(clientId);
  }

  // Send message to client
  sendMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  // Send error to client
  sendError(ws, code, message, requestId = null) {
    this.sendMessage(ws, {
      type: 'error',
      requestId,
      error: {
        code,
        message,
      },
    });
  }

  // Broadcast to subscribed clients
  broadcastToSubscription(subscription, message) {
    for (const clientId of subscription) {
      const client = this.clients.get(clientId);
      if (client && client.ws.readyState === WebSocket.OPEN) {
        this.sendMessage(client.ws, message);
      } else {
        // Clean up dead connections
        subscription.delete(clientId);
        this.clients.delete(clientId);
      }
    }
  }

  // Start real-time data broadcasting
  startRealtimeBroadcast() {
    // Truck location updates
    setInterval(async () => {
      if (!this.isReady || this.subscriptions.truckUpdates.size === 0) return;

      try {
        const locations = await prismaService.getRealtimeLocations();
        this.broadcastToSubscription(this.subscriptions.truckUpdates, {
          type: 'truck_locations_update',
          data: locations,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('❌ Error broadcasting truck locations:', error);
      }
    }, 30000); // Every 30 seconds

    // Alert monitoring
    setInterval(async () => {
      if (!this.isReady || this.subscriptions.alerts.size === 0) return;

      try {
        const recentAlerts = await prismaService.prisma.alert_event.findMany({
          where: {
            acknowledged: false,
            occurred_at: {
              gte: new Date(Date.now() - 60000), // Last minute
            },
          },
          include: {
            truck: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            occurred_at: 'desc',
          },
        });

        if (recentAlerts.length > 0) {
          this.broadcastToSubscription(this.subscriptions.alerts, {
            type: 'new_alerts',
            data: recentAlerts.map((alert) => ({
              id: alert.id,
              type: alert.type,
              severity: alert.severity,
              detail: alert.detail,
              truckName: alert.truck.name,
              occurredAt: alert.occurred_at,
            })),
            timestamp: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('❌ Error broadcasting alerts:', error);
      }
    }, 15000); // Every 15 seconds

    // Dashboard updates
    setInterval(async () => {
      if (!this.isReady || this.subscriptions.dashboard.size === 0) return;

      try {
        const dashboardData = await this.getDashboardData();
        this.broadcastToSubscription(this.subscriptions.dashboard, {
          type: 'dashboard_update',
          data: dashboardData,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('❌ Error broadcasting dashboard updates:', error);
      }
    }, 60000); // Every minute

    // Connection health check
    setInterval(() => {
      for (const [clientId, client] of this.clients) {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.ping();
        } else {
          this.handleDisconnect(clientId);
        }
      }
    }, 30000); // Every 30 seconds

    console.log('📡 Real-time broadcasts started');
  }

  // ==========================================
  // DATA SERVICE METHODS
  // ==========================================

  async getTrucks(filters = {}) {
    if (!this.isReady) throw new Error('Database not ready');

    return await prismaService.prisma.truck.findMany({
      where: filters,
      include: {
        currentLocation: true,
        alerts: {
          where: { isResolved: false },
        },
      },
      orderBy: {
        truckNumber: 'asc',
      },
    });
  }

  async getTruckDetails(truckId) {
    if (!this.isReady) throw new Error('Database not ready');

    return await prismaService.prisma.truck.findUnique({
      where: { id: truckId },
      include: {
        currentLocation: true,
        alerts: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        maintenanceRecords: {
          orderBy: { scheduledDate: 'desc' },
          take: 5,
        },
      },
    });
  }

  async getDashboardData() {
    if (!this.isReady) throw new Error('Database not ready');

    // Total trucks
    const totalTrucks = await prismaService.prisma.truck.count();

    // Determine active trucks from recent GPS positions (last 30 minutes)
    const recentPositions = await prismaService.prisma.gps_position.findMany({
      where: {
        ts: { gte: new Date(Date.now() - 30 * 60 * 1000) },
      },
      select: { truck_id: true, speed_kph: true },
      distinct: ['truck_id'],
    });
    const activeTrucks = recentPositions.filter((p) => (p.speed_kph || 0) > 5).length;

    // Unresolved alerts (use correct model name alert_event)
    const unresolvedAlerts = await prismaService.prisma.alert_event.count({
      where: { acknowledged: false },
    });

    const recentMaintenances = 0; // No maintenance table in current schema

    return {
      fleet: {
        total: totalTrucks,
        active: activeTrucks,
        inactive: Math.max(0, totalTrucks - activeTrucks),
      },
      alerts: {
        unresolved: unresolvedAlerts,
      },
      maintenance: {
        recentCount: recentMaintenances,
      },
    };
  }

  async getUnresolvedAlerts() {
    if (!this.isReady) throw new Error('Database not ready');

    return await prismaService.prisma.alert_event.findMany({
      where: { acknowledged: false },
      include: {
        truck: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        occurred_at: 'desc',
      },
    });
  }

  async updateTruckStatus(truckId, status) {
    if (!this.isReady) throw new Error('Database not ready');

    return await prismaService.prisma.truck.update({
      where: { id: truckId },
      data: { status },
    });
  }

  async resolveAlert(alertId) {
    if (!this.isReady) throw new Error('Database not ready');

    return await prismaService.prisma.alertEvent.update({
      where: { id: alertId },
      data: {
        acknowledged: true,
      },
    });
  }

  async getSystemHealth() {
    const health = await prismaService.healthCheck();
    const connectionInfo = await prismaService.getConnectionInfo();

    return {
      database: {
        status: health.status,
        name: connectionInfo.database_name,
        connections: connectionInfo.active_connections,
      },
      websocket: {
        connectedClients: this.clients.size,
        subscriptions: {
          truckUpdates: this.subscriptions.truckUpdates.size,
          alerts: this.subscriptions.alerts.size,
          dashboard: this.subscriptions.dashboard.size,
        },
      },
      server: {
        environment: NODE_ENV,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      },
    };
  }

  // Graceful shutdown
  async shutdown() {
    console.log('📴 Starting WebSocket server shutdown...');

    // Close all client connections
    for (const [clientId, client] of this.clients) {
      client.ws.close(1000, 'Server shutdown');
    }

    // Close WebSocket server
    if (this.wss) {
      this.wss.close();
      console.log('📡 WebSocket server closed');
    }

    // Close HTTP server
    if (this.server) {
      this.server.close();
      console.log('🔌 HTTP server closed');
    }

    // Disconnect database
    await prismaService.disconnect();
    console.log('🗃️  Database connections closed');
  }
}

// ==========================================
// SERVER STARTUP
// ==========================================

const wsServer = new WebSocketServer();

const startServer = async () => {
  const startTime = Date.now();

  try {
    const server = await wsServer.initialize();

    server.listen(PORT, '0.0.0.0', () => {
      const bootTime = Date.now() - startTime;

      console.log('🚀 ================================');
      console.log(`🚛 Fleet Management Server`);
      console.log('🚀 ================================');
      console.log(`🌐 HTTP API server running on port ${PORT}`);
      console.log(`📡 WebSocket server running on port ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`🔗 API URL: ${PUBLIC_BASE_URL}/api`);
      console.log(`🔗 WebSocket URL: ${WS_BASE_URL}/ws`);
      console.log(`🌐 Network Access: Server accessible from other networks`);
      console.log('🚀 ================================');

      // Log server startup
      logServerStartup({
        port: PORT,
        environment: NODE_ENV,
        websocketUrl: `${WS_BASE_URL}/ws`,
        databaseStatus: wsServer.isReady ? 'connected' : 'disconnected',
        startupTime: bootTime,
        adminId: 'system',
        serverVersion: '2.0.0',
      });

      if (NODE_ENV === 'development') {
        console.log('🔧 Development mode features:');
        console.log('   • Detailed error messages');
        console.log('   • Connection logging');
        console.log('   • Prisma query logging');
        console.log('   • Admin activity logging');
        console.log(`   • Prisma Studio: npx prisma studio`);
        console.log(`   • Admin logs: log/admin-activity.log`);
        console.log('🚀 ================================');
      }
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    logError(error, {
      context: 'server_startup',
      port: PORT,
      environment: NODE_ENV,
    });
    process.exit(1);
  }
};

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

const gracefulShutdown = async (signal) => {
  console.log(`\n📴 Received ${signal}. Starting graceful shutdown...`);

  // Log server shutdown
  logServerShutdown(signal);

  try {
    await wsServer.shutdown();
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    logError(error, { context: 'graceful_shutdown', signal });
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Start the server
startServer();

module.exports = { wsServer };
