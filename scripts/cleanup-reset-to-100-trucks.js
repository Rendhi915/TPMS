// Script to clean up database and keep only 100 trucks for development
const { PrismaClient } = require('../prisma/generated/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getDatabaseStats() {
  const stats = {
    trucks: await prisma.truck.count(),
    devices: await prisma.device.count(),
    sensors: await prisma.sensor.count(),
    tirePressure: await prisma.tire_pressure_event.count(),
    gps: await prisma.gps_position.count(),
    alerts: await prisma.alert_event.count(),
    sensorRaw: await prisma.sensor_data_raw.count(),
    hubTemp: await prisma.hub_temperature_event.count(),
    fuel: await prisma.fuel_level_event.count(),
    vendors: await prisma.vendors.count(),
    drivers: await prisma.drivers.count(),
  };
  return stats;
}

function displayStats(stats, label) {
  console.log(`\n${label}:`);
  console.log('─'.repeat(50));
  console.log(`  Trucks:              ${stats.trucks.toLocaleString()}`);
  console.log(`  Devices:             ${stats.devices.toLocaleString()}`);
  console.log(`  Sensors:             ${stats.sensors.toLocaleString()}`);
  console.log(`  Tire Pressure:       ${stats.tirePressure.toLocaleString()}`);
  console.log(`  GPS Positions:       ${stats.gps.toLocaleString()}`);
  console.log(`  Hub Temperature:     ${stats.hubTemp.toLocaleString()}`);
  console.log(`  Fuel Events:         ${stats.fuel.toLocaleString()}`);
  console.log(`  Alerts:              ${stats.alerts.toLocaleString()}`);
  console.log(`  Sensor Raw Data:     ${stats.sensorRaw.toLocaleString()}`);
  console.log(`  Vendors:             ${stats.vendors.toLocaleString()}`);
  console.log(`  Drivers:             ${stats.drivers.toLocaleString()}`);
  
  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
  console.log('─'.repeat(50));
  console.log(`  TOTAL RECORDS:       ${total.toLocaleString()}`);
}

async function cleanupStrategy1_KeepFirst100() {
  console.log('\n🎯 STRATEGY 1: Keep First 50 Trucks (0001-0050)\n');
  console.log('This will:');
  console.log('  ✅ Keep trucks with codes 0001-0050');
  console.log('  ✅ Keep all their related data (devices, sensors, telemetry)');
  console.log('  ✅ Keep all vendors and drivers (for future assignment)');
  console.log('  ❌ Delete trucks 0051-1000 and their data');
  
  const answer = await question('\nProceed with this strategy? (yes/no): ');
  
  if (answer.toLowerCase() !== 'yes') {
    console.log('❌ Cancelled.');
    return false;
  }

  console.log('\n🔄 Starting cleanup process...\n');

  try {
    // Get truck IDs to delete (0051-1000)
    const trucksToDelete = await prisma.truck.findMany({
      where: {
        OR: [
          { code: { gte: '0051' } },
          { code: { gt: '1000' } },
        ]
      },
      select: { id: true, code: true }
    });

    const truckIdsToDelete = trucksToDelete.map(t => t.id);
    console.log(`📍 Found ${truckIdsToDelete.length} trucks to delete (codes ${trucksToDelete[0]?.code} to ${trucksToDelete[trucksToDelete.length - 1]?.code})`);

    if (truckIdsToDelete.length === 0) {
      console.log('✅ No trucks to delete. Database already clean!');
      return true;
    }

    // Delete in correct order (child tables first)
    let deletedCount = 0;

    console.log('\n🗑️  Deleting related data...');

    // 1. Delete tire_pressure_event
    console.log('   - Deleting tire pressure events...');
    const delTirePressure = await prisma.tire_pressure_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delTirePressure.count;
    console.log(`     ✓ Deleted ${delTirePressure.count} tire pressure events`);

    // 2. Delete gps_position
    console.log('   - Deleting GPS positions...');
    const delGPS = await prisma.gps_position.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delGPS.count;
    console.log(`     ✓ Deleted ${delGPS.count} GPS positions`);

    // 3. Delete hub_temperature_event
    console.log('   - Deleting hub temperature events...');
    const delHubTemp = await prisma.hub_temperature_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delHubTemp.count;
    console.log(`     ✓ Deleted ${delHubTemp.count} hub temperature events`);

    // 4. Delete fuel_level_event
    console.log('   - Deleting fuel level events...');
    const delFuel = await prisma.fuel_level_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delFuel.count;
    console.log(`     ✓ Deleted ${delFuel.count} fuel level events`);

    // 5. Delete alert_event
    console.log('   - Deleting alert events...');
    const delAlerts = await prisma.alert_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delAlerts.count;
    console.log(`     ✓ Deleted ${delAlerts.count} alert events`);

    // 6. Delete speed_event
    console.log('   - Deleting speed events...');
    const delSpeed = await prisma.speed_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delSpeed.count;
    console.log(`     ✓ Deleted ${delSpeed.count} speed events`);

    // 7. Delete device_status_event
    console.log('   - Deleting device status events...');
    const delDeviceStatus = await prisma.device_status_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delDeviceStatus.count;
    console.log(`     ✓ Deleted ${delDeviceStatus.count} device status events`);

    // 8. Delete sensor_data_raw
    console.log('   - Deleting sensor raw data...');
    const delSensorRaw = await prisma.sensor_data_raw.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delSensorRaw.count;
    console.log(`     ✓ Deleted ${delSensorRaw.count} sensor raw data`);

    // 9. Delete daily_route
    console.log('   - Deleting daily routes...');
    const delDailyRoute = await prisma.daily_route.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delDailyRoute.count;
    console.log(`     ✓ Deleted ${delDailyRoute.count} daily routes`);

    // 10. Delete device_truck_assignment
    console.log('   - Deleting device truck assignments...');
    const delAssignments = await prisma.device_truck_assignment.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delAssignments.count;
    console.log(`     ✓ Deleted ${delAssignments.count} device assignments`);

    // 11. Get device IDs for these trucks
    const devicesToDelete = await prisma.device.findMany({
      where: { truck_id: { in: truckIdsToDelete } },
      select: { id: true }
    });
    const deviceIdsToDelete = devicesToDelete.map(d => d.id);

    if (deviceIdsToDelete.length > 0) {
      // 12. Delete sensors
      console.log('   - Deleting sensors...');
      const delSensors = await prisma.sensor.deleteMany({
        where: { device_id: { in: deviceIdsToDelete } }
      });
      deletedCount += delSensors.count;
      console.log(`     ✓ Deleted ${delSensors.count} sensors`);

      // 13. Delete devices
      console.log('   - Deleting devices...');
      const delDevices = await prisma.device.deleteMany({
        where: { id: { in: deviceIdsToDelete } }
      });
      deletedCount += delDevices.count;
      console.log(`     ✓ Deleted ${delDevices.count} devices`);
    }

    // 14. Finally, delete trucks
    console.log('   - Deleting trucks...');
    const delTrucks = await prisma.truck.deleteMany({
      where: { id: { in: truckIdsToDelete } }
    });
    deletedCount += delTrucks.count;
    console.log(`     ✓ Deleted ${delTrucks.count} trucks`);

    console.log(`\n✅ Cleanup completed! Total ${deletedCount.toLocaleString()} records deleted.`);
    return true;

  } catch (error) {
    console.error('\n❌ Error during cleanup:', error.message);
    throw error;
  }
}

async function cleanupStrategy2_DeleteAll() {
  console.log('\n🎯 STRATEGY 2: Delete ALL Data (Complete Reset)\n');
  console.log('This will:');
  console.log('  ❌ Delete ALL trucks (0001-1000+)');
  console.log('  ❌ Delete ALL devices, sensors, and telemetry data');
  console.log('  ⚠️  Keep vendors and drivers for future use');
  console.log('  ⚠️  You will need to re-seed data after this');
  
  const answer = await question('\n⚠️  Are you ABSOLUTELY SURE? This cannot be undone! (type "DELETE ALL" to confirm): ');
  
  if (answer !== 'DELETE ALL') {
    console.log('❌ Cancelled. Safe choice!');
    return false;
  }

  console.log('\n🔄 Starting complete reset...\n');

  try {
    let deletedCount = 0;

    // Delete all telemetry data first
    console.log('🗑️  Deleting ALL telemetry data...');
    
    const delTirePressure = await prisma.tire_pressure_event.deleteMany({});
    deletedCount += delTirePressure.count;
    console.log(`   ✓ Deleted ${delTirePressure.count} tire pressure events`);

    const delGPS = await prisma.gps_position.deleteMany({});
    deletedCount += delGPS.count;
    console.log(`   ✓ Deleted ${delGPS.count} GPS positions`);

    const delHubTemp = await prisma.hub_temperature_event.deleteMany({});
    deletedCount += delHubTemp.count;
    console.log(`   ✓ Deleted ${delHubTemp.count} hub temperature events`);

    const delFuel = await prisma.fuel_level_event.deleteMany({});
    deletedCount += delFuel.count;
    console.log(`   ✓ Deleted ${delFuel.count} fuel level events`);

    const delAlerts = await prisma.alert_event.deleteMany({});
    deletedCount += delAlerts.count;
    console.log(`   ✓ Deleted ${delAlerts.count} alert events`);

    const delSpeed = await prisma.speed_event.deleteMany({});
    deletedCount += delSpeed.count;
    console.log(`   ✓ Deleted ${delSpeed.count} speed events`);

    const delDeviceStatus = await prisma.device_status_event.deleteMany({});
    deletedCount += delDeviceStatus.count;
    console.log(`   ✓ Deleted ${delDeviceStatus.count} device status events`);

    const delSensorRaw = await prisma.sensor_data_raw.deleteMany({});
    deletedCount += delSensorRaw.count;
    console.log(`   ✓ Deleted ${delSensorRaw.count} sensor raw data`);

    const delDailyRoute = await prisma.daily_route.deleteMany({});
    deletedCount += delDailyRoute.count;
    console.log(`   ✓ Deleted ${delDailyRoute.count} daily routes`);

    const delAssignments = await prisma.device_truck_assignment.deleteMany({});
    deletedCount += delAssignments.count;
    console.log(`   ✓ Deleted ${delAssignments.count} device assignments`);

    const delSensors = await prisma.sensor.deleteMany({});
    deletedCount += delSensors.count;
    console.log(`   ✓ Deleted ${delSensors.count} sensors`);

    const delDevices = await prisma.device.deleteMany({});
    deletedCount += delDevices.count;
    console.log(`   ✓ Deleted ${delDevices.count} devices`);

    const delTrucks = await prisma.truck.deleteMany({});
    deletedCount += delTrucks.count;
    console.log(`   ✓ Deleted ${delTrucks.count} trucks`);

    console.log(`\n✅ Complete reset done! Total ${deletedCount.toLocaleString()} records deleted.`);
    console.log('📝 Vendors and drivers are preserved for future use.\n');
    return true;

  } catch (error) {
    console.error('\n❌ Error during reset:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('\n🚛 TPMS DATABASE CLEANUP TOOL');
    console.log('='.repeat(60));

    // Show current stats
    const beforeStats = await getDatabaseStats();
    displayStats(beforeStats, '📊 CURRENT DATABASE STATE');

    console.log('\n\n🎯 CLEANUP OPTIONS:\n');
    console.log('1. Keep First 50 Trucks (0001-0050) - Recommended for Development');
    console.log('2. Delete ALL Data (Complete Reset)');
    console.log('3. Cancel (No changes)');

    const choice = await question('\nSelect option (1/2/3): ');

    let success = false;
    switch (choice) {
      case '1':
        success = await cleanupStrategy1_KeepFirst100();
        break;
      case '2':
        success = await cleanupStrategy2_DeleteAll();
        break;
      case '3':
        console.log('\n✅ No changes made. Exiting...\n');
        return;
      default:
        console.log('\n❌ Invalid option. Exiting...\n');
        return;
    }

    if (success) {
      // Show final stats
      const afterStats = await getDatabaseStats();
      displayStats(afterStats, '\n📊 FINAL DATABASE STATE');

      // Show difference
      console.log('\n📉 CLEANUP SUMMARY:');
      console.log('─'.repeat(50));
      console.log(`  Trucks removed:          ${(beforeStats.trucks - afterStats.trucks).toLocaleString()}`);
      console.log(`  Telemetry data removed:  ${(beforeStats.tirePressure + beforeStats.gps + beforeStats.fuel - afterStats.tirePressure - afterStats.gps - afterStats.fuel).toLocaleString()}`);
      console.log(`  Total records removed:   ${(Object.values(beforeStats).reduce((a,b)=>a+b,0) - Object.values(afterStats).reduce((a,b)=>a+b,0)).toLocaleString()}`);

      console.log('\n✅ Database is now optimized for development with 50 trucks!\n');
      console.log('📝 Next steps:');
      console.log('   1. Verify data with: node scripts/check-database-stats.js');
      console.log('   2. Test your APIs with the remaining 50 trucks');
      console.log('   3. When ready to scale, increase gradually\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', async () => {
  console.log('\n\n⚠️  Interrupted by user. Exiting...\n');
  rl.close();
  await prisma.$disconnect();
  process.exit(0);
});

main();
