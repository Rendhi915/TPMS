const http = require('http');

// Test data
const testData = {
  cmd: "tpdata",
  sn: "987654321",
  data: {
    tireNo: 1,
    tiprValue: 248.2,
    tempValue: 38.2,
    exType: "1,3",
    bat: 85
  }
};

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/sensor-data/process',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('\n🧪 Testing Sensor Data Processing Endpoint');
console.log('='.repeat(50));
console.log('Request:', JSON.stringify(testData, null, 2));
console.log('='.repeat(50));

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\nStatus: ${res.statusCode} ${res.statusMessage}`);
    console.log('Response:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (res.statusCode === 200 && jsonData.success) {
        console.log('\n✅ TEST PASSED - Endpoint working correctly!');
      } else {
        console.log('\n❌ TEST FAILED - Check error above');
      }
    } catch (e) {
      console.log(data);
    }
    console.log('='.repeat(50) + '\n');
  });
});

req.on('error', (error) => {
  console.error('\n❌ ERROR:', error.message);
  console.log('\n⚠️  Make sure server is running on http://localhost:3001');
  console.log('   Run: node server.js\n');
});

req.write(JSON.stringify(testData));
req.end();
