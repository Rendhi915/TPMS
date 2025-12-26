const axios = require('axios');

const API_URL = 'http://localhost:3001/api';
let authToken = '';

async function testAlertAPI() {
  console.log('🧪 Testing Alert API with Date Filtering\n');

  try {
    // 0. Login first to get token
    console.log('0️⃣ Logging in...');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@tpms.com',
        password: 'admin123',
      });
      authToken = loginResponse.data.data.token; // Fix: token is in data.data.token
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      console.log('✅ Login successful\n');
    } catch (loginError) {
      console.error('❌ Login failed:', loginError.response?.data?.message || loginError.message);
      console.error('   Make sure admin user exists. Run: node scripts/create-admin.js\n');
      return;
    }

    // 1. Test get alerts for today
    console.log('1️⃣ Testing get alerts for today...');
    const today = new Date().toISOString().split('T')[0];
    const todayResponse = await axios.get(`${API_URL}/alerts`, {
      params: { date: today, status: 'active' },
    });
    console.log(`✅ Found ${todayResponse.data.pagination.total} alerts for ${today}`);
    console.log(`   Active: ${todayResponse.data.data.length}\n`);

    // 2. Test get alerts for date range (last 7 days)
    console.log('2️⃣ Testing get alerts for last 7 days...');
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const rangeResponse = await axios.get(`${API_URL}/alerts`, {
      params: { date_from: sevenDaysAgo, date_to: today },
    });
    console.log(
      `✅ Found ${rangeResponse.data.pagination.total} alerts from ${sevenDaysAgo} to ${today}\n`
    );

    // 3. Test get critical alerts only
    console.log('3️⃣ Testing get critical alerts...');
    const criticalResponse = await axios.get(`${API_URL}/alerts`, {
      params: { severity: 'critical', status: 'active' },
    });
    console.log(`✅ Found ${criticalResponse.data.pagination.total} critical alerts\n`);

    // 4. Test get alert stats
    console.log('4️⃣ Testing get alert statistics...');
    const statsResponse = await axios.get(`${API_URL}/alerts/stats`);
    console.log('✅ Alert Statistics:');
    console.log(`   Total: ${statsResponse.data.data.total}`);
    console.log(`   Active: ${statsResponse.data.data.active}`);
    console.log(`   Resolved: ${statsResponse.data.data.resolved}`);
    console.log(`   Warning: ${statsResponse.data.data.warning}`);
    console.log(`   Critical: ${statsResponse.data.data.critical}\n`);

    // 5. Test pagination
    console.log('5️⃣ Testing pagination...');
    const page1Response = await axios.get(`${API_URL}/alerts`, {
      params: { page: 1, limit: 5 },
    });
    console.log(`✅ Page 1: ${page1Response.data.data.length} alerts`);
    console.log(`   Total Pages: ${page1Response.data.pagination.totalPages}\n`);

    console.log('✅ All tests passed!');
  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status);
      console.error('   Message:', error.response.data.message);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend server is not running!');
      console.error('   Please start the server with: npm run dev');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

testAlertAPI();
