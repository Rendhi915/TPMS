# IoT Data API - Quick Reference

## Endpoint
```
POST /api/iot/data
```

## Authentication
```
Authorization: Bearer YOUR_TOKEN
```

---

## 1. TPDATA (Temperature & Pressure)
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
**Updates:** `sensor_data` table

---

## 2. HUBDATA (Device Battery & SIM)
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
**Updates:** `device` table (bat1, bat2, bat3, sim_number)

---

## 3. STATE (Device Status)
```json
{
  "cmd": "state",
  "sn": "DEVICE123",
  "status": "active"
}
```
**Updates:** `device` table (status)
**Valid status:** `active`, `inactive`, `maintenance`

---

## 4. LOCK (Lock Status)
```json
{
  "cmd": "lock",
  "sn": "DEVICE123",
  "lock": 1,
  "type": "device"
}
```
**Updates:** `device.lock` OR `sensor.sensor_lock`
**Lock values:** `0` (unlocked), `1` (locked)
**Type:** `device` or `sensor` (optional, auto-detect if not provided)

---

## cURL Examples

```bash
# TPDATA
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cmd":"tpdata","sn":"SENSOR123","tempValue":85.5,"tirepValue":32.5}'

# HUBDATA
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cmd":"hubdata","sn":"DEVICE123","bat1":85,"bat2":90}'

# STATE
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cmd":"state","sn":"DEVICE123","status":"active"}'

# LOCK
curl -X POST http://localhost:5009/api/iot/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cmd":"lock","sn":"DEVICE123","lock":1}'
```

---

## Testing
```bash
node scripts/test-iot-data.js
```

**Note:** Update `TEST_SENSOR_SN` and `TEST_DEVICE_SN` in test file with valid data from your database.
