const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkCurrentData() {
  console.log('\n=== CURRENT DATA STRUCTURE ===\n');

  // Check trucks
  const trucks = await prisma.truck.findMany({
    where: { status: 'active' },
    include: {
      device: true,
    },
  });

  console.log(`📦 Total Active Trucks: ${trucks.length}`);
  trucks.forEach((truck) => {
    console.log(`  Truck ${truck.id}: ${truck.name || truck.license_plate}`);
    console.log(`    Devices: ${truck.device.length}`);
    truck.device.forEach((dev) => {
      console.log(`      - Device ${dev.id}: ${dev.sn}`);
    });
  });

  // Check devices with sensor count
  const devices = await prisma.device.findMany({
    where: { status: 'active' },
    include: {
      sensor: {
        where: { status: 'active' },
      },
      truck: true,
    },
  });

  console.log(`\n📟 Total Active Devices: ${devices.length}`);
  devices.forEach((dev) => {
    console.log(
      `  Device ${dev.id} (${dev.sn}) - Truck: ${dev.truck?.name || dev.truck?.license_plate}`
    );
    console.log(`    Total sensors: ${dev.sensor.length}`);

    // Group by tireNo
    const byTire = {};
    dev.sensor.forEach((s) => {
      byTire[s.tireNo] = (byTire[s.tireNo] || 0) + 1;
    });

    console.log(`    Distribution:`, byTire);
  });

  // Check total sensors
  const totalSensors = await prisma.sensor.count({
    where: { status: 'active' },
  });

  console.log(`\n🔧 Total Active Sensors: ${totalSensors}`);

  await prisma.$disconnect();
}

checkCurrentData().catch(console.error);
