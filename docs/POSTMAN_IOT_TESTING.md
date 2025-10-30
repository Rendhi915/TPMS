# Postman Testing Guide - IoT Data API

## Setup Postman

### 1. Base Configuration
- **Method:** POST
- **URL:** `http://localhost:5009/api/iot/data`
- **Port:** 5009 (sesuaikan dengan port server Anda)

### 2. Headers (untuk semua request)
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

---

## Langkah-langkah Testing

### Step 1: Login untuk Mendapatkan Token

**Request:**
```
POST http://localhost:5009/api/auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "admin@tpms.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "email": "admin@tpms.com",
      "name": "Admin"
    }
  }
}
```

**Copy token dari response** dan gunakan untuk semua request berikutnya.

---

## Test Cases

### TEST 1: TPDATA - Temperature & Pressure Data

**Purpose:** Mengirim data suhu dan tekanan ban dari sensor

**Request:**
```
POST http://localhost:5009/api/iot/data
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "cmd": "tpdata",
  "sn": "SENSOR001",
  "tempValue": 85.5,
  "tirepValue": 32.5,
  "exType": "normal",
  "bat": 85
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "sensor_sn": "SENSOR001",
    "sensor_id": "sensor-uuid",
    "truck_id": "truck-uuid",
    "tempValue": 85.5,
    "tirepValue": 32.5,
    "exType": "normal",
    "bat": 85,
    "recorded_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Sensor data recorded successfully"
}
```

**Variations to Test:**
```json
// Minimal - only temperature
{
  "cmd": "tpdata",
  "sn": "SENSOR001",
  "tempValue": 88.0
}

// Only pressure
{
  "cmd": "tpdata",
  "sn": "SENSOR001",
  "tirepValue": 35.0
}

// High temperature warning
{
  "cmd": "tpdata",
  "sn": "SENSOR001",
  "tempValue": 95.0,
  "tirepValue": 33.0,
  "exType": "high_temp"
}
```

---

### TEST 2: HUBDATA - Hub/Device Battery Update

**Purpose:** Update battery level device

**Body (raw JSON):**
```json
{
  "cmd": "hubdata",
  "sn": "DEVICE001",
  "bat1": 85,
  "bat2": 90,
  "bat3": 88,
  "sim_number": "081234567890"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "device_id": "device-uuid",
    "device_sn": "DEVICE001",
    "truck_id": "truck-uuid",
    "truck_plate": "B1234XYZ",
    "bat1": 85,
    "bat2": 90,
    "bat3": 88,
    "sim_number": "081234567890",
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Device data updated successfully"
}
```

**Variations to Test:**
```json
// Update only bat1
{
  "cmd": "hubdata",
  "sn": "DEVICE001",
  "bat1": 80
}

// Update all batteries
{
  "cmd": "hubdata",
  "sn": "DEVICE001",
  "bat1": 75,
  "bat2": 80,
  "bat3": 78
}

// Update SIM number only
{
  "cmd": "hubdata",
  "sn": "DEVICE001",
  "sim_number": "089876543210"
}
```

---

### TEST 3: STATE - Device Status Update

**Purpose:** Update status device (active, inactive, maintenance)

**Body (raw JSON):**
```json
{
  "cmd": "state",
  "sn": "DEVICE001",
  "status": "active"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "device_id": "device-uuid",
    "device_sn": "DEVICE001",
    "status": "active",
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Device state updated successfully"
}
```

**Test Different Status:**
```json
// Active
{
  "cmd": "state",
  "sn": "DEVICE001",
  "status": "active"
}

// Inactive
{
  "cmd": "state",
  "sn": "DEVICE001",
  "status": "inactive"
}

// Maintenance
{
  "cmd": "state",
  "sn": "DEVICE001",
  "status": "maintenance"
}
```

---

### TEST 4: LOCK - Lock/Unlock Status

**Purpose:** Update lock status device atau sensor

**Body (raw JSON):**
```json
{
  "cmd": "lock",
  "sn": "DEVICE001",
  "lock": 1,
  "type": "device"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "device",
    "device_id": "device-uuid",
    "device_sn": "DEVICE001",
    "lock": 1,
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "device lock status updated successfully"
}
```

**Test Scenarios:**
```json
// Lock device (explicit type)
{
  "cmd": "lock",
  "sn": "DEVICE001",
  "lock": 1,
  "type": "device"
}

// Unlock device
{
  "cmd": "lock",
  "sn": "DEVICE001",
  "lock": 0,
  "type": "device"
}

// Lock sensor
{
  "cmd": "lock",
  "sn": "SENSOR001",
  "lock": 1,
  "type": "sensor"
}

// Auto-detect (no type specified)
{
  "cmd": "lock",
  "sn": "DEVICE001",
  "lock": 1
}
```

---

## Error Scenarios to Test

### ERROR 1: Missing cmd field
```json
{
  "sn": "DEVICE001",
  "bat1": 85
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required field: cmd",
  "error": "cmd field is required to determine data type"
}
```

---

### ERROR 2: Invalid cmd
```json
{
  "cmd": "invalid_command",
  "sn": "DEVICE001"
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid cmd type: invalid_command",
  "error": "cmd must be one of: tpdata, hubdata, state, lock"
}
```

---

### ERROR 3: Missing sn field
```json
{
  "cmd": "tpdata",
  "tempValue": 85.5
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required field: sn (sensor serial number)"
}
```

---

### ERROR 4: Sensor/Device not found
```json
{
  "cmd": "tpdata",
  "sn": "INVALID_SENSOR_SN",
  "tempValue": 85.5
}
```
**Expected:** 404 Not Found
```json
{
  "success": false,
  "message": "Sensor not found: INVALID_SENSOR_SN"
}
```

---

### ERROR 5: Invalid status value
```json
{
  "cmd": "state",
  "sn": "DEVICE001",
  "status": "invalid_status"
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: active, inactive, maintenance"
}
```

---

### ERROR 6: Invalid lock value
```json
{
  "cmd": "lock",
  "sn": "DEVICE001",
  "lock": 5
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid lock value. Must be 0 (unlocked) or 1 (locked)"
}
```

---

### ERROR 7: No authentication token
**Headers:**
```
Content-Type: application/json
(NO Authorization header)
```

**Expected:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

## Postman Collection Structure

Buat folder di Postman dengan struktur:

```
📁 TPMS Backend
  📁 Auth
    - Login (POST)
  📁 IoT Data API
    📁 Valid Requests
      - TPDATA - Full Data (POST)
      - TPDATA - Temperature Only (POST)
      - HUBDATA - Full Update (POST)
      - HUBDATA - Partial Update (POST)
      - STATE - Active (POST)
      - STATE - Maintenance (POST)
      - LOCK - Lock Device (POST)
      - LOCK - Unlock Device (POST)
    📁 Error Tests
      - Missing CMD (POST)
      - Invalid CMD (POST)
      - Missing SN (POST)
      - Invalid SN (POST)
      - Invalid Status (POST)
      - Invalid Lock Value (POST)
      - No Auth Token (POST)
```

---

## Environment Variables (Optional)

Buat environment di Postman untuk mempermudah testing:

**Variables:**
```
base_url: http://localhost:5009
api_path: /api
token: (akan di-set setelah login)
test_sensor_sn: SENSOR001
test_device_sn: DEVICE001
```

**Cara menggunakan:**
```
URL: {{base_url}}{{api_path}}/iot/data
Headers: Authorization: Bearer {{token}}
Body: "sn": "{{test_sensor_sn}}"
```

---

## Pre-request Script (Optional)

Untuk auto-login dan set token, tambahkan di Collection level:

```javascript
// Pre-request Script
pm.sendRequest({
    url: pm.environment.get("base_url") + "/api/auth/login",
    method: 'POST',
    header: {
        'Content-Type': 'application/json',
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            email: "admin@tpms.com",
            password: "admin123"
        })
    }
}, function (err, res) {
    if (err === null) {
        var jsonData = res.json();
        pm.environment.set("token", jsonData.data.token);
    }
});
```

---

## Testing Checklist

### Before Testing:
- [ ] Server is running (`npm run dev` or `node server.js`)
- [ ] Database is accessible
- [ ] You have valid sensor and device serial numbers from database
- [ ] Auth token is obtained and valid

### Test All Commands:
- [ ] TPDATA - Success case
- [ ] TPDATA - Minimal payload
- [ ] HUBDATA - Success case
- [ ] HUBDATA - Partial update
- [ ] STATE - All status values
- [ ] LOCK - Lock and unlock
- [ ] LOCK - Auto-detect type

### Test Error Handling:
- [ ] Missing cmd field
- [ ] Invalid cmd
- [ ] Missing sn field
- [ ] Invalid sn (not found)
- [ ] Invalid status value
- [ ] Invalid lock value
- [ ] No authentication

### Verify Database:
- [ ] Check `sensor_data` table after TPDATA
- [ ] Check `device` table after HUBDATA
- [ ] Check `device.status` after STATE
- [ ] Check `device.lock` or `sensor.sensor_lock` after LOCK

---

## Quick Start Commands

1. **Get valid Serial Numbers from database:**
```sql
-- Get sensor serial numbers
SELECT sn, tireNo, device_id FROM sensor WHERE deleted_at IS NULL LIMIT 5;

-- Get device serial numbers
SELECT sn, truck_id FROM device WHERE deleted_at IS NULL LIMIT 5;
```

2. **Start testing:** Use the serial numbers obtained from step 1 in your Postman requests

3. **Monitor server logs:** Watch console for debug messages like:
```
📡 [IoT Data] Received cmd: tpdata
✅ [TPDATA] Created sensor data for sensor SENSOR001
```

---

## Tips

1. **Save responses:** Save example responses in Postman for documentation
2. **Use variables:** Use environment variables for flexibility
3. **Test sequentially:** Test in order: TPDATA → HUBDATA → STATE → LOCK
4. **Check logs:** Always check server console for detailed logs
5. **Verify data:** Query database to verify data is actually saved
6. **Collection runner:** Use Postman Collection Runner to test all scenarios at once

---

## Need Help?

**Common Issues:**

1. **401 Unauthorized:** Token expired or invalid, login again
2. **404 Not Found:** Serial number doesn't exist in database
3. **500 Internal Server Error:** Check server logs for details
4. **Connection refused:** Server not running

**Database Queries to Help:**
```sql
-- Get all sensors with their devices
SELECT s.sn as sensor_sn, s.tireNo, d.sn as device_sn, t.plate as truck_plate
FROM sensor s
JOIN device d ON s.device_id = d.id
JOIN truck t ON d.truck_id = t.id
WHERE s.deleted_at IS NULL AND d.deleted_at IS NULL
LIMIT 10;

-- Get recent sensor data
SELECT sd.*, s.sn as sensor_sn
FROM sensor_data sd
JOIN sensor s ON sd.sensor_id = s.id
ORDER BY sd.recorded_at DESC
LIMIT 10;
```
