/**
 * Cleanup Location History Data
 * Menghapus semua data location dan location_history sebelumnya
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function cleanupLocationData() {
  console.log('🗑️  Starting location data cleanup...\n');

  try {
    // 1. Delete all sensor_history data (has foreign key to location)
    console.log('📍 Deleting sensor_history data...');
    const deletedSensorHistory = await prisma.sensor_history.deleteMany({});
    console.log(`✅ Deleted ${deletedSensorHistory.count} sensor_history records`);

    // 2. Delete all location data
    console.log('📍 Deleting location data...');
    const deletedLocation = await prisma.location.deleteMany({});
    console.log(`✅ Deleted ${deletedLocation.count} location records`);

    // 3. Verify cleanup
    console.log('\n🔍 Verifying cleanup...');
    const remainingSensorHistory = await prisma.sensor_history.count();
    const remainingLocation = await prisma.location.count();
    
    console.log(`   sensor_history remaining: ${remainingSensorHistory}`);
    console.log(`   location remaining: ${remainingLocation}`);

    if (remainingSensorHistory === 0 && remainingLocation === 0) {
      console.log('\n✅ Cleanup completed successfully!');
      console.log('   All location data has been removed.');
      console.log('   Ready for new simulator data from PT BORNEO INDOBARA area.');
    } else {
      console.log('\n⚠️  Warning: Some records still remain');
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup
cleanupLocationData()
  .then(() => {
    console.log('\n🎉 Cleanup script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Cleanup script failed:', error);
    process.exit(1);
  });
