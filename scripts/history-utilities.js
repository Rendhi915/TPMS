// scripts/history-utilities.js
// Additional utilities for generating specific types of history data

const { PrismaClient } = require('@prisma/client');
const moment = require('moment');

const prisma = new PrismaClient();

// Generate realistic shift patterns
class ShiftPatternGenerator {
  constructor() {
    this.shifts = {
      day: { start: 6, end: 18, activityLevel: 0.85 },
      night: { start: 18, end: 6, activityLevel: 0.45 },
      maintenance: { start: 22, end: 4, activityLevel: 0.2 },
    };
  }

  getShiftInfo(dateTime) {
    const hour = moment(dateTime).hour();

    if (hour >= 6 && hour < 18) {
      return { ...this.shifts.day, name: 'day' };
    } else if (hour >= 22 || hour < 4) {
      return { ...this.shifts.maintenance, name: 'maintenance' };
    } else {
      return { ...this.shifts.night, name: 'night' };
    }
  }

  shouldTruckBeActive(dateTime, truckStatus) {
    if (truckStatus !== 'ACTIVE') return false;

    const shift = this.getShiftInfo(dateTime);
    const dayOfWeek = moment(dateTime).day(); // 0 = Sunday, 6 = Saturday

    // Reduce weekend activity
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 1.0;

    return Math.random() < shift.activityLevel * weekendFactor;
  }
}

// Generate maintenance-related history
class MaintenanceHistoryGenerator {
  static async generateMaintenanceSession(truckId, startTime, durationHours = 4) {
    const maintenanceArea = { lat: -3.52, lng: 115.62 };
    const records = [];

    let currentTime = moment(startTime);
    const endTime = currentTime.clone().add(durationHours, 'hours');

    // Approach to maintenance area
    const approachRecords = this.generateApproachSequence(truckId, currentTime, maintenanceArea);
    records.push(...approachRecords);
    currentTime.add(15, 'minutes');

    // Stationary during maintenance
    while (currentTime.isBefore(endTime)) {
      records.push({
        truckId: truckId,
        latitude: maintenanceArea.lat + (Math.random() - 0.5) * 0.0001,
        longitude: maintenanceArea.lng + (Math.random() - 0.5) * 0.0001,
        speed: 0,
        heading: Math.floor(Math.random() * 360),
        fuelPercentage: 85 + Math.random() * 15, // Refueled during maintenance
        recordedAt: currentTime.toDate(),
      });

      currentTime.add(10, 'minutes');
    }

    // Exit from maintenance area
    const exitRecords = this.generateExitSequence(truckId, currentTime, maintenanceArea);
    records.push(...exitRecords);

    return records;
  }

  static generateApproachSequence(truckId, startTime, targetLocation) {
    const records = [];
    const steps = 5;

    // Start from random position
    let currentPos = {
      lat: targetLocation.lat + (Math.random() - 0.5) * 0.01,
      lng: targetLocation.lng + (Math.random() - 0.5) * 0.01,
    };

    for (let i = 0; i < steps; i++) {
      const progress = (i + 1) / steps;
      const speed = 15 - progress * 12; // Slow down as approaching

      currentPos = {
        lat: currentPos.lat + (targetLocation.lat - currentPos.lat) * 0.3,
        lng: currentPos.lng + (targetLocation.lng - currentPos.lng) * 0.3,
      };

      records.push({
        truckId: truckId,
        latitude: parseFloat(currentPos.lat.toFixed(8)),
        longitude: parseFloat(currentPos.lng.toFixed(8)),
        speed: parseFloat(speed.toFixed(2)),
        heading: this.calculateHeading(currentPos, targetLocation),
        fuelPercentage: 60 + Math.random() * 20,
        recordedAt: startTime
          .clone()
          .add(i * 3, 'minutes')
          .toDate(),
      });
    }

    return records;
  }

  static generateExitSequence(truckId, startTime, fromLocation) {
    const records = [];
    const steps = 3;

    let currentPos = { ...fromLocation };
    const exitDirection = {
      lat: fromLocation.lat + (Math.random() - 0.5) * 0.008,
      lng: fromLocation.lng + (Math.random() - 0.5) * 0.008,
    };

    for (let i = 0; i < steps; i++) {
      const progress = (i + 1) / steps;
      const speed = 5 + progress * 20; // Speed up when leaving

      currentPos = {
        lat: currentPos.lat + (exitDirection.lat - fromLocation.lat) * progress * 0.5,
        lng: currentPos.lng + (exitDirection.lng - fromLocation.lng) * progress * 0.5,
      };

      records.push({
        truckId: truckId,
        latitude: parseFloat(currentPos.lat.toFixed(8)),
        longitude: parseFloat(currentPos.lng.toFixed(8)),
        speed: parseFloat(speed.toFixed(2)),
        heading: this.calculateHeading(currentPos, exitDirection),
        fuelPercentage: 90 + Math.random() * 10, // Full tank after maintenance
        recordedAt: startTime
          .clone()
          .add(i * 2, 'minutes')
          .toDate(),
      });
    }

    return records;
  }

  static calculateHeading(from, to) {
    const deltaLng = to.lng - from.lng;
    const deltaLat = to.lat - from.lat;
    const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
    return Math.round((heading + 360) % 360);
  }
}

// Generate incident/breakdown history
class IncidentHistoryGenerator {
  static async generateBreakdownIncident(truckId, startTime, severity = 'medium') {
    const incidents = {
      low: { duration: 30, stationaryTime: 15 }, // 30min total, 15min stationary
      medium: { duration: 120, stationaryTime: 90 }, // 2h total, 1.5h stationary
      high: { duration: 480, stationaryTime: 360 }, // 8h total, 6h stationary
    };

    const incident = incidents[severity];
    const breakdownLocation = this.getRandomBreakdownLocation();
    const records = [];

    let currentTime = moment(startTime);

    // Pre-breakdown: slow movement
    for (let i = 0; i < 3; i++) {
      records.push({
        truckId: truckId,
        latitude: breakdownLocation.lat + (Math.random() - 0.5) * 0.001,
        longitude: breakdownLocation.lng + (Math.random() - 0.5) * 0.001,
        speed: Math.max(0, 8 - i * 2), // Gradually slowing down
        heading: Math.floor(Math.random() * 360),
        fuelPercentage: 40 + Math.random() * 30,
        recordedAt: currentTime.toDate(),
      });

      currentTime.add(3, 'minutes');
    }

    // Breakdown: stationary period
    const stationaryEnd = currentTime.clone().add(incident.stationaryTime, 'minutes');
    while (currentTime.isBefore(stationaryEnd)) {
      records.push({
        truckId: truckId,
        latitude: breakdownLocation.lat,
        longitude: breakdownLocation.lng,
        speed: 0,
        heading: Math.floor(Math.random() * 360),
        fuelPercentage: 35 + Math.random() * 25,
        recordedAt: currentTime.toDate(),
      });

      currentTime.add(8, 'minutes');
    }

    // Recovery: gradual return to normal operation
    const recoveryEnd = moment(startTime).add(incident.duration, 'minutes');
    while (currentTime.isBefore(recoveryEnd)) {
      const speed = Math.random() * 15; // Slow recovery speed

      records.push({
        truckId: truckId,
        latitude: breakdownLocation.lat + (Math.random() - 0.5) * 0.0005,
        longitude: breakdownLocation.lng + (Math.random() - 0.5) * 0.0005,
        speed: parseFloat(speed.toFixed(2)),
        heading: Math.floor(Math.random() * 360),
        fuelPercentage: 45 + Math.random() * 25,
        recordedAt: currentTime.toDate(),
      });

      currentTime.add(5, 'minutes');
    }

    return records;
  }

  static getRandomBreakdownLocation() {
    // Common breakdown locations (transport routes)
    const locations = [
      { lat: -3.58, lng: 115.59 }, // Main transport route
      { lat: -3.62, lng: 115.56 }, // Secondary route
      { lat: -3.675, lng: 115.54 }, // Waste route
      { lat: -3.535, lng: 115.605 }, // Maintenance route
    ];

    return locations[Math.floor(Math.random() * locations.length)];
  }
}

// Generate loading/unloading activity patterns
class LoadingActivityGenerator {
  static async generateLoadingSession(truckId, location, startTime, cycleCount = 3) {
    const records = [];
    let currentTime = moment(startTime);

    for (let cycle = 0; cycle < cycleCount; cycle++) {
      // Approach loading point
      const approachRecords = this.generateApproachToLoadingPoint(truckId, location, currentTime);
      records.push(...approachRecords);
      currentTime.add(5, 'minutes');

      // Loading process (stationary with minor movements)
      const loadingRecords = this.generateLoadingProcess(truckId, location, currentTime);
      records.push(...loadingRecords);
      currentTime.add(8, 'minutes');

      // Exit with load
      const exitRecords = this.generateLoadedExit(truckId, location, currentTime);
      records.push(...exitRecords);
      currentTime.add(3, 'minutes');
    }

    return records;
  }

  static generateApproachToLoadingPoint(truckId, location, startTime) {
    const records = [];
    const approachSteps = 4;

    let currentPos = {
      lat: location.lat + (Math.random() - 0.5) * 0.003,
      lng: location.lng + (Math.random() - 0.5) * 0.003,
    };

    for (let i = 0; i < approachSteps; i++) {
      const speed = 15 - i * 3; // Slow down as approaching

      currentPos = {
        lat: currentPos.lat + (location.lat - currentPos.lat) * 0.4,
        lng: currentPos.lng + (location.lng - currentPos.lng) * 0.4,
      };

      records.push({
        truckId: truckId,
        latitude: parseFloat(currentPos.lat.toFixed(8)),
        longitude: parseFloat(currentPos.lng.toFixed(8)),
        speed: Math.max(0, parseFloat(speed.toFixed(2))),
        heading: this.calculateHeading(currentPos, location),
        fuelPercentage: 50 + Math.random() * 30,
        recordedAt: startTime
          .clone()
          .add(i * 1.25, 'minutes')
          .toDate(),
      });
    }

    return records;
  }

  static generateLoadingProcess(truckId, location, startTime) {
    const records = [];
    const loadingSteps = 8; // 8 minutes of loading

    for (let i = 0; i < loadingSteps; i++) {
      // Minor positioning movements during loading
      const microMovement = {
        lat: location.lat + (Math.random() - 0.5) * 0.00008,
        lng: location.lng + (Math.random() - 0.5) * 0.00008,
      };

      const speed = i < 2 ? Math.random() * 3 : 0; // Small movements at start, then stationary

      records.push({
        truckId: truckId,
        latitude: parseFloat(microMovement.lat.toFixed(8)),
        longitude: parseFloat(microMovement.lng.toFixed(8)),
        speed: parseFloat(speed.toFixed(2)),
        heading: Math.floor(Math.random() * 360),
        fuelPercentage: 45 + Math.random() * 25,
        recordedAt: startTime.clone().add(i, 'minutes').toDate(),
      });
    }

    return records;
  }

  static generateLoadedExit(truckId, location, startTime) {
    const records = [];
    const exitSteps = 3;

    let currentPos = { ...location };
    const exitTarget = {
      lat: location.lat + (Math.random() - 0.5) * 0.005,
      lng: location.lng + (Math.random() - 0.5) * 0.005,
    };

    for (let i = 0; i < exitSteps; i++) {
      const progress = (i + 1) / exitSteps;
      const speed = 3 + progress * 12; // Gradually speed up when loaded

      currentPos = {
        lat: currentPos.lat + (exitTarget.lat - location.lat) * progress * 0.6,
        lng: currentPos.lng + (exitTarget.lng - location.lng) * progress * 0.6,
      };

      records.push({
        truckId: truckId,
        latitude: parseFloat(currentPos.lat.toFixed(8)),
        longitude: parseFloat(currentPos.lng.toFixed(8)),
        speed: parseFloat(speed.toFixed(2)),
        heading: this.calculateHeading(currentPos, exitTarget),
        fuelPercentage: 40 + Math.random() * 25,
        recordedAt: startTime.clone().add(i, 'minutes').toDate(),
      });
    }

    return records;
  }

  static calculateHeading(from, to) {
    const deltaLng = to.lng - from.lng;
    const deltaLat = to.lat - from.lat;
    const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
    return Math.round((heading + 360) % 360);
  }
}

// Main utility class that orchestrates different generators
class HistoryUtilities {
  constructor() {
    this.shiftGenerator = new ShiftPatternGenerator();
  }

  async generateSpecialEvents(options = {}) {
    const { maintenanceSessions = 5, breakdownIncidents = 10, loadingActivities = 15 } = options;

    console.log('🔧 Generating special events...');

    try {
      // Get sample trucks for different events
      const activeTrucks = await prisma.truck.findMany({
        where: { status: 'ACTIVE' },
        take: Math.max(maintenanceSessions, breakdownIncidents, loadingActivities),
      });

      if (activeTrucks.length === 0) {
        console.log('⚠️  No active trucks found for special events');
        return;
      }

      let totalRecords = 0;

      // Generate maintenance sessions
      for (let i = 0; i < maintenanceSessions && i < activeTrucks.length; i++) {
        const truck = activeTrucks[i];
        const sessionStart = moment().subtract(Math.floor(Math.random() * 168), 'hours'); // Last week

        const maintenanceRecords = await MaintenanceHistoryGenerator.generateMaintenanceSession(
          truck.id,
          sessionStart,
          2 + Math.random() * 4 // 2-6 hours
        );

        await prisma.locationHistory.createMany({
          data: maintenanceRecords,
          skipDuplicates: true,
        });

        totalRecords += maintenanceRecords.length;
      }

      // Generate breakdown incidents
      for (let i = 0; i < breakdownIncidents && i < activeTrucks.length; i++) {
        const truck = activeTrucks[i];
        const incidentStart = moment().subtract(Math.floor(Math.random() * 72), 'hours'); // Last 3 days
        const severity = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];

        const incidentRecords = await IncidentHistoryGenerator.generateBreakdownIncident(
          truck.id,
          incidentStart,
          severity
        );

        await prisma.locationHistory.createMany({
          data: incidentRecords,
          skipDuplicates: true,
        });

        totalRecords += incidentRecords.length;
      }

      // Generate loading activities
      for (let i = 0; i < loadingActivities && i < activeTrucks.length; i++) {
        const truck = activeTrucks[i];
        const activityStart = moment().subtract(Math.floor(Math.random() * 24), 'hours'); // Last day

        // Random loading location
        const loadingLocations = [
          { lat: -3.5454, lng: 115.6044 }, // Main pit
          { lat: -3.55, lng: 115.58 }, // Coal stockpile
          { lat: -3.65, lng: 115.575 }, // Processing area
        ];
        const location = loadingLocations[Math.floor(Math.random() * loadingLocations.length)];

        const loadingRecords = await LoadingActivityGenerator.generateLoadingSession(
          truck.id,
          location,
          activityStart,
          1 + Math.floor(Math.random() * 3) // 1-3 loading cycles
        );

        await prisma.locationHistory.createMany({
          data: loadingRecords,
          skipDuplicates: true,
        });

        totalRecords += loadingRecords.length;
      }

      console.log(`✅ Generated ${totalRecords} special event records`);
      console.log(`   • Maintenance sessions: ${maintenanceSessions}`);
      console.log(`   • Breakdown incidents: ${breakdownIncidents}`);
      console.log(`   • Loading activities: ${loadingActivities}`);
    } catch (error) {
      console.error('❌ Error generating special events:', error);
      throw error;
    }
  }

  async generateRealtimeSimulation(durationMinutes = 60) {
    console.log(`🔄 Starting real-time simulation for ${durationMinutes} minutes...`);

    const activeTrucks = await prisma.truck.findMany({
      where: { status: 'ACTIVE' },
      take: 20, // Limit to 20 trucks for real-time simulation
    });

    if (activeTrucks.length === 0) {
      console.log('⚠️  No active trucks found for simulation');
      return;
    }

    const startTime = moment();
    const endTime = startTime.clone().add(durationMinutes, 'minutes');
    let currentTime = startTime.clone();

    console.log(
      `Simulating ${activeTrucks.length} trucks from ${startTime.format('HH:mm')} to ${endTime.format('HH:mm')}`
    );

    while (currentTime.isBefore(endTime)) {
      const batchRecords = [];

      for (const truck of activeTrucks) {
        if (this.shiftGenerator.shouldTruckBeActive(currentTime, truck.status)) {
          // Get last known position
          const lastPosition = await prisma.locationHistory.findFirst({
            where: { truckId: truck.id },
            orderBy: { recordedAt: 'desc' },
          });

          let currentLat = lastPosition?.latitude || truck.latitude || -3.58;
          let currentLng = lastPosition?.longitude || truck.longitude || 115.59;
          let currentFuel = lastPosition?.fuelPercentage || truck.fuelPercentage || 75;

          // Small random movement
          currentLat = parseFloat(currentLat) + (Math.random() - 0.5) * 0.0008;
          currentLng = parseFloat(currentLng) + (Math.random() - 0.5) * 0.0008;
          currentFuel = Math.max(10, parseFloat(currentFuel) - Math.random() * 0.5);

          batchRecords.push({
            truckId: truck.id,
            latitude: parseFloat(currentLat.toFixed(8)),
            longitude: parseFloat(currentLng.toFixed(8)),
            speed: parseFloat((Math.random() * 35).toFixed(2)),
            heading: Math.floor(Math.random() * 360),
            fuelPercentage: parseFloat(currentFuel.toFixed(2)),
            recordedAt: currentTime.toDate(),
          });
        }
      }

      if (batchRecords.length > 0) {
        await prisma.locationHistory.createMany({
          data: batchRecords,
          skipDuplicates: true,
        });
      }

      // Progress indicator
      const elapsed = moment.duration(currentTime.diff(startTime)).asMinutes();
      const progress = ((elapsed / durationMinutes) * 100).toFixed(1);
      process.stdout.write(`\r⏳ Progress: ${progress}% (${batchRecords.length} trucks active)`);

      currentTime.add(2, 'minutes'); // Update every 2 minutes
    }

    console.log('\n✅ Real-time simulation completed');
  }
}

module.exports = {
  HistoryUtilities,
  ShiftPatternGenerator,
  MaintenanceHistoryGenerator,
  IncidentHistoryGenerator,
  LoadingActivityGenerator,
};

// CLI interface for utilities
if (require.main === module) {
  const utilities = new HistoryUtilities();

  const command = process.argv[2];

  switch (command) {
    case 'events':
      utilities.generateSpecialEvents().catch(console.error);
      break;
    case 'realtime': {
      const duration = parseInt(process.argv[3]) || 60;
      utilities.generateRealtimeSimulation(duration).catch(console.error);
      break;
    }
    default:
      console.log(`
History Utilities Commands:

  node scripts/history-utilities.js events
    Generate special events (maintenance, breakdowns, loading)
  
  node scripts/history-utilities.js realtime [minutes]
    Run real-time simulation (default: 60 minutes)

Examples:
  node scripts/history-utilities.js events
  node scripts/history-utilities.js realtime 120
      `);
  }
}
