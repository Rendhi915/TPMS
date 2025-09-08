const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function migrateTruckIds() {
  console.log('🔄 Starting truck ID migration from UUID to numeric format...\n');
  
  try {
    // Start a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      console.log('1. Fetching existing trucks...');
      const trucks = await tx.truck.findMany({
        orderBy: { created_at: 'asc' }
      });
      
      console.log(`   Found ${trucks.length} trucks to migrate`);
      
      if (trucks.length === 0) {
        console.log('   No trucks found to migrate');
        return;
      }
      
      // Create mapping of old UUID to new numeric ID
      const idMapping = new Map();
      trucks.forEach((truck, index) => {
        const newId = String(index + 1).padStart(4, '0'); // 0001, 0002, etc.
        idMapping.set(truck.id, newId);
      });
      
      console.log('\n2. Disabling foreign key constraints temporarily...');
      await tx.$executeRaw`SET session_replication_role = replica;`;
      
      console.log('\n3. Updating truck IDs...');
      for (const [oldId, newId] of idMapping) {
        await tx.$executeRaw`UPDATE truck SET id = ${newId} WHERE id = ${oldId}`;
        console.log(`   Updated truck ${oldId} -> ${newId}`);
      }
      
      console.log('\n4. Updating foreign key references...');
      
      // Update all tables that reference truck_id
      const tablesToUpdate = [
        'alert_event',
        'daily_route', 
        'device',
        'device_status_event',
        'device_truck_assignment',
        'fuel_level_event',
        'gps_position',
        'hub_temperature_event',
        'lock_event',
        'sensor_data_raw',
        'speed_event',
        'tire_position_config',
        'tire_pressure_event',
        'trip',
        'truck_status_event'
      ];
      
      for (const table of tablesToUpdate) {
        console.log(`   Updating ${table}...`);
        let updateCount = 0;
        
        for (const [oldId, newId] of idMapping) {
          const result = await tx.$executeRaw`
            UPDATE ${table} 
            SET truck_id = ${newId} 
            WHERE truck_id = ${oldId}
          `;
          updateCount += result;
        }
        
        console.log(`     Updated ${updateCount} records in ${table}`);
      }
      
      console.log('\n5. Re-enabling foreign key constraints...');
      await tx.$executeRaw`SET session_replication_role = DEFAULT;`;
      
      console.log('\n6. Updating database schema to use VARCHAR(4) for truck_id...');
      
      // Drop and recreate foreign key constraints with new data type
      await tx.$executeRaw`
        -- Drop existing foreign key constraints
        ALTER TABLE alert_event DROP CONSTRAINT IF EXISTS alert_event_truck_id_fkey;
        ALTER TABLE daily_route DROP CONSTRAINT IF EXISTS daily_route_truck_id_fkey;
        ALTER TABLE device DROP CONSTRAINT IF EXISTS device_truck_id_fkey;
        ALTER TABLE device_status_event DROP CONSTRAINT IF EXISTS device_status_event_truck_id_fkey;
        ALTER TABLE device_truck_assignment DROP CONSTRAINT IF EXISTS device_truck_assignment_truck_id_fkey;
        ALTER TABLE fuel_level_event DROP CONSTRAINT IF EXISTS fuel_level_event_truck_id_fkey;
        ALTER TABLE gps_position DROP CONSTRAINT IF EXISTS gps_position_truck_id_fkey;
        ALTER TABLE hub_temperature_event DROP CONSTRAINT IF EXISTS hub_temperature_event_truck_id_fkey;
        ALTER TABLE lock_event DROP CONSTRAINT IF EXISTS lock_event_truck_id_fkey;
        ALTER TABLE sensor_data_raw DROP CONSTRAINT IF EXISTS sensor_data_raw_truck_id_fkey;
        ALTER TABLE speed_event DROP CONSTRAINT IF EXISTS speed_event_truck_id_fkey;
        ALTER TABLE tire_position_config DROP CONSTRAINT IF EXISTS tire_position_config_truck_id_fkey;
        ALTER TABLE tire_pressure_event DROP CONSTRAINT IF EXISTS tire_pressure_event_truck_id_fkey;
        ALTER TABLE trip DROP CONSTRAINT IF EXISTS trip_truck_id_fkey;
        ALTER TABLE truck_status_event DROP CONSTRAINT IF EXISTS truck_status_event_truck_id_fkey;
        
        -- Alter truck table primary key
        ALTER TABLE truck ALTER COLUMN id TYPE VARCHAR(4);
        
        -- Alter all foreign key columns
        ALTER TABLE alert_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE daily_route ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE device ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE device_status_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE device_truck_assignment ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE fuel_level_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE gps_position ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE hub_temperature_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE lock_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE sensor_data_raw ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE speed_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE tire_position_config ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE tire_pressure_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE trip ALTER COLUMN truck_id TYPE VARCHAR(4);
        ALTER TABLE truck_status_event ALTER COLUMN truck_id TYPE VARCHAR(4);
        
        -- Recreate foreign key constraints
        ALTER TABLE alert_event ADD CONSTRAINT alert_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE daily_route ADD CONSTRAINT daily_route_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE device ADD CONSTRAINT device_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE device_status_event ADD CONSTRAINT device_status_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE device_truck_assignment ADD CONSTRAINT device_truck_assignment_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE fuel_level_event ADD CONSTRAINT fuel_level_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE gps_position ADD CONSTRAINT gps_position_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE hub_temperature_event ADD CONSTRAINT hub_temperature_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE lock_event ADD CONSTRAINT lock_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE sensor_data_raw ADD CONSTRAINT sensor_data_raw_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE speed_event ADD CONSTRAINT speed_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE tire_position_config ADD CONSTRAINT tire_position_config_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE tire_pressure_event ADD CONSTRAINT tire_pressure_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE trip ADD CONSTRAINT trip_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE truck_status_event ADD CONSTRAINT truck_status_event_truck_id_fkey 
          FOREIGN KEY (truck_id) REFERENCES truck(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
      `;
      
      console.log('\n✅ Migration completed successfully!');
      console.log(`   Migrated ${trucks.length} trucks to numeric ID format`);
      console.log('   ID format: 0001, 0002, 0003, ...');
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateTruckIds()
    .then(() => {
      console.log('\n🎉 Truck ID migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateTruckIds };
