/**
 * Demo Trucks Seeder - truck-spiderman & truck-ironman
 *
 * Creates 2 fully equipped mining trucks with:
 * - 10 wheels each (2 front + 8 rear dual configuration)
 * - TPMS sensors for each wheel (pressure + temperature)
 * - GPS tracking device
 * - Random positions within PT BORNEO INDOBARA mining area
 *
 * Usage:
 *   node scripts/seed-demo-trucks.js
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

// Mining area boundaries from miningAreaService.js
const MINING_AREA_BOUNDS = {
  minLng: 115.432199,
  maxLng: 115.658299,
  minLat: -3.7172,
  maxLat: -3.431898,
};

// Tire configuration for 10-wheel mining truck
const TIRE_POSITIONS = [
  { no: 1, name: 'Front Left', type: 'front', wheel_type: 'single' },
  { no: 2, name: 'Front Right', type: 'front', wheel_type: 'single' },
  { no: 3, name: 'Rear Left Outer', type: 'rear', wheel_type: 'dual_outer' },
  { no: 4, name: 'Rear Left Inner', type: 'rear', wheel_type: 'dual_inner' },
  { no: 5, name: 'Rear Right Outer', type: 'rear', wheel_type: 'dual_outer' },
  { no: 6, name: 'Rear Right Inner', type: 'rear', wheel_type: 'dual_inner' },
  { no: 7, name: 'Rear2 Left Outer', type: 'rear', wheel_type: 'dual_outer' },
  { no: 8, name: 'Rear2 Left Inner', type: 'rear', wheel_type: 'dual_inner' },
  { no: 9, name: 'Rear2 Right Outer', type: 'rear', wheel_type: 'dual_outer' },
  { no: 10, name: 'Rear2 Right Inner', type: 'rear', wheel_type: 'dual_inner' },
];

// Truck configurations
const TRUCKS = [
  {
    name: 'truck-spiderman',
    code: 'SPMN',
    model: 'Caterpillar 797F',
    year: 2022,
    vin: 'CAT797FSPMN000001',
    device_sn: 'DEVICE-SPIDERMAN-001',
    sim_number: '628123456789',
  },
  {
    name: 'truck-ironman',
    code: 'IRMN',
    model: 'Komatsu 980E-4',
    year: 2023,
    vin: 'KOM980EIRMN000001',
    device_sn: 'DEVICE-IRONMAN-001',
    sim_number: '628987654321',
  },
];

/**
 * Generate random coordinate within mining area bounds
 */
function getRandomCoordinate() {
  const lng =
    MINING_AREA_BOUNDS.minLng +
    Math.random() * (MINING_AREA_BOUNDS.maxLng - MINING_AREA_BOUNDS.minLng);
  const lat =
    MINING_AREA_BOUNDS.minLat +
    Math.random() * (MINING_AREA_BOUNDS.maxLat - MINING_AREA_BOUNDS.minLat);
  return { lng, lat };
}

/**
 * Generate realistic tire pressure (kPa) with optional anomaly
 */
function generateTirePressure(tireNo, hasAnomaly = false) {
  if (hasAnomaly) {
    // Anomaly: Low pressure (500-650 kPa)
    return 500 + Math.random() * 150;
  }
  // Normal: 700-900 kPa for mining trucks
  return 700 + Math.random() * 200;
}

/**
 * Generate realistic tire temperature (Celsius) with optional anomaly
 */
function generateTireTemperature(tireNo, hasAnomaly = false) {
  if (hasAnomaly) {
    // Anomaly: Overheating (60-80°C)
    return 60 + Math.random() * 20;
  }
  // Normal: 30-50°C
  return 30 + Math.random() * 20;
}

/**
 * Determine if this tire should have an anomaly
 * Currently disabled - all tires use normal values
 */
function shouldHaveAnomaly() {
  // Anomalies disabled - return false for all tires
  return false;
}

/**
 * Get anomaly type for specific tire
 * Currently disabled - returns null for all tires
 */
function getAnomalyType() {
  // Anomalies disabled
  return null;
}

/**
 * Create truck with all related data
 */
async function createTruck(truckConfig) {
  console.log(`\n🚛 Creating ${truckConfig.name}...`);

  // 1. Create truck
  const truck = await prisma.truck.create({
    data: {
      name: truckConfig.name,
      code: truckConfig.code,
      model: truckConfig.model,
      year: truckConfig.year,
      vin: truckConfig.vin,
      tire_config: '10-wheel',
    },
  });
  console.log(`   ✅ Truck created: ${truck.id}`);

  // 2. Create device
  const device = await prisma.device.create({
    data: {
      truck_id: truck.id,
      sn: truckConfig.device_sn,
      sim_number: truckConfig.sim_number,
    },
  });
  console.log(`   ✅ Device created: ${device.sn}`);

  // 3. Create device assignment
  await prisma.device_truck_assignment.create({
    data: {
      device_id: device.id,
      truck_id: truck.id,
      is_active: true,
    },
  });

  // 4. Create tire position configurations
  for (const tirePos of TIRE_POSITIONS) {
    await prisma.tire_position_config.create({
      data: {
        truck_id: truck.id,
        tire_no: tirePos.no,
        position_name: tirePos.name,
        wheel_type: tirePos.wheel_type,
        is_active: true,
      },
    });
  }
  console.log(`   ✅ Tire positions configured (10 wheels)`);

  // 5. Create sensors for each tire
  const sensors = [];
  for (const tirePos of TIRE_POSITIONS) {
    const sensor = await prisma.sensor.create({
      data: {
        device_id: device.id,
        type: 'TPMS',
        position_no: tirePos.no,
        sn: `${truckConfig.device_sn}-SENSOR-${String(tirePos.no).padStart(2, '0')}`,
      },
    });
    sensors.push(sensor);
  }
  console.log(`   ✅ Sensors created (10 TPMS sensors)`);

  // 6. Generate initial GPS position
  const gpsCoord = getRandomCoordinate();
  await prisma.$executeRaw`
    INSERT INTO gps_position (device_id, truck_id, ts, pos, speed_kph, heading_deg, hdop, source)
    VALUES (
      ${device.id}::uuid,
      ${truck.id}::uuid,
      NOW(),
      ST_SetSRID(ST_MakePoint(${gpsCoord.lng}, ${gpsCoord.lat}), 4326)::geography,
      ${Math.random() * 30 + 10}::real,
      ${Math.random() * 360}::real,
      ${1.0 + Math.random() * 2}::real,
      'demo_seeder'
    )
  `;
  console.log(`   ✅ GPS position: [${gpsCoord.lng.toFixed(6)}, ${gpsCoord.lat.toFixed(6)}]`);

  // 7. Generate tire pressure and temperature data
  const anomalies = [];
  for (const tirePos of TIRE_POSITIONS) {
    const hasAnomaly = shouldHaveAnomaly(tirePos.no, truckConfig.name);
    const anomalyType = getAnomalyType(tirePos.no, truckConfig.name);

    const pressure = generateTirePressure(tirePos.no, hasAnomaly && anomalyType === 'low_pressure');
    const temperature = generateTireTemperature(
      tirePos.no,
      hasAnomaly && anomalyType === 'overheating'
    );

    await prisma.tire_pressure_event.create({
      data: {
        device_id: device.id,
        truck_id: truck.id,
        tire_no: tirePos.no,
        pressure_kpa: pressure,
        temp_celsius: temperature,
        ex_type: '1,3',
        battery_level: 80 + Math.floor(Math.random() * 20),
      },
    });

    if (hasAnomaly) {
      anomalies.push({
        tire: tirePos.no,
        name: tirePos.name,
        type: anomalyType,
        pressure: pressure.toFixed(1),
        temperature: temperature.toFixed(1),
      });
    }
  }
  console.log(`   ✅ Tire pressure/temperature data generated`);

  // 8. Insert sensor data into sensor_data_raw for API compatibility
  for (const tirePos of TIRE_POSITIONS) {
    const hasAnomaly = shouldHaveAnomaly(tirePos.no, truckConfig.name);
    const anomalyType = getAnomalyType(tirePos.no, truckConfig.name);

    const pressure = generateTirePressure(tirePos.no, hasAnomaly && anomalyType === 'low_pressure');
    const temperature = generateTireTemperature(
      tirePos.no,
      hasAnomaly && anomalyType === 'overheating'
    );

    await prisma.sensor_data_raw.create({
      data: {
        device_sn: truckConfig.device_sn,
        cmd_type: 'tpdata',
        truck_id: truck.id,
        tire_no: tirePos.no,
        raw_json: {
          sn: truckConfig.device_sn,
          truckId: truck.id,
          simNumber: truckConfig.sim_number,
          data: {
            tireNo: tirePos.no,
            exType: '1,3',
            tiprValue: pressure,
            tempValue: temperature,
            bat: 80 + Math.floor(Math.random() * 20),
          },
        },
        processed: true,
      },
    });
  }

  // 9. Insert GPS data into sensor_data_raw
  await prisma.sensor_data_raw.create({
    data: {
      device_sn: truckConfig.device_sn,
      cmd_type: 'device',
      truck_id: truck.id,
      raw_json: {
        sn: truckConfig.device_sn,
        data: {
          lng: gpsCoord.lng,
          lat: gpsCoord.lat,
          bat1: 90 + Math.floor(Math.random() * 10),
          bat2: 85 + Math.floor(Math.random() * 15),
          bat3: 80 + Math.floor(Math.random() * 20),
          lock: 1,
        },
      },
      processed: true,
    },
  });
  console.log(`   ✅ Sensor raw data inserted for API compatibility`);

  // 10. Create initial truck status
  await prisma.truck_status_event.create({
    data: {
      truck_id: truck.id,
      status: 'active',
      note: 'Demo truck initialized',
    },
  });

  // Print summary
  console.log(`\n   📊 Summary for ${truckConfig.name}:`);
  console.log(`      - Truck ID: ${truck.id}`);
  console.log(`      - Device SN: ${device.sn}`);
  console.log(`      - SIM Number: ${truckConfig.sim_number}`);
  console.log(`      - Location: [${gpsCoord.lng.toFixed(6)}, ${gpsCoord.lat.toFixed(6)}]`);
  console.log(`      - Tires: 10 wheels configured`);
  console.log(`      - Sensors: 10 TPMS sensors active`);

  if (anomalies.length > 0) {
    console.log(`      - ⚠️  Anomalies detected:`);
    anomalies.forEach((a) => {
      console.log(`         • Tire ${a.tire} (${a.name}): ${a.type}`);
      console.log(`           Pressure: ${a.pressure} kPa, Temp: ${a.temperature}°C`);
    });
  }

  return { truck, device, sensors, gpsCoord, anomalies };
}

/**
 * Main seeder function
 */
async function seedDemoTrucks() {
  try {
    console.log('🚀 Starting Demo Trucks Seeder...');
    console.log('📍 Mining Area: PT BORNEO INDOBARA');
    console.log(
      `   Coordinates: [${MINING_AREA_BOUNDS.minLng}, ${MINING_AREA_BOUNDS.minLat}] to [${MINING_AREA_BOUNDS.maxLng}, ${MINING_AREA_BOUNDS.maxLat}]`
    );

    // Check if trucks already exist
    for (const truckConfig of TRUCKS) {
      const existing = await prisma.truck.findFirst({
        where: { name: truckConfig.name },
      });
      if (existing) {
        console.log(`\n⚠️  ${truckConfig.name} already exists. Skipping...`);
        console.log(`   To recreate, delete it first or use a different name.`);
        continue;
      }

      await createTruck(truckConfig);
    }

    console.log('\n\n✅ Demo trucks seeding completed!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Test API endpoint: GET http://localhost:3001/api/trucks');
    console.log('   2. Test sensor data: GET http://localhost:3001/api/sensors/last');
    console.log(
      '   3. Test live tracking: GET http://localhost:3001/api/trucks/realtime-locations'
    );
    console.log('   4. Check WebSocket: ws://localhost:3001/ws');
    console.log('\n🎯 Trucks ready for live tracking frontend!');
  } catch (error) {
    console.error('❌ Error seeding demo trucks:', error);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeder
seedDemoTrucks();
