const axios = require('axios');
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

/**
 * Test History API - Check Tire Pressure Display
 */

async function testHistoryAPI() {
  console.log('🧪 Testing History API - Tire Pressure Issue\n');
  console.log('='.repeat(60));

  try {
    // Step 1: Get a simulator truck
    console.log('\n📍 Step 1: Getting simulator truck...');
    const truck = await prisma.truck.findFirst({
      where: {
        plate: { startsWith: 'B 900' },
        status: 'active'
      },
      include: {
        device: {
          where: { deleted_at: null },
          include: {
            location: {
              take: 2,
              orderBy: { recorded_at: 'desc' },
              include: {
                sensor_history: {
                  orderBy: { tireNo: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (!truck) {
      console.log('❌ No simulator truck found!');
      return;
    }

    console.log(`✅ Testing with truck: ${truck.plate} (ID: ${truck.id})`);

    // Step 2: Check direct database query
    console.log('\n📍 Step 2: Checking sensor_history data in database...');
    
    if (truck.device && truck.device.length > 0) {
      const device = truck.device[0];
      console.log(`   Device: ${device.sn}`);
      
      if (device.location && device.location.length > 0) {
        const latestLocation = device.location[0];
        console.log(`\n   Latest Location ID: ${latestLocation.id}`);
        console.log(`   Timestamp: ${latestLocation.recorded_at}`);
        console.log(`   GPS: ${latestLocation.lat}, ${latestLocation.long}`);
        console.log(`   Sensor history records: ${latestLocation.sensor_history.length}`);
        
        if (latestLocation.sensor_history.length > 0) {
          console.log('\n   Sample sensor data from database:');
          latestLocation.sensor_history.slice(0, 3).forEach(sh => {
            console.log(`   • Tire ${sh.tireNo}:`);
            console.log(`     - tempValue: ${sh.tempValue}°C`);
            console.log(`     - tirepValue: ${sh.tirepValue} PSI`);
            console.log(`     - exType: ${sh.exType}`);
            console.log(`     - bat: ${sh.bat}%`);
          });
        }
      }
    }

    // Step 3: Test sensorHistoryService
    console.log('\n📍 Step 3: Testing sensorHistoryService...');
    const { getHistoryWithSensors } = require('../src/services/sensorHistoryService');
    
    const timeline = await getHistoryWithSensors(truck.id, { limit: 2 });
    
    console.log(`\n   Timeline records: ${timeline.length}`);
    
    if (timeline.length > 0) {
      const firstRecord = timeline[0];
      console.log('\n   First timeline record:');
      console.log(`   - Timestamp: ${firstRecord.timestamp}`);
      console.log(`   - Location: ${JSON.stringify(firstRecord.location)}`);
      console.log(`   - Tires count: ${firstRecord.tires.length}`);
      
      if (firstRecord.tires.length > 0) {
        console.log('\n   Sample tire data from service:');
        firstRecord.tires.slice(0, 3).forEach(tire => {
          console.log(`   • Tire ${tire.tireNo} (${tire.position}):`);
          console.log(`     - temperature: ${tire.temperature}°C`);
          console.log(`     - pressure: ${tire.pressure} PSI ← CHECK THIS!`);
          console.log(`     - status: ${tire.status}`);
          console.log(`     - battery: ${tire.battery}%`);
        });
      }
    }

    // Step 4: Full JSON output
    console.log('\n📍 Step 4: Full JSON output (first record):');
    console.log(JSON.stringify(timeline[0], null, 2));

    // Step 5: Analysis
    console.log('\n' + '='.repeat(60));
    console.log('📋 ANALYSIS\n');

    if (timeline.length > 0 && timeline[0].tires.length > 0) {
      const firstTire = timeline[0].tires[0];
      
      console.log('✅ Temperature field:');
      console.log(`   - Value: ${firstTire.temperature}`);
      console.log(`   - Type: ${typeof firstTire.temperature}`);
      console.log(`   - Field name: "temperature"`);
      
      console.log('\n🔍 Pressure field:');
      console.log(`   - Value: ${firstTire.pressure}`);
      console.log(`   - Type: ${typeof firstTire.pressure}`);
      console.log(`   - Field name: "pressure"`);
      
      if (firstTire.pressure === null || firstTire.pressure === undefined) {
        console.log('\n❌ PROBLEM FOUND: Pressure is null/undefined!');
      } else if (firstTire.pressure === 0) {
        console.log('\n⚠️  WARNING: Pressure is 0 (might be data issue)');
      } else {
        console.log('\n✅ Pressure has valid value!');
      }
      
      // Check if frontend expects different field name
      console.log('\n💡 Frontend might be looking for:');
      console.log('   - "pressure" ✅ (we provide this)');
      console.log('   - "tirepValue" ❌ (raw field name)');
      console.log('   - "tirePressure" ❌ (camelCase variant)');
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
testHistoryAPI();
