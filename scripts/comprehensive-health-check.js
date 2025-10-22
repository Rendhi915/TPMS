/**
 * Comprehensive Backend Health Check
 * Checks all critical components of the TPMS Backend
 */

const fs = require('fs');
const path = require('path');

// Console colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(`  ${title}`, colors.cyan);
  console.log('='.repeat(70));
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

// Health check results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
};

async function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    logSuccess(`${description} exists: ${filePath}`);
    results.passed++;
    return true;
  } else {
    logError(`${description} NOT FOUND: ${filePath}`);
    results.failed++;
    results.errors.push(`Missing file: ${filePath}`);
    return false;
  }
}

async function checkSyntax(filePath, description) {
  try {
    require.resolve(path.resolve(filePath));
    const mod = require(path.resolve(filePath));
    logSuccess(`${description} - Syntax OK`);
    results.passed++;
    return true;
  } catch (error) {
    logError(`${description} - Syntax Error: ${error.message}`);
    results.failed++;
    results.errors.push(`Syntax error in ${filePath}: ${error.message}`);
    return false;
  }
}

async function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    logSuccess(`${description} exists (${files.length} files)`);
    results.passed++;
    return files.length;
  } else {
    logError(`${description} NOT FOUND: ${dirPath}`);
    results.failed++;
    results.errors.push(`Missing directory: ${dirPath}`);
    return 0;
  }
}

async function checkEnvironmentVariables() {
  logSection('ENVIRONMENT VARIABLES');
  
  require('dotenv').config();
  
  const requiredVars = [
    'PORT',
    'NODE_ENV',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
  ];

  let allPresent = true;
  for (const varName of requiredVars) {
    if (process.env[varName]) {
      logSuccess(`${varName} is set`);
      results.passed++;
    } else {
      logError(`${varName} is NOT set`);
      results.failed++;
      results.errors.push(`Missing environment variable: ${varName}`);
      allPresent = false;
    }
  }

  // Check optional vars
  const optionalVars = ['FRONTEND_URL', 'API_BASE_URL', 'LOG_LEVEL'];
  for (const varName of optionalVars) {
    if (process.env[varName]) {
      logInfo(`${varName} = ${process.env[varName]}`);
    } else {
      logWarning(`${varName} not set (optional)`);
      results.warnings++;
    }
  }

  return allPresent;
}

async function checkCoreFiles() {
  logSection('CORE FILES');
  
  await checkFileExists('package.json', 'Package manifest');
  await checkFileExists('.env', 'Environment config');
  await checkFileExists('server.js', 'Server entry point');
  await checkFileExists('src/app.js', 'Express app');
  await checkFileExists('prisma/schema.prisma', 'Prisma schema');
  await checkFileExists('prisma/generated/client/index.js', 'Generated Prisma client');
}

async function checkControllers() {
  logSection('CONTROLLERS');
  
  const controllers = [
    'src/controllers/authController.js',
    'src/controllers/dashboardController.js',
    'src/controllers/deviceController.js',
    'src/controllers/miningAreaController.js',
    'src/controllers/sensorController.js',
    'src/controllers/sensorDataController.js',
    'src/controllers/truckController.js',
  ];

  for (const controller of controllers) {
    const name = path.basename(controller, '.js');
    await checkSyntax(controller, name);
  }
}

async function checkRoutes() {
  logSection('ROUTES');
  
  const routes = [
    'src/routes/index.js',
    'src/routes/auth.js',
    'src/routes/trucks.js',
    'src/routes/dashboard.js',
    'src/routes/sensors.js',
    'src/routes/sensor-data.js',
    'src/routes/miningarea.js',
    'src/routes/fleet.js',
    'src/routes/vendors.js',
    'src/routes/drivers.js',
    'src/routes/devices.js',
    'src/routes/history.js',
  ];

  for (const route of routes) {
    const name = path.basename(route, '.js');
    await checkSyntax(route, `Route: ${name}`);
  }
}

async function checkMiddleware() {
  logSection('MIDDLEWARE');
  
  const middleware = [
    'src/middleware/auth.js',
    'src/middleware/crudValidation.js',
    'src/middleware/errorHandler.js',
    'src/middleware/logger.js',
    'src/middleware/rateLimiter.js',
    'src/middleware/validation.js',
  ];

  for (const mw of middleware) {
    const name = path.basename(mw, '.js');
    await checkSyntax(mw, `Middleware: ${name}`);
  }
}

async function checkServices() {
  logSection('SERVICES');
  
  const services = [
    'src/services/databaseService.js',
    'src/services/locationService.js',
    'src/services/miningAreaService.js',
    'src/services/prismaService.js',
    'src/services/queueProcessingService.js',
    'src/services/simplePrismaService.js',
    'src/services/websocketService.js',
  ];

  for (const service of services) {
    const name = path.basename(service, '.js');
    await checkSyntax(service, `Service: ${name}`);
  }
}

async function checkConfig() {
  logSection('CONFIGURATION FILES');
  
  await checkSyntax('src/config/database.js', 'Database config');
  await checkSyntax('src/config/jwt.js', 'JWT config');
  await checkSyntax('src/config/prisma.js', 'Prisma config');
}

async function checkDatabaseConnection() {
  logSection('DATABASE CONNECTION');
  
  try {
    const { prisma, connectWithRetry } = require('../src/config/prisma');
    
    logInfo('Testing database connection...');
    await connectWithRetry(3, 1000);
    
    logInfo('Running test query...');
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    
    if (result && result.length > 0) {
      logSuccess(`Connected to database: ${result[0].current_database}`);
      logInfo(`User: ${result[0].current_user}`);
      logInfo(`Version: ${result[0].version.split(' ').slice(0, 2).join(' ')}`);
      results.passed++;
    }

    // Check tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    logSuccess(`Found ${tables.length} tables in database`);
    results.passed++;

    // Check PostGIS extension
    const extensions = await prisma.$queryRaw`
      SELECT extname, extversion 
      FROM pg_extension 
      WHERE extname IN ('postgis', 'pgcrypto')
    `;
    for (const ext of extensions) {
      logSuccess(`Extension ${ext.extname} v${ext.extversion} installed`);
      results.passed++;
    }

    await prisma.$disconnect();
    return true;
  } catch (error) {
    logError(`Database connection failed: ${error.message}`);
    results.failed++;
    results.errors.push(`Database error: ${error.message}`);
    return false;
  }
}

async function checkScripts() {
  logSection('UTILITY SCRIPTS');
  
  const criticalScripts = [
    'scripts/seed-data.js',
    'scripts/comprehensive-seeder.js',
    'scripts/history-seeder.js',
  ];

  for (const script of criticalScripts) {
    const name = path.basename(script, '.js');
    if (await checkFileExists(script, `Script: ${name}`)) {
      // Note: We don't run syntax check on scripts as they may have db dependencies
      logInfo(`  ${name} exists (not executing)`);
    }
  }

  // Check documentation
  await checkFileExists('README.md', 'README');
  await checkFileExists('FRONTEND_API_DOCUMENTATION.md', 'API Documentation');
  await checkFileExists('doc/DRIVER_VENDOR_CRUD_API.md', 'Driver/Vendor CRUD Docs');
  await checkFileExists('doc/SENSOR_DATA_PROCESSING_API.md', 'Sensor Data API Docs');
}

async function checkDependencies() {
  logSection('NODE.JS DEPENDENCIES');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    logInfo(`Project: ${packageJson.name} v${packageJson.version}`);
    logInfo(`Node: ${process.version}`);
    
    const deps = Object.keys(packageJson.dependencies || {});
    const devDeps = Object.keys(packageJson.devDependencies || {});
    
    logSuccess(`${deps.length} production dependencies`);
    logSuccess(`${devDeps.length} development dependencies`);
    results.passed += 2;

    // Check critical dependencies
    const critical = ['express', 'prisma', '@prisma/client', 'pg', 'jsonwebtoken', 'bcryptjs'];
    for (const dep of critical) {
      try {
        require.resolve(dep);
        logSuccess(`Critical package: ${dep}`);
        results.passed++;
      } catch (err) {
        logError(`Critical package missing: ${dep}`);
        results.failed++;
        results.errors.push(`Missing dependency: ${dep}`);
      }
    }
  } catch (error) {
    logError(`Error reading package.json: ${error.message}`);
    results.failed++;
  }
}

async function generateReport() {
  logSection('HEALTH CHECK SUMMARY');
  
  const total = results.passed + results.failed;
  const passRate = ((results.passed / total) * 100).toFixed(2);
  
  console.log('');
  log(`Total Checks: ${total}`, colors.blue);
  log(`Passed:       ${results.passed} ✅`, colors.green);
  log(`Failed:       ${results.failed} ❌`, colors.red);
  log(`Warnings:     ${results.warnings} ⚠️`, colors.yellow);
  log(`Pass Rate:    ${passRate}%`, passRate >= 90 ? colors.green : colors.yellow);
  console.log('');

  if (results.errors.length > 0) {
    logSection('ERRORS FOUND');
    results.errors.forEach((err, idx) => {
      logError(`${idx + 1}. ${err}`);
    });
  }

  console.log('');
  if (results.failed === 0) {
    log('🎉 ALL CHECKS PASSED! Backend is healthy!', colors.green);
  } else if (results.failed < 5) {
    log('⚠️  Some issues found, but backend should still work', colors.yellow);
  } else {
    log('❌ Critical issues found! Please fix before deployment', colors.red);
  }
  console.log('');
  
  // Return exit code
  return results.failed === 0 ? 0 : 1;
}

async function main() {
  log('\n🏥 TPMS Backend Comprehensive Health Check', colors.cyan);
  log(`Started at: ${new Date().toLocaleString()}`, colors.gray);
  
  try {
    await checkEnvironmentVariables();
    await checkCoreFiles();
    await checkControllers();
    await checkRoutes();
    await checkMiddleware();
    await checkServices();
    await checkConfig();
    await checkDependencies();
    await checkDatabaseConnection();
    await checkScripts();
    
    const exitCode = await generateReport();
    
    log(`\nCompleted at: ${new Date().toLocaleString()}`, colors.gray);
    process.exit(exitCode);
  } catch (error) {
    logError(`Fatal error during health check: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run health check
main();
