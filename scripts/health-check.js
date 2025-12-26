const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();
require('dotenv').config();

console.log('🔍 TPMS Backend - Configuration & Health Check\n');
console.log('='.repeat(60));

async function checkConfiguration() {
  const issues = [];
  const warnings = [];

  // 1. Check Environment Variables
  console.log('\n📋 1. Environment Variables Check:');
  console.log('-'.repeat(60));

  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'PORT', 'NODE_ENV'];

  requiredEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value) {
      issues.push(`❌ Missing: ${varName}`);
      console.log(`   ❌ ${varName}: NOT SET`);
    } else {
      console.log(
        `   ✅ ${varName}: ${varName === 'DATABASE_URL' || varName === 'JWT_SECRET' ? '***REDACTED***' : value}`
      );
    }
  });

  // Optional but recommended
  const optionalEnvVars = ['AUTO_START_SIMULATOR', 'FRONTEND_URL', 'WS_PATH'];

  optionalEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value) {
      warnings.push(`⚠️  Optional: ${varName} not set`);
    }
  });

  // 2. Check Database Connection
  console.log('\n📊 2. Database Connection Check:');
  console.log('-'.repeat(60));

  try {
    await prisma.$connect();
    console.log('   ✅ Database connection: SUCCESS');

    // Test query
    const result =
      await prisma.$queryRaw`SELECT NOW() as current_time, current_database() as db_name`;
    console.log(`   ✅ Database name: ${result[0].db_name}`);
    console.log(`   ✅ Server time: ${result[0].current_time}`);

    // Check if correct database
    if (result[0].db_name !== 'TPMS' && process.env.NODE_ENV === 'development') {
      warnings.push(`⚠️  Connected to '${result[0].db_name}' instead of 'TPMS'`);
      console.log(`   ⚠️  WARNING: Connected to '${result[0].db_name}' (expected: TPMS)`);
    }
  } catch (error) {
    issues.push(`❌ Database connection failed: ${error.message}`);
    console.log('   ❌ Database connection: FAILED');
    console.log(`   Error: ${error.message}`);
  }

  // 3. Check Tables Exist
  console.log('\n📁 3. Database Tables Check:');
  console.log('-'.repeat(60));

  const requiredTables = [
    'truck',
    'device',
    'sensor',
    'location',
    'alert',
    'alert_events',
    'user_admin',
    'vendors',
    'drivers',
  ];

  for (const tableName of requiredTables) {
    try {
      const result = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = ${tableName}
        );
      `;

      if (result[0].exists) {
        console.log(`   ✅ Table '${tableName}': EXISTS`);
      } else {
        issues.push(`❌ Table '${tableName}' does not exist`);
        console.log(`   ❌ Table '${tableName}': NOT FOUND`);
      }
    } catch (error) {
      issues.push(`❌ Error checking table '${tableName}': ${error.message}`);
      console.log(`   ❌ Table '${tableName}': ERROR - ${error.message}`);
    }
  }

  // 4. Check Data Seeded
  console.log('\n🌱 4. Data Seeding Check:');
  console.log('-'.repeat(60));

  try {
    const truckCount = await prisma.truck.count();
    const deviceCount = await prisma.device.count();
    const sensorCount = await prisma.sensor.count();
    const alertDefCount = await prisma.alert.count();
    const userCount = await prisma.user_admin.count();

    console.log(`   📊 Trucks: ${truckCount} ${truckCount === 0 ? '⚠️  (No data)' : '✅'}`);
    console.log(`   📊 Devices: ${deviceCount} ${deviceCount === 0 ? '⚠️  (No data)' : '✅'}`);
    console.log(`   📊 Sensors: ${sensorCount} ${sensorCount === 0 ? '⚠️  (No data)' : '✅'}`);
    console.log(
      `   📊 Alert Definitions: ${alertDefCount} ${alertDefCount === 0 ? '⚠️  (No data)' : '✅'}`
    );
    console.log(`   📊 Admin Users: ${userCount} ${userCount === 0 ? '⚠️  (No data)' : '✅'}`);

    if (truckCount === 0 || alertDefCount === 0) {
      warnings.push('⚠️  Database not seeded. Run: npm run simulator:seed');
    }

    if (userCount === 0) {
      warnings.push('⚠️  No admin user. Run: node scripts/create-admin.js');
    }

    // Check simulator trucks
    const simulatorTrucks = await prisma.truck.count({
      where: {
        plate: {
          contains: 'SIM',
        },
      },
    });

    console.log(
      `   📊 Simulator Trucks: ${simulatorTrucks} ${simulatorTrucks === 5 ? '✅' : simulatorTrucks > 0 ? '⚠️  (Expected 5)' : '❌ (Run: npm run simulator:seed)'}`
    );
  } catch (error) {
    issues.push(`❌ Error checking data: ${error.message}`);
    console.log(`   ❌ Error checking data: ${error.message}`);
  }

  // 5. Check Schema Matches Code
  console.log('\n🔍 5. Schema Validation:');
  console.log('-'.repeat(60));

  try {
    // Check alert_events structure
    const alertEvent = await prisma.alert_events.findFirst({
      include: {
        alert: true,
        truck: true,
        device: true,
        sensor: true,
      },
    });

    if (alertEvent) {
      console.log('   ✅ alert_events table structure: OK');
      console.log('   ✅ Relations (alert, truck, device, sensor): OK');

      // Check required fields
      const requiredFields = [
        'alert_id',
        'truck_id',
        'device_id',
        'sensor_id',
        'value',
        'message',
        'status',
      ];
      const hasAllFields = requiredFields.every((field) => field in alertEvent);

      if (hasAllFields) {
        console.log('   ✅ Required fields: OK');
      } else {
        issues.push('❌ alert_events missing required fields');
        console.log('   ❌ Required fields: MISSING');
      }
    } else {
      warnings.push('⚠️  No alert events in database yet');
      console.log('   ⚠️  No alert events to validate (run simulator to generate)');
    }

    // Check alert table has code field
    const alertDef = await prisma.alert.findFirst();
    if (alertDef && 'code' in alertDef && 'severity' in alertDef) {
      console.log('   ✅ alert table structure: OK');
    } else {
      issues.push('❌ alert table missing required fields');
      console.log('   ❌ alert table structure: INVALID');
    }
  } catch (error) {
    issues.push(`❌ Schema validation error: ${error.message}`);
    console.log(`   ❌ Schema validation: ERROR - ${error.message}`);
  }

  // 6. Check Port Availability
  console.log('\n🔌 6. Port Check:');
  console.log('-'.repeat(60));

  const port = process.env.PORT || 3001;
  console.log(`   📡 Server Port: ${port}`);

  if (port !== '3001') {
    warnings.push(`⚠️  Non-standard port: ${port} (default is 3001)`);
    console.log(`   ⚠️  WARNING: Using non-standard port`);
  } else {
    console.log(`   ✅ Using standard port: 3001`);
  }

  // 7. Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));

  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n✅ ✅ ✅  ALL CHECKS PASSED  ✅ ✅ ✅\n');
    console.log('System is ready to run!');
    console.log('\nTo start the server:');
    console.log('  npm run dev\n');
  } else {
    if (issues.length > 0) {
      console.log('\n❌ CRITICAL ISSUES FOUND:\n');
      issues.forEach((issue) => console.log(`   ${issue}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:\n');
      warnings.forEach((warning) => console.log(`   ${warning}`));
    }

    console.log('\n📝 RECOMMENDED ACTIONS:\n');

    if (issues.some((i) => i.includes('Database connection failed'))) {
      console.log('   1. Check PostgreSQL is running:');
      console.log('      - Windows: Check Services → PostgreSQL');
      console.log('      - Verify connection: psql -U postgres -d TPMS\n');
    }

    if (issues.some((i) => i.includes('Table')) || warnings.some((w) => w.includes('seeded'))) {
      console.log('   2. Run database migrations and seed:');
      console.log('      npx prisma migrate deploy');
      console.log('      npm run simulator:seed\n');
    }

    if (warnings.some((w) => w.includes('admin user'))) {
      console.log('   3. Create admin user:');
      console.log('      node scripts/create-admin.js\n');
    }

    if (issues.length === 0) {
      console.log('   ✅ No critical issues, safe to start server\n');
    } else {
      console.log('   ⚠️  Fix critical issues before starting server\n');
    }
  }

  console.log('='.repeat(60) + '\n');

  // Return status code
  process.exit(issues.length > 0 ? 1 : 0);
}

// Run check
checkConfiguration()
  .catch((error) => {
    console.error('\n💥 FATAL ERROR:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
