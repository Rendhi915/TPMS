# Postman Collections - TPMS Backend

## Files

1. **TPMS-IoT-Data-API.postman_collection.json** - Collection untuk IoT Data API
2. **TPMS-Local.postman_environment.json** - Environment variables untuk testing lokal

---

## Import ke Postman

### Step 1: Import Collection
1. Buka Postman
2. Klik **Import** (pojok kiri atas)
3. Drag & drop file `TPMS-IoT-Data-API.postman_collection.json`
4. Atau klik **Choose Files** dan pilih file tersebut
5. Klik **Import**

### Step 2: Import Environment
1. Klik icon **⚙️ (Settings)** di pojok kanan atas
2. Pilih **Environments**
3. Klik **Import**
4. Drag & drop file `TPMS-Local.postman_environment.json`
5. Klik **Import**

### Step 3: Aktifkan Environment
1. Di dropdown environment (pojok kanan atas), pilih **TPMS Backend - Local**
2. Environment variables sekarang aktif

---

## Setup Sebelum Testing

### 1. Update Environment Variables

Klik icon **👁️ (eye)** di pojok kanan atas untuk melihat/edit environment variables:

| Variable | Default Value | Keterangan |
|----------|---------------|------------|
| `base_url` | `http://localhost:5009` | URL server backend |
| `token` | (kosong) | Auto-filled setelah login |
| `test_sensor_sn` | `SENSOR001` | ⚠️ **Ganti dengan SN yang valid!** |
| `test_device_sn` | `DEVICE001` | ⚠️ **Ganti dengan SN yang valid!** |

### 2. Dapatkan Valid Serial Numbers

Jalankan query di database untuk mendapatkan serial numbers yang valid:

```sql
-- Get sensor serial numbers
SELECT sn, tireNo, device_id FROM sensor 
WHERE deleted_at IS NULL 
LIMIT 5;

-- Get device serial numbers
SELECT sn, truck_id FROM device 
WHERE deleted_at IS NULL 
LIMIT 5;
```

Update environment variables dengan serial numbers yang didapat.

---

## Cara Testing

### Quick Start (3 Steps)

1. **Login terlebih dahulu:**
   - Buka folder **Auth**
   - Run request **Login**
   - Token akan otomatis tersimpan di environment variable

2. **Test Valid Requests:**
   - Buka folder **IoT Data API - Valid Requests**
   - Run request sesuai kebutuhan
   - Semua request akan otomatis menggunakan token yang sudah tersimpan

3. **Test Error Scenarios:**
   - Buka folder **IoT Data API - Error Tests**
   - Run request untuk test error handling

### Testing dengan Collection Runner

1. Klik kanan pada collection **TPMS Backend - IoT Data API**
2. Pilih **Run collection**
3. Pilih requests yang ingin di-test
4. Klik **Run**
5. Lihat hasil testing di dashboard

---

## Collection Structure

```
📁 TPMS Backend - IoT Data API
  📁 Auth
    └─ Login (POST) - Login dan auto-save token
  
  📁 IoT Data API - Valid Requests
    ├─ TPDATA - Full Data
    ├─ TPDATA - Temperature Only
    ├─ TPDATA - High Temperature Warning
    ├─ HUBDATA - Full Update
    ├─ HUBDATA - Battery Only
    ├─ STATE - Active
    ├─ STATE - Maintenance
    ├─ LOCK - Lock Device
    ├─ LOCK - Unlock Device
    └─ LOCK - Lock Sensor
  
  📁 IoT Data API - Error Tests
    ├─ Error - Missing CMD
    ├─ Error - Invalid CMD
    ├─ Error - Missing SN
    ├─ Error - Invalid SN (Not Found)
    ├─ Error - Invalid Status
    ├─ Error - Invalid Lock Value
    └─ Error - No Auth Token
```

---

## Features

### Auto Token Management
Request **Login** memiliki test script yang otomatis menyimpan token ke environment variable:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set('token', jsonData.data.token);
    console.log('Token saved:', jsonData.data.token);
}
```

### Environment Variables
Semua request menggunakan variables untuk fleksibilitas:
- `{{base_url}}` - Base URL server
- `{{token}}` - JWT token (auto-filled)
- `{{test_sensor_sn}}` - Sensor serial number
- `{{test_device_sn}}` - Device serial number

---

## Expected Responses

### ✅ Success Responses

**TPDATA (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sensor_sn": "SENSOR001",
    "tempValue": 85.5,
    "tirepValue": 32.5,
    "recorded_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Sensor data recorded successfully"
}
```

**HUBDATA (200):**
```json
{
  "success": true,
  "data": {
    "device_sn": "DEVICE001",
    "bat1": 85,
    "bat2": 90,
    "bat3": 88
  },
  "message": "Device data updated successfully"
}
```

**STATE (200):**
```json
{
  "success": true,
  "data": {
    "device_sn": "DEVICE001",
    "status": "active"
  },
  "message": "Device state updated successfully"
}
```

**LOCK (200):**
```json
{
  "success": true,
  "data": {
    "device_sn": "DEVICE001",
    "lock": 1
  },
  "message": "device lock status updated successfully"
}
```

### ❌ Error Responses

**400 - Bad Request:**
```json
{
  "success": false,
  "message": "Missing required field: cmd"
}
```

**401 - Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**404 - Not Found:**
```json
{
  "success": false,
  "message": "Sensor not found: SENSOR001"
}
```

---

## Troubleshooting

### Token Expired
**Problem:** Response 401 Unauthorized
**Solution:** Run request **Login** lagi untuk mendapatkan token baru

### Sensor/Device Not Found
**Problem:** Response 404 Not Found
**Solution:** Update environment variables dengan serial numbers yang valid dari database

### Server Not Running
**Problem:** Error: connect ECONNREFUSED
**Solution:** Pastikan server backend sudah running (`npm run dev`)

### Invalid Environment
**Problem:** Variables tidak terisi
**Solution:** Pastikan environment **TPMS Backend - Local** sudah dipilih (dropdown pojok kanan atas)

---

## Tips

1. **Save Responses:** Klik **Save Response** untuk dokumentasi
2. **Use Console:** Buka Postman Console (Ctrl+Alt+C) untuk debug
3. **Check Logs:** Lihat server console untuk detailed logs
4. **Verify Database:** Query database untuk verifikasi data tersimpan
5. **Test Sequentially:** Test berurutan untuk hasil terbaik

---

## Additional Resources

- [POSTMAN_IOT_TESTING.md](../docs/POSTMAN_IOT_TESTING.md) - Detailed testing guide
- [IOT_DATA_API.md](../docs/IOT_DATA_API.md) - Complete API documentation
- [IOT_API_QUICK_REF.md](../docs/IOT_API_QUICK_REF.md) - Quick reference

---

## Support

Untuk pertanyaan atau issue:
1. Cek dokumentasi lengkap di folder `docs/`
2. Lihat server logs untuk error details
3. Hubungi tim development
