/**
 * TPMS Backend - CRUD Endpoints Test Script
 * Tests all CRUD operations for Sensors, Trucks, Drivers, and Vendors
 */

const axios = require('axios');

// const BASE_URL = 'https://be-tpms.connectis.my.id/api';
const BASE_URL = 'http://localhost:3001/api'; // Uncomment for local testing

let authToken = null;

// Login to get token
async function login() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin@tpms.com',
      password: 'admin123',
    });

    if (response.data.success) {
      authToken = response.data.data.token;
      console.log('✅ Login successful\n');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return false;
  }
}

// Helper function for API calls
async function apiCall(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
}

// ==========================================
// SENSOR CRUD TESTS
// ==========================================

async function testSensorCRUD() {
  console.log('\n🔧 === TESTING SENSOR CRUD ===\n');

  let createdSensorId = null;

  // 1. GET all sensors
  console.log('1️⃣ GET /api/sensors - Get all sensors');
  const getAllResult = await apiCall('GET', '/sensors?page=1&limit=10');
  if (getAllResult.success) {
    const count = getAllResult.data.data.sensors.length;
    console.log(`   ✅ Success - Retrieved ${count} sensors`);
    if (count > 0) {
      console.log(
        `   📝 First sensor: ${getAllResult.data.data.sensors[0].sn} (ID: ${getAllResult.data.data.sensors[0].id})`
      );
    }
  } else {
    console.log(`   ❌ Failed - ${getAllResult.error}`);
  }

  // 2. GET sensor by ID
  if (getAllResult.success && getAllResult.data.data.sensors.length > 0) {
    const testSensorId = getAllResult.data.data.sensors[0].id;
    console.log(`\n2️⃣ GET /api/sensors/${testSensorId} - Get sensor by ID`);
    const getByIdResult = await apiCall('GET', `/sensors/${testSensorId}`);
    if (getByIdResult.success) {
      const sensor = getByIdResult.data.data;
      console.log(
        `   ✅ Success - Sensor: ${sensor.sn}, TireNo: ${sensor.tireNo}, Status: ${sensor.status}`
      );
    } else {
      console.log(`   ❌ Failed - ${getByIdResult.error}`);
    }
  }

  // 3. CREATE new sensor
  console.log('\n3️⃣ POST /api/sensors/create - Create new sensor');
  // Get a device_id first
  const devicesResult = await apiCall('GET', '/devices?page=1&limit=1');
  if (devicesResult.success && devicesResult.data.data.devices.length > 0) {
    const deviceId = devicesResult.data.data.devices[0].id;
    const newSensor = {
      sn: `TEST-SN-${Date.now()}`,
      device_id: deviceId,
      tireNo: 99,
      sensorNo: `TEST-SENSOR-${Date.now()}`,
      simNumber: `SIM${Date.now()}`,
      sensor_lock: 'unlocked',
      status: 'active',
    };

    const createResult = await apiCall('POST', '/sensors/create', newSensor);
    if (createResult.success) {
      createdSensorId = createResult.data.data.id;
      console.log(
        `   ✅ Success - Created sensor ID: ${createdSensorId}, SN: ${createResult.data.data.sn}`
      );
    } else {
      console.log(`   ❌ Failed - ${createResult.error}`);
    }
  } else {
    console.log('   ⚠️ Skipped - No devices available for testing');
  }

  // 4. UPDATE sensor
  if (createdSensorId) {
    console.log(`\n4️⃣ PUT /api/sensors/${createdSensorId} - Update sensor`);
    const updateData = {
      sensor_lock: 'locked',
      status: 'inactive',
    };

    const updateResult = await apiCall('PUT', `/sensors/${createdSensorId}`, updateData);
    if (updateResult.success) {
      console.log(
        `   ✅ Success - Updated sensor, Status: ${updateResult.data.data.status}, Lock: ${updateResult.data.data.sensor_lock}`
      );
    } else {
      console.log(`   ❌ Failed - ${updateResult.error}`);
    }
  }

  // 5. DELETE sensor
  if (createdSensorId) {
    console.log(`\n5️⃣ DELETE /api/sensors/${createdSensorId} - Delete sensor`);
    const deleteResult = await apiCall('DELETE', `/sensors/${createdSensorId}`);
    if (deleteResult.success) {
      console.log('   ✅ Success - Sensor deleted');
    } else {
      console.log(`   ❌ Failed - ${deleteResult.error}`);
    }
  }
}

// ==========================================
// TRUCK CRUD TESTS
// ==========================================

async function testTruckCRUD() {
  console.log('\n🚛 === TESTING TRUCK CRUD ===\n');

  let createdTruckId = null;

  // 1. GET all trucks
  console.log('1️⃣ GET /api/trucks - Get all trucks');
  const getAllResult = await apiCall('GET', '/trucks?page=1&limit=10');
  if (getAllResult.success) {
    const count = getAllResult.data.data.trucks.length;
    console.log(`   ✅ Success - Retrieved ${count} trucks`);
    if (count > 0) {
      console.log(
        `   📝 First truck: ${getAllResult.data.data.trucks[0].truck_name} (${getAllResult.data.data.trucks[0].license_plate})`
      );
    }
  } else {
    console.log(`   ❌ Failed - ${getAllResult.error}`);
  }

  // 2. GET truck by ID
  if (getAllResult.success && getAllResult.data.data.trucks.length > 0) {
    const testTruckId = getAllResult.data.data.trucks[0].id;
    console.log(`\n2️⃣ GET /api/trucks/${testTruckId} - Get truck by ID`);
    const getByIdResult = await apiCall('GET', `/trucks/${testTruckId}`);
    if (getByIdResult.success) {
      const truck = getByIdResult.data.data;
      console.log(`   ✅ Success - Truck: ${truck.truck_name}, Status: ${truck.status}`);
    } else {
      console.log(`   ❌ Failed - ${getByIdResult.error}`);
    }
  }

  // 3. CREATE new truck
  console.log('\n3️⃣ POST /api/trucks - Create new truck');
  // Get a vendor_id first
  const vendorsResult = await apiCall('GET', '/vendors?page=1&limit=1');
  if (vendorsResult.success && vendorsResult.data.data.vendors.length > 0) {
    const vendorId = vendorsResult.data.data.vendors[0].id;
    const newTruck = {
      truck_name: `TEST-TRUCK-${Date.now()}`,
      license_plate: `B ${Date.now()} TST`,
      model: 'Test Model',
      year: 2024,
      status: 'active',
      vendor_id: vendorId,
      tire_count: 10,
    };

    const createResult = await apiCall('POST', '/trucks', newTruck);
    if (createResult.success) {
      createdTruckId = createResult.data.data.id;
      console.log(`   ✅ Success - Created truck: ${createResult.data.data.truck_name}`);
    } else {
      console.log(`   ❌ Failed - ${createResult.error}`);
    }
  } else {
    console.log('   ⚠️ Skipped - No vendors available for testing');
  }

  // 4. UPDATE truck
  if (createdTruckId) {
    console.log(`\n4️⃣ PUT /api/trucks/${createdTruckId} - Update truck`);
    const updateData = {
      status: 'maintenance',
      model: 'Updated Model',
    };

    const updateResult = await apiCall('PUT', `/trucks/${createdTruckId}`, updateData);
    if (updateResult.success) {
      console.log(`   ✅ Success - Updated truck, Status: ${updateResult.data.data.status}`);
    } else {
      console.log(`   ❌ Failed - ${updateResult.error}`);
    }
  }

  // 5. DELETE truck
  if (createdTruckId) {
    console.log(`\n5️⃣ DELETE /api/trucks/${createdTruckId} - Delete truck`);
    const deleteResult = await apiCall('DELETE', `/trucks/${createdTruckId}`);
    if (deleteResult.success) {
      console.log('   ✅ Success - Truck deleted');
    } else {
      console.log(`   ❌ Failed - ${deleteResult.error}`);
    }
  }
}

// ==========================================
// DRIVER CRUD TESTS
// ==========================================

async function testDriverCRUD() {
  console.log('\n👨‍✈️ === TESTING DRIVER CRUD ===\n');

  let createdDriverId = null;

  // 1. GET all drivers
  console.log('1️⃣ GET /api/drivers - Get all drivers');
  const getAllResult = await apiCall('GET', '/drivers?page=1&limit=10');
  if (getAllResult.success) {
    const count = getAllResult.data.data.drivers.length;
    console.log(`   ✅ Success - Retrieved ${count} drivers`);
    if (count > 0) {
      console.log(
        `   📝 First driver: ${getAllResult.data.data.drivers[0].name} (License: ${getAllResult.data.data.drivers[0].license_number})`
      );
    }
  } else {
    console.log(`   ❌ Failed - ${getAllResult.error}`);
  }

  // 2. GET driver by ID
  if (getAllResult.success && getAllResult.data.data.drivers.length > 0) {
    const testDriverId = getAllResult.data.data.drivers[0].id;
    console.log(`\n2️⃣ GET /api/drivers/${testDriverId} - Get driver by ID`);
    const getByIdResult = await apiCall('GET', `/drivers/${testDriverId}`);
    if (getByIdResult.success) {
      const driver = getByIdResult.data.data;
      console.log(`   ✅ Success - Driver: ${driver.name}, License: ${driver.license_number}`);
    } else {
      console.log(`   ❌ Failed - ${getByIdResult.error}`);
    }
  }

  // 3. CREATE new driver
  console.log('\n3️⃣ POST /api/drivers - Create new driver');
  const vendorsResult = await apiCall('GET', '/vendors?page=1&limit=1');
  if (vendorsResult.success && vendorsResult.data.data.vendors.length > 0) {
    const vendorId = vendorsResult.data.data.vendors[0].id;
    const newDriver = {
      name: `Test Driver ${Date.now()}`,
      telephone: `08${Date.now().toString().slice(-9)}`,
      email: `testdriver${Date.now()}@test.com`,
      license_number: `LIC${Date.now()}`,
      license_type: 'B2',
      license_expiry: '2025-12-31',
      vendor_id: vendorId,
      status: 'active',
    };

    const createResult = await apiCall('POST', '/drivers', newDriver);
    if (createResult.success) {
      createdDriverId = createResult.data.data.id;
      console.log(`   ✅ Success - Created driver: ${createResult.data.data.name}`);
    } else {
      console.log(`   ❌ Failed - ${createResult.error}`);
    }
  } else {
    console.log('   ⚠️ Skipped - No vendors available for testing');
  }

  // 4. UPDATE driver
  if (createdDriverId) {
    console.log(`\n4️⃣ PUT /api/drivers/${createdDriverId} - Update driver`);
    const updateData = {
      status: 'inactive',
      telephone: '081234567890',
    };

    const updateResult = await apiCall('PUT', `/drivers/${createdDriverId}`, updateData);
    if (updateResult.success) {
      console.log(`   ✅ Success - Updated driver, Status: ${updateResult.data.data.status}`);
    } else {
      console.log(`   ❌ Failed - ${updateResult.error}`);
    }
  }

  // 5. DELETE driver
  if (createdDriverId) {
    console.log(`\n5️⃣ DELETE /api/drivers/${createdDriverId} - Delete driver`);
    const deleteResult = await apiCall('DELETE', `/drivers/${createdDriverId}`);
    if (deleteResult.success) {
      console.log('   ✅ Success - Driver deleted');
    } else {
      console.log(`   ❌ Failed - ${deleteResult.error}`);
    }
  }
}

// ==========================================
// VENDOR CRUD TESTS
// ==========================================

async function testVendorCRUD() {
  console.log('\n🏢 === TESTING VENDOR CRUD ===\n');

  let createdVendorId = null;

  // 1. GET all vendors
  console.log('1️⃣ GET /api/vendors - Get all vendors');
  const getAllResult = await apiCall('GET', '/vendors?page=1&limit=10');
  if (getAllResult.success) {
    const count = getAllResult.data.data.vendors.length;
    console.log(`   ✅ Success - Retrieved ${count} vendors`);
    if (count > 0) {
      console.log(
        `   📝 First vendor: ${getAllResult.data.data.vendors[0].name} (${getAllResult.data.data.vendors[0].telephone})`
      );
    }
  } else {
    console.log(`   ❌ Failed - ${getAllResult.error}`);
  }

  // 2. GET vendor by ID
  if (getAllResult.success && getAllResult.data.data.vendors.length > 0) {
    const testVendorId = getAllResult.data.data.vendors[0].id;
    console.log(`\n2️⃣ GET /api/vendors/${testVendorId} - Get vendor by ID`);
    const getByIdResult = await apiCall('GET', `/vendors/${testVendorId}`);
    if (getByIdResult.success) {
      const vendor = getByIdResult.data.data;
      console.log(`   ✅ Success - Vendor: ${vendor.name}, Contact: ${vendor.contact_person}`);
    } else {
      console.log(`   ❌ Failed - ${getByIdResult.error}`);
    }
  }

  // 3. CREATE new vendor
  console.log('\n3️⃣ POST /api/vendors - Create new vendor');
  const newVendor = {
    name_vendor: `Test Vendor ${Date.now()}`,
    address: 'Test Address 123',
    telephone: `021${Date.now().toString().slice(-8)}`,
    email: `testvendor${Date.now()}@test.com`,
    contact_person: 'Test Contact Person',
  };

  const createResult = await apiCall('POST', '/vendors', newVendor);
  if (createResult.success) {
    createdVendorId = createResult.data.data.id;
    console.log(`   ✅ Success - Created vendor: ${createResult.data.data.name}`);
  } else {
    console.log(`   ❌ Failed - ${createResult.error}`);
  }

  // 4. UPDATE vendor
  if (createdVendorId) {
    console.log(`\n4️⃣ PUT /api/vendors/${createdVendorId} - Update vendor`);
    const updateData = {
      contact_person: 'Updated Contact Person',
      telephone: '0211234567',
    };

    const updateResult = await apiCall('PUT', `/vendors/${createdVendorId}`, updateData);
    if (updateResult.success) {
      console.log(
        `   ✅ Success - Updated vendor, Contact: ${updateResult.data.data.contact_person}`
      );
    } else {
      console.log(`   ❌ Failed - ${updateResult.error}`);
    }
  }

  // 5. DELETE vendor
  if (createdVendorId) {
    console.log(`\n5️⃣ DELETE /api/vendors/${createdVendorId} - Delete vendor`);
    const deleteResult = await apiCall('DELETE', `/vendors/${createdVendorId}`);
    if (deleteResult.success) {
      console.log('   ✅ Success - Vendor deleted');
    } else {
      console.log(`   ❌ Failed - ${deleteResult.error}`);
    }
  }
}

// ==========================================
// MAIN EXECUTION
// ==========================================

async function main() {
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║   TPMS Backend - CRUD Endpoints Test Suite       ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');
  console.log(`Testing API: ${BASE_URL}\n`);

  // Login first
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.log('\n❌ Cannot proceed without authentication');
    process.exit(1);
  }

  // Run all CRUD tests
  await testSensorCRUD();
  await testTruckCRUD();
  await testDriverCRUD();
  await testVendorCRUD();

  // Summary
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║              TEST SUITE COMPLETED                 ║');
  console.log('╚═══════════════════════════════════════════════════╝');
  console.log('\n✅ All CRUD operations tested');
  console.log('📋 Check results above for details');
  console.log('\n💡 Endpoints tested:');
  console.log('   - Sensors: GET, GET by ID, POST, PUT, DELETE');
  console.log('   - Trucks: GET, GET by ID, POST, PUT, DELETE');
  console.log('   - Drivers: GET, GET by ID, POST, PUT, DELETE');
  console.log('   - Vendors: GET, GET by ID, POST, PUT, DELETE');
}

// Run the test suite
main().catch((error) => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
