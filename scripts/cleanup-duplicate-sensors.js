const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function cleanupDuplicateSensors() {
  console.log('\n=== CLEANUP DUPLICATE SENSORS ===\n');
  console.log('Goal: Keep only 1 sensor per tire position (tireNo 1-10) per device\n');

  try {
    // Get all active devices
    const devices = await prisma.device.findMany({
      where: { status: 'active' },
      include: {
        sensor: {
          where: { status: 'active' },
          orderBy: [
            { tireNo: 'asc' },
            { id: 'asc' }, // Keep the oldest sensor (lowest ID)
          ],
        },
        truck: true,
      },
    });

    console.log(`📟 Found ${devices.length} active devices\n`);

    let totalDeleted = 0;

    for (const device of devices) {
      console.log(`\n🔧 Processing Device ${device.id} (${device.sn})`);
      console.log(`   Truck: ${device.truck?.name || device.truck?.plate}`);
      console.log(`   Current sensors: ${device.sensor.length}`);

      // Group sensors by tireNo
      const sensorsByTire = {};
      device.sensor.forEach((sensor) => {
        if (!sensorsByTire[sensor.tireNo]) {
          sensorsByTire[sensor.tireNo] = [];
        }
        sensorsByTire[sensor.tireNo].push(sensor);
      });

      // For each tire position, keep only the first sensor (oldest ID)
      const sensorsToDelete = [];

      Object.entries(sensorsByTire).forEach(([tireNo, sensors]) => {
        if (sensors.length > 1) {
          console.log(`   Tire ${tireNo}: ${sensors.length} sensors → keeping 1`);

          // Keep the first one (oldest), mark rest for deletion
          const toDelete = sensors.slice(1);
          sensorsToDelete.push(...toDelete.map((s) => s.id));

          console.log(`     ✓ Keep: Sensor ${sensors[0].id} (${sensors[0].sn})`);
          toDelete.forEach((s) => {
            console.log(`     ✗ Delete: Sensor ${s.id} (${s.sn})`);
          });
        }
      });

      if (sensorsToDelete.length > 0) {
        // Soft delete by setting status to 'inactive' and deleted_at timestamp
        const result = await prisma.sensor.updateMany({
          where: {
            id: { in: sensorsToDelete },
          },
          data: {
            status: 'inactive',
            deleted_at: new Date(),
          },
        });

        totalDeleted += result.count;
        console.log(`   ✅ Marked ${result.count} sensors as deleted`);
      } else {
        console.log(`   ✓ Already clean (10 sensors)`);
      }
    }

    console.log(`\n\n=== SUMMARY ===`);
    console.log(`Total sensors marked as deleted: ${totalDeleted}`);
    console.log(
      `Expected remaining: ${devices.length * 10} sensors (${devices.length} devices × 10 sensors)`
    );

    // Verify final count
    const finalCount = await prisma.sensor.count({
      where: { status: 'active' },
    });

    console.log(`Actual remaining: ${finalCount} active sensors`);

    if (finalCount === devices.length * 10) {
      console.log(`✅ SUCCESS! Now each device has exactly 10 sensors (1 per tire)\n`);
    } else {
      console.log(`⚠️  Warning: Expected ${devices.length * 10} but got ${finalCount}\n`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicateSensors();
