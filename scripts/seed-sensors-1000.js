const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomFloat(min, max) { return Math.random() * (max - min) + min; }

async function ensureDeviceForTruck(truck) {
  const sn = `DUMMY-${truck.code}`;
  const existing = await prisma.device.findUnique({ where: { sn } }).catch(() => null);
  if (existing) {
    if (existing.truck_id !== truck.id) {
      await prisma.device.update({ where: { sn }, data: { truck_id: truck.id } });
    }
    return { id: existing.id, sn };
  }
  const device = await prisma.device.create({ data: { truck_id: truck.id, sn } });
  return { id: device.id, sn };
}

async function seedFuelEvent(truckId) {
  const percent = Math.round(randomFloat(20, 100));
  const ts = new Date(Date.now() - randomInt(0, 60) * 60000);
  await prisma.fuel_level_event.create({
    data: { truck_id: truckId, fuel_percent: percent, changed_at: ts }
  }).catch(() => {});
}

async function seedHubTempEvent(truckId) {
  const temp = Math.round(randomFloat(35, 85));
  const ts = new Date(Date.now() - randomInt(0, 60) * 60000);
  await prisma.hub_temperature_event.create({
    data: { truck_id: truckId, temperature_c: temp, changed_at: ts }
  }).catch(() => {});
}

async function main() {
  try {
    console.log('🔧 Seeding fuel and hub temperature events for trucks 0001-1000...');
    const trucks = await prisma.truck.findMany({
      where: { code: { gte: '0001', lte: '1000' } },
      select: { id: true, code: true }
    });

    console.log(`Found ${trucks.length} trucks.`);

    let processed = 0;
    for (const truck of trucks) {
      await ensureDeviceForTruck(truck);
      await Promise.all([
        seedFuelEvent(truck.id),
        seedHubTempEvent(truck.id),
      ]);
      processed++;
      if (processed % 100 === 0) console.log(`Seeded sensors for ${processed}/${trucks.length} trucks...`);
    }

    console.log('✅ Completed seeding fuel and hub temperature events.');
  } catch (e) {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
