# Fleet Management API Documentation

Base URL: `http://localhost:3001`

## Authentication

All endpoints (except login) require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get JWT Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Truck Management Endpoints

### 1. Get All Trucks
```http
GET /api/trucks
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `search` (optional): Search by truck name or model

**Example:**
```http
GET /api/trucks?page=1&limit=10&search=Truck-001
```

### 2. Get Real-time Truck Locations (GeoJSON)
```http
GET /api/trucks/realtime/locations
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "id": "truck-uuid",
          "truckNumber": "Truck-001",
          "name": "Truck-001",
          "model": "Liebherr T282C",
          "status": "active",
          "speed": 45,
          "heading": 180,
          "fuel": 75,
          "payload": 0,
          "driver": null,
          "lastUpdate": "2024-01-08T10:30:00Z",
          "alertCount": 2
        },
        "geometry": {
          "type": "Point",
          "coordinates": [107.6191, -6.9175]
        }
      }
    ]
  }
}
```

### 3. Get Truck Location History by Name
```http
GET /api/trucks/{truckName}/locations
Authorization: Bearer <token>
```

**Query Parameters:**
- `timeRange` (optional): 1h, 6h, 12h, 24h, 7d (default: 24h)
- `limit` (optional): Max number of locations (default: 200)
- `minSpeed` (optional): Minimum speed filter (default: 0)

**Example:**
```http
GET /api/trucks/Truck-001/locations?timeRange=6h&limit=100&minSpeed=5
```

### 4. Get Specific Truck Details
```http
GET /api/trucks/{truckId}
Authorization: Bearer <token>
```

**Example:**
```http
GET /api/trucks/db5bae8e-af2d-4531-9eba-cf30cde1a6e6
```

### 5. Get Truck Tire Pressures
```http
GET /api/trucks/{truckId}/tires
Authorization: Bearer <token>
```

### 6. Get Truck Location History (by ID)
```http
GET /api/trucks/{truckId}/history
Authorization: Bearer <token>
```

### 7. Get Truck Alerts
```http
GET /api/trucks/{truckId}/alerts
Authorization: Bearer <token>
```

### 8. Update Truck Status
```http
PUT /api/trucks/{truckId}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active"
}
```

---

## Dashboard Endpoints

### 1. Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTrucks": 100,
    "activeTrucks": 85,
    "totalAlerts": 12,
    "criticalAlerts": 3,
    "averageSpeed": 42.5,
    "fuelEfficiency": 8.2
  }
}
```

### 2. Get Fleet Summary
```http
GET /api/dashboard/fleet-summary
Authorization: Bearer <token>
```

### 3. Get Alert Summary
```http
GET /api/dashboard/alerts
Authorization: Bearer <token>
```

### 4. Get Fuel Report
```http
GET /api/dashboard/fuel
Authorization: Bearer <token>
```

### 5. Get Maintenance Report
```http
GET /api/dashboard/maintenance
Authorization: Bearer <token>
```

---

## Sensor Data Endpoints

### 1. Tire Pressure Data Ingestion
```http
POST /api/sensors/tpdata
Content-Type: application/json

{
  "truckId": "truck-uuid",
  "tireNo": 1,
  "pressureKpa": 1200,
  "tempCelsius": 45,
  "timestamp": "2024-01-08T10:30:00Z"
}
```

### 2. Hub Temperature Data Ingestion
```http
POST /api/sensors/hubdata
Content-Type: application/json

{
  "truckId": "truck-uuid",
  "hubId": "front-left",
  "temperature": 85,
  "timestamp": "2024-01-08T10:30:00Z"
}
```

### 3. GPS & Device Status Data Ingestion
```http
POST /api/sensors/device
Content-Type: application/json

{
  "truckId": "truck-uuid",
  "latitude": -6.9175,
  "longitude": 107.6191,
  "speed": 45,
  "heading": 180,
  "timestamp": "2024-01-08T10:30:00Z"
}
```

### 4. Lock State Data Ingestion
```http
POST /api/sensors/state
Content-Type: application/json

{
  "truckId": "truck-uuid",
  "lockState": "locked",
  "timestamp": "2024-01-08T10:30:00Z"
}
```

### 5. Generic Raw Sensor Data
```http
POST /api/sensors/raw
Content-Type: application/json

{
  "truckId": "truck-uuid",
  "sensorType": "custom",
  "data": {},
  "timestamp": "2024-01-08T10:30:00Z"
}
```

### 6. Get Queue Statistics
```http
GET /api/sensors/queue/stats
Authorization: Bearer <token>
```

### 7. Trigger Queue Processing
```http
POST /api/sensors/queue/process
Authorization: Bearer <token>
```

---

## Mining Area Endpoints

### 1. Get All Mining Areas (GeoJSON)
```http
GET /api/mining-area
Authorization: Bearer <token>
```

### 2. Get Trucks in Specific Zone
```http
GET /api/mining-area/{zoneName}/trucks
Authorization: Bearer <token>
```

### 3. Get Zone Statistics
```http
GET /api/mining-area/statistics
Authorization: Bearer <token>
```

### 4. Get Zone Activity Report
```http
GET /api/mining-area/activity
Authorization: Bearer <token>
```

### 5. Check Truck in Zones
```http
GET /api/mining-area/trucks/{truckId}/zones
Authorization: Bearer <token>
```

### 6. Get Nearby Trucks
```http
GET /api/mining-area/nearby
Authorization: Bearer <token>
```

### 7. Create Mining Zone
```http
POST /api/mining-area
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Zone A",
  "type": "mining",
  "coordinates": [[[107.6, -6.9], [107.7, -6.9], [107.7, -6.8], [107.6, -6.8], [107.6, -6.9]]]
}
```

### 8. Update Mining Zone
```http
PUT /api/mining-area/{zoneId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Zone A",
  "active": true
}
```

### 9. Delete Mining Zone
```http
DELETE /api/mining-area/{zoneId}
Authorization: Bearer <token>
```

---

## Legacy Compatibility Endpoints

### 1. Location History (Legacy)
```http
GET /api/location-history/{truckName}
Authorization: Bearer <token>
```

### 2. Tracking Data (Legacy)
```http
GET /api/tracking/{truckName}
Authorization: Bearer <token>
```

### 3. Vehicle Data (Legacy)
```http
GET /api/vehicles/{truckName}/locations
Authorization: Bearer <token>
```

---

## WebSocket Endpoints

Connect to WebSocket for real-time updates:
```
ws://localhost:3001
```

**Subscription Messages:**
```json
{
  "action": "subscribe",
  "type": "locations"
}
```

```json
{
  "action": "subscribe", 
  "type": "alerts"
}
```

```json
{
  "action": "subscribe",
  "type": "dashboard"
}
```

---

## Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing Notes

1. **Authentication Required**: All endpoints except `/api/auth/login` require JWT token
2. **Truck Identification**: Use truck `name` (e.g., "Truck-001") for name-based endpoints, `id` (UUID) for ID-based endpoints
3. **Rate Limiting**: WebSocket broadcasts every 30 seconds for locations, 15 seconds for alerts
4. **Data Format**: All timestamps in ISO 8601 format, coordinates in [longitude, latitude] order
5. **PostGIS**: Geographic data uses PostGIS format for spatial queries

## Sample Truck Names for Testing
- Truck-001 through Truck-100
- Use these names for testing truck-specific endpoints
