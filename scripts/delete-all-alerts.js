const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllAlerts() {
  try {
    console.log('🗑️  Starting to delete all alerts...\n');

    // Count alerts before deletion
    const countBefore = await prisma.alert_events.count();
    console.log(`📊 Total alerts before deletion: ${countBefore}`);

    if (countBefore === 0) {
      console.log('\n✅ No alerts to delete. Database is already clean!');
      return;
    }

    // Ask for confirmation
    console.log('\n⚠️  WARNING: This will delete ALL alert records!');
    console.log('   This action cannot be undone.\n');

    // Delete all alert_events
    const result = await prisma.alert_events.deleteMany({});

    console.log(`\n✅ Successfully deleted ${result.count} alert records!`);

    // Verify deletion
    const countAfter = await prisma.alert_events.count();
    console.log(`📊 Total alerts after deletion: ${countAfter}`);

    if (countAfter === 0) {
      console.log('\n✨ Database is now clean! All alerts have been removed.\n');
    } else {
      console.log(`\n⚠️  Warning: ${countAfter} alerts still remain in database.`);
    }

  } catch (error) {
    console.error('❌ Error deleting alerts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deleteAllAlerts()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
