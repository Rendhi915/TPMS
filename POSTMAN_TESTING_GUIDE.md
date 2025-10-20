# POSTMAN Testing Guide - TPMS Backend API

## 📋 Base Configuration
- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token (untuk endpoint yang memerlukan auth)

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

### 6.1 GET All Vendors

**URL:** `http://localhost:3001/api/vendors`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

---

### 6.2 POST Create New Vendor

**URL:** `http://localhost:3001/api/vendors`

**Method:** POST

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nama_vendor": "PT Mining Solutions Indonesia",
  "address": "Jl. Industri No. 123, Jakarta",
  "nomor_telepon": "021-12345678",
  "email": "info@miningsolutions.com",
  "kontak_person": "John Doe"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "nama_vendor": "PT Mining Solutions Indonesia",
    "address": "Jl. Industri No. 123, Jakarta",
    "nomor_telepon": "021-12345678",
    "email": "info@miningsolutions.com",
    "kontak_person": "John Doe"
  },
  "message": "Vendor created successfully"
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

**Body (raw JSON):**
```json
{
  "nomor_telepon": "021-87654321",
  "email": "contact@miningsolutions.com"
}
```

---

### 6.4 DELETE Vendor

**URL:** `http://localhost:3001/api/vendors/{vendor_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

---

## 👨‍✈️ Step 7: CRUD Drivers (PERLU TOKEN)

### 7.1 GET All Drivers

**URL:** `http://localhost:3001/api/drivers`

**Method:** GET

**Headers:**
```
Authorization: Bearer <your_token>
```

---

### 7.2 POST Create New Driver

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

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 50,
    "name": "Budi Santoso",
    "license_number": "A123456789",
    "status": "aktif"
  },
  "message": "Driver created successfully"
}
```

---

### 7.3 PUT Update Driver

**URL:** `http://localhost:3001/api/drivers/{driver_id}`

**Method:** PUT

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "phone": "081234567899",
  "status": "aktif"
}
```

---

### 7.4 DELETE Driver (Soft Delete)

**URL:** `http://localhost:3001/api/drivers/{driver_id}`

**Method:** DELETE

**Headers:**
```
Authorization: Bearer <your_token>
```

**Note:** Ini adalah soft delete, status driver akan diubah menjadi "nonaktif"

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
- [ ] Verify token received

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
- [ ] POST /api/devices
- [ ] PUT /api/devices/{id}
- [ ] DELETE /api/devices/{id}

### Vendors CRUD (Auth Required)
- [ ] GET /api/vendors
- [ ] POST /api/vendors
- [ ] PUT /api/vendors/{id}
- [ ] DELETE /api/vendors/{id}

### Drivers CRUD (Auth Required)
- [ ] GET /api/drivers
- [ ] POST /api/drivers
- [ ] PUT /api/drivers/{id}
- [ ] DELETE /api/drivers/{id}

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

**Happy Testing!** 🚀
