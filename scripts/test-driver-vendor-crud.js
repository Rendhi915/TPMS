// Test CRUD operations for Drivers and Vendors
const http = require('http');

// You need to get a valid token first by logging in
// For this test, we'll assume you have a token
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN_HERE'; // Replace with actual token

const baseUrl = 'localhost';
const port = 3001;

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: baseUrl,
      port: port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testVendorCRUD() {
  console.log('\n' + '='.repeat(70));
  console.log('🏢 TESTING VENDOR CRUD OPERATIONS');
  console.log('='.repeat(70));

  let vendorId;

  try {
    // 1. CREATE Vendor
    console.log('\n1️⃣  Testing CREATE Vendor...');
    const createData = {
      name: 'Test Vendor ' + Date.now(),
      address: 'Jl. Test No. 123, Jakarta',
      phone: '021-12345678',
      email: 'test@vendor.com',
      contactPerson: 'John Doe'
    };
    
    const createResult = await makeRequest('POST', '/api/vendors', createData);
    console.log(`   Status: ${createResult.status}`);
    
    if (createResult.status === 201 && createResult.data.success) {
      vendorId = createResult.data.data.id;
      console.log(`   ✅ Vendor created with ID: ${vendorId}`);
      console.log(`   Name: ${createResult.data.data.name}`);
    } else {
      console.log(`   ❌ Failed to create vendor`);
      console.log(`   Response:`, createResult.data);
      return;
    }

    // 2. READ Vendor (Get by ID)
    console.log('\n2️⃣  Testing READ Vendor (Get by ID)...');
    const readResult = await makeRequest('GET', `/api/vendors/${vendorId}`);
    console.log(`   Status: ${readResult.status}`);
    
    if (readResult.status === 200 && readResult.data.success) {
      console.log(`   ✅ Vendor retrieved successfully`);
      console.log(`   Name: ${readResult.data.data.name}`);
      console.log(`   Address: ${readResult.data.data.address}`);
      console.log(`   Phone: ${readResult.data.data.phone}`);
      console.log(`   Trucks: ${readResult.data.data.truck_count}`);
      console.log(`   Drivers: ${readResult.data.data.driver_count}`);
    } else {
      console.log(`   ❌ Failed to read vendor`);
      console.log(`   Response:`, readResult.data);
    }

    // 3. READ All Vendors
    console.log('\n3️⃣  Testing READ All Vendors...');
    const listResult = await makeRequest('GET', '/api/vendors');
    console.log(`   Status: ${listResult.status}`);
    
    if (listResult.status === 200 && listResult.data.success) {
      console.log(`   ✅ Vendors list retrieved successfully`);
      console.log(`   Total vendors: ${listResult.data.data.length}`);
    } else {
      console.log(`   ❌ Failed to list vendors`);
    }

    // 4. UPDATE Vendor
    console.log('\n4️⃣  Testing UPDATE Vendor...');
    const updateData = {
      address: 'Jl. Updated Address No. 456, Jakarta',
      phone: '021-87654321',
      contactPerson: 'Jane Smith'
    };
    
    const updateResult = await makeRequest('PUT', `/api/vendors/${vendorId}`, updateData);
    console.log(`   Status: ${updateResult.status}`);
    
    if (updateResult.status === 200 && updateResult.data.success) {
      console.log(`   ✅ Vendor updated successfully`);
      console.log(`   Updated Address: ${updateResult.data.data.address}`);
      console.log(`   Updated Phone: ${updateResult.data.data.phone}`);
      console.log(`   Updated Contact: ${updateResult.data.data.contactPerson}`);
    } else {
      console.log(`   ❌ Failed to update vendor`);
      console.log(`   Response:`, updateResult.data);
    }

    // 5. DELETE Vendor
    console.log('\n5️⃣  Testing DELETE Vendor...');
    const deleteResult = await makeRequest('DELETE', `/api/vendors/${vendorId}`);
    console.log(`   Status: ${deleteResult.status}`);
    
    if (deleteResult.status === 200 && deleteResult.data.success) {
      console.log(`   ✅ Vendor deleted successfully`);
    } else {
      console.log(`   ❌ Failed to delete vendor`);
      console.log(`   Response:`, deleteResult.data);
    }

    // 6. Verify deletion
    console.log('\n6️⃣  Verifying deletion...');
    const verifyResult = await makeRequest('GET', `/api/vendors/${vendorId}`);
    console.log(`   Status: ${verifyResult.status}`);
    
    if (verifyResult.status === 404) {
      console.log(`   ✅ Vendor successfully deleted (404 returned)`);
    } else {
      console.log(`   ⚠️  Unexpected status after deletion`);
    }

  } catch (error) {
    console.error('\n❌ Error during vendor CRUD test:', error.message);
  }
}

async function testDriverCRUD() {
  console.log('\n' + '='.repeat(70));
  console.log('👤 TESTING DRIVER CRUD OPERATIONS');
  console.log('='.repeat(70));

  let driverId;

  try {
    // 1. CREATE Driver
    console.log('\n1️⃣  Testing CREATE Driver...');
    const createData = {
      name: 'Test Driver ' + Date.now(),
      phone: '081234567890',
      email: 'testdriver@email.com',
      address: 'Jl. Driver Test No. 789',
      licenseNumber: 'B-' + Math.floor(Math.random() * 10000),
      licenseType: 'B2 UMUM',
      licenseExpiry: '2026-12-31',
      idCardNumber: '3174' + Math.floor(Math.random() * 1000000000000),
      vendorId: null, // or specify vendor ID if exists
      status: 'aktif'
    };
    
    const createResult = await makeRequest('POST', '/api/drivers', createData);
    console.log(`   Status: ${createResult.status}`);
    
    if (createResult.status === 201 && createResult.data.success) {
      driverId = createResult.data.data.id;
      console.log(`   ✅ Driver created with ID: ${driverId}`);
      console.log(`   Name: ${createResult.data.data.name}`);
      console.log(`   License: ${createResult.data.data.licenseNumber}`);
    } else {
      console.log(`   ❌ Failed to create driver`);
      console.log(`   Response:`, createResult.data);
      return;
    }

    // 2. READ Driver (Get by ID)
    console.log('\n2️⃣  Testing READ Driver (Get by ID)...');
    const readResult = await makeRequest('GET', `/api/drivers/${driverId}`);
    console.log(`   Status: ${readResult.status}`);
    
    if (readResult.status === 200 && readResult.data.success) {
      console.log(`   ✅ Driver retrieved successfully`);
      console.log(`   Name: ${readResult.data.data.name}`);
      console.log(`   License: ${readResult.data.data.licenseNumber} (${readResult.data.data.licenseType})`);
      console.log(`   Status: ${readResult.data.data.status}`);
      console.log(`   ID Card: ${readResult.data.data.idCardNumber}`);
    } else {
      console.log(`   ❌ Failed to read driver`);
      console.log(`   Response:`, readResult.data);
    }

    // 3. READ All Drivers
    console.log('\n3️⃣  Testing READ All Drivers...');
    const listResult = await makeRequest('GET', '/api/drivers?page=1&limit=10');
    console.log(`   Status: ${listResult.status}`);
    
    if (listResult.status === 200 && listResult.data.success) {
      console.log(`   ✅ Drivers list retrieved successfully`);
      console.log(`   Total drivers: ${listResult.data.data.pagination.total}`);
      console.log(`   Page: ${listResult.data.data.pagination.page}`);
    } else {
      console.log(`   ❌ Failed to list drivers`);
    }

    // 4. UPDATE Driver
    console.log('\n4️⃣  Testing UPDATE Driver...');
    const updateData = {
      phone: '081999888777',
      address: 'Jl. Updated Driver Address No. 999',
      status: 'aktif'
    };
    
    const updateResult = await makeRequest('PUT', `/api/drivers/${driverId}`, updateData);
    console.log(`   Status: ${updateResult.status}`);
    
    if (updateResult.status === 200 && updateResult.data.success) {
      console.log(`   ✅ Driver updated successfully`);
      console.log(`   Updated Phone: ${updateResult.data.data.phone}`);
      console.log(`   Updated Address: ${updateResult.data.data.address}`);
    } else {
      console.log(`   ❌ Failed to update driver`);
      console.log(`   Response:`, updateResult.data);
    }

    // 5. DELETE Driver
    console.log('\n5️⃣  Testing DELETE Driver...');
    const deleteResult = await makeRequest('DELETE', `/api/drivers/${driverId}`);
    console.log(`   Status: ${deleteResult.status}`);
    
    if (deleteResult.status === 200 && deleteResult.data.success) {
      console.log(`   ✅ Driver deleted successfully`);
    } else {
      console.log(`   ❌ Failed to delete driver`);
      console.log(`   Response:`, deleteResult.data);
    }

    // 6. Verify deletion
    console.log('\n6️⃣  Verifying deletion...');
    const verifyResult = await makeRequest('GET', `/api/drivers/${driverId}`);
    console.log(`   Status: ${verifyResult.status}`);
    
    if (verifyResult.status === 404) {
      console.log(`   ✅ Driver successfully deleted (404 returned)`);
    } else {
      console.log(`   ⚠️  Unexpected status after deletion`);
    }

  } catch (error) {
    console.error('\n❌ Error during driver CRUD test:', error.message);
  }
}

async function runAllTests() {
  console.log('\n' + '█'.repeat(70));
  console.log('   DRIVER & VENDOR CRUD TESTING');
  console.log('█'.repeat(70));
  console.log('\n⚠️  IMPORTANT: Update AUTH_TOKEN variable with valid token!');
  console.log('   To get token, login via: POST /api/auth/login');
  
  if (AUTH_TOKEN === 'YOUR_AUTH_TOKEN_HERE') {
    console.log('\n❌ ERROR: AUTH_TOKEN not set!');
    console.log('   Please update the AUTH_TOKEN variable in this script');
    console.log('   with a valid authentication token.\n');
    return;
  }

  await testVendorCRUD();
  await testDriverCRUD();

  console.log('\n' + '█'.repeat(70));
  console.log('   TEST COMPLETE');
  console.log('█'.repeat(70) + '\n');
}

runAllTests().catch(console.error);
