-- ============================================
-- TPMS Backend - Database Schema Export
-- Updated Schema with Prisma @map Convention
-- Date: October 21, 2025
-- ============================================

-- This file contains the database schema for main CRUD tables:
-- - vendors
-- - drivers  
-- - truck
-- - fleet_group
--
-- Naming Convention:
-- - Database columns: snake_case (PostgreSQL standard)
-- - Application code: camelCase (JavaScript standard)
-- - Mapped via Prisma @map directive

-- ============================================
-- Table: vendors
-- Purpose: Vendor/Company management
-- ============================================

CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    nama_vendor VARCHAR(255) NOT NULL,
    address TEXT,
    nomor_telepon VARCHAR(50),
    email VARCHAR(255),
    kontak_person VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for vendors table
CREATE INDEX idx_vendors_nama ON vendors(nama_vendor);

-- Comments for documentation
COMMENT ON TABLE vendors IS 'Vendor/Company information for truck fleet management';
COMMENT ON COLUMN vendors.id IS 'Primary key, auto-increment';
COMMENT ON COLUMN vendors.nama_vendor IS 'Vendor name (mapped to "name" in code)';
COMMENT ON COLUMN vendors.nomor_telepon IS 'Vendor phone number (mapped to "phone" in code)';
COMMENT ON COLUMN vendors.kontak_person IS 'Contact person name (mapped to "contactPerson" in code)';

-- ============================================
-- Table: drivers
-- Purpose: Driver information and licensing
-- ============================================

CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    license_number VARCHAR(50) NOT NULL,
    license_type VARCHAR(20) NOT NULL,
    license_expiry DATE NOT NULL,
    id_card_number VARCHAR(50) NOT NULL,
    vendor_id INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'aktif',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_drivers_vendor 
        FOREIGN KEY (vendor_id) 
        REFERENCES vendors(id) 
        ON DELETE SET NULL 
        ON UPDATE NO ACTION
);

-- Indexes for drivers table
CREATE INDEX idx_drivers_vendor_id ON drivers(vendor_id);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_drivers_license_expiry ON drivers(license_expiry);

-- Check constraint for status
ALTER TABLE drivers ADD CONSTRAINT chk_drivers_status 
    CHECK (status IN ('aktif', 'nonaktif'));

-- Comments for documentation
COMMENT ON TABLE drivers IS 'Driver information including license details';
COMMENT ON COLUMN drivers.license_number IS 'Driver license number (mapped to "licenseNumber" in code)';
COMMENT ON COLUMN drivers.license_type IS 'Type of driver license, e.g., SIM A, SIM B (mapped to "licenseType" in code)';
COMMENT ON COLUMN drivers.license_expiry IS 'License expiration date (mapped to "licenseExpiry" in code)';
COMMENT ON COLUMN drivers.id_card_number IS 'National ID card number (mapped to "idCardNumber" in code)';
COMMENT ON COLUMN drivers.vendor_id IS 'Reference to vendor (mapped to "vendorId" in code)';

-- ============================================
-- Table: fleet_group
-- Purpose: Fleet grouping for organization
-- ============================================

CREATE TABLE IF NOT EXISTS fleet_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    site VARCHAR(255),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- Comments for documentation
COMMENT ON TABLE fleet_group IS 'Fleet group categorization for truck organization';
COMMENT ON COLUMN fleet_group.site IS 'Physical site or location name';

-- ============================================
-- Table: truck
-- Purpose: Truck/Vehicle information
-- ============================================

CREATE TABLE IF NOT EXISTS truck (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(4) UNIQUE,
    vin VARCHAR(17) UNIQUE,
    name VARCHAR(255),
    model VARCHAR(255),
    year INTEGER,
    tire_config VARCHAR(255),
    fleet_group_id UUID,
    vendor_id INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    
    -- Foreign key constraints
    CONSTRAINT fk_truck_vendor 
        FOREIGN KEY (vendor_id) 
        REFERENCES vendors(id) 
        ON DELETE SET NULL 
        ON UPDATE NO ACTION,
    
    CONSTRAINT fk_truck_fleet_group 
        FOREIGN KEY (fleet_group_id) 
        REFERENCES fleet_group(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION
);

-- Indexes for truck table
CREATE UNIQUE INDEX idx_truck_code ON truck(code);
CREATE UNIQUE INDEX idx_truck_vin ON truck(vin);
CREATE INDEX idx_truck_vendor_id ON truck(vendor_id);
CREATE INDEX idx_truck_fleet_group_id ON truck(fleet_group_id);

-- Check constraint for VIN format (17 characters, excluding I, O, Q)
ALTER TABLE truck ADD CONSTRAINT chk_truck_vin_format 
    CHECK (vin IS NULL OR (LENGTH(vin) = 17 AND vin ~ '^[A-HJ-NPR-Z0-9]+$'));

-- Check constraint for code format (4 uppercase alphanumeric)
ALTER TABLE truck ADD CONSTRAINT chk_truck_code_format 
    CHECK (code IS NULL OR (LENGTH(code) <= 4 AND code ~ '^[A-Z0-9]+$'));

-- Comments for documentation
COMMENT ON TABLE truck IS 'Truck/Vehicle master data with fleet management';
COMMENT ON COLUMN truck.code IS 'Short 4-character truck code for quick identification';
COMMENT ON COLUMN truck.vin IS 'Vehicle Identification Number (17 characters)';
COMMENT ON COLUMN truck.tire_config IS 'Tire configuration description (mapped to "tireConfig" in code)';
COMMENT ON COLUMN truck.fleet_group_id IS 'Reference to fleet group (mapped to "fleetGroupId" in code)';
COMMENT ON COLUMN truck.vendor_id IS 'Reference to vendor (mapped to "vendorId" in code)';
COMMENT ON COLUMN truck.created_at IS 'Record creation timestamp (mapped to "createdAt" in code)';
COMMENT ON COLUMN truck.created_by IS 'User who created the record (mapped to "createdBy" in code)';
COMMENT ON COLUMN truck.updated_by IS 'User who last updated the record (mapped to "updatedBy" in code)';

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Sample vendor data
INSERT INTO vendors (nama_vendor, address, nomor_telepon, email, kontak_person) 
VALUES 
    ('PT Transport Nusantara', 'Jakarta Selatan', '021-12345678', 'contact@transport.co.id', 'Budi Santoso'),
    ('CV Maju Jaya Logistik', 'Surabaya', '031-87654321', 'info@majujaya.com', 'Siti Rahmawati'),
    ('PT Global Mining Services', 'Balikpapan', '0542-123456', 'admin@gms.co.id', 'Ahmad Fauzi')
ON CONFLICT DO NOTHING;

-- Sample fleet group data
INSERT INTO fleet_group (name, site, description) 
VALUES 
    ('Mining Fleet A', 'Site Kalimantan', 'Heavy duty trucks for coal mining'),
    ('Transport Fleet B', 'Site Jakarta', 'General transportation fleet'),
    ('Maintenance Pool', 'Workshop Jakarta', 'Trucks under maintenance')
ON CONFLICT DO NOTHING;

-- Sample driver data
INSERT INTO drivers (name, phone, email, address, license_number, license_type, license_expiry, id_card_number, vendor_id, status) 
VALUES 
    ('John Doe', '08123456789', 'john@example.com', 'Jakarta', 'SIM-001-2023', 'SIM A', '2026-12-31', '3174010101900001', 1, 'aktif'),
    ('Jane Smith', '08198765432', 'jane@example.com', 'Surabaya', 'SIM-002-2023', 'SIM B1', '2025-06-30', '3578020202850001', 1, 'aktif'),
    ('Robert Johnson', '08111222333', 'robert@example.com', 'Balikpapan', 'SIM-003-2024', 'SIM B2', '2027-03-15', '6472030303880001', 2, 'aktif')
ON CONFLICT DO NOTHING;

-- ============================================
-- Utility Functions
-- ============================================

-- Function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
CREATE TRIGGER update_vendors_updated_at 
    BEFORE UPDATE ON vendors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at 
    BEFORE UPDATE ON drivers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Views for easier querying
-- ============================================

-- View: Complete vendor information with counts
CREATE OR REPLACE VIEW v_vendors_summary AS
SELECT 
    v.id,
    v.nama_vendor as name,
    v.address,
    v.nomor_telepon as phone,
    v.email,
    v.kontak_person as contact_person,
    v.created_at,
    v.updated_at,
    COUNT(DISTINCT d.id) as driver_count,
    COUNT(DISTINCT t.id) as truck_count
FROM vendors v
LEFT JOIN drivers d ON d.vendor_id = v.id AND d.status = 'aktif'
LEFT JOIN truck t ON t.vendor_id = v.id
GROUP BY v.id, v.nama_vendor, v.address, v.nomor_telepon, v.email, v.kontak_person, v.created_at, v.updated_at;

COMMENT ON VIEW v_vendors_summary IS 'Complete vendor information with driver and truck counts';

-- View: Drivers with expiring licenses (within 30 days)
CREATE OR REPLACE VIEW v_drivers_expiring_licenses AS
SELECT 
    d.id,
    d.name,
    d.license_number,
    d.license_type,
    d.license_expiry,
    d.license_expiry - CURRENT_DATE as days_until_expiry,
    v.nama_vendor as vendor_name,
    d.phone,
    d.email
FROM drivers d
LEFT JOIN vendors v ON d.vendor_id = v.id
WHERE d.status = 'aktif' 
  AND d.license_expiry BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY d.license_expiry ASC;

COMMENT ON VIEW v_drivers_expiring_licenses IS 'Drivers with licenses expiring in the next 30 days';

-- View: Truck fleet overview
CREATE OR REPLACE VIEW v_truck_fleet_overview AS
SELECT 
    t.id,
    t.code,
    t.name,
    t.model,
    t.year,
    t.vin,
    v.nama_vendor as vendor_name,
    fg.name as fleet_group_name,
    fg.site as fleet_site,
    t.created_at
FROM truck t
LEFT JOIN vendors v ON t.vendor_id = v.id
LEFT JOIN fleet_group fg ON t.fleet_group_id = fg.id
ORDER BY t.code;

COMMENT ON VIEW v_truck_fleet_overview IS 'Complete truck fleet information with vendor and fleet group details';

-- ============================================
-- Grants and Permissions (Adjust as needed)
-- ============================================

-- Example: Grant permissions to application user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON vendors TO tpms_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON drivers TO tpms_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON truck TO tpms_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON fleet_group TO tpms_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO tpms_app_user;

-- ============================================
-- Notes and Documentation
-- ============================================

/*
FIELD MAPPING REFERENCE (Prisma @map):

vendors:
  - name          → nama_vendor
  - phone         → nomor_telepon
  - contactPerson → kontak_person
  - createdAt     → created_at
  - updatedAt     → updated_at

drivers:
  - licenseNumber → license_number
  - licenseType   → license_type
  - licenseExpiry → license_expiry
  - idCardNumber  → id_card_number
  - vendorId      → vendor_id
  - createdAt     → created_at
  - updatedAt     → updated_at

truck:
  - tireConfig    → tire_config
  - fleetGroupId  → fleet_group_id
  - vendorId      → vendor_id
  - createdAt     → created_at
  - createdBy     → created_by
  - updatedBy     → updated_by

RELATIONSHIPS:
  vendors (1) ─── (N) drivers
  vendors (1) ─── (N) truck
  fleet_group (1) ─── (N) truck

VALIDATION RULES:
  - Driver status: 'aktif' or 'nonaktif'
  - Truck code: Max 4 uppercase alphanumeric characters
  - Truck VIN: Exactly 17 characters, excluding I, O, Q
  - License expiry: Must be a future date for active drivers
*/

-- ============================================
-- End of Schema Export
-- ============================================
