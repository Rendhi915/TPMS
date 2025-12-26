const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();
const GPSRouteGenerator = require('./gps-route-generator');
const fs = require('fs');
const path = require('path');

// WebSocket service untuk broadcast real-time updates
let websocketService = null;
try {
  websocketService = require('../src/services/websocketService');
} catch (error) {
  console.warn('⚠️  WebSocket service not available (normal for standalone mode)');
}

// Konfigurasi
const CONFIG = {
  GENERATE_INTERVAL: parseInt(process.env.SIMULATOR_INTERVAL) || 3000, // 3 detik
  HISTORY_SAVE_INTERVAL: parseInt(process.env.HISTORY_SAVE_INTERVAL) || 180000, // 3 menit
  SPEEDS: process.env.SIMULATOR_SPEEDS 
    ? process.env.SIMULATOR_SPEEDS.split(',').map(s => parseInt(s.trim()))
    : [20, 25, 30, 35, 40], // km/jam - realistic mining truck speeds
  WORKING_HOURS: {
    DAY_START: parseInt(process.env.WORKING_HOURS_DAY_START) || 8,
    DAY_END: parseInt(process.env.WORKING_HOURS_DAY_END) || 16,
    NIGHT_START: parseInt(process.env.WORKING_HOURS_NIGHT_START) || 20,
    NIGHT_END: parseInt(process.env.WORKING_HOURS_NIGHT_END) || 4
  },
  ROUTE_PATTERNS: ['random_walk', 'circular', 'patrol', 'zigzag', 'random_walk'], // Different pattern per truck
  // Alert configuration
  ALERT_CONFIG: {
    // Truck 1 (index 0): Scheduled alert setiap 30 menit
    TRUCK1_INTERVAL_MS: 30 * 60 * 1000, // 30 menit = 1,800,000 ms
    TARGET_TRUCK_INDEX: 0, // Index 0 = Truck pertama (sorted by ID asc)
    
    // Truck lainnya: Random alert dengan interval minimum
    OTHER_TRUCKS: {
      MIN_INTERVAL_MS: 20 * 60 * 1000, // Minimum 20 menit antar alert
      MAX_ALERTS_PER_CYCLE: 2, // Maksimal 1-2 alert per cycle
      PROBABILITY_PER_CYCLE: 0.05, // 5% chance untuk generate alert setiap cycle (3 detik)
    }
  }
};

// Load GeoJSON area - PT BORNEO INDOBARA
let MINING_AREA_GEOJSON = null;

function loadMiningAreaGeoJSON() {
  // Load from miningAreaService
  const miningAreaService = require('../src/services/miningAreaService');
  const miningAreaData = miningAreaService.getMiningAreaData();
  
  if (miningAreaData && miningAreaData.features && miningAreaData.features.length > 0) {
    // Extract the first feature (main mining area)
    MINING_AREA_GEOJSON = miningAreaData.features[0];
    console.log('✅ Loaded GeoJSON from miningAreaService');
    console.log(`   📍 Area: ${MINING_AREA_GEOJSON.properties.Name}`);
    console.log(`   📝 Description: ${MINING_AREA_GEOJSON.properties.description}`);
    
    // Calculate bounding box for reference
    const coords = MINING_AREA_GEOJSON.geometry.coordinates[0];
    const lngs = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    const bbox = {
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats)
    };
    console.log(`   📐 Bounding Box: [${bbox.minLng.toFixed(2)}, ${bbox.minLat.toFixed(2)}, ${bbox.maxLng.toFixed(2)}, ${bbox.maxLat.toFixed(2)}]`);
    console.log(`   📏 Area Size: ~${((bbox.maxLng - bbox.minLng) * 111).toFixed(1)} km x ~${((bbox.maxLat - bbox.minLat) * 111).toFixed(1)} km`);
  } else {
    console.error('❌ Failed to load GeoJSON from miningAreaService');
    process.exit(1);
  }
}

// State per truck (now includes route generator and current route)
const truckStates = new Map();

// History buffer (simpan setiap 3 menit)
let historyBuffer = [];
let lastHistorySave = Date.now();

// Alert timing control
let lastAlertTime = 0; // Timestamp last alert generated (untuk Truck 1)

// Tracking last alert time per truck (untuk truck lainnya)
const lastAlertTimePerTruck = new Map(); // truck_id -> timestamp

/**
 * Cek apakah waktunya generate alert untuk Truck 1 (setiap 30 menit)
 */
function shouldGenerateAlertForTruck1() {
  const now = Date.now();
  const timeSinceLastAlert = now - lastAlertTime;
  
  // Jika belum pernah ada alert ATAU sudah lewat 30 menit
  if (lastAlertTime === 0 || timeSinceLastAlert >= CONFIG.ALERT_CONFIG.TRUCK1_INTERVAL_MS) {
    lastAlertTime = now;
    return true;
  }
  
  return false;
}

/**
 * Cek apakah truck lain bisa generate alert (random dengan minimum interval)
 */
function shouldGenerateAlertForOtherTruck(truckId) {
  const now = Date.now();
  const lastTime = lastAlertTimePerTruck.get(truckId) || 0;
  const timeSinceLastAlert = now - lastTime;
  
  // Cek minimum interval (20 menit)
  if (timeSinceLastAlert < CONFIG.ALERT_CONFIG.OTHER_TRUCKS.MIN_INTERVAL_MS) {
    return false;
  }
  
  // Random chance 5% per cycle (3 detik)
  // Dengan 5% chance setiap 3 detik, rata-rata alert muncul setiap ~60 detik = 1 menit
  // Tapi karena ada minimum 20 menit, maka efektifnya baru bisa alert setelah 20 menit
  const shouldAlert = Math.random() < CONFIG.ALERT_CONFIG.OTHER_TRUCKS.PROBABILITY_PER_CYCLE;
  
  if (shouldAlert) {
    lastAlertTimePerTruck.set(truckId, now);
    return true;
  }
  
  return false;
}

/**
 * Cek apakah sekarang jam kerja
 */
function isWorkingHours() {
  const now = new Date();
  const hour = now.getHours();
  
  // Shift siang: DAY_START - DAY_END
  const isDayShift = hour >= CONFIG.WORKING_HOURS.DAY_START && hour < CONFIG.WORKING_HOURS.DAY_END;
  
  // Shift malam: NIGHT_START - NIGHT_END
  // Jika NIGHT_END > NIGHT_START (tidak lewat tengah malam, e.g. 16-24)
  // Jika NIGHT_END < NIGHT_START (lewat tengah malam, e.g. 20-4)
  let isNightShift;
  if (CONFIG.WORKING_HOURS.NIGHT_END > CONFIG.WORKING_HOURS.NIGHT_START) {
    // Tidak lewat tengah malam (e.g. 16:00 - 24:00)
    isNightShift = hour >= CONFIG.WORKING_HOURS.NIGHT_START && hour < CONFIG.WORKING_HOURS.NIGHT_END;
  } else {
    // Lewat tengah malam (e.g. 20:00 - 04:00)
    isNightShift = hour >= CONFIG.WORKING_HOURS.NIGHT_START || hour < CONFIG.WORKING_HOURS.NIGHT_END;
  }
  
  return isDayShift || isNightShift;
}

/**
 * Hitung jarak antar dua koordinat (Haversine formula)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Hitung koordinat baru berdasarkan kecepatan dan waktu
 */
function calculateNewPosition(currentLat, currentLng, targetLat, targetLng, speedKmh) {
  // Jarak yang ditempuh dalam 3 detik
  const timeInHours = 3 / 3600; // 3 detik = 0.000833 jam
  const distanceTraveled = speedKmh * timeInHours; // dalam km
  
  // Hitung jarak total ke target
  const totalDistance = calculateDistance(currentLat, currentLng, targetLat, targetLng);
  
  // Jika sudah dekat dengan target, ganti target
  if (totalDistance < 0.01) { // < 10 meter
    return { lat: targetLat, lng: targetLng, reachedTarget: true };
  }
  
  // Hitung ratio perpindahan
  const ratio = Math.min(distanceTraveled / totalDistance, 1);
  
  // Interpolasi linear
  const newLat = currentLat + (targetLat - currentLat) * ratio;
  const newLng = currentLng + (targetLng - currentLng) * ratio;
  
  return { lat: newLat, lng: newLng, reachedTarget: false };
}

/**
 * Generate nilai sensor dengan variasi realistis
 */
function generateSensorValue(baseValue, min, max, trend = 0) {
  const variance = (Math.random() - 0.5) * 5; // ±2.5
  let value = baseValue + variance + trend;
  return Math.max(min, Math.min(max, value));
}

/**
 * Cek kondisi abnormal dan generate alert
 */
function checkAbnormalConditions(sensorData, truckId, deviceId, sensorId) {
  const alerts = [];
  
  // Cek suhu tinggi (Updated threshold untuk mining truck)
  // Critical: ≥100°C, Warning: ≥85°C
  if (sensorData.temp >= 100) {
    // Critical temperature (≥100°C)
    alerts.push({
      truck_id: truckId,
      device_id: deviceId,
      sensor_id: sensorId,
      alert_id: 1, // ID untuk high temperature
      value: sensorData.temp,
      message: `Critical: Tire ${sensorData.tireNo} temperature ${sensorData.temp.toFixed(1)}°C`,
      status: 'active'
    });
  } else if (sensorData.temp >= 85) {
    // Warning temperature (85-99°C)
    alerts.push({
      truck_id: truckId,
      device_id: deviceId,
      sensor_id: sensorId,
      alert_id: 1,
      value: sensorData.temp,
      message: `Warning: Tire ${sensorData.tireNo} temperature ${sensorData.temp.toFixed(1)}°C`,
      status: 'active'
    });
  }
  
  // Cek tekanan rendah (Critical: <90 PSI)
  if (sensorData.pressure < 90) {
    alerts.push({
      truck_id: truckId,
      device_id: deviceId,
      sensor_id: sensorId,
      alert_id: 2, // ID untuk low pressure
      value: sensorData.pressure,
      message: `Critical Low Pressure: Tire ${sensorData.tireNo} pressure ${sensorData.pressure.toFixed(1)} PSI`,
      status: 'active'
    });
  }
  
  // Cek tekanan tinggi (Critical: ≥120 PSI)
  if (sensorData.pressure >= 120) {
    alerts.push({
      truck_id: truckId,
      device_id: deviceId,
      sensor_id: sensorId,
      alert_id: 2,
      value: sensorData.pressure,
      message: `Critical High Pressure: Tire ${sensorData.tireNo} pressure ${sensorData.pressure.toFixed(1)} PSI`,
      status: 'active'
    });
  }
  
  return alerts;
}

/**
 * Initialize truck state with GPS Route Generator
 */
async function initializeTruckState(truck, device, sensors, truckIndex) {
  const speed = CONFIG.SPEEDS[truckIndex % CONFIG.SPEEDS.length];
  const routePattern = CONFIG.ROUTE_PATTERNS[truckIndex % CONFIG.ROUTE_PATTERNS.length];
  
  // Get last known location from database
  let startLat = null;
  let startLng = null;
  
  try {
    const lastLocation = await prisma.location.findFirst({
      where: { device_id: device.id },
      orderBy: { created_at: 'desc' },
      select: { lat: true, long: true }
    });
    
    if (lastLocation) {
      startLat = lastLocation.lat;
      startLng = lastLocation.long;
      console.log(`   📍 Found last location for ${truck.plate}: (${startLat}, ${startLng})`);
    } else {
      console.log(`   ℹ️  No previous location for ${truck.plate}, will use random start`);
    }
  } catch (error) {
    console.warn(`   ⚠️  Could not fetch last location: ${error.message}`);
  }
  
  // Create GPS route generator for this truck
  const generator = new GPSRouteGenerator(MINING_AREA_GEOJSON, {
    routePattern: routePattern,
    avgSpeed: speed,
    minSpeed: speed - 10, // Wider speed variation for large area
    maxSpeed: speed + 10,
    pointInterval: 3, // 3 seconds
    totalDuration: 8 * 3600, // 8 hours
    turnProbability: 0.08 + (truckIndex * 0.02), // Different turn probability per truck (lower for larger area)
    maxTurnAngle: 30 + (truckIndex * 10), // Different max turn angle
    boundaryMargin: 0.0001, // Appropriate margin for large area
    startLat: startLat, // Use last known location
    startLng: startLng
  });
  
  // Generate route for today (8 hours)
  console.log(`   🗺️  Generating route for truck ${truck.plate} (pattern: ${routePattern}, speed: ${speed} km/h)...`);
  const route = generator.generateRoute(new Date());
  
  // Validate route
  const validation = generator.validateRoute(route);
  if (!validation.valid) {
    console.warn(`   ⚠️  Route validation: ${validation.validPercentage}% valid`);
  } else {
    console.log(`   ✅ Route validated: 100% inside boundary (${route.length} points)`);
  }
  
  return {
    truckId: truck.id,
    plate: truck.plate,
    deviceId: device.id,
    sensors: sensors.map(s => ({
      id: s.id,
      tireNo: s.tireNo,
      sensorNo: s.sensorNo,
      baseTemp: 65 + Math.random() * 15, // Base 65-80°C (realistic mining truck operating temp)
      basePressure: 105 + Math.random() * 10, // Base 105-115 PSI (optimal mining truck pressure)
      tempTrend: 0,
      pressureTrend: 0
    })),
    generator: generator,
    route: route,
    routeIndex: 0, // Current position in route
    speed: speed,
    routePattern: routePattern,
    lastUpdate: new Date()
  };
}

/**
 * Generate data untuk satu truck (using GPS route)
 */
async function generateTruckData(state, truckIndex, shouldGenerateAlert) {
  const now = new Date();
  
  // Get current position from pre-generated route
  const currentPoint = state.route[state.routeIndex];
  
  if (!currentPoint) {
    // Route finished, regenerate for next cycle
    console.log(`   🔄 Regenerating route for ${state.plate}...`);
    state.route = state.generator.generateRoute(new Date());
    state.routeIndex = 0;
    return null;
  }
  
  // Use coordinates from route
  const currentLat = currentPoint.lat;
  const currentLng = currentPoint.lng;
  
  // Move to next point in route
  state.routeIndex++;
  
  // Save location
  const location = await prisma.location.create({
    data: {
      device_id: state.deviceId,
      lat: currentLat,
      long: currentLng,
      recorded_at: now,
      created_at: now
    }
  });
  
  // Generate sensor data dan update
  const sensorUpdates = [];
  const alerts = [];
  
  // Tentukan apakah truck ini akan generate alert
  let shouldAlert = false;
  let maxAlertsThisCycle = 0;
  
  if (truckIndex === CONFIG.ALERT_CONFIG.TARGET_TRUCK_INDEX) {
    // Truck 1: Scheduled alert setiap 30 menit
    shouldAlert = shouldGenerateAlert; // Passed dari runSimulator()
    maxAlertsThisCycle = 1; // Hanya 1 alert per cycle untuk Truck 1
  } else {
    // Truck lainnya: Random dengan minimum interval 20 menit
    shouldAlert = shouldGenerateAlertForOtherTruck(state.truckId);
    if (shouldAlert) {
      // Random 1 atau 2 alert per cycle
      maxAlertsThisCycle = Math.random() < 0.5 ? 1 : 2;
    }
  }
  
  // Counter untuk alert yang sudah di-generate
  let alertsGenerated = 0;
  
  for (const sensor of state.sensors) {
    let temp, pressure;
    let shouldGenerateAnomaly = false;
    
    // Generate anomali hanya jika:
    // 1. shouldAlert = true (waktu/probability terpenuhi)
    // 2. Belum mencapai max alerts untuk cycle ini
    // 3. Random selection untuk sensor mana yang dapat anomali
    if (shouldAlert && alertsGenerated < maxAlertsThisCycle) {
      // Random chance untuk sensor ini dapat anomali
      // Probability lebih tinggi untuk sensor awal (tire yang lebih sering bermasalah)
      const sensorProbability = sensor.tireNo <= 4 ? 0.3 : 0.15;
      
      if (Math.random() < sensorProbability) {
        shouldGenerateAnomaly = true;
        alertsGenerated++;
      }
    }
    
    if (shouldGenerateAnomaly) {
      // Generate nilai abnormal REALISTIS untuk mining truck
      const anomalyType = Math.random();
      
      if (anomalyType < 0.25) {
        // Critical temperature (25% dari anomali) - 100-105°C
        temp = 100 + Math.random() * 5; // 100-105°C (critical threshold)
        pressure = generateSensorValue(sensor.basePressure, 100, 119, sensor.pressureTrend);
        console.log(`   🚨 Generating CRITICAL TEMP alert for ${state.plate} Tire ${sensor.tireNo}: ${temp.toFixed(1)}°C`);
      } else if (anomalyType < 0.50) {
        // Warning temperature (25% dari anomali) - 85-95°C
        temp = 85 + Math.random() * 10; // 85-95°C (warning range)
        pressure = generateSensorValue(sensor.basePressure, 100, 119, sensor.pressureTrend);
        console.log(`   ⚠️  Generating WARNING TEMP alert for ${state.plate} Tire ${sensor.tireNo}: ${temp.toFixed(1)}°C`);
      } else if (anomalyType < 0.75) {
        // Low pressure (25% dari anomali) - 85-89 PSI (di bawah critical 90 PSI)
        temp = generateSensorValue(sensor.baseTemp, 60, 84, sensor.tempTrend);
        pressure = 85 + Math.random() * 4; // 85-89 PSI (mendekati critical low)
        console.log(`   🚨 Generating CRITICAL LOW PRESSURE alert for ${state.plate} Tire ${sensor.tireNo}: ${pressure.toFixed(1)} PSI`);
      } else {
        // High pressure (25% dari anomali) - 120-125 PSI (di atas critical 120 PSI)
        temp = generateSensorValue(sensor.baseTemp, 60, 84, sensor.tempTrend);
        pressure = 120 + Math.random() * 5; // 120-125 PSI (critical high)
        console.log(`   🚨 Generating CRITICAL HIGH PRESSURE alert for ${state.plate} Tire ${sensor.tireNo}: ${pressure.toFixed(1)} PSI`);
      }
    } else {
      // Generate nilai normal dengan variasi LEBAR (99% data akan normal)
      sensor.tempTrend = (Math.random() - 0.5) * 0.5;
      sensor.pressureTrend = (Math.random() - 0.5) * 0.3;
      temp = generateSensorValue(sensor.baseTemp, 60, 84, sensor.tempTrend); // 60-84°C (normal range)
      pressure = generateSensorValue(sensor.basePressure, 100, 119, sensor.pressureTrend); // 100-119 PSI (normal range)
    }
    
    const exType = temp >= 100 || pressure < 90 || pressure >= 120 ? 'critical' :
                   temp >= 85 ? 'warning' : 'normal';
    
    // Update sensor current value
    await prisma.sensor.update({
      where: { id: sensor.id },
      data: {
        tempValue: temp,
        tirepValue: pressure,
        exType: exType,
        updated_at: now
      }
    });
    
    sensorUpdates.push({
      sensorId: sensor.id,
      tireNo: sensor.tireNo,
      temp,
      pressure,
      exType
    });
    
    // Generate alert HANYA jika ini adalah scheduled anomaly (30 menit interval)
    if (shouldGenerateAnomaly) {
      // Langsung create alert object tanpa check conditions
      // (karena nilai sudah di-set abnormal di atas)
      if (temp >= 100) {
        alerts.push({
          truck_id: state.truckId,
          device_id: state.deviceId,
          sensor_id: sensor.id,
          alert_id: 1,
          value: temp,
          message: `Critical: Tire ${sensor.tireNo} temperature ${temp.toFixed(1)}°C`,
          status: 'active'
        });
      } else if (temp >= 85) {
        alerts.push({
          truck_id: state.truckId,
          device_id: state.deviceId,
          sensor_id: sensor.id,
          alert_id: 1,
          value: temp,
          message: `Warning: Tire ${sensor.tireNo} temperature ${temp.toFixed(1)}°C`,
          status: 'active'
        });
      } else if (pressure < 90) {
        alerts.push({
          truck_id: state.truckId,
          device_id: state.deviceId,
          sensor_id: sensor.id,
          alert_id: 2,
          value: pressure,
          message: `Critical Low Pressure: Tire ${sensor.tireNo} pressure ${pressure.toFixed(1)} PSI`,
          status: 'active'
        });
      } else if (pressure >= 120) {
        alerts.push({
          truck_id: state.truckId,
          device_id: state.deviceId,
          sensor_id: sensor.id,
          alert_id: 2,
          value: pressure,
          message: `Critical High Pressure: Tire ${sensor.tireNo} pressure ${pressure.toFixed(1)} PSI`,
          status: 'active'
        });
      }
    }
    
    // Update base values sedikit (simulasi wear/perubahan kondisi)
    sensor.baseTemp += (Math.random() - 0.5) * 0.1;
    sensor.basePressure += (Math.random() - 0.5) * 0.05;
  }
  
  // Save alerts jika ada
  if (alerts.length > 0) {
    const alertType = truckIndex === CONFIG.ALERT_CONFIG.TARGET_TRUCK_INDEX 
      ? '[Scheduled 30-min]' 
      : '[Random alert]';
    
    console.log(`   🚨 ${state.plate}: Generated ${alerts.length} alert(s) ${alertType}`);
    alerts.forEach(alert => {
      console.log(`      ⚠️  ${alert.message}`);
    });
    
    // Save to database
    const createdAlerts = await prisma.alert_events.createMany({
      data: alerts,
      skipDuplicates: true
    });
    
    // 🔥 BROADCAST alert via WebSocket
    if (websocketService && createdAlerts.count > 0) {
      try {
        // Fetch truck info untuk broadcast
        const truck = await prisma.truck.findUnique({
          where: { id: state.truckId },
          select: { plate: true }
        });
        
        // Broadcast each alert
        for (const alert of alerts) {
          websocketService.broadcastNewAlert({
            id: alert.alert_id,
            alert_code: alert.alert_id === 1 ? 'TIRE_TEMP_CRITICAL' : 
                       alert.alert_id === 2 ? 'TIRE_TEMP_HIGH' :
                       alert.alert_id === 3 ? 'TIRE_PRESSURE_CRITICAL' :
                       'TIRE_PRESSURE_HIGH',
            severity: alert.message.includes('Critical') ? 'critical' : 'warning',
            truck_id: state.truckId,
            truck_plate: truck?.plate || state.plate,
            device_id: state.deviceId,
            sensor_id: alert.sensor_id,
            value: alert.value,
            message: alert.message,
            status: 'active',
            created_at: new Date().toISOString()
          });
        }
        console.log(`   📡 Broadcasted ${alerts.length} alert(s) via WebSocket`);
      } catch (wsError) {
        console.error('   ⚠️  Alert broadcast failed:', wsError.message);
      }
    }
  }
  
  // Tambah ke history buffer
  historyBuffer.push({
    locationId: location.id,
    deviceId: state.deviceId,
    truckId: state.truckId,
    sensors: sensorUpdates,
    recordedAt: now
  });
  
  state.lastUpdate = now;
  
  return {
    plate: state.plate,
    location: { lat: currentLat, lng: currentLng },
    sensors: sensorUpdates.length,
    alerts: alerts.length
  };
}

/**
 * Save history buffer ke database (setiap 3 menit)
 */
async function saveHistoryBuffer() {
  if (historyBuffer.length === 0) return;
  
  console.log(`💾 Saving ${historyBuffer.length} data points to history...`);
  
  const sensorHistoryData = [];
  
  for (const point of historyBuffer) {
    for (const sensor of point.sensors) {
      sensorHistoryData.push({
        device_id: point.deviceId,
        location_id: point.locationId,
        sensor_id: sensor.sensorId,
        truck_id: point.truckId,
        tireNo: sensor.tireNo,
        sensorNo: sensor.tireNo,
        tempValue: sensor.temp,
        tirepValue: sensor.pressure,
        exType: sensor.exType,
        bat: 85,
        recorded_at: point.recordedAt
      });
    }
  }
  
  if (sensorHistoryData.length > 0) {
    await prisma.sensor_history.createMany({
      data: sensorHistoryData,
      skipDuplicates: true
    });
    console.log(`   ✅ Saved ${sensorHistoryData.length} sensor history records`);
  }
  
  historyBuffer = [];
  lastHistorySave = Date.now();
}

/**
 * Main simulator loop
 */
async function runSimulator() {
  try {
    // Load all trucks dengan devices dan sensors
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
      },
      orderBy: { id: 'asc' } // Ensure consistent ordering
    });
    
    if (trucks.length === 0) {
      console.log('⚠️  No active trucks found');
      return;
    }
    
    // Initialize atau update truck states
    let initTruckIndex = 0;
    for (const truck of trucks) {
      if (truck.device.length === 0) continue;
      
      const device = truck.device[0];
      const sensors = device.sensor;
      
      if (sensors.length === 0) {
        console.log(`⚠️  Truck ${truck.plate} has no sensors, skipping...`);
        continue;
      }
      
      // Initialize state jika belum ada atau truck baru
      if (!truckStates.has(truck.id)) {
        const state = await initializeTruckState(truck, device, sensors, initTruckIndex);
        truckStates.set(truck.id, state);
        console.log(`🚛 Initialized truck ${truck.plate} with ${sensors.length} sensors (pattern: ${state.routePattern})`);
      } else {
        // Update sensor list jika ada perubahan
        const state = truckStates.get(truck.id);
        if (state.sensors.length !== sensors.length) {
          console.log(`🔄 Detected sensor change for ${truck.plate}: ${state.sensors.length} → ${sensors.length}`);
          state.sensors = sensors.map(s => ({
            id: s.id,
            tireNo: s.tireNo,
            sensorNo: s.sensorNo,
            baseTemp: 35 + Math.random() * 10,
            basePressure: 90 + Math.random() * 10,
            tempTrend: 0,
            pressureTrend: 0
          }));
        }
      }
      
      initTruckIndex++;
    }
    
    // Cek jam kerja
    if (!isWorkingHours()) {
      console.log('⏰ Outside working hours, trucks are parked');
      return;
    }
    
    // Cek apakah waktunya generate alert untuk Truck 1 (setiap 30 menit)
    const timeForTruck1Alert = shouldGenerateAlertForTruck1();
    
    if (timeForTruck1Alert) {
      const nextAlertTime = new Date(Date.now() + CONFIG.ALERT_CONFIG.TRUCK1_INTERVAL_MS);
      console.log(`⏰ ALERT SCHEDULE: Generating alert for Truck 1. Next alert at ${nextAlertTime.toLocaleTimeString()}`);
    }
    
    // Generate data untuk setiap truck
    const results = [];
    let truckIndex = 0;
    for (const [truckId, state] of truckStates) {
      // Truck 1: Scheduled alert setiap 30 menit
      // Truck lainnya: Handled di dalam generateTruckData (random dengan min interval)
      const shouldAlert = (truckIndex === CONFIG.ALERT_CONFIG.TARGET_TRUCK_INDEX) && timeForTruck1Alert;
      const result = await generateTruckData(state, truckIndex, shouldAlert);
      if (result) results.push(result);
      truckIndex++;
    }
    
    if (results.length > 0) {
      console.log(`📊 Generated data for ${results.length} trucks at ${new Date().toLocaleTimeString()}`);
      
      results.forEach(r => {
        const alertIcon = r.alerts > 0 ? '🚨' : '✅';
        console.log(`   ${alertIcon} ${r.plate}: (${r.location.lat.toFixed(6)}, ${r.location.lng.toFixed(6)}) - ${r.sensors} sensors${r.alerts > 0 ? `, ${r.alerts} alerts ⏰` : ''}`);
      });
      
      // 🔥 BROADCAST via WebSocket - REAL-TIME UPDATE
      if (websocketService) {
        try {
          // Fetch full truck data dengan sensor info untuk broadcast
          const trucksData = await prisma.truck.findMany({
            where: {
              deleted_at: null,
              status: 'active',
            },
            select: {
              id: true,
              plate: true,
              name: true,
              model: true,
              type: true,
              status: true,
              device: {
                where: { deleted_at: null },
                select: {
                  id: true,
                  sn: true,
                  status: true,
                  location: {
                    orderBy: { created_at: 'desc' },
                    take: 1,
                    select: {
                      lat: true,
                      long: true,
                      recorded_at: true,
                      created_at: true,
                    },
                  },
                  sensor: {
                    where: { deleted_at: null },
                    select: {
                      id: true,
                      sn: true,
                      tireNo: true,
                      sensorNo: true,
                      tempValue: true,
                      tirepValue: true,
                      exType: true,
                      bat: true,
                      updated_at: true,
                    },
                  },
                },
              },
            },
            orderBy: { id: 'asc' },
          });
          
          // Format data untuk frontend
          const formattedData = trucksData.map(truck => {
            const device = truck.device[0];
            const location = device?.location[0];
            
            return {
              truck_id: truck.id,
              plate_number: truck.plate,
              truck_name: truck.name,
              model: truck.model,
              type: truck.type,
              status: truck.status,
              device: device ? {
                id: device.id,
                serial_number: device.sn,
                status: device.status,
              } : null,
              location: location ? {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.long),
                recorded_at: location.recorded_at,
                last_update: location.created_at,
              } : null,
              sensors: device?.sensor || [],
              sensor_summary: device?.sensor ? {
                total_sensors: device.sensor.length,
                avg_temperature: (device.sensor.reduce((sum, s) => sum + (s.tempValue || 0), 0) / device.sensor.length).toFixed(1),
                avg_pressure: (device.sensor.reduce((sum, s) => sum + (s.tirepValue || 0), 0) / device.sensor.length).toFixed(1),
                critical_count: device.sensor.filter(s => s.exType === 'critical').length,
                warning_count: device.sensor.filter(s => s.exType === 'warning').length,
              } : null,
            };
          });
          
          // Broadcast ke semua connected clients
          websocketService.broadcastTruckLocationUpdate({
            trucks: formattedData,
            summary: {
              total_trucks: formattedData.length,
              trucks_with_location: formattedData.filter(t => t.location !== null).length,
            },
            timestamp: new Date().toISOString(),
          });
          
          console.log(`   📡 Broadcasted to WebSocket clients (${formattedData.length} trucks)`);
        } catch (wsError) {
          console.error('   ⚠️  WebSocket broadcast failed:', wsError.message);
        }
      }
    }
    
    // Cek apakah sudah waktunya save history (setiap 3 menit)
    const timeSinceLastSave = Date.now() - lastHistorySave;
    if (timeSinceLastSave >= CONFIG.HISTORY_SAVE_INTERVAL) {
      await saveHistoryBuffer();
    }
    
  } catch (error) {
    console.error('❌ Error in simulator:', error);
  }
}

/**
 * Start simulator
 */
async function startSimulator() {
  console.log('🚀 REALISTIC LIVE SIMULATOR V4 STARTED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📍 GPS Route Generator Enabled');
  console.log('   - Each truck has independent route');
  console.log('   - All routes stay within GeoJSON boundary');
  console.log(`⏱️  Generate Interval: ${CONFIG.GENERATE_INTERVAL / 1000} seconds`);
  console.log(`💾 History Save Interval: ${CONFIG.HISTORY_SAVE_INTERVAL / 1000} seconds`);
  console.log(`🕐 Day Shift: ${CONFIG.WORKING_HOURS.DAY_START}:00 - ${CONFIG.WORKING_HOURS.DAY_END}:00`);
  console.log(`🕗 Night Shift: ${CONFIG.WORKING_HOURS.NIGHT_START}:00 - 0${CONFIG.WORKING_HOURS.NIGHT_END}:00`);
  console.log('');
  console.log('🚨 ALERT CONFIGURATION:');
  console.log(`   📌 Truck #1: Scheduled alerts every ${CONFIG.ALERT_CONFIG.TRUCK1_INTERVAL_MS / 60000} minutes`);
  console.log(`   📌 Other trucks: Random alerts (min interval: ${CONFIG.ALERT_CONFIG.OTHER_TRUCKS.MIN_INTERVAL_MS / 60000} minutes)`);
  console.log(`   📌 Max alerts per cycle: 1-${CONFIG.ALERT_CONFIG.OTHER_TRUCKS.MAX_ALERTS_PER_CYCLE} alerts`);
  console.log(`   📌 Alert probability: ${CONFIG.ALERT_CONFIG.OTHER_TRUCKS.PROBABILITY_PER_CYCLE * 100}% per cycle (realistic scenario)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Load GeoJSON area
  console.log('📂 Loading GeoJSON mining area...');
  loadMiningAreaGeoJSON();
  console.log('');
  
  // Run immediately
  await runSimulator();
  
  // Then run every 3 seconds
  setInterval(runSimulator, CONFIG.GENERATE_INTERVAL);
  
  console.log('✅ Realistic simulator is running...\n');
}

// Export untuk digunakan di server.js
module.exports = { startSimulator };

// Jika dijalankan langsung
if (require.main === module) {
  startSimulator().catch(error => {
    console.error('❌ Failed to start simulator:', error);
    process.exit(1);
  });
}
