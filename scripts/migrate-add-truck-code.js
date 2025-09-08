const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🚧 Applying DB migration: add truck.code (varchar(4)) and backfill...');

    // 1) Add column if not exists
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'truck' AND column_name = 'code'
        ) THEN
          ALTER TABLE truck ADD COLUMN code VARCHAR(4);
        END IF;
      END$$;
    `);

    // 2) Backfill from name when pattern is Truck-XXXX
    console.log('🔧 Backfilling truck.code from truck.name when possible...');
    await prisma.$executeRawUnsafe(`
      UPDATE truck
      SET code = LPAD(REGEXP_REPLACE(name, '^Truck-([0-9]+)$', '\\1'), 4, '0')
      WHERE code IS NULL AND name ~ '^Truck-[0-9]+$';
    `);

    // 3) For any remaining NULL codes, assign deterministic values sequentially avoiding collisions with existing codes
    console.log('🔢 Assigning codes for remaining trucks without code...');
    await prisma.$executeRawUnsafe(`
      WITH used AS (
        SELECT code FROM truck WHERE code IS NOT NULL
      ),
      candidates AS (
        SELECT TO_CHAR(n, 'FM0000') AS code
        FROM generate_series(1, 1000) g(n)
      ),
      free AS (
        SELECT c.code FROM candidates c
        LEFT JOIN used u ON u.code = c.code
        WHERE u.code IS NULL
      ),
      to_set AS (
        SELECT t.id, f.code
        FROM truck t
        JOIN free f ON true
        WHERE t.code IS NULL
        LIMIT (SELECT COUNT(*) FROM truck WHERE code IS NULL)
      )
      UPDATE truck t
      SET code = ts.code
      FROM to_set ts
      WHERE t.id = ts.id;
    `);

    // 4) Add unique constraint if not exists
    console.log('🧱 Ensuring unique constraint on truck.code...');
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint c
          JOIN pg_class t ON t.oid = c.conrelid
          WHERE t.relname = 'truck' AND c.conname = 'truck_code_key'
        ) THEN
          ALTER TABLE truck ADD CONSTRAINT truck_code_key UNIQUE (code);
        END IF;
      END$$;
    `);

    // 5) Show summary
    const rows = await prisma.$queryRawUnsafe(`
      SELECT COUNT(*) FILTER (WHERE code IS NOT NULL) AS with_code,
             COUNT(*) FILTER (WHERE code IS NULL) AS without_code
      FROM truck;
    `);
    console.table(rows);

    console.log('✅ Migration completed.');
  } catch (e) {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
