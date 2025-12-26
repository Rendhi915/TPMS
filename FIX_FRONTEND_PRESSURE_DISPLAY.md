# 🔧 Fix: Tire Pressure Tidak Muncul di Frontend History

## ✅ Status Backend

Backend **SUDAH BEKERJA DENGAN BAIK**! Data pressure tersimpan dan dikembalikan dengan benar.

### Test Result:
```json
{
  "tireNo": 1,
  "position": "Front Left Outer",
  "temperature": 48.91,     ← ✅ MUNCUL DI FRONTEND
  "pressure": 95.91,        ← ❌ TIDAK MUNCUL DI FRONTEND
  "status": "normal",
  "battery": 83
}
```

---

## 🔍 Kemungkinan Penyebab di Frontend

### 1. Frontend Menggunakan Endpoint Yang Salah

**❌ Endpoint Lama (TIDAK ada sensor data):**
```
GET /api/trucks/:id/history
```
Response:
```json
{
  "track": { ... },
  "points": [ ... ]
  // ❌ TIDAK ADA DATA SENSOR!
}
```

**✅ Endpoint Yang Benar (ADA sensor data):**
```
GET /api/history/trucks/:id/timeline
```
Response:
```json
{
  "data": [
    {
      "timestamp": "...",
      "location": { "lat": ..., "lng": ... },
      "tires": [
        {
          "temperature": 48.91,
          "pressure": 95.91  ← DATA ADA DI SINI!
        }
      ]
    }
  ]
}
```

---

### 2. Frontend Menggunakan Nama Field Yang Salah

Backend mengembalikan field: **`pressure`**

Frontend mungkin mencari:
- ❌ `tirepValue` (raw database field)
- ❌ `tirePressure` (camelCase variant)
- ❌ `pressureValue`
- ✅ `pressure` (CORRECT!)

---

### 3. Frontend Tidak Parsing Response Dengan Benar

Contoh error parsing:
```javascript
// ❌ SALAH
tires.forEach(tire => {
  console.log(tire.tirepValue);  // undefined!
});

// ✅ BENAR
tires.forEach(tire => {
  console.log(tire.pressure);  // 95.91
});
```

---

## ✅ Solusi Untuk Frontend

### Solusi 1: Gunakan Endpoint Yang Benar

**Ganti endpoint lama:**
```javascript
// ❌ HAPUS INI
const response = await axios.get(`/api/trucks/${truckId}/history`);

// ✅ GANTI DENGAN INI
const response = await axios.get(`/api/history/trucks/${truckId}/timeline?limit=50`);
```

---

### Solusi 2: Gunakan Nama Field Yang Benar

```javascript
// Response structure
const timeline = response.data.data; // array of records

timeline.forEach(record => {
  const { timestamp, location, tires } = record;
  
  tires.forEach(tire => {
    console.log({
      tireNo: tire.tireNo,
      position: tire.position,
      temperature: tire.temperature,  // ✅ Works
      pressure: tire.pressure,        // ✅ Use this! (not tirepValue)
      status: tire.status,
      battery: tire.battery
    });
  });
});
```

---

### Solusi 3: Complete React/Vue Example

#### React Example:
```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function TruckHistory({ truckId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `/api/history/trucks/${truckId}/timeline?limit=50`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        setHistory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [truckId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="truck-history">
      <h2>History for Truck {truckId}</h2>
      
      {history.map((record, idx) => (
        <div key={idx} className="history-record">
          <h3>Location {idx + 1}</h3>
          <p>Time: {new Date(record.timestamp).toLocaleString()}</p>
          <p>GPS: {record.location.lat}, {record.location.lng}</p>
          
          <h4>Tire Data:</h4>
          <div className="tires-grid">
            {record.tires.map(tire => (
              <div key={tire.tireNo} className="tire-card">
                <h5>Tire {tire.tireNo} - {tire.position}</h5>
                <p>🌡️ Temperature: {tire.temperature}°C</p>
                <p>🔧 Pressure: {tire.pressure} PSI</p>
                <p>⚡ Battery: {tire.battery}%</p>
                <p>Status: <span className={tire.status}>{tire.status}</span></p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TruckHistory;
```

#### Vue Example:
```vue
<template>
  <div class="truck-history">
    <h2>History for Truck {{ truckId }}</h2>
    
    <div v-if="loading">Loading...</div>
    
    <div v-else>
      <div v-for="(record, idx) in history" :key="idx" class="history-record">
        <h3>Location {{ idx + 1 }}</h3>
        <p>Time: {{ formatDate(record.timestamp) }}</p>
        <p>GPS: {{ record.location.lat }}, {{ record.location.lng }}</p>
        
        <h4>Tire Data:</h4>
        <div class="tires-grid">
          <div v-for="tire in record.tires" :key="tire.tireNo" class="tire-card">
            <h5>Tire {{ tire.tireNo }} - {{ tire.position }}</h5>
            <p>🌡️ Temperature: {{ tire.temperature }}°C</p>
            <p>🔧 Pressure: {{ tire.pressure }} PSI</p>
            <p>⚡ Battery: {{ tire.battery }}%</p>
            <p>Status: <span :class="tire.status">{{ tire.status }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TruckHistory',
  props: {
    truckId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      history: [],
      loading: true
    };
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    async fetchHistory() {
      try {
        const response = await axios.get(
          `/api/history/trucks/${this.truckId}/timeline?limit=50`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        this.history = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching history:', error);
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>
```

---

## 🧪 Quick Test di Browser Console

Frontend developer bisa test langsung di browser console:

```javascript
// 1. Get token (jika sudah login)
const token = localStorage.getItem('token');

// 2. Fetch history data
fetch('http://localhost:3001/api/history/trucks/1/timeline?limit=2', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('Full response:', data);
  
  if (data.data && data.data.length > 0) {
    const firstRecord = data.data[0];
    console.log('First record:', firstRecord);
    
    if (firstRecord.tires && firstRecord.tires.length > 0) {
      const firstTire = firstRecord.tires[0];
      console.log('First tire data:', firstTire);
      console.log('Temperature:', firstTire.temperature);
      console.log('Pressure:', firstTire.pressure);  // ← CEK INI!
    }
  }
});
```

Expected output:
```
Pressure: 95.91  ← HARUS ADA VALUE!
```

---

## 📋 Checklist Untuk Frontend Developer

### 1. Cek Endpoint
- [ ] Sudah menggunakan `/api/history/trucks/:id/timeline`
- [ ] Bukan `/api/trucks/:id/history` (ini endpoint lama tanpa sensor data)

### 2. Cek Response Parsing
- [ ] Mengakses `response.data.data` (bukan `response.data`)
- [ ] Loop melalui `tires` array di setiap record
- [ ] Menggunakan field `pressure` (bukan `tirepValue`)

### 3. Cek Display Logic
- [ ] Component menampilkan `tire.pressure`
- [ ] Format pressure dengan benar (e.g., `${pressure.toFixed(2)} PSI`)
- [ ] Tidak ada conditional yang hide pressure value

### 4. Cek Console Errors
- [ ] Tidak ada error "Cannot read property 'pressure' of undefined"
- [ ] Tidak ada error "tirepValue is not defined"

---

## 🔍 Debugging Steps

### Step 1: Log Response
```javascript
const response = await axios.get(`/api/history/trucks/${truckId}/timeline`);
console.log('Response:', response.data);
```

### Step 2: Check Data Structure
```javascript
const timeline = response.data.data;
console.log('Timeline length:', timeline.length);
console.log('First record:', timeline[0]);
console.log('First tire:', timeline[0]?.tires?.[0]);
```

### Step 3: Verify Field Names
```javascript
const firstTire = timeline[0]?.tires?.[0];
console.log('Available fields:', Object.keys(firstTire));
// Should show: ['tireNo', 'position', 'temperature', 'pressure', 'status', 'battery', 'timestamp']
```

### Step 4: Check Value
```javascript
console.log('Pressure value:', firstTire.pressure);
console.log('Pressure type:', typeof firstTire.pressure);
// Should be: number (e.g., 95.91)
```

---

## 📞 Jika Masih Error

Minta frontend developer untuk:

1. **Screenshot console log** dari response API
2. **Screenshot code** yang handle tire data display
3. **Share endpoint URL** yang digunakan

Kemudian kita bisa debug lebih lanjut!

---

## ✅ Summary

**Backend Status:** ✅ **WORKING**
- Data pressure tersimpan di database
- API mengembalikan data pressure dengan benar
- Field name: `pressure` (bukan `tirepValue`)

**Frontend Action Required:**
1. Gunakan endpoint: `/api/history/trucks/:id/timeline`
2. Parse response: `response.data.data[].tires[].pressure`
3. Display: `{tire.pressure} PSI`

---

**Test Command:**
```bash
node scripts/test-history-api.js
```

**Expected:** Pressure values should be visible in API response ✅
