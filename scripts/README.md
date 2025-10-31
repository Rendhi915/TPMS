# Scripts Documentation

Folder ini berisi utility scripts untuk TPMS Backend.

## 📋 Available Scripts

### 1️⃣ **prisma-seed.js** - User Admin Seeder
**Fungsi:** Membuat user admin default untuk login ke sistem

**Cara Jalankan:**
```bash
node scripts/prisma-seed.js
```

**Data yang Dibuat:**
- Email: `admin@tpms.com`
- Password: `admin123`
- Role: `superadmin`
- Status: `active`

**Kapan Digunakan:**
- Setup awal database
- Reset user admin
- Testing login

---

### 2️⃣ **seed-2-devices-sensors.js** - Device & Sensor Seeder
**Fungsi:** Membuat data lengkap untuk testing: vendor, driver, truck, device, dan sensor

**Cara Jalankan:**
```bash
node scripts/seed-2-devices-sensors.js
```

**Data yang Dibuat:**
- 1 Vendor (PT Angkutan Maju)
- 2 Driver (Ahmad Hidayat, Budi Rahmat)
- 2 Truck (Dump Truck DT-001, DT-002)
- 2 Device (DEV-001, DEV-002)
- 20 Sensor (10 sensor per device, untuk 10 roda)
- Initial location untuk setiap device

**Kapan Digunakan:**
- Setup awal untuk development
- Testing IoT CMD endpoint
- Demo sistem

---

### 3️⃣ **seed-trucks-10wheels.js** - Truck Seeder
**Fungsi:** Membuat data truck 10 roda

**Cara Jalankan:**
```bash
node scripts/seed-trucks-10wheels.js
```

**Data yang Dibuat:**
- Multiple trucks dengan tipe 10 roda
- Lengkap dengan vendor dan driver

**Kapan Digunakan:**
- Perlu banyak data truck untuk testing
- Testing dashboard dengan banyak fleet

---

### 4️⃣ **check-users.js** - User Checker
**Fungsi:** Melihat semua user admin yang ada di database

**Cara Jalankan:**
```bash
node scripts/check-users.js
```

**Output:**
- Daftar semua user admin
- Detail: name, email, role, status, last login

**Kapan Digunakan:**
- Verifikasi user setelah seeding
- Debugging authentication issues
- Melihat user yang ada

---

### 5️⃣ **kill-port.js** - Port Killer Utility
**Fungsi:** Membunuh process yang menggunakan port tertentu

**Cara Jalankan:**
```bash
node scripts/kill-port.js <port-number>

# Contoh:
node scripts/kill-port.js 3000
```

**Kapan Digunakan:**
- Port sudah terpakai (EADDRINUSE error)
- Restart server yang hang
- Development cleanup

---

## 🚀 Quick Start Guide

### Setup Database Pertama Kali:
```bash
# 1. Jalankan migrasi database
npx prisma migrate dev

# 2. Buat user admin
node scripts/prisma-seed.js

# 3. Buat data testing (vendor, driver, truck, device, sensor)
node scripts/seed-2-devices-sensors.js

# 4. Verifikasi user
node scripts/check-users.js
```

### Testing IoT Endpoint:
```bash
# 1. Pastikan data sudah ada
node scripts/seed-2-devices-sensors.js

# 2. Cek file testing
# Lihat: docs/TESTING_IOT_CMD_STEP_BY_STEP.md

# 3. Test dengan Postman atau cURL
```

### Reset Data:
```bash
# Reset user admin
node scripts/prisma-seed.js

# Reset device & sensor
node scripts/seed-2-devices-sensors.js
```

---

## 📝 Notes

- Semua script aman dijalankan berkali-kali (ada pengecekan data existing)
- Script akan skip jika data sudah ada
- Untuk full reset, hapus manual dari database atau gunakan Prisma Studio

---

## 🗑️ Removed Scripts

Scripts berikut sudah dihapus karena tidak digunakan lagi:
- ❌ `add-sensor-columns.js` - Migration script (one-time use)
- ❌ `add-sensor-columns.sql` - SQL migration (one-time use)
- ❌ `seed-devices-sensors.js` - Old seeder (replaced by seed-2-devices-sensors.js)
- ❌ `quick-test-iot.js` - Testing script (replaced by Postman collection)
- ❌ `test-crud-endpoints.js` - Testing script (replaced by Postman collection)
- ❌ `test-iot-data.js` - Testing script (replaced by Postman collection)
- ❌ `test-truck-image-upload.js` - Testing script (replaced by Postman collection)

---

## 📚 Related Documentation

- API Testing: `docs/TESTING_IOT_CMD_STEP_BY_STEP.md`
- IoT API Reference: `docs/IOT_DATA_API.md`
- Postman Collection: `postman/TPMS-IoT-CMD-Testing.postman_collection.json`
