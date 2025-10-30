// Script untuk menambahkan kolom baru ke tabel sensor
// Jalankan: node scripts/add-sensor-columns.js

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function addSensorColumns() {
  console.log('🔧 Menambahkan kolom baru ke tabel sensor...\n');

  try {
    // 1. Tambahkan kolom tempValue
    console.log('➕ Menambahkan kolom tempValue...');
    await prisma.$executeRaw`
      ALTER TABLE sensor 
      ADD COLUMN IF NOT EXISTS "tempValue" real;
    `;
    console.log('✅ Kolom tempValue berhasil ditambahkan\n');

    // 2. Tambahkan kolom tirepValue
    console.log('➕ Menambahkan kolom tirepValue...');
    await prisma.$executeRaw`
      ALTER TABLE sensor 
      ADD COLUMN IF NOT EXISTS "tirepValue" real;
    `;
    console.log('✅ Kolom tirepValue berhasil ditambahkan\n');

    // 3. Tambahkan kolom exType
    console.log('➕ Menambahkan kolom exType...');
    await prisma.$executeRaw`
      ALTER TABLE sensor 
      ADD COLUMN IF NOT EXISTS "exType" varchar(50);
    `;
    console.log('✅ Kolom exType berhasil ditambahkan\n');

    // 4. Tambahkan kolom bat
    console.log('➕ Menambahkan kolom bat...');
    await prisma.$executeRaw`
      ALTER TABLE sensor 
      ADD COLUMN IF NOT EXISTS bat smallint;
    `;
    console.log('✅ Kolom bat berhasil ditambahkan\n');

    // 5. Tambahkan kolom updated_at
    console.log('➕ Menambahkan kolom updated_at...');
    await prisma.$executeRaw`
      ALTER TABLE sensor 
      ADD COLUMN IF NOT EXISTS updated_at timestamptz(6) DEFAULT now();
    `;
    console.log('✅ Kolom updated_at berhasil ditambahkan\n');

    // 6. Tambahkan index untuk updated_at
    console.log('➕ Membuat index untuk updated_at...');
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_sensor_updated_at ON sensor(updated_at);
    `;
    console.log('✅ Index berhasil dibuat\n');

    // Verifikasi kolom
    console.log('🔍 Verifikasi kolom yang ada di tabel sensor:');
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'sensor'
      ORDER BY ordinal_position;
    `;
    
    console.table(columns);

    console.log('\n✅ Semua kolom berhasil ditambahkan!');
    console.log('\n📋 Kolom baru yang ditambahkan:');
    console.log('   • tempValue (real) - Suhu ban dalam Celsius');
    console.log('   • tirepValue (real) - Tekanan ban dalam PSI');
    console.log('   • exType (varchar) - Tipe exception (normal, warning, critical)');
    console.log('   • bat (smallint) - Level battery 0-100');
    console.log('   • updated_at - Sudah ada, ditambahkan index\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Jalankan
addSensorColumns();
