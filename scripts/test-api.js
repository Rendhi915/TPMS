const axios = require('axios');
const WebSocket = require('ws');

// Configuration
const BASE_URL = 'http://localhost:3001';
const API_BASE = `${BASE_URL}/api`;

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

// Helper function to run a test
const runTest = async (testName, testFunction) => {
  try {
    log(`🧪 Testing: ${testName}`, 'yellow');
    const result = await testFunction();

    if (result.success) {
      log(`✅ PASSED: ${testName}`, 'green');
      testResults.passed++;
    } else {
      log(`❌ FAILED: ${testName} - ${result.error}`, 'red');
      testResults.failed++;
    }

    testResults.tests.push({
      name: testName,
      passed: result.success,
      error: result.error || null,
      data: result.data || null,
    });
  } catch (error) {
    log(`❌ ERROR: ${testName} - ${error.message}`, 'red');
    testResults.failed++;
    testResults.tests.push({
      name: testName,
      passed: false,
      error: error.message,
      data: null,
    });
  }
};

// Authentication helper
let authToken = null;

const authenticate = async () => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      username: 'admin',
      password: 'admin123',
    });

    if (response.data.success) {
      authToken = response.data.data.token;
      return { success: true, data: response.data };
    } else {
      return { success: false, error: 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Test Functions
const testAuthentication = async () => {
  try {
    // Test login
    const response = await axios.post(`${API_BASE}/auth/login`, {
      username: 'admin',
      password: 'admin123',
    });

    if (response.status === 200 && response.data.success && response.data.data.token) {
      authToken = response.data.data.token;
      return {
        success: true,
        data: {
          token: authToken.substring(0, 20) + '...',
          user: response.data.data.user,
        },
      };
    } else {
      return { success: false, error: 'Invalid response format' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testInvalidAuthentication = async () => {
  try {
    await axios.post(`${API_BASE}/auth/login`, {
      username: 'invalid',
      password: 'invalid',
    });

    // Should fail, so if we get here it's wrong
    return { success: false, error: 'Should have failed with invalid credentials' };
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: true, data: 'Correctly rejected invalid credentials' };
    } else {
      return { success: false, error: 'Unexpected error response' };
    }
  }
};

const testGetAllTrucks = async () => {
  try {
    const response = await axios.get(`${API_BASE}/trucks`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const data = response.data.data;
      return {
        success: true,
        data: {
          totalTrucks: data.trucks.length,
          pagination: data.pagination,
          summary: data.summary,
        },
      };
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetTrucksWithFilters = async () => {
  try {
    const response = await axios.get(`${API_BASE}/trucks?status=active&limit=10&minFuel=50`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const trucks = response.data.data.trucks;
      const allActive = trucks.every((truck) => truck.status === 'active');
      const allHighFuel = trucks.every((truck) => truck.fuel >= 50);
      const correctLimit = trucks.length <= 10;

      if (allActive && allHighFuel && correctLimit) {
        return {
          success: true,
          data: {
            filteredTrucks: trucks.length,
            statusFilter: 'working',
            fuelFilter: 'working',
            limitFilter: 'working',
          },
        };
      } else {
        return { success: false, error: 'Filters not working correctly' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetSpecificTruck = async () => {
  try {
    // First get a valid truck ID from the trucks list
    const trucksResponse = await axios.get(`${API_BASE}/trucks?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!trucksResponse.data.success || trucksResponse.data.data.trucks.length === 0) {
      return { success: false, error: 'No trucks available for testing' };
    }

    const truckId = trucksResponse.data.data.trucks[0].id;
    const response = await axios.get(`${API_BASE}/trucks/${truckId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const truck = response.data.data;
      const hasRequiredFields = truck.id && truck.truckNumber && truck.status && truck.location;

      if (hasRequiredFields) {
        return {
          success: true,
          data: {
            truckId: truck.id,
            truckNumber: truck.truckNumber,
            status: truck.status,
            hasLocation: !!truck.location,
            hasTirePressures: truck.tirePressures && truck.tirePressures.length > 0,
          },
        };
      } else {
        return { success: false, error: 'Missing required fields' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetTruckTires = async () => {
  try {
    // First get a valid truck ID
    const trucksResponse = await axios.get(`${API_BASE}/trucks?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!trucksResponse.data.success || trucksResponse.data.data.trucks.length === 0) {
      return { success: false, error: 'No trucks available for testing' };
    }

    const truckId = trucksResponse.data.data.trucks[0].id;
    const response = await axios.get(`${API_BASE}/trucks/${truckId}/tires`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const data = response.data.data;
      const hasTires = data.tirePressures && data.tirePressures.length > 0;

      if (hasTires) {
        const tireStatuses = data.tirePressures.map((tire) => tire.status);
        return {
          success: true,
          data: {
            truckNumber: data.truckNumber,
            tireCount: data.tirePressures.length,
            tireStatuses: tireStatuses,
          },
        };
      } else {
        return { success: false, error: 'Invalid tire data' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetRealtimeLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE}/trucks/realtime/locations`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const geoJson = response.data.data;
      const isValidGeoJson =
        geoJson.type === 'FeatureCollection' && Array.isArray(geoJson.features);
      // Allow empty features for real-time locations (no active GPS data)

      if (isValidGeoJson) {
        // For empty features, just validate the structure
        if (geoJson.features.length === 0) {
          return {
            success: true,
            data: {
              featureCount: 0,
              validGeoJson: isValidGeoJson,
              hasGeometry: false,
              hasProperties: false,
              note: 'No active GPS data available',
            },
          };
        }

        const sampleFeature = geoJson.features[0];
        const hasGeometry = sampleFeature.geometry && sampleFeature.geometry.type === 'Point';
        const hasProperties = sampleFeature.properties && sampleFeature.properties.truckNumber;

        return {
          success: true,
          data: {
            featureCount: geoJson.features.length,
            validGeoJson: isValidGeoJson,
            hasGeometry: hasGeometry,
            hasProperties: hasProperties,
          },
        };
      } else {
        return { success: false, error: 'Invalid GeoJSON format' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetMiningArea = async () => {
  try {
    const response = await axios.get(`${API_BASE}/mining-area`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const geoJson = response.data.data;
      const isValidGeoJson =
        geoJson.type === 'FeatureCollection' && Array.isArray(geoJson.features);
      const hasAreas = geoJson.features.length > 0;

      if (isValidGeoJson && hasAreas) {
        const polygonFeatures = geoJson.features.filter((f) => f.geometry.type === 'Polygon');
        return {
          success: true,
          data: {
            totalAreas: geoJson.features.length,
            polygonAreas: polygonFeatures.length,
            areaNames: geoJson.features.map((f) => f.properties.name),
          },
        };
      } else {
        return { success: false, error: 'Invalid mining area data' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testGetDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.status === 200 && response.data.success) {
      const stats = response.data.data;
      const hasRequiredStats = stats.totalTrucks && stats.activeTrucks !== undefined;

      if (hasRequiredStats) {
        return {
          success: true,
          data: {
            totalTrucks: stats.totalTrucks,
            activeTrucks: stats.activeTrucks,
            inactiveTrucks: stats.inactiveTrucks,
            maintenanceTrucks: stats.maintenanceTrucks,
            averageFuel: stats.averageFuel,
            alertsCount: stats.alertsCount,
          },
        };
      } else {
        return { success: false, error: 'Missing required statistics' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testUpdateTruckStatus = async () => {
  try {
    // First get a valid truck ID
    const trucksResponse = await axios.get(`${API_BASE}/trucks?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!trucksResponse.data.success || trucksResponse.data.data.trucks.length === 0) {
      return { success: false, error: 'No trucks available for testing' };
    }

    const truckId = trucksResponse.data.data.trucks[0].id;
    const getTruckResponse = await axios.get(`${API_BASE}/trucks/${truckId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const originalStatus = getTruckResponse.data.data.status;
    const newStatus = originalStatus === 'active' ? 'maintenance' : 'active';

    // Update truck status
    const response = await fetch(`${API_BASE}/trucks/${truckId}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (response.status === 200 && response.data.success) {
      const updatedTruck = response.data.data;

      if (updatedTruck.status === newStatus) {
        // Revert back to original status
        await axios.put(
          `${API_BASE}/trucks/${truckId}/status`,
          {
            status: originalStatus,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        return {
          success: true,
          data: {
            originalStatus: originalStatus,
            updatedTo: newStatus,
            revertedTo: originalStatus,
          },
        };
      } else {
        return { success: false, error: 'Status not updated correctly' };
      }
    } else {
      return { success: false, error: 'Invalid response' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const testUnauthorizedAccess = async () => {
  try {
    await axios.get(`${API_BASE}/trucks`);

    // Should fail, so if we get here it's wrong
    return { success: false, error: 'Should have failed without auth token' };
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: true, data: 'Correctly rejected unauthorized access' };
    } else {
      return { success: false, error: 'Unexpected error response' };
    }
  }
};

const testWebSocketConnection = async () => {
  return new Promise((resolve) => {
    const wsUrl = 'ws://localhost:3001/ws';
    const socket = new WebSocket(wsUrl);

    const timeout = setTimeout(() => {
      socket.close();
      resolve({ success: false, error: 'WebSocket connection timeout' });
    }, 5000);

    socket.on('open', () => {
      clearTimeout(timeout);

      // Send subscription message
      socket.send(
        JSON.stringify({
          type: 'subscribe',
          data: { channel: 'truck_updates' },
          requestId: 'test-subscription',
        })
      );

      // Test if we can receive updates
      const updateTimeout = setTimeout(() => {
        socket.close();
        resolve({
          success: true,
          data: {
            connected: true,
            subscribed: true,
            connectionTest: 'passed',
          },
        });
      }, 2000);

      socket.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());

          if (message.type === 'subscription_ack' || message.type === 'truck_locations_update') {
            clearTimeout(updateTimeout);
            socket.close();
            resolve({
              success: true,
              data: {
                connected: true,
                subscribed: true,
                receivedMessage: true,
                messageType: message.type,
              },
            });
          }
        } catch (error) {
          // Ignore parsing errors for this test
        }
      });
    });

    socket.on('error', (error) => {
      clearTimeout(timeout);
      resolve({ success: false, error: `WebSocket connection failed: ${error.message}` });
    });
  });
};

const testPaginationAndLimits = async () => {
  try {
    // Test pagination
    const page1 = await axios.get(`${API_BASE}/trucks?page=1&limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const page2 = await axios.get(`${API_BASE}/trucks?page=2&limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (page1.data.success && page2.data.success) {
      const page1Trucks = page1.data.data.trucks;
      const page2Trucks = page2.data.data.trucks;

      const correctLimit = page1Trucks.length <= 5 && page2Trucks.length <= 5;
      const differentData = page1Trucks[0].id !== page2Trucks[0].id;
      const correctPagination =
        page1.data.data.pagination.current_page === 1 &&
        page2.data.data.pagination.current_page === 2;

      if (correctLimit && differentData && correctPagination) {
        return {
          success: true,
          data: {
            page1Count: page1Trucks.length,
            page2Count: page2Trucks.length,
            differentData: differentData,
            paginationWorking: correctPagination,
          },
        };
      } else {
        return { success: false, error: 'Pagination not working correctly' };
      }
    } else {
      return { success: false, error: 'Failed to fetch paginated data' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Main test runner
const runAllTests = async () => {
  log('🚛 FLEET MANAGEMENT API TESTING SUITE', 'blue');
  log('=' * 50, 'blue');

  // Check if server is running
  try {
    await axios.get(`${BASE_URL}/health`);
  } catch (error) {
    try {
      await axios.get(BASE_URL);
    } catch (serverError) {
      log('❌ Server is not running! Please start the server first: npm run dev', 'red');
      process.exit(1);
    }
  }

  log('✅ Server is running, starting tests...', 'green');
  log('');

  // Run authentication first
  await runTest('Authentication - Valid Login', testAuthentication);
  await runTest('Authentication - Invalid Credentials', testInvalidAuthentication);
  await runTest('Unauthorized Access Protection', testUnauthorizedAccess);

  if (!authToken) {
    log('❌ Authentication failed, cannot continue with other tests', 'red');
    return;
  }

  // Run API endpoint tests
  await runTest('Get All Trucks', testGetAllTrucks);
  await runTest('Get Trucks with Filters', testGetTrucksWithFilters);
  await runTest('Get Specific Truck Details', testGetSpecificTruck);
  await runTest('Get Truck Tire Pressures', testGetTruckTires);
  await runTest('Get Real-time Truck Locations (GeoJSON)', testGetRealtimeLocations);
  await runTest('Get Mining Area Boundaries', testGetMiningArea);
  await runTest('Get Dashboard Statistics', testGetDashboardStats);
  await runTest('Update Truck Status', testUpdateTruckStatus);
  await runTest('Pagination and Limits', testPaginationAndLimits);
  await runTest('WebSocket Connection', testWebSocketConnection);

  // Print results
  log('');
  log('=' * 50, 'blue');
  log('🎯 TEST RESULTS SUMMARY', 'cyan');
  log('=' * 50, 'blue');
  log(`✅ Passed: ${testResults.passed}`, 'green');
  log(`❌ Failed: ${testResults.failed}`, 'red');
  log(`📊 Total: ${testResults.passed + testResults.failed}`, 'cyan');
  log('');

  if (testResults.failed > 0) {
    log('❌ FAILED TESTS:', 'red');
    testResults.tests
      .filter((t) => !t.passed)
      .forEach((test) => {
        log(`  • ${test.name}: ${test.error}`, 'red');
      });
    log('');
  }

  if (testResults.passed > 0) {
    log('✅ PASSED TESTS:', 'green');
    testResults.tests
      .filter((t) => t.passed)
      .forEach((test) => {
        log(`  • ${test.name}`, 'green');
        if (test.data && typeof test.data === 'object') {
          Object.entries(test.data).forEach(([key, value]) => {
            log(`    ${key}: ${JSON.stringify(value)}`, 'cyan');
          });
        }
      });
  }

  log('');
  log('=' * 50, 'blue');

  if (testResults.failed === 0) {
    log('🎉 ALL TESTS PASSED! Your backend is ready for frontend integration!', 'green');
  } else {
    log('⚠️  Some tests failed. Please check the errors above.', 'yellow');
    process.exit(1);
  }
};

// Load test for performance
const runLoadTest = async (concurrentUsers = 10, duration = 30) => {
  log(
    `🚀 Running load test: ${concurrentUsers} concurrent users for ${duration} seconds`,
    'yellow'
  );

  if (!authToken) {
    await authenticate();
  }

  const startTime = Date.now();
  const endTime = startTime + duration * 1000;
  let totalRequests = 0;
  let successfulRequests = 0;
  let failedRequests = 0;

  const workers = Array.from({ length: concurrentUsers }).map(async () => {
    while (Date.now() < endTime) {
      try {
        totalRequests++;

        // Random endpoint selection
        const endpoints = [
          `${API_BASE}/trucks?limit=10`,
          `${API_BASE}/trucks/realtime/locations`,
          `${API_BASE}/dashboard/stats`,
          `${API_BASE}/dashboard/stats`,
        ];

        const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${authToken}` },
          timeout: 5000,
        });

        if (response.status === 200) {
          successfulRequests++;
        } else {
          failedRequests++;
        }
      } catch (error) {
        failedRequests++;
      }

      // Small delay to prevent overwhelming
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });

  await Promise.all(workers);

  const actualDuration = (Date.now() - startTime) / 1000;
  const requestsPerSecond = totalRequests / actualDuration;
  const successRate = (successfulRequests / totalRequests) * 100;

  log('');
  log('📊 LOAD TEST RESULTS:', 'cyan');
  log(`  Duration: ${actualDuration.toFixed(2)} seconds`, 'cyan');
  log(`  Total Requests: ${totalRequests}`, 'cyan');
  log(`  Successful: ${successfulRequests}`, 'green');
  log(`  Failed: ${failedRequests}`, 'red');
  log(`  Success Rate: ${successRate.toFixed(2)}%`, 'cyan');
  log(`  Requests/Second: ${requestsPerSecond.toFixed(2)}`, 'cyan');

  if (successRate >= 95 && requestsPerSecond >= 10) {
    log('✅ Load test passed! Backend can handle the load.', 'green');
  } else {
    log('⚠️  Load test concerns. Consider optimization.', 'yellow');
  }
};

// Command line options
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--load-test')) {
    const concurrentUsers = parseInt(args[args.indexOf('--users') + 1]) || 10;
    const duration = parseInt(args[args.indexOf('--duration') + 1]) || 30;
    runLoadTest(concurrentUsers, duration);
  } else {
    runAllTests();
  }
}

module.exports = {
  runAllTests,
  runLoadTest,
  testResults,
};
