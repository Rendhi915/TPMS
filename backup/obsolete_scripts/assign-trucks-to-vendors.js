const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

const VENDOR_COUNT = 11;

async function ensureVendors() {
  const vendors = [];
  for (let i = 1; i <= VENDOR_COUNT; i++) {
    const name = `Vendor-${String(i).padStart(2, '0')}`;
    const existing = await prisma.fleet_group.findFirst({ where: { name } });
    if (existing) {
      vendors.push(existing);
    } else {
      const created = await prisma.fleet_group.create({
        data: {
          name,
          description: `Auto-created vendor group ${name}`,
        }
      });
      vendors.push(created);
    }
  }
  return vendors;
}

async function assignTrucksToVendors(vendors) {
  const trucks = await prisma.truck.findMany({
    where: { code: { gte: '0001', lte: '1000' } },
    select: { id: true, code: true, fleet_group_id: true }
  });

  if (trucks.length === 0) {
    console.log('No trucks with codes 0001-1000 found.');
    return;
  }

  console.log(`Assigning ${trucks.length} trucks across ${vendors.length} vendors...`);

  // Sort by code to make assignment deterministic
  trucks.sort((a, b) => (a.code || '').localeCompare(b.code || ''));

  const updates = [];
  for (let i = 0; i < trucks.length; i++) {
    const truck = trucks[i];
    const vendor = vendors[i % vendors.length];
    if (truck.fleet_group_id !== vendor.id) {
      updates.push(
        prisma.truck.update({
          where: { id: truck.id },
          data: { fleet_group_id: vendor.id }
        })
      );
    }
  }

  // Execute in batches
  const batchSize = 100;
  let updated = 0;
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    await Promise.all(batch);
    updated += batch.length;
    console.log(`Updated ${updated}/${updates.length} trucks...`);
  }

  console.log('✅ Assignment completed.');
}

async function main() {
  try {
    const vendors = await ensureVendors();
    await assignTrucksToVendors(vendors);
  } catch (e) {
    console.error('❌ Error assigning vendors:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
