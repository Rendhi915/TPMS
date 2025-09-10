const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function updateDatabaseSchema() {
  console.log('🔧 Updating database schema to remove plate_number...');
  
  try {
    // First, drop the dependent view
    console.log('📝 Dropping dependent view real_time_truck_tracking...');
    await prisma.$executeRaw`DROP VIEW IF EXISTS real_time_truck_tracking CASCADE`;
    
    // Drop the unique constraint on plate_number first
    console.log('📝 Dropping unique constraint on plate_number...');
    await prisma.$executeRaw`ALTER TABLE truck DROP CONSTRAINT IF EXISTS truck_plate_number_key`;
    
    // Drop the plate_number column
    console.log('📝 Dropping plate_number column...');
    await prisma.$executeRaw`ALTER TABLE truck DROP COLUMN IF EXISTS plate_number`;
    
    // Recreate the view without plate_number
    console.log('📝 Recreating real_time_truck_tracking view without plate_number...');
    await prisma.$executeRaw`
      CREATE OR REPLACE VIEW real_time_truck_tracking AS
      SELECT 
        t.id as truck_id,
        t.name as truck_name,
        t.model,
        t.year,
        fg.name as fleet_group,
        fg.site,
        COALESCE(latest_pos.lat, 0) as latitude,
        COALESCE(latest_pos.lng, 0) as longitude,
        COALESCE(latest_pos.speed_kph, 0) as speed_kph,
        COALESCE(latest_pos.heading_deg, 0) as heading_deg,
        latest_pos.ts as last_update,
        CASE 
          WHEN latest_pos.ts > NOW() - INTERVAL '5 minutes' THEN 'online'
          WHEN latest_pos.ts > NOW() - INTERVAL '30 minutes' THEN 'idle'
          ELSE 'offline'
        END as status
      FROM truck t
      LEFT JOIN fleet_group fg ON t.fleet_group_id = fg.id
      LEFT JOIN LATERAL (
        SELECT 
          ST_Y(pos::geometry) as lat,
          ST_X(pos::geometry) as lng,
          speed_kph,
          heading_deg,
          ts
        FROM gps_position gp 
        WHERE gp.truck_id = t.id 
        ORDER BY ts DESC 
        LIMIT 1
      ) latest_pos ON true
    `;
    
    console.log('✅ Database schema updated successfully!');
    
    // Verify the change by checking truck table structure
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'truck' 
      ORDER BY ordinal_position
    `;
    
    console.log('\n📊 Current truck table structure:');
    tableInfo.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
  } catch (error) {
    console.error('❌ Error updating database schema:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('🚀 Starting Database Schema Update...\n');
  
  try {
    await updateDatabaseSchema();
    console.log('\n🎉 Schema update completed successfully!');
  } catch (error) {
    console.error('❌ Schema update failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updateDatabaseSchema };
