const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

function pad4(n) {
  return String(n).padStart(4, '0');
}

async function ensureTrucks(min = 1, max = 1000) {
  console.log(`🔎 Ensuring trucks with codes ${pad4(min)} - ${pad4(max)} exist...`);

  for (let i = min; i <= max; i++) {
    const code = pad4(i);
    const name = `Truck-${code}`; // Align name with code

    try {
      await prisma.truck.upsert({
        where: { code }, // requires unique index on truck.code
        update: { name },
        create: { code, name }
      });
    } catch (e) {
      console.error(`❌ Failed upsert for truck code ${code}:`, e.message);
    }
  }

  // Recount actually present trucks in the requested range by code
  const trucks = await prisma.truck.findMany({
    where: { code: { gte: pad4(min), lte: pad4(max) } },
    select: { id: true, code: true, name: true },
    orderBy: { code: 'asc' }
  });

  console.log(`✅ Now present: ${trucks.length} trucks with codes in range ${pad4(min)} - ${pad4(max)}`);
  if (trucks.length < (max - min + 1)) {
    const missing = [];
    for (let i = min; i <= max; i++) {
      const code = pad4(i);
      if (!trucks.find(t => t.code === code)) missing.push(code);
    }
    if (missing.length) {
      console.log(`⚠️ Missing codes after operation: ${missing.join(', ')}`);
    }
  }

  // Show a small sample for verification
  console.log('📋 Sample trucks:');
  console.log(trucks.slice(0, 3));
  console.log('...');
  console.log(trucks.slice(-3));
}

async function main() {
  try {
    await ensureTrucks(1, 1000);
  } catch (e) {
    console.error('💥 Error ensuring trucks:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
