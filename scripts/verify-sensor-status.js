const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n=== VERIFY SENSOR STATUS ===');
  const active = await prisma.sensor.count({ where: { status: 'active' } });
  const inactive = await prisma.sensor.count({ where: { status: 'inactive' } });
  const total = await prisma.sensor.count();
  console.log(`Total: ${total}`);
  console.log(`Active: ${active}`);
  console.log(`Inactive: ${inactive}`);

  const sampleInactive = await prisma.sensor.findMany({
    where: { status: 'inactive' },
    select: { id: true, sn: true, tireNo: true, deleted_at: true },
    orderBy: { id: 'asc' },
    take: 5,
  });
  console.log('\nSample of inactive sensors (first 5):');
  sampleInactive.forEach((s) => {
    console.log(` - id=${s.id}, sn=${s.sn}, tireNo=${s.tireNo}, deleted_at=${s.deleted_at}`);
  });

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
