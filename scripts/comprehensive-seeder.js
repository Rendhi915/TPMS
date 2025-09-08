const { PrismaClient } = require('../prisma/generated/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Helper functions
function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate random coordinates within Indonesia mining areas
function generateIndonesianCoordinates() {
  // Approximate coordinates for major mining areas in Indonesia
  const miningAreas = [
    { lat: -2.5, lng: 118.0, name: 'Kalimantan' },
    { lat: -7.0, lng: 110.0, name: 'Java' },
    { lat: 0.5, lng: 101.0, name: 'Sumatra' },
    { lat: -8.5, lng: 116.0, name: 'Lombok' }
  ];
  
  const area = randomChoice(miningAreas);
  return {
    lat: area.lat + randomFloat(-1, 1, 6),
    lng: area.lng + randomFloat(-1, 1, 6)
  };
}

async function seedFleetGroups() {
  console.log('🚛 Seeding Fleet Groups...');
  
  const fleetGroups = [];
  const sites = ['Kalimantan Mine', 'Java Quarry', 'Sumatra Coal', 'Lombok Copper', 'Sulawesi Gold'];
  
  for (let i = 0; i < 5; i++) {
    const fleetGroup = await prisma.fleet_group.create({
      data: {
        name: `Fleet ${String.fromCharCode(65 + i)}`, // Fleet A, B, C, etc.
        site: sites[i],
        description: `Mining fleet for ${sites[i]} operations`,
      }
    });
    fleetGroups.push(fleetGroup);
  }
  
  console.log(`✅ Created ${fleetGroups.length} fleet groups`);
  return fleetGroups;
}

async function seedTrucks(fleetGroups) {
  console.log('🚚 Seeding Trucks...');
  
  const trucks = [];
  const truckModels = ['Caterpillar 797F', 'Komatsu 980E-4', 'Liebherr T 282C', 'Belaz 75710', 'Hitachi EH5000AC-3'];
  const tireConfigs = ['18.00R33', '40.00R57', '59/80R63', '53/80R63'];
  
  for (let i = 0; i < 100; i++) {
    const truckId = String(i + 1).padStart(4, '0'); // Generate 0001, 0002, etc.
    const truck = await prisma.truck.create({
      data: {
        id: truckId,
        vin: faker.vehicle.vin(),
        name: `Truck-${String(i + 1).padStart(3, '0')}`,
        model: randomChoice(truckModels),
        year: randomInt(2015, 2023),
        tire_config: randomChoice(tireConfigs),
        fleet_group_id: randomChoice(fleetGroups).id,
      }
    });
    trucks.push(truck);
  }
  
  console.log(`✅ Created ${trucks.length} trucks`);
  return trucks;
}

async function seedDevices(trucks) {
  console.log('📱 Seeding Devices...');
  
  const devices = [];
  
  for (const truck of trucks) {
    const device = await prisma.device.create({
      data: {
        truck_id: truck.id,
        sn: `DEV${faker.string.alphanumeric(8).toUpperCase()}`,
        sim_number: faker.phone.number('62###########'),
        installed_at: faker.date.between({ from: '2023-01-01', to: '2024-01-01' }),
      }
    });
    devices.push(device);
  }
  
  console.log(`✅ Created ${devices.length} devices`);
  return devices;
}

async function seedSensors(devices) {
  console.log('🔧 Seeding Sensors...');
  
  const sensors = [];
  
  for (const device of devices) {
    // Create tire sensors (6-10 per truck)
    const tireCount = randomInt(6, 10);
    for (let i = 1; i <= tireCount; i++) {
      const sensor = await prisma.sensor.create({
        data: {
          device_id: device.id,
          type: 'tire',
          position_no: i,
          sn: `TIRE${faker.string.alphanumeric(6).toUpperCase()}`,
        }
      });
      sensors.push(sensor);
    }
    
    // Create hub sensors (2-4 per truck)
    const hubCount = randomInt(2, 4);
    for (let i = 1; i <= hubCount; i++) {
      const sensor = await prisma.sensor.create({
        data: {
          device_id: device.id,
          type: 'hub',
          position_no: i,
          sn: `HUB${faker.string.alphanumeric(6).toUpperCase()}`,
        }
      });
      sensors.push(sensor);
    }
  }
  
  console.log(`✅ Created ${sensors.length} sensors`);
  return sensors;
}


async function seedTruckStatusEvents(trucks) {
  console.log('📊 Seeding Truck Status Events...');
  
  const statusEvents = [];
  const statuses = ['active', 'inactive', 'maintenance'];
  
  for (const truck of trucks) {
    // Create 1-3 status events per truck
    const eventCount = randomInt(1, 3);
    let lastDate = faker.date.between({ from: '2023-01-01', to: '2024-01-01' });
    
    for (let i = 0; i < eventCount; i++) {
      const event = await prisma.truckStatusEvent.create({
        data: {
          truck_id: truck.id,
          status: randomChoice(statuses),
          note: Math.random() > 0.5 ? faker.lorem.sentence() : null,
          changed_at: lastDate,
        }
      });
      statusEvents.push(event);
      
      // Next event is later
      lastDate = faker.date.between({ from: lastDate, to: new Date() });
    }
  }
  
  console.log(`✅ Created ${statusEvents.length} truck status events`);
  return statusEvents;
}

async function seedGpsPositions(devices, trucks) {
  console.log('📍 Seeding GPS Positions...');
  
  const positions = [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Create recent GPS positions for active trucks
  for (let i = 0; i < Math.min(50, trucks.length); i++) {
    const truck = trucks[i];
    const device = devices.find(d => d.truckId === truck.id);
    
    if (!device) continue;
    
    // Create 10-50 GPS points per truck in the last 24 hours
    const pointCount = randomInt(10, 50);
    const baseCoords = generateIndonesianCoordinates();
    
    for (let j = 0; j < pointCount; j++) {
      const timestamp = new Date(oneDayAgo.getTime() + (j * (24 * 60 * 60 * 1000) / pointCount));
      
      // Simulate truck movement with small coordinate changes
      const coords = {
        lat: baseCoords.lat + randomFloat(-0.01, 0.01, 6),
        lng: baseCoords.lng + randomFloat(-0.01, 0.01, 6)
      };
      
      // Create GPS position without PostGIS geography for now
      const position = await prisma.gpsPosition.create({
        data: {
          device_id: device.id,
          truck_id: truck.id,
          ts: timestamp,
          speed_kph: randomFloat(0, 80),
          heading_deg: randomInt(0, 359),
          hdop: randomFloat(0.5, 2.0),
          source: 'GPS'
        }
      });
      
      positions.push(position);
    }
  }
  
  console.log(`✅ Created ${positions.length} GPS positions`);
  return positions;
}

async function seedTirePressureEvents(devices, trucks) {
  console.log('🛞 Seeding Tire Pressure Events...');
  
  const events = [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < Math.min(30, trucks.length); i++) {
    const truck = trucks[i];
    const device = devices.find(d => d.truckId === truck.id);
    
    if (!device) continue;
    
    // Create tire pressure events for 6 tires
    for (let tireNo = 1; tireNo <= 6; tireNo++) {
      const eventCount = randomInt(5, 15);
      
      for (let j = 0; j < eventCount; j++) {
        const timestamp = new Date(oneDayAgo.getTime() + (j * (24 * 60 * 60 * 1000) / eventCount));
        
        const event = await prisma.tirePressureEvent.create({
          data: {
            device_id: device.id,
            truck_id: truck.id,
            tire_no: tireNo,
            pressure_kpa: randomFloat(800, 1200), // Normal range 800-1200 kPa
            temp_celsius: randomFloat(40, 80), // Normal range 40-80°C
            exType: randomChoice(['normal', 'warning', 'critical']),
            batteryLevel: randomInt(20, 100),
            changedAt: timestamp,
          }
        });
        events.push(event);
      }
    }
  }
  
  console.log(`✅ Created ${events.length} tire pressure events`);
  return events;
}

async function seedHubTemperatureEvents(devices, trucks) {
  console.log('🌡️ Seeding Hub Temperature Events...');
  
  const events = [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < Math.min(30, trucks.length); i++) {
    const truck = trucks[i];
    const device = devices.find(d => d.truckId === truck.id);
    
    if (!device) continue;
    
    // Create hub temperature events for 4 hubs
    for (let hubNo = 1; hubNo <= 4; hubNo++) {
      const eventCount = randomInt(5, 15);
      
      for (let j = 0; j < eventCount; j++) {
        const timestamp = new Date(oneDayAgo.getTime() + (j * (24 * 60 * 60 * 1000) / eventCount));
        
        const event = await prisma.hubTemperatureEvent.create({
          data: {
            device_id: device.id,
            truck_id: truck.id,
            hub_no: hubNo,
            temp_celsius: randomFloat(60, 120), // Normal range 60-120°C
            exType: randomChoice(['normal', 'warning', 'critical']),
            batteryLevel: randomInt(20, 100),
            changedAt: timestamp,
          }
        });
        events.push(event);
      }
    }
  }
  
  console.log(`✅ Created ${events.length} hub temperature events`);
  return events;
}

async function seedFuelLevelEvents(trucks) {
  console.log('⛽ Seeding Fuel Level Events...');
  
  const events = [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < Math.min(50, trucks.length); i++) {
    const truck = trucks[i];
    const eventCount = randomInt(5, 20);
    let currentFuel = randomFloat(20, 100);
    
    for (let j = 0; j < eventCount; j++) {
      const timestamp = new Date(oneDayAgo.getTime() + (j * (24 * 60 * 60 * 1000) / eventCount));
      
      // Simulate fuel consumption and refueling
      if (Math.random() > 0.9 && currentFuel < 30) {
        // Refuel
        currentFuel = randomFloat(80, 100);
      } else {
        // Consume fuel
        currentFuel = Math.max(5, currentFuel - randomFloat(0.5, 3));
      }
      
      const event = await prisma.fuelLevelEvent.create({
        data: {
          truck_id: truck.id,
          fuel_percent: currentFuel,
          changedAt: timestamp,
          source: 'fuel_sensor',
        }
      });
      events.push(event);
    }
  }
  
  console.log(`✅ Created ${events.length} fuel level events`);
  return events;
}

async function seedSpeedEvents(trucks) {
  console.log('💨 Seeding Speed Events...');
  
  const events = [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < Math.min(50, trucks.length); i++) {
    const truck = trucks[i];
    const eventCount = randomInt(20, 50);
    
    for (let j = 0; j < eventCount; j++) {
      const timestamp = new Date(oneDayAgo.getTime() + (j * (24 * 60 * 60 * 1000) / eventCount));
      
      const event = await prisma.speedEvent.create({
        data: {
          truck_id: truck.id,
          speed_kph: randomFloat(0, 80), // 0-80 km/h
          changedAt: timestamp,
          source: 'gps',
        }
      });
      events.push(event);
    }
  }
  
  console.log(`✅ Created ${events.length} speed events`);
  return events;
}

async function seedAlertEvents(trucks) {
  console.log('🚨 Seeding Alert Events...');
  
  const events = [];
  const alertTypes = ['LOW_TIRE', 'SPEEDING', 'IDLE', 'GEOFENCE_IN', 'GEOFENCE_OUT', 'FUEL_DROP', 'HIGH_TEMP', 'DEVICE_LOST'];
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < trucks.length; i++) {
    const truck = trucks[i];
    const alertCount = randomInt(0, 5); // 0-5 alerts per truck
    
    for (let j = 0; j < alertCount; j++) {
      const alertType = randomChoice(alertTypes);
      const timestamp = faker.date.between({ from: oneWeekAgo, to: now });
      
      let detail = {};
      switch (alertType) {
        case 'LOW_TIRE':
          detail = { tireNo: randomInt(1, 6), pressure: randomFloat(500, 700) };
          break;
        case 'SPEEDING':
          detail = { speed: randomFloat(85, 120), limit: 80 };
          break;
        case 'HIGH_TEMP':
          detail = { temperature: randomFloat(130, 180), threshold: 120 };
          break;
        case 'FUEL_DROP':
          detail = { fuelBefore: randomFloat(50, 80), fuelAfter: randomFloat(10, 30) };
          break;
      }
      
      const event = await prisma.alertEvent.create({
        data: {
          truck_id: truck.id,
          type: alertType,
          severity: randomInt(1, 5),
          detail: detail,
          occurred_at: timestamp,
          acknowledged: Math.random() > 0.3, // 70% acknowledged
        }
      });
      events.push(event);
    }
  }
  
  console.log(`✅ Created ${events.length} alert events`);
  return events;
}


async function seedTireErrorCodes() {
  console.log('⚠️ Seeding Tire Error Codes...');
  
  const errorCodes = [
    { code: 1, description: 'Low Pressure' },
    { code: 2, description: 'High Pressure' },
    { code: 3, description: 'High Temperature' },
    { code: 4, description: 'Low Battery' },
    { code: 5, description: 'Sensor Malfunction' },
    { code: 6, description: 'Communication Error' },
    { code: 7, description: 'Rapid Pressure Loss' },
    { code: 8, description: 'Temperature Spike' },
  ];
  
  for (const errorCode of errorCodes) {
    await prisma.tire_error_code.create({
      data: errorCode
    });
  }
  
  console.log(`✅ Created ${errorCodes.length} tire error codes`);
}

async function main() {
  console.log('🚀 Starting comprehensive database seeding...\n');
  
  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.$executeRaw`TRUNCATE TABLE 
      alert_event, speed_event, fuel_level_event,
      hub_temperature_event, tire_pressure_event, gps_position, trip, geofence,
      truck_status_event, sensor, device,
      truck, fleet_group, tire_error_code, device_status_event, lock_event, daily_route
      RESTART IDENTITY CASCADE`;
    
    // Seed reference data first
    await seedTireErrorCodes();
    
    // Seed master data
    const fleetGroups = await seedFleetGroups();
    const trucks = await seedTrucks(fleetGroups);
    const devices = await seedDevices(trucks);
    const sensors = await seedSensors(devices);
    
    // Seed operational data
    await seedTruckStatusEvents(trucks);
    
    // Seed sensor data
    await seedGpsPositions(devices, trucks);
    await seedTirePressureEvents(devices, trucks);
    await seedHubTemperatureEvents(devices, trucks);
    await seedFuelLevelEvents(trucks);
    await seedSpeedEvents(trucks);
    
    // Seed alerts
    await seedAlertEvents(trucks);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Fleet Groups: ${fleetGroups.length}`);
    console.log(`- Trucks: ${trucks.length}`);
    console.log(`- Devices: ${devices.length}`);
    console.log(`- Sensors: ${sensors.length}`);
    console.log('- GPS Positions: Generated for active trucks');
    console.log('- Tire Pressure Events: Generated for active trucks');
    console.log('- Hub Temperature Events: Generated for active trucks');
    console.log('- Fuel/Speed Events: Generated for active trucks');
    console.log('- Alert Events: Generated for all trucks');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
