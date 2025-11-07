const WebSocket = require('ws');

let wsServer = null;
let clients = new Map();
let subscriptions = {
  truckUpdates: new Set(),
  alerts: new Set(),
  dashboard: new Set(),
  adminActivities: new Set(),
};

const initialize = (webSocketServer) => {
  wsServer = webSocketServer;
  console.log(' WebSocket service initialized');
};

const broadcastTruckLocationUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.truckUpdates, {
    type: 'truck_locations_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const broadcastTruckStatusUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.truckUpdates, {
    type: 'truck_status_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const broadcastNewAlert = (alert) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.alerts, {
    type: 'new_alert',
    data: alert,
    timestamp: new Date().toISOString(),
  });
};

const broadcastAlertResolved = (alert) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.alerts, {
    type: 'alert_resolved',
    data: alert,
    timestamp: new Date().toISOString(),
  });
};

const broadcastToSubscription = (subscription, message) => {
  for (const clientId of subscription) {
    const client = clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      sendMessage(client.ws, message);
    } else {
      // Clean up dead connections
      subscription.delete(clientId);
      clients.delete(clientId);
    }
  }
};

const sendMessage = (ws, message) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
};

const getConnectedClients = () => {
  if (!wsServer) return 0;
  return clients.size;
};

const broadcastAdminActivity = (activity) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.adminActivities, {
    type: 'admin_activity',
    data: activity,
    timestamp: new Date().toISOString(),
  });
};

const broadcastTruckUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.truckUpdates, {
    type: 'truck_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const broadcastDashboardUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.dashboard, {
    type: 'dashboard_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const broadcastSensorUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.truckUpdates, {
    type: 'sensor_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const broadcastDeviceUpdate = (data) => {
  if (!wsServer) {
    console.warn('WebSocket server not initialized');
    return;
  }

  broadcastToSubscription(subscriptions.truckUpdates, {
    type: 'device_update',
    data: data,
    timestamp: new Date().toISOString(),
  });
};

const getSubscriptions = () => {
  return {
    truckUpdates: subscriptions.truckUpdates.size,
    alerts: subscriptions.alerts.size,
    dashboard: subscriptions.dashboard.size,
    adminActivities: subscriptions.adminActivities.size,
  };
};

// Helper functions for managing clients and subscriptions
const addClient = (clientId, clientInfo) => {
  clients.set(clientId, clientInfo);
};

const removeClient = (clientId) => {
  // Remove from all subscriptions
  subscriptions.truckUpdates.delete(clientId);
  subscriptions.alerts.delete(clientId);
  subscriptions.dashboard.delete(clientId);
  subscriptions.adminActivities.delete(clientId);

  // Remove client
  clients.delete(clientId);
};

const addSubscription = (clientId, channel) => {
  switch (channel) {
    case 'truck_updates':
      subscriptions.truckUpdates.add(clientId);
      break;
    case 'alerts':
      subscriptions.alerts.add(clientId);
      break;
    case 'dashboard':
      subscriptions.dashboard.add(clientId);
      break;
    case 'admin_activities':
      subscriptions.adminActivities.add(clientId);
      break;
  }
};

const removeSubscription = (clientId, channel) => {
  switch (channel) {
    case 'truck_updates':
      subscriptions.truckUpdates.delete(clientId);
      break;
    case 'alerts':
      subscriptions.alerts.delete(clientId);
      break;
    case 'dashboard':
      subscriptions.dashboard.delete(clientId);
      break;
    case 'admin_activities':
      subscriptions.adminActivities.delete(clientId);
      break;
  }
};

module.exports = {
  initialize,
  broadcastTruckLocationUpdate,
  broadcastTruckStatusUpdate,
  broadcastNewAlert,
  broadcastAlertResolved,
  broadcastAdminActivity,
  broadcastTruckUpdate,
  broadcastDashboardUpdate,
  broadcastSensorUpdate,
  broadcastDeviceUpdate,
  getConnectedClients,
  getSubscriptions,
  addClient,
  removeClient,
  addSubscription,
  removeSubscription,
  sendMessage,
};
