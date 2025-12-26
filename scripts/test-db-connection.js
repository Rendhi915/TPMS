const { PrismaClient } = require('../prisma/generated/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

  try {
    console.log('🔌 Testing database connection...\n');

    // Test raw query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful!');
    console.log('📊 Result:', result);

    // Count devices
    const deviceCount = await prisma.device.count();
    console.log(`\n📦 Devices in database: ${deviceCount}`);

    // List devices
    const devices = await prisma.device.findMany({
      take: 5,
      include: { truck: true },
    });

    console.log('\n📋 First 5 devices:');
    devices.forEach((d) => {
      console.log(`   - ${d.sn} (${d.truck?.plate || 'No truck'})`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    if (error.meta) {
      console.error('   Meta:', error.meta);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
