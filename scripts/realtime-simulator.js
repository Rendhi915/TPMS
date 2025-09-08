const { PrismaClient } = require('@prisma/client');
const WebSocket = require('ws');
require('dotenv').config();

const prisma = new PrismaClient();

// Extended route coordinates for continuous simulation
const routeCoordinates = [
  [-3.506761, 115.624602], [-3.506831, 115.624709], [-3.506925, 115.624882],
  [-3.507028, 115.625017], [-3.507139, 115.625174], [-3.507221, 115.625322],
  [-3.507603, 115.625873], [-3.507746, 115.626132], [-3.507841, 115.626260],
  [-3.507927, 115.626371], [-3.508066, 115.626490], [-3.508177, 115.626646],
  [-3.508313, 115.626803], [-3.508420, 115.626930], [-3.508403, 115.626905],
  [-3.508502, 115.627021], [-3.508645, 115.627177], [-3.508828, 115.627354],
  [-3.508963, 115.627512], [-3.509174, 115.627706], [-3.509418, 115.627918],
  [-3.509634, 115.628112], [-3.509931, 115.628342], [-3.510025, 115.628491],
  [-3.510138, 115.628622], [-3.510260, 115.628766], [-3.510399, 115.628956],
  [-3.510597, 115.629145], [-3.511003, 115.629446], [-3.511238, 115.629505],
  [-3.511399, 115.629564], [-3.511613, 115.629623], [-3.511843, 115.629639],
  [-3.512015, 115.629666], [-3.512154, 115.629715], [-3.512475, 115.629677],
  [-3.512764, 115.629602], [-3.512903, 115.629564], [-3.513150, 115.629511],
  [-3.513284, 115.629462], [-3.513235, 115.629296], [-3.513193, 115.629087],
  [-3.513134, 115.628867], [-3.513128, 115.628685], [-3.513235, 115.628593],
  [-3.513401, 115.628534], [-3.513562, 115.628470], [-3.513749, 115.628459],
  [-3.513926, 115.628406], [-3.514135, 115.628384]
];

class RealtimeTrackingSimulator {
  constructor() {
    this.isRunning = false;
    this.trucks = [];
    this.truckPositions = new Map(); // truck_id -> current_index
    this.intervalId = null;
    this.websocketUrl = process.env.WS_URL || 'ws://localhost:3001';
    this.updateInterval = 15; // seconds
  }

  async initialize() {
    try {
      console.log('🚛 Initializing Real-time Tracking Simulator...');
      
      // Get active trucks from database
      const trucks = await prisma.$queryRaw`
        SELECT id, name, model FROM truck 
        WHERE id IN (
          SELECT DISTINCT truck_id FROM gps_position 
          ORDER BY truck_id LIMIT 5
        )
      `;

      if (trucks.length === 0) {
        console.log('❌ No trucks with GPS data found');
        return false;
      }

      this.trucks = trucks;

      // Initialize random starting positions for each truck
      this.trucks.forEach((truck, index) => {
        const startIndex = Math.floor(Math.random() * routeCoordinates.length);
        this.truckPositions.set(truck.id, startIndex);
      });

      console.log(`📊 Initialized ${this.trucks.length} trucks for real-time simulation`);
      return true;
    } catch (error) {
      console.error('❌ Error initializing simulator:', error);
      return false;
    }
  }

  calculateSpeed(lat1, lon1, lat2, lon2, timeIntervalSeconds) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    const speedKmh = (distance / timeIntervalSeconds) * 3600;
    return Math.max(5, Math.min(speedKmh + (Math.random() * 20 - 10), 60));
  }

  calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  }

  async updateTruckPosition(truck) {
    try {
      const currentIndex = this.truckPositions.get(truck.id);
      const nextIndex = (currentIndex + 1) % routeCoordinates.length;
      
      const [currentLat, currentLon] = routeCoordinates[currentIndex];
      const [nextLat, nextLon] = routeCoordinates[nextIndex];
      
      // Calculate movement data
      const speed = this.calculateSpeed(currentLat, currentLon, nextLat, nextLon, this.updateInterval);
      const heading = this.calculateBearing(currentLat, currentLon, nextLat, nextLon);
      
      // Insert GPS position using raw SQL
      await prisma.$executeRaw`
        INSERT INTO gps_position (
          truck_id, 
          ts, 
          pos, 
          speed_kph, 
          heading_deg, 
          hdop, 
          source
        ) VALUES (
          ${truck.id}::uuid,
          ${new Date()}::timestamptz,
          ST_GeogFromText(${`POINT(${nextLon} ${nextLat})`}),
          ${speed}::real,
          ${heading}::real,
          ${1.0 + Math.random() * 0.5}::real,
          'realtime_simulation'
        )
      `;

      // Update position index
      this.truckPositions.set(truck.id, nextIndex);

      return {
        truckId: truck.id,
        truckName: truck.name,
        position: [nextLat, nextLon],
        speed: speed.toFixed(1),
        heading: heading.toFixed(0),
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Error updating position for ${truck.name}:`, error.message);
      return null;
    }
  }

  async broadcastUpdate(updateData) {
    try {
      // Try to broadcast via WebSocket if server is running
      const ws = new WebSocket(this.websocketUrl);
      
      ws.on('open', () => {
        const message = {
          type: 'truck_location_update',
          data: updateData
        };
        ws.send(JSON.stringify(message));
        ws.close();
      });

      ws.on('error', () => {
        // Silently fail if WebSocket server is not available
      });

    } catch (error) {
      // Silently fail if WebSocket is not available
    }
  }

  async startSimulation(intervalSeconds = 15) {
    if (this.isRunning) {
      console.log('⚠️  Simulation already running');
      return;
    }

    const initialized = await this.initialize();
    if (!initialized) return;

    this.updateInterval = intervalSeconds;
    this.isRunning = true;
    
    console.log(`🚀 Starting real-time tracking simulation`);
    console.log(`📊 Tracking ${this.trucks.length} trucks along ${routeCoordinates.length} route points`);
    console.log(`⏱️  Update interval: ${intervalSeconds} seconds`);
    console.log(`📡 WebSocket URL: ${this.websocketUrl}`);

    this.intervalId = setInterval(async () => {
      try {
        const updates = [];
        
        for (const truck of this.trucks) {
          const update = await this.updateTruckPosition(truck);
          if (update) {
            updates.push(update);
            // Broadcast individual truck update
            await this.broadcastUpdate(update);
          }
        }

        if (updates.length > 0) {
          console.log(`📍 [${new Date().toLocaleTimeString()}] Updated ${updates.length} trucks:`);
          updates.forEach(update => {
            console.log(`   ${update.plateNumber}: [${update.position[0].toFixed(6)}, ${update.position[1].toFixed(6)}] - ${update.speed} km/h, ${update.heading}°`);
          });
        }

      } catch (error) {
        console.error('❌ Error in simulation loop:', error);
      }
    }, intervalSeconds * 1000);

    console.log('✅ Real-time tracking simulation started');
    console.log('   Press Ctrl+C to stop simulation');
  }

  stopSimulation() {
    if (!this.isRunning) {
      console.log('⚠️  Simulation not running');
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    console.log('🛑 Real-time tracking simulation stopped');
  }

  async getStatus() {
    try {
      const totalTrucks = await prisma.$queryRaw`SELECT COUNT(*) as count FROM truck`;
      const recentGps = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM gps_position 
        WHERE ts > NOW() - INTERVAL '5 minutes'
      `;

      return {
        isRunning: this.isRunning,
        totalTrucks: Number(totalTrucks[0].count),
        simulatedTrucks: this.trucks.length,
        routePoints: routeCoordinates.length,
        recentGpsRecords: Number(recentGps[0].count),
        updateInterval: this.updateInterval,
        websocketUrl: this.websocketUrl
      };
    } catch (error) {
      console.error('❌ Error getting status:', error);
      return null;
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const simulator = new RealtimeTrackingSimulator();

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping simulation...');
    simulator.stopSimulation();
    process.exit(0);
  });

  if (args.includes('--start')) {
    const intervalIndex = args.indexOf('--interval');
    const interval = intervalIndex !== -1 ? parseInt(args[intervalIndex + 1]) || 15 : 15;
    await simulator.startSimulation(interval);
  } else if (args.includes('--status')) {
    const status = await simulator.getStatus();
    console.log('📊 Real-time Simulation Status:');
    console.log(JSON.stringify(status, null, 2));
    process.exit(0);
  } else if (args.includes('--help')) {
    console.log(`
🚛 Real-time Tracking Simulator

Usage:
  node realtime-simulator.js [options]

Options:
  --start                 Start real-time simulation
  --interval [seconds]    Update interval (default: 15 seconds)
  --status               Show simulation status
  --help                 Show this help message

Examples:
  node realtime-simulator.js --start
  node realtime-simulator.js --start --interval 10
  node realtime-simulator.js --status

Environment Variables:
  WS_URL                 WebSocket server URL (default: ws://localhost:3001)
    `);
    process.exit(0);
  } else {
    console.log('Use --help for usage information');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = RealtimeTrackingSimulator;
