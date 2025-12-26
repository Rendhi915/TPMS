const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

/**
 * Test Script: Verify Sensor History Fix
 * Purpose: Check if sensor_history is being populated correctly
 */

async function testSensorHistoryFix() {
  console.log('🧪 Testing Sensor History Fix\n');
  console.log('=' .repeat(60));

  try {
    // 1. Check if we have location data
    console.log('\n📍 Step 1: Checking location data...');
    const locationCount = await prisma.location.count();
    console.log(`   Total locations: ${locationCount}`);

    if (locationCount === 0) {
      console.log('   ❌ No locations found! Run simulator first.');
      return;
    }

    const latestLocations = await prisma.location.findMany({
      take: 5,
      orderBy: { recorded_at: 'desc' },
      include: {
        device: {
          include: {
            truck: { select: { plate: true } }
          }
        }
      }
    });

    console.log('\n   Latest 5 locations:');
    latestLocations.forEach(loc => {
      console.log(`   - Location ${loc.id}: Truck ${loc.device.truck?.plate || 'N/A'} at ${loc.lat.toFixed(6)}, ${loc.long.toFixed(6)} (${loc.recorded_at.toISOString()})`);
    });

    // 2. Check sensor_history
    console.log('\n📊 Step 2: Checking sensor_history data...');
    const sensorHistoryCount = await prisma.sensor_history.count();
    console.log(`   Total sensor history records: ${sensorHistoryCount}`);

    if (sensorHistoryCount === 0) {
      console.log('   ❌ No sensor_history found! This is the problem we need to fix.');
    } else {
      console.log('   ✅ Sensor history exists!');
    }

    // 3. Check sensor_history per location
    console.log('\n🔍 Step 3: Checking sensor_history per location...');
    
    for (const location of latestLocations.slice(0, 3)) {
      const historyForLocation = await prisma.sensor_history.findMany({
        where: { location_id: location.id },
        include: {
          sensor: {
            select: { tireNo: true, sn: true }
          }
        }
      });

      console.log(`\n   Location ${location.id} (${location.device.truck?.plate || 'N/A'}):`);
      console.log(`   - Recorded at: ${location.recorded_at.toISOString()}`);
      console.log(`   - Sensor history records: ${historyForLocation.length}`);

      if (historyForLocation.length > 0) {
        console.log(`   - Sample sensor data:`);
        historyForLocation.slice(0, 3).forEach(sh => {
          console.log(`     • Tire ${sh.tireNo}: Pressure=${sh.tirepValue} PSI, Temp=${sh.tempValue}°C [${sh.exType}]`);
        });
      } else {
        console.log(`   - ❌ No sensor history for this location!`);
      }
    }

    // 4. Check current sensor values
    console.log('\n⚙️ Step 4: Checking current sensor values...');
    const sensorsWithData = await prisma.sensor.findMany({
      where: {
        deleted_at: null,
        device: {
          truck: {
            plate: { startsWith: 'B 900' }
          }
        }
      },
      take: 10,
      orderBy: { updated_at: 'desc' },
      include: {
        device: {
          include: {
            truck: { select: { plate: true } }
          }
        }
      }
    });

    console.log(`\n   Latest 10 updated sensors:`);
    sensorsWithData.forEach(sensor => {
      console.log(`   - ${sensor.device.truck?.plate || 'N/A'} Tire ${sensor.tireNo}: Pressure=${sensor.tirepValue} PSI, Temp=${sensor.tempValue}°C [${sensor.exType}] (Updated: ${sensor.updated_at.toISOString()})`);
    });

    // 5. Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUMMARY\n');
    console.log(`✅ Total locations: ${locationCount}`);
    console.log(`${sensorHistoryCount > 0 ? '✅' : '❌'} Total sensor_history: ${sensorHistoryCount}`);
    
    if (sensorHistoryCount === 0) {
      console.log('\n⚠️  PROBLEM DETECTED:');
      console.log('   Sensor history is empty. This means:');
      console.log('   1. Simulator is not saving sensor_history');
      console.log('   2. OR API endpoints are not saving sensor_history');
      console.log('\n💡 SOLUTION:');
      console.log('   1. Restart the server (the fix is now in place)');
      console.log('   2. Run the simulator again');
      console.log('   3. Run this test script again');
    } else {
      const avgPerLocation = (sensorHistoryCount / locationCount).toFixed(2);
      console.log(`📊 Average sensors per location: ${avgPerLocation}`);
      
      if (avgPerLocation < 5) {
        console.log('\n⚠️  WARNING: Low sensor data per location');
        console.log('   Expected: ~10 sensors per truck location');
        console.log('   This might indicate incomplete data saving.');
      } else {
        console.log('\n✅ Sensor history looks good!');
      }
    }

    // 6. Test query that frontend uses
    console.log('\n🔍 Step 5: Testing frontend query...');
    const trucks = await prisma.truck.findMany({
      where: {
        plate: { startsWith: 'B 900' },
        status: 'active'
      },
      take: 1,
      include: {
        device: {
          include: {
            location: {
              take: 5,
              orderBy: { recorded_at: 'desc' },
              include: {
                sensor_history: {
                  include: {
                    sensor: {
                      select: {
                        tireNo: true,
                        sn: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (trucks.length > 0) {
      const truck = trucks[0];
      console.log(`\n   Testing with truck: ${truck.plate}`);
      
      if (truck.device && truck.device.length > 0) {
        const device = truck.device[0];
        console.log(`   Device SN: ${device.sn}`);
        console.log(`   Locations found: ${device.location.length}`);
        
        device.location.forEach((loc, idx) => {
          console.log(`\n   Location ${idx + 1} (ID: ${loc.id}):`);
          console.log(`   - GPS: ${loc.lat.toFixed(6)}, ${loc.long.toFixed(6)}`);
          console.log(`   - Recorded: ${loc.recorded_at.toISOString()}`);
          console.log(`   - Sensor history records: ${loc.sensor_history.length}`);
          
          if (loc.sensor_history.length === 0) {
            console.log(`   - ❌ NO TIRE DATA (This is what frontend sees!)`);
          } else {
            console.log(`   - ✅ Has tire data:`);
            loc.sensor_history.slice(0, 3).forEach(sh => {
              console.log(`     • Tire ${sh.tireNo}: ${sh.tirepValue} PSI, ${sh.tempValue}°C`);
            });
          }
        });
      } else {
        console.log('   ❌ Truck has no device');
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Test completed!\n');

  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run test
testSensorHistoryFix();
