<!-- require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const { initializeWebSocket } = require('./src/services/websocketService');
const { startRealTimeSimulation } = require('./src/services/locationService');
const pool = require('./src/config/database');
const os = require('os');

const server = http.createServer(app);

// Initialize WebSocket
const io = initializeWebSocket(server);

// Test database connection on startup
pool.connect()
  .then(client => {
    console.log('✅ Database connected successfully');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚛 Fleet Management Server running on http://${HOST}:${PORT}`);
  console.log(`📡 WebSocket server ready for real-time tracking`);
  console.log(`🌐 Server accessible from network at http://[YOUR_IP]:${PORT}`);
  console.log(`💾 Using PostgreSQL database: ${process.env.DB_NAME || 'fleet_management'}`);
  
  // Show network interfaces
  const interfaces = os.networkInterfaces();
  console.log('\n📋 Available network addresses:');
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === 'IPv4' && !interface.internal) {
        console.log(`   • http://${interface.address}:${PORT}`);
      }
    }
  }
  console.log('');
  
  // Start real-time simulation
  startRealTimeSimulation(io);
});

module.exports = server; -->