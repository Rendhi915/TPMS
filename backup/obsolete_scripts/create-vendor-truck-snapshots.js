const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

const VENDOR_COUNT = 11;

function tableNameForVendor(idx) {
  return `vendor_${String(idx).padStart(2, '0')}_trucks`;
}

async function ensureSnapshotTable(name) {
  // Create table if not exists with a simple schema
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ${name} (
      truck_id UUID PRIMARY KEY,
      code VARCHAR(4),
      name TEXT,
      fleet_group_id UUID,
      snapshot_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

async function refreshSnapshotTable(name, fleetGroupId) {
  // Truncate then insert current assignments
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${name}`);
  await prisma.$executeRawUnsafe(`
    INSERT INTO ${name} (truck_id, code, name, fleet_group_id)
    SELECT t.id, t.code, t.name, t.fleet_group_id
    FROM truck t
    WHERE t.fleet_group_id = $1::uuid
  `, fleetGroupId);
  const rows = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int AS cnt FROM ${name}`);
  return rows?.[0]?.cnt || 0;
}

async function main() {
  try {
    console.log('🔧 Creating per-vendor truck snapshot tables...');

    // Load vendors (fleet groups) by deterministic names Vendor-01..Vendor-11
    const vendors = [];
    for (let i = 1; i <= VENDOR_COUNT; i++) {
      const name = `Vendor-${String(i).padStart(2, '0')}`;
      const fg = await prisma.fleet_group.findFirst({ where: { name } });
      if (!fg) {
        console.log(`⚠️  Fleet group ${name} not found, creating...`);
        const created = await prisma.fleet_group.create({ data: { name, description: `Auto-created ${name}` } });
        vendors.push(created);
      } else {
        vendors.push(fg);
      }
    }

    for (let i = 1; i <= VENDOR_COUNT; i++) {
      const tbl = tableNameForVendor(i);
      await ensureSnapshotTable(tbl);
      const count = await refreshSnapshotTable(tbl, vendors[i - 1].id);
      console.log(`✅ Refreshed ${tbl} for ${vendors[i - 1].name} with ${count} trucks`);
    }

    console.log('✅ Completed creating per-vendor snapshot tables.');
  } catch (e) {
    console.error('❌ Snapshot creation failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
