const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

// Helper functions
const randomBattery = () => Math.floor(Math.random() * (100 - 70) + 70);
const randomTemp = () => parseFloat((Math.random() * (45 - 25) + 25).toFixed(1));
const randomPressure = () => parseFloat((Math.random() * (40 - 30) + 30).toFixed(1));

async function seed2DevicesAndSensors() {
  console.log('\n🚀 Starting seed: 2 Devices & Sensors\n');

  try {
    // 1. Buat atau ambil vendor
    let vendor = await prisma.vendors.findFirst({
      where: { name_vendor: 'PT Angkutan Maju' },
    });

    if (!vendor) {
      vendor = await prisma.vendors.create({
        data: {
          name_vendor: 'PT Angkutan Maju',
          address: 'Jl. Raya Industri No. 123, Jakarta',
          telephone: '021-12345678',
          email: 'info@angkutanmaju.co.id',
          contact_person: 'Budi Santoso',
        },
      });
      console.log(`✅ Vendor created: ${vendor.name_vendor}`);
    } else {
      console.log(`✅ Vendor found: ${vendor.name_vendor}`);
    }

    // 2. Buat atau ambil driver
    const drivers = [];
    const driverData = [
      {
        name: 'Ahmad Hidayat',
        phone: '081234567890',
        email: 'ahmad.hidayat@email.com',
        license_number: 'SIM-001-2024',
        license_type: 'B2',
        license_expiry: new Date('2026-12-31'),
      },
      {
        name: 'Budi Rahmat',
        phone: '081234567891',
        email: 'budi.rahmat@email.com',
        license_number: 'SIM-002-2024',
        license_type: 'B2',
        license_expiry: new Date('2026-11-30'),
      },
    ];

    for (const driverInfo of driverData) {
      let driver = await prisma.drivers.findFirst({
        where: { license_number: driverInfo.license_number },
      });

      if (!driver) {
        driver = await prisma.drivers.create({
          data: {
            ...driverInfo,
            vendor_id: vendor.id,
            status: 'aktif',
          },
        });
        console.log(`✅ Driver created: ${driver.name}`);
      } else {
        console.log(`✅ Driver found: ${driver.name}`);
      }
      drivers.push(driver);
    }

    // 3. Buat 2 truck
    const truckData = [
      {
        name: 'Dump Truck DT-001',
        year: 2023,
        model: 'Hino FM 260 JD',
        type: 'Dump Truck 10 Roda',
        vin: 'HINO2023DT001',
        plate: 'B 1234 XY',
        status: 'active',
      },
      {
        name: 'Dump Truck DT-002',
        year: 2023,
        model: 'Mitsubishi Fuso FJ2528',
        type: 'Dump Truck 10 Roda',
        vin: 'FUSO2023DT002',
        plate: 'B 5678 XY',
        status: 'active',
      },
    ];

    const trucks = [];
    for (let i = 0; i < truckData.length; i++) {
      let truck = await prisma.truck.findFirst({
        where: { vin: truckData[i].vin },
      });

      if (!truck) {
        truck = await prisma.truck.create({
          data: {
            ...truckData[i],
            vendor_id: vendor.id,
            driver_id: drivers[i].id,
          },
        });
        console.log(`✅ Truck created: ${truck.name} (${truck.plate})`);
      } else {
        console.log(`✅ Truck found: ${truck.name} (${truck.plate})`);
      }
      trucks.push(truck);
    }

    console.log('\n');

    // 4. Buat 2 device dengan sensors
    let deviceCount = 0;
    let sensorCount = 0;

    for (let i = 0; i < trucks.length; i++) {
      const truck = trucks[i];
      const deviceSerialNumber = `DEV-${String(i + 1).padStart(3, '0')}`;
      const simNumber = `6281234567${String(i).padStart(2, '0')}`;

      console.log(`📱 Processing Device ${i + 1} for: ${truck.name}`);

      // Check if device already exists
      let device = await prisma.device.findFirst({
        where: { truck_id: truck.id },
      });

      if (!device) {
        // Buat device
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
            installed_at: new Date(),
          },
        });
        deviceCount++;
        console.log(`   ✅ Device created: ${device.sn}`);
      } else {
        console.log(`   ⏭️  Device already exists: ${device.sn}`);
      }

      // Buat 10 sensors untuk setiap device
      const existingSensorsCount = await prisma.sensor.count({
        where: { device_id: device.id },
      });

      if (existingSensorsCount >= 10) {
        console.log(`   ⏭️  Sensors already exist (${existingSensorsCount} sensors)`);
      } else {
        // Hapus sensor yang ada jika kurang dari 10
        if (existingSensorsCount > 0) {
          await prisma.sensor.deleteMany({
            where: { device_id: device.id },
          });
          console.log(`   🗑️  Deleted ${existingSensorsCount} existing sensors`);
        }

        console.log(`   🔧 Creating 10 sensors for device ${device.sn}...`);

        for (let tireNo = 1; tireNo <= 10; tireNo++) {
          const sensorSerialNumber = `${deviceSerialNumber}-S${String(tireNo).padStart(2, '0')}`;

          await prisma.sensor.create({
            data: {
              sn: sensorSerialNumber,
              device_id: device.id,
              tireNo: tireNo,
              simNumber: simNumber,
              sensorNo: tireNo,
              sensor_lock: 0,
              status: 'active',
              // Data sensor awal
              tempValue: randomTemp(),
              tirepValue: randomPressure(),
              exType: 'normal',
              bat: randomBattery(),
            },
          });
          sensorCount++;
        }
        console.log(`   ✅ 10 sensors created for Tire 1-10`);
      }

      // Buat initial location untuk device
      const existingLocation = await prisma.location.findFirst({
        where: { device_id: device.id },
      });

      if (!existingLocation) {
        await prisma.location.create({
          data: {
            device_id: device.id,
            lat: -6.2 + (i * 0.01),
            long: 106.8 + (i * 0.01),
            recorded_at: new Date(),
          },
        });
        console.log(`   ✅ Initial location created`);
      }

      console.log('');
    }

    // 5. Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SEED SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Vendor: ${vendor.name_vendor}`);
    console.log(`✅ Drivers created/found: ${drivers.length}`);
    console.log(`✅ Trucks created/found: ${trucks.length}`);
    console.log(`✅ Devices created: ${deviceCount}`);
    console.log(`✅ Sensors created: ${sensorCount}`);
    console.log('');
    console.log('📝 Details:');
    console.log(`   • Each truck has 1 device`);
    console.log(`   • Each device has 10 sensors (for 10 wheels)`);
    console.log(`   • Total tire sensors: 20`);
    console.log('');

    // 6. Show detailed information
    console.log('='.repeat(50));
    console.log('🔍 DETAILED DEVICE & SENSOR INFO');
    console.log('='.repeat(50));

    for (let i = 0; i < trucks.length; i++) {
      const deviceWithDetails = await prisma.device.findFirst({
        where: { truck_id: trucks[i].id },
        include: {
          truck: {
            select: {
              name: true,
              plate: true,
              vin: true,
            },
          },
          sensors: {
            orderBy: { tireNo: 'asc' },
          },
        },
      });

      if (deviceWithDetails) {
        console.log(`\n📱 Device ${i + 1}:`);
        console.log(`   Serial Number: ${deviceWithDetails.sn}`);
        console.log(`   SIM Number: ${deviceWithDetails.sim_number}`);
        console.log(`   Truck: ${deviceWithDetails.truck.name}`);
        console.log(`   Plate: ${deviceWithDetails.truck.plate}`);
        console.log(`   VIN: ${deviceWithDetails.truck.vin}`);
        console.log(`   Battery: BAT1=${deviceWithDetails.bat1}%, BAT2=${deviceWithDetails.bat2}%, BAT3=${deviceWithDetails.bat3}%`);
        console.log(`   Status: ${deviceWithDetails.status}`);
        console.log(`\n   🔧 Sensors (${deviceWithDetails.sensors.length} total):`);

        deviceWithDetails.sensors.forEach((sensor) => {
          console.log(`      • Tire ${sensor.tireNo}: ${sensor.sn}`);
          console.log(`        Temp: ${sensor.tempValue}°C | Pressure: ${sensor.tirepValue} PSI | Battery: ${sensor.bat}%`);
        });
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Seed completed successfully!');
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seed2DevicesAndSensors().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
