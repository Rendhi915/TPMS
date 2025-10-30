const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5009/api';

// Test credentials
const TEST_CREDENTIALS = {
  email: 'admin@tpms.com',
  password: 'admin123',
};

let authToken = '';
let createdTruckId = '';

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

const createDummyImage = () => {
  // Create a simple 1x1 pixel PNG image for testing
  const buffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  
  const testImagePath = path.join(__dirname, 'test-image.png');
  fs.writeFileSync(testImagePath, buffer);
  return testImagePath;
};

const deleteDummyImage = (imagePath) => {
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// ==========================================
// Test Cases
// ==========================================

const testCreateTruckWithImage = async () => {
  console.log('\n📝 Test: Create truck with image upload');
  
  const testImagePath = createDummyImage();
  
  try {
    const formData = new FormData();
    formData.append('name', 'Test Truck with Image');
    formData.append('plate', `TEST-IMG-${Date.now()}`);
    formData.append('type', 'Dump Truck');
    formData.append('status', 'active');
    formData.append('image', fs.createReadStream(testImagePath));
    
    const response = await axios.post(`${BASE_URL}/trucks`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    console.log('✅ SUCCESS: Truck created with image');
    console.log('Truck ID:', response.data.data.id);
    console.log('Image URL:', response.data.data.image);
    
    createdTruckId = response.data.data.id;
    
    // Verify image URL format
    if (response.data.data.image && response.data.data.image.startsWith('/uploads/trucks/')) {
      console.log('✅ Image URL format is correct');
    } else {
      console.log('⚠️  Image URL format unexpected:', response.data.data.image);
    }
    
    deleteDummyImage(testImagePath);
    return response.data.data;
  } catch (error) {
    deleteDummyImage(testImagePath);
    console.error('❌ ERROR:', error.response?.data || error.message);
    return null;
  }
};

const testCreateTruckWithoutImage = async () => {
  console.log('\n📝 Test: Create truck without image');
  
  try {
    const response = await axios.post(
      `${BASE_URL}/trucks`,
      {
        name: 'Test Truck No Image',
        plate: `TEST-NOIMG-${Date.now()}`,
        type: 'Box Truck',
        status: 'active',
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    
    console.log('✅ SUCCESS: Truck created without image');
    console.log('Truck ID:', response.data.data.id);
    console.log('Image field:', response.data.data.image || 'null');
    
    return response.data.data;
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    return null;
  }
};

const testUpdateTruckWithImage = async () => {
  if (!createdTruckId) {
    console.log('\n⚠️  Skipping update test - no truck created');
    return;
  }
  
  console.log('\n📝 Test: Update truck with new image');
  
  const testImagePath = createDummyImage();
  
  try {
    const formData = new FormData();
    formData.append('name', 'Updated Truck Name');
    formData.append('image', fs.createReadStream(testImagePath));
    
    const response = await axios.put(`${BASE_URL}/trucks/${createdTruckId}`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    console.log('✅ SUCCESS: Truck updated with new image');
    console.log('New Image URL:', response.data.data.image);
    
    deleteDummyImage(testImagePath);
    return response.data.data;
  } catch (error) {
    deleteDummyImage(testImagePath);
    console.error('❌ ERROR:', error.response?.data || error.message);
    return null;
  }
};

const testInvalidImageType = async () => {
  console.log('\n📝 Test: Upload invalid file type (should fail)');
  
  const testFilePath = path.join(__dirname, 'test-file.txt');
  fs.writeFileSync(testFilePath, 'This is not an image');
  
  try {
    const formData = new FormData();
    formData.append('name', 'Test Invalid Image');
    formData.append('plate', `TEST-INVALID-${Date.now()}`);
    formData.append('image', fs.createReadStream(testFilePath));
    
    await axios.post(`${BASE_URL}/trucks`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    console.log('❌ UNEXPECTED: Should have failed but succeeded');
    fs.unlinkSync(testFilePath);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ EXPECTED ERROR:', error.response.data.message);
    } else {
      console.error('❌ UNEXPECTED ERROR:', error.response?.data || error.message);
    }
    fs.unlinkSync(testFilePath);
  }
};

const testImageAccess = async (imageUrl) => {
  if (!imageUrl) {
    console.log('\n⚠️  Skipping image access test - no image URL');
    return;
  }
  
  console.log('\n📝 Test: Access uploaded image via URL');
  
  try {
    const fullUrl = `http://localhost:5009${imageUrl}`;
    const response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
    
    console.log('✅ SUCCESS: Image accessible');
    console.log('Content-Type:', response.headers['content-type']);
    console.log('Image size:', response.data.length, 'bytes');
  } catch (error) {
    console.error('❌ ERROR accessing image:', error.message);
  }
};

const cleanup = async () => {
  console.log('\n' + '='.repeat(60));
  console.log('CLEANUP');
  console.log('='.repeat(60));
  
  if (createdTruckId) {
    try {
      await axios.delete(`${BASE_URL}/trucks/${createdTruckId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log('✅ Cleaned up truck:', createdTruckId);
    } catch (error) {
      console.error('❌ Failed to cleanup truck:', error.response?.data?.message);
    }
  }
};

// ==========================================
// Run Tests
// ==========================================

const runTests = async () => {
  console.log('='.repeat(60));
  console.log('TRUCK IMAGE UPLOAD TESTS');
  console.log('='.repeat(60));
  
  await login();
  
  // Test 1: Create with image
  const truck1 = await testCreateTruckWithImage();
  
  // Test 2: Create without image
  await testCreateTruckWithoutImage();
  
  // Test 3: Update with new image
  await testUpdateTruckWithImage();
  
  // Test 4: Invalid file type
  await testInvalidImageType();
  
  // Test 5: Access image via URL
  if (truck1?.image) {
    await testImageAccess(truck1.image);
  }
  
  // Cleanup
  await cleanup();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ ALL TESTS COMPLETED');
  console.log('='.repeat(60));
};

// Run tests
runTests().catch((error) => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
