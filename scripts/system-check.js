const axios = require('axios');
const { PrismaClient } = require('../prisma/generated/client');
require('dotenv').config();

const prisma = new PrismaClient();

// Configuration check
const config = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://be-tpms.connectis.my.id',
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV || 'development',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'https://connectis.my.id',
  },
};

async function checkSystemCompatibility() {
  console.log('\n🔍 ===== SYSTEM COMPATIBILITY CHECK =====\n');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  // 1. Environment Variables Check
  console.log('1️⃣  ENVIRONMENT CONFIGURATION');
  console.log('─'.repeat(50));

  if (config.database.host === 'connectis.my.id') {
    console.log('✅ Database: Remote server (connectis.my.id)');
    results.passed++;
  } else if (config.database.host === 'localhost') {
    console.log('⚠️  Database: LOCAL server (not production)');
    results.warnings++;
  } else {
    console.log(`✅ Database: ${config.database.host}`);
    results.passed++;
  }

  if (config.api.baseUrl.includes('be-tpms.connectis.my.id')) {
    console.log('✅ API URL: Production server (be-tpms.connectis.my.id)');
    results.passed++;
  } else if (config.api.baseUrl.includes('localhost')) {
    console.log('❌ API URL: LOCAL (should be production server)');
    results.failed++;
  } else {
    console.log(`✅ API URL: ${config.api.baseUrl}`);
    results.passed++;
  }

  if (config.frontend.url.includes('connectis.my.id')) {
    console.log('✅ Frontend URL: Production (connectis.my.id)');
    results.passed++;
  } else {
    console.log(`⚠️  Frontend URL: ${config.frontend.url}`);
    results.warnings++;
  }

  console.log(`   Port: ${config.api.port}`);
  console.log(`   Environment: ${config.api.environment}`);
  console.log('');

  // 2. Database Connection Check
  console.log('2️⃣  DATABASE CONNECTION');
  console.log('─'.repeat(50));

  try {
    await prisma.$connect();
    console.log('✅ Database connection: SUCCESS');
    results.passed++;

    const truckCount = await prisma.truck.count();
    const deviceCount = await prisma.device.count();
    const sensorCount = await prisma.sensor.count();

    console.log(`   • Trucks: ${truckCount}`);
    console.log(`   • Devices: ${deviceCount}`);
    console.log(`   • Sensors: ${sensorCount}`);

    if (truckCount > 0 && deviceCount > 0 && sensorCount > 0) {
      console.log('✅ Sample data: Available');
      results.passed++;
    } else {
      console.log('⚠️  Sample data: Missing some data');
      results.warnings++;
    }
  } catch (error) {
    console.log('❌ Database connection: FAILED');
    console.log(`   Error: ${error.message}`);
    results.failed++;
  }
  console.log('');

  // 3. API Server Check (if running)
  console.log('3️⃣  API SERVER STATUS');
  console.log('─'.repeat(50));

  try {
    const response = await axios.get(`http://localhost:${config.api.port}/health`, {
      timeout: 5000,
    });

    if (response.status === 200) {
      console.log('✅ API Server: RUNNING');
      console.log(`   Status: ${response.status}`);
      results.passed++;

      // Test authentication endpoint
      try {
        const loginResponse = await axios.post(
          `http://localhost:${config.api.port}/api/auth/login`,
          {
            username: 'admin@tpms.com',
            password: 'admin123',
          },
          { timeout: 5000 }
        );

        if (loginResponse.data.success && loginResponse.data.data.token) {
          console.log('✅ Authentication: Working');
          results.passed++;
        } else {
          console.log('❌ Authentication: Failed');
          results.failed++;
        }
      } catch (authError) {
        console.log('❌ Authentication: Error');
        console.log(`   ${authError.message}`);
        results.failed++;
      }
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️  API Server: NOT RUNNING');
      console.log('   Run: npm start');
      results.warnings++;
    } else {
      console.log('❌ API Server: ERROR');
      console.log(`   ${error.message}`);
      results.failed++;
    }
  }
  console.log('');

  // 4. Production Readiness Check
  console.log('4️⃣  PRODUCTION READINESS');
  console.log('─'.repeat(50));

  const checks = {
    'Remote Database': config.database.host !== 'localhost',
    'Production API URL': !config.api.baseUrl.includes('localhost'),
    'JWT Secret Set': process.env.JWT_SECRET && process.env.JWT_SECRET.length > 20,
    'CORS Configured': process.env.FRONTEND_URL !== undefined,
    'Environment Set': process.env.NODE_ENV !== undefined,
  };

  for (const [check, passed] of Object.entries(checks)) {
    if (passed) {
      console.log(`✅ ${check}`);
      results.passed++;
    } else {
      console.log(`❌ ${check}`);
      results.failed++;
    }
  }
  console.log('');

  // 5. Network Configuration
  console.log('5️⃣  NETWORK CONFIGURATION');
  console.log('─'.repeat(50));
  console.log(`   Database Host: ${config.database.host}:${config.database.port}`);
  console.log(`   API Base URL: ${config.api.baseUrl}`);
  console.log(`   Frontend URL: ${config.frontend.url}`);
  console.log(`   WebSocket: wss://be-tpms.connectis.my.id/ws`);
  console.log('');

  // 6. Recommended npm scripts
  console.log('6️⃣  RECOMMENDED COMMANDS');
  console.log('─'.repeat(50));
  console.log('   Development:');
  console.log('   • npm run dev          - Start with auto-reload');
  console.log('   • npm run prisma:studio - Open Prisma Studio');
  console.log('');
  console.log('   Production:');
  console.log('   • npm start            - Start server');
  console.log('   • npm run production:pm2 - Start with PM2');
  console.log('');
  console.log('   Testing:');
  console.log('   • node scripts/test-endpoints.js');
  console.log('   • node scripts/quick-verify.js');
  console.log('');

  // Summary
  console.log('');
  console.log('═'.repeat(50));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  console.log('');

  if (results.failed === 0) {
    console.log('🎉 System is READY for production!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('   1. Ensure server is deployed to production');
    console.log('   2. Start server: npm start');
    console.log('   3. Test API: https://be-tpms.connectis.my.id/api/health');
    console.log('   4. Check WebSocket: wss://be-tpms.connectis.my.id/ws');
  } else if (results.failed > 0 && results.failed < 3) {
    console.log('⚠️  System has minor issues - review failed checks');
  } else {
    console.log('❌ System NOT ready - please fix critical issues');
  }

  console.log('');

  await prisma.$disconnect();
}

// Run the check
checkSystemCompatibility().catch(console.error);
