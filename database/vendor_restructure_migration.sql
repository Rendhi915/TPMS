-- =========================
-- Vendor Database Restructure Migration
-- =========================

-- 1. Create new vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id SERIAL PRIMARY KEY,
  nama_vendor VARCHAR(255) NOT NULL,
  address TEXT,
  nomor_telepon VARCHAR(50),
  email VARCHAR(255),
  kontak_person VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  license_number VARCHAR(50) NOT NULL,
  license_type VARCHAR(20) NOT NULL, -- SIM A, B1, B2, C, dll
  license_expiry DATE NOT NULL,
  id_card_number VARCHAR(50) NOT NULL,
  vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif', 'cuti')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Add vendor_id to truck table
ALTER TABLE truck ADD COLUMN IF NOT EXISTS vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL;

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_drivers_vendor_id ON drivers(vendor_id);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers(status);
CREATE INDEX IF NOT EXISTS idx_drivers_license_expiry ON drivers(license_expiry);
CREATE INDEX IF NOT EXISTS idx_truck_vendor_id ON truck(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendors_nama ON vendors(nama_vendor);

-- 5. Insert sample vendors (migrating from existing fleet_group data if any)
INSERT INTO vendors (nama_vendor, address, nomor_telepon, email, kontak_person) VALUES
('PT Vendor Satu', 'Jl. Industri No. 1, Jakarta', '021-1234567', 'contact@vendor1.com', 'John Doe'),
('PT Vendor Dua', 'Jl. Raya No. 2, Surabaya', '031-2345678', 'info@vendor2.com', 'Jane Smith'),
('PT Vendor Tiga', 'Jl. Merdeka No. 3, Bandung', '022-3456789', 'admin@vendor3.com', 'Bob Johnson'),
('PT Vendor Empat', 'Jl. Sudirman No. 4, Medan', '061-4567890', 'support@vendor4.com', 'Alice Brown'),
('PT Vendor Lima', 'Jl. Thamrin No. 5, Makassar', '0411-5678901', 'contact@vendor5.com', 'Charlie Wilson')
ON CONFLICT DO NOTHING;

-- 6. Insert sample drivers
INSERT INTO drivers (name, phone, email, address, license_number, license_type, license_expiry, id_card_number, vendor_id, status) VALUES
('Ahmad Supardi', '08123456789', 'ahmad@email.com', 'Jl. Mawar No. 1', 'SIM123456', 'SIM B2', '2025-12-31', '3201234567890001', 1, 'aktif'),
('Budi Santoso', '08234567890', 'budi@email.com', 'Jl. Melati No. 2', 'SIM234567', 'SIM B2', '2026-01-15', '3201234567890002', 1, 'aktif'),
('Candra Wijaya', '08345678901', 'candra@email.com', 'Jl. Anggrek No. 3', 'SIM345678', 'SIM B2', '2025-06-30', '3201234567890003', 2, 'aktif'),
('Dedi Kurniawan', '08456789012', 'dedi@email.com', 'Jl. Dahlia No. 4', 'SIM456789', 'SIM B2', '2026-03-20', '3201234567890004', 2, 'aktif'),
('Eko Prasetyo', '08567890123', 'eko@email.com', 'Jl. Kenanga No. 5', 'SIM567890', 'SIM B2', '2025-09-10', '3201234567890005', 3, 'aktif'),
('Fajar Nugroho', '08678901234', 'fajar@email.com', 'Jl. Cempaka No. 6', 'SIM678901', 'SIM B2', '2026-07-25', '3201234567890006', 3, 'cuti'),
('Gunawan Setiawan', '08789012345', 'gunawan@email.com', 'Jl. Flamboyan No. 7', 'SIM789012', 'SIM B2', '2025-11-15', '3201234567890007', 4, 'aktif'),
('Hendra Saputra', '08890123456', 'hendra@email.com', 'Jl. Bougenville No. 8', 'SIM890123', 'SIM B2', '2026-02-28', '3201234567890008', 4, 'aktif'),
('Indra Permana', '08901234567', 'indra@email.com', 'Jl. Kamboja No. 9', 'SIM901234', 'SIM B2', '2025-08-05', '3201234567890009', 5, 'aktif'),
('Joko Susilo', '08012345678', 'joko@email.com', 'Jl. Teratai No. 10', 'SIM012345', 'SIM B2', '2026-04-12', '3201234567890010', 5, 'nonaktif')
ON CONFLICT DO NOTHING;

-- 7. Update existing trucks to assign random vendors (for demo purposes)
-- This will assign vendors to existing trucks randomly
UPDATE truck 
SET vendor_id = (
  SELECT id FROM vendors 
  ORDER BY RANDOM() 
  LIMIT 1
)
WHERE vendor_id IS NULL;

-- 8. Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at 
    BEFORE UPDATE ON vendors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_drivers_updated_at ON drivers;
CREATE TRIGGER update_drivers_updated_at 
    BEFORE UPDATE ON drivers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Create views for easy querying
CREATE OR REPLACE VIEW vendor_summary AS
SELECT 
    v.id,
    v.nama_vendor,
    v.address,
    v.nomor_telepon,
    v.email,
    v.kontak_person,
    COUNT(DISTINCT t.id) as total_trucks,
    COUNT(DISTINCT d.id) as total_drivers,
    COUNT(DISTINCT CASE WHEN d.status = 'aktif' THEN d.id END) as active_drivers,
    v.created_at,
    v.updated_at
FROM vendors v
LEFT JOIN truck t ON v.id = t.vendor_id
LEFT JOIN drivers d ON v.id = d.vendor_id
GROUP BY v.id, v.nama_vendor, v.address, v.nomor_telepon, v.email, v.kontak_person, v.created_at, v.updated_at;

CREATE OR REPLACE VIEW driver_details AS
SELECT 
    d.*,
    v.nama_vendor,
    CASE 
        WHEN d.license_expiry < CURRENT_DATE THEN 'expired'
        WHEN d.license_expiry < CURRENT_DATE + INTERVAL '30 days' THEN 'expiring_soon'
        ELSE 'valid'
    END as license_status
FROM drivers d
LEFT JOIN vendors v ON d.vendor_id = v.id;

-- 10. Drop old fleet_group references if needed (commented out for safety)
-- Note: Uncomment these after ensuring all data is migrated properly
-- ALTER TABLE truck DROP CONSTRAINT IF EXISTS truck_fleet_group_id_fkey;
-- ALTER TABLE truck DROP COLUMN IF EXISTS fleet_group_id;
-- DROP TABLE IF EXISTS fleet_group CASCADE;

COMMIT;
