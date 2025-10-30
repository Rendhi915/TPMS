# IoT Data API Documentation

## Overview
Single endpoint API untuk mengirim data IoT ke database. Endpoint ini dapat handle 4 jenis command (cmd) yang berbeda dalam 1 URL yang sama.

## Endpoint

**POST** `/api/iot/data`

**Authentication:** Required (Bearer Token)

**Content-Type:** `application/json`

## Command Types

Request body harus menyertakan field `cmd` yang menentukan jenis data yang dikirim:

| CMD | Description | Target Table | Purpose |
|-----|-------------|--------------|---------|
| `tpdata` | Temperature & Pressure Data | `sensor_data` | Kirim data suhu & tekanan ban |
| `hubdata` | Hub/Device Data | `device` | Update data device (battery, sim) |
| `state` | Device State | `device` | Update status device |
| `lock` | Lock Status | `device` / `sensor` | Update status kunci device/sensor |

---

## 1. TPDATA - Temperature & Pressure Data

### Purpose
Mengirim data suhu dan tekanan ban dari sensor ke database.

### Request Body
```json
{
  "cmd": "tpdata",
  "sn": "SENSOR123",
  "tempValue": 85.5,
  "tirepValue": 32.5,
  "exType": "normal",
  "bat": 85
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cmd | string | ✅ Yes | Harus "tpdata" |
| sn | string | ✅ Yes | Serial number sensor |
| tempValue | float | ⚠️ Optional | Nilai suhu (Celsius) |
| tirepValue | float | ⚠️ Optional | Nilai tekanan ban (PSI) |
| exType | string | ⚠️ Optional | Tipe exception (e.g., "normal", "warning") |
| bat | integer | ⚠️ Optional | Level battery sensor (0-100) |

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "sensor_sn": "SENSOR123",
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

### Error Response (404)
```json
{
  "success": false,
  "message": "Sensor not found: SENSOR123"
}
```

### Example cURL
```bash
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cmd": "tpdata",
    "sn": "SENSOR123",
    "tempValue": 85.5,
    "tirepValue": 32.5,
    "bat": 85
  }'
```

---

## 2. HUBDATA - Hub/Device Data

### Purpose
Update data device seperti level battery dan SIM number.

### Request Body
```json
{
  "cmd": "hubdata",
  "sn": "DEVICE123",
  "bat1": 85,
  "bat2": 90,
  "bat3": 88,
  "sim_number": "1234567890"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cmd | string | ✅ Yes | Harus "hubdata" |
| sn | string | ✅ Yes | Serial number device |
| bat1 | integer | ⚠️ Optional | Level battery 1 (0-100) |
| bat2 | integer | ⚠️ Optional | Level battery 2 (0-100) |
| bat3 | integer | ⚠️ Optional | Level battery 3 (0-100) |
| sim_number | string | ⚠️ Optional | Nomor SIM card |

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "device_id": "device-uuid",
    "device_sn": "DEVICE123",
    "truck_id": "truck-uuid",
    "truck_plate": "B1234XYZ",
    "bat1": 85,
    "bat2": 90,
    "bat3": 88,
    "sim_number": "1234567890",
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Device data updated successfully"
}
```

### Example cURL
```bash
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cmd": "hubdata",
    "sn": "DEVICE123",
    "bat1": 85,
    "bat2": 90,
    "bat3": 88
  }'
```

---

## 3. STATE - Device State

### Purpose
Update status device (active, inactive, maintenance).

### Request Body
```json
{
  "cmd": "state",
  "sn": "DEVICE123",
  "status": "active"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cmd | string | ✅ Yes | Harus "state" |
| sn | string | ✅ Yes | Serial number device |
| status | string | ✅ Yes | Status: "active", "inactive", "maintenance" |

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "device_id": "device-uuid",
    "device_sn": "DEVICE123",
    "status": "active",
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "Device state updated successfully"
}
```

### Error Response (400)
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: active, inactive, maintenance"
}
```

### Example cURL
```bash
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cmd": "state",
    "sn": "DEVICE123",
    "status": "active"
  }'
```

---

## 4. LOCK - Lock Status

### Purpose
Update status kunci pada device atau sensor.

### Request Body
```json
{
  "cmd": "lock",
  "sn": "DEVICE123",
  "lock": 1,
  "type": "device"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cmd | string | ✅ Yes | Harus "lock" |
| sn | string | ✅ Yes | Serial number device atau sensor |
| lock | integer | ✅ Yes | Status: 0 (unlocked), 1 (locked) |
| type | string | ⚠️ Optional | "device" atau "sensor" (auto-detect jika tidak ada) |

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "type": "device",
    "device_id": "device-uuid",
    "device_sn": "DEVICE123",
    "lock": 1,
    "updated_at": "2025-10-30T10:00:00.000Z"
  },
  "message": "device lock status updated successfully"
}
```

### Auto-Detection Behavior
Jika field `type` tidak disertakan:
1. System akan mencoba mencari di tabel `device` terlebih dahulu
2. Jika tidak ditemukan, akan mencari di tabel `sensor`
3. Jika keduanya tidak ditemukan, akan return error 404

### Example cURL
```bash
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cmd": "lock",
    "sn": "DEVICE123",
    "lock": 1
  }'
```

---

## Common Error Responses

### 400 - Missing cmd field
```json
{
  "success": false,
  "message": "Missing required field: cmd",
  "error": "cmd field is required to determine data type"
}
```

### 400 - Invalid cmd
```json
{
  "success": false,
  "message": "Invalid cmd type: invalid_cmd",
  "error": "cmd must be one of: tpdata, hubdata, state, lock"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 - Device/Sensor Not Found
```json
{
  "success": false,
  "message": "Device not found: DEVICE123"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Failed to process IoT data",
  "error": "Internal server error"
}
```

---

## Integration Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

// Send temperature & pressure data
async function sendTPData(sensorSn, temp, pressure, battery) {
  const response = await axios.post('http://localhost:5009/api/iot/data', {
    cmd: 'tpdata',
    sn: sensorSn,
    tempValue: temp,
    tirepValue: pressure,
    bat: battery
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}

// Update device battery
async function updateDeviceBattery(deviceSn, bat1, bat2, bat3) {
  const response = await axios.post('http://localhost:5009/api/iot/data', {
    cmd: 'hubdata',
    sn: deviceSn,
    bat1: bat1,
    bat2: bat2,
    bat3: bat3
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}

// Update device status
async function updateDeviceState(deviceSn, status) {
  const response = await axios.post('http://localhost:5009/api/iot/data', {
    cmd: 'state',
    sn: deviceSn,
    status: status
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}

// Lock/Unlock device
async function setDeviceLock(deviceSn, locked) {
  const response = await axios.post('http://localhost:5009/api/iot/data', {
    cmd: 'lock',
    sn: deviceSn,
    lock: locked ? 1 : 0
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}
```

### Python
```python
import requests

BASE_URL = "http://localhost:5009/api"
TOKEN = "your_token_here"

def send_tp_data(sensor_sn, temp, pressure, battery):
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "cmd": "tpdata",
        "sn": sensor_sn,
        "tempValue": temp,
        "tirepValue": pressure,
        "bat": battery
    }
    
    response = requests.post(f"{BASE_URL}/iot/data", json=payload, headers=headers)
    return response.json()

def update_device_battery(device_sn, bat1, bat2, bat3):
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "cmd": "hubdata",
        "sn": device_sn,
        "bat1": bat1,
        "bat2": bat2,
        "bat3": bat3
    }
    
    response = requests.post(f"{BASE_URL}/iot/data", json=payload, headers=headers)
    return response.json()
```

### Arduino/ESP32
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* serverUrl = "http://your-server:5009/api/iot/data";
const char* token = "your_token_here";

void sendTPData(String sensorSn, float temp, float pressure, int battery) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + String(token));
  
  StaticJsonDocument<200> doc;
  doc["cmd"] = "tpdata";
  doc["sn"] = sensorSn;
  doc["tempValue"] = temp;
  doc["tirepValue"] = pressure;
  doc["bat"] = battery;
  
  String requestBody;
  serializeJson(doc, requestBody);
  
  int httpResponseCode = http.POST(requestBody);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error: " + String(httpResponseCode));
  }
  
  http.end();
}
```

---

## Testing with Postman

### Setup
1. **Create New Request**
   - Method: POST
   - URL: `http://localhost:5009/api/iot/data`

2. **Headers**
   - `Authorization`: `Bearer YOUR_TOKEN`
   - `Content-Type`: `application/json`

3. **Body (raw JSON)**

### Test TPDATA
```json
{
  "cmd": "tpdata",
  "sn": "SENSOR123",
  "tempValue": 85.5,
  "tirepValue": 32.5,
  "bat": 85
}
```

### Test HUBDATA
```json
{
  "cmd": "hubdata",
  "sn": "DEVICE123",
  "bat1": 85,
  "bat2": 90,
  "bat3": 88
}
```

### Test STATE
```json
{
  "cmd": "state",
  "sn": "DEVICE123",
  "status": "active"
}
```

### Test LOCK
```json
{
  "cmd": "lock",
  "sn": "DEVICE123",
  "lock": 1
}
```

---

## Database Schema Reference

### sensor_data table
```sql
- id (UUID, PK)
- sensor_id (UUID, FK to sensor)
- tempValue (FLOAT)
- tirepValue (FLOAT)
- exType (VARCHAR)
- bat (SMALLINT)
- recorded_at (TIMESTAMP)
```

### device table
```sql
- id (UUID, PK)
- truck_id (UUID, FK to truck)
- sn (VARCHAR, UNIQUE)
- bat1 (SMALLINT)
- bat2 (SMALLINT)
- bat3 (SMALLINT)
- lock (SMALLINT)
- sim_number (VARCHAR)
- status (VARCHAR)
- updated_at (TIMESTAMP)
```

### sensor table
```sql
- id (UUID, PK)
- sn (VARCHAR, UNIQUE)
- device_id (UUID, FK to device)
- tireNo (INT)
- sensor_lock (SMALLINT)
- status (VARCHAR)
```

---

## Notes

1. **Serial Number (sn) adalah identifier utama** - Pastikan setiap device/sensor memiliki serial number yang unik
2. **Authentication wajib** - Semua request harus menyertakan Bearer token yang valid
3. **Field optional** - Hanya kirim field yang diperlukan, field optional bisa di-skip
4. **Auto-detection untuk lock** - Jika tidak yakin apakah sn adalah device atau sensor, biarkan field `type` kosong
5. **Timestamp otomatis** - Server akan otomatis set timestamp saat data diterima
6. **Error handling** - Selalu cek response status dan handle error dengan baik

---

## Support

Untuk pertanyaan atau issue, hubungi tim development.
