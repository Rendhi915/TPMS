# 🔧 Fix: History Tracking Data Filter

**Tanggal:** 2 Januari 2026  
**Status:** ✅ **FIXED**

---

## 📋 Masalah

Data baru masih tampil di history lama yang seharusnya tidak tampil. Ketika frontend request history untuk truck tertentu, backend mengembalikan data dari semua truck karena filter `truck_id` tidak bekerja dengan baik.

### Root Cause

1. **Backend tidak memvalidasi `truckId`**: Jika `truckId` adalah `null`, `undefined`, atau tidak valid, query Prisma tidak menambahkan filter `truck_id`, sehingga mengembalikan semua data dari semua truck.

2. **Tidak ada validasi wajib**: Service `getHistoryWithSensors` dan `getHistoryStats` tidak memvalidasi bahwa `truckId` atau `truckPlate` harus ada.

---

## ✅ Solusi yang Diterapkan

### 1. Tambah Validasi Wajib di `sensorHistoryService.js`

**File**: `TPMS/src/services/sensorHistoryService.js`

#### Perubahan di `getHistoryWithSensors`:
```javascript
// IMPORTANT: Always require truck_id OR truck_plate filter to prevent returning all data
// This ensures we only get data for the specific truck requested
if (!truckId && !truckPlate) {
  console.error('❌ ERROR: truck_id or truck_plate must be provided');
  throw new Error('truck_id or truck_plate is required for history query');
}

// Query by truck_id (works for both active and deleted trucks via snapshot)
if (truckId) {
  where.truck_id = parseInt(truckId); // Ensure it's an integer
}
```

**Manfaat:**
- ✅ Mencegah query tanpa filter yang mengembalikan semua data
- ✅ Memastikan `truckId` selalu integer (bukan string)
- ✅ Error message yang jelas untuk debugging

#### Perubahan di `getHistoryStats`:
```javascript
// IMPORTANT: Always require truck_id to prevent returning all data
if (!truckId) {
  console.error('❌ ERROR: truck_id must be provided for stats query');
  throw new Error('truck_id is required for stats query');
}

const where = { truck_id: parseInt(truckId) }; // Ensure it's an integer
```

**Manfaat:**
- ✅ Konsistensi validasi dengan `getHistoryWithSensors`
- ✅ Memastikan statistik hanya untuk truck yang diminta

### 2. Tambah Logging Detail

```javascript
console.log('🔍 Query sensor_history with:', { 
  truckId, 
  truckPlate, 
  startDate, 
  endDate, 
  limit, 
  whereClause: JSON.stringify(where) 
});
```

**Manfaat:**
- ✅ Debugging lebih mudah dengan melihat filter yang digunakan
- ✅ Dapat trace query yang bermasalah

---

## 🧪 Testing

### Test 1: Query dengan `truckId` Valid
```bash
# Endpoint: GET /api/history/trucks/1?limit=10
# Expected: Return data untuk truck_id = 1 saja
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/history/trucks/1?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Result:**
```json
{
  "success": true,
  "truck_id": 1,
  "count": 10,
  "data": [
    {
      "location_id": 123,
      "timestamp": "2026-01-02T10:00:00.000Z",
      "truck_info": {
        "truck_id": 1,
        "truck_plate": "B 9001 SIM"
      }
    }
  ]
}
```

### Test 2: Query tanpa `truckId` (Should Fail)
```bash
# Jika frontend accidentally tidak mengirim truckId
# Expected: Error 500 dengan message yang jelas
```

**Expected Error:**
```json
{
  "success": false,
  "message": "truck_id or truck_plate is required for history query"
}
```

### Test 3: Query dengan Date Range
```bash
curl -X GET "http://localhost:3000/api/history/trucks/1?start_date=2026-01-01T00:00:00Z&end_date=2026-01-02T23:59:59Z" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected:**
- ✅ Hanya data dalam range tanggal tersebut
- ✅ Hanya data untuk truck_id = 1

---

## 📊 Dampak Perubahan

### Sebelum Fix:
- ❌ Query tanpa `truckId` mengembalikan semua data
- ❌ Data truck lain muncul di history
- ❌ Performance issue karena load semua data
- ❌ Frontend harus filter manual

### Setelah Fix:
- ✅ Query tanpa `truckId` langsung error (fail-fast)
- ✅ Hanya data truck yang diminta yang dikembalikan
- ✅ Performance lebih baik (query lebih spesifik)
- ✅ Backend bertanggung jawab untuk filter yang benar

---

## 🔍 Monitoring

### Log yang Harus Diperhatikan:

1. **Success Log:**
```
🔍 Query sensor_history with: {
  truckId: 1,
  startDate: '2026-01-01T00:00:00.000Z',
  endDate: '2026-01-02T23:59:59.000Z',
  limit: 100,
  whereClause: '{"truck_id":1,"recorded_at":{"gte":"2026-01-01T00:00:00.000Z","lte":"2026-01-02T23:59:59.000Z"}}'
}
✅ Found 50 sensor history records for truck 1
```

2. **Error Log (Expected):**
```
❌ ERROR: truck_id or truck_plate must be provided
Error fetching timeline: truck_id or truck_plate is required for history query
```

---

## 🎯 Checklist Verification

Setelah deploy, pastikan:

- [ ] History API hanya mengembalikan data untuk truck yang diminta
- [ ] Tidak ada data truck lain yang muncul
- [ ] Error handling bekerja dengan baik
- [ ] Frontend tidak perlu filter manual lagi
- [ ] Performance query meningkat
- [ ] Log menunjukkan filter yang benar

---

## 📝 Catatan Tambahan

### File yang Diubah:
1. `TPMS/src/services/sensorHistoryService.js`
   - Function: `getHistoryWithSensors`
   - Function: `getHistoryStats`

### File yang Sudah Benar (Tidak Diubah):
1. `TPMS/src/routes/history.js` - Sudah ada validasi `isNaN(truckId)`
2. `TPMS/src/controllers/truckController.js` - Sudah ada validasi yang baik

### Backward Compatibility:
✅ **100% Compatible** - Perubahan hanya menambah validasi, tidak mengubah API response format

---

## 🚀 Cara Deploy

1. **Restart Backend Server:**
```bash
cd TPMS
npm run dev
# atau
pm2 restart tpms-api
```

2. **Test Endpoint:**
```bash
# Test dengan truck yang valid
curl http://localhost:3000/api/history/trucks/1?limit=5

# Test dengan truck yang tidak ada (should return empty array)
curl http://localhost:3000/api/history/trucks/99999?limit=5
```

3. **Monitor Log:**
```bash
# Lihat log real-time
pm2 logs tpms-api
# atau
tail -f TPMS/log/app.log
```

---

## ✅ Kesimpulan

Masalah **data baru tampil di history lama** sudah diperbaiki dengan:
1. ✅ Validasi wajib `truckId` atau `truckPlate`
2. ✅ Konversi `truckId` ke integer untuk memastikan tipe data benar
3. ✅ Error handling yang jelas
4. ✅ Logging detail untuk debugging

**Status:** Ready for testing and deployment! 🎉
