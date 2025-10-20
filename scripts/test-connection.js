require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
  });
  
  try {
    console.log('🔄 Testing database connection...');
    console.log('📍 Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    
    await prisma.$connect();
    console.log('✅ Connected to database');
    
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database version:', result[0].version.substring(0, 50) + '...');
    
    const truckCount = await prisma.truck.count();
    console.log(`✅ Found ${truckCount} trucks in database`);
    
    console.log('\n🎉 Database connection test SUCCESSFUL!');
  } catch (error) {
    console.error('\n❌ Database connection test FAILED!');
    console.error('Error:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check if database server is running');
      console.error('   2. Verify network/firewall settings');
      console.error('   3. Confirm DATABASE_URL is correct');
      console.error('   4. Try: ping connectis.my.id');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
