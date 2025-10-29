-- Manual Migration: Drop Unused Tables
-- Created: October 27, 2025
-- Purpose: Remove tables that are not being used in the codebase
-- WARNING: This will DELETE all data in these tables permanently!

-- Drop unused tables (not used in any controller)
DROP TABLE IF EXISTS "speed_event" CASCADE;
DROP TABLE IF EXISTS "fuel_level_event" CASCADE;
DROP TABLE IF EXISTS "tire_position_config" CASCADE;
DROP TABLE IF EXISTS "tire_error_code" CASCADE;
DROP TABLE IF EXISTS "trip" CASCADE;
DROP TABLE IF EXISTS "daily_route" CASCADE;
DROP TABLE IF EXISTS "geofence" CASCADE;

-- Note: spatial_ref_sys is a PostGIS system table, managed automatically
-- Note: All other tables (vendors, drivers, truck, device, sensor, events, etc.) are KEPT
