// Auto-run cleanup option 1 (Keep First 50 Trucks)
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

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

async function cleanupKeepFirst50() {
  console.log('\n🎯 CLEANUP: Keep First 50 Trucks (0001-0050)\n');
  
  try {
    // Get truck IDs to delete (0051-1000+)
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
    console.log(`📍 Found ${truckIdsToDelete.length} trucks to delete`);

    if (truckIdsToDelete.length === 0) {
      console.log('✅ No trucks to delete. Database already has 50 or fewer trucks!');
      return true;
    }

    console.log(`   First truck to delete: ${trucksToDelete[0]?.code}`);
    console.log(`   Last truck to delete:  ${trucksToDelete[trucksToDelete.length - 1]?.code}`);

    let deletedCount = 0;

    console.log('\n🗑️  Deleting related data...');

    // Get device IDs for these trucks FIRST (needed for many deletions)
    console.log('   [0/16] Finding devices for trucks to delete...');
    const devicesToDelete = await prisma.device.findMany({
      where: { truck_id: { in: truckIdsToDelete } },
      select: { id: true }
    });
    const deviceIdsToDelete = devicesToDelete.map(d => d.id);
    console.log(`          ✓ Found ${deviceIdsToDelete.length} devices`);

    // 1. Delete tire_pressure_event (by truck_id AND device_id)
    console.log('   [1/16] Deleting tire pressure events...');
    const delTirePressure = await prisma.tire_pressure_event.deleteMany({
      where: { 
        OR: [
          { truck_id: { in: truckIdsToDelete } },
          { device_id: { in: deviceIdsToDelete } }
        ]
      }
    });
    deletedCount += delTirePressure.count;
    console.log(`          ✓ Deleted ${delTirePressure.count} records`);

    // 2. Delete gps_position (by truck_id AND device_id)
    console.log('   [2/16] Deleting GPS positions...');
    const delGPS = await prisma.gps_position.deleteMany({
      where: { 
        OR: [
          { truck_id: { in: truckIdsToDelete } },
          { device_id: { in: deviceIdsToDelete } }
        ]
      }
    });
    deletedCount += delGPS.count;
    console.log(`          ✓ Deleted ${delGPS.count} records`);

    // 3. Delete hub_temperature_event (by truck_id AND device_id)
    console.log('   [3/16] Deleting hub temperature events...');
    const delHubTemp = await prisma.hub_temperature_event.deleteMany({
      where: { 
        OR: [
          { truck_id: { in: truckIdsToDelete } },
          { device_id: { in: deviceIdsToDelete } }
        ]
      }
    });
    deletedCount += delHubTemp.count;
    console.log(`          ✓ Deleted ${delHubTemp.count} records`);

    // 4. Delete fuel_level_event
    console.log('   [4/16] Deleting fuel level events...');
    const delFuel = await prisma.fuel_level_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delFuel.count;
    console.log(`          ✓ Deleted ${delFuel.count} records`);

    // 5. Delete alert_event
    console.log('   [5/16] Deleting alert events...');
    const delAlerts = await prisma.alert_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delAlerts.count;
    console.log(`          ✓ Deleted ${delAlerts.count} records`);

    // 6. Delete speed_event
    console.log('   [6/16] Deleting speed events...');
    const delSpeed = await prisma.speed_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delSpeed.count;
    console.log(`          ✓ Deleted ${delSpeed.count} records`);

    // 7. Delete device_status_event (by truck_id AND device_id)
    console.log('   [7/16] Deleting device status events...');
    const delDeviceStatus = await prisma.device_status_event.deleteMany({
      where: { 
        OR: [
          { truck_id: { in: truckIdsToDelete } },
          { device_id: { in: deviceIdsToDelete } }
        ]
      }
    });
    deletedCount += delDeviceStatus.count;
    console.log(`          ✓ Deleted ${delDeviceStatus.count} records`);

    // 8. Delete lock_event (by device_id)
    console.log('   [8/16] Deleting lock events...');
    const delLock = await prisma.lock_event.deleteMany({
      where: { device_id: { in: deviceIdsToDelete } }
    });
    deletedCount += delLock.count;
    console.log(`          ✓ Deleted ${delLock.count} records`);

    // 9. Delete sensor_processing_queue first (has FK to sensor_data_raw)
    console.log('   [9/16] Deleting sensor processing queue...');
    // Get raw_data_ids for trucks to delete
    const rawDataToDelete = await prisma.sensor_data_raw.findMany({
      where: { truck_id: { in: truckIdsToDelete } },
      select: { id: true }
    });
    const rawDataIds = rawDataToDelete.map(r => r.id);
    
    if (rawDataIds.length > 0) {
      const delQueue = await prisma.sensor_processing_queue.deleteMany({
        where: { raw_data_id: { in: rawDataIds } }
      });
      deletedCount += delQueue.count;
      console.log(`          ✓ Deleted ${delQueue.count} records`);
    } else {
      console.log(`          ✓ No records to delete`);
    }

    // 10. Now delete sensor_data_raw
    console.log('   [10/16] Deleting sensor raw data...');
    const delSensorRaw = await prisma.sensor_data_raw.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delSensorRaw.count;
    console.log(`           ✓ Deleted ${delSensorRaw.count} records`);

    // 11. Delete daily_route
    console.log('   [11/16] Deleting daily routes...');
    const delDailyRoute = await prisma.daily_route.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delDailyRoute.count;
    console.log(`           ✓ Deleted ${delDailyRoute.count} records`);

    // 12. Delete truck_status_event
    console.log('   [12/16] Deleting truck status events...');
    const delTruckStatus = await prisma.truck_status_event.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delTruckStatus.count;
    console.log(`           ✓ Deleted ${delTruckStatus.count} records`);

    // 13. Delete trip (if exists)
    try {
      console.log('   [13/16] Deleting trips...');
      const delTrips = await prisma.trip.deleteMany({
        where: { truck_id: { in: truckIdsToDelete } }
      });
      deletedCount += delTrips.count;
      console.log(`           ✓ Deleted ${delTrips.count} records`);
    } catch (error) {
      if (error.code === 'P2021') {
        console.log(`           ✓ Table 'trip' doesn't exist, skipping...`);
      } else {
        throw error;
      }
    }

    // 14. Delete device_truck_assignment
    console.log('   [14/16] Deleting device truck assignments...');
    const delAssignments = await prisma.device_truck_assignment.deleteMany({
      where: { 
        OR: [
          { truck_id: { in: truckIdsToDelete } },
          { device_id: { in: deviceIdsToDelete } }
        ]
      }
    });
    deletedCount += delAssignments.count;
    console.log(`           ✓ Deleted ${delAssignments.count} records`);

    // 14.5. Delete tire_position_config
    console.log('   [14.5/16] Deleting tire position configs...');
    const delTireConfig = await prisma.tire_position_config.deleteMany({
      where: { truck_id: { in: truckIdsToDelete } }
    });
    deletedCount += delTireConfig.count;
    console.log(`             ✓ Deleted ${delTireConfig.count} records`);

    // 15. Delete sensors
    if (deviceIdsToDelete.length > 0) {
      console.log('   [15/16] Deleting sensors...');
      const delSensors = await prisma.sensor.deleteMany({
        where: { device_id: { in: deviceIdsToDelete } }
      });
      deletedCount += delSensors.count;
      console.log(`           ✓ Deleted ${delSensors.count} records`);

      // 16. Delete devices
      console.log('   [16/16] Deleting devices...');
      const delDevices = await prisma.device.deleteMany({
        where: { id: { in: deviceIdsToDelete } }
      });
      deletedCount += delDevices.count;
      console.log(`           ✓ Deleted ${delDevices.count} records`);
    } else {
      console.log('   [15/16] No sensors to delete');
      console.log('   [16/16] No devices to delete');
    }

    // 17. Finally, delete trucks
    console.log('\n   🚛 Deleting trucks...');
    const delTrucks = await prisma.truck.deleteMany({
      where: { id: { in: truckIdsToDelete } }
    });
    deletedCount += delTrucks.count;
    console.log(`      ✓ Deleted ${delTrucks.count} trucks`);

    console.log(`\n✅ Cleanup completed! Total ${deletedCount.toLocaleString()} records deleted.`);
    return true;

  } catch (error) {
    console.error('\n❌ Error during cleanup:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('\n🚛 TPMS DATABASE CLEANUP - AUTO RUN');
    console.log('='.repeat(60));

    // Show current stats
    const beforeStats = await getDatabaseStats();
    displayStats(beforeStats, '📊 BEFORE CLEANUP');

    // Run cleanup
    const success = await cleanupKeepFirst50();

    if (success) {
      // Show final stats
      const afterStats = await getDatabaseStats();
      displayStats(afterStats, '\n📊 AFTER CLEANUP');

      // Show difference
      console.log('\n📉 CLEANUP SUMMARY:');
      console.log('─'.repeat(50));
      console.log(`  Trucks removed:          ${(beforeStats.trucks - afterStats.trucks).toLocaleString()}`);
      console.log(`  Devices removed:         ${(beforeStats.devices - afterStats.devices).toLocaleString()}`);
      console.log(`  Sensors removed:         ${(beforeStats.sensors - afterStats.sensors).toLocaleString()}`);
      console.log(`  TPMS data removed:       ${(beforeStats.tirePressure - afterStats.tirePressure).toLocaleString()}`);
      console.log(`  GPS data removed:        ${(beforeStats.gps - afterStats.gps).toLocaleString()}`);
      console.log(`  Total records removed:   ${(Object.values(beforeStats).reduce((a,b)=>a+b,0) - Object.values(afterStats).reduce((a,b)=>a+b,0)).toLocaleString()}`);

      console.log('\n✅ Database is now optimized for development with 50 trucks!\n');
      console.log('📝 Next steps:');
      console.log('   1. Verify: node scripts/check-database-stats.js');
      console.log('   2. Test APIs with trucks 0001-0050');
      console.log('   3. Start development! 🚀\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
