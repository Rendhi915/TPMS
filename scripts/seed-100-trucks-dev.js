// Script to seed 100 trucks for development with realistic data
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

// Configuration
const TRUCK_COUNT = 50; // Changed from 100 to 50 for development
const WHEELS_PER_TRUCK = 10; // Standard for your case
const TPMS_READINGS_PER_WHEEL = 5; // 5 recent readings
const GPS_POINTS_PER_TRUCK = 10; // 10 GPS points (last hour simulation)

// Helper functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function padCode(num, length = 4) {
  return String(num).padStart(length, '0');
}

// Mining area bounds (PT INDOBARA - South Kalimantan)
const MINING_AREA = {
  minLat: -3.7172,
  maxLat: -3.431898,
  minLng: 115.432199,
  maxLng: 115.6583,
  centerLat: -3.5454,
  centerLng: 115.6044,
};

// Truck models variety
const TRUCK_MODELS = [
  'Hino 500 FM 260',
  'Hino 700 ZS',
  'UD Trucks Quester',
  'Mitsubishi Fuso',
  'Scania P-Series',
  'Volvo FM',
  'Mercedes-Benz Actros',
  'MAN TGS',
];

async function seedVendorsAndDrivers() {
  console.log('\n📦 Seeding Vendors...');

  const vendors = [
    { name: 'PT Transport Indo', phone: '021-12345678', email: 'info@transportindo.co.id' },
    { name: 'PT Sentosa Logistics', phone: '021-87654321', email: 'contact@sentosalog.co.id' },
    { name: 'PT Maju Bersama', phone: '021-55555555', email: 'support@majubersama.co.id' },
  ];

  const createdVendors = [];
  for (const vendor of vendors) {
    const existing = await prisma.vendors.findFirst({
      where: { name: vendor.name },
    });

    if (existing) {
      createdVendors.push(existing);
      console.log(`   ✓ Vendor already exists: ${vendor.name}`);
    } else {
      const created = await prisma.vendors.create({
        data: {
          name: vendor.name,
          phone: vendor.phone,
          email: vendor.email,
          address: 'Jakarta, Indonesia',
          contactPerson: 'Fleet Manager',
        },
      });
      createdVendors.push(created);
      console.log(`   ✓ Created vendor: ${vendor.name}`);
    }
  }

  console.log(`\n👨‍✈️ Seeding Drivers...`);

  const driverNames = [
    'Budi Santoso',
    'Ahmad Wijaya',
    'Siti Nurhaliza',
    'Joko Widodo',
    'Eko Prasetyo',
    'Dewi Lestari',
    'Rizki Ramadhan',
    'Andi Setiawan',
    'Nur Hidayat',
    'Farhan Abdullah',
    'Indra Gunawan',
    'Mega Wati',
    'Hendra Kusuma',
    'Wulan Sari',
    'Agus Salim',
  ];

  const createdDrivers = [];
  for (let i = 0; i < Math.min(15, driverNames.length); i++) {
    const vendorId = createdVendors[i % createdVendors.length].id;

    const existing = await prisma.drivers.findFirst({
      where: {
        name: driverNames[i],
        vendorId: vendorId,
      },
    });

    if (existing) {
      createdDrivers.push(existing);
      console.log(`   ✓ Driver already exists: ${driverNames[i]}`);
    } else {
      const licenseExpiry = new Date();
      licenseExpiry.setFullYear(licenseExpiry.getFullYear() + randomInt(1, 3));

      const driver = await prisma.drivers.create({
        data: {
          name: driverNames[i],
          phone: `081${randomInt(100000000, 999999999)}`,
          email: `${driverNames[i].toLowerCase().replace(' ', '.')}@example.com`,
          address: `Jakarta, Indonesia`,
          licenseNumber: `SIM-${padCode(i + 1, 4)}`,
          licenseType: 'SIM B1',
          licenseExpiry: licenseExpiry,
          idCardNumber: `317${randomInt(1000000000000, 9999999999999)}`,
          vendorId: vendorId,
          status: 'aktif',
        },
      });
      createdDrivers.push(driver);
      console.log(`   ✓ Created driver: ${driverNames[i]}`);
    }
  }

  return { vendors: createdVendors, drivers: createdDrivers };
}

async function seedFleetGroups() {
  console.log('\n🏢 Seeding Fleet Groups...');

  const fleetGroups = [
    { name: 'Mining Fleet A', site: 'Main Pit' },
    { name: 'Mining Fleet B', site: 'Secondary Pit' },
    { name: 'Transport Fleet', site: 'Hauling Zone' },
  ];

  const createdGroups = [];
  for (const group of fleetGroups) {
    const existing = await prisma.fleet_group.findFirst({
      where: { name: group.name },
    });

    if (existing) {
      createdGroups.push(existing);
      console.log(`   ✓ Fleet group already exists: ${group.name}`);
    } else {
      const created = await prisma.fleet_group.create({
        data: {
          name: group.name,
          site: group.site,
          description: `Fleet for ${group.site}`,
        },
      });
      createdGroups.push(created);
      console.log(`   ✓ Created fleet group: ${group.name}`);
    }
  }

  return createdGroups;
}

async function seedTrucks(vendors, fleetGroups) {
  console.log(`\n🚛 Seeding ${TRUCK_COUNT} Trucks...`);

  const createdTrucks = [];

  for (let i = 1; i <= TRUCK_COUNT; i++) {
    const code = padCode(i);

    // Check if truck already exists
    const existing = await prisma.truck.findUnique({
      where: { code: code },
    });

    if (existing) {
      createdTrucks.push(existing);
      if (i % 20 === 0) console.log(`   ✓ Progress: ${i}/${TRUCK_COUNT} trucks (existing)`);
      continue;
    }

    const vendorId = vendors[i % vendors.length].id;
    const fleetGroupId = fleetGroups[i % fleetGroups.length].id;
    const model = TRUCK_MODELS[i % TRUCK_MODELS.length];
    const year = randomInt(2018, 2024);

    const truck = await prisma.truck.create({
      data: {
        code: code,
        vin: `VIN${year}${code}${randomInt(1000, 9999)}`,
        name: `Truck-${code}`,
        model: model,
        year: year,
        tireConfig: `${WHEELS_PER_TRUCK}-wheel`,
        vendorId: vendorId,
        fleetGroupId: fleetGroupId,
      },
    });

    createdTrucks.push(truck);

    if (i % 20 === 0 || i === TRUCK_COUNT) {
      console.log(`   ✓ Progress: ${i}/${TRUCK_COUNT} trucks created`);
    }
  }

  console.log(`   ✅ Total trucks: ${createdTrucks.length}`);
  return createdTrucks;
}

async function seedDevicesAndSensors(trucks) {
  console.log(`\n📡 Seeding Devices and Sensors...`);

  for (let i = 0; i < trucks.length; i++) {
    const truck = trucks[i];
    const deviceSN = `TPM-${truck.code}`;

    // Check if device exists
    let device = await prisma.device.findUnique({
      where: { sn: deviceSN },
    });

    if (!device) {
      device = await prisma.device.create({
        data: {
          truck_id: truck.id,
          sn: deviceSN,
          sim_number: `628${randomInt(100000000, 999999999)}`,
        },
      });
    }

    // Create sensors for each wheel
    const existingSensors = await prisma.sensor.count({
      where: { device_id: device.id },
    });

    if (existingSensors === 0) {
      for (let wheelNo = 1; wheelNo <= WHEELS_PER_TRUCK; wheelNo++) {
        await prisma.sensor.create({
          data: {
            device_id: device.id,
            type: 'TPMS',
            position_no: wheelNo,
            sn: `SENSOR-${truck.code}-W${padCode(wheelNo, 2)}`,
          },
        });
      }
    }

    if ((i + 1) % 25 === 0 || i + 1 === trucks.length) {
      console.log(`   ✓ Progress: ${i + 1}/${trucks.length} devices and sensors`);
    }
  }

  console.log(`   ✅ Devices and sensors created for all trucks`);
}

async function seedTPMSData(trucks) {
  console.log(`\n📊 Seeding TPMS Data...`);

  const now = Date.now();
  let totalRecords = 0;

  for (let i = 0; i < trucks.length; i++) {
    const truck = trucks[i];

    const device = await prisma.device.findFirst({
      where: { truck_id: truck.id },
    });

    if (!device) continue;

    // Generate TPMS readings for each wheel
    for (let wheelNo = 1; wheelNo <= WHEELS_PER_TRUCK; wheelNo++) {
      // Base values for this wheel (to simulate realistic variations)
      const basePressure = randomInt(850, 950); // kPa
      const baseTemp = randomInt(35, 45); // Celsius

      for (let reading = 0; reading < TPMS_READINGS_PER_WHEEL; reading++) {
        // Each reading is offset by time (most recent first)
        const timeOffset = reading * 10 * 60 * 1000; // 10 minutes apart
        const timestamp = new Date(now - timeOffset);

        // Add small variations
        const pressure = basePressure + randomInt(-20, 20);
        const temp = baseTemp + randomInt(-3, 3);

        await prisma.tire_pressure_event.create({
          data: {
            device_id: device.id,
            truck_id: truck.id,
            tire_no: wheelNo,
            pressure_kpa: pressure,
            temp_celsius: temp,
            battery_level: randomInt(70, 100),
            changed_at: timestamp,
          },
        });

        totalRecords++;
      }
    }

    if ((i + 1) % 20 === 0 || i + 1 === trucks.length) {
      console.log(`   ✓ Progress: ${i + 1}/${trucks.length} trucks (${totalRecords} TPMS records)`);
    }
  }

  console.log(`   ✅ Total TPMS records: ${totalRecords.toLocaleString()}`);
}

async function seedGPSData(trucks) {
  console.log(`\n📍 Seeding GPS Data...`);

  const now = Date.now();
  let totalRecords = 0;

  for (let i = 0; i < trucks.length; i++) {
    const truck = trucks[i];

    const device = await prisma.device.findFirst({
      where: { truck_id: truck.id },
    });

    if (!device) continue;

    // Generate GPS trail (last hour of movement)
    let currentLat = randomFloat(MINING_AREA.centerLat - 0.01, MINING_AREA.centerLat + 0.01, 6);
    let currentLng = randomFloat(MINING_AREA.centerLng - 0.01, MINING_AREA.centerLng + 0.01, 6);

    for (let point = 0; point < GPS_POINTS_PER_TRUCK; point++) {
      const timeOffset = point * 6 * 60 * 1000; // 6 minutes apart
      const timestamp = new Date(now - timeOffset);

      // Simulate movement (small changes in position)
      currentLat += randomFloat(-0.001, 0.001, 6);
      currentLng += randomFloat(-0.001, 0.001, 6);

      // Keep within bounds
      currentLat = Math.max(MINING_AREA.minLat, Math.min(MINING_AREA.maxLat, currentLat));
      currentLng = Math.max(MINING_AREA.minLng, Math.min(MINING_AREA.maxLng, currentLng));

      await prisma.$executeRawUnsafe(
        `
        INSERT INTO gps_position (device_id, truck_id, ts, pos, speed_kph, heading_deg, hdop, source)
        VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography, $6, $7, $8, $9)
      `,
        device.id,
        truck.id,
        timestamp,
        currentLng,
        currentLat,
        randomFloat(10, 50, 1), // speed
        randomFloat(0, 360, 1), // heading
        randomFloat(1.0, 2.5, 1), // hdop
        'simulated'
      );

      totalRecords++;
    }

    if ((i + 1) % 20 === 0 || i + 1 === trucks.length) {
      console.log(`   ✓ Progress: ${i + 1}/${trucks.length} trucks (${totalRecords} GPS points)`);
    }
  }

  console.log(`   ✅ Total GPS records: ${totalRecords.toLocaleString()}`);
}

async function main() {
  try {
    console.log('\n🚀 TPMS DEVELOPMENT DATA SEEDER (50 Trucks)');
    console.log('='.repeat(60));

    const startTime = Date.now();

    // Step 1: Seed master data
    const { vendors, drivers } = await seedVendorsAndDrivers();
    const fleetGroups = await seedFleetGroups();

    // Step 2: Seed trucks
    const trucks = await seedTrucks(vendors, fleetGroups);

    // Step 3: Seed devices and sensors
    await seedDevicesAndSensors(trucks);

    // Step 4: Seed telemetry data
    await seedTPMSData(trucks);
    await seedGPSData(trucks);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SEEDING COMPLETED!');
    console.log('='.repeat(60));
    console.log(`⏱️  Time elapsed: ${elapsed} seconds`);
    console.log(`\n📊 Summary:`);
    console.log(`   Vendors:      ${vendors.length}`);
    console.log(`   Drivers:      ${drivers.length}`);
    console.log(`   Fleet Groups: ${fleetGroups.length}`);
    console.log(`   Trucks:       ${trucks.length}`);
    console.log(`   Devices:      ${trucks.length}`);
    console.log(`   Sensors:      ${trucks.length * WHEELS_PER_TRUCK}`);
    console.log(`   TPMS Data:    ${trucks.length * WHEELS_PER_TRUCK * TPMS_READINGS_PER_WHEEL}`);
    console.log(`   GPS Data:     ${trucks.length * GPS_POINTS_PER_TRUCK}`);

    console.log(`\n📝 Next Steps:`);
    console.log(`   1. Verify data: node scripts/check-database-stats.js`);
    console.log(`   2. Start server: npm start`);
    console.log(`   3. Test API endpoints`);
    console.log(`   4. Check dashboard at http://localhost:3000\n`);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
