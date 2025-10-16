# 🧪 TPMS API Testing Checklist
## Comprehensive Endpoint Testing Guide

### 🔑 Base Configuration
```
Base URL: http://localhost:3001/api
WebSocket: ws://localhost:3001/ws
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

---

## 🔐 Authentication (Test First)

### ✅ POST /api/auth/login
**Priority: HIGH - Test this first to get JWT token**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### ✅ POST /api/auth/logout
```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🚛 Truck Management Endpoints

### ✅ GET /api/trucks
**Basic truck listing with pagination**
```bash
curl -X GET "http://localhost:3001/api/trucks?page=1&limit=10" \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/trucks/realtime/locations
**Real-time truck locations (GeoJSON)**
```bash
curl -X GET http://localhost:3001/api/trucks/realtime/locations \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/trucks/:id
**Get specific truck details**
```bash
curl -X GET http://localhost:3001/api/trucks/<truck_uuid> \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/trucks/:id/tires
**Get truck tire pressure data**
```bash
curl -X GET http://localhost:3001/api/trucks/<truck_uuid>/tires \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/trucks/:truckName/locations
**Get truck location history by name**
```bash
curl -X GET "http://localhost:3001/api/trucks/Truck-001/locations?timeRange=24h&limit=100" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 POST /api/trucks
**🔥 CRUD ENDPOINT - Create new truck**
```bash
curl -X POST http://localhost:3001/api/trucks \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test-Truck-001",
    "code": "TT001",
    "model": "Caterpillar 797F",
    "year": 2024,
    "tire_config": "18R33",
    "vendor_id": "vendor-uuid-here",
    "fleet_group_id": "group-uuid-here"
  }'
```

### 🆕 PUT /api/trucks/:id
**🔥 CRUD ENDPOINT - Update truck**
```bash
curl -X PUT http://localhost:3001/api/trucks/<truck_uuid> \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated-Truck-001",
    "model": "Caterpillar 797G",
    "year": 2025
  }'
```

### ✅ PUT /api/trucks/:id/status
**Update truck status**
```bash
curl -X PUT http://localhost:3001/api/trucks/<truck_uuid>/status \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "maintenance"}'
```

### 🆕 DELETE /api/trucks/:id
**🔥 CRUD ENDPOINT - Delete truck**
```bash
curl -X DELETE http://localhost:3001/api/trucks/<truck_uuid> \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🏢 Vendor Management (CRUD Endpoints)

### 🆕 GET /api/vendors
**🔥 CRUD ENDPOINT - Get all vendors**
```bash
curl -X GET http://localhost:3001/api/vendors \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/vendors/:vendorId
**🔥 CRUD ENDPOINT - Get specific vendor**
```bash
curl -X GET http://localhost:3001/api/vendors/1 \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/vendors/:vendorId/trucks
**🔥 CRUD ENDPOINT - Get vendor's trucks**
```bash
curl -X GET "http://localhost:3001/api/vendors/1/trucks?page=1&limit=10" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 POST /api/vendors
**🔥 CRUD ENDPOINT - Create new vendor**
```bash
curl -X POST http://localhost:3001/api/vendors \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_vendor": "PT Test Mining Solutions",
    "address": "Jl. Test Mining No. 123",
    "nomor_telepon": "021-12345678",
    "email": "test@mining.com",
    "kontak_person": "John Doe"
  }'
```

### 🆕 PUT /api/vendors/:vendorId
**🔥 CRUD ENDPOINT - Update vendor**
```bash
curl -X PUT http://localhost:3001/api/vendors/1 \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_vendor": "PT Updated Mining Solutions",
    "address": "Jl. Updated Mining No. 456",
    "nomor_telepon": "021-87654321"
  }'
```

### 🆕 DELETE /api/vendors/:vendorId
**🔥 CRUD ENDPOINT - Delete vendor**
```bash
curl -X DELETE http://localhost:3001/api/vendors/1 \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 👷 Driver Management (CRUD Endpoints)

### 🆕 GET /api/drivers
**🔥 CRUD ENDPOINT - Get all drivers**
```bash
curl -X GET "http://localhost:3001/api/drivers?page=1&limit=10&status=aktif" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/drivers/:driverId
**🔥 CRUD ENDPOINT - Get specific driver**
```bash
curl -X GET http://localhost:3001/api/drivers/1 \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/drivers/expiring-licenses
**🔥 CRUD ENDPOINT - Get drivers with expiring licenses**
```bash
curl -X GET "http://localhost:3001/api/drivers/expiring-licenses?days=30" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 POST /api/drivers
**🔥 CRUD ENDPOINT - Create new driver**
```bash
curl -X POST http://localhost:3001/api/drivers \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Driver",
    "phone": "081234567890",
    "email": "testdriver@example.com",
    "address": "Jl. Test Driver No. 123",
    "license_number": "SIM123456789",
    "license_type": "SIM A",
    "license_expiry": "2025-12-31",
    "id_card_number": "3201234567890123",
    "vendor_id": 1,
    "status": "aktif"
  }'
```

### 🆕 PUT /api/drivers/:driverId
**🔥 CRUD ENDPOINT - Update driver**
```bash
curl -X PUT http://localhost:3001/api/drivers/1 \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Driver",
    "phone": "081987654321",
    "license_expiry": "2026-12-31"
  }'
```

### 🆕 DELETE /api/drivers/:driverId
**🔥 CRUD ENDPOINT - Soft delete driver (set status to nonaktif)**
```bash
curl -X DELETE http://localhost:3001/api/drivers/1 \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🔧 Device & Sensor Management (CRUD Endpoints)

### 🆕 GET /api/devices
**🔥 CRUD ENDPOINT - Get all devices**
```bash
curl -X GET "http://localhost:3001/api/devices?page=1&limit=10&status=active" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/devices/:deviceId
**🔥 CRUD ENDPOINT - Get specific device**
```bash
curl -X GET http://localhost:3001/api/devices/<device_uuid> \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 POST /api/devices
**🔥 CRUD ENDPOINT - Create new device**
```bash
curl -X POST http://localhost:3001/api/devices \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sn": "DEV123456789",
    "sim_number": "628123456789",
    "truck_id": "<truck_uuid>",
    "installed_at": "2024-01-15T10:00:00Z"
  }'
```

### 🆕 PUT /api/devices/:deviceId
**🔥 CRUD ENDPOINT - Update device**
```bash
curl -X PUT http://localhost:3001/api/devices/<device_uuid> \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sim_number": "628987654321",
    "truck_id": "<new_truck_uuid>"
  }'
```

### 🆕 DELETE /api/devices/:deviceId
**🔥 CRUD ENDPOINT - Delete/deactivate device**
```bash
curl -X DELETE http://localhost:3001/api/devices/<device_uuid> \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 GET /api/devices/sensors/all
**🔥 CRUD ENDPOINT - Get all sensors**
```bash
curl -X GET "http://localhost:3001/api/devices/sensors/all?page=1&limit=10" \
  -H "Authorization: Bearer <jwt_token>"
```

### 🆕 POST /api/devices/sensors
**🔥 CRUD ENDPOINT - Create new sensor**
```bash
curl -X POST http://localhost:3001/api/devices/sensors \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sn": "SENSOR123456789",
    "type": "tire_pressure",
    "position_no": 1,
    "device_id": "<device_uuid>"
  }'
```

---

## 📊 Dashboard Endpoints

### ✅ GET /api/dashboard/stats
**Basic dashboard statistics**
```bash
curl -X GET http://localhost:3001/api/dashboard/stats \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/dashboard/fleet-summary
**Comprehensive fleet summary**
```bash
curl -X GET http://localhost:3001/api/dashboard/fleet-summary \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/dashboard/alerts
**Alert summary with time filtering**
```bash
curl -X GET "http://localhost:3001/api/dashboard/alerts?timeRange=24h" \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/dashboard/fuel
**Fuel report and analytics**
```bash
curl -X GET http://localhost:3001/api/dashboard/fuel \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/dashboard/maintenance
**Maintenance report**
```bash
curl -X GET http://localhost:3001/api/dashboard/maintenance \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🔧 Sensor Data Ingestion

### ✅ POST /api/sensors/tpdata
**Tire pressure data ingestion**
```bash
curl -X POST http://localhost:3001/api/sensors/tpdata \
  -H "Content-Type: application/json" \
  -d '{
    "sn": "DEVICE123",
    "truckId": "<truck_uuid>",
    "data": {
      "tireNo": 1,
      "tiprValue": 850.5,
      "tempValue": 45.2,
      "bat": 85
    }
  }'
```

### ✅ POST /api/sensors/device
**GPS and device status data**
```bash
curl -X POST http://localhost:3001/api/sensors/device \
  -H "Content-Type: application/json" \
  -d '{
    "sn": "DEVICE123",
    "data": {
      "lat": -6.2088,
      "lng": 106.8456,
      "bat1": 85,
      "bat2": 78,
      "bat3": 82,
      "lock": 1
    }
  }'
```

### ✅ GET /api/sensors/queue/stats
**Sensor processing queue statistics**
```bash
curl -X GET http://localhost:3001/api/sensors/queue/stats \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🌐 WebSocket Testing

### ✅ WebSocket Connection Test
**Connect and test real-time features**
```javascript
// Use browser console or Node.js WebSocket client
const ws = new WebSocket('ws://localhost:3001/ws');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  
  // Subscribe to truck updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'truck_updates',
    requestId: 'test-001'
  }));
  
  // Subscribe to alerts
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'alerts',
    requestId: 'test-002'
  }));
  
  // Get dashboard data
  ws.send(JSON.stringify({
    type: 'get_dashboard',
    requestId: 'test-003'
  }));
};

ws.onmessage = (event) => {
  console.log('Received:', JSON.parse(event.data));
};
```

---

## 🚨 Health Check & System

### ✅ GET /health
**Basic server health check**
```bash
curl -X GET http://localhost:3001/health
```

### ✅ GET /
**API root endpoint**
```bash
curl -X GET http://localhost:3001/
```

---

## 🔍 Mining Area Endpoints

### ✅ GET /api/mining-area
**Get mining areas (GeoJSON)**
```bash
curl -X GET http://localhost:3001/api/mining-area \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🚚 Fleet Compatibility

### ✅ GET /api/fleet/locations
**Fleet locations (compatibility endpoint)**
```bash
curl -X GET http://localhost:3001/api/fleet/locations \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 📍 Location History Compatibility

### ✅ GET /api/location-history/:truckName
**Truck location history (compatibility)**
```bash
curl -X GET http://localhost:3001/api/location-history/Truck-001 \
  -H "Authorization: Bearer <jwt_token>"
```

### ✅ GET /api/tracking/:truckName/history
**Tracking history (compatibility)**
```bash
curl -X GET http://localhost:3001/api/tracking/Truck-001/history \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 🎯 Testing Priority Order

### 🔥 **PHASE 1: CRUD Endpoints (Test These First)**
1. **Authentication** - `/api/auth/login` (Get JWT token first!)
2. **Vendors CRUD** - `/api/vendors` (POST, GET, PUT, DELETE)
3. **Drivers CRUD** - `/api/drivers` (POST, GET, PUT, DELETE)
4. **Trucks CRUD** - `/api/trucks` (POST, GET, PUT, DELETE)
5. **Devices CRUD** - `/api/devices` (POST, GET, PUT, DELETE)
6. **Sensors CRUD** - `/api/devices/sensors` (POST, GET, PUT, DELETE)

### ⚡ **PHASE 2: Core Features**
1. **Real-time Locations** - `/api/trucks/realtime/locations`
2. **Dashboard Stats** - `/api/dashboard/stats`
3. **Sensor Ingestion** - `/api/sensors/tpdata`, `/api/sensors/device`

### 🌐 **PHASE 3: Real-time & Advanced**
1. **WebSocket Connection** - `ws://localhost:3001/ws`
2. **Location History** - `/api/trucks/:truckName/locations`
3. **Advanced Dashboard** - `/api/dashboard/fleet-summary`

---

## 📝 Testing Notes

1. **Authentication Required**: Most endpoints require JWT token from `/api/auth/login`
2. **CRUD Endpoints**: Highlighted with 🔥 - these are the newly created CRUD operations
3. **UUIDs vs IDs**: Some endpoints use UUID (trucks, devices), others use integer IDs (vendors, drivers)
4. **Pagination**: Most list endpoints support `page` and `limit` parameters
5. **Status Codes**: Check for 200/201 (success), 400 (bad request), 401 (unauthorized), 404 (not found)
6. **Real-time**: WebSocket endpoints provide live updates every 15-60 seconds
7. **Data Dependencies**: Create vendors first, then drivers/trucks, then devices/sensors

## 🛠️ Postman Collection
Consider creating a Postman collection with all these endpoints for easier testing with proper environment variables for `base_url` and `jwt_token`.
