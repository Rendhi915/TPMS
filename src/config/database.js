const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgre_tpms',
  host: process.env.DB_HOST || 'connectis.my.id',
  database: process.env.DB_NAME || 'dummy_tracking',
  password: process.env.DB_PASSWORD || 'postgis:14-3.5-alpine',
  port: process.env.DB_PORT || 5432,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle
  connectionTimeoutMillis: 10000, // increased timeout to 10 seconds
  acquireTimeoutMillis: 60000, // how long to wait for a connection from pool
  createTimeoutMillis: 30000, // how long to wait when creating a connection
});

// Test connection on startup
pool
  .connect()
  .then((client) => {
    console.log('✅ Database connected successfully');
    return client.query('SELECT NOW()');
  })
  .then((result) => {
    console.log('📊 Database time:', result.rows[0].now);
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('💥 Unexpected database pool error:', err);
});

module.exports = pool;
