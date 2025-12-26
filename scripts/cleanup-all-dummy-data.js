const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

/**
 * CLEANUP ALL DUMMY DATA
 * Hapus semua data dummy untuk fresh start dengan simulator baru
 */

async function cleanupAllData() {
  try {
    console.log('🗑️  Starting cleanup of all dummy data...\n');

    // 1. Hapus sensor_history
    console.log('📋 Deleting sensor_history records...');
    const deletedSensorHistory = await prisma.sensor_history.deleteMany({});
    console.log(`   ✅ Deleted ${deletedSensorHistory.count} sensor_history records\n`);

    // 2. Hapus location
    console.log('📍 Deleting location records...');
    const deletedLocations = await prisma.location.deleteMany({});
    console.log(`   ✅ Deleted ${deletedLocations.count} location records\n`);

    // 3. Reset sensor values (set to default/null)
    console.log('🔧 Resetting sensor values to default...');
    const resetSensors = await prisma.sensor.updateMany({
      where: { deleted_at: null },
      data: {
        tempValue: 35.0,
        tirepValue: 95.0,
        exType: 'normal',
        bat: 85
      }
    });
    console.log(`   ✅ Reset ${resetSensors.count} sensors to default values\n`);

    // 4. Hapus alert_events dummy
    console.log('🚨 Deleting alert_events...');
    const deletedAlerts = await prisma.alert_events.deleteMany({});
    console.log(`   ✅ Deleted ${deletedAlerts.count} alert_events\n`);

    // 5. Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CLEANUP COMPLETED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log(`   - Sensor History: ${deletedSensorHistory.count} records deleted`);
    console.log(`   - Locations: ${deletedLocations.count} records deleted`);
    console.log(`   - Sensors: ${resetSensors.count} reset to default`);
    console.log(`   - Alerts: ${deletedAlerts.count} deleted`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🎯 Database is now clean and ready for new simulator!\n');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup
cleanupAllData()
  .then(() => {
    console.log('✅ Cleanup script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Cleanup script failed:', error);
    process.exit(1);
  });
