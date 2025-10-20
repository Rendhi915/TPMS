# POSTMAN Testing Guide - TPMS Backend API

## 📋 Base Configuration
- **Base URL**: `http://localhost:3001/api`
- **Server URL**: `http://connectis.my.id:3001/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token (expires in 24 hours)
- **Last Updated**: 20 Oktober 2025

## 🚨 Recent Updates (20 Oktober 2025)

### ⚠️ BREAKING CHANGES:

1. **Driver DELETE - Now Permanent!**
   - ❌ Removed: Soft delete functionality
   - ❌ Removed: Query parameter `?permanent=true`
   - ✅ Now: Hard delete only - data permanently removed
   - ⚠️ WARNING: Cannot be recovered!

2. **Vendor CRUD - Dual Naming Support**
   - ✅ New: Support both `name` and `nama_vendor`
   - ✅ New: Support both `phone` and `nomor_telepon`
   - ✅ New: Support both `contact_person` and `kontak_person`
   - ✅ All fields except name are now optional

---

## 🔐 Step 1: Login untuk Mendapatkan Token

### POST /api/auth/login

**URL:** `http://localhost:3001/api/auth/login`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4MzI0ODAwLCJleHAiOjE2OTg0MTEyMDB9.abc123...",
    "user": {
      "id": "00000000-0000-0000-0000-000000000001",
      "username": "admin",
      "email": "admin@fleet.com",
      "role": "admin"
    }
  }
}
```

**⚠️ PENTING:** Copy token dari response dan simpan untuk request selanjutnya!

---

## 📤 Step 2: POST Sensor Data (Tidak Perlu Token)

### 2.1 POST Tire Pressure Data

**URL:** `http://localhost:3001/api/sensors/tpdata`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "sn": "987654321",
  "cmd": "tpdata",
  "simNumber": "8986678",
  "data": {
    "tireNo": 1,
    "exType": "1,3",
    "tiprValue": 248.2,
    "tempValue": 38.2,
    "bat": 1
  }
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Tire pressure data received successfully",
  "data": {
    "rawDataId": "uuid-here",
    "deviceSn": "987654321",
    "processingStatus": "queued"
  }
}
```

---

### 2.2 POST Hub Temperature Data

**URL:** `http://localhost:3001/api/sensors/hubdata`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "sn": "987654321",
  "cmd": "hubdata",
  "simNumber": "8986123",
  "dataType": 1,
  "data": {
    "tireNo": 1,
    "exType": "1,3",
    "tempValue": 38.2,
    "bat": 1
  }
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Hub temperature data received successfully",
  "data": {
    "rawDataId": "uuid-here",
    "deviceSn": "987654321",
    "processingStatus": "queued"
  }
}
```

---

### 2.3 POST Device/GPS Status Data

**URL:** `http://localhost:3001/api/sensors/device`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "sn": "3462682374",
  "cmd": "device",
  "data": {
    "lat": 22.59955,
    "lng": 113.86837,
    "bat1": 1,
    "bat2": 2,
    "bat3": 3,
    "lock": 1
  }
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Device status data received successfully",
  "data": {
    "rawDataId": "uuid-here",
    "deviceSn": "3462682374",
    "processingStatus": "queued"
  }
}
```

---

### 2.4 POST Lock State Data

**URL:** `http://localhost:3001/api/sensors/state`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "sn": "3389669898",
  "cmd": "state",
  "data": {
    "is_lock": 1
  }
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Lock state data received successfully",
  "data": {
    "rawDataId": "uuid-here",
    "deviceSn": "3389669898",
    "processingStatus": "queued"
  }
}
```

---

## 📥 Step 3: GET Last Sensor Data (PERLU TOKEN)

### 3.1 GET All Last Data (Default 15 records)

**URL:** `http://localhost:3001/api/sensors/last`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token_from_login>
```

**Expected Response (200 OK):**
```json
{
  "message": "Data retrieved successfully",
  "count": 15,
  "data": [
    {
      "id": 1,
      "sn": "987654321",
      "cmd": "tpdata",
      "createdAt": "2025-10-16T04:00:00.000Z",
      "simNumber": "8986678",
      "tireNo": 1,
      "exType": "1,3",
      "tiprValue": 248.2,
      "tempValue": 38.2,
      "bat": 1
    },
    {
      "id": 2,
      "sn": "987654321",
      "cmd": "hubdata",
      "createdAt": "2025-10-16T04:01:00.000Z",
      "simNumber": "8986123",
      "dataType": 1,
      "tireNo": 1,
      "exType": "1,3",
      "tempValue": 38.2,
      "bat": 1
    },
    {
      "id": 3,
      "sn": "3462682374",
      "cmd": "device",
      "createdAt": "2025-10-16T04:02:00.000Z",
      "lng": 113.86837,
      "lat": 22.59955,
      "bat1": 1,
      "bat2": 2,
      "bat3": 3,
      "lock": 1
    },
    {
      "id": 4,
      "sn": "3389669898",
      "cmd": "state",
      "createdAt": "2025-10-16T04:03:00.000Z",
      "is_lock": 1
    }
  ]
}
```

---

### 3.2 GET with Limit

**URL:** `http://localhost:3001/api/sensors/last?limit=5`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `limit`: 5

---

### 3.3 GET Filter by Command Type

**URL:** `http://localhost:3001/api/sensors/last?cmd_type=tpdata`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `cmd_type`: tpdata (atau hubdata, device, state)

---

### 3.4 GET Filter by Device Serial Number

**URL:** `http://localhost:3001/api/sensors/last?device_sn=987654321`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `device_sn`: 987654321

---

### 3.5 GET with Multiple Filters

**URL:** `http://localhost:3001/api/sensors/last?cmd_type=tpdata&limit=10&device_sn=987654321`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `cmd_type`: tpdata
- `limit`: 10
- `device_sn`: 987654321

---

## 🚛 Step 4: CRUD Trucks (PERLU TOKEN)

### 4.1 GET All Trucks

**URL:** `http://localhost:3001/api/trucks`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters (Optional):**
- `page`: 1
- `limit`: 50
- `status`: active
- `search`: Truck-001

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "trucks": [
      {
        "id": "uuid",
        "name": "Truck-001",
        "code": "T001",
        "model": "Caterpillar 797F",
        "year": 2020,
        "status": "active",
        "vendor": {
          "id": 1,
          "nama_vendor": "PT Mining Solutions"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 100,
      "totalPages": 2
    }
  }
}
```

---

### 4.2 GET Truck by ID

**URL:** `http://localhost:3001/api/trucks/{truck_id}`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

---

### 4.3 POST Create New Truck

**URL:** `http://localhost:3001/api/trucks`

**Method:** POST

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Truck-999",
  "code": "T999",
  "model": "Caterpillar 797F",
  "year": 2024,
  "vin": "1HGBH41JXMN109186",
  "vendor_id": 1,
  "status": "active"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "name": "Truck-999",
    "code": "T999",
    "model": "Caterpillar 797F",
    "year": 2024,
    "status": "active"
  },
  "message": "Truck created successfully"
}
```

---

### 4.4 PUT Update Truck

**URL:** `http://localhost:3001/api/trucks/{truck_id}`

**Method:** PUT

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Truck-999-Updated",
  "status": "maintenance",
  "year": 2025
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Truck-999-Updated",
    "status": "maintenance",
    "year": 2025
  },
  "message": "Truck updated successfully"
}
```

---

### 4.5 DELETE Truck

**URL:** `http://localhost:3001/api/trucks/{truck_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Truck deleted successfully"
}
```

---

## 🔧 Step 5: CRUD Devices (PERLU TOKEN)

### 5.1 GET All Devices

**URL:** `http://localhost:3001/api/devices`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters (Optional):**
- `page`: 1
- `limit`: 50

---

### 5.2 POST Create New Device

> **⚠️ PENTING: Cara Mendapatkan `truck_id` yang Valid**
> 
> **MASALAH UMUM:** Error `"Invalid truck_id: truck not found"` terjadi karena `truck_id` yang Anda gunakan tidak ada di database.
>
> **SOLUSI - Ada 3 Cara:**
>
> **Cara 1: Gunakan Helper Script (PALING MUDAH) ⭐**
> ```bash
> node scripts/get-available-trucks.js
> ```
> Script ini akan menampilkan daftar lengkap truck_id yang valid dan contoh JSON request yang siap pakai!
>
> **Cara 2: Gunakan GET All Trucks API**
> - Request ke: `http://localhost:3001/api/trucks`
> - Dari response, copy field `"id"` (bukan `code` atau `name`)
> - Format ID adalah UUID: `"a3af6242-c293-44bd-84ec-a250097f3e78"`
>
> **Cara 3: Cek Database Langsung**
> ```sql
> SELECT id, name, code, model FROM truck LIMIT 10;
> ```
>
> **Contoh Response GET Trucks:**
> ```json
> {
>   "success": true,
>   "data": {
>     "trucks": [
>       {
>         "id": "a3af6242-c293-44bd-84ec-a250097f3e78",
>         "name": "Truck-001",
>         "code": "T001",
>         "model": "Hino 500",
>         "year": 2022
>       }
>     ]
>   }
> }
> ```
> ⚠️ **PASTIKAN:** Copy field `"id"` (UUID format), BUKAN `"code"` atau `"name"`!

**URL:** `http://localhost:3001/api/devices`

**Method:** POST

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "truck_id": "550e8400-e29b-41d4-a716-446655440000",
  "sn": "DEVICE12345",
  "sim_number": "081234567890"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "device-uuid",
    "truck_id": "550e8400-e29b-41d4-a716-446655440000",
    "sn": "DEVICE12345",
    "sim_number": "081234567890"
  },
  "message": "Device created successfully"
}
```

**Troubleshooting:**
- ❌ **Error "Invalid truck_id"**: Pastikan truck_id yang Anda gunakan benar-benar ada di database (cek dengan GET /api/trucks)
- ❌ **Error "Truck already has a device"**: Truck tersebut sudah memiliki device, pilih truck lain atau gunakan filter `hasDevice=false`
- ❌ **Error "SN already exists"**: Serial number sudah digunakan, gunakan SN yang berbeda

---

### 5.3 PUT Update Device

**URL:** `http://localhost:3001/api/devices/{device_id}`

**Method:** PUT

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "sim_number": "081234567899"
}
```

---

### 5.4 DELETE Device

**URL:** `http://localhost:3001/api/devices/{device_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200 OK) - Hard Delete:**
```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

**Expected Response (200 OK) - Soft Delete:**
```json
{
  "success": true,
  "data": {
    "id": "device-uuid",
    "removed_at": "2025-10-17T04:30:00.000Z"
  },
  "message": "Device deactivated successfully (soft delete due to associated data)"
}
```

**Behavior:**
- 🗑️ **Hard Delete**: Device akan dihapus permanen jika tidak memiliki data sensor, GPS, atau tire pressure
- 🔒 **Soft Delete**: Device hanya di-deactivate (set `removed_at`) jika memiliki data terkait untuk menjaga integritas data historis
- ✅ **Foreign Key Handling**: Relasi `device_truck_assignment` akan dihapus otomatis sebelum delete

**Troubleshooting:**
- ❌ **Error "Foreign key constraint violated"**: Bug sudah diperbaiki! Restart server jika masih terjadi
- ❌ **Error "Device not found"**: Pastikan device_id yang digunakan valid

---

## 🏢 Step 6: CRUD Vendors (PERLU TOKEN)

### ✅ NEW: Dual Naming Support

**⚠️ UPDATE (20 Oktober 2025)**: Endpoint Vendor sekarang mendukung **dual naming convention**!

Frontend bisa menggunakan field name yang berbeda:
- `name` ATAU `nama_vendor`
- `phone` ATAU `nomor_telepon`
- `contact_person` ATAU `kontak_person`

Backend akan menerima **KEDUANYA** dan bahkan bisa **DICAMPUR**! 🎉

---

### 6.1 GET All Vendors

**URL:** `http://localhost:3001/api/vendors`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "vendors": [
      {
        "id": 1,
        "name": "PT Mining Solutions",
        "nama_vendor": "PT Mining Solutions",
        "phone": "021-12345678",
        "nomor_telepon": "021-12345678",
        "email": "info@mining.com",
        "address": "Jakarta",
        "contact_person": "John Doe",
        "kontak_person": "John Doe",
        "created_at": "2025-10-20T07:00:00.000Z",
        "updated_at": "2025-10-20T07:00:00.000Z"
      }
    ]
  }
}
```

**Note:** Response includes **BOTH** naming conventions untuk compatibility dengan frontend.

---

### 6.2 POST Create New Vendor

**URL:** `http://localhost:3001/api/vendors`

**Method:** POST

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**✅ Body Option 1 - Database Naming:**
```json
{
  "nama_vendor": "PT Mining Solutions Indonesia",
  "address": "Jl. Industri No. 123, Jakarta",
  "nomor_telepon": "021-12345678",
  "email": "info@miningsolutions.com",
  "kontak_person": "John Doe"
}
```

**✅ Body Option 2 - Frontend Naming (NEW!):**
```json
{
  "name": "PT Mining Solutions Indonesia",
  "address": "Jl. Industri No. 123, Jakarta",
  "phone": "021-12345678",
  "email": "info@miningsolutions.com",
  "contact_person": "John Doe"
}
```

**✅ Body Option 3 - Mixed (BISA!):**
```json
{
  "name": "PT Mining Solutions Indonesia",
  "nomor_telepon": "021-12345678",
  "contact_person": "John Doe"
}
```

**Required Fields:**
- `name` OR `nama_vendor` (at least one is required)
- All other fields are **OPTIONAL**

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "PT Mining Solutions Indonesia",
    "phone": "021-12345678",
    "contact_person": "John Doe",
    "email": "info@miningsolutions.com",
    "address": "Jl. Industri No. 123, Jakarta",
    "created_at": "2025-10-20T08:30:00.000Z",
    "updated_at": "2025-10-20T08:30:00.000Z"
  },
  "message": "Vendor created successfully"
}
```

**Validation:**
- ✅ Name: 2-255 characters
- ✅ Phone: Max 50 characters (optional)
- ✅ Email: Valid email format (optional)
- ✅ Address: Max 500 characters (optional)
- ✅ Contact person: Max 255 characters (optional)

**Error Responses:**
```json
// Missing required field
{
  "success": false,
  "message": "Missing required field: name or nama_vendor"
}

// Duplicate vendor name
{
  "success": false,
  "message": "Vendor with this name already exists"
}
```

---

### 6.3 PUT Update Vendor

**URL:** `http://localhost:3001/api/vendors/{vendor_id}`

**Method:** PUT

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**✅ Body - Support Dual Naming (All fields optional):**
```json
{
  "name": "PT Mining Solutions Updated",
  "phone": "021-87654321",
  "email": "contact@miningsolutions.com",
  "contact_person": "Jane Smith"
}
```

**Or using database naming:**
```json
{
  "nama_vendor": "PT Mining Solutions Updated",
  "nomor_telepon": "021-87654321",
  "kontak_person": "Jane Smith"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "PT Mining Solutions Updated",
    "phone": "021-87654321",
    "contact_person": "Jane Smith",
    "email": "contact@miningsolutions.com",
    "address": "Jl. Industri No. 123, Jakarta",
    "updated_at": "2025-10-20T09:15:00.000Z"
  },
  "message": "Vendor updated successfully"
}
```

**⚠️ Important:** 
- Check `updated_at` timestamp to verify data actually changed
- Server logs will show detailed update process (check console)

**Debugging:**
Server akan menampilkan log detail:
```
📝 Updating vendor ID: 10
📝 Update data received: { nama_vendor: 'PT Mining Solutions Updated', ... }
📋 Current vendor data: { id: 10, nama_vendor: 'PT Mining Solutions', ... }
🔄 Updating with data: { nama_vendor: 'PT Mining Solutions Updated', updated_at: ... }
✅ Vendor updated successfully
```

---

### 6.4 DELETE Vendor

**URL:** `http://localhost:3001/api/vendors/{vendor_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Vendor deleted successfully"
}
```

---

## 👨‍✈️ Step 7: CRUD Drivers (PERLU TOKEN)

### ⚠️ BREAKING CHANGE: Driver DELETE Now Permanent!

**⚠️ UPDATE (20 Oktober 2025)**: Driver DELETE sekarang **HARD DELETE** - Data dihapus **PERMANEN** dari database!

**Perubahan:**
- ❌ **REMOVED**: Soft delete functionality
- ❌ **REMOVED**: Query parameter `?permanent=true`
- ✅ **NOW**: Direct hard delete - data cannot be recovered!

---

### 7.1 GET All Drivers

**URL:** `http://localhost:3001/api/drivers`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Query Parameters (Optional):**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `status`: Filter by status (`aktif`, `nonaktif`)
- `vendor_id`: Filter by vendor ID

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "drivers": [
      {
        "id": 1,
        "name": "Budi Santoso",
        "phone": "081234567890",
        "email": "budi@example.com",
        "address": "Jakarta",
        "license_number": "A123456789",
        "license_type": "SIM B2 Umum",
        "license_expiry": "2026-12-31T00:00:00.000Z",
        "id_card_number": "3201234567890123",
        "vendor_id": 1,
        "status": "aktif",
        "created_at": "2025-10-20T07:00:00.000Z",
        "updated_at": "2025-10-20T07:00:00.000Z",
        "vendor": {
          "id": 1,
          "nama_vendor": "PT Mining Solutions"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 25,
      "totalPages": 1
    }
  }
}
```

---

### 7.2 GET Driver by ID

**URL:** `http://localhost:3001/api/drivers/{driver_id}`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "license_number": "A123456789",
    "status": "aktif"
  }
}
```

---

### 7.3 POST Create New Driver

**URL:** `http://localhost:3001/api/drivers`

**Method:** POST

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Budi Santoso",
  "license_number": "A123456789",
  "license_type": "SIM B2 Umum",
  "license_expiry": "2026-12-31",
  "id_card_number": "3201234567890123",
  "phone": "081234567890",
  "email": "budi@example.com",
  "address": "Jakarta",
  "vendor_id": 1,
  "status": "aktif"
}
```

**Required Fields:**
- `name` (2-255 characters)
- `license_number` (1-50 characters)
- `license_type` (1-20 characters)
- `license_expiry` (ISO date format: YYYY-MM-DD)
- `id_card_number` (1-50 characters)

**Optional Fields:**
- `phone` (max 50 characters)
- `email` (valid email format)
- `address` (text)
- `vendor_id` (integer)
- `status` (`aktif` or `nonaktif`, default: `aktif`)

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 50,
    "name": "Budi Santoso",
    "license_number": "A123456789",
    "status": "aktif",
    "created_at": "2025-10-20T08:30:00.000Z",
    "updated_at": "2025-10-20T08:30:00.000Z"
  },
  "message": "Driver created successfully"
}
```

---

### 7.4 PUT Update Driver

**URL:** `http://localhost:3001/api/drivers/{driver_id}`

**Method:** PUT

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON) - All fields optional:**
```json
{
  "name": "Budi Santoso Updated",
  "phone": "081234567899",
  "email": "budi.new@example.com",
  "status": "nonaktif"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 50,
    "name": "Budi Santoso Updated",
    "phone": "081234567899",
    "email": "budi.new@example.com",
    "status": "nonaktif",
    "updated_at": "2025-10-20T09:00:00.000Z"
  },
  "message": "Driver updated successfully"
}
```

---

### 7.5 DELETE Driver ⚠️ PERMANENT DELETE

**URL:** `http://localhost:3001/api/drivers/{driver_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

**⚠️ CRITICAL WARNING:**
- This is a **HARD DELETE** - data will be **permanently removed** from database
- **NO UNDO** - deleted data cannot be recovered!
- **NO SOFT DELETE** - driver record will be completely erased
- Make sure to confirm with user before executing this request!

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Driver deleted successfully"
}
```

**Error Response - Driver Not Found (404):**
```json
{
  "success": false,
  "message": "Driver not found"
}
```

**Testing Steps:**
1. ✅ Get list of drivers first: `GET /api/drivers`
2. ✅ Note the driver ID you want to delete
3. ⚠️ **CONFIRM**: This is permanent! Data cannot be recovered
4. 🗑️ Send DELETE request
5. ✅ Verify driver is completely removed: `GET /api/drivers` (should not appear in list)

**Recommended Frontend Implementation:**
```javascript
// Always show confirmation dialog before delete
const deleteDriver = async (driverId) => {
  const confirmed = confirm(
    'PERINGATAN: Data driver akan dihapus PERMANEN dan tidak bisa dikembalikan!\n\n' +
    'Apakah Anda yakin ingin menghapus driver ini?'
  );
  
  if (!confirmed) {
    return;
  }
  
  // Proceed with delete
  const response = await fetch(`http://localhost:3001/api/drivers/${driverId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert('✅ Driver berhasil dihapus permanen');
    // Refresh driver list
  }
};
```

---

## ⚠️ Error Responses

### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Truck name is required",
      "value": ""
    }
  ]
}
```

### 401 Unauthorized - No Token
```json
{
  "success": false,
  "message": "Access denied. No valid token provided."
}
```

### 401 Unauthorized - Token Expired
```json
{
  "success": false,
  "message": "Token has expired. Please login again."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Truck not found"
}
```

### 409 Conflict - Duplicate
```json
{
  "success": false,
  "message": "Vendor with this name already exists"
}
```

### 429 Too Many Requests - Rate Limit
```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to create truck",
  "error": "Internal server error"
}
```

---

## 🎯 Testing Checklist

### Sensor Data (No Auth Required)
- [ ] POST /api/sensors/tpdata
- [ ] POST /api/sensors/hubdata
- [ ] POST /api/sensors/device
- [ ] POST /api/sensors/state

### Authentication
- [ ] POST /api/auth/login
- [ ] Verify token received and saved

### Sensor Data Retrieval (Auth Required)
- [ ] GET /api/sensors/last
- [ ] GET /api/sensors/last?limit=5
- [ ] GET /api/sensors/last?cmd_type=tpdata
- [ ] GET /api/sensors/last?device_sn=987654321

### Trucks CRUD (Auth Required)
- [ ] GET /api/trucks
- [ ] GET /api/trucks/{id}
- [ ] POST /api/trucks
- [ ] PUT /api/trucks/{id}
- [ ] DELETE /api/trucks/{id}

### Devices CRUD (Auth Required)
- [ ] GET /api/devices
- [ ] POST /api/devices (verify truck_id exists)
- [ ] PUT /api/devices/{id}
- [ ] DELETE /api/devices/{id}

### Vendors CRUD (Auth Required) ⭐ UPDATED
- [ ] GET /api/vendors
- [ ] POST /api/vendors (test with `name` field)
- [ ] POST /api/vendors (test with `nama_vendor` field)
- [ ] POST /api/vendors (test with mixed field names)
- [ ] PUT /api/vendors/{id} (verify `updated_at` changes)
- [ ] DELETE /api/vendors/{id}

### Drivers CRUD (Auth Required) ⚠️ UPDATED
- [ ] GET /api/drivers
- [ ] GET /api/drivers?status=aktif
- [ ] GET /api/drivers/{id}
- [ ] POST /api/drivers
- [ ] PUT /api/drivers/{id}
- [ ] DELETE /api/drivers/{id} ⚠️ **WARNING: PERMANENT DELETE!**
- [ ] Verify deleted driver is completely removed from database

### Additional Tests for New Features
- [ ] Vendor: Verify response includes both naming conventions
- [ ] Vendor: Test optional fields (phone, email, address)
- [ ] Vendor: Test duplicate name validation
- [ ] Driver: Confirm delete warning in frontend
- [ ] Driver: Verify no way to recover deleted driver
- [ ] Check server logs for vendor operation details (📝, 📋, 🔄, ✅)

---

## 💡 Tips untuk Testing di Postman

1. **Simpan Token di Environment Variable:**
   - Buat Environment baru di Postman
   - Tambahkan variable `token`
   - Setelah login, simpan token ke variable ini
   - Gunakan `{{token}}` di Authorization header

2. **Gunakan Collection:**
   - Buat Collection untuk semua request
   - Set Authorization di Collection level
   - Semua request akan inherit authorization

3. **Test Scripts:**
   - Tambahkan test script untuk auto-save token:
   ```javascript
   // Di POST /api/auth/login, tab "Tests"
   if (pm.response.code === 200) {
       var jsonData = pm.response.json();
       pm.environment.set("token", jsonData.data.token);
   }
   ```

4. **Pre-request Scripts:**
   - Cek token expiry sebelum request
   - Auto-refresh token jika expired

---

## ✅ Expected Results

Semua endpoint harus:
- ✅ Return proper HTTP status codes
- ✅ Return JSON response dengan struktur yang konsisten
- ✅ Validate input dengan benar
- ✅ Require authentication untuk endpoint yang dilindungi
- ✅ Handle errors dengan graceful error messages

---

## 🧪 Testing Scenarios for Recent Changes

### Scenario 1: Vendor Dual Naming Support

**Test Case 1.1: Create with Frontend Naming**
```json
POST /api/vendors
{
  "name": "Test Vendor A",
  "phone": "081234567890",
  "contact_person": "John Doe"
}

Expected: ✅ Success (201)
Verify: Response includes both naming conventions
```

**Test Case 1.2: Create with Database Naming**
```json
POST /api/vendors
{
  "nama_vendor": "Test Vendor B",
  "nomor_telepon": "081234567890",
  "kontak_person": "Jane Doe"
}

Expected: ✅ Success (201)
Verify: Response includes both naming conventions
```

**Test Case 1.3: Create with Mixed Naming**
```json
POST /api/vendors
{
  "name": "Test Vendor C",
  "nomor_telepon": "081234567890",
  "contact_person": "Bob Smith"
}

Expected: ✅ Success (201)
Verify: Backend accepts mixed field names
```

**Test Case 1.4: Update and Verify Timestamp**
```json
PUT /api/vendors/{id}
{
  "phone": "089999999999"
}

Expected: ✅ Success (200)
Verify: 
- Data actually changed in database
- updated_at timestamp is different from created_at
- Server logs show update process
```

---

### Scenario 2: Driver Hard Delete

**Test Case 2.1: Delete Driver Permanently**
```
1. GET /api/drivers → Note driver count and IDs
2. DELETE /api/drivers/{id}
3. GET /api/drivers → Verify count decreased
4. GET /api/drivers/{id} → Should return 404
5. Check database directly → Driver should not exist

Expected: ✅ Driver completely removed, no trace in database
```

**Test Case 2.2: Delete Non-Existent Driver**
```
DELETE /api/drivers/99999

Expected: ❌ 404 Not Found
Response: { "success": false, "message": "Driver not found" }
```

**Test Case 2.3: Verify No Soft Delete**
```
After DELETE /api/drivers/{id}:
- Driver should NOT have status = 'nonaktif'
- Driver should NOT exist in database at all
- No 'deleted_at' or 'removed_at' timestamp

Expected: ✅ Record completely removed
```

---

### Scenario 3: Vendor Optional Fields

**Test Case 3.1: Minimal Required Fields**
```json
POST /api/vendors
{
  "name": "Minimal Vendor"
}

Expected: ✅ Success (201)
Verify: All other fields are null/empty
```

**Test Case 3.2: Missing Required Field**
```json
POST /api/vendors
{
  "phone": "081234567890"
}

Expected: ❌ 400 Bad Request
Response: { "message": "Missing required field: name or nama_vendor" }
```

---

### Scenario 4: Server Logging Verification

**Test Case 4.1: Check Vendor Create Logs**
```
1. POST /api/vendors with data
2. Check server console for:
   📝 Creating vendor with data: { ... }
   ✅ Vendor created successfully: {id}

Expected: ✅ Detailed logs visible in console
```

**Test Case 4.2: Check Vendor Update Logs**
```
1. PUT /api/vendors/{id} with data
2. Check server console for:
   📝 Updating vendor ID: {id}
   📝 Update data received: { ... }
   📋 Current vendor data: { ... }
   🔄 Updating with data: { ... }
   ✅ Vendor updated successfully

Expected: ✅ Complete update flow logged
```

---

**Happy Testing!** 🚀
