-- Remove plate_number column from truck table
-- This script removes the plate_number field and its unique constraint

-- Drop the unique constraint on plate_number first
ALTER TABLE truck DROP CONSTRAINT IF EXISTS truck_plate_number_key;

-- Drop the plate_number column
ALTER TABLE truck DROP COLUMN IF EXISTS plate_number;

-- Verify the change
\d truck;
