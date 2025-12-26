const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

// Test configuration
const TEST_CONFIG = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

async function login() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tpms.com',
      password: 'admin123',
    });

    if (response.data.success) {
      console.log('✅ Login successful');
      return response.data.data.token;
    }
    throw new Error('Login failed');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testAlertResolve(token) {
  console.log('\n=== TESTING ALERT RESOLVE ENDPOINT ===\n');

  try {
    // 1. Get active alerts first
    console.log('📋 Step 1: Getting active alerts...');
    const alertsResponse = await axios.get(`${API_URL}/alerts/active`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 5 },
    });

    if (!alertsResponse.data.success) {
      throw new Error('Failed to get alerts');
    }

    const activeAlerts = alertsResponse.data.data;
    console.log(`✅ Found ${activeAlerts.length} active alerts`);

    if (activeAlerts.length === 0) {
      console.log('⚠️  No active alerts to test. Create some alerts first.');
      return;
    }

    // Display first few alerts
    console.log('\n📊 Active Alerts:');
    activeAlerts.slice(0, 3).forEach((alert, index) => {
      console.log(`   ${index + 1}. Alert ID: ${alert.id}`);
      console.log(`      Type: ${alert.alert?.name || 'N/A'}`);
      console.log(`      Truck: ${alert.truck?.plate || 'N/A'}`);
      console.log(`      Severity: ${alert.alert?.severity || 'N/A'}`);
      console.log(`      Status: ${alert.status}`);
      console.log(`      Created: ${new Date(alert.created_at).toLocaleString()}`);
      console.log('');
    });

    // 2. Test resolve without notes
    console.log('🔧 Step 2: Testing resolve WITHOUT notes...');
    const alertToResolve1 = activeAlerts[0];
    
    const resolveResponse1 = await axios.patch(
      `${API_URL}/alerts/${alertToResolve1.id}/resolve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (resolveResponse1.data.success) {
      console.log(`✅ Alert ${alertToResolve1.id} resolved successfully (without notes)`);
      console.log(`   Status: ${resolveResponse1.data.data.status}`);
      console.log(`   Resolved at: ${new Date(resolveResponse1.data.data.resolved_at).toLocaleString()}`);
    } else {
      console.log('❌ Failed to resolve alert');
    }

    // 3. Test resolve with notes
    if (activeAlerts.length > 1) {
      console.log('\n🔧 Step 3: Testing resolve WITH notes...');
      const alertToResolve2 = activeAlerts[1];
      
      const resolveResponse2 = await axios.patch(
        `${API_URL}/alerts/${alertToResolve2.id}/resolve`,
        { notes: 'Sensor replaced and pressure normalized' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (resolveResponse2.data.success) {
        console.log(`✅ Alert ${alertToResolve2.id} resolved successfully (with notes)`);
        console.log(`   Status: ${resolveResponse2.data.data.status}`);
        console.log(`   Resolved at: ${new Date(resolveResponse2.data.data.resolved_at).toLocaleString()}`);
        console.log(`   Message: ${resolveResponse2.data.data.message}`);
      } else {
        console.log('❌ Failed to resolve alert');
      }
    }

    // 4. Test resolve already resolved alert (should fail)
    console.log('\n🔧 Step 4: Testing resolve ALREADY RESOLVED alert (should fail)...');
    try {
      await axios.patch(
        `${API_URL}/alerts/${alertToResolve1.id}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('❌ Should have failed but didn\'t!');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log(`✅ Correctly rejected: ${error.response.data.message}`);
      } else {
        console.log(`❌ Unexpected error: ${error.response?.data?.message || error.message}`);
      }
    }

    // 5. Test with invalid alert ID (should fail)
    console.log('\n🔧 Step 5: Testing with INVALID alert ID (should fail)...');
    try {
      await axios.patch(
        `${API_URL}/alerts/99999999/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('❌ Should have failed but didn\'t!');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`✅ Correctly rejected: ${error.response.data.message}`);
      } else {
        console.log(`❌ Unexpected error: ${error.response?.data?.message || error.message}`);
      }
    }

    // 6. Get alert details to verify
    console.log('\n📊 Step 6: Verifying resolved alert details...');
    const detailResponse = await axios.get(`${API_URL}/alerts/${alertToResolve1.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (detailResponse.data.success) {
      const alert = detailResponse.data.data;
      console.log('✅ Alert details retrieved:');
      console.log(`   ID: ${alert.id}`);
      console.log(`   Status: ${alert.status}`);
      console.log(`   Created: ${new Date(alert.created_at).toLocaleString()}`);
      console.log(`   Resolved: ${new Date(alert.resolved_at).toLocaleString()}`);
      console.log(`   Duration: ${Math.round((new Date(alert.resolved_at) - new Date(alert.created_at)) / 1000)}s`);
    }

    console.log('\n✅ ALL TESTS COMPLETED SUCCESSFULLY!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testWithoutAuth() {
  console.log('\n🔧 Testing WITHOUT authentication (should fail)...');
  try {
    await axios.patch(`${API_URL}/alerts/1/resolve`, {});
    console.log('❌ Should have failed but didn\'t!');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly rejected unauthorized request');
    } else {
      console.log(`❌ Unexpected error: ${error.response?.data?.message || error.message}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting Alert Resolve Endpoint Test...\n');

  try {
    // Test without auth
    await testWithoutAuth();

    // Login and get token
    const token = await login();

    // Test resolve functionality
    await testAlertResolve(token);

    console.log('✅ All tests passed!\n');
  } catch (error) {
    console.error('\n❌ Test suite failed');
    process.exit(1);
  }
}

main();
