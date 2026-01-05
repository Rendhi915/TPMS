/**
 * UPDATE OLD LOCATION DATA
 * Set truck_id untuk semua location yang masih NULL
 * Ambil truck_id dari device.truck_id saat location dibuat
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function updateOldLocationData() {
  console.log('🔧 Updating old location data with truck_id...');
  
  try {
    // Get all locations with NULL truck_id
    const locationsWithoutTruck = await prisma.location.count({
      where: {
        truck_id: null
      }
    });
    
    console.log(`📊 Found ${locationsWithoutTruck} locations without truck_id`);
    
    if (locationsWithoutTruck === 0) {
      console.log('✅ No locations to update');
      return;
    }
    
    // Get all devices with their truck_id
    const devices = await prisma.device.findMany({
      where: {
        deleted_at: null
      },
      select: {
        id: true,
        truck_id: true
      }
    });
    
    console.log(`📦 Found ${devices.length} active devices`);
    
    // Update locations for each device
    let totalUpdated = 0;
    
    for (const device of devices) {
      const updated = await prisma.location.updateMany({
        where: {
          device_id: device.id,
          truck_id: null
        },
        data: {
          truck_id: device.truck_id
        }
      });
      
      if (updated.count > 0) {
        console.log(`✅ Device ${device.id}: Updated ${updated.count} locations with truck_id ${device.truck_id}`);
        totalUpdated += updated.count;
      }
    }
    
    console.log(`\n🎉 Total updated: ${totalUpdated} locations`);
    console.log('✅ All old location data now has truck_id!');
    
  } catch (error) {
    console.error('❌ Error updating location data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run update
updateOldLocationData()
  .then(() => {
    console.log('\n✅ Update completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Update failed:', error);
    process.exit(1);
  });
