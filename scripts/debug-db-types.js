const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔎 Inspecting column types for table truck...');
    const columns = await prisma.$queryRawUnsafe(`
      SELECT table_schema, table_name, column_name, data_type, udt_name
      FROM information_schema.columns
      WHERE table_name IN ('truck', 'alert_event', 'gps_position', 'device', 'truck_status_event')
      ORDER BY table_name, ordinal_position;
    `);
    console.table(columns);
  } catch (e) {
    console.error('Error inspecting DB types:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
