/*
  Setup script: creates database `dummy_tracking` and applies SQL from truck_tracking.md
  - Loads connection info from .env (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD)
  - Creates DB if not exists
  - Enables PostGIS + pgcrypto extensions
  - Executes the SQL schema contained in truck_tracking.md
*/

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

(async () => {
  const DB_HOST = process.env.DB_HOST || 'connectis.my.id';
  const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
  const DB_USER = process.env.DB_USER || 'postgre_tpms';
  const DB_PASSWORD = process.env.DB_PASSWORD || 'postgis:14-3.5-alpine';
  const DB_NAME = 'dummy_tracking';
  const USE_SSL =
    (process.env.DB_SSL || '').toLowerCase() !== 'false' &&
    !['localhost', '127.0.0.1'].includes(DB_HOST);

  const adminConnection = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
    ssl: USE_SSL ? { rejectUnauthorized: false } : undefined,
  };

  const targetConnection = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: USE_SSL ? { rejectUnauthorized: false } : undefined,
  };

  const schemaFile = path.join(process.cwd(), 'truck_tracking.md');

  function log(msg) {
    console.log(`[setup-dummy-tracking] ${msg}`);
  }

  async function connectWithSslFallback(baseConfig, label) {
    const tryNonSSL = async () => {
      const cfg = { ...baseConfig };
      delete cfg.ssl;
      const client = new Client(cfg);
      await client.connect();
      return client;
    };

    try {
      const client = new Client(baseConfig);
      await client.connect();
      return client;
    } catch (e) {
      if (String((e && e.message) || '').includes('does not support SSL')) {
        log(`${label}: Server does not support SSL, retrying without SSL...`);
        return await tryNonSSL();
      }
      throw e;
    }
  }

  try {
    log(`Connecting to admin database (${adminConnection.database})...`);
    const admin = await connectWithSslFallback(adminConnection, 'Admin connection');

    // Create database if not exists
    log(`Ensuring database '${DB_NAME}' exists...`);
    const existsRes = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
    if (existsRes.rowCount === 0) {
      await admin.query(`CREATE DATABASE ${DB_NAME}`);
      log(`Database '${DB_NAME}' created.`);
    } else {
      log(`Database '${DB_NAME}' already exists.`);
    }

    await admin.end();

    // Connect to target DB
    log(`Connecting to target database (${DB_NAME})...`);
    const db = await connectWithSslFallback(targetConnection, 'Target connection');

    // Enable extensions first
    log('Enabling extensions (postgis, pgcrypto) if needed...');
    await db.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    await db.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    // Read SQL schema from markdown file
    if (!fs.existsSync(schemaFile)) {
      throw new Error(`Schema file not found: ${schemaFile}`);
    }
    const rawSql = fs.readFileSync(schemaFile, 'utf8');

    // Split SQL into statements while respecting $$ ... $$ (plpgsql) and '...'
    function splitSql(sql) {
      const stmts = [];
      let buf = '';
      let inDollar = false;
      let inSingle = false;
      for (let i = 0; i < sql.length; i++) {
        const ch = sql[i];
        const next2 = sql.slice(i, i + 2);

        // toggle dollar-quote on $$
        if (!inSingle && next2 === '$$') {
          inDollar = !inDollar;
          buf += next2;
          i++;
          continue;
        }

        // toggle single-quote (ignore escaped '')
        if (!inDollar && ch === "'") {
          if (inSingle && sql[i + 1] === "'") {
            // escaped single quote inside string
            buf += "''";
            i++;
            continue;
          }
          inSingle = !inSingle;
          buf += ch;
          continue;
        }

        if (!inDollar && !inSingle && ch === ';') {
          const stmt = buf.trim();
          if (stmt.length) stmts.push(stmt);
          buf = '';
        } else {
          buf += ch;
        }
      }
      const tail = buf.trim();
      if (tail.length) stmts.push(tail);
      return stmts;
    }

    const statements = splitSql(rawSql);
    log(`Applying SQL schema from truck_tracking.md ... (${statements.length} statements)`);
    for (let idx = 0; idx < statements.length; idx++) {
      const stmt = statements[idx];
      try {
        await db.query(stmt);
      } catch (e) {
        console.error(`SQL failed at statement #${idx + 1}:\n${stmt.substring(0, 500)}...`);
        throw e;
      }
    }
    log('SQL schema applied successfully.');

    await db.end();
    log('Done.');
    process.exit(0);
  } catch (err) {
    if (err && err.code === '28P01') {
      console.error(
        'Failed to setup dummy_tracking: authentication failed (check DB_USER/DB_PASSWORD).'
      );
    } else if (err && err.code === '42501') {
      console.error(
        'Failed to setup dummy_tracking: insufficient privileges to CREATE DATABASE. Use a superuser or a role with CREATEDB.'
      );
    } else if (err && err.code === '3D000') {
      console.error(
        "Failed to connect to target DB: database doesn't exist and couldn't be created. Ensure privileges or create it manually."
      );
    } else {
      console.error('Failed to setup dummy_tracking:', err);
    }
    process.exit(1);
  }
})();
