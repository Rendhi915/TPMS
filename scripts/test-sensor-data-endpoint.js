// Test script for sensor data processing endpoint
// This script will test all 4 command types with your actual raw JSON data

const testData = {
  // Test 1: TPMS tire pressure data (tpdata)
  tpdata: {
    cmd: "tpdata",
    sn: "987654321", // truck-spiderman device
    data: {
      tireNo: 1,
      tiprValue: 248.2,
      tempValue: 38.2,
      exType: "1,3",
      bat: 85
    }
  },

  // Test 2: Hub temperature data (hubdata)
  hubdata: {
    cmd: "hubdata",
    sn: "987654321", // truck-spiderman device
    data: {
      tireNo: 1,
      tempValue: 45.3,
      bat: 88
    }
  },

  // Test 3: GPS + device battery data (device)
  device: {
    cmd: "device",
    sn: "3462682374", // truck-ironman device
    data: {
      lng: 115.6044,
      lat: -3.5454,
      speed: 45.5,
      heading: 180,
      hdop: 1.2,
      bat1: 85,
      bat2: 90,
      bat3: 88,
      lock: 1
    }
  },

  // Test 4: Lock state data (state)
  state: {
    cmd: "state",
    sn: "3462682374", // truck-ironman device
    data: {
      is_lock: 1
    }
  }
};

// Bulk test with multiple records (like your actual raw JSON)
const bulkTestData = {
  data: [
    {
      cmd: "tpdata",
      sn: "987654321",
      data: { tireNo: 1, tiprValue: 248.2, tempValue: 38.2, exType: "1,3", bat: 85 }
    },
    {
      cmd: "tpdata",
      sn: "987654321",
      data: { tireNo: 2, tiprValue: 250.5, tempValue: 39.1, exType: "1,3", bat: 86 }
    },
    {
      cmd: "hubdata",
      sn: "987654321",
      data: { tireNo: 1, tempValue: 45.3, bat: 88 }
    },
    {
      cmd: "device",
      sn: "3462682374",
      data: {
        lng: 115.6044,
        lat: -3.5454,
        speed: 45.5,
        heading: 180,
        hdop: 1.2,
        bat1: 85,
        bat2: 90,
        bat3: 88,
        lock: 1
      }
    },
    {
      cmd: "state",
      sn: "3462682374",
      data: { is_lock: 1 }
    }
  ]
};

async function testEndpoint(url, data, testName) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🧪 Testing: ${testName}`);
  console.log(`${'='.repeat(70)}`);
  console.log('Request:', JSON.stringify(data, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    console.log(`\nStatus: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('✅ Test PASSED');
    } else {
      console.log('❌ Test FAILED');
    }

    return { success: response.ok, result };

  } catch (error) {
    console.log('❌ Test ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  const baseUrl = 'http://localhost:3001/api/sensor-data';

  console.log('\n' + '█'.repeat(70));
  console.log('   SENSOR DATA PROCESSING ENDPOINT TEST');
  console.log('█'.repeat(70));

  const results = {
    passed: 0,
    failed: 0
  };

  // Test 1: tpdata (tire pressure)
  const test1 = await testEndpoint(`${baseUrl}/process`, testData.tpdata, 'TPDATA - Tire Pressure');
  test1.success ? results.passed++ : results.failed++;

  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 2: hubdata (hub temperature)
  const test2 = await testEndpoint(`${baseUrl}/process`, testData.hubdata, 'HUBDATA - Hub Temperature');
  test2.success ? results.passed++ : results.failed++;

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 3: device (GPS + battery)
  const test3 = await testEndpoint(`${baseUrl}/process`, testData.device, 'DEVICE - GPS & Battery');
  test3.success ? results.passed++ : results.failed++;

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 4: state (lock)
  const test4 = await testEndpoint(`${baseUrl}/process`, testData.state, 'STATE - Lock Status');
  test4.success ? results.passed++ : results.failed++;

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 5: bulk processing
  const test5 = await testEndpoint(`${baseUrl}/bulk`, bulkTestData, 'BULK - Multiple Records');
  test5.success ? results.passed++ : results.failed++;

  // Summary
  console.log('\n' + '█'.repeat(70));
  console.log('   TEST SUMMARY');
  console.log('█'.repeat(70));
  console.log(`Total Tests: ${results.passed + results.failed}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log('█'.repeat(70) + '\n');
}

// Run tests if server is running
console.log('🚀 Starting sensor data endpoint tests...');
console.log('⚠️  Make sure your server is running on http://localhost:3001\n');

runTests().catch(error => {
  console.error('Test execution error:', error);
});
