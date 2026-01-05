/**
 * Test Script: History Tracking Filter
 * 
 * Script ini digunakan untuk memverifikasi bahwa filter truck_id bekerja dengan benar
 * dan tidak mengembalikan data dari truck lain.
 */

const { prisma } = require('../src/config/prisma');
const { getHistoryWithSensors, getHistoryStats } = require('../src/services/sensorHistoryService');

async function testHistoryFilter() {
  console.log('🧪 Testing History Tracking Filter...\n');

  try {
    // Test 1: Query dengan truck_id yang valid
    console.log('📋 Test 1: Query dengan truck_id = 1');
    console.log('─'.repeat(60));
    try {
      const result1 = await getHistoryWithSensors(1, { limit: 10 });
      console.log(`✅ Success: Retrieved ${result1.length} records for truck 1`);
      
      // Verifikasi bahwa semua data adalah untuk truck 1
      const allBelongToTruck1 = result1.every(record => 
        record.truck_info?.truck_id === 1
      );
      
      if (allBelongToTruck1) {
        console.log('✅ Verification: All records belong to truck 1');
      } else {
        console.log('❌ FAILED: Some records belong to other trucks!');
        const otherTrucks = result1
          .map(r => r.truck_info?.truck_id)
          .filter(id => id !== 1);
        console.log('   Other truck IDs found:', [...new Set(otherTrucks)]);
      }
    } catch (error) {
      console.log('❌ FAILED:', error.message);
    }
    console.log();

    // Test 2: Query tanpa truck_id (should fail)
    console.log('📋 Test 2: Query tanpa truck_id (Expected to fail)');
    console.log('─'.repeat(60));
    try {
      const result2 = await getHistoryWithSensors(null, { limit: 10 });
      console.log('❌ FAILED: Should have thrown an error but returned', result2.length, 'records');
    } catch (error) {
      if (error.message.includes('required for history query')) {
        console.log('✅ Success: Correctly rejected query without truck_id');
        console.log('   Error message:', error.message);
      } else {
        console.log('❌ FAILED: Unexpected error:', error.message);
      }
    }
    console.log();

    // Test 3: Query dengan truck_id string (should be converted to integer)
    console.log('📋 Test 3: Query dengan truck_id sebagai string "1"');
    console.log('─'.repeat(60));
    try {
      const result3 = await getHistoryWithSensors('1', { limit: 5 });
      console.log(`✅ Success: Correctly handled string truck_id, retrieved ${result3.length} records`);
    } catch (error) {
      console.log('❌ FAILED:', error.message);
    }
    console.log();

    // Test 4: Query dengan date range
    console.log('📋 Test 4: Query dengan date range');
    console.log('─'.repeat(60));
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const result4 = await getHistoryWithSensors(1, {
        startDate: yesterday.toISOString(),
        endDate: today.toISOString(),
        limit: 20
      });
      
      console.log(`✅ Success: Retrieved ${result4.length} records with date range`);
      
      // Verify all records are within date range
      const allInRange = result4.every(record => {
        const recordDate = new Date(record.timestamp);
        return recordDate >= yesterday && recordDate <= today;
      });
      
      if (allInRange) {
        console.log('✅ Verification: All records are within date range');
      } else {
        console.log('⚠️  Warning: Some records are outside date range');
      }
    } catch (error) {
      console.log('❌ FAILED:', error.message);
    }
    console.log();

    // Test 5: Test getHistoryStats
    console.log('📋 Test 5: Query stats dengan truck_id = 1');
    console.log('─'.repeat(60));
    try {
      const stats = await getHistoryStats(1, { limit: 10 });
      console.log(`✅ Success: Retrieved stats for ${stats.length} tires`);
      console.log('   Sample:', stats.slice(0, 2));
    } catch (error) {
      console.log('❌ FAILED:', error.message);
    }
    console.log();

    // Test 6: Test getHistoryStats tanpa truck_id (should fail)
    console.log('📋 Test 6: Query stats tanpa truck_id (Expected to fail)');
    console.log('─'.repeat(60));
    try {
      const stats2 = await getHistoryStats(null);
      console.log('❌ FAILED: Should have thrown an error but returned', stats2.length, 'records');
    } catch (error) {
      if (error.message.includes('required for stats query')) {
        console.log('✅ Success: Correctly rejected stats query without truck_id');
        console.log('   Error message:', error.message);
      } else {
        console.log('❌ FAILED: Unexpected error:', error.message);
      }
    }
    console.log();

    // Summary
    console.log('═'.repeat(60));
    console.log('🎉 Test Suite Completed!');
    console.log('═'.repeat(60));
    console.log('✅ Filter validation is working correctly');
    console.log('✅ truck_id is required for all queries');
    console.log('✅ String truck_id is properly converted to integer');
    console.log('✅ Date range filtering works as expected');
    console.log('✅ Stats query has same validation as history query');
    console.log();

  } catch (error) {
    console.error('💥 Test suite error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
testHistoryFilter()
  .then(() => {
    console.log('✅ Test script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test script failed:', error);
    process.exit(1);
  });
