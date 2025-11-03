const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed dummy data...');

  try {
    // 1. Buat 5 Vendors
    console.log('🏢 Creating 5 vendors...');
    const vendors = [];
    const vendorNames = [
      'PT Sumber Jaya',
      'PT Mitra Abadi',
      'CV Karya Mandiri',
      'PT Sentosa Transport',
      'CV Buana Raya',
    ];

    for (let i = 1; i <= 5; i++) {
      const vendor = await prisma.vendors.create({
        data: {
          name_vendor: vendorNames[i - 1],
          address: `Jl. Industri No. ${i * 10}, Jakarta`,
          email: `vendor${i}@example.com`,
          telephone: `021-${5000000 + i}`,
          contact_person: `Contact Person ${i}`,
        },
      });
      vendors.push(vendor);
      console.log(`  ✓ Created vendor ${vendor.name_vendor}`);
    }

    // 2. Buat 10 Drivers
    console.log('\n👤 Creating 10 drivers...');
    const drivers = [];
    const licenseTypes = ['B1', 'B2'];

    for (let i = 1; i <= 10; i++) {
      const driver = await prisma.drivers.create({
        data: {
          name: `Driver ${String(i).padStart(2, '0')}`,
          phone: `0812${String(10000000 + i)}`,
          email: `driver${i}@example.com`,
          license_number: `LIC-${String(i).padStart(6, '0')}`,
          license_type: licenseTypes[i % 2],
          license_expiry: new Date(2025 + Math.floor(i / 2), 11, 31), // Expired 2025-2029
          vendor_id: vendors[i % 5].id, // Distribute drivers across vendors
          status: 'aktif',
        },
      });
      drivers.push(driver);
      console.log(`  ✓ Created driver ${driver.name} → ${vendors[i % 5].name_vendor}`);
    }

    // 3. Buat 10 Truck
    console.log('\n📦 Creating 10 trucks...');
    const trucks = [];
    for (let i = 1; i <= 10; i++) {
      const truck = await prisma.truck.create({
        data: {
          vin: `VIN${String(i).padStart(14, '0')}`, // VIN00000000000001, dst
          name: `Truck ${String(i).padStart(2, '0')}`, // Truck 01, Truck 02, dst
          plate: `B ${1000 + i} ABC`, // B 1001 ABC, B 1002 ABC, dst
          model: i % 2 === 0 ? 'Hino Ranger' : 'Mitsubishi Fuso',
          type: 'Dump Truck',
          year: 2020 + (i % 5), // 2020-2024
          status: 'active',
          vendor_id: vendors[i % 5].id, // Assign to vendor
          driver_id: drivers[i - 1].id, // Each truck has one driver
        },
      });
      trucks.push(truck);
      console.log(
        `  ✓ Created truck ${truck.name} - ${truck.plate} → Driver: ${drivers[i - 1].name}, Vendor: ${vendors[i % 5].name_vendor}`
      );
    }

    // 2. Buat 2 Device
    console.log('\n📱 Creating 2 devices...');
    const devices = [];
    for (let i = 1; i <= 2; i++) {
      const device = await prisma.device.create({
        data: {
          sn: `DEV-SN-${String(i).padStart(4, '0')}`, // DEV-SN-0001, DEV-SN-0002
          sim_number: `628${String(1000000000 + i)}`, // 6281000000001, 6281000000002
          truck_id: trucks[i - 1].id, // Device 1 → Truck 1, Device 2 → Truck 2
          status: 'active',
          lock: 0,
        },
      });
      devices.push(device);
      console.log(`  ✓ Created device ${device.sn} → Truck ${trucks[i - 1].name}`);
    }

    // 3. Buat Sensor untuk setiap truck (10 roda per truck)
    console.log('\n🔧 Creating 100 sensors (10 trucks × 10 wheels)...');
    let sensorCount = 0;

    for (let truckIndex = 0; truckIndex < trucks.length; truckIndex++) {
      const truck = trucks[truckIndex];
      // Assign device: truck 1-5 → device 1, truck 6-10 → device 2
      const device = truckIndex < 5 ? devices[0] : devices[1];

      for (let wheelIndex = 0; wheelIndex < 10; wheelIndex++) {
        const sensorNumber = truckIndex * 10 + wheelIndex + 1;
        const tireNo = wheelIndex + 1; // 1-10

        const sensor = await prisma.sensor.create({
          data: {
            sn: `SN-${String(sensorNumber).padStart(4, '0')}`, // SN-0001 sampai SN-0100
            tireNo: tireNo,
            sensorNo: wheelIndex + 1,
            simNumber: device.sim_number,
            sensor_lock: 0,
            status: 'active',
            device_id: device.id,
            // Initialize dengan data dummy
            tempValue: 25.0 + Math.random() * 10, // 25-35°C
            tirepValue: 32.0 + Math.random() * 8, // 32-40 PSI
            exType: 'normal',
            bat: 80 + Math.floor(Math.random() * 20), // 80-100%
          },
        });
        sensorCount++;

        if (sensorCount % 10 === 0) {
          console.log(`  ✓ Created ${sensorCount} sensors (Truck ${truck.name} completed)`);
        }
      }
    }

    console.log('\n📊 Summary:');
    console.log(`  ✓ Total Vendors: ${vendors.length}`);
    console.log(`  ✓ Total Drivers: ${drivers.length}`);
    console.log(`  ✓ Total Trucks: ${trucks.length}`);
    console.log(`  ✓ Total Devices: ${devices.length}`);
    console.log(`  ✓ Total Sensors: ${sensorCount}`);
    console.log('\n🎉 Seed dummy data completed successfully!');

    // Tampilkan relasi
    console.log('\n🔗 Relations Summary:');
    console.log('\n📋 Vendors → Drivers:');
    for (const vendor of vendors) {
      const driverCount = await prisma.drivers.count({
        where: { vendor_id: vendor.id },
      });
      console.log(`  ${vendor.name_vendor}: ${driverCount} drivers`);
    }

    console.log('\n🚛 Trucks → Drivers → Vendors:');
    for (let i = 0; i < Math.min(trucks.length, 5); i++) {
      const truck = trucks[i];
      const driver = drivers.find((d) => d.id === truck.driver_id);
      const vendor = vendors.find((v) => v.id === truck.vendor_id);
      console.log(`  ${truck.name} → Driver: ${driver?.name}, Vendor: ${vendor?.name_vendor}`);
    }
    console.log('  ... (5 more trucks)');

    console.log('\n📱 Device → Truck Relations:');
    for (const device of devices) {
      const relatedTruck = trucks.find((t) => t.id === device.truck_id);
      const sensorCount = await prisma.sensor.count({
        where: { device_id: device.id },
      });
      console.log(`  ${device.sn} → ${relatedTruck.name} (${sensorCount} sensors)`);
    }
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
