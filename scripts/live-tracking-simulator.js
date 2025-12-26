const axios = require('axios');
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

// ==========================================
// KONFIGURASI
// ==========================================
const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3001',
  API_TOKEN: process.env.SIMULATOR_TOKEN || '', // Token akan di-generate saat seed
  INTERVAL_MINUTES: 5,
  NUM_TRUCKS: 5,
  SENSORS_PER_TRUCK: 10, // 10 ban per truck
  
  // Mining Area GeoJSON - PT BORNEO INDOBARA Main Mining Area
  MINING_AREA_POLYGON: [
    [115.604399949931505, -3.545400075547209],
    [115.604399841131098, -3.608799574004828],
    [115.649400029697503, -3.608799509217319],
    [115.649400017089704, -3.663100293456181],
    [115.617400059975793, -3.663099780174879],
    [115.617399737213503, -3.685699156803738],
    [115.649299960676103, -3.685699068800897],
    [115.649300362663595, -3.699299673460462],
    [115.617800049745696, -3.699300020057011],
    [115.6177999530113, -3.717199908413447],
    [115.658299919322602, -3.717200000114277],
    [115.6582955763173, -3.473005894715275],
    [115.568699602091598, -3.473001685807625],
    [115.568700182646694, -3.464001541662113],
    [115.555099828419003, -3.463999391784724],
    [115.555099291465098, -3.473003271644793],
    [115.532700208403895, -3.473001476768178],
    [115.532699846387402, -3.463900605411753],
    [115.550701359743002, -3.463902395098822],
    [115.5507013482556, -3.454898213912309],
    [115.568701230550005, -3.454902873855015],
    [115.568700726908006, -3.445900276606981],
    [115.577700266719404, -3.445900134950424],
    [115.577700019488205, -3.431898966201222],
    [115.559699638559096, -3.431899648314737],
    [115.559699554334102, -3.437400397522957],
    [115.550100512253806, -3.437398099998878],
    [115.550099020797404, -3.450002211390146],
    [115.532703272530895, -3.449999179807085],
    [115.532700637088993, -3.454899270607867],
    [115.523702194253303, -3.454899042442723],
    [115.523699255391406, -3.463901335023041],
    [115.517901076646893, -3.463899658740474],
    [115.517900197349306, -3.467902281514015],
    [115.514600138263603, -3.467902292826565],
    [115.514601072048507, -3.50010155304351],
    [115.496599227790597, -3.50009900533689],
    [115.496599869340898, -3.518100005601176],
    [115.466797471563495, -3.518103740087548],
    [115.466801168336701, -3.550206921843847],
    [115.442500430814604, -3.550203582815326],
    [115.442497952207603, -3.563204681010987],
    [115.432199323066001, -3.563200126588743],
    [115.432199985374197, -3.575400350745974],
    [115.4738011947736, -3.575400021250577],
    [115.473797766754501, -3.667299052802766],
    [115.478300326726696, -3.667298846101514],
    [115.478299650158803, -3.699001512244875],
    [115.473698702561805, -3.698999777578339],
    [115.473698840205799, -3.706300548298581],
    [115.481699037262302, -3.706400782574116],
    [115.4817010345688, -3.717102490691376],
    [115.505201004278504, -3.717098288779876],
    [115.505299006694997, -3.635700209735227],
    [115.487399266748895, -3.635701682784649],
    [115.487397660302193, -3.545299693708786],
    [115.5010009898878, -3.545299520128636],
    [115.500999334020705, -3.536300365773843],
    [115.514602134835499, -3.536297749737575],
    [115.514599616947706, -3.518200242642467],
    [115.532599668902606, -3.518200602467881],
    [115.532599481961398, -3.509199349853453],
    [115.541641655013905, -3.509228095023962],
    [115.541599827827795, -3.500200339853857],
    [115.577599166446404, -3.500199675893057],
    [115.577599706645202, -3.509299212907206],
    [115.604599070000702, -3.509301495077436],
    [115.604600094546797, -3.518300046458291],
    [115.613499987067996, -3.518300064005411],
    [115.613499543131596, -3.54540116002996],
    [115.604399949931505, -3.545400075547209],
  ],

  // Range nilai sensor
  SENSOR_RANGES: {
    TIRE_PRESSURE_MIN: 85,  // PSI
    TIRE_PRESSURE_MAX: 110,
    TIRE_TEMP_MIN: 40,      // Celsius
    TIRE_TEMP_MAX: 80,
    HUB_TEMP_MIN: 45,
    HUB_TEMP_MAX: 85,
    BATTERY_MIN: 60,        // Percentage
    BATTERY_MAX: 100,
  },

  // Alert/Anomali Configuration - REALISTIC TIMING
  // Truck 1 (B 9001 SIM): Alert every 30 minutes
  // Other trucks: Alert every 20 minutes
  TRUCK_1_ALERT_INTERVAL: 30, // minutes
  OTHER_TRUCKS_ALERT_INTERVAL: 20, // minutes
  CRITICAL_ANOMALY_CHANCE: 0.15, // 15% dari anomali akan critical
};

// ==========================================
// TRACKING: Last Alert Time per Truck
// ==========================================
const truckLastAlertTime = {};

// ==========================================
// HELPER: Check if truck should generate alert now
// ==========================================
function shouldTruckGenerateAlert(truckId, truckPlate) {
  const now = Date.now();
  const lastAlert = truckLastAlertTime[truckId];
  
  // Determine alert interval based on truck
  const isTruck1 = truckPlate === 'B 9001 SIM';
  const alertInterval = isTruck1 
    ? CONFIG.TRUCK_1_ALERT_INTERVAL 
    : CONFIG.OTHER_TRUCKS_ALERT_INTERVAL;
  const intervalMs = alertInterval * 60 * 1000; // Convert to milliseconds
  
  // If never alerted before, or interval has passed
  if (!lastAlert || (now - lastAlert >= intervalMs)) {
    return true;
  }
  
  return false;
}

// ==========================================
// HELPER: Mark truck as alerted (update last alert time)
// ==========================================
function markTruckAlerted(truckId) {
  truckLastAlertTime[truckId] = Date.now();
}

// ==========================================
// SEEDING: Buat Alert Definitions
// ==========================================
async function seedAlertDefinitions() {
  console.log('🚨 Seeding alert definitions...\n');

  const alertDefinitions = [
    {
      code: 'TIRE_PRESSURE_LOW',
      name: 'Low Tire Pressure',
      description: 'Tire pressure is below safe threshold',
      severity: 'warning',
      threshold_min: 0,
      threshold_max: 88,
    },
    {
      code: 'TIRE_PRESSURE_HIGH',
      name: 'High Tire Pressure',
      description: 'Tire pressure is above safe threshold',
      severity: 'warning',
      threshold_min: 105,
      threshold_max: 999,
    },
    {
      code: 'TIRE_PRESSURE_CRITICAL',
      name: 'Critical Tire Pressure',
      description: 'Tire pressure is at critical level',
      severity: 'critical',
      threshold_min: 0,
      threshold_max: 85,
    },
    {
      code: 'TIRE_TEMP_HIGH',
      name: 'High Tire Temperature',
      description: 'Tire temperature is above normal threshold',
      severity: 'warning',
      threshold_min: 70,
      threshold_max: 75,
    },
    {
      code: 'TIRE_TEMP_CRITICAL',
      name: 'Critical Tire Temperature',
      description: 'Tire temperature is at critical level',
      severity: 'critical',
      threshold_min: 75,
      threshold_max: 999,
    },
    {
      code: 'HUB_TEMP_HIGH',
      name: 'High Hub Temperature',
      description: 'Hub temperature is above normal threshold',
      severity: 'warning',
      threshold_min: 70,
      threshold_max: 80,
    },
    {
      code: 'HUB_TEMP_CRITICAL',
      name: 'Critical Hub Temperature',
      description: 'Hub temperature is at critical level',
      severity: 'critical',
      threshold_min: 80,
      threshold_max: 999,
    },
    {
      code: 'BATTERY_LOW',
      name: 'Low Battery Level',
      description: 'Sensor battery level is low',
      severity: 'warning',
      threshold_min: 0,
      threshold_max: 20,
    },
    {
      code: 'DEVICE_OFFLINE',
      name: 'Device Offline',
      description: 'Device has not sent data for extended period',
      severity: 'critical',
      threshold_min: null,
      threshold_max: null,
    },
  ];

  for (const alertDef of alertDefinitions) {
    const existing = await prisma.alert.findUnique({
      where: { code: alertDef.code },
    });

    if (!existing) {
      await prisma.alert.create({ data: alertDef });
      console.log(`  ✅ Created alert definition: ${alertDef.code}`);
    } else {
      console.log(`  ✅ Alert definition exists: ${alertDef.code}`);
    }
  }

  console.log('✅ Alert definitions seeded!\n');
}

// ==========================================
// SEEDING: Buat 5 Truck dengan Device & Sensor
// ==========================================
async function seedTruckData() {
  console.log('🌱 Starting to seed 5 trucks for live tracking simulation...\n');

  try {
    // 0. Seed alert definitions first
    await seedAlertDefinitions();

    // 1. Cek/Buat vendor dummy
    let vendor = await prisma.vendors.findFirst({
      where: { name_vendor: 'PT Simulator Transport' },
    });

    if (!vendor) {
      vendor = await prisma.vendors.create({
        data: {
          name_vendor: 'PT Simulator Transport',
          address: 'Jl. Simulator No. 1, Jakarta',
          email: 'simulator@example.com',
          telephone: '021-12345678',
          contact_person: 'Simulator Contact',
        },
      });
      console.log('✅ Created vendor: PT Simulator Transport');
    } else {
      console.log('✅ Vendor already exists: PT Simulator Transport');
    }

    // 2. Cek/Buat driver dummy
    let driver = await prisma.drivers.findFirst({
      where: { name: 'Simulator Driver' },
    });

    if (!driver) {
      driver = await prisma.drivers.create({
        data: {
          name: 'Simulator Driver',
          phone: '081234567890',
          email: 'simulator-driver@example.com',
          license_number: 'SIM-999999',
          license_type: 'B2',
          license_expiry: new Date(2030, 11, 31),
          vendor_id: vendor.id,
          status: 'aktif',
        },
      });
      console.log('✅ Created driver: Simulator Driver');
    } else {
      console.log('✅ Driver already exists: Simulator Driver');
    }

    // 3. Buat 5 Trucks
    const trucks = [];
    for (let i = 1; i <= CONFIG.NUM_TRUCKS; i++) {
      const truckCode = `SIM${i.toString().padStart(2, '0')}`;
      const plate = `B ${9000 + i} SIM`;

      // Cek apakah truck sudah ada
      let truck = await prisma.truck.findFirst({
        where: { plate },
      });

      if (!truck) {
        truck = await prisma.truck.create({
          data: {
            vin: `VIN-SIMULATOR-${truckCode}`,
            name: `Simulator Truck ${truckCode}`,
            plate: plate,
            model: i % 2 === 0 ? 'Hino Ranger' : 'Mitsubishi Fuso',
            type: 'Dump Truck',
            year: 2023,
            status: 'active',
            vendor_id: vendor.id,
            driver_id: driver.id,
          },
        });
        console.log(`✅ Created truck: ${truck.name} - ${truck.plate}`);
      } else {
        console.log(`✅ Truck already exists: ${truck.name} - ${truck.plate}`);
      }

      trucks.push(truck);

      // 4. Buat Device untuk truck
      const deviceSN = `DEV-${truckCode}`;
      let device = await prisma.device.findFirst({
        where: { sn: deviceSN },
      });

      if (!device) {
        device = await prisma.device.create({
          data: {
            sn: deviceSN,
            sim_number: `62812900${i.toString().padStart(5, '0')}`,
            truck_id: truck.id,
            status: 'active',
            lock: 0,
            bat1: 85,
            bat2: 88,
            bat3: 90,
          },
        });
        console.log(`  ✅ Created device: ${device.sn}`);
      } else {
        console.log(`  ✅ Device already exists: ${device.sn}`);
      }

      // 5. Buat 10 Sensors per truck
      for (let tireNo = 1; tireNo <= CONFIG.SENSORS_PER_TRUCK; tireNo++) {
        const sensorSN = `SENS-${truckCode}-T${tireNo.toString().padStart(2, '0')}`;

        let sensor = await prisma.sensor.findFirst({
          where: { sn: sensorSN },
        });

        if (!sensor) {
          sensor = await prisma.sensor.create({
            data: {
              sn: sensorSN,
              device_id: device.id,
              tireNo: tireNo,
              simNumber: device.sim_number,
              sensorNo: tireNo,
              sensor_lock: 0,
              status: 'active',
              tempValue: 50.0,
              tirepValue: 95.0,
              exType: 'normal',
              bat: 85,
            },
          });
        }
      }
      console.log(`  ✅ Created ${CONFIG.SENSORS_PER_TRUCK} sensors for ${truck.name}`);
    }

    console.log('\n✅ Seeding completed! 5 trucks with devices and sensors are ready.\n');
    return trucks;
  } catch (error) {
    console.error('❌ Error seeding truck data:', error);
    throw error;
  }
}

// ==========================================
// HELPER: Generate Random Value in Range
// ==========================================
function randomInRange(min, max, decimals = 2) {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

// ==========================================
// HELPER: Point in Polygon Check (Ray Casting Algorithm)
// ==========================================
function isPointInPolygon(point, polygon) {
  const [lng, lat] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

// ==========================================
// HELPER: Get Polygon Bounds
// ==========================================
function getPolygonBounds(polygon) {
  let minLng = Infinity,
    maxLng = -Infinity;
  let minLat = Infinity,
    maxLat = -Infinity;

  polygon.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  return { minLng, maxLng, minLat, maxLat };
}

// ==========================================
// HELPER: Generate Random Point Inside Polygon
// ==========================================
function generatePointInPolygon(polygon, maxAttempts = 1000) {
  const bounds = getPolygonBounds(polygon);
  let attempts = 0;

  while (attempts < maxAttempts) {
    const lng = randomInRange(bounds.minLng, bounds.maxLng, 6);
    const lat = randomInRange(bounds.minLat, bounds.maxLat, 6);

    if (isPointInPolygon([lng, lat], polygon)) {
      return { lng, lat };
    }

    attempts++;
  }

  // Fallback: return center of bounds if max attempts reached
  console.warn('⚠️  Max attempts reached, using center point');
  return {
    lng: (bounds.minLng + bounds.maxLng) / 2,
    lat: (bounds.minLat + bounds.maxLat) / 2,
  };
}

// ==========================================
// HELPER: Generate GPS Movement
// ==========================================
let truckPositions = {}; // Store last position for each truck

function generateGPSCoordinate(truckId) {
  // Initialize position if not exists (inside polygon)
  if (!truckPositions[truckId]) {
    const initialPoint = generatePointInPolygon(CONFIG.MINING_AREA_POLYGON);
    truckPositions[truckId] = {
      lat: initialPoint.lat,
      lng: initialPoint.lng,
    };
  }

  // Small movement (simulate realistic truck movement)
  // Movement range: ~0.001 degrees (~100m)
  const latChange = randomInRange(-0.001, 0.001, 6);
  const lngChange = randomInRange(-0.001, 0.001, 6);

  let newLat = truckPositions[truckId].lat + latChange;
  let newLng = truckPositions[truckId].lng + lngChange;

  // Check if new position is still inside polygon
  if (!isPointInPolygon([newLng, newLat], CONFIG.MINING_AREA_POLYGON)) {
    // If outside, generate new position inside polygon
    console.log(`   ⚠️  Truck ${truckId} moved outside polygon, regenerating position...`);
    const newPoint = generatePointInPolygon(CONFIG.MINING_AREA_POLYGON);
    newLat = newPoint.lat;
    newLng = newPoint.lng;
  }

  // Update position
  truckPositions[truckId].lat = newLat;
  truckPositions[truckId].lng = newLng;

  return truckPositions[truckId];
}

// ==========================================
// HELPER: Determine Exception Type
// ==========================================
function determineExceptionType(pressure, temp, isPressure = true) {
  if (isPressure) {
    if (pressure < 88 || pressure > 105) return 'critical';
    if (pressure < 90 || pressure > 102) return 'warning';
    return 'normal';
  } else {
    if (temp > 75) return 'critical';
    if (temp > 70) return 'warning';
    return 'normal';
  }
}

// ==========================================
// HELPER: Generate Anomaly Value
// ==========================================
function generateAnomalyValue(normalMin, normalMax, isCritical = false) {
  // Generate value outside normal range
  if (isCritical) {
    // Critical: sangat jauh dari range normal
    const options = [
      randomInRange(normalMin - 20, normalMin - 10), // Very low
      randomInRange(normalMax + 10, normalMax + 20), // Very high
    ];
    return options[Math.floor(Math.random() * options.length)];
  } else {
    // Warning: sedikit di luar range normal
    const options = [
      randomInRange(normalMin - 10, normalMin - 5), // Low
      randomInRange(normalMax + 5, normalMax + 10), // High
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
}

// ==========================================
// HELPER: Check and Create Alert Event
// ==========================================
async function checkAndCreateAlert(sensor, device, truck, value, valueType) {
  try {
    let alertCode = null;
    let message = null;

    if (valueType === 'pressure') {
      if (value < 85) {
        alertCode = 'TIRE_PRESSURE_CRITICAL';
        message = `Critical tire pressure detected: ${value.toFixed(1)} PSI on Tire ${sensor.tireNo}`;
      } else if (value < 88) {
        alertCode = 'TIRE_PRESSURE_LOW';
        message = `Low tire pressure detected: ${value.toFixed(1)} PSI on Tire ${sensor.tireNo}`;
      } else if (value > 105) {
        alertCode = 'TIRE_PRESSURE_HIGH';
        message = `High tire pressure detected: ${value.toFixed(1)} PSI on Tire ${sensor.tireNo}`;
      }
    } else if (valueType === 'tire_temp') {
      if (value > 75) {
        alertCode = 'TIRE_TEMP_CRITICAL';
        message = `Critical tire temperature detected: ${value.toFixed(1)}°C on Tire ${sensor.tireNo}`;
      } else if (value > 70) {
        alertCode = 'TIRE_TEMP_HIGH';
        message = `High tire temperature detected: ${value.toFixed(1)}°C on Tire ${sensor.tireNo}`;
      }
    } else if (valueType === 'hub_temp') {
      if (value > 80) {
        alertCode = 'HUB_TEMP_CRITICAL';
        message = `Critical hub temperature detected: ${value.toFixed(1)}°C on Tire ${sensor.tireNo}`;
      } else if (value > 70) {
        alertCode = 'HUB_TEMP_HIGH';
        message = `High hub temperature detected: ${value.toFixed(1)}°C on Tire ${sensor.tireNo}`;
      }
    }

    if (alertCode) {
      // Get alert definition
      const alertDef = await prisma.alert.findUnique({
        where: { code: alertCode },
      });

      if (alertDef) {
        // Check if there's already an active alert for this sensor
        const existingAlert = await prisma.alert_events.findFirst({
          where: {
            alert_id: alertDef.id,
            sensor_id: sensor.id,
            status: 'active',
          },
        });

        if (!existingAlert) {
          // Create new alert event
          const alertEvent = await prisma.alert_events.create({
            data: {
              alert_id: alertDef.id,
              device_id: device.id,
              sensor_id: sensor.id,
              truck_id: truck.id,
              value: value,
              message: message,
              status: 'active',
            },
            include: {
              alert: true,
              sensor: true,
              device: true,
              truck: true,
            },
          });

          console.log(`      🚨 ALERT CREATED: ${alertCode} - ${message}`);
          
          // Return alert event untuk broadcast
          return alertEvent;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Error creating alert:', error);
    return null;
  }
}

// ==========================================
// SIMULATOR: Send IoT Data to API
// ==========================================
async function sendIoTData(endpoint, payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add token if available
    if (CONFIG.API_TOKEN) {
      config.headers['Authorization'] = `Bearer ${CONFIG.API_TOKEN}`;
    }

    const response = await axios.post(`${CONFIG.API_BASE_URL}${endpoint}`, payload, config);
    return response.data;
  } catch (error) {
    // Silent fail - IoT endpoint is optional for simulator
    // Simulator stores data directly to database, API call is just for testing
    return null;
  }
}

// ==========================================
// SIMULATOR: Generate Data for All Trucks
// ==========================================
async function generateLiveTrackingData() {
  console.log('🚀 Generating live tracking data...\n');

  try {
    // Get all simulator trucks with devices and sensors
    const trucks = await prisma.truck.findMany({
      where: {
        plate: { startsWith: 'B 900' }, // Filter simulator trucks
        status: 'active',
      },
      include: {
        device: {
          include: {
            sensor: {
              where: { status: 'active' },
            },
          },
        },
      },
    });

    if (trucks.length === 0) {
      console.log('⚠️  No simulator trucks found. Run seed first!');
      return;
    }

    console.log(`📊 Found ${trucks.length} simulator trucks\n`);

    // Generate data for each truck
    for (const truck of trucks) {
      if (!truck.device || truck.device.length === 0) {
        console.log(`⚠️  Truck ${truck.plate} has no device, skipping...`);
        continue;
      }

      const device = truck.device[0]; // Get first device
      const sensors = device.sensor || [];

      console.log(`🚛 Truck: ${truck.plate} (${truck.name})`);
      console.log(`   Device SN: ${device.sn}`);
      
      // Check if this truck should generate alert now
      const shouldGenerateAlertForTruck = shouldTruckGenerateAlert(truck.id, truck.plate);
      const isTruck1 = truck.plate === 'B 9001 SIM';
      const alertInterval = isTruck1 ? CONFIG.TRUCK_1_ALERT_INTERVAL : CONFIG.OTHER_TRUCKS_ALERT_INTERVAL;
      
      if (shouldGenerateAlertForTruck) {
        console.log(`   ⏰ Alert Window: ACTIVE (Next alert in ${alertInterval} minutes)`);
      } else {
        const lastAlert = truckLastAlertTime[truck.id];
        const elapsed = lastAlert ? Math.floor((Date.now() - lastAlert) / 60000) : 0;
        const remaining = alertInterval - elapsed;
        console.log(`   ⏰ Alert Window: INACTIVE (Next alert in ~${remaining} minutes)`);
      }

      // 1. Generate & Send DEVICE DATA (Location + Battery)
      const gpsCoord = generateGPSCoordinate(truck.id);
      const devicePayload = {
        sn: device.sn,
        cmd: 'device',
        data: {
          lat: gpsCoord.lat,
          lng: gpsCoord.lng,
          bat1: randomInRange(CONFIG.SENSOR_RANGES.BATTERY_MIN, CONFIG.SENSOR_RANGES.BATTERY_MAX, 0),
          bat2: randomInRange(CONFIG.SENSOR_RANGES.BATTERY_MIN, CONFIG.SENSOR_RANGES.BATTERY_MAX, 0),
          bat3: randomInRange(CONFIG.SENSOR_RANGES.BATTERY_MIN, CONFIG.SENSOR_RANGES.BATTERY_MAX, 0),
          lock: 0,
        },
      };

      console.log(`   📍 GPS: ${gpsCoord.lat.toFixed(6)}, ${gpsCoord.lng.toFixed(6)}`);
      
      // Save location to database
      let savedLocation = null;
      try {
        savedLocation = await prisma.location.create({
          data: {
            device_id: device.id,
            lat: gpsCoord.lat,
            long: gpsCoord.lng,
            recorded_at: new Date(),
          },
        });
        console.log(`   ✅ Location saved to database (ID: ${savedLocation.id})`);
      } catch (error) {
        console.error(`   ❌ Error saving location: ${error.message}`);
      }
      
      const deviceResult = await sendIoTData('/iot/data', devicePayload);
      if (deviceResult?.success) {
        console.log(`   ✅ Device data sent to API`);
      }

      // 2. Generate & Send SENSOR DATA for each tire
      console.log(`   🔧 Generating data for ${sensors.length} sensors:`);
      
      // Collect sensor history data to save in bulk
      const sensorHistoryBatch = [];

      for (const sensor of sensors) {
        // Tentukan apakah sensor ini akan generate anomali
        // Hanya generate anomali jika sudah waktunya untuk truck ini
        const shouldGenerateAnomaly = shouldGenerateAlertForTruck && Math.random() < 0.3; // 30% chance untuk sensor yang dipilih
        const isCriticalAnomaly = shouldGenerateAnomaly && Math.random() < CONFIG.CRITICAL_ANOMALY_CHANCE;

        // Generate tire pressure & temperature data
        let tirePressure, tireTemp, hubTemp;

        if (shouldGenerateAnomaly) {
          // Generate anomali untuk pressure atau temperature (random)
          const anomalyType = Math.random();
          
          if (anomalyType < 0.5) {
            // Anomali pada pressure
            tirePressure = generateAnomalyValue(90, 102, isCriticalAnomaly);
            tireTemp = randomInRange(CONFIG.SENSOR_RANGES.TIRE_TEMP_MIN, CONFIG.SENSOR_RANGES.TIRE_TEMP_MAX);
          } else {
            // Anomali pada temperature
            tirePressure = randomInRange(90, 102);
            tireTemp = generateAnomalyValue(40, 70, isCriticalAnomaly);
          }
          
          // Hub temp juga bisa anomali
          if (Math.random() < 0.3) {
            hubTemp = generateAnomalyValue(45, 70, isCriticalAnomaly);
          } else {
            hubTemp = randomInRange(CONFIG.SENSOR_RANGES.HUB_TEMP_MIN, CONFIG.SENSOR_RANGES.HUB_TEMP_MAX);
          }
        } else {
          // Normal values
          tirePressure = randomInRange(90, 102);
          tireTemp = randomInRange(CONFIG.SENSOR_RANGES.TIRE_TEMP_MIN, 65);
          hubTemp = randomInRange(CONFIG.SENSOR_RANGES.HUB_TEMP_MIN, 65);
        }

        const battery = randomInRange(CONFIG.SENSOR_RANGES.BATTERY_MIN, CONFIG.SENSOR_RANGES.BATTERY_MAX, 0);
        const exType = determineExceptionType(tirePressure, tireTemp);

        // Update sensor data in database
        try {
          await prisma.sensor.update({
            where: { id: sensor.id },
            data: {
              tempValue: tireTemp,
              tirepValue: tirePressure,
              exType: exType,
              bat: battery,
              updated_at: new Date(),
            },
          });
          
          // Add to sensor history batch if we have a location
          if (savedLocation) {
            sensorHistoryBatch.push({
              location_id: savedLocation.id,
              sensor_id: sensor.id,
              device_id: device.id,
              truck_id: truck.id,
              tireNo: sensor.tireNo,
              sensorNo: sensor.sensorNo,
              tempValue: tireTemp,
              tirepValue: tirePressure,
              exType: exType,
              bat: battery,
              recorded_at: savedLocation.recorded_at
            });
          }
        } catch (error) {
          console.error(`      ❌ Error updating sensor ${sensor.tireNo}: ${error.message}`);
        }

        // Send TPDATA (Tire Pressure & Temperature)
        const tpdataPayload = {
          sn: sensor.sn,
          cmd: 'tpdata',
          data: {
            tireNo: sensor.tireNo,
            tiprValue: tirePressure,
            tempValue: tireTemp,
            exType: exType,
            bat: battery,
            simNumber: sensor.simNumber,
          },
        };

        const tpdataResult = await sendIoTData('/iot/data', tpdataPayload);
        const statusIcon = shouldGenerateAnomaly ? '⚠️' : '✅';
        console.log(
          `      ${statusIcon} Tire ${sensor.tireNo}: Pressure=${tirePressure.toFixed(1)} PSI, Temp=${tireTemp.toFixed(1)}°C [${exType}]`
        );

        // Check and create alerts for tire pressure & temperature
        if (shouldGenerateAnomaly) {
          const pressureAlert = await checkAndCreateAlert(sensor, device, truck, tirePressure, 'pressure');
          const tempAlert = await checkAndCreateAlert(sensor, device, truck, tireTemp, 'tire_temp');
          
          // Mark truck as alerted if any alert was created
          if (pressureAlert || tempAlert) {
            markTruckAlerted(truck.id);
          }
        }

        // Send HUBDATA (Hub Temperature) - setiap beberapa sensor
        if (sensor.tireNo % 3 === 0) {
          const hubdataPayload = {
            sn: sensor.sn,
            cmd: 'hubdata',
            data: {
              tireNo: sensor.tireNo,
              tempValue: hubTemp,
              exType: determineExceptionType(0, hubTemp, false),
              bat: battery,
              simNumber: sensor.simNumber,
            },
          };

          const hubdataResult = await sendIoTData('/iot/data', hubdataPayload);
          if (hubdataResult?.success) {
            const hubStatusIcon = (hubTemp > 70) ? '⚠️' : '✅';
            console.log(`      ${hubStatusIcon} Hub ${sensor.tireNo}: Temp=${hubTemp.toFixed(1)}°C`);
          }

          // Check and create alerts for hub temperature
          if (hubTemp > 70) {
            const hubAlert = await checkAndCreateAlert(sensor, device, truck, hubTemp, 'hub_temp');
            
            // Mark truck as alerted if hub alert was created
            if (hubAlert) {
              markTruckAlerted(truck.id);
            }
          }
        }
      }
      
      // 3. Save sensor history batch to database
      if (sensorHistoryBatch.length > 0 && savedLocation) {
        try {
          await prisma.sensor_history.createMany({
            data: sensorHistoryBatch
          });
          console.log(`   ✅ Saved ${sensorHistoryBatch.length} sensor history records for location ${savedLocation.id}`);
        } catch (error) {
          console.error(`   ❌ Error saving sensor history: ${error.message}`);
        }
      }

      console.log(''); // Empty line between trucks
    }

    console.log('✅ Live tracking data generation completed!\n');
  } catch (error) {
    console.error('❌ Error generating live tracking data:', error);
  }
}

// ==========================================
// MAIN: Run Simulator
// ==========================================
async function runSimulator() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   TPMS LIVE TRACKING SIMULATOR - 5 TRUCKS              ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  try {
    // Check if we need to seed first
    const existingTrucks = await prisma.truck.count({
      where: { plate: { startsWith: 'B 900' } },
    });

    if (existingTrucks === 0) {
      console.log('🌱 No simulator trucks found. Running seed first...\n');
      await seedTruckData();
    } else {
      console.log(`✅ Found ${existingTrucks} simulator trucks. Skipping seed.\n`);
    }

    // Generate initial data
    console.log('🚀 Starting live tracking simulation...\n');
    await generateLiveTrackingData();

    // Set up interval to generate data every X minutes
    console.log(`⏰ Scheduled to run every ${CONFIG.INTERVAL_MINUTES} minutes`);
    console.log('   Press Ctrl+C to stop the simulator\n');

    setInterval(async () => {
      console.log(`\n⏰ [${new Date().toLocaleTimeString()}] Running scheduled data generation...`);
      await generateLiveTrackingData();
    }, CONFIG.INTERVAL_MINUTES * 60 * 1000);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// ==========================================
// CLI Commands
// ==========================================
const command = process.argv[2];

if (command === 'seed') {
  // Only seed trucks
  seedTruckData()
    .then(() => {
      console.log('✅ Seed completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
} else if (command === 'run') {
  // Run simulator
  runSimulator();
} else if (command === 'once') {
  // Generate data once without interval
  generateLiveTrackingData()
    .then(() => {
      console.log('✅ Data generation completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Data generation failed:', error);
      process.exit(1);
    });
} else {
  console.log('TPMS Live Tracking Simulator\n');
  console.log('Usage:');
  console.log('  node live-tracking-simulator.js seed   - Create 5 dummy trucks');
  console.log('  node live-tracking-simulator.js run    - Run simulator (continuous)');
  console.log('  node live-tracking-simulator.js once   - Generate data once');
  process.exit(0);
}
