const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function compareLiveVsHistory() {
  try {
    console.log('🔍 Comparing LIVE TRACKING vs HISTORY TRACKING...\n');

    // Get device with truck data
    const device = await prisma.device.findFirst({
      include: {
        truck: true,
        location: {
          orderBy: { recorded_at: 'desc' },
          take: 3
        },
        sensor: {
          where: { deleted_at: null },
          orderBy: { tireNo: 'asc' }
        }
      }
    });

    if (!device) {
      console.log('❌ No device found');
      return;
    }

    console.log(`📋 Device: ${device.sn} (Truck: ${device.truck.plate})\n`);

    // ============================================
    // LIVE TRACKING DATA
    // ============================================
    console.log('=== 📡 LIVE TRACKING DATA ===');
    console.log('Endpoint: GET /api/trucks/live-tracking');
    console.log('Source: device.location (latest) + device.sensor (current state)\n');

    const latestLocation = device.location[0];
    if (latestLocation) {
      console.log('Latest Location:');
      console.log({
        lat: parseFloat(latestLocation.lat),
        long: parseFloat(latestLocation.long),
        recorded_at: latestLocation.recorded_at,
        created_at: latestLocation.created_at
      });
    }

    console.log(`\nCurrent Sensors (${device.sensor.length} sensors):`);
    device.sensor.forEach(s => {
      console.log(`  Tire ${s.tireNo}: Temp=${s.tempValue}°C, Pressure=${s.tirepValue} PSI (Updated: ${s.updated_at})`);
    });

    // ============================================
    // HISTORY TRACKING DATA
    // ============================================
    console.log('\n\n=== 📜 HISTORY TRACKING DATA ===');
    console.log('Endpoint: GET /api/history/trucks/:id/timeline');
    console.log('Source: location + sensor_history (snapshots at each location)\n');

    const sensorHistory = await prisma.sensor_history.findMany({
      where: { device_id: device.id },
      orderBy: { recorded_at: 'desc' },
      take: 10,
      include: {
        location: true
      }
    });

    if (sensorHistory.length === 0) {
      console.log('⚠️  NO SENSOR HISTORY FOUND!');
      console.log('This is the problem - history endpoint has no sensor data to show');
    } else {
      console.log(`Found ${sensorHistory.length} sensor history records\n`);
      
      // Group by location
      const byLocation = sensorHistory.reduce((acc, h) => {
        const key = `${h.location_id}`;
        if (!acc[key]) {
          acc[key] = {
            location: h.location,
            sensors: []
          };
        }
        acc[key].sensors.push(h);
        return acc;
      }, {});

      Object.values(byLocation).slice(0, 3).forEach((group, idx) => {
        console.log(`Location ${idx + 1}:`);
        console.log({
          lat: parseFloat(group.location.lat),
          long: parseFloat(group.location.long),
          recorded_at: group.location.recorded_at,
          sensors_count: group.sensors.length
        });
        group.sensors.forEach(s => {
          console.log(`  Tire ${s.tireNo}: Temp=${s.tempValue}°C, Pressure=${s.tirepValue} PSI`);
        });
        console.log('');
      });
    }

    // ============================================
    // COMPARISON
    // ============================================
    console.log('\n=== ⚖️  COMPARISON ===\n');

    if (latestLocation && sensorHistory.length > 0) {
      const latestHistoryLocation = sensorHistory[0].location;
      const latestHistoryTimestamp = sensorHistory[0].recorded_at;
      const liveTimestamp = latestLocation.recorded_at;

      console.log('Latest Location Timestamps:');
      console.log(`  Live Tracking: ${liveTimestamp}`);
      console.log(`  History Tracking: ${latestHistoryTimestamp}`);
      
      const timeDiff = Math.abs(new Date(liveTimestamp) - new Date(latestHistoryTimestamp)) / 1000;
      console.log(`  Time Difference: ${timeDiff} seconds\n`);

      if (timeDiff > 60) {
        console.log('⚠️  WARNING: Time difference > 1 minute!');
        console.log('Live data and history data are NOT synchronized');
      } else {
        console.log('✅ Time difference < 1 minute - timestamps are close');
      }

      // Compare sensor values
      console.log('\nSensor Value Comparison (Tire 1):');
      const liveSensor1 = device.sensor.find(s => s.tireNo === 1);
      const historySensor1 = sensorHistory.find(h => h.tireNo === 1);

      if (liveSensor1 && historySensor1) {
        console.log(`  Live: Temp=${liveSensor1.tempValue}°C, Pressure=${liveSensor1.tirepValue} PSI`);
        console.log(`  History: Temp=${historySensor1.tempValue}°C, Pressure=${historySensor1.tirepValue} PSI`);
        
        const tempDiff = Math.abs(liveSensor1.tempValue - historySensor1.tempValue);
        const pressureDiff = Math.abs(liveSensor1.tirepValue - historySensor1.tirepValue);

        if (tempDiff > 5 || pressureDiff > 5) {
          console.log(`  ⚠️  Large difference detected! (Temp: ${tempDiff}°C, Pressure: ${pressureDiff} PSI)`);
        } else {
          console.log(`  ✅ Values are close (Temp: ${tempDiff}°C, Pressure: ${pressureDiff} PSI)`);
        }
      }
    }

    console.log('\n\n=== 🎯 RECOMMENDATIONS ===\n');
    
    if (sensorHistory.length === 0) {
      console.log('❌ PROBLEM FOUND: No sensor_history records exist!');
      console.log('\nSOLUTION:');
      console.log('1. Make sure the simulator is running (AUTO_START_SIMULATOR=true in .env)');
      console.log('2. Simulator should save sensor_history every time it saves location');
      console.log('3. API endpoints (tpdata/hubdata) should also save sensor_history');
      console.log('4. Check that iotDataController.js includes sensor_history save logic');
    } else {
      const latestHistory = sensorHistory[0];
      const latestLive = device.location[0];
      
      const timeDiff = Math.abs(new Date(latestLive.recorded_at) - new Date(latestHistory.recorded_at)) / 1000;
      
      if (timeDiff > 300) { // 5 minutes
        console.log('⚠️  ISSUE: Live and history data are out of sync (> 5 minutes apart)');
        console.log('\nPOSSIBLE CAUSES:');
        console.log('1. Simulator is saving location but not sensor_history');
        console.log('2. Real devices are sending data but API is not saving to sensor_history');
        console.log('3. Check iotDataController.js for sensor_history save logic');
      } else {
        console.log('✅ Data synchronization looks good!');
        console.log('\nIf frontend still shows different data:');
        console.log('1. Check which endpoint frontend is calling');
        console.log('2. Make sure frontend uses: /api/history/trucks/:id/timeline');
        console.log('3. NOT: /api/trucks/:id/history (this is different endpoint)');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

compareLiveVsHistory();
