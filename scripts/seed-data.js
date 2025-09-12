const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'fleet_management',
  password: process.env.DB_PASSWORD || 'truk1234',
  port: process.env.DB_PORT || 5432,
});

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// PT INDOBARA area bounds
const PT_INDOBARA_BOUNDS = {
  minLat: -3.717200000114277,
  maxLat: -3.431898966201222,
  minLng: 115.432199323066001,
  maxLng: 115.658299919322602,
};

const seedData = async () => {
  let client;

  try {
    log('🌱 Starting data seeding process...', 'blue');
    log('=' * 40, 'blue');

    client = await pool.connect();

    // Check if data already exists
    const trucksCount = await client.query('SELECT COUNT(*) FROM trucks');
    const currentCount = parseInt(trucksCount.rows[0].count);

    if (currentCount >= 100) {
      log(`✅ Database already has ${currentCount} trucks. Skipping seed.`, 'green');
      log('💡 To reseed, delete existing data first or use --force flag', 'cyan');
      return;
    }

    log(`📊 Current trucks: ${currentCount}`, 'cyan');
    log('🚛 Seeding truck data for PT INDOBARA...', 'yellow');

    // Get truck models
    const modelsResult = await client.query('SELECT id FROM truck_models');
    const modelIds = modelsResult.rows.map((row) => row.id);

    if (modelIds.length === 0) {
      throw new Error('No truck models found. Please run setup:db first.');
    }

    // Start transaction
    await client.query('BEGIN');

    // Seed trucks
    const trucksToCreate = 1000 - currentCount;
    log(`📦 Creating ${trucksToCreate} trucks...`, 'yellow');

    const batchSize = 100;
    const totalBatches = Math.ceil(trucksToCreate / batchSize);

    for (let batch = 0; batch < totalBatches; batch++) {
      const startTruck = currentCount + batch * batchSize + 1;
      const endTruck = Math.min(
        currentCount + (batch + 1) * batchSize,
        currentCount + trucksToCreate
      );
      const batchCount = endTruck - startTruck + 1;

      log(`   Batch ${batch + 1}/${totalBatches}: Trucks ${startTruck}-${endTruck}`, 'cyan');

      const values = [];
      const placeholders = [];

      for (let i = 0; i < batchCount; i++) {
        const truckIndex = startTruck + i;

        // Random model
        const modelId = modelIds[Math.floor(Math.random() * modelIds.length)];

        // Random status (70% active, 20% inactive, 10% maintenance)
        let status = 'active';
        const rand = Math.random();
        if (rand < 0.1) status = 'maintenance';
        else if (rand < 0.3) status = 'inactive';

        // Random coordinates within PT INDOBARA bounds
        const lat = parseFloat(
          (
            PT_INDOBARA_BOUNDS.minLat +
            Math.random() * (PT_INDOBARA_BOUNDS.maxLat - PT_INDOBARA_BOUNDS.minLat)
          ).toFixed(8)
        );
        const lng = parseFloat(
          (
            PT_INDOBARA_BOUNDS.minLng +
            Math.random() * (PT_INDOBARA_BOUNDS.maxLng - PT_INDOBARA_BOUNDS.minLng)
          ).toFixed(8)
        );

        // Other truck properties
        const truckNumber = `T${String(truckIndex).padStart(4, '0')}`;
        const speed = status === 'active' ? Math.round(Math.random() * 60) : 0;
        const heading = Math.round(Math.random() * 360);
        const fuel = parseFloat((20 + Math.random() * 80).toFixed(2));
        const payload = status === 'active' ? parseFloat((Math.random() * 400).toFixed(2)) : 0;
        const driver = status === 'active' ? `Driver ${truckIndex}` : null;
        const engineHours = Math.round(Math.random() * 10000);
        const odometer = Math.round(Math.random() * 100000);

        const valueIndex = values.length / 12;
        placeholders.push(
          `($${valueIndex * 12 + 1}, $${valueIndex * 12 + 2}, $${valueIndex * 12 + 3}, $${valueIndex * 12 + 4}, $${valueIndex * 12 + 5}, $${valueIndex * 12 + 6}, $${valueIndex * 12 + 7}, $${valueIndex * 12 + 8}, $${valueIndex * 12 + 9}, $${valueIndex * 12 + 10}, $${valueIndex * 12 + 11}, $${valueIndex * 12 + 12})`
        );

        values.push(
          truckNumber,
          modelId,
          status,
          lat,
          lng,
          speed,
          heading,
          fuel,
          payload,
          driver,
          engineHours,
          odometer
        );
      }

      const insertQuery = `
        INSERT INTO trucks (
          truck_number, model_id, status, latitude, longitude, speed,
          heading, fuel_percentage, payload_tons, driver_name, engine_hours, odometer
        ) VALUES ${placeholders.join(', ')}
      `;

      await client.query(insertQuery, values);
      log(`     ✅ Inserted ${batchCount} trucks`, 'green');
    }

    // Seed tire pressure data
    log('🔧 Seeding tire pressure data...', 'yellow');
    const newTrucks = await client.query('SELECT id FROM trucks ORDER BY id DESC LIMIT $1', [
      trucksToCreate,
    ]);

    for (const truck of newTrucks.rows) {
      const tireValues = [];
      const tirePlaceholders = [];

      for (let tireNum = 1; tireNum <= 6; tireNum++) {
        const positions = [
          'front_left',
          'front_right',
          'middle_left',
          'middle_right',
          'rear_left',
          'rear_right',
        ];
        const position = positions[tireNum - 1];
        const pressure = parseFloat((80 + Math.random() * 40).toFixed(1));
        const temperature = parseFloat((60 + Math.random() * 40).toFixed(2));

        let status = 'normal';
        if (pressure < 85) status = 'low';
        else if (pressure > 115) status = 'high';

        const valueIndex = tireValues.length / 6;
        tirePlaceholders.push(
          `($${valueIndex * 6 + 1}, $${valueIndex * 6 + 2}, $${valueIndex * 6 + 3}, $${valueIndex * 6 + 4}, $${valueIndex * 6 + 5}, $${valueIndex * 6 + 6})`
        );

        tireValues.push(truck.id, position, tireNum, pressure, status, temperature);
      }

      const tireInsertQuery = `
        INSERT INTO tire_pressures (truck_id, tire_position, tire_number, pressure_psi, status, temperature)
        VALUES ${tirePlaceholders.join(', ')}
      `;

      await client.query(tireInsertQuery, tireValues);
    }

    log('✅ Tire pressure data seeded', 'green');

    // Seed some alerts
    log('🚨 Seeding sample alerts...', 'yellow');
    const alertTypes = [
      'Low Fuel',
      'Engine Warning',
      'Tire Pressure Low',
      'Maintenance Due',
      'GPS Signal Lost',
    ];
    const severities = ['low', 'medium', 'high', 'critical'];

    const randomTrucks = await client.query('SELECT id FROM trucks ORDER BY RANDOM() LIMIT 50');

    for (const truck of randomTrucks.rows) {
      if (Math.random() < 0.4) {
        // 40% chance of alert
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const message = `Alert: ${alertType} detected on truck`;
        const isResolved = Math.random() < 0.3; // 30% resolved

        await client.query(
          `
          INSERT INTO truck_alerts (truck_id, alert_type, severity, message, is_resolved)
          VALUES ($1, $2, $3, $4, $5)
        `,
          [truck.id, alertType, severity, message, isResolved]
        );
      }
    }

    log('✅ Sample alerts seeded', 'green');

    // Commit transaction
    await client.query('COMMIT');

    // Final statistics
    const finalStats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM trucks) as total_trucks,
        (SELECT COUNT(*) FROM trucks WHERE status = 'active') as active_trucks,
        (SELECT COUNT(*) FROM tire_pressures) as tire_readings,
        (SELECT COUNT(*) FROM truck_alerts WHERE is_resolved = false) as active_alerts
    `);

    const stats = finalStats.rows[0];

    log('', '');
    log('=' * 40, 'blue');
    log('🎉 DATA SEEDING COMPLETED!', 'green');
    log('=' * 40, 'blue');
    log('📊 Final Statistics:', 'cyan');
    log(`   • Total Trucks: ${stats.total_trucks}`, 'white');
    log(`   • Active Trucks: ${stats.active_trucks}`, 'white');
    log(`   • Tire Readings: ${stats.tire_readings}`, 'white');
    log(`   • Active Alerts: ${stats.active_alerts}`, 'white');
    log('', '');
    log('🚀 Database is ready! You can start the server with: npm run dev', 'green');
  } catch (error) {
    if (client) {
      try {
        await client.query('ROLLBACK');
        log('🔄 Transaction rolled back', 'yellow');
      } catch (rollbackError) {
        log(`❌ Rollback error: ${rollbackError.message}`, 'red');
      }
    }

    log(`💥 Seeding failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
};

// Force flag support
const forceFlag = process.argv.includes('--force');
if (forceFlag) {
  log('🔥 Force flag detected - will reseed even if data exists', 'yellow');
}

// Run if this script is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData };
