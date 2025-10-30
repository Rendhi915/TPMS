-- Script untuk menambahkan kolom-kolom baru ke tabel sensor
-- Untuk live tracking dan history data

-- 1. Tambahkan kolom tempValue (Temperature)
ALTER TABLE sensor 
ADD COLUMN IF NOT EXISTS "tempValue" real;

-- 2. Tambahkan kolom tirepValue (Tire Pressure)
ALTER TABLE sensor 
ADD COLUMN IF NOT EXISTS "tirepValue" real;

-- 3. Tambahkan kolom exType (Exception Type)
ALTER TABLE sensor 
ADD COLUMN IF NOT EXISTS "exType" varchar(50);

-- 4. Tambahkan kolom bat (Battery Level)
ALTER TABLE sensor 
ADD COLUMN IF NOT EXISTS bat smallint;

-- 5. Update updated_at jika belum ada
ALTER TABLE sensor 
ADD COLUMN IF NOT EXISTS updated_at timestamptz(6) DEFAULT now();

-- 6. Create index untuk updated_at (untuk sorting history)
CREATE INDEX IF NOT EXISTS idx_sensor_updated_at ON sensor(updated_at);

-- Selesai!
-- Verifikasi dengan: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'sensor';
