const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testLogin() {
  console.log('🔐 Testing Login\n');

  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tpms.com',
      password: 'admin123',
    });

    console.log('✅ Login successful!\n');
    console.log('📊 Response Data:', JSON.stringify(response.data, null, 2));

    if (response.data.user) {
      console.log('\n👤 User Info:');
      console.log(`   Name: ${response.data.user.name}`);
      console.log(`   Email: ${response.data.user.email}`);
      console.log(`   Role: ${response.data.user.role}`);
    }

    if (response.data.token) {
      console.log('\n🔑 Token:', response.data.token.substring(0, 50) + '...\n');
    }

    return response.data.token;
  } catch (error) {
    if (error.response) {
      console.error('❌ Login failed!');
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data.message}\n`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to backend server!');
      console.error('   Please start the server with: npm run dev\n');
    } else {
      console.error('❌ Error:', error.message, '\n');
    }
    return null;
  }
}

testLogin();
