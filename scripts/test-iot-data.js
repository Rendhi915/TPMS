const axios = require('axios');

const BASE_URL = 'http://localhost:5009/api';

// Test credentials
const TEST_CREDENTIALS = {
  email: 'admin@tpms.com',
  password: 'admin123',
};

let authToken = '';

// Test data - sesuaikan dengan data yang ada di database Anda
const TEST_SENSOR_SN = 'SENSOR001'; // Ganti dengan sensor SN yang valid
const TEST_DEVICE_SN = 'DEVICE001'; // Ganti dengan device SN yang valid

// ==========================================
// Helper Functions
// ==========================================

const login = async () => {
  try {
    console.log('🔐 Logging in...');
    const response = await axios.post(`${BASE_URL}/auth/login`, TEST_CREDENTIALS);
    authToken = response.data.data.token;
    console.log('✅ Login successful\n');
    return authToken;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    process.exit(1);
  }
};

const sendIoTData = async (payload, testName) => {
  console.log(`\n📝 Test: ${testName}`);
  console.log('Payload:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await axios.post(`${BASE_URL}/iot/data`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ SUCCESS:', response.data.message);
    console.log('Response data:', JSON.stringify(response.data.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('❌ ERROR:', error.response.data.message);
      if (error.response.data.error) {
        console.error('   Details:', error.response.data.error);
      }
    } else {
      console.error('❌ ERROR:', error.message);
    }
    return null;
  }
};

// ==========================================
// Test Cases
// ==========================================

const testTPData = async () => {
  await sendIoTData(
    {
      cmd: 'tpdata',
      sn: TEST_SENSOR_SN,
      tempValue: 85.5,
      tirepValue: 32.5,
      exType: 'normal',
      bat: 85,
    },
    'TPDATA - Temperature & Pressure Data'
  );
};

const testTPDataMinimal = async () => {
  await sendIoTData(
    {
      cmd: 'tpdata',
      sn: TEST_SENSOR_SN,
      tempValue: 88.0,
    },
    'TPDATA - Minimal payload (only temperature)'
  );
};

const testHubData = async () => {
  await sendIoTData(
    {
      cmd: 'hubdata',
      sn: TEST_DEVICE_SN,
      bat1: 85,
      bat2: 90,
      bat3: 88,
      sim_number: '1234567890',
    },
    'HUBDATA - Hub/Device Data'
  );
};

const testHubDataPartial = async () => {
  await sendIoTData(
    {
      cmd: 'hubdata',
      sn: TEST_DEVICE_SN,
      bat1: 80,
    },
    'HUBDATA - Partial update (only bat1)'
  );
};

const testStateData = async () => {
  await sendIoTData(
    {
      cmd: 'state',
      sn: TEST_DEVICE_SN,
      status: 'active',
    },
    'STATE - Device State Update'
  );
};

const testLockDevice = async () => {
  await sendIoTData(
    {
      cmd: 'lock',
      sn: TEST_DEVICE_SN,
      lock: 1,
      type: 'device',
    },
    'LOCK - Lock Device (explicit type)'
  );
};

const testUnlockDevice = async () => {
  await sendIoTData(
    {
      cmd: 'lock',
      sn: TEST_DEVICE_SN,
      lock: 0,
    },
    'LOCK - Unlock Device (auto-detect)'
  );
};

const testLockSensor = async () => {
  await sendIoTData(
    {
      cmd: 'lock',
      sn: TEST_SENSOR_SN,
      lock: 1,
      type: 'sensor',
    },
    'LOCK - Lock Sensor'
  );
};

// ==========================================
// Error Test Cases
// ==========================================

const testMissingCmd = async () => {
  await sendIoTData(
    {
      sn: TEST_DEVICE_SN,
      bat1: 85,
    },
    'ERROR TEST - Missing cmd field (should fail)'
  );
};

const testInvalidCmd = async () => {
  await sendIoTData(
    {
      cmd: 'invalid_cmd',
      sn: TEST_DEVICE_SN,
    },
    'ERROR TEST - Invalid cmd (should fail)'
  );
};

const testMissingSN = async () => {
  await sendIoTData(
    {
      cmd: 'tpdata',
      tempValue: 85.5,
    },
    'ERROR TEST - Missing sn field (should fail)'
  );
};

const testInvalidSN = async () => {
  await sendIoTData(
    {
      cmd: 'tpdata',
      sn: 'INVALID_SENSOR_SN',
      tempValue: 85.5,
    },
    'ERROR TEST - Invalid sensor SN (should fail)'
  );
};

const testInvalidStatus = async () => {
  await sendIoTData(
    {
      cmd: 'state',
      sn: TEST_DEVICE_SN,
      status: 'invalid_status',
    },
    'ERROR TEST - Invalid status value (should fail)'
  );
};

const testInvalidLockValue = async () => {
  await sendIoTData(
    {
      cmd: 'lock',
      sn: TEST_DEVICE_SN,
      lock: 5,
    },
    'ERROR TEST - Invalid lock value (should fail)'
  );
};

// ==========================================
// Run Tests
// ==========================================

const runTests = async () => {
  console.log('='.repeat(60));
  console.log('IOT DATA ENDPOINT TESTS');
  console.log('='.repeat(60));
  console.log(`\n⚠️  IMPORTANT: Update TEST_SENSOR_SN and TEST_DEVICE_SN`);
  console.log(`   with valid serial numbers from your database!\n`);
  console.log(`Current test values:`);
  console.log(`  Sensor SN: ${TEST_SENSOR_SN}`);
  console.log(`  Device SN: ${TEST_DEVICE_SN}`);
  
  await login();
  
  console.log('\n' + '='.repeat(60));
  console.log('VALID REQUEST TESTS');
  console.log('='.repeat(60));
  
  // Valid tests
  await testTPData();
  await testTPDataMinimal();
  await testHubData();
  await testHubDataPartial();
  await testStateData();
  await testLockDevice();
  await testUnlockDevice();
  await testLockSensor();
  
  console.log('\n' + '='.repeat(60));
  console.log('ERROR HANDLING TESTS');
  console.log('='.repeat(60));
  
  // Error tests
  await testMissingCmd();
  await testInvalidCmd();
  await testMissingSN();
  await testInvalidSN();
  await testInvalidStatus();
  await testInvalidLockValue();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ ALL TESTS COMPLETED');
  console.log('='.repeat(60));
  console.log('\nNote: Some tests are expected to fail (error handling tests)');
};

// Run tests
runTests().catch((error) => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
