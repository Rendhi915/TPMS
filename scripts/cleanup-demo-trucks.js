require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');

async function cleanup() {
  const prisma = new PrismaClient();

  try {
    // Find demo trucks
    const trucks = await prisma.truck.findMany({
      where: {
        name: {
          in: ['truck-spiderman', 'truck-ironman'],
        },
      },
      select: { id: true, name: true },
    });

    if (trucks.length === 0) {
      console.log('ℹ️ No demo trucks found');
      return;
    }

    console.log(`Found ${trucks.length} demo trucks:`, trucks.map((t) => t.name).join(', '));

    // Delete related data first (in correct order)
    const truckIds = trucks.map((t) => t.id);

    // Get devices
    const devices = await prisma.device.findMany({
      where: { truck_id: { in: truckIds } },
      select: { id: true, sn: true },
    });
    const deviceIds = devices.map((d) => d.id);
    console.log(`Found ${deviceIds.length} devices`);

    if (deviceIds.length > 0) {
      // Delete device assignments
      await prisma.device_truck_assignment.deleteMany({
        where: { device_id: { in: deviceIds } },
      });
      console.log('✅ Deleted device assignments');

      // Delete tire pressure events
      await prisma.tire_pressure_event.deleteMany({
        where: { device_id: { in: deviceIds } },
      });
      console.log('✅ Deleted tire pressure events');

      // Delete gps positions
      await prisma.gps_position.deleteMany({
        where: { device_id: { in: deviceIds } },
      });
      console.log('✅ Deleted GPS positions');

      // Delete devices
      await prisma.device.deleteMany({
        where: { id: { in: deviceIds } },
      });
      console.log('✅ Deleted devices');
    }

    // Delete tire position configs
    await prisma.tire_position_config.deleteMany({
      where: { truck_id: { in: truckIds } },
    });
    console.log('✅ Deleted tire position configs');

    // Delete trucks
    await prisma.truck.deleteMany({
      where: { id: { in: truckIds } },
    });
    console.log(`✅ Deleted ${trucks.length} demo trucks`);
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
