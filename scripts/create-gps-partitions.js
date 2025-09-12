/**
 * Create GPS position partitions for current and future months
 * Fixes the partition issue for gps_position table
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function createGPSPartitions() {
  console.log('Creating GPS position partitions...');

  const currentDate = new Date();
  const partitions = [];

  // Create partitions for current month and next 12 months
  for (let i = 0; i < 13; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 1);

    const partitionName = `gps_position_${date.getFullYear()}_${String(date.getMonth() + 1).padStart(2, '0')}`;
    const startDate = date.toISOString().split('T')[0];
    const endDate = nextDate.toISOString().split('T')[0];

    partitions.push({
      name: partitionName,
      startDate,
      endDate,
    });
  }

  for (const partition of partitions) {
    try {
      const sql = `
        CREATE TABLE IF NOT EXISTS ${partition.name} PARTITION OF gps_position
        FOR VALUES FROM ('${partition.startDate}') TO ('${partition.endDate}');
      `;

      await prisma.$executeRawUnsafe(sql);
      console.log(`✓ Created partition: ${partition.name}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`- Partition already exists: ${partition.name}`);
      } else {
        console.error(`Error creating partition ${partition.name}:`, error.message);
      }
    }
  }

  console.log('✓ GPS partitions setup completed');
}

async function main() {
  try {
    await createGPSPartitions();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = { createGPSPartitions };
