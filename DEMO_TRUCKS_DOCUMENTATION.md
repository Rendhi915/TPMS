# 🚛 Demo Trucks Documentation

**Created:** 2025-10-17  
**Trucks:** truck-spiderman & truck-ironman  
**Purpose:** Live tracking testing with complete TPMS sensor data

---

## 📋 Overview

Script ini membuat 2 truck demo yang fully equipped untuk testing live tracking di frontend:

### Truck Specifications

#### 🕷️ **truck-spiderman**
- **Model:** Caterpillar 797F
- **Code:** SPMN
- **Year:** 2022
- **VIN:** CAT797FSPMN000001
- **Device SN:** DEVICE-SPIDERMAN-001
- **SIM Number:** 628123456789
- **Status:** All tires normal (no anomalies)

#### 🦾 **truck-ironman**
- **Model:** Komatsu 980E-4
- **Code:** IRMN
- **Year:** 2023
- **VIN:** KOM980EIRMN000001
- **Device SN:** DEVICE-IRONMAN-001
- **SIM Number:** 628987654321
- **Status:** All tires normal (no anomalies)

---

## 🔧 Tire Configuration (10 Wheels)

Konfigurasi standar mining truck dengan 10 roda:

| Tire No | Position Name | Type | Wheel Type |
|---------|---------------|------|------------|
| 1 | Front Left | front | single |
| 2 | Front Right | front | single |
| 3 | Rear Left Outer | rear | dual_outer |
| 4 | Rear Left Inner | rear | dual_inner |
| 5 | Rear Right Outer | rear | dual_outer |
| 6 | Rear Right Inner | rear | dual_inner |
| 7 | Rear2 Left Outer | rear | dual_outer |
| 8 | Rear2 Left Inner | rear | dual_inner |
| 9 | Rear2 Right Outer | rear | dual_outer |
| 10 | Rear2 Right Inner | rear | dual_inner |

---

## 📊 Sensor Data

### Normal Values (All Tires)
- **Tire Pressure:** 700-900 kPa
- **Tire Temperature:** 30-50°C
- **Battery Level:** 80-100%

**Note:** Anomaly detection is currently disabled. All tires will have normal values.

---

## 📍 GPS Location

Trucks akan ditempatkan secara random di dalam area tambang **PT BORNEO INDOBARA**:

**Coordinates Range:**
- Longitude: 115.432199 to 115.658299
- Latitude: -3.717200 to -3.431898
- Location: Kalimantan, Indonesia

---

## 🗄️ Database Tables Populated

Script ini akan mengisi tabel-tabel berikut:

1. **truck** - Data truck utama
2. **device** - Device GPS/TPMS untuk setiap truck
3. **device_truck_assignment** - Assignment device ke truck
4. **sensor** - 10 sensor TPMS per truck
5. **tire_position_config** - Konfigurasi posisi roda
6. **tire_pressure_event** - Data tekanan & suhu ban
7. **gps_position** - Posisi GPS truck
8. **sensor_data_raw** - Raw sensor data (untuk API compatibility)
9. **truck_status_event** - Status truck (active)

---

## 🚀 Usage

### Run Seeder

```bash
node scripts/seed-demo-trucks.js
```

### Expected Output

```
🚀 Starting Demo Trucks Seeder...
📍 Mining Area: PT BORNEO INDOBARA
   Coordinates: [115.432199, -3.717200] to [115.658299, -3.431898]

🚛 Creating truck-spiderman...
   ✅ Truck created: <uuid>
   ✅ Device created: DEVICE-SPIDERMAN-001
   ✅ Tire positions configured (10 wheels)
   ✅ Sensors created (10 TPMS sensors)
   ✅ GPS position: [115.545123, -3.567890]
   ✅ Tire pressure/temperature data generated
   ✅ Sensor raw data inserted for API compatibility

   📊 Summary for truck-spiderman:
      - Truck ID: <uuid>
      - Device SN: DEVICE-SPIDERMAN-001
      - SIM Number: 628123456789
      - Location: [115.545123, -3.567890]
      - Tires: 10 wheels configured
      - Sensors: 10 TPMS sensors active
      - ✅ All tires normal (no anomalies)

🚛 Creating truck-ironman...
   [similar output]

✅ Demo trucks seeding completed!
```

---

## 🧪 Testing

### 1. Test Trucks API

```bash
# Get all trucks
curl http://localhost:3001/api/trucks

# Get specific truck
curl http://localhost:3001/api/trucks/<truck_id>
```

### 2. Test Sensor Data API

```bash
# Get last sensor data (all)
curl http://localhost:3001/api/sensors/last

# Get tire pressure data only
curl http://localhost:3001/api/sensors/last?cmd_type=tpdata

# Get data from specific device
curl http://localhost:3001/api/sensors/last?device_sn=DEVICE-SPIDERMAN-001
```

### 3. Test Live Tracking API

```bash
# Get real-time locations (GeoJSON)
curl http://localhost:3001/api/trucks/realtime-locations

# Get truck tire data
curl http://localhost:3001/api/trucks/<truck_id>/tires
```

### 4. Test WebSocket

```javascript
const ws = new WebSocket('ws://localhost:3001/ws');

ws.onopen = () => {
  // Subscribe to truck updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'truckUpdates'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

---

## 📊 Expected API Responses

### GET /api/trucks

```json
{
  "success": true,
  "data": {
    "trucks": [
      {
        "id": "uuid",
        "name": "truck-spiderman",
        "code": "SPMN",
        "model": "Caterpillar 797F",
        "year": 2022,
        "device": [
          {
            "sn": "DEVICE-SPIDERMAN-001",
            "sim_number": "628123456789"
          }
        ]
      }
    ]
  }
}
```

### GET /api/sensors/last?cmd_type=tpdata&limit=5

```json
{
  "message": "Data retrieved successfully",
  "count": 5,
  "data": [
    {
      "id": 1,
      "sn": "DEVICE-SPIDERMAN-001",
      "cmd": "tpdata",
      "createdAt": "2025-10-17T08:30:00.000Z",
      "simNumber": "628123456789",
      "tireNo": 1,
      "exType": "1,3",
      "tiprValue": 823.4,
      "tempValue": 42.1,
      "bat": 95
    }
  ]
}
```

### GET /api/trucks/realtime-locations

```json
{
  "success": true,
  "data": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [115.545123, -3.567890]
        },
        "properties": {
          "truckId": "uuid",
          "name": "truck-spiderman",
          "model": "Caterpillar 797F",
          "speed": 25.3,
          "heading": 180.5
        }
      }
    ]
  }
}
```

---

## 🔄 Re-running the Seeder

Jika ingin menjalankan ulang seeder:

### Option 1: Delete existing trucks manually

```sql
-- Delete in correct order to respect foreign keys
DELETE FROM sensor_data_raw WHERE device_sn IN ('DEVICE-SPIDERMAN-001', 'DEVICE-IRONMAN-001');
DELETE FROM tire_pressure_event WHERE truck_id IN (SELECT id FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman'));
DELETE FROM gps_position WHERE truck_id IN (SELECT id FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman'));
DELETE FROM sensor WHERE device_id IN (SELECT id FROM device WHERE sn IN ('DEVICE-SPIDERMAN-001', 'DEVICE-IRONMAN-001'));
DELETE FROM tire_position_config WHERE truck_id IN (SELECT id FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman'));
DELETE FROM device_truck_assignment WHERE truck_id IN (SELECT id FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman'));
DELETE FROM truck_status_event WHERE truck_id IN (SELECT id FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman'));
DELETE FROM device WHERE sn IN ('DEVICE-SPIDERMAN-001', 'DEVICE-IRONMAN-001');
DELETE FROM truck WHERE name IN ('truck-spiderman', 'truck-ironman');
```

### Option 2: Use different truck names

Edit `TRUCKS` array in script dan ganti nama truck.

---

## 🎯 Frontend Integration

### Live Tracking Display

Frontend dapat menampilkan:

1. **Map View:**
   - Posisi real-time 2 trucks di peta
   - Marker dengan icon truck
   - Info popup dengan detail truck

2. **Tire Pressure Dashboard:**
   - Grid 10 roda per truck
   - Color coding: Green (normal), Yellow (warning), Red (critical)
   - Real-time pressure & temperature values

3. **Alert Panel:**
   - Currently no anomalies (all tires normal)
   - Can be enabled later by modifying `shouldHaveAnomaly()` function

### WebSocket Subscription

```javascript
// Subscribe to specific truck updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'truckUpdates',
  truckId: '<truck-uuid>'
}));

// Listen for updates
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  if (update.type === 'tire_pressure_update') {
    updateTireDashboard(update.data);
  }
  if (update.type === 'gps_update') {
    updateMapMarker(update.data);
  }
};
```

---

## 📝 Notes

1. **Data Persistence:** Data akan tersimpan di database sampai dihapus manual
2. **Anomalies:** Currently disabled - all tires use normal values (700-900 kPa, 30-50°C)
3. **GPS Position:** Random dalam area tambang, tidak bergerak (static)
4. **Battery Levels:** Random 80-100% untuk realism
5. **Timestamps:** Menggunakan current timestamp saat seeder dijalankan

---

## 🐛 Troubleshooting

### Error: "Truck already exists"
**Solution:** Truck dengan nama yang sama sudah ada. Hapus dulu atau gunakan nama lain.

### Error: "Foreign key constraint"
**Solution:** Pastikan menghapus data dalam urutan yang benar (lihat Option 1 di atas).

### Error: "Device SN already exists"
**Solution:** Device serial number harus unique. Hapus device yang lama atau ganti SN.

### Data tidak muncul di API
**Solution:** 
- Cek apakah seeder berhasil (lihat output log)
- Restart server jika perlu
- Verify dengan query database langsung

---

## ✅ Success Criteria

Seeder berhasil jika:

- [x] 2 trucks created (truck-spiderman & truck-ironman)
- [x] 2 devices created dengan SN unik
- [x] 20 sensors total (10 per truck)
- [x] 20 tire pressure events (10 per truck)
- [x] 2 GPS positions (1 per truck)
- [x] All tires with normal values (no anomalies)
- [x] Data muncul di GET /api/trucks
- [x] Data muncul di GET /api/sensors/last
- [x] Data muncul di GET /api/trucks/realtime-locations

---

**Ready for Live Tracking! 🚀**
