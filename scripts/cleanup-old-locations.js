/**
 * CLEANUP OLD LOCATIONS
 * Hapus semua location data sebelum hari ini untuk mencegah route mixing
 * Jalankan script ini setelah device reassignment
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanupOldLocations() {
  console.log('🧹 Starting location cleanup...');
  
  try {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log(`📅 Today: ${today.toISOString()}`);
    console.log(`🔍 Checking for old location data (before today)...`);
    
    // Count old records
    const oldCount = await prisma.location.count({
      where: {
        created_at: {
          lt: today
        }
      }
    });
    
    console.log(`📊 Found ${oldCount} old location records`);
    
    if (oldCount === 0) {
      console.log('✅ No old location data to clean up');
      return;
    }
    
    // Show confirmation
    console.log('⚠️  This will DELETE all location records before today');
    console.log('⚠️  Press Ctrl+C within 5 seconds to cancel...');
    
    // Wait 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Delete old records
    console.log('🗑️  Deleting old location records...');
    const deleted = await prisma.location.deleteMany({
      where: {
        created_at: {
          lt: today
        }
      }
    });
    
    console.log(`✅ Successfully deleted ${deleted.count} old location records`);
    console.log('✅ Database cleaned! Routes should now be fresh.');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup
cleanupOldLocations()
  .then(() => {
    console.log('🎉 Cleanup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Cleanup failed:', error);
    process.exit(1);
  });
