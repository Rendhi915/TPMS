const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

/**
 * GENERATE HISTORY BACKFILL
 * Generate data historis untuk 14 hari terakhir (16-21 Desember 2025)
 * Setiap hari punya rute berbeda
 */

// Template rute (sama seperti di simulator)
const ROUTE_TEMPLATES = {
  0: { // Minggu - Rute A
    start: { lat: -3.3198, lng: 114.5935 },
    waypoints: [
      { lat: -3.3500, lng: 114.6200 },
      { lat: -3.3800, lng: 114.6500 }
    ],
    end: { lat: -3.4200, lng: 114.6800 }
  },
  1: { // Senin - Rute B
    start: { lat: -3.4521, lng: 114.7123 },
    waypoints: [
      { lat: -3.4300, lng: 114.7300 },
      { lat: -3.4100, lng: 114.7500 }
    ],
    end: { lat: -3.3900, lng: 114.7700 }
  },
  2: { // Selasa - Rute C
    start: { lat: -3.3000, lng: 114.8000 },
    waypoints: [
      { lat: -3.3200, lng: 114.8200 },
      { lat: -3.3400, lng: 114.8400 }
    ],
    end: { lat: -3.3600, lng: 114.8600 }
  },
  3: { // Rabu - Rute D
    start: { lat: -3.5200, lng: 114.5000 },
    waypoints: [
      { lat: -3.5000, lng: 114.5200 },
      { lat: -3.4800, lng: 114.5400 }
    ],
    end: { lat: -3.4600, lng: 114.5600 }
  },
  4: { // Kamis - Rute E
    start: { lat: -3.3800, lng: 114.6500 },
    waypoints: [
      { lat: -3.3700, lng: 114.6700 },
      { lat: -3.3600, lng: 114.6900 }
    ],
    end: { lat: -3.3500, lng: 114.7100 }
  },
  5: { // Jumat - Rute A
    start: { lat: -3.3198, lng: 114.5935 },
    waypoints: [
      { lat: -3.3500, lng: 114.6200 },
      { lat: -3.3800, lng: 114.6500 }
    ],
    end: { lat: -3.4200, lng: 114.6800 }
  },
  6: { // Sabtu - Rute B
    start: { lat: -3.4521, lng: 114.7123 },
    waypoints: [
      { lat: -3.4300, lng: 114.7300 },
      { lat: -3.4100, lng: 114.7500 }
    ],
    end: { lat: -3.3900, lng: 114.7700 }
  }
};

const CONFIG = {
  DAYS_TO_GENERATE: 14, // 14 hari ke belakang
  WORKING_HOURS: {
    DAY_START: 8,
    DAY_END: 16,
    NIGHT_START: 20,
    NIGHT_END: 4
  },
  SPEEDS: [15, 20, 25], // km/jam
  SAVE_INTERVAL_MINUTES: 3 // Save setiap 3 menit
};

/**
 * Hitung koordinat baru dengan interpolasi
 */
function interpolatePosition(start, end, progress) {
  return {
    lat: start.lat + (end.lat - start.lat) * progress,
    lng: start.lng + (end.lng - start.lng) * progress
  };
}

/**
 * Generate route points untuk satu shift
 */
function generateRoutePoints(route, speed, startTime, endTime) {
  const points = [];
  const durationMinutes = (endTime - startTime) / (1000 * 60);
  const numPoints = Math.floor(durationMinutes / CONFIG.SAVE_INTERVAL_MINUTES);
  
  // Flatten route: start → waypoints → end
  const allPoints = [
    route.start,
    ...route.waypoints,
    route.end
  ];
  
  for (let i = 0; i < numPoints; i++) {
    const progress = i / numPoints;
    const segmentIndex = Math.floor(progress * (allPoints.length - 1));
    const segmentProgress = (progress * (allPoints.length - 1)) - segmentIndex;
    
    const segmentStart = allPoints[segmentIndex];
    const segmentEnd = allPoints[Math.min(segmentIndex + 1, allPoints.length - 1)];
    
    const position = interpolatePosition(segmentStart, segmentEnd, segmentProgress);
    
    const timestamp = new Date(startTime.getTime() + (i * CONFIG.SAVE_INTERVAL_MINUTES * 60 * 1000));
    
    points.push({
      lat: position.lat,
      lng: position.lng,
      speed: speed,
      timestamp: timestamp
    });
  }
  
  return points;
}

/**
 * Generate sensor data
 */
function generateSensorData(sensorCount, baseTemp = 40, basePressure = 95) {
  const sensors = [];
  
  for (let i = 1; i <= sensorCount; i++) {
    const temp = baseTemp + (Math.random() - 0.5) * 10;
    const pressure = basePressure + (Math.random() - 0.5) * 10;
    
    sensors.push({
      tireNo: i,
      sensorNo: i,
      tempValue: Math.max(30, Math.min(100, temp)),
      tirepValue: Math.max(75, Math.min(120, pressure)),
      exType: temp > 80 ? 'warning' : 'normal',
      bat: 80 + Math.floor(Math.random() * 10)
    });
  }
  
  return sensors;
}

/**
 * Generate data untuk satu hari
 */
async function generateDayData(date, trucks) {
  const dayOfWeek = date.getDay();
  const dateStr = date.toISOString().split('T')[0];
  
  console.log(`\n📅 Generating data for ${dateStr} (${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]})`);
  
  const route = ROUTE_TEMPLATES[dayOfWeek];
  let totalLocations = 0;
  let totalSensorHistory = 0;
  
  for (const truck of trucks) {
    if (truck.device.length === 0 || truck.device[0].sensor.length === 0) {
      console.log(`   ⚠️  Skipping ${truck.plate} (no device or sensors)`);
      continue;
    }
    
    const device = truck.device[0];
    const sensors = device.sensor;
    const speed = CONFIG.SPEEDS[Math.floor(Math.random() * CONFIG.SPEEDS.length)];
    
    // Generate untuk shift siang (08:00 - 16:00)
    const dayShiftStart = new Date(date);
    dayShiftStart.setHours(CONFIG.WORKING_HOURS.DAY_START, 0, 0, 0);
    const dayShiftEnd = new Date(date);
    dayShiftEnd.setHours(CONFIG.WORKING_HOURS.DAY_END, 0, 0, 0);
    
    const dayPoints = generateRoutePoints(route, speed, dayShiftStart, dayShiftEnd);
    
    // Generate untuk shift malam (20:00 - 04:00)
    const nightShiftStart = new Date(date);
    nightShiftStart.setHours(CONFIG.WORKING_HOURS.NIGHT_START, 0, 0, 0);
    const nightShiftEnd = new Date(date);
    nightShiftEnd.setDate(nightShiftEnd.getDate() + 1); // Besok
    nightShiftEnd.setHours(CONFIG.WORKING_HOURS.NIGHT_END, 0, 0, 0);
    
    const nightPoints = generateRoutePoints(route, speed, nightShiftStart, nightShiftEnd);
    
    const allPoints = [...dayPoints, ...nightPoints];
    
    console.log(`   🚛 ${truck.plate}: ${allPoints.length} points, ${sensors.length} sensors`);
    
    // Save locations dan sensor_history
    for (const point of allPoints) {
      // Create location
      const location = await prisma.location.create({
        data: {
          device_id: device.id,
          lat: point.lat,
          long: point.lng,
          recorded_at: point.timestamp,
          created_at: point.timestamp
        }
      });
      
      totalLocations++;
      
      // Create sensor_history
      const sensorData = generateSensorData(sensors.length);
      const sensorHistoryData = sensorData.map((s, idx) => ({
        device_id: device.id,
        location_id: location.id,
        sensor_id: sensors[idx].id,
        truck_id: truck.id,
        tireNo: s.tireNo,
        sensorNo: s.sensorNo,
        tempValue: s.tempValue,
        tirepValue: s.tirepValue,
        exType: s.exType,
        bat: s.bat,
        recorded_at: point.timestamp
      }));
      
      await prisma.sensor_history.createMany({
        data: sensorHistoryData
      });
      
      totalSensorHistory += sensorHistoryData.length;
    }
  }
  
  console.log(`   ✅ Saved ${totalLocations} locations, ${totalSensorHistory} sensor history records`);
  
  return { totalLocations, totalSensorHistory };
}

/**
 * Main backfill function
 */
async function generateHistoryBackfill() {
  try {
    console.log('🔄 GENERATING HISTORY BACKFILL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Days to generate: ${CONFIG.DAYS_TO_GENERATE}`);
    console.log(`⏱️  Data interval: ${CONFIG.SAVE_INTERVAL_MINUTES} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Load trucks
    const trucks = await prisma.truck.findMany({
      where: {
        deleted_at: null,
        status: 'active'
      },
      include: {
        device: {
          where: { deleted_at: null },
          include: {
            sensor: {
              where: { deleted_at: null },
              orderBy: { tireNo: 'asc' }
            }
          }
        }
      }
    });
    
    console.log(`📋 Found ${trucks.length} active trucks\n`);
    
    let grandTotalLocations = 0;
    let grandTotalSensorHistory = 0;
    
    // Generate untuk setiap hari (14 hari ke belakang)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = CONFIG.DAYS_TO_GENERATE - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const { totalLocations, totalSensorHistory } = await generateDayData(date, trucks);
      grandTotalLocations += totalLocations;
      grandTotalSensorHistory += totalSensorHistory;
      
      // Small delay untuk tidak overload database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ BACKFILL COMPLETED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log(`   - Total Days: ${CONFIG.DAYS_TO_GENERATE}`);
    console.log(`   - Total Locations: ${grandTotalLocations}`);
    console.log(`   - Total Sensor History: ${grandTotalSensorHistory}`);
    console.log(`   - Trucks: ${trucks.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
  } catch (error) {
    console.error('❌ Error generating backfill:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run backfill
if (require.main === module) {
  generateHistoryBackfill()
    .then(() => {
      console.log('✅ Backfill script finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Backfill script failed:', error);
      process.exit(1);
    });
}

module.exports = { generateHistoryBackfill };
