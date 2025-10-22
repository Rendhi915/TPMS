const { PrismaClient } = require('../../prisma/generated/client');

// Enhanced Prisma configuration with connection resilience
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Connection retry logic
async function connectWithRetry(maxRetries = 5, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prisma.$connect();
      console.log('✅ Prisma connected to database');

      // Test the connection
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connection healthy');
      return true;
    } catch (error) {
      console.error(
        `❌ Database connection attempt ${attempt}/${maxRetries} failed:`,
        error.message
      );

      if (attempt === maxRetries) {
        console.error('💥 Max connection retries reached. Database unavailable.');
        throw error;
      }

      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 1.5; // Exponential backoff
    }
  }
}

// Enhanced health check with retry
async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    console.error('Database health check failed:', error.message);

    // Try to reconnect
    try {
      await connectWithRetry(3, 1000);
      return { status: 'recovered', timestamp: new Date() };
    } catch (retryError) {
      return { status: 'unhealthy', error: error.message, timestamp: new Date() };
    }
  }
}

// Graceful shutdown
async function disconnect() {
  try {
    await prisma.$disconnect();
    console.log('🔌 Prisma disconnected');
  } catch (error) {
    console.error('Error disconnecting Prisma:', error.message);
  }
}

// Handle process termination
process.on('SIGINT', disconnect);
process.on('SIGTERM', disconnect);
process.on('beforeExit', disconnect);

module.exports = {
  prisma,
  connectWithRetry,
  healthCheck,
  disconnect,
};
