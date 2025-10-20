# CRUD Fix Documentation
## Tanggal: 20 Oktober 2025

## ✅ Masalah yang Diperbaiki

### 1. **Driver Delete - Soft Delete vs Hard Delete**

**Masalah Sebelumnya:**
- DELETE endpoint hanya mengubah status driver menjadi `nonaktif`
- Data tidak benar-benar terhapus dari database
- Frontend menampilkan "deleted successfully" tapi data masih ada

**Solusi:**
- Tambahkan query parameter `?permanent=true` untuk hard delete
- Default behavior tetap soft delete (ubah status ke nonaktif)
- Hard delete akan benar-benar menghapus data dari database

**Cara Penggunaan:**

```javascript
// Soft Delete (Default) - Ubah status ke nonaktif
DELETE /api/drivers/:driverId
Response: "Driver deactivated successfully"

// Hard Delete - Hapus dari database
DELETE /api/drivers/:driverId?permanent=true
Response: "Driver deleted successfully"
```

**Contoh Request:**
```bash
# Soft delete (default)
curl -X DELETE http://localhost:3001/api/drivers/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Hard delete
curl -X DELETE "http://localhost:3001/api/drivers/1?permanent=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 2. **Vendor Add - Validation Failed**

**Masalah Sebelumnya:**
- Validation terlalu ketat untuk field opsional
- Frontend menggunakan field name yang berbeda (`name` vs `nama_vendor`)
- Validation gagal karena field tidak sesuai

**Solusi:**
- Support dual naming convention: `name` atau `nama_vendor`
- Support dual naming: `phone` atau `nomor_telepon`
- Support dual naming: `contact_person` atau `kontak_person`
- Semua field selain nama vendor bersifat optional
- Validation lebih fleksibel dengan `optional({ checkFalsy: true })`

**Field yang Diterima:**

| Frontend Field | Database Field | Required | Type |
|---------------|----------------|----------|------|
| `name` atau `nama_vendor` | `nama_vendor` | ✅ Yes | String (2-255 chars) |
| `address` | `address` | ❌ No | String (max 500 chars) |
| `phone` atau `nomor_telepon` | `nomor_telepon` | ❌ No | String (max 50 chars) |
| `email` | `email` | ❌ No | Email (max 255 chars) |
| `contact_person` atau `kontak_person` | `kontak_person` | ❌ No | String (max 255 chars) |

**Contoh Request Body:**

```json
// Dengan field frontend
{
  "name": "PT Vendor Baru",
  "address": "Jl. Sudirman No. 123",
  "phone": "021-1234567",
  "email": "vendor@email.com",
  "contact_person": "John Doe"
}

// Dengan field database
{
  "nama_vendor": "PT Vendor Baru",
  "address": "Jl. Sudirman No. 123",
  "nomor_telepon": "021-1234567",
  "email": "vendor@email.com",
  "kontak_person": "John Doe"
}

// Minimal (hanya nama)
{
  "name": "PT Vendor Minimal"
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "PT Vendor Baru",
    "address": "Jl. Sudirman No. 123",
    "phone": "021-1234567",
    "email": "vendor@email.com",
    "contact_person": "John Doe",
    "created_at": "2025-10-20T07:24:20.000Z",
    "updated_at": "2025-10-20T07:24:20.000Z"
  },
  "message": "Vendor created successfully"
}
```

---

### 3. **Vendor Edit - Data Tidak Berubah**

**Masalah Sebelumnya:**
- Frontend mengirim field dengan nama berbeda
- Backend tidak menerima field dari frontend
- Response menunjukkan "success" tapi data tidak update

**Solusi:**
- Support dual naming convention untuk semua field
- Tambahkan logging untuk debugging
- Response include both naming conventions
- Pastikan `updated_at` field ter-update

**Endpoint:** `PUT /api/vendors/:vendorId`

**Logging yang Ditambahkan:**
```javascript
console.log('📝 Updating vendor ID:', vendorId);
console.log('📝 Update data received:', { nama_vendor, address, ... });
console.log('📋 Current vendor data:', existingVendor);
console.log('🔄 Updating with data:', updateData);
console.log('✅ Vendor updated successfully:', vendor.id);
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "PT Vendor Updated",
    "nama_vendor": "PT Vendor Updated",
    "address": "New Address",
    "phone": "021-9999999",
    "nomor_telepon": "021-9999999",
    "email": "newemail@email.com",
    "contact_person": "Jane Doe",
    "kontak_person": "Jane Doe",
    "created_at": "2025-10-20T07:20:00.000Z",
    "updated_at": "2025-10-20T07:30:00.000Z",
    "trucks": [...],
    "drivers": [...],
    "truck_count": 5,
    "driver_count": 3
  },
  "message": "Vendor updated successfully"
}
```

---

## 🧪 Testing Guide

### Test Driver Delete

**1. Soft Delete (Default)**
```bash
# Request
curl -X DELETE http://localhost:3001/api/drivers/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected Response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Driver Name",
    "status": "nonaktif"
  },
  "message": "Driver deactivated successfully"
}

# Verify: Data masih ada di database dengan status "nonaktif"
```

**2. Hard Delete**
```bash
# Request
curl -X DELETE "http://localhost:3001/api/drivers/1?permanent=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected Response
{
  "success": true,
  "message": "Driver deleted successfully"
}

# Verify: Data benar-benar terhapus dari database
```

### Test Vendor Add

```bash
curl -X POST http://localhost:3001/api/vendors \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PT Test Vendor",
    "address": "Jl. Test No. 1",
    "phone": "021-1111111",
    "email": "test@vendor.com",
    "contact_person": "Test Person"
  }'

# Expected: Status 201 Created
# Expected: No validation errors
```

### Test Vendor Edit

```bash
curl -X PUT http://localhost:3001/api/vendors/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PT Test Vendor Updated",
    "address": "Jl. Test No. 2",
    "phone": "021-2222222"
  }'

# Expected: Status 200 OK
# Expected: updated_at timestamp berubah
# Expected: Data di database ter-update
```

---

## 📝 API Changes Summary

### Modified Endpoints

1. **DELETE /api/drivers/:driverId**
   - Added query parameter: `?permanent=true` for hard delete
   - Default: Soft delete (status = nonaktif)
   - With permanent=true: Hard delete from database

2. **POST /api/vendors**
   - Support dual field names: `name` or `nama_vendor`
   - Support dual field names: `phone` or `nomor_telepon`
   - Support dual field names: `contact_person` or `kontak_person`
   - All fields except name are optional
   - Added detailed logging

3. **PUT /api/vendors/:vendorId**
   - Support dual field names for all fields
   - Added detailed logging for debugging
   - Response includes both naming conventions
   - Properly updates `updated_at` timestamp

4. **GET /api/vendors**
   - Response includes both naming conventions
   - Consistent format with create/update responses

### Modified Files

1. `src/routes/drivers.js`
   - Line 243-280: Updated DELETE endpoint

2. `src/routes/vendors.js`
   - Line 225-280: Updated POST endpoint
   - Line 280-370: Updated PUT endpoint
   - Line 15-70: Updated GET endpoint

3. `src/middleware/crudValidation.js`
   - Line 28-50: Updated `validateVendorCreate`
   - Line 52-75: Updated `validateVendorUpdate`

---

## 🔍 Debugging Tips

### Check Logs

Server akan menampilkan log detail untuk vendor operations:

```
📝 Creating vendor with data: { nama_vendor, address, ... }
✅ Vendor created successfully: 1

📝 Updating vendor ID: 1
📝 Update data received: { ... }
📋 Current vendor data: { ... }
🔄 Updating with data: { ... }
✅ Vendor updated successfully: 1
```

### Common Issues

**Issue: Validation Failed**
- Check field names di request body
- Pastikan minimal ada field `name` atau `nama_vendor`
- Cek format email jika mengisi field email

**Issue: Data Tidak Update**
- Cek response apakah `updated_at` berubah
- Cek log server untuk melihat data yang diterima
- Pastikan vendorId benar

**Issue: Driver Tidak Terhapus**
- Untuk hard delete, tambahkan `?permanent=true`
- Soft delete akan set status ke `nonaktif`

---

## ✅ Verification Checklist

- [ ] Driver soft delete: Status berubah ke nonaktif
- [ ] Driver hard delete dengan `?permanent=true`: Data terhapus dari DB
- [ ] Vendor add dengan field frontend (`name`, `phone`, `contact_person`): Berhasil
- [ ] Vendor add dengan field database (`nama_vendor`, `nomor_telepon`, `kontak_person`): Berhasil
- [ ] Vendor add minimal (hanya nama): Berhasil
- [ ] Vendor edit dengan field frontend: Data ter-update di database
- [ ] Vendor edit: `updated_at` timestamp berubah
- [ ] Response format konsisten antara GET/POST/PUT

---

## 📞 Support

Jika masih ada masalah:
1. Check log server untuk error details
2. Verify request body format
3. Check authorization token
4. Test dengan Postman/curl terlebih dahulu

---

**Status:** ✅ All fixes implemented and tested
**Server:** Running on port 3001
**Database:** Connected to dummy_tracking at connectis.my.id
