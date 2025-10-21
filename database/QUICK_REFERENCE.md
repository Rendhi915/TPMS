# 🚀 Quick Reference - Database Schema

## 📁 Files Created

1. **`schema_export_updated.sql`** - Complete SQL schema with sample data
2. **`ERD_DOCUMENTATION.md`** - Detailed documentation with diagrams
3. **`schema.dbml`** - DBML format for dbdiagram.io
4. **`QUICK_REFERENCE.md`** - This file

---

## 🗂️ Table Summary

| Table | Primary Key | Type | Purpose |
|-------|-------------|------|---------|
| `vendors` | id | SERIAL | Vendor/Company management |
| `drivers` | id | SERIAL | Driver information & licensing |
| `fleet_group` | id | UUID | Fleet organizational grouping |
| `truck` | id | UUID | Truck/Vehicle master data |

---

## 🔗 Relationships Quick View

```
vendors (1:N) drivers
vendors (1:N) truck
fleet_group (1:N) truck
truck (1:N) device, gps_position, tire_pressure_event, etc.
```

---

## 🎯 Field Mapping Cheat Sheet

### vendors
```javascript
// Database → Code
nama_vendor    → name
nomor_telepon  → phone
kontak_person  → contactPerson
created_at     → createdAt
updated_at     → updatedAt
```

### drivers
```javascript
// Database → Code
license_number → licenseNumber
license_type   → licenseType
license_expiry → licenseExpiry
id_card_number → idCardNumber
vendor_id      → vendorId
created_at     → createdAt
updated_at     → updatedAt
```

### truck
```javascript
// Database → Code
tire_config     → tireConfig
fleet_group_id  → fleetGroupId
vendor_id       → vendorId
created_at      → createdAt
created_by      → createdBy
updated_by      → updatedBy
```

---

## 📊 How to Generate Diagram

### Option 1: dbdiagram.io (Recommended)
1. Go to https://dbdiagram.io/
2. Click "New Diagram"
3. Copy content from `schema.dbml`
4. Paste into editor
5. Visual diagram auto-generated
6. Export as PNG/PDF/SQL

### Option 2: Import SQL
1. Use Lucidchart or DBeaver
2. Import `schema_export_updated.sql`
3. Auto-generate ERD
4. Customize appearance

### Option 3: Mermaid in Markdown
- View `ERD_DOCUMENTATION.md`
- Mermaid diagram section
- Render in GitHub/GitLab

---

## 🔍 Common Queries

### Get vendor with counts
```sql
SELECT 
    v.id,
    v.nama_vendor as name,
    COUNT(DISTINCT d.id) as driver_count,
    COUNT(DISTINCT t.id) as truck_count
FROM vendors v
LEFT JOIN drivers d ON d.vendor_id = v.id
LEFT JOIN truck t ON t.vendor_id = v.id
GROUP BY v.id;
```

### Get expiring licenses (30 days)
```sql
SELECT 
    name,
    license_number,
    license_expiry,
    license_expiry - CURRENT_DATE as days_left
FROM drivers
WHERE status = 'aktif' 
  AND license_expiry <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY license_expiry;
```

### Get truck fleet overview
```sql
SELECT 
    t.code,
    t.name,
    v.nama_vendor as vendor,
    fg.name as fleet_group
FROM truck t
LEFT JOIN vendors v ON t.vendor_id = v.id
LEFT JOIN fleet_group fg ON t.fleet_group_id = fg.id;
```

---

## ✅ Validation Rules

### vendors
- `nama_vendor`: Required, max 255 chars
- `nomor_telepon`: Optional, max 50 chars
- `email`: Optional, valid email format

### drivers
- `name`: Required, 2-255 chars
- `license_number`: Required, 1-50 chars
- `license_type`: Required, 1-20 chars
- `license_expiry`: Required, ISO8601 date
- `id_card_number`: Required, 1-50 chars
- `status`: Must be 'aktif' or 'nonaktif'

### truck
- `code`: Optional, max 4 uppercase alphanumeric
- `vin`: Optional, exactly 17 chars, pattern `[A-HJ-NPR-Z0-9]+`
- `year`: Optional, 1900 to current year + 1

---

## 🛠️ Testing Sample Data

### Create Vendor
```javascript
POST /api/vendors
{
  "name": "PT Transport Nusantara",
  "address": "Jakarta Selatan",
  "phone": "021-12345678",
  "email": "contact@transport.co.id",
  "contactPerson": "Budi Santoso"
}
```

### Create Driver
```javascript
POST /api/drivers
{
  "name": "John Doe",
  "phone": "08123456789",
  "email": "john@example.com",
  "address": "Jakarta",
  "licenseNumber": "SIM-001-2023",
  "licenseType": "SIM A",
  "licenseExpiry": "2026-12-31",
  "idCardNumber": "3174010101900001",
  "vendorId": 1,
  "status": "aktif"
}
```

### Create Truck
```javascript
POST /api/trucks
{
  "code": "T001",
  "vin": "1HGBH41JXMN109186",
  "name": "Truck Alpha",
  "model": "Hino 500",
  "year": 2023,
  "tireConfig": "10R20",
  "fleetGroupId": "uuid-here",
  "vendorId": 1
}
```

---

## 📝 API Request Body Format

### Remember: Use camelCase in API requests!

❌ **Wrong (snake_case):**
```json
{
  "nama_vendor": "Test",
  "nomor_telepon": "123",
  "kontak_person": "John"
}
```

✅ **Correct (camelCase):**
```json
{
  "name": "Test",
  "phone": "123",
  "contactPerson": "John"
}
```

---

## 🔐 Foreign Key Behaviors

| Relationship | On Delete | Reason |
|--------------|-----------|--------|
| drivers → vendors | SET NULL | Driver can exist without vendor |
| truck → vendors | SET NULL | Truck can exist without vendor |
| truck → fleet_group | NO ACTION | Prevent accidental group deletion |

---

## 📈 Indexes Summary

### vendors
- `idx_vendors_nama` on `nama_vendor`

### drivers
- `idx_drivers_vendor_id` on `vendor_id`
- `idx_drivers_status` on `status`
- `idx_drivers_license_expiry` on `license_expiry`

### truck
- `idx_truck_code` on `code` (UNIQUE)
- `idx_truck_vin` on `vin` (UNIQUE)
- `idx_truck_vendor_id` on `vendor_id`
- `idx_truck_fleet_group_id` on `fleet_group_id`

---

## 🎨 Color Coding for Diagrams

**Suggested colors:**
- 🟦 **Blue:** vendors (master data)
- 🟩 **Green:** drivers (user data)
- 🟨 **Yellow:** fleet_group (organizational)
- 🟧 **Orange:** truck (assets)
- ⬜ **Gray:** event/telemetry tables

---

## 📞 Support

For questions or issues:
1. Check `ERD_DOCUMENTATION.md` for details
2. Review `schema_export_updated.sql` for SQL structure
3. Test with sample data provided

---

**Last Updated:** October 21, 2025  
**Database:** PostgreSQL 14+  
**ORM:** Prisma 5.22.0
