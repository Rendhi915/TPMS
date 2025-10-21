# 🚀 Development Database Setup Guide

## 📋 Overview

Panduan ini menjelaskan cara setup database untuk **development environment** dengan **100 trucks** (bukan 1000) untuk memudahkan testing dan development.

**Target:** 100 trucks × 10 wheels = 1,000 sensors dengan data telemetry yang realistis

---

## 🎯 Why 100 Trucks for Development?

| Aspect | 100 Trucks | 1000 Trucks |
|--------|-----------|-------------|
| **Data Volume** | ~5K records | ~50K records |
| **Query Speed** | Instant (<0.1s) | May need optimization |
| **Seeding Time** | ~30 seconds | ~5 minutes |
| **Easier Testing** | ✅ Yes | ⚠️ Too much data |
| **Database Size** | ~5 MB | ~50 MB |
| **Development** | ✅ Optimal | ⚠️ Overkill |

**Recommendation:** Start with 100, scale to 1000 when ready for production testing.

---

## 📦 Current Database State

Anda sudah memiliki data yang di-generate sebelumnya:

```
Trucks:              1,003
Devices:             1,001
Sensors:            20
Tire Pressure:       2,336
GPS Positions:       2
Fuel Events:         1,000
```

**Status:** Data untuk 1000+ trucks sudah ada, perlu di-cleanup untuk development.

---

## 🔧 Step-by-Step Setup

### **Option 1: Keep First 100 Trucks (Recommended)**

Strategi ini akan **mempertahankan trucks 0001-0100** dan menghapus sisanya.

```bash
# 1. Cek statistik database saat ini
node scripts/check-database-stats.js

# 2. Run cleanup script
node scripts/cleanup-reset-to-100-trucks.js

# 3. Pilih option 1: Keep First 100 Trucks
# 4. Konfirmasi dengan mengetik "yes"

# 5. Verify hasilnya
node scripts/check-database-stats.js
```

**Keuntungan:**
- ✅ Tetap punya data yang sudah ada
- ✅ Relasi antar data tetap valid
- ✅ Tidak perlu re-seeding
- ✅ Cepat (~30 detik)

---

### **Option 2: Complete Reset + Fresh Seed**

Strategi ini akan **menghapus semua data** dan membuat fresh 100 trucks dengan data baru.

```bash
# 1. Complete reset database
node scripts/cleanup-reset-to-100-trucks.js
# Pilih option 2: Delete ALL Data
# Ketik "DELETE ALL" untuk konfirmasi

# 2. Seed fresh 100 trucks dengan data realistic
node scripts/seed-100-trucks-dev.js

# 3. Verify hasilnya
node scripts/check-database-stats.js
```

**Keuntungan:**
- ✅ Data fresh dan clean
- ✅ Realistic data patterns
- ✅ Known baseline untuk testing
- ⚠️  Perlu waktu lebih lama (~2-3 menit)

---

## 📊 Expected Result

Setelah cleanup dan setup, database Anda akan memiliki:

```
📁 MASTER DATA:
   Trucks:       100
   Devices:      100
   Sensors:      1,000 (10 per truck)
   Vendors:      3
   Drivers:      15
   Fleet Groups: 3

📡 TELEMETRY DATA:
   Tire Pressure Events:    5,000 (5 readings per wheel)
   GPS Positions:           1,000 (10 points per truck)
   Hub Temperature Events:  0 (optional)
   Fuel Level Events:       0 (optional)
   Alert Events:            0 (generate as needed)

💾 TOTAL: ~7,000 records
📦 SIZE: ~5-10 MB
```

---

## 🔍 Verify Your Database

### Quick Check
```bash
node scripts/check-database-stats.js
```

### Detailed Verification

**1. Check truck count:**
```sql
SELECT COUNT(*) as truck_count FROM truck;
-- Expected: 100
```

**2. Check truck codes:**
```sql
SELECT code, name, model FROM truck ORDER BY code LIMIT 10;
-- Expected: 0001, 0002, 0003, ..., 0010
```

**3. Check TPMS data per truck:**
```sql
SELECT 
  t.code,
  COUNT(tpe.id) as tpms_readings
FROM truck t
LEFT JOIN tire_pressure_event tpe ON tpe.truck_id = t.id
GROUP BY t.code
ORDER BY t.code
LIMIT 10;
-- Expected: ~50 readings per truck (10 wheels × 5 readings)
```

**4. Check GPS data:**
```sql
SELECT 
  t.code,
  COUNT(gp.id) as gps_points
FROM truck t
LEFT JOIN gps_position gp ON gp.truck_id = t.id
GROUP BY t.code
ORDER BY t.code
LIMIT 10;
-- Expected: ~10 GPS points per truck
```

---

## 🧪 Testing Scenarios

### Scenario 1: Test Single Truck Dashboard
```javascript
// GET /api/trucks/0001
// Should return truck with:
// - Basic info (code, name, model)
// - Latest GPS position
// - Latest TPMS data (10 wheels)
// - No alerts (clean state)
```

### Scenario 2: Test Fleet Overview
```javascript
// GET /api/trucks?limit=100
// Should return 100 trucks with summary data
// Response time: <200ms
```

### Scenario 3: Test TPMS History
```javascript
// GET /api/trucks/0001/tpms-history?hours=1
// Should return last hour of TPMS data
// ~50 records (10 wheels × 5 readings)
```

---

## 🚀 Performance Benchmarks (100 Trucks)

Expected query performance:

| Query Type | Expected Time | Records Returned |
|-----------|---------------|------------------|
| Single truck detail | <50ms | 1 truck |
| Fleet list (100) | <100ms | 100 trucks |
| TPMS history (1h) | <50ms | ~50 readings |
| GPS trail (1h) | <50ms | ~10 positions |
| Dashboard summary | <200ms | 100 trucks aggregated |

---

## 📝 Database Maintenance Scripts

### Check Statistics
```bash
node scripts/check-database-stats.js
```

### Cleanup and Reset
```bash
node scripts/cleanup-reset-to-100-trucks.js
```

### Fresh Seed 100 Trucks
```bash
node scripts/seed-100-trucks-dev.js
```

### Check Specific Truck
```bash
node scripts/verify-demo-trucks-detail.js
```

---

## 🎓 Best Practices for Development

### 1. **Keep Data Minimal**
- ✅ 100 trucks is plenty for development
- ✅ Only keep last 7 days of telemetry
- ⚠️ Don't generate years of historical data

### 2. **Use Realistic Data Patterns**
- ✅ TPMS: 850-950 kPa (normal range)
- ✅ Temperature: 35-45°C (normal)
- ✅ GPS: Within mining area bounds
- ⚠️ Don't use random unrealistic values

### 3. **Regular Cleanup**
```bash
# Weekly cleanup of old telemetry data
DELETE FROM tire_pressure_event WHERE changed_at < NOW() - INTERVAL '7 days';
DELETE FROM gps_position WHERE ts < NOW() - INTERVAL '7 days';
```

### 4. **Incremental Testing**
- Start with 10 trucks → Test basic features
- Scale to 100 trucks → Test performance
- Scale to 1000 trucks → Production testing

---

## 🔄 Scaling to Production (1000 Trucks)

When ready to test with full scale:

### Step 1: Database Optimization
```bash
# Apply optimization scripts from Priority 1
# (Partitioning, Materialized Views, Indexes)
```

### Step 2: Seed 1000 Trucks
```bash
# Modify seed-100-trucks-dev.js:
# Change TRUCK_COUNT from 100 to 1000
node scripts/seed-100-trucks-dev.js
```

### Step 3: Performance Testing
```bash
# Monitor query performance
# Check for slow queries
# Verify indexes are being used
```

---

## ⚠️ Common Issues

### Issue 1: "Database already has 1000 trucks"
**Solution:** Run cleanup script first
```bash
node scripts/cleanup-reset-to-100-trucks.js
```

### Issue 2: "Seeding is slow"
**Solution:** Normal for first time. Subsequent seeds use caching.

### Issue 3: "GPS data not showing"
**Solution:** Check PostGIS extension is installed
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Issue 4: "Duplicate truck codes"
**Solution:** Cleanup first, then seed
```bash
# Option 1: Delete trucks 0001-0100 first
DELETE FROM truck WHERE code >= '0001' AND code <= '0100';

# Option 2: Use complete reset
node scripts/cleanup-reset-to-100-trucks.js
# Choose option 2: Delete ALL
```

---

## 📞 Need Help?

1. **Check Statistics:** `node scripts/check-database-stats.js`
2. **Verify Data:** Run SQL queries above
3. **Reset if needed:** Use cleanup script
4. **Re-seed:** Use seed script

---

## ✅ Checklist

After setup, verify:

- [ ] Database has exactly 100 trucks (codes 0001-0100)
- [ ] Each truck has 1 device
- [ ] Each device has 10 sensors (1 per wheel)
- [ ] TPMS data exists (check any truck)
- [ ] GPS data exists (check any truck)
- [ ] Vendors exist (at least 3)
- [ ] Drivers exist (at least 15)
- [ ] Fleet groups exist (at least 3)
- [ ] API endpoints working
- [ ] Dashboard loads fast (<1 second)

---

**Last Updated:** October 21, 2025  
**For:** Development Environment Only  
**Next Step:** Test APIs and verify all features work with 100 trucks
