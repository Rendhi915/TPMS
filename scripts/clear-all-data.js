/**
 * Clear Master Data Only - Trucks, Devices, Sensors
 * 
 * ✅ KEEPS HISTORY DATA (location, sensor_history, alert_events)
 * History data tetap aman karena menggunakan snapshot fields
 * 
 * Use this for fresh start simulation without losing historical tracking data
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function clearMasterData() {
  try {
    console.log('🧹 Clearing master data only (preserving history)...\n');

    // Delete master data in correct order (respect foreign key constraints)
    // History data (location, sensor_history, alert_events) TIDAK DIHAPUS
    // karena sudah ada snapshot fields dan foreign key SetNull
    
    // 1. Delete sensors (depends on device)
    const sensors = await prisma.sensor.deleteMany({});
    console.log(`✅ Deleted ${sensors.count} sensor records (master data)`);

    // 2. Delete devices (depends on truck)
    const devices = await prisma.device.deleteMany({});
    console.log(`✅ Deleted ${devices.count} device records (master data)`);

    // 3. Delete trucks
    const trucks = await prisma.truck.deleteMany({});
    console.log(`✅ Deleted ${trucks.count} truck records (master data)`);

    // Check history data yang masih tersimpan
    const historyCount = await prisma.sensor_history.count();
    const locationCount = await prisma.location.count();
    const alertCount = await prisma.alert_events.count();

    console.log('\n🎉 Master data cleared successfully!');
    console.log('📊 Summary:');
    console.log(`   ❌ Deleted - Trucks: ${trucks.count}`);
    console.log(`   ❌ Deleted - Devices: ${devices.count}`);
    console.log(`   ❌ Deleted - Sensors: ${sensors.count}`);
    console.log(`   ✅ Preserved - Sensor History: ${historyCount}`);
    console.log(`   ✅ Preserved - Locations: ${locationCount}`);
    console.log(`   ✅ Preserved - Alert Events: ${alertCount}`);
    console.log(`   ✅ Preserved - Sensor History: ${historyCount}`);
    console.log(`   ✅ Preserved - Locations: ${locationCount}`);
    console.log(`   ✅ Preserved - Alert Events: ${alertCount}`);
    console.log('\n💡 History data tetap tersimpan dan dapat dilihat di History Tracking!');
    
  } catch (error) {
    console.error('❌ Error clearing master data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
clearMasterData()
  .then(() => {
    console.log('\n✨ Database ready for fresh master data with preserved history!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to clear master data:', error);
    process.exit(1);
  });
