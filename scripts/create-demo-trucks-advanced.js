// Script to create demo trucks (spiderman & ironman) with proper device setup
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function createDemoTrucks() {
  try {
    console.log('\n🚀 Creating Demo Trucks (Spiderman & Ironman)');
    console.log('='.repeat(60));

    // Get or create a vendor
    let vendor = await prisma.vendors.findFirst({
      where: { name: 'PT Transport Indo' }
    });

    if (!vendor) {
      vendor = await prisma.vendors.create({
        data: {
          name: 'PT Transport Indo',
          phone: '021-12345678',
          email: 'info@transportindo.co.id',
          address: 'Jakarta, Indonesia',
          contactPerson: 'Fleet Manager'
        }
      });
      console.log('✅ Created vendor: PT Transport Indo');
    } else {
      console.log('✅ Using existing vendor: PT Transport Indo');
    }

    // Get or create fleet group
    let fleetGroup = await prisma.fleet_group.findFirst({
      where: { name: 'Demo Fleet' }
    });

    if (!fleetGroup) {
      fleetGroup = await prisma.fleet_group.create({
        data: {
          name: 'Demo Fleet',
          site: 'Demo Site',
          description: 'Fleet for demo and testing purposes'
        }
      });
      console.log('✅ Created fleet group: Demo Fleet');
    } else {
      console.log('✅ Using existing fleet group: Demo Fleet');
    }

    // Truck 1: Spiderman
    console.log('\n🕷️  Creating Truck Spiderman...');
    
    // Check if already exists
    let spiderman = await prisma.truck.findFirst({
      where: { name: { contains: 'spiderman', mode: 'insensitive' } }
    });

    if (!spiderman) {
      spiderman = await prisma.truck.create({
        data: {
          code: 'SPDM',
          vin: 'VIN2024SPIDERMAN01',
          name: 'truck-spiderman',
          model: 'Hino 500 FM 260',
          year: 2024,
          tireConfig: '10-wheel',
          vendorId: vendor.id,
          fleetGroupId: fleetGroup.id
        }
      });
      console.log('   ✅ Created truck: truck-spiderman (code: SPDM)');
    } else {
      console.log('   ℹ️  Truck spiderman already exists');
    }

    // Create device for Spiderman (matching your data: sn: 987654321)
    let spidermanDevice = await prisma.device.findUnique({
      where: { sn: '987654321' }
    });

    if (!spidermanDevice) {
      spidermanDevice = await prisma.device.create({
        data: {
          truck_id: spiderman.id,
          sn: '987654321',  // Matches your tpdata/hubdata examples
          sim_number: '8986678'
        }
      });
      console.log('   ✅ Created device with SN: 987654321');
    } else {
      // Update to assign to spiderman truck
      await prisma.device.update({
        where: { sn: '987654321' },
        data: { truck_id: spiderman.id }
      });
      console.log('   ✅ Device 987654321 assigned to spiderman');
    }

    // Create 10 sensors for Spiderman (TPMS)
    const spidermanSensorCount = await prisma.sensor.count({
      where: { device_id: spidermanDevice.id }
    });

    if (spidermanSensorCount === 0) {
      for (let i = 1; i <= 10; i++) {
        await prisma.sensor.create({
          data: {
            device_id: spidermanDevice.id,
            type: 'tire',  // Must be 'tire' or 'hub'
            position_no: i,
            sn: `SENSOR-SPDM-W${String(i).padStart(2, '0')}`
          }
        });
      }
      console.log('   ✅ Created 10 tire sensors');
    } else {
      console.log(`   ℹ️  Already has ${spidermanSensorCount} sensors`);
    }

    // Truck 2: Ironman
    console.log('\n🦾 Creating Truck Ironman...');
    
    let ironman = await prisma.truck.findFirst({
      where: { name: { contains: 'ironman', mode: 'insensitive' } }
    });

    if (!ironman) {
      ironman = await prisma.truck.create({
        data: {
          code: 'IRNM',
          vin: 'VIN2024IRONMAN0001',
          name: 'truck-ironman',
          model: 'UD Trucks Quester',
          year: 2024,
          tireConfig: '10-wheel',
          vendorId: vendor.id,
          fleetGroupId: fleetGroup.id
        }
      });
      console.log('   ✅ Created truck: truck-ironman (code: IRNM)');
    } else {
      console.log('   ℹ️  Truck ironman already exists');
    }

    // Create device for Ironman (matching your data: sn: 3462682374 for GPS)
    let ironmanDevice = await prisma.device.findUnique({
      where: { sn: '3462682374' }
    });

    if (!ironmanDevice) {
      ironmanDevice = await prisma.device.create({
        data: {
          truck_id: ironman.id,
          sn: '3462682374',  // Matches your device/GPS examples
          sim_number: '8986123'
        }
      });
      console.log('   ✅ Created device with SN: 3462682374');
    } else {
      // Update to assign to ironman truck
      await prisma.device.update({
        where: { sn: '3462682374' },
        data: { truck_id: ironman.id }
      });
      console.log('   ✅ Device 3462682374 assigned to ironman');
    }

    // Create 10 sensors for Ironman
    const ironmanSensorCount = await prisma.sensor.count({
      where: { device_id: ironmanDevice.id }
    });

    if (ironmanSensorCount === 0) {
      for (let i = 1; i <= 10; i++) {
        await prisma.sensor.create({
          data: {
            device_id: ironmanDevice.id,
            type: 'tire',  // Must be 'tire' or 'hub'
            position_no: i,
            sn: `SENSOR-IRNM-W${String(i).padStart(2, '0')}`
          }
        });
      }
      console.log('   ✅ Created 10 tire sensors');
    } else {
      console.log(`   ℹ️  Already has ${ironmanSensorCount} sensors`);
    }

    // Add sample TPMS data for Spiderman (based on your raw data format)
    console.log('\n📊 Adding sample TPMS data for Spiderman...');
    const now = new Date();
    for (let i = 1; i <= 10; i++) {
      await prisma.tire_pressure_event.create({
        data: {
          device_id: spidermanDevice.id,
          truck_id: spiderman.id,
          tire_no: i,
          pressure_kpa: 248.2 + (i * 5), // Varying pressure
          temp_celsius: 38.2 + (i * 0.5), // Varying temp
          ex_type: '1,3',
          battery_level: 85 + i,
          changed_at: new Date(now.getTime() - (i * 60000)) // 1 min intervals
        }
      });
    }
    console.log('   ✅ Added 10 TPMS readings');

    // Add sample GPS data for Ironman (based on your raw data format)
    console.log('\n📍 Adding sample GPS data for Ironman...');
    const miningLat = -3.5454; // PT INDOBARA area
    const miningLng = 115.6044;
    
    await prisma.$executeRawUnsafe(`
      INSERT INTO gps_position (device_id, truck_id, ts, pos, speed_kph, heading_deg, hdop, source)
      VALUES ($1::uuid, $2::uuid, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography, $6, $7, $8, $9)
    `,
      ironmanDevice.id,
      ironman.id,
      now,
      miningLng,
      miningLat,
      45.5, // speed
      180,  // heading
      1.2,  // hdop
      'demo'
    );
    console.log('   ✅ Added GPS position');

    // Add device status for Ironman (based on your raw data: bat1, bat2, bat3, lock)
    console.log('\n🔋 Adding device status for Ironman...');
    await prisma.device_status_event.create({
      data: {
        device_id: ironmanDevice.id,
        truck_id: ironman.id,
        host_bat: 85,      // bat1
        repeater1_bat: 90, // bat2
        repeater2_bat: 88, // bat3
        lock_state: 1      // lock
      }
    });
    console.log('   ✅ Added device status');

    // Add lock event (based on your raw data: state command)
    console.log('\n🔒 Adding lock event...');
    await prisma.lock_event.create({
      data: {
        device_id: ironmanDevice.id,
        truck_id: ironman.id,
        is_lock: 1
      }
    });
    console.log('   ✅ Added lock event');

    console.log('\n' + '='.repeat(60));
    console.log('✅ DEMO TRUCKS CREATED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📋 Summary:');
    console.log(`   🕷️  Spiderman (code: SPDM)`);
    console.log(`      - Device SN: 987654321`);
    console.log(`      - Sensors: 10 tire sensors`);
    console.log(`      - Data: 10 tire pressure readings`);
    console.log(`\n   🦾 Ironman (code: IRNM)`);
    console.log(`      - Device SN: 3462682374`);
    console.log(`      - Sensors: 10 tire sensors`);
    console.log(`      - Data: GPS, device status, lock event`);
    console.log('\n🎯 You can now test with:');
    console.log('   GET /api/trucks?search=spiderman');
    console.log('   GET /api/trucks?search=ironman');
    console.log('   POST /api/sensors/data (with your raw JSON format)\n');

  } catch (error) {
    console.error('\n❌ Error creating demo trucks:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoTrucks();
