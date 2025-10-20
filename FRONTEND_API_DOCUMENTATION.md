# Fleet Management Backend - Frontend API Documentation
**Update Terakhir**: 20 Oktober 2025 - 15:00 WIB

---

## 🚀 Server Information

- **Base URL**: `http://connectis.my.id:3001/api`
- **WebSocket URL**: `ws://connectis.my.id:3001/ws`
- **Environment**: Development
- **Database**: PostgreSQL 14.19 at connectis.my.id:5432
- **Status**: ✅ All endpoints tested and verified, fully operational

---

## 📑 Table of Contents

1. [🔐 Authentication](#-authentication)
2. [🚨 Recent Changes](#-recent-changes)
3. [👨‍💼 Driver Management](#-driver-management)
4. [🏢 Vendor Management](#-vendor-management)
5. [🐛 Debugging & Troubleshooting](#-debugging--troubleshooting)
6. [📝 Quick Reference](#-quick-reference)

---

## 🔐 Authentication

### Login
**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "b56a47c9-a54c-439a-bcae-20b4d102881a",
      "username": "admin",
      "email": "admin@fleet.com",
      "role": "admin"
    }
  },
  "message": "Login successful"
}
```

**Usage in Frontend**:
```javascript
// Store token in localStorage
const token = response.data.data.token;
localStorage.setItem('authToken', token);

// Use in subsequent requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

**⚠️ Important**: JWT token expires in 24 hours. Store securely and include in all API requests.

---

## 🚨 Recent Changes

### ⚠️ BREAKING CHANGE: Driver Delete - Now Permanent!

**Tanggal**: 20 Oktober 2025

**Perubahan**:
- ❌ **REMOVED**: Soft delete functionality
- ❌ **REMOVED**: Query parameter `?permanent=true`
- ✅ **NOW**: Hard delete only - data permanently removed from database
- ⚠️ **WARNING**: Deleted data cannot be recovered!

**Sebelumnya**:
```javascript
// Old: Soft delete dengan query param
DELETE /api/drivers/:id?permanent=true
```

**Sekarang**:
```javascript
// New: Hard delete langsung
DELETE /api/drivers/:id
// Data HILANG PERMANEN!
```

### ✅ Vendor Management - Dual Naming Support

**Tanggal**: 20 Oktober 2025

**Perubahan**:
- ✅ Support dual field names: `name` OR `nama_vendor`
- ✅ Support dual field names: `phone` OR `nomor_telepon`
- ✅ Support dual field names: `contact_person` OR `kontak_person`
- ✅ All fields except name are now optional
- ✅ Detailed logging for debugging

---

## 👨‍💼 Driver Management

### Authentication Required
All endpoints require JWT token in header:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

### 1. Get All Drivers
**Endpoint**: `GET /api/drivers`

**Query Parameters**:
- `page` (optional): Nomor halaman, default: 1
- `limit` (optional): Item per halaman, default: 50
- `status` (optional): Filter status (`aktif`, `nonaktif`)
- `vendor_id` (optional): Filter by vendor ID

**Response**:
```json
{
  "success": true,
  "data": {
    "drivers": [
      {
        "id": 1,
        "name": "Ahmad Supardi",
        "phone": "08123456789",
        "email": "ahmad@email.com",
        "license_number": "SIM123456",
        "license_type": "SIM B2",
        "license_expiry": "2025-12-31T00:00:00.000Z",
        "status": "aktif",
        "vendor": {
          "id": 1,
          "nama_vendor": "PT Vendor Satu"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 10,
      "totalPages": 1
    }
  }
}
```

---

### 2. Get Driver by ID
**Endpoint**: `GET /api/drivers/:driverId`

**Response**: Same as single driver object above

---

### 3. Create Driver
**Endpoint**: `POST /api/drivers`

**Request Body**:
```json
{
  "name": "Driver Name",
  "phone": "08123456789",
  "email": "driver@email.com",
  "address": "Driver Address",
  "license_number": "SIM123456",
  "license_type": "SIM B2",
  "license_expiry": "2025-12-31",
  "id_card_number": "1234567890123456",
  "vendor_id": 1,
  "status": "aktif"
}
```

**Required Fields**:
- `name`
- `license_number`
- `license_type`
- `license_expiry`
- `id_card_number`

---

### 4. Update Driver
**Endpoint**: `PUT /api/drivers/:driverId`

**Request Body** (All fields optional):
```json
{
  "name": "Updated Name",
  "phone": "08999999999",
  "email": "newemail@example.com",
  "status": "nonaktif"
}
```

---

### 5. Delete Driver ⚠️ PERMANENT DELETE
**Endpoint**: `DELETE /api/drivers/:driverId`

**⚠️ PENTING**: 
- Data akan **dihapus permanen** dari database
- **TIDAK BISA** dikembalikan setelah dihapus
- Pastikan konfirmasi user sebelum delete!

**Response Success**:
```json
{
  "success": true,
  "message": "Driver deleted successfully"
}
```

**Response Error**:
```json
{
  "success": false,
  "message": "Driver not found"
}
```

**Contoh Kode Frontend**:
```javascript
const deleteDriver = async (driverId) => {
  // WAJIB: Konfirmasi user dulu
  if (!confirm('Apakah Anda yakin ingin menghapus driver ini? Data tidak bisa dikembalikan!')) {
    return;
  }
  
  try {
    const response = await fetch(`http://connectis.my.id:3001/api/drivers/${driverId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('✅ Driver berhasil dihapus');
      // Refresh driver list
      window.location.reload(); // atau fetchDrivers()
    } else {
      alert('❌ Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Terjadi kesalahan saat menghapus driver');
  }
};
```

---

## 🏢 Vendor Management API

### 1. Get All Vendors
**Endpoint**: `GET /api/vendors`

**Response**:
```json
{
  "success": true,
  "data": {
    "vendors": [
      {
        "id": 1,
        "name": "PT Vendor Satu",
        "nama_vendor": "PT Vendor Satu",
        "phone": "021-12345678",
        "nomor_telepon": "021-12345678",
        "email": "vendor@example.com",
        "address": "Jakarta",
        "contact_person": "John Doe",
        "kontak_person": "John Doe"
      }
    ]
  }
}
```

---

### 2. Create Vendor
**Endpoint**: `POST /api/vendors`

**✅ Support Dual Field Names**: Frontend bisa pakai field name yang berbeda!

**Request Body (Option 1 - Frontend naming)**:
```json
{
  "name": "PT Vendor Baru",
  "phone": "081234567890",
  "contact_person": "John Doe",
  "email": "vendor@example.com",
  "address": "Jl. Contoh No. 123"
}
```

**Request Body (Option 2 - Database naming)**:
```json
{
  "nama_vendor": "PT Vendor Baru",
  "nomor_telepon": "081234567890",
  "kontak_person": "John Doe",
  "email": "vendor@example.com",
  "address": "Jl. Contoh No. 123"
}
```

**✅ BISA CAMPUR!** Backend akan menerima keduanya:
```json
{
  "name": "PT Vendor Baru",
  "nomor_telepon": "081234567890",
  "contact_person": "John Doe"
}
```

**Field Mapping**:
| Frontend Field | Database Field | Required | Type |
|---------------|----------------|----------|------|
| `name` | `nama_vendor` | ✅ Yes | String |
| `phone` | `nomor_telepon` | ❌ Optional | String |
| `contact_person` | `kontak_person` | ❌ Optional | String |
| `email` | `email` | ❌ Optional | String |
| `address` | `address` | ❌ Optional | String |

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "PT Vendor Baru",
    "phone": "081234567890",
    "contact_person": "John Doe",
    "email": "vendor@example.com",
    "address": "Jl. Contoh No. 123",
    "created_at": "2025-10-20T07:45:00.000Z",
    "updated_at": "2025-10-20T07:45:00.000Z"
  },
  "message": "Vendor created successfully"
}
```

**Contoh Kode Frontend**:
```javascript
const createVendor = async (vendorData) => {
  try {
    const response = await fetch('http://connectis.my.id:3001/api/vendors', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: vendorData.name,           // Bisa pakai 'name' atau 'nama_vendor'
        phone: vendorData.phone,         // Bisa pakai 'phone' atau 'nomor_telepon'
        contact_person: vendorData.contactPerson, // Bisa pakai 'contact_person' atau 'kontak_person'
        email: vendorData.email,
        address: vendorData.address
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Vendor created:', result.data);
      return result.data;
    } else {
      console.error('❌ Error:', result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('❌ Error creating vendor:', error);
    throw error;
  }
};
```

---

### 3. Update Vendor
**Endpoint**: `PUT /api/vendors/:vendorId`

**✅ Support Dual Field Names** (sama seperti create)

**Request Body** (All fields optional):
```json
{
  "name": "PT Vendor Updated",
  "phone": "089876543210",
  "contact_person": "Jane Doe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "PT Vendor Updated",
    "phone": "089876543210",
    "contact_person": "Jane Doe",
    "email": "vendor@example.com",
    "address": "Jl. Contoh No. 123",
    "updated_at": "2025-10-20T07:50:00.000Z"
  },
  "message": "Vendor updated successfully"
}
```

**Contoh Kode Frontend**:
```javascript
const updateVendor = async (vendorId, updatedData) => {
  try {
    const response = await fetch(`http://connectis.my.id:3001/api/vendors/${vendorId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Vendor updated:', result.data);
      
      // PENTING: Cek updated_at untuk memastikan data berubah
      console.log('Updated at:', result.data.updated_at);
      
      return result.data;
    } else {
      console.error('❌ Error:', result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('❌ Error updating vendor:', error);
    throw error;
  }
};
```

---

### 4. Delete Vendor
**Endpoint**: `DELETE /api/vendors/:vendorId`

**Response**:
```json
{
  "success": true,
  "message": "Vendor deleted successfully"
}
```

---

## 🐛 Debugging & Troubleshooting

### Check Server Logs

Backend sekarang menampilkan log detail untuk semua operasi vendor:

```
📝 Creating vendor with data: { nama_vendor: 'PT Test', ... }
✅ Vendor created successfully: 123

📝 Updating vendor ID: 123
📝 Update data received: { nama_vendor: 'PT Updated', ... }
📋 Current vendor data: { id: 123, nama_vendor: 'PT Test', ... }
🔄 Updating with data: { nama_vendor: 'PT Updated', updated_at: ... }
✅ Vendor updated successfully
```

### Common Issues

#### 1. Vendor Update Tidak Berubah
**Solusi**: 
- Cek server logs untuk melihat data yang diterima
- Pastikan field name yang digunakan benar (name/nama_vendor)
- Verify `updated_at` timestamp berubah di response

#### 2. Validation Failed
**Solusi**:
- Pastikan minimal ada field `name` atau `nama_vendor`
- Semua field lain bersifat optional
- Cek format data yang dikirim (JSON valid)

#### 3. Driver Deleted But Still Showing
**Solusi**:
- Sekarang sudah HARD DELETE - data benar-benar terhapus
- Refresh halaman atau re-fetch data setelah delete
- Cek response success = true

---

## 📝 Quick Reference

### Driver Endpoints
```
GET    /api/drivers              - List all drivers
GET    /api/drivers/:id          - Get driver detail
POST   /api/drivers              - Create driver
PUT    /api/drivers/:id          - Update driver
DELETE /api/drivers/:id          - Delete driver (PERMANENT!)
```

### Vendor Endpoints
```
GET    /api/vendors              - List all vendors
GET    /api/vendors/:id          - Get vendor detail
POST   /api/vendors              - Create vendor
PUT    /api/vendors/:id          - Update vendor
DELETE /api/vendors/:id          - Delete vendor
```

---

## ✅ Testing Checklist

### Driver Delete
- [ ] Konfirmasi dialog muncul sebelum delete
- [ ] Data benar-benar hilang dari database
- [ ] List driver auto-refresh setelah delete
- [ ] Error handling jika driver not found

### Vendor Create
- [ ] Bisa create dengan field name `name`
- [ ] Bisa create dengan field name `nama_vendor`
- [ ] Bisa create dengan mix field names
- [ ] Optional fields bekerja (phone, email, address)
- [ ] Response includes both naming conventions

### Vendor Update
- [ ] Update dengan field name `name` berhasil
- [ ] Update dengan field name `nama_vendor` berhasil
- [ ] `updated_at` timestamp berubah
- [ ] Data benar-benar berubah di database
- [ ] List vendor auto-refresh setelah update

---

## 🚀 Ready to Use!

Semua endpoint sudah tested dan verified. Happy coding! 🎉
