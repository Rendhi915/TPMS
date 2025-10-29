const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function seedTrucksAndVendors() {
  try {
    console.log('🚀 Starting seed: 10 trucks from 2 vendors...\n');

    // 1. Create 2 Vendors
    console.log('📦 Creating vendors...');

    const vendor1 = await prisma.vendors.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name_vendor: 'PT Mitra Transportasi',
        telephone: '628111000001',
        address: 'Jl. Industri No. 123, Jakarta Utara',
        email: 'info@mitratrans.co.id',
        contact_person: 'Bapak Hendra',
      },
    });
    console.log('✅ Vendor 1:', vendor1.name_vendor);

    const vendor2 = await prisma.vendors.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name_vendor: 'CV Logistik Nusantara',
        telephone: '628222000002',
        address: 'Jl. Raya Industri No. 456, Bekasi',
        email: 'contact@logistiknusantara.com',
        contact_person: 'Ibu Sari',
      },
    });
    console.log('✅ Vendor 2:', vendor2.name_vendor);

    // 2. Create 5 Drivers
    console.log('\n👤 Creating drivers...');

    const drivers = [];
    const driverNames = [
      { name: 'Budi Santoso', license: 'B1234567890', license_type: 'B2', expiry: '2026-12-31' },
      { name: 'Ahmad Wijaya', license: 'B2345678901', license_type: 'B2', expiry: '2027-03-15' },
      { name: 'Slamet Riyadi', license: 'B3456789012', license_type: 'B2', expiry: '2026-08-20' },
      { name: 'Joko Susilo', license: 'B4567890123', license_type: 'B2', expiry: '2027-01-10' },
      { name: 'Rudi Hermawan', license: 'B5678901234', license_type: 'B2', expiry: '2026-11-05' },
    ];

    for (const driverData of driverNames) {
      // Check if driver exists
      const existing = await prisma.drivers.findFirst({
        where: { license_number: driverData.license },
      });

      if (existing) {
        drivers.push(existing);
        console.log(`⏭️  Driver exists: ${existing.name}`);
        continue;
      }

      const driver = await prisma.drivers.create({
        data: {
          name: driverData.name,
          license_number: driverData.license,
          license_type: driverData.license_type,
          license_expiry: new Date(driverData.expiry),
          phone: `62812${Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, '0')}`,
          email: `${driverData.name.toLowerCase().replace(' ', '.')}@email.com`,
          status: 'aktif',
        },
      });
      drivers.push(driver);
      console.log(`✅ Driver: ${driver.name}`);
    }

    // 3. Create 10 Trucks (all 10 wheels)
    console.log('\n🚛 Creating 10 trucks (10 wheels each)...');

    const truckData = [
      // Vendor 1 - 5 trucks
      { plate: 'B 1001 XYZ', name: 'Truck Alpha 01', vendor: vendor1 },
      { plate: 'B 1002 XYZ', name: 'Truck Alpha 02', vendor: vendor1 },
      { plate: 'B 1003 XYZ', name: 'Truck Alpha 03', vendor: vendor1 },
      { plate: 'B 1004 XYZ', name: 'Truck Alpha 04', vendor: vendor1 },
      { plate: 'B 1005 XYZ', name: 'Truck Alpha 05', vendor: vendor1 },
      // Vendor 2 - 5 trucks
      { plate: 'B 2001 ABC', name: 'Truck Beta 01', vendor: vendor2 },
      { plate: 'B 2002 ABC', name: 'Truck Beta 02', vendor: vendor2 },
      { plate: 'B 2003 ABC', name: 'Truck Beta 03', vendor: vendor2 },
      { plate: 'B 2004 ABC', name: 'Truck Beta 04', vendor: vendor2 },
      { plate: 'B 2005 ABC', name: 'Truck Beta 05', vendor: vendor2 },
    ];

    const createdTrucks = [];

    for (let i = 0; i < truckData.length; i++) {
      const data = truckData[i];
      const driver = drivers[i % drivers.length]; // Rotate drivers

      const truck = await prisma.truck.upsert({
        where: { plate: data.plate },
        update: {},
        create: {
          plate: data.plate,
          name: data.name,
          vendor_id: data.vendor.id,
          driver_id: driver.id,
          type: 'dump_truck',
          model: 'Hino Ranger',
          year: 2022 + (i % 3), // 2022, 2023, 2024
          vin: `VIN${Date.now()}${i}`,
          status: 'operational',
        },
      });

      createdTrucks.push(truck);
      console.log(`✅ Truck ${i + 1}: ${truck.plate} - ${truck.name} (${truck.type})`);
    }

    // 4. Summary
    console.log('\n📊 ===== SEED SUMMARY =====');
    console.log(`✅ Vendors created: 2`);
    console.log(`   - ${vendor1.name_vendor}`);
    console.log(`   - ${vendor2.name_vendor}`);
    console.log(`\n✅ Drivers created: ${drivers.length}`);
    drivers.forEach((d, idx) => console.log(`   ${idx + 1}. ${d.name}`));
    console.log(`\n✅ Trucks created: ${createdTrucks.length}`);
    console.log(`   - Vendor 1 (${vendor1.name_vendor}): 5 trucks`);
    console.log(`   - Vendor 2 (${vendor2.name_vendor}): 5 trucks`);
    console.log(`   - All trucks: 10 wheels (dump_truck)`);

    console.log('\n🎉 Seed completed successfully!\n');

    // Return first truck ID for testing
    console.log('💡 Sample truck_id untuk testing:');
    console.log(`   ${createdTrucks[0].id}`);
    console.log(`   (Truck: ${createdTrucks[0].plate})\n`);
  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeder
seedTrucksAndVendors()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
