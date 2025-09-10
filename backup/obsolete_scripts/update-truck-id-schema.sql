-- Update truck ID schema from UUID to VARCHAR(4)
-- This script must be run directly on the database

-- 1. Clear all data first
TRUNCATE TABLE 
  alert_event, speed_event, fuel_level_event,
  hub_temperature_event, tire_pressure_event, gps_position, trip, geofence,
  truck_status_event, sensor, device, daily_route,
  truck, fleet_group, tire_error_code, device_status_event, lock_event, 
  device_truck_assignment, sensor_data_raw, sensor_processing_queue
  RESTART IDENTITY CASCADE;

-- 2. Drop all foreign key constraints
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

-- 3. Alter truck table primary key
ALTER TABLE truck ALTER COLUMN id TYPE VARCHAR(4);

-- 4. Alter all foreign key columns
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

-- 5. Recreate foreign key constraints
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
