const { PrismaClient } = require('../prisma/generated/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addMoreDriversAndVendors() {
  console.log('🌱 Adding more drivers and vendors...\n');

  try {
    // 1. Tambah 2 vendor lagi
    const vendors = [
      {
        name_vendor: 'PT Mitra Angkutan Sejahtera',
        address: 'Jl. Balikpapan Raya No. 45, Kalimantan Timur',
        email: 'info@mitrasejahtera.co.id',
        telephone: '0542-765432',
        contact_person: 'Budi Santoso',
      },
      {
        name_vendor: 'CV Transportasi Borneo',
        address: 'Jl. Samarinda Plaza No. 12, Kalimantan Timur',
        email: 'contact@borneotrans.com',
        telephone: '0542-987654',
        contact_person: 'Siti Rahayu',
      },
    ];

    const createdVendors = [];
    const existingVendor = await prisma.vendors.findFirst({
      where: { name_vendor: 'PT Simulator Transport' },
    });
    createdVendors.push(existingVendor);

    for (const vendorData of vendors) {
      let vendor = await prisma.vendors.findFirst({
        where: { name_vendor: vendorData.name_vendor },
      });

      if (!vendor) {
        vendor = await prisma.vendors.create({ data: vendorData });
        console.log(`✅ Created vendor: ${vendorData.name_vendor}`);
      } else {
        console.log(`✅ Vendor exists: ${vendorData.name_vendor}`);
      }
      createdVendors.push(vendor);
    }

    // 2. Tambah 4 driver lagi (total 5 driver untuk 5 truck)
    const drivers = [
      {
        name: 'Agus Prasetyo',
        phone: '081234567891',
        email: 'agus.prasetyo@example.com',
        license_number: 'SIM-100001',
        license_type: 'B2',
        license_expiry: new Date(2028, 5, 15),
        vendor_id: createdVendors[0].id,
        status: 'aktif',
      },
      {
        name: 'Bambang Wijaya',
        phone: '081234567892',
        email: 'bambang.wijaya@example.com',
        license_number: 'SIM-100002',
        license_type: 'B2',
        license_expiry: new Date(2029, 3, 20),
        vendor_id: createdVendors[1].id,
        status: 'aktif',
      },
      {
        name: 'Cahyo Nugroho',
        phone: '081234567893',
        email: 'cahyo.nugroho@example.com',
        license_number: 'SIM-100003',
        license_type: 'B2',
        license_expiry: new Date(2027, 8, 10),
        vendor_id: createdVendors[2].id,
        status: 'aktif',
      },
      {
        name: 'Dedi Firmansyah',
        phone: '081234567894',
        email: 'dedi.firmansyah@example.com',
        license_number: 'SIM-100004',
        license_type: 'B2',
        license_expiry: new Date(2030, 1, 25),
        vendor_id: createdVendors[1].id,
        status: 'aktif',
      },
    ];

    for (const driverData of drivers) {
      let driver = await prisma.drivers.findFirst({
        where: { license_number: driverData.license_number },
      });

      if (!driver) {
        driver = await prisma.drivers.create({ data: driverData });
        console.log(`✅ Created driver: ${driverData.name} (${driverData.license_number})`);
      } else {
        console.log(`✅ Driver exists: ${driverData.name}`);
      }
    }

    // 3. Update truck assignments dengan driver yang berbeda
    console.log('\n📋 Updating truck-driver assignments...\n');

    const trucks = await prisma.truck.findMany({
      where: {
        plate: {
          in: ['B 9001 SIM', 'B 9002 SIM', 'B 9003 SIM', 'B 9004 SIM', 'B 9005 SIM'],
        },
      },
      orderBy: { plate: 'asc' },
    });

    const allDrivers = await prisma.drivers.findMany({
      orderBy: { id: 'asc' },
    });

    for (let i = 0; i < trucks.length && i < allDrivers.length; i++) {
      await prisma.truck.update({
        where: { id: trucks[i].id },
        data: {
          driver_id: allDrivers[i].id,
          vendor_id: allDrivers[i].vendor_id,
        },
      });
      console.log(`✅ Assigned ${allDrivers[i].name} to ${trucks[i].plate}`);
    }

    console.log('\n✅ Successfully added more drivers and vendors!');
    console.log('\n📊 Summary:');
    console.log(`   Vendors: ${createdVendors.length}`);
    console.log(`   Drivers: ${allDrivers.length}`);
    console.log(`   Trucks: ${trucks.length}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addMoreDriversAndVendors();
