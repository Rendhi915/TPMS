// scripts/history-seeder.js
// History data seeder using Prisma ORM for Fleet Management System

const { PrismaClient } = require('@prisma/client');
const moment = require('moment');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// PT INDOBARA mining area configuration
const MINING_CONFIG = {
  bounds: {
    minLat: -3.7172,
    maxLat: -3.431898,
    minLng: 115.432199,
    maxLng: 115.6583,
  },
  workZones: {
    mainPit: { lat: -3.5454, lng: 115.6044 },
    processing: { lat: -3.65, lng: 115.575 },
    maintenance: { lat: -3.52, lng: 115.62 },
    wasteDump: { lat: -3.7, lng: 115.5 },
    coalStockpile: { lat: -3.55, lng: 115.58 },
  },
  routes: [
    {
      name: 'Main Production Route',
      waypoints: [
        { lat: -3.5454, lng: 115.6044, zone: 'Main Pit' },
        { lat: -3.58, lng: 115.59, zone: 'Transport' },
        { lat: -3.65, lng: 115.575, zone: 'Processing' },
      ],
    },
    {
      name: 'Waste Disposal Route',
      waypoints: [
        { lat: -3.65, lng: 115.575, zone: 'Processing' },
        { lat: -3.675, lng: 115.54, zone: 'Transport' },
        { lat: -3.7, lng: 115.5, zone: 'Waste Dump' },
      ],
    },
    {
      name: 'Maintenance Circuit',
      waypoints: [
        { lat: -3.52, lng: 115.62, zone: 'Maintenance' },
        { lat: -3.53, lng: 115.61, zone: 'Yard' },
        { lat: -3.54, lng: 115.6, zone: 'Inspection' },
        { lat: -3.52, lng: 115.62, zone: 'Maintenance' },
      ],
    },
  ],
};

class HistorySeeder {
  constructor(options = {}) {
    this.options = {
      daysBack: options.daysBack || 7,
      recordsPerDay: options.recordsPerDay || 100,
      batchSize: options.batchSize || 200,
      truckLimit: options.truckLimit || null,
      deleteExisting: options.deleteExisting || false,
      verbose: options.verbose || true,
      ...options,
    };
  }

  log(message, level = 'info') {
    if (!this.options.verbose && level === 'info') return;

    const timestamp = moment().format('HH:mm:ss');
    const prefix =
      {
        info: '📊',
        success: '✅',
        error: '❌',
        warning: '⚠️',
      }[level] || 'ℹ️';

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async getTrucks() {
    try {
      const where = {};

      // Build the query options object
      const queryOptions = {
        where,
        orderBy: { truckNumber: 'asc' },
        include: {
          model: {
            select: {
              name: true,
              manufacturer: true,
              capacityTons: true,
            },
          },
        },
      };

      // Only add 'take' if truckLimit is a valid positive number
      if (this.options.truckLimit && this.options.truckLimit > 0) {
        queryOptions.take = this.options.truckLimit;
      }

      const trucks = await prisma.truck.findMany(queryOptions);

      this.log(`Found ${trucks.length} trucks to process`);
      return trucks;
    } catch (error) {
      this.log(`Error fetching trucks: ${error.message}`, 'error');
      throw error;
    }
  }

  generateRealisticMovement(truck, startTime, endTime) {
    const movements = [];
    const isActive = truck.status === 'ACTIVE' || truck.status === 'active'; // Handle both enum and string values
    const route = MINING_CONFIG.routes[Math.floor(Math.random() * MINING_CONFIG.routes.length)];

    let currentTime = moment(startTime);
    let currentPosition = {
      lat: parseFloat(truck.latitude) || this.getRandomPositionInBounds().lat,
      lng: parseFloat(truck.longitude) || this.getRandomPositionInBounds().lng,
    };
    let currentFuel = parseFloat(truck.fuelPercentage) || 60 + Math.random() * 40;
    let waypointIndex = 0;
    let heading = truck.heading || Math.floor(Math.random() * 360);

    while (currentTime.isBefore(endTime)) {
      const hour = currentTime.hour();
      const isWorkHours = hour >= 6 && hour <= 18;
      const shiftActivity = isWorkHours ? 0.8 : 0.3;

      let speed = 0;

      if (isActive && Math.random() < shiftActivity) {
        // Active movement
        const targetWaypoint = route.waypoints[waypointIndex];
        const distanceToTarget = this.calculateDistance(currentPosition, targetWaypoint);

        if (distanceToTarget < 0.005) {
          // ~500m threshold
          waypointIndex = (waypointIndex + 1) % route.waypoints.length;
        }

        // Move towards target
        const moveDistance = 0.0008 + Math.random() * 0.0004;
        currentPosition = this.moveTowards(currentPosition, targetWaypoint, moveDistance);
        currentPosition = this.keepInBounds(currentPosition);

        heading = this.calculateHeading(currentPosition, targetWaypoint);
        speed = this.generateSpeedForZone(targetWaypoint.zone, isWorkHours);

        // Fuel consumption
        const consumption = speed * 0.02 + Math.random() * 0.1;
        currentFuel = Math.max(5, currentFuel - consumption);

        // Random refueling
        if (currentFuel < 20 && Math.random() < 0.1) {
          currentFuel = 85 + Math.random() * 15;
        }
      }

      // Create movement record
      movements.push({
        truckId: truck.id,
        latitude: parseFloat(currentPosition.lat.toFixed(8)),
        longitude: parseFloat(currentPosition.lng.toFixed(8)),
        speed: parseFloat(speed.toFixed(2)),
        heading: Math.round(heading),
        fuelPercentage: parseFloat(currentFuel.toFixed(2)),
        recordedAt: currentTime.toDate(),
      });

      // Next interval
      const interval = isActive ? 2 + Math.random() * 6 : 10 + Math.random() * 15;
      currentTime.add(interval, 'minutes');
    }

    return movements;
  }

  generateSpeedForZone(zone, isWorkHours) {
    const baseSpeed = isWorkHours ? 20 : 12;
    const variation = isWorkHours ? 15 : 8;

    const zoneMultiplier =
      {
        'Main Pit': 0.6, // Slow in pit
        Processing: 0.7, // Moderate in processing
        Transport: 1.2, // Fast on transport routes
        Maintenance: 0.4, // Very slow in maintenance
        'Waste Dump': 0.8, // Moderate in waste area
        Yard: 0.5, // Slow in yard
        Inspection: 0.3, // Very slow during inspection
      }[zone] || 1.0;

    return Math.max(0, (baseSpeed + Math.random() * variation) * zoneMultiplier);
  }

  calculateDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos2.lat - pos1.lat, 2) + Math.pow(pos2.lng - pos1.lng, 2));
  }

  calculateHeading(from, to) {
    const deltaLng = to.lng - from.lng;
    const deltaLat = to.lat - from.lat;
    const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
    return (heading + 360) % 360;
  }

  moveTowards(current, target, distance) {
    const totalDistance = this.calculateDistance(current, target);
    if (totalDistance === 0) return current;

    const ratio = Math.min(distance / totalDistance, 1);

    return {
      lat: current.lat + (target.lat - current.lat) * ratio + (Math.random() - 0.5) * 0.0002,
      lng: current.lng + (target.lng - current.lng) * ratio + (Math.random() - 0.5) * 0.0002,
    };
  }

  keepInBounds(position) {
    return {
      lat: Math.max(
        MINING_CONFIG.bounds.minLat,
        Math.min(MINING_CONFIG.bounds.maxLat, position.lat)
      ),
      lng: Math.max(
        MINING_CONFIG.bounds.minLng,
        Math.min(MINING_CONFIG.bounds.maxLng, position.lng)
      ),
    };
  }

  getRandomPositionInBounds() {
    return {
      lat:
        MINING_CONFIG.bounds.minLat +
        Math.random() * (MINING_CONFIG.bounds.maxLat - MINING_CONFIG.bounds.minLat),
      lng:
        MINING_CONFIG.bounds.minLng +
        Math.random() * (MINING_CONFIG.bounds.maxLng - MINING_CONFIG.bounds.minLng),
    };
  }

  async insertHistoryBatch(historyData) {
    try {
      const result = await prisma.locationHistory.createMany({
        data: historyData,
        skipDuplicates: true,
      });
      return result.count;
    } catch (error) {
      this.log(`Batch insert error: ${error.message}`, 'error');
      throw error;
    }
  }

  async generateSpecialScenarios() {
    this.log('Generating special scenarios...');

    try {
      // 1. Breakdown incidents
      const breakdownTrucks = await prisma.truck.findMany({
        where: {
          OR: [{ status: 'ACTIVE' }, { status: 'active' }],
        },
        take: 3,
      });

      for (const truck of breakdownTrucks) {
        const breakdownTime = moment().subtract(Math.floor(Math.random() * 48), 'hours');
        const breakdownPosition = this.getRandomPositionInBounds();
        const breakdownData = [];

        // Generate 2 hours of stationary records
        for (let i = 0; i < 24; i++) {
          breakdownData.push({
            truckId: truck.id,
            latitude: breakdownPosition.lat,
            longitude: breakdownPosition.lng,
            speed: 0,
            heading: Math.floor(Math.random() * 360),
            fuelPercentage: 25 + Math.random() * 30,
            recordedAt: breakdownTime
              .clone()
              .add(i * 5, 'minutes')
              .toDate(),
          });
        }

        await this.insertHistoryBatch(breakdownData);
      }

      // 2. High-activity periods (loading/unloading)
      const activeTrucks = await prisma.truck.findMany({
        where: {
          OR: [{ status: 'ACTIVE' }, { status: 'active' }],
        },
        take: 5,
      });

      for (const truck of activeTrucks) {
        const activityTime = moment().subtract(Math.floor(Math.random() * 24), 'hours');
        const loadingZone = MINING_CONFIG.workZones.mainPit;
        const activityData = [];

        // Generate 1 hour of intensive activity
        for (let i = 0; i < 60; i++) {
          const position = {
            lat: loadingZone.lat + (Math.random() - 0.5) * 0.002,
            lng: loadingZone.lng + (Math.random() - 0.5) * 0.002,
          };

          activityData.push({
            truckId: truck.id,
            latitude: position.lat,
            longitude: position.lng,
            speed: Math.random() * 8, // Slow speeds during loading
            heading: Math.floor(Math.random() * 360),
            fuelPercentage: 70 + Math.random() * 20,
            recordedAt: activityTime.clone().add(i, 'minutes').toDate(),
          });
        }

        await this.insertHistoryBatch(activityData);
      }

      this.log('Special scenarios generated', 'success');
    } catch (error) {
      this.log(`Error generating special scenarios: ${error.message}`, 'error');
    }
  }

  async run() {
    try {
      this.log('🚛 Starting Fleet History Data Generation');
      this.log('='.repeat(60));
      this.log(
        `Configuration: ${this.options.daysBack} days, ${this.options.recordsPerDay} records/day`
      );

      const startTime = Date.now();

      // Clear existing data if requested
      if (this.options.deleteExisting) {
        this.log('Clearing existing location history...');
        const deleted = await prisma.locationHistory.deleteMany();
        this.log(`Deleted ${deleted.count} existing records`, 'success');
      }

      // Get trucks
      const trucks = await this.getTrucks();
      if (trucks.length === 0) {
        this.log('No trucks found to process', 'warning');
        return;
      }

      let totalRecords = 0;
      let processedTrucks = 0;

      // Process each truck
      for (const truck of trucks) {
        try {
          const startDate = moment().subtract(this.options.daysBack, 'days');
          const endDate = moment();

          const historyData = this.generateRealisticMovement(truck, startDate, endDate);

          // Insert in batches
          for (let i = 0; i < historyData.length; i += this.options.batchSize) {
            const batch = historyData.slice(i, i + this.options.batchSize);
            const inserted = await this.insertHistoryBatch(batch);
            totalRecords += inserted;
          }

          processedTrucks++;

          if (processedTrucks % 25 === 0) {
            this.log(
              `Progress: ${processedTrucks}/${trucks.length} trucks (${totalRecords} records)`
            );
          }
        } catch (error) {
          this.log(`Error processing truck ${truck.truckNumber}: ${error.message}`, 'error');
        }
      }

      // Generate special scenarios
      await this.generateSpecialScenarios();

      // Final statistics
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      this.log('='.repeat(60));
      this.log('✅ History Generation Complete!', 'success');
      this.log(`📊 Summary:`);
      this.log(`   • Trucks processed: ${processedTrucks}`);
      this.log(`   • Total records: ${totalRecords}`);
      this.log(`   • Average per truck: ${Math.round(totalRecords / processedTrucks)}`);
      this.log(`   • Processing time: ${duration}s`);
      this.log(`   • Records/second: ${Math.round(totalRecords / parseFloat(duration))}`);

      // Database verification
      const finalCount = await prisma.locationHistory.count();
      const uniqueTrucks = await prisma.locationHistory.groupBy({
        by: ['truckId'],
        _count: true,
      });

      this.log(`📈 Verification:`);
      this.log(`   • Database records: ${finalCount}`);
      this.log(`   • Trucks with history: ${uniqueTrucks.length}`);

      const speedStats = await prisma.locationHistory.aggregate({
        _avg: { speed: true },
        _max: { speed: true },
        _min: { recordedAt: true },
        _max: { recordedAt: true },
      });

      this.log(
        `   • Date range: ${moment(speedStats._min.recordedAt).format('YYYY-MM-DD')} to ${moment(speedStats._max.recordedAt).format('YYYY-MM-DD')}`
      );
      this.log(`   • Average speed: ${parseFloat(speedStats._avg.speed || 0).toFixed(2)} km/h`);
    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

// CLI runner
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  // Parse CLI arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--?/, '');
    const value = args[i + 1];

    switch (key) {
      case 'days':
        options.daysBack = parseInt(value) || 7;
        break;
      case 'records':
        options.recordsPerDay = parseInt(value) || 100;
        break;
      case 'batch':
        options.batchSize = parseInt(value) || 200;
        break;
      case 'limit':
        // Ensure limit is a positive integer or null
        const limitValue = parseInt(value);
        options.truckLimit = limitValue && limitValue > 0 ? limitValue : null;
        break;
      case 'delete':
        options.deleteExisting = value === 'true' || value === '1';
        break;
      case 'quiet':
        options.verbose = false;
        break;
      case 'help':
        console.log(`
Fleet Management History Seeder

Usage: node scripts/history-seeder.js [options]

Options:
  --days <number>     Days of history to generate (default: 7)
  --records <number>  Records per day per truck (default: 100)
  --batch <number>    Batch size for inserts (default: 200)
  --limit <number>    Limit number of trucks (default: all)
  --delete true|false Delete existing history (default: false)
  --quiet             Reduce output verbosity
  --help              Show this help

Examples:
  node scripts/history-seeder.js --days 14 --delete true
  node scripts/history-seeder.js --limit 50 --batch 500
  node scripts/history-seeder.js --days 3 --records 200
        `);
        process.exit(0);
        break;
    }
  }

  const seeder = new HistorySeeder(options);
  await seeder.run();
}

// Export for use as module
module.exports = {
  HistorySeeder,
  MINING_CONFIG,
  main,
};

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Seeder failed:', error);
    process.exit(1);
  });
}
