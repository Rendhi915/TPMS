# Postman Testing Guide - TPMS Backend API

Dokumentasi lengkap untuk testing semua endpoint menggunakan Postman.

## Table of Contents

- [Setup Postman](#setup-postman)
- [Environment Variables](#environment-variables)
- [Authentication Endpoints](#authentication-endpoints)
- [Dashboard Endpoints](#dashboard-endpoints)
- [Truck Management](#truck-management)
- [Driver Management](#driver-management)
- [Vendor Management](#vendor-management)
- [Device Management](#device-management)
- [Sensor Management](#sensor-management)
- [Sensor Data & History](#sensor-data--history)
- [Mining Area Management](#mining-area-management)
- [IoT Data Endpoint](#iot-data-endpoint)
- [Fleet Management](#fleet-management)

---

## Setup Postman

### 1. Base URLs

**Local Development:**

```
http://localhost:3001
```

**Production:**

```
https://be-tpms.connectis.my.id
```

### 2. Create Environment in Postman

Klik gear icon ⚙️ di kanan atas → Add → Buat environment baru:

**Development Environment:**

```
VARIABLE        | INITIAL VALUE                    | CURRENT VALUE
----------------|----------------------------------|----------------------------------
baseUrl         | http://localhost:3001            | http://localhost:3001
token           |                                  | (will be set after login)
```

**Production Environment:**

```
VARIABLE        | INITIAL VALUE                           | CURRENT VALUE
----------------|-----------------------------------------|----------------------------------
baseUrl         | https://be-tpms.connectis.my.id         | https://be-tpms.connectis.my.id
token           |                                         | (will be set after login)
```

---

## Environment Variables

Setelah setup environment, gunakan variabel ini di semua request:

- **URL**: `{{baseUrl}}/api/...`
- **Authorization Header**: `Bearer {{token}}`

---

## Authentication Endpoints

### 1. Login (Get Token)

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/login`  
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

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "admin@tpms.com",
      "name": "Admin TPMS",
      "role": "admin",
      "status": "active"
    }
  }
}
```

**⚠️ IMPORTANT:** Copy token dari response dan set ke environment variable `token`!

**Postman Test Script (Auto-save token):**

```javascript
// Tab "Tests" di request
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set('token', response.data.token);
  console.log('Token saved:', response.data.token);
}
```

---

### 2. Get Current User Profile

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/me`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@tpms.com",
    "name": "Admin TPMS",
    "role": "admin",
    "status": "active"
  }
}
```

---

## Dashboard Endpoints

### 1. Get Dashboard Overview

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/dashboard`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "totalTrucks": 10,
    "totalDevices": 2,
    "totalSensors": 100,
    "activeSensors": 100,
    "alertCount": 0,
    "recentAlerts": []
  }
}
```

---

### 2. Get Dashboard Statistics

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/dashboard/stats`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "trucks": {
      "total": 10,
      "active": 10,
      "maintenance": 0
    },
    "sensors": {
      "total": 100,
      "online": 100,
      "offline": 0,
      "warning": 0
    },
    "alerts": {
      "today": 0,
      "week": 0,
      "month": 0
    }
  }
}
```

---

## Truck Management

### 1. Get All Trucks (List)

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/trucks`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
page=1
limit=10
search=B 1001
status=active
```

**Full URL with params:**

```
{{baseUrl}}/api/trucks?page=1&limit=10
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "trucks": [
      {
        "id": 1,
        "plateNumber": "B 1001 ABC",
        "model": "Dump Truck 20 Ton",
        "capacity": "20 Ton",
        "year": 2020,
        "status": "active",
        "driverId": 1,
        "driver": {
          "id": 1,
          "name": "Driver 1",
          "licenseNumber": "LIC-0001"
        },
        "devices": [
          {
            "id": 1,
            "deviceId": "DEV-SN-0001",
            "status": "active"
          }
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 10,
      "itemsPerPage": 10
    }
  }
}
```

---

### 2. Get Truck by ID (Detail)

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/trucks/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "plateNumber": "B 1001 ABC",
    "model": "Dump Truck 20 Ton",
    "capacity": "20 Ton",
    "year": 2020,
    "status": "active",
    "photoUrl": "/uploads/trucks/truck-1.jpg",
    "driverId": 1,
    "driver": {
      "id": 1,
      "name": "Driver 1",
      "licenseNumber": "LIC-0001",
      "phone": "081234567801",
      "email": "driver1@example.com"
    },
    "devices": [
      {
        "id": 1,
        "deviceId": "DEV-SN-0001",
        "status": "active",
        "sensors": [
          {
            "id": 1,
            "sensorId": "SN-0001",
            "wheelPosition": "FL",
            "status": "active"
          }
        ]
      }
    ]
  }
}
```

---

### 3. Create New Truck

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/trucks`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "plateNumber": "B 9999 XYZ",
  "model": "Dump Truck 25 Ton",
  "capacity": "25 Ton",
  "year": 2023,
  "status": "active",
  "driverId": 1
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Truck created successfully",
  "data": {
    "id": 11,
    "plateNumber": "B 9999 XYZ",
    "model": "Dump Truck 25 Ton",
    "capacity": "25 Ton",
    "year": 2023,
    "status": "active",
    "driverId": 1
  }
}
```

---

### 4. Update Truck

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/trucks/11`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "plateNumber": "B 9999 XYZ",
  "model": "Dump Truck 30 Ton",
  "capacity": "30 Ton",
  "year": 2024,
  "status": "maintenance",
  "driverId": 2
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Truck updated successfully",
  "data": {
    "id": 11,
    "plateNumber": "B 9999 XYZ",
    "model": "Dump Truck 30 Ton",
    "capacity": "30 Ton",
    "year": 2024,
    "status": "maintenance",
    "driverId": 2
  }
}
```

---

### 5. Delete Truck

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/trucks/11`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Truck deleted successfully"
}
```

---

## Driver Management

### 1. Get All Drivers

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/drivers`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
page=1
limit=10
search=Driver
status=active
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "drivers": [
      {
        "id": 1,
        "name": "Driver 1",
        "licenseNumber": "LIC-0001",
        "phone": "081234567801",
        "email": "driver1@example.com",
        "status": "active",
        "vendorId": 1,
        "vendor": {
          "id": 1,
          "name": "Vendor A"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 10,
      "itemsPerPage": 10
    }
  }
}
```

---

### 2. Get Driver by ID

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/drivers/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Driver 1",
    "licenseNumber": "LIC-0001",
    "phone": "081234567801",
    "email": "driver1@example.com",
    "address": "Jakarta",
    "status": "active",
    "photoUrl": "/uploads/drivers/driver-1.jpg",
    "vendorId": 1,
    "vendor": {
      "id": 1,
      "name": "Vendor A",
      "contactPerson": "Contact A"
    },
    "trucks": [
      {
        "id": 1,
        "plateNumber": "B 1001 ABC",
        "model": "Dump Truck 20 Ton"
      }
    ]
  }
}
```

---

### 3. Create New Driver

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/drivers`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Driver New",
  "licenseNumber": "LIC-9999",
  "phone": "081234567999",
  "email": "drivernew@example.com",
  "address": "Jakarta Selatan",
  "status": "active",
  "vendorId": 1
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Driver created successfully",
  "data": {
    "id": 11,
    "name": "Driver New",
    "licenseNumber": "LIC-9999",
    "phone": "081234567999",
    "email": "drivernew@example.com",
    "status": "active",
    "vendorId": 1
  }
}
```

---

### 4. Update Driver

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/drivers/11`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Driver Updated",
  "licenseNumber": "LIC-9999-UPD",
  "phone": "081234567888",
  "email": "driverupdated@example.com",
  "address": "Jakarta Barat",
  "status": "inactive",
  "vendorId": 2
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Driver updated successfully",
  "data": {
    "id": 11,
    "name": "Driver Updated",
    "licenseNumber": "LIC-9999-UPD",
    "phone": "081234567888",
    "email": "driverupdated@example.com",
    "status": "inactive",
    "vendorId": 2
  }
}
```

---

### 5. Delete Driver

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/drivers/11`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Driver deleted successfully"
}
```

---

## Vendor Management

### 1. Get All Vendors

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/vendors`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
page=1
limit=10
search=Vendor
status=active
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "vendors": [
      {
        "id": 1,
        "name": "Vendor A",
        "contactPerson": "Contact A",
        "phone": "021-1111111",
        "email": "vendora@example.com",
        "address": "Jakarta",
        "status": "active"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 5,
      "itemsPerPage": 10
    }
  }
}
```

---

### 2. Get Vendor by ID

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/vendors/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Vendor A",
    "contactPerson": "Contact A",
    "phone": "021-1111111",
    "email": "vendora@example.com",
    "address": "Jakarta",
    "status": "active",
    "drivers": [
      {
        "id": 1,
        "name": "Driver 1",
        "licenseNumber": "LIC-0001"
      },
      {
        "id": 2,
        "name": "Driver 2",
        "licenseNumber": "LIC-0002"
      }
    ]
  }
}
```

---

### 3. Create New Vendor

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/vendors`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Vendor New",
  "contactPerson": "Contact New",
  "phone": "021-9999999",
  "email": "vendornew@example.com",
  "address": "Bandung",
  "status": "active"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Vendor created successfully",
  "data": {
    "id": 6,
    "name": "Vendor New",
    "contactPerson": "Contact New",
    "phone": "021-9999999",
    "email": "vendornew@example.com",
    "address": "Bandung",
    "status": "active"
  }
}
```

---

### 4. Update Vendor

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/vendors/6`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Vendor Updated",
  "contactPerson": "Contact Updated",
  "phone": "021-8888888",
  "email": "vendorupdated@example.com",
  "address": "Surabaya",
  "status": "inactive"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Vendor updated successfully",
  "data": {
    "id": 6,
    "name": "Vendor Updated",
    "contactPerson": "Contact Updated",
    "phone": "021-8888888",
    "email": "vendorupdated@example.com",
    "address": "Surabaya",
    "status": "inactive"
  }
}
```

---

### 5. Delete Vendor

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/vendors/6`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Vendor deleted successfully"
}
```

---

## Device Management

### 1. Get All Devices

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/devices`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
page=1
limit=10
search=DEV-SN
status=active
truckId=1
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "id": 1,
        "deviceId": "DEV-SN-0001",
        "status": "active",
        "truckId": 1,
        "truck": {
          "id": 1,
          "plateNumber": "B 1001 ABC",
          "model": "Dump Truck 20 Ton"
        },
        "sensors": [
          {
            "id": 1,
            "sensorId": "SN-0001",
            "wheelPosition": "FL"
          }
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 2,
      "itemsPerPage": 10
    }
  }
}
```

---

### 2. Get Device by ID

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/devices/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "deviceId": "DEV-SN-0001",
    "status": "active",
    "truckId": 1,
    "truck": {
      "id": 1,
      "plateNumber": "B 1001 ABC",
      "model": "Dump Truck 20 Ton",
      "driver": {
        "name": "Driver 1"
      }
    },
    "sensors": [
      {
        "id": 1,
        "sensorId": "SN-0001",
        "wheelPosition": "FL",
        "status": "active"
      },
      {
        "id": 2,
        "sensorId": "SN-0002",
        "wheelPosition": "FR",
        "status": "active"
      }
    ]
  }
}
```

---

### 3. Create New Device

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/devices`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "deviceId": "DEV-SN-9999",
  "status": "active",
  "truckId": 1
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Device created successfully",
  "data": {
    "id": 3,
    "deviceId": "DEV-SN-9999",
    "status": "active",
    "truckId": 1
  }
}
```

---

### 4. Update Device

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/devices/3`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "deviceId": "DEV-SN-9999-UPD",
  "status": "maintenance",
  "truckId": 2
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "id": 3,
    "deviceId": "DEV-SN-9999-UPD",
    "status": "maintenance",
    "truckId": 2
  }
}
```

---

### 5. Delete Device

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/devices/3`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

---

## Sensor Management

### 1. Get All Sensors

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/sensors`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
page=1
limit=20
search=SN-00
status=active
deviceId=1
wheelPosition=FL
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "sensors": [
      {
        "id": 1,
        "sensorId": "SN-0001",
        "wheelPosition": "FL",
        "status": "active",
        "tempValue": 28.5,
        "tirepValue": 35.2,
        "bat": 95,
        "deviceId": 1,
        "device": {
          "id": 1,
          "deviceId": "DEV-SN-0001",
          "truck": {
            "plateNumber": "B 1001 ABC"
          }
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

---

### 2. Get Sensor by ID

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/sensors/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "sensorId": "SN-0001",
    "wheelPosition": "FL",
    "status": "active",
    "tempValue": 28.5,
    "tirepValue": 35.2,
    "exType": "normal",
    "bat": 95,
    "deviceId": 1,
    "device": {
      "id": 1,
      "deviceId": "DEV-SN-0001",
      "status": "active",
      "truck": {
        "id": 1,
        "plateNumber": "B 1001 ABC",
        "model": "Dump Truck 20 Ton",
        "driver": {
          "name": "Driver 1"
        }
      }
    },
    "sensorData": [
      {
        "id": 1,
        "temperature": 28.5,
        "pressure": 35.2,
        "battery": 95,
        "recordedAt": "2025-11-03T10:30:00.000Z"
      }
    ]
  }
}
```

---

### 3. Create New Sensor

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/sensors`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "sensorId": "SN-9999",
  "wheelPosition": "RL",
  "status": "active",
  "deviceId": 1
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Sensor created successfully",
  "data": {
    "id": 101,
    "sensorId": "SN-9999",
    "wheelPosition": "RL",
    "status": "active",
    "deviceId": 1
  }
}
```

---

### 4. Update Sensor

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/sensors/101`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "sensorId": "SN-9999-UPD",
  "wheelPosition": "RR",
  "status": "maintenance",
  "deviceId": 2
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Sensor updated successfully",
  "data": {
    "id": 101,
    "sensorId": "SN-9999-UPD",
    "wheelPosition": "RR",
    "status": "maintenance",
    "deviceId": 2
  }
}
```

---

### 5. Delete Sensor

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/sensors/101`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Sensor deleted successfully"
}
```

---

## Sensor Data & History

### 1. Get Sensor Data (Latest)

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/sensor-data`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters (Optional):**

```
sensorId=1
deviceId=1
startDate=2025-11-01
endDate=2025-11-03
limit=50
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "sensorData": [
      {
        "id": 1,
        "sensorId": 1,
        "temperature": 28.5,
        "pressure": 35.2,
        "battery": 95,
        "latitude": -6.2088,
        "longitude": 106.8456,
        "recordedAt": "2025-11-03T10:30:00.000Z",
        "sensor": {
          "sensorId": "SN-0001",
          "wheelPosition": "FL",
          "device": {
            "deviceId": "DEV-SN-0001",
            "truck": {
              "plateNumber": "B 1001 ABC"
            }
          }
        }
      }
    ]
  }
}
```

---

### 2. Get Historical Data

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/history`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Query Parameters:**

```
truckId=1
startDate=2025-11-01
endDate=2025-11-03
page=1
limit=50
```

**Full URL:**

```
{{baseUrl}}/api/history?truckId=1&startDate=2025-11-01&endDate=2025-11-03
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "history": [
      {
        "timestamp": "2025-11-03T10:30:00.000Z",
        "truckId": 1,
        "plateNumber": "B 1001 ABC",
        "deviceId": "DEV-SN-0001",
        "sensors": [
          {
            "sensorId": "SN-0001",
            "wheelPosition": "FL",
            "temperature": 28.5,
            "pressure": 35.2,
            "battery": 95
          },
          {
            "sensorId": "SN-0002",
            "wheelPosition": "FR",
            "temperature": 29.1,
            "pressure": 34.8,
            "battery": 92
          }
        ],
        "location": {
          "latitude": -6.2088,
          "longitude": 106.8456
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 10
    }
  }
}
```

---

## Mining Area Management

### 1. Get All Mining Areas

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/miningarea`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "miningAreas": [
      {
        "id": 1,
        "name": "Area A",
        "latitude": -6.2088,
        "longitude": 106.8456,
        "radius": 500,
        "status": "active"
      }
    ]
  }
}
```

---

### 2. Get Mining Area by ID

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/miningarea/1`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Area A",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "radius": 500,
    "status": "active",
    "description": "Mining area description"
  }
}
```

---

### 3. Create Mining Area

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/miningarea`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Area New",
  "latitude": -6.3,
  "longitude": 106.9,
  "radius": 750,
  "status": "active",
  "description": "New mining area"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Mining area created successfully",
  "data": {
    "id": 2,
    "name": "Area New",
    "latitude": -6.3,
    "longitude": 106.9,
    "radius": 750,
    "status": "active"
  }
}
```

---

### 4. Update Mining Area

**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/miningarea/2`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Area Updated",
  "latitude": -6.35,
  "longitude": 106.95,
  "radius": 1000,
  "status": "inactive"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Mining area updated successfully",
  "data": {
    "id": 2,
    "name": "Area Updated",
    "latitude": -6.35,
    "longitude": 106.95,
    "radius": 1000,
    "status": "inactive"
  }
}
```

---

### 5. Delete Mining Area

**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/miningarea/2`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Mining area deleted successfully"
}
```

---

## IoT Data Endpoint

### UNIFIED ENDPOINT - 2 Path Berbeda

Endpoint ini memiliki 2 path berdasarkan keberadaan field `method`:

- **PATH 1**: Tanpa `method` → Data dari hardware IoT
- **PATH 2**: Dengan `method` → Admin CRUD operations

---

### PATH 1: IoT Hardware Data (No Method Field)

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Content-Type: application/json
```

**⚠️ Note:** PATH 1 TIDAK BUTUH Authorization header (untuk hardware)

**Body (raw JSON) - Single Sensor:**

```json
{
  "deviceId": "DEV-SN-0001",
  "sensorId": "SN-0001",
  "temp": 32.5,
  "tirep": 38.2,
  "bat": 85,
  "lat": -6.2088,
  "lon": 106.8456,
  "exType": "normal"
}
```

**Body (raw JSON) - Multiple Sensors:**

```json
{
  "deviceId": "DEV-SN-0001",
  "sensors": [
    {
      "sensorId": "SN-0001",
      "temp": 32.5,
      "tirep": 38.2,
      "bat": 85,
      "exType": "normal"
    },
    {
      "sensorId": "SN-0002",
      "temp": 31.8,
      "tirep": 37.5,
      "bat": 90,
      "exType": "normal"
    }
  ],
  "lat": -6.2088,
  "lon": 106.8456
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Data processed successfully",
  "data": {
    "deviceId": "DEV-SN-0001",
    "sensorsUpdated": 2,
    "locationSaved": true
  }
}
```

---

### PATH 2: Admin CRUD Operations (With Method Field)

**⚠️ Important:** PATH 2 BUTUH Authorization header!

**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

---

#### 2.1 Create Device via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "createDevice",
  "deviceId": "DEV-NEW-001",
  "truckId": 1,
  "status": "active"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Device created successfully",
  "data": {
    "id": 3,
    "deviceId": "DEV-NEW-001",
    "truckId": 1,
    "status": "active"
  }
}
```

---

#### 2.2 Read Device via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "getDevice",
  "deviceId": "DEV-SN-0001"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "deviceId": "DEV-SN-0001",
    "truckId": 1,
    "status": "active",
    "truck": {
      "plateNumber": "B 1001 ABC"
    },
    "sensors": [
      {
        "sensorId": "SN-0001",
        "wheelPosition": "FL"
      }
    ]
  }
}
```

---

#### 2.3 Update Device via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "updateDevice",
  "deviceId": "DEV-NEW-001",
  "truckId": 2,
  "status": "maintenance"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "id": 3,
    "deviceId": "DEV-NEW-001",
    "truckId": 2,
    "status": "maintenance"
  }
}
```

---

#### 2.4 Delete Device via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "deleteDevice",
  "deviceId": "DEV-NEW-001"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

---

#### 2.5 Create Sensor via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "createSensor",
  "sensorId": "SN-NEW-001",
  "deviceId": "DEV-SN-0001",
  "wheelPosition": "RL",
  "status": "active"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Sensor created successfully",
  "data": {
    "id": 101,
    "sensorId": "SN-NEW-001",
    "deviceId": 1,
    "wheelPosition": "RL",
    "status": "active"
  }
}
```

---

#### 2.6 Read Sensor via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "getSensor",
  "sensorId": "SN-0001"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "sensorId": "SN-0001",
    "wheelPosition": "FL",
    "status": "active",
    "tempValue": 28.5,
    "tirepValue": 35.2,
    "bat": 95,
    "device": {
      "deviceId": "DEV-SN-0001",
      "truck": {
        "plateNumber": "B 1001 ABC"
      }
    }
  }
}
```

---

#### 2.7 Update Sensor via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "updateSensor",
  "sensorId": "SN-NEW-001",
  "wheelPosition": "RR",
  "status": "maintenance"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Sensor updated successfully",
  "data": {
    "id": 101,
    "sensorId": "SN-NEW-001",
    "wheelPosition": "RR",
    "status": "maintenance"
  }
}
```

---

#### 2.8 Delete Sensor via IoT Endpoint

**Method:** `POST`  
**URL:** `{{baseUrl}}/api/iot/data`  
**Headers:**

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "method": "deleteSensor",
  "sensorId": "SN-NEW-001"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Sensor deleted successfully"
}
```

---

## Fleet Management

### 1. Get Fleet Overview

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/fleet`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "totalTrucks": 10,
    "activeTrucks": 10,
    "maintenanceTrucks": 0,
    "trucks": [
      {
        "id": 1,
        "plateNumber": "B 1001 ABC",
        "status": "active",
        "lastLocation": {
          "latitude": -6.2088,
          "longitude": 106.8456,
          "recordedAt": "2025-11-03T10:30:00.000Z"
        },
        "sensors": [
          {
            "wheelPosition": "FL",
            "temperature": 28.5,
            "pressure": 35.2,
            "status": "normal"
          }
        ]
      }
    ]
  }
}
```

---

### 2. Get Truck Realtime Data

**Method:** `GET`  
**URL:** `{{baseUrl}}/api/fleet/1/realtime`  
**Headers:**

```
Authorization: Bearer {{token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "truckId": 1,
    "plateNumber": "B 1001 ABC",
    "driver": {
      "name": "Driver 1",
      "phone": "081234567801"
    },
    "device": {
      "deviceId": "DEV-SN-0001",
      "status": "active"
    },
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456,
      "recordedAt": "2025-11-03T10:30:00.000Z"
    },
    "sensors": [
      {
        "sensorId": "SN-0001",
        "wheelPosition": "FL",
        "temperature": 28.5,
        "pressure": 35.2,
        "battery": 95,
        "status": "normal"
      },
      {
        "sensorId": "SN-0002",
        "wheelPosition": "FR",
        "temperature": 29.1,
        "pressure": 34.8,
        "battery": 92,
        "status": "normal"
      }
    ]
  }
}
```

---

## Common Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## Testing Workflow

### Step-by-Step Testing Process

1. **Setup Environment**
   - Create Development and Production environments
   - Set `baseUrl` variables

2. **Test Authentication**
   - Login dengan admin credentials
   - Copy token dari response
   - Set token ke environment variable (atau gunakan Test Script)

3. **Test CRUD Operations**
   - Test sequence: Create → Read → Update → Delete
   - Verify responses untuk setiap operation

4. **Test Relations**
   - Create Vendor → Driver → Truck → Device → Sensor
   - Verify foreign key relations

5. **Test IoT Endpoint**
   - Test PATH 1 (hardware data) tanpa auth
   - Test PATH 2 (admin CRUD) dengan auth
   - Verify data tersimpan di database

6. **Test Pagination**
   - Test dengan limit kecil (5, 10)
   - Verify totalPages, currentPage correct

7. **Test Filters & Search**
   - Test search by name, plateNumber, etc.
   - Test filter by status, date range

8. **Test Edge Cases**
   - Invalid IDs (404)
   - Missing required fields (400)
   - Invalid token (401)
   - Duplicate entries (409)

---

## Postman Collection Structure (Recommended)

```
TPMS Backend API
├── 1. Authentication
│   ├── Login
│   └── Get Current User
├── 2. Dashboard
│   ├── Get Overview
│   └── Get Statistics
├── 3. Trucks
│   ├── Get All Trucks
│   ├── Get Truck by ID
│   ├── Create Truck
│   ├── Update Truck
│   └── Delete Truck
├── 4. Drivers
│   ├── Get All Drivers
│   ├── Get Driver by ID
│   ├── Create Driver
│   ├── Update Driver
│   └── Delete Driver
├── 5. Vendors
│   ├── Get All Vendors
│   ├── Get Vendor by ID
│   ├── Create Vendor
│   ├── Update Vendor
│   └── Delete Vendor
├── 6. Devices
│   ├── Get All Devices
│   ├── Get Device by ID
│   ├── Create Device
│   ├── Update Device
│   └── Delete Device
├── 7. Sensors
│   ├── Get All Sensors
│   ├── Get Sensor by ID
│   ├── Create Sensor
│   ├── Update Sensor
│   └── Delete Sensor
├── 8. Sensor Data & History
│   ├── Get Sensor Data
│   └── Get Historical Data
├── 9. Mining Areas
│   ├── Get All Mining Areas
│   ├── Get Mining Area by ID
│   ├── Create Mining Area
│   ├── Update Mining Area
│   └── Delete Mining Area
├── 10. IoT Data Endpoint
│   ├── PATH 1 - Hardware Data (Single Sensor)
│   ├── PATH 1 - Hardware Data (Multiple Sensors)
│   ├── PATH 2 - Create Device
│   ├── PATH 2 - Get Device
│   ├── PATH 2 - Update Device
│   ├── PATH 2 - Delete Device
│   ├── PATH 2 - Create Sensor
│   ├── PATH 2 - Get Sensor
│   ├── PATH 2 - Update Sensor
│   └── PATH 2 - Delete Sensor
└── 11. Fleet Management
    ├── Get Fleet Overview
    └── Get Truck Realtime Data
```

---

## Postman Tips & Tricks

### Auto-save Token After Login

Tambahkan script ini di **Tests tab** pada request Login:

```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set('token', response.data.token);
  console.log('✅ Token saved:', response.data.token);
}
```

### Pre-request Script for Debug

Tambahkan di **Pre-request Script tab**:

```javascript
console.log('=== REQUEST INFO ===');
console.log('URL:', pm.request.url);
console.log('Method:', pm.request.method);
console.log('Body:', pm.request.body);
console.log('Headers:', pm.request.headers);
```

### Test Script untuk Validation

Tambahkan di **Tests tab**:

```javascript
// Check status code
pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

// Check response time
pm.test('Response time is less than 500ms', function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Check response structure
pm.test('Response has success field', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('success');
  pm.expect(jsonData.success).to.eql(true);
});

// Check data structure
pm.test('Response has data field', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('data');
});
```

---

## Quick Reference: Test Data

### Admin Credentials

```
Email: admin@tpms.com
Password: admin123
```

### Sample Trucks

```
Truck 01: B 1001 ABC (Driver 1, Device DEV-SN-0001)
Truck 02: B 1002 ABC (Driver 2, Device DEV-SN-0001)
Truck 03: B 1003 ABC (Driver 3, Device DEV-SN-0002)
...
Truck 10: B 1010 ABC (Driver 10, Device DEV-SN-0002)
```

### Sample Devices

```
DEV-SN-0001 (Truck 01-05, 50 sensors)
DEV-SN-0002 (Truck 06-10, 50 sensors)
```

### Sample Sensors

```
SN-0001 to SN-0100 (100 sensors total)
Wheel positions: FL, FR, RL1, RR1, RL2, RR2, RL3, RR3, RL4, RR4
```

### Sample Vendors

```
Vendor A, Vendor B, Vendor C, Vendor D, Vendor E
```

### Sample Drivers

```
Driver 1-10 (LIC-0001 to LIC-0010)
```

---

## Troubleshooting

### Token Expired

**Error:** `401 Unauthorized - Token expired`  
**Solution:** Login kembali untuk mendapatkan token baru

### Invalid ID

**Error:** `404 Not Found`  
**Solution:** Pastikan ID yang digunakan benar dan exists di database

### Validation Error

**Error:** `400 Bad Request - Validation error`  
**Solution:** Check required fields dan format data

### Database Error

**Error:** `500 Internal Server Error - Database error`  
**Solution:** Check database connection dan migration status

### CORS Error (Browser)

**Error:** `CORS policy blocked`  
**Solution:** Gunakan Postman desktop app atau configure CORS di server

---

## Next Steps

1. ✅ Import collection structure ini ke Postman
2. ✅ Setup environment variables (Development & Production)
3. ✅ Test login dan save token
4. ✅ Test semua endpoint satu per satu
5. ✅ Document hasil testing
6. ✅ Report bugs jika ada

---

**Happy Testing! 🚀**

_Last updated: November 3, 2025_
