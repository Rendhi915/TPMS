# 📮 POSTMAN API Testing Guide - Unified IoT Endpoint

**Endpoint Tunggal untuk Device & Sensor Management + IoT Data Ingestion**

---

## 🔑 Setup Authentication

### 1. Login untuk Mendapatkan Token

**Request:**
```
POST http://localhost:3001/api/auth/login
Content-Type: application/json

Body (raw JSON):
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 2. Setup Authorization Header

Untuk semua request ke `/api/iot/data`, tambahkan header:
```
Authorization: Bearer <your-token-here>
```

Di Postman:
1. Tab "Authorization"
2. Type: Bearer Token
3. Token: `<paste token dari login>`

---

## 🎯 UNIFIED ENDPOINT

```
POST http://localhost:3001/api/iot/data
```

**Routing Logic:**
- Jika **ada field `method`** → ADMIN CRUD (Device/Sensor Management)
- Jika **tidak ada `method`** → IoT Hardware Ingestion

---

## 📦 1. DEVICE CRUD (Admin Operations)

### 1.1 Create Device

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "device",
  "method": "create",
  "data": {
    "truck_id": 1,
    "sn": "DEV-12345",
    "sim_number": "+6281234567890",
    "status": "active"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "truck_id": 1,
    "sn": "DEV-12345",
    "sim_number": "+6281234567890",
    "status": "active",
    "bat1": 0,
    "bat2": 0,
    "bat3": 0,
    "lock": 0,
    "created_at": "2025-11-05T10:00:00.000Z",
    "truck": {
      "id": 1,
      "plate": "B-1234-CD",
      "name": "Dump Truck 1"
    }
  },
  "message": "Device created successfully"
}
```

---

### 1.2 Read All Devices

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "device",
  "method": "read",
  "data": {
    "page": 1,
    "limit": 50
  }
}
```

**Optional Filters:**
```json
{
  "cmd": "device",
  "method": "read",
  "data": {
    "truck_id": 1,
    "status": "active",
    "search": "DEV-123",
    "page": 1,
    "limit": 20
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "id": 1,
        "sn": "DEV-12345",
        "truck_id": 1,
        "status": "active",
        "truck": {
          "id": 1,
          "plate": "B-1234-CD",
          "name": "Dump Truck 1"
        },
        "sensor": [
          {
            "id": 1,
            "sn": "SEN-001",
            "tireNo": 1
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 10,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    }
  },
  "message": "Devices retrieved successfully"
}
```

---

### 1.3 Read Specific Device

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "device",
  "method": "read",
  "data": {
    "id": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "DEV-12345",
    "truck_id": 1,
    "sim_number": "+6281234567890",
    "status": "active",
    "bat1": 95,
    "bat2": 92,
    "bat3": 88,
    "lock": 1,
    "truck": {
      "id": 1,
      "plate": "B-1234-CD",
      "name": "Dump Truck 1",
      "type": "Dump Truck"
    },
    "sensor": [
      {
        "id": 1,
        "sn": "SEN-001",
        "tireNo": 1,
        "sensorNo": 1001,
        "status": "active"
      }
    ],
    "location": [
      {
        "id": 1,
        "lat": -6.2088,
        "long": 106.8456,
        "recorded_at": "2025-11-05T10:00:00.000Z"
      }
    ]
  },
  "message": "Device retrieved successfully"
}
```

---

### 1.4 Update Device

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "device",
  "method": "update",
  "data": {
    "id": 1,
    "truck_id": 2,
    "status": "inactive",
    "sim_number": "+6289876543210"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "DEV-12345",
    "truck_id": 2,
    "status": "inactive",
    "sim_number": "+6289876543210",
    "updated_at": "2025-11-05T11:00:00.000Z",
    "truck": {
      "id": 2,
      "plate": "B-5678-EF",
      "name": "Dump Truck 2"
    }
  },
  "message": "Device updated successfully"
}
```

---

### 1.5 Delete Device

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "device",
  "method": "delete",
  "data": {
    "id": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "DEV-12345",
    "deleted_at": "2025-11-05T12:00:00.000Z"
  },
  "message": "Device deleted successfully"
}
```

---

## 🔧 2. SENSOR CRUD (Admin Operations)

### 2.1 Create Sensor

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "sensor",
  "method": "create",
  "data": {
    "device_id": 1,
    "sn": "SEN-12345",
    "tireNo": 1,
    "simNumber": "001",
    "sensorNo": 1001,
    "status": "active"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "device_id": 1,
    "sn": "SEN-12345",
    "tireNo": 1,
    "simNumber": "001",
    "sensorNo": 1001,
    "status": "active",
    "sensor_lock": 0,
    "created_at": "2025-11-05T10:00:00.000Z",
    "device": {
      "id": 1,
      "sn": "DEV-12345",
      "truck": {
        "id": 1,
        "plate": "B-1234-CD",
        "name": "Dump Truck 1"
      }
    }
  },
  "message": "Sensor created successfully"
}
```

---

### 2.2 Read All Sensors

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "sensor",
  "method": "read",
  "data": {
    "page": 1,
    "limit": 50
  }
}
```

**Optional Filters:**
```json
{
  "cmd": "sensor",
  "method": "read",
  "data": {
    "device_id": 1,
    "status": "active",
    "page": 1,
    "limit": 20
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sensors": [
      {
        "id": 1,
        "sn": "SEN-12345",
        "device_id": 1,
        "tireNo": 1,
        "sensorNo": 1001,
        "status": "active",
        "tempValue": 85.5,
        "tirepValue": 8.2,
        "bat": 95,
        "device": {
          "id": 1,
          "sn": "DEV-12345",
          "truck": {
            "id": 1,
            "plate": "B-1234-CD",
            "name": "Dump Truck 1"
          }
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 10,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    }
  },
  "message": "Sensors retrieved successfully"
}
```

---

### 2.3 Read Specific Sensor

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "sensor",
  "method": "read",
  "data": {
    "id": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "SEN-12345",
    "device_id": 1,
    "tireNo": 1,
    "simNumber": "001",
    "sensorNo": 1001,
    "status": "active",
    "tempValue": 85.5,
    "tirepValue": 8.2,
    "bat": 95,
    "sensor_lock": 0,
    "device": {
      "id": 1,
      "sn": "DEV-12345",
      "truck": {
        "id": 1,
        "plate": "B-1234-CD",
        "name": "Dump Truck 1"
      }
    }
  },
  "message": "Sensor retrieved successfully"
}
```

---

### 2.4 Update Sensor

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "sensor",
  "method": "update",
  "data": {
    "id": 1,
    "tireNo": 2,
    "status": "inactive",
    "sensorNo": 1002
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "SEN-12345",
    "device_id": 1,
    "tireNo": 2,
    "sensorNo": 1002,
    "status": "inactive",
    "updated_at": "2025-11-05T11:00:00.000Z",
    "device": {
      "id": 1,
      "sn": "DEV-12345",
      "truck": {
        "id": 1,
        "plate": "B-1234-CD",
        "name": "Dump Truck 1"
      }
    }
  },
  "message": "Sensor updated successfully"
}
```

---

### 2.5 Delete Sensor

**Request:**
```
POST http://localhost:3001/api/iot/data
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "cmd": "sensor",
  "method": "delete",
  "data": {
    "id": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sn": "SEN-12345",
    "deleted_at": "2025-11-05T12:00:00.000Z"
  },
  "message": "Sensor deleted successfully"
}
```

---

## 🤖 3. IOT HARDWARE DATA INGESTION

**Catatan:** Endpoint ini untuk IoT hardware device. Tidak perlu Authorization header.

### 3.1 Tire Pressure & Temperature Data (TPDATA)

**Request:**
```
POST http://localhost:3001/api/iot/data
Content-Type: application/json

Body:
{
  "sn": "SEN-12345",
  "cmd": "tpdata",
  "data": {
    "tireNo": 1,
    "tiprValue": 8.2,
    "tempValue": 85.5,
    "exType": 0,
    "bat": 95,
    "simNumber": "001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sensor_id": 1,
    "sensor_sn": "SEN-12345",
    "tireNo": 1,
    "device_id": 1,
    "truck_id": 1,
    "truck_plate": "B-1234-CD",
    "tempValue": 85.5,
    "tirepValue": 8.2,
    "exType": 0,
    "bat": 95,
    "updated_at": "2025-11-05T10:00:00.000Z"
  },
  "message": "Sensor data updated successfully"
}
```

---

### 3.2 Hub Temperature Data (HUBDATA)

**Request:**
```
POST http://localhost:3001/api/iot/data
Content-Type: application/json

Body:
{
  "sn": "SEN-12345",
  "cmd": "hubdata",
  "data": {
    "tireNo": 1,
    "tempValue": 92.3,
    "exType": 1,
    "bat": 93,
    "simNumber": "001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sensor_id": 1,
    "sensor_sn": "SEN-12345",
    "tireNo": 1,
    "device_id": 1,
    "truck_id": 1,
    "truck_plate": "B-1234-CD",
    "tempValue": 92.3,
    "exType": 1,
    "bat": 93,
    "updated_at": "2025-11-05T10:01:00.000Z"
  },
  "message": "Hub sensor data updated successfully"
}
```

---

### 3.3 Device Location & Battery (DEVICE)

**Request:**
```
POST http://localhost:3001/api/iot/data
Content-Type: application/json

Body:
{
  "sn": "DEV-12345",
  "cmd": "device",
  "data": {
    "lng": 106.8456,
    "lat": -6.2088,
    "bat1": 95,
    "bat2": 92,
    "bat3": 88,
    "lock": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "device_id": 1,
    "device_sn": "DEV-12345",
    "truck_id": 1,
    "truck_plate": "B-1234-CD",
    "bat1": 95,
    "bat2": 92,
    "bat3": 88,
    "lock": 1,
    "location": {
      "location_id": 100,
      "lat": -6.2088,
      "lng": 106.8456,
      "recorded_at": "2025-11-05T10:02:00.000Z"
    },
    "updated_at": "2025-11-05T10:02:00.000Z"
  },
  "message": "Device data updated successfully"
}
```

---

### 3.4 Lock Status Update (STATE)

**Request:**
```
POST http://localhost:3001/api/iot/data
Content-Type: application/json

Body:
{
  "sn": "DEV-12345",
  "cmd": "state",
  "data": {
    "is_lock": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "device_id": 1,
    "device_sn": "DEV-12345",
    "lock": 1,
    "updated_at": "2025-11-05T10:03:00.000Z"
  },
  "message": "Device lock status updated successfully"
}
```

---

## 🔍 Testing Flow di Postman

### Quick Start Test:

1. **Login & Get Token**
   ```
   POST /api/auth/login
   Body: { "email": "admin@example.com", "password": "password" }
   ```

2. **Create Device**
   ```
   POST /api/iot/data
   Authorization: Bearer <token>
   Body: { "cmd": "device", "method": "create", "data": { "truck_id": 1, "sn": "TEST-DEV-001" } }
   ```

3. **Read Devices**
   ```
   POST /api/iot/data
   Authorization: Bearer <token>
   Body: { "cmd": "device", "method": "read", "data": {} }
   ```

4. **Create Sensor**
   ```
   POST /api/iot/data
   Authorization: Bearer <token>
   Body: { "cmd": "sensor", "method": "create", "data": { "device_id": 1, "sn": "TEST-SEN-001", "tireNo": 1 } }
   ```

5. **Send IoT Data (Tire Pressure)**
   ```
   POST /api/iot/data
   Body: { "sn": "TEST-SEN-001", "cmd": "tpdata", "data": { "tireNo": 1, "tiprValue": 8.2, "tempValue": 85 } }
   ```

6. **Send IoT Data (Device GPS)**
   ```
   POST /api/iot/data
   Body: { "sn": "TEST-DEV-001", "cmd": "device", "data": { "lng": 106.8456, "lat": -6.2088, "bat1": 95 } }
   ```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required field: cmd"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid token. Please login again."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Device not found: 999"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Device with SN DEV-12345 already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to process IoT data",
  "error": "Database connection error"
}
```

---

## 🚀 Postman Collection Import

Buat collection baru dengan struktur:

```
TPMS Backend API
├── 0. Auth
│   └── POST Login
├── 1. Device CRUD
│   ├── POST Create Device
│   ├── POST Read All Devices
│   ├── POST Read Device by ID
│   ├── POST Update Device
│   └── POST Delete Device
├── 2. Sensor CRUD
│   ├── POST Create Sensor
│   ├── POST Read All Sensors
│   ├── POST Read Sensor by ID
│   ├── POST Update Sensor
│   └── POST Delete Sensor
└── 3. IoT Ingestion
    ├── POST Send TPDATA
    ├── POST Send HUBDATA
    ├── POST Send DEVICE GPS
    └── POST Send STATE Lock
```

**Environment Variables:**
```
base_url = http://localhost:3001
token = <set after login>
```

---

## 📝 Notes

- **Single Endpoint**: Semua operasi ke `POST /api/iot/data`
- **Routing Logic**: Field `method` menentukan CRUD admin vs IoT ingestion
- **Real-time Updates**: WebSocket broadcast otomatis setiap ada update
- **Soft Delete**: Delete tidak menghapus permanent, hanya set `deleted_at`
- **Pagination**: Default 50 items per page
- **Authentication**: Required untuk CRUD admin, tidak untuk IoT ingestion

---

**Last Updated:** November 5, 2025  
**Version:** 1.0  
**Endpoint:** POST /api/iot/data
