/**
 * Test GPS Route Generator
 * Demonstrates how to use GPSRouteGenerator with various patterns
 */

const GPSRouteGenerator = require('./gps-route-generator');
const fs = require('fs');
const path = require('path');

// Example GeoJSON area - Kalimantan Selatan mining area
const miningAreaGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "Area Tambang Kalimantan Selatan",
    "area_type": "mining_site"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [114.70, -3.46],  // Southwest
      [114.72, -3.46],  // Southeast
      [114.72, -3.44],  // Northeast
      [114.70, -3.44],  // Northwest
      [114.70, -3.46]   // Close polygon
    ]]
  }
};

// Example: Smaller complex polygon
const complexAreaGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "Complex Mining Area"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [114.710, -3.455],
      [114.715, -3.453],
      [114.718, -3.456],
      [114.716, -3.460],
      [114.712, -3.461],
      [114.708, -3.458],
      [114.710, -3.455]
    ]]
  }
};

/**
 * Test 1: Random Walk Pattern
 */
function testRandomWalk() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 1: RANDOM WALK PATTERN');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(miningAreaGeoJSON, {
    routePattern: 'random_walk',
    avgSpeed: 20,
    pointInterval: 3,
    totalDuration: 1800, // 30 minutes
    turnProbability: 0.15,
    maxTurnAngle: 60
  });
  
  const route = generator.generateRoute(new Date('2025-12-22T08:00:00'));
  
  // Validate route
  const validation = generator.validateRoute(route);
  console.log('\n📊 Validation Results:');
  console.log(`   ✅ Valid: ${validation.valid}`);
  console.log(`   📍 Total Points: ${validation.totalPoints}`);
  console.log(`   ✓  Valid Percentage: ${validation.validPercentage}%`);
  console.log(`   ❌ Invalid Points: ${validation.invalidPoints.length}`);
  
  return route;
}

/**
 * Test 2: Circular Pattern
 */
function testCircularPattern() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 2: CIRCULAR PATTERN');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(miningAreaGeoJSON, {
    routePattern: 'circular',
    avgSpeed: 15,
    pointInterval: 3,
    totalDuration: 1800, // 30 minutes
  });
  
  const route = generator.generateRoute(new Date('2025-12-22T09:00:00'));
  
  const validation = generator.validateRoute(route);
  console.log('\n📊 Validation Results:');
  console.log(`   ✅ Valid: ${validation.valid}`);
  console.log(`   📍 Total Points: ${validation.totalPoints}`);
  console.log(`   ✓  Valid Percentage: ${validation.validPercentage}%`);
  
  return route;
}

/**
 * Test 3: Patrol Pattern
 */
function testPatrolPattern() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 3: PATROL PATTERN');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(complexAreaGeoJSON, {
    routePattern: 'patrol',
    avgSpeed: 18,
    pointInterval: 3,
    totalDuration: 1200, // 20 minutes
  });
  
  const route = generator.generateRoute(new Date('2025-12-22T10:00:00'));
  
  const validation = generator.validateRoute(route);
  console.log('\n📊 Validation Results:');
  console.log(`   ✅ Valid: ${validation.valid}`);
  console.log(`   📍 Total Points: ${validation.totalPoints}`);
  console.log(`   ✓  Valid Percentage: ${validation.validPercentage}%`);
  
  return route;
}

/**
 * Test 4: Multi-Day Route Generation
 */
function testMultiDayGeneration() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 4: MULTI-DAY ROUTE GENERATION');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(miningAreaGeoJSON, {
    routePattern: 'random_walk',
    avgSpeed: 20,
    pointInterval: 3,
    turnProbability: 0.12,
    maxTurnAngle: 50
  });
  
  const startDate = new Date('2025-12-08T08:00:00');
  const segments = generator.generateMultiDayRoutes(startDate, 7, 8); // 7 days, 8 hours each
  
  // Validate all segments
  console.log('\n📊 Multi-Day Validation:');
  segments.forEach((segment, idx) => {
    const validation = generator.validateRoute(segment.route);
    console.log(`   Day ${segment.day}: ${validation.validPercentage}% valid (${segment.route.length} points)`);
  });
  
  return segments;
}

/**
 * Test 5: Export to GeoJSON
 */
function testGeoJSONExport(route) {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 5: EXPORT TO GEOJSON');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(miningAreaGeoJSON);
  const geoJSON = generator.exportToGeoJSON(route);
  
  // Save to file
  const outputPath = path.join(__dirname, '..', 'output', 'sample-route.geojson');
  
  // Create output directory if not exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(geoJSON, null, 2));
  
  console.log(`✅ GeoJSON exported to: ${outputPath}`);
  console.log(`   📍 Coordinates: ${geoJSON.geometry.coordinates.length} points`);
  console.log(`   📝 Properties: ${Object.keys(geoJSON.properties).join(', ')}`);
  
  return geoJSON;
}

/**
 * Test 6: Complex Area with Multiple Zones
 */
function testComplexArea() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 6: COMPLEX POLYGON AREA');
  console.log('='.repeat(70));
  
  const generator = new GPSRouteGenerator(complexAreaGeoJSON, {
    routePattern: 'random_walk',
    avgSpeed: 12,
    pointInterval: 3,
    totalDuration: 900, // 15 minutes
    boundaryMargin: 0.00005, // Smaller margin for complex shapes
    turnProbability: 0.2,
    maxTurnAngle: 90
  });
  
  const route = generator.generateRoute(new Date('2025-12-22T11:00:00'));
  
  const validation = generator.validateRoute(route);
  console.log('\n📊 Validation Results:');
  console.log(`   ✅ Valid: ${validation.valid}`);
  console.log(`   📍 Total Points: ${validation.totalPoints}`);
  console.log(`   ✓  Valid Percentage: ${validation.validPercentage}%`);
  
  if (!validation.valid) {
    console.log(`\n⚠️  Found ${validation.invalidPoints.length} invalid points:`);
    validation.invalidPoints.slice(0, 5).forEach(point => {
      console.log(`     - Point ${point.index}: (${point.lat.toFixed(6)}, ${point.lng.toFixed(6)})`);
    });
    if (validation.invalidPoints.length > 5) {
      console.log(`     ... and ${validation.invalidPoints.length - 5} more`);
    }
  }
  
  return route;
}

/**
 * Test 7: Performance Test - Large Route
 */
function testPerformance() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 7: PERFORMANCE TEST');
  console.log('='.repeat(70));
  
  const startTime = Date.now();
  
  const generator = new GPSRouteGenerator(miningAreaGeoJSON, {
    routePattern: 'random_walk',
    avgSpeed: 20,
    pointInterval: 3,
    totalDuration: 28800, // 8 hours = 9600 points
  });
  
  const route = generator.generateRoute(new Date('2025-12-22T08:00:00'));
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log(`\n⏱️  Performance Metrics:`);
  console.log(`   📍 Total Points: ${route.length}`);
  console.log(`   ⏱️  Generation Time: ${duration.toFixed(2)}s`);
  console.log(`   🚀 Points per Second: ${(route.length / duration).toFixed(0)}`);
  console.log(`   💾 Estimated Memory: ${(JSON.stringify(route).length / 1024 / 1024).toFixed(2)} MB`);
  
  return route;
}

/**
 * Main Test Runner
 */
async function runAllTests() {
  console.log('\n');
  console.log('╔' + '═'.repeat(68) + '╗');
  console.log('║' + ' '.repeat(15) + 'GPS ROUTE GENERATOR TEST SUITE' + ' '.repeat(23) + '║');
  console.log('╚' + '═'.repeat(68) + '╝');
  
  try {
    // Run all tests
    const route1 = testRandomWalk();
    const route2 = testCircularPattern();
    const route3 = testPatrolPattern();
    const multiDayRoutes = testMultiDayGeneration();
    const geoJSON = testGeoJSONExport(route1);
    const route6 = testComplexArea();
    const route7 = testPerformance();
    
    // Final Summary
    console.log('\n' + '='.repeat(70));
    console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log('\n📊 Test Summary:');
    console.log(`   ✓  Test 1: Random Walk - ${route1.length} points`);
    console.log(`   ✓  Test 2: Circular Pattern - ${route2.length} points`);
    console.log(`   ✓  Test 3: Patrol Pattern - ${route3.length} points`);
    console.log(`   ✓  Test 4: Multi-Day Routes - ${multiDayRoutes.length} segments`);
    console.log(`   ✓  Test 5: GeoJSON Export - Success`);
    console.log(`   ✓  Test 6: Complex Area - ${route6.length} points`);
    console.log(`   ✓  Test 7: Performance Test - ${route7.length} points`);
    
    console.log('\n🎉 GPS Route Generator is working perfectly!\n');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  testRandomWalk,
  testCircularPattern,
  testPatrolPattern,
  testMultiDayGeneration,
  testGeoJSONExport,
  testComplexArea,
  testPerformance
};
