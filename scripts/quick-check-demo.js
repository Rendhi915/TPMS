// Quick check for demo trucks
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkDemoTrucks() {
  try {
    const demoTrucks = await prisma.truck.findMany({
      where: {
        OR: [
          { name: { contains: 'spiderman', mode: 'insensitive' } },
          { name: { contains: 'ironman', mode: 'insensitive' } },
        ]
      },
      select: {
        id: true,
        code: true,
        name: true,
        model: true,
      }
    });

    console.log('\n🔍 Demo Trucks Check:');
    console.log('='.repeat(50));
    
    if (demoTrucks.length === 0) {
      console.log('❌ No demo trucks (spiderman/ironman) found!');
      console.log('\nNeed to create them...');
    } else {
      console.log(`✅ Found ${demoTrucks.length} demo truck(s):\n`);
      demoTrucks.forEach(truck => {
        console.log(`   🚛 ${truck.name}`);
        console.log(`      Code: ${truck.code}`);
        console.log(`      Model: ${truck.model}`);
        console.log(`      ID: ${truck.id}\n`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDemoTrucks();
