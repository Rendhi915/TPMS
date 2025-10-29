const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

// Helper function to generate random battery level
const randomBattery = () => Math.floor(Math.random() * (100 - 70) + 70);

// Helper function to generate random temperature (25-45°C)
const randomTemp = () => parseFloat((Math.random() * (45 - 25) + 25).toFixed(1));

// Helper function to generate random tire pressure (30-40 PSI)
const randomPressure = () => parseFloat((Math.random() * (40 - 30) + 30).toFixed(1));

async function seedDevicesAndSensors() {
  console.log('\n🚀 Starting seed: Devices & Sensors for Trucks\n');

  try {
    // 1. Get all trucks
    const trucks = await prisma.truck.findMany({
      where: { deleted_at: null },
      orderBy: { name: 'asc' },
    });

    if (trucks.length === 0) {
      console.log('❌ No trucks found! Please run seed-trucks-10wheels.js first.');
      return;
    }

    console.log(`📊 Found ${trucks.length} trucks\n`);

    let deviceCount = 0;
    let sensorCount = 0;

    // 2. Create device and sensors for each truck
    for (let i = 0; i < trucks.length; i++) {
      const truck = trucks[i];
      const deviceSerialNumber = `DEV${String(i + 1).padStart(4, '0')}`;
      const simNumber = `628${String(1000000 + i).slice(-7)}`;

      console.log(`🚛 Processing: ${truck.name} (${truck.plate})`);

      // Check if device already exists for this truck
      const existingDevice = await prisma.device.findFirst({
        where: { truck_id: truck.id },
      });

      let device;
      if (existingDevice) {
        console.log(`   ⏭️  Device already exists: ${existingDevice.sn}`);
        device = existingDevice;
      } else {
        // Create device for this truck
        device = await prisma.device.create({
          data: {
            truck_id: truck.id,
            sn: deviceSerialNumber,
            bat1: randomBattery(),
            bat2: randomBattery(),
            bat3: randomBattery(),
            lock: 0,
            sim_number: simNumber,
            status: 'active',
          },
        });
        deviceCount++;
        console.log(`   ✅ Device created: ${device.sn}`);
      }

      // Create 10 sensors for each device (10 wheels)
      const existingSensors = await prisma.sensor.count({
        where: { device_id: device.id },
      });

      if (existingSensors >= 10) {
        console.log(`   ⏭️  Sensors already exist (${existingSensors} sensors)`);
      } else {
        console.log(`   🔧 Creating 10 sensors...`);

        for (let tireNo = 1; tireNo <= 10; tireNo++) {
          const sensorSerialNumber = `SEN${String(i + 1).padStart(4, '0')}-${String(tireNo).padStart(2, '0')}`;

          await prisma.sensor.create({
            data: {
              sn: sensorSerialNumber,
              device_id: device.id,
              tireNo: tireNo,
              simNumber: simNumber,
              sensorNo: tireNo,
              sensor_lock: 0,
              status: 'active',
            },
          });
          sensorCount++;
        }
        console.log(`   ✅ 10 sensors created`);
      }

      console.log('');
    }

    // 3. Summary
    console.log('\n📊 ===== SEED SUMMARY =====');
    console.log(`✅ Trucks processed: ${trucks.length}`);
    console.log(`✅ Devices created: ${deviceCount}`);
    console.log(`✅ Sensors created: ${sensorCount}`);
    console.log(`\n💡 Device-Sensor relationship:`);
    console.log(`   • Each truck has 1 device`);
    console.log(`   • Each device has 10 sensors (for 10 wheels)`);
    console.log(`   • Total tire sensors: ${trucks.length * 10}`);

    console.log('\n🎉 Seed completed successfully!\n');

    // 4. Show sample data
    const sampleDevice = await prisma.device.findFirst({
      include: {
        truck: {
          select: {
            name: true,
            plate: true,
          },
        },
        sensors: {
          take: 3,
          orderBy: { tireNo: 'asc' },
        },
      },
    });

    if (sampleDevice) {
      console.log('💡 Sample device details:');
      console.log(`   Device SN: ${sampleDevice.sn}`);
      console.log(`   Truck: ${sampleDevice.truck.name} (${sampleDevice.truck.plate})`);
      console.log(`   SIM: ${sampleDevice.sim_number}`);
      console.log(
        `   Battery: bat1=${sampleDevice.bat1}%, bat2=${sampleDevice.bat2}%, bat3=${sampleDevice.bat3}%`
      );
      console.log(`\n   Sample sensors:`);
      sampleDevice.sensors.forEach((s) => {
        console.log(`   • Tire ${s.tireNo}: ${s.sn}`);
      });
      console.log(`   ... and 7 more sensors`);
    }
  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedDevicesAndSensors().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
