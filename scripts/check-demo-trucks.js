require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkDemoTrucks() {
  try {
    console.log('\n🔍 Checking for demo trucks in database...\n');

    const trucks = await prisma.truck.findMany({
      where: {
        name: {
          in: ['truck-spiderman', 'truck-ironman'],
        },
      },
      select: {
        id: true,
        name: true,
        code: true,
        model: true,
        year: true,
        tire_config: true,
        created_at: true,
      },
    });

    if (trucks.length === 0) {
      console.log('❌ No demo trucks found in database');
      console.log('\nTo create demo trucks, run:');
      console.log('   node scripts/seed-demo-trucks.js\n');
    } else {
      console.log(`✅ Found ${trucks.length} demo truck(s):\n`);
      trucks.forEach((truck) => {
        console.log(`   🚛 ${truck.name}`);
        console.log(`      Code: ${truck.code}`);
        console.log(`      Model: ${truck.model}`);
        console.log(`      Year: ${truck.year}`);
        console.log(`      Tire Config: ${truck.tire_config}`);
        console.log(`      Created: ${truck.created_at}`);
        console.log(`      ID: ${truck.id}`);
        console.log('');
      });
    }

    // Check database connection info
    console.log('📊 Database Connection Info:');
    console.log(`   URL: ${process.env.DATABASE_URL?.split('@')[1] || 'N/A'}`);
    console.log('');
  } catch (error) {
    console.error('❌ Error checking demo trucks:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDemoTrucks();
