// Quick Test Script untuk IoT Data API
// Jalankan: node scripts/quick-test-iot.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5009/api';

// 1. Login dulu untuk dapat token
async function login() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('✅ Login berhasil');
    return response.data.token;
  } catch (error) {
    console.error('❌ Login gagal:', error.response?.data || error.message);
    process.exit(1);
  }
}

// 2. Test IoT Data API
async function testIoTData(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Test 1: TPDATA
  console.log('\n📡 Test 1: Kirim TPDATA...');
  try {
    const tpdataRequest = {
      cmd: 'tpdata',
      sn: 'SN-SENSOR-001',
      tempValue: 75.5,
      tirepValue: 32.0,
      exType: 'normal',
      bat: 85
    };
    
    console.log('Request body:', JSON.stringify(tpdataRequest, null, 2));
    
    const response = await axios.post(
      `${BASE_URL}/iot/data`,
      tpdataRequest,
      { headers }
    );
    
    console.log('✅ Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }

  // Test 2: HUBDATA
  console.log('\n🔌 Test 2: Kirim HUBDATA...');
  try {
    const hubdataRequest = {
      cmd: 'hubdata',
      sn: 'SN-DEVICE-001',
      bat1: 90,
      bat2: 85,
      bat3: 88
    };
    
    console.log('Request body:', JSON.stringify(hubdataRequest, null, 2));
    
    const response = await axios.post(
      `${BASE_URL}/iot/data`,
      hubdataRequest,
      { headers }
    );
    
    console.log('✅ Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }

  // Test 3: STATE
  console.log('\n📊 Test 3: Kirim STATE...');
  try {
    const stateRequest = {
      cmd: 'state',
      sn: 'SN-DEVICE-001',
      status: 'active'
    };
    
    console.log('Request body:', JSON.stringify(stateRequest, null, 2));
    
    const response = await axios.post(
      `${BASE_URL}/iot/data`,
      stateRequest,
      { headers }
    );
    
    console.log('✅ Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }

  // Test 4: LOCK
  console.log('\n🔐 Test 4: Kirim LOCK...');
  try {
    const lockRequest = {
      cmd: 'lock',
      sn: 'SN-DEVICE-001',
      lock: 1
    };
    
    console.log('Request body:', JSON.stringify(lockRequest, null, 2));
    
    const response = await axios.post(
      `${BASE_URL}/iot/data`,
      lockRequest,
      { headers }
    );
    
    console.log('✅ Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Main execution
(async () => {
  console.log('🚀 Memulai Quick Test IoT Data API...\n');
  
  const token = await login();
  await testIoTData(token);
  
  console.log('\n✅ Test selesai!');
})();
