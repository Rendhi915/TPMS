# TPMS Backend API

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.19-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Enterprise REST API for Tire Pressure Monitoring System**

Real-time monitoring and management system for mining fleet tire pressure sensors. Handles IoT data processing, automated alerts, fleet management, historical analytics, and location tracking.

---

## 📖 Documentation

### **🚀 Quick Start**
- [Quick Start Workflow](./docs/QUICK_START_WORKFLOW.md) - Understand system in 5 minutes

### **📊 System Architecture**
- [System Workflow Diagram](./docs/SYSTEM_WORKFLOW_DIAGRAM.md) - Complete workflow & architecture
- [Visual Diagrams (Mermaid)](./docs/VISUAL_WORKFLOW_DIAGRAMS.md) - Interactive flowcharts

### **👥 User Management**
- [Frontend Integration Guide](./docs/USER_MANAGEMENT_FRONTEND_GUIDE.md) - User management API

### **📍 Location & Sensor Tracking**
- [Sensor Location History](./docs/FRONTEND_SENSOR_LOCATION_HISTORY_GUIDE.md) - GPS + Sensor timeline

### **🚨 Alert System**
- [Alert API Documentation](./docs/ALERT_API_DOCUMENTATION.md) - Alert management

### **🔧 Testing & Deployment**
- [Testing Guide](./TESTING_GUIDE.md) - How to test endpoints
- [Ngrok Troubleshooting](./NGROK_TROUBLESHOOTING.md) - Remote access setup

---

## ✨ Key Features

- 🚛 **Fleet Management** - Complete truck, device, and sensor management
- 📍 **Location Tracking** - GPS tracking with historical timeline
- 📊 **Sensor History** - Historical snapshots of tire conditions ⭐ **NEW**
- 🚨 **Alert System** - Automated anomaly detection and notifications
- 📈 **Analytics** - Statistics and trends for tire performance
- 🔄 **Real-time Updates** - WebSocket support for live data
- 🔐 **Security** - JWT authentication and role-based access

---

## Tech Stack

- **Runtime:** Node.js 18+ | Express.js 4.21
- **Database:** PostgreSQL 14 + PostGIS | Prisma ORM 5.18
- **Security:** JWT, bcrypt, Helmet, CORS
- **Real-time:** WebSocket (ws)

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/training-solonet/tpms-backend.git
cd tpms-backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npx prisma migrate dev
npx prisma generate

# Seed data (optional)
npm run seed

# Start server
npm run dev
```

Server runs at `http://localhost:3000`  
WebSocket at `ws://localhost:3001`

---

## 🆕 What's New - Sensor History (v2.0)

### Historical Data Tracking
Track tire sensor readings over time with GPS location linkage:

```bash
# Get location history with tire data
GET /api/v1/history/trucks/:truckId

# Get sensor statistics
GET /api/v1/history/trucks/:truckId/stats
```

**Response Example:**
```json
{
  "timestamp": "2025-12-18T07:31:12.097Z",
  "location": { "lat": -3.429668, "lng": 115.559287 },
  "tires": [
    {
      "tireNo": 1,
      "position": "Front Left Outer",
      "temperature": 55.49,
      "pressure": 92.08,
      "status": "normal",
      "battery": 99
    }
    // ... 9 more tires
  ]
}
```

**Use Cases:**
- Timeline playback of truck routes
- Temperature/pressure trend analysis
- Alert investigation
- Maintenance planning

📚 **Full Documentation:** [Frontend Integration Guide](./docs/FRONTEND_SENSOR_LOCATION_HISTORY_GUIDE.md)

---

## Configuration

Required environment variables in `.env`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/tpms_db
JWT_SECRET=your-64-character-secure-random-string
FRONTEND_URL=http://localhost:3000
PORT=5000
```

Generate secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/login     - Login and get JWT token
GET    /api/auth/me        - Get current user
```

### Core Resources

```
GET    /api/trucks         - List trucks (paginated)
GET    /api/drivers        - List drivers
GET    /api/vendors        - List vendors
POST   /api/sensors/raw-data   - Receive IoT sensor data
GET    /api/dashboard/statistics   - Dashboard stats
GET    /api/alerts         - Active alerts
```

**Authentication:** All endpoints require `Authorization: Bearer <token>` header except `/api/auth/login`

**Example:**

```bash
curl -X GET http://localhost:5000/api/trucks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Project Structure

```
tpms-backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth, validation
│   ├── routes/         # API routes
│   └── services/       # Business logic
├── prisma/
│   └── schema.prisma   # Database schema
├── scripts/            # Utilities
└── server.js           # Entry point
```

---

## API Documentation

### Real-Time Tracking Endpoints

**Get Realtime Tire Data:**
```bash
GET /api/iot/realtime/tires/:sn
```
Returns tire pressure & temperature with latest location.

**Get Realtime Location History:**
```bash
GET /api/iot/realtime/locations/:sn
```
Returns location tracking history for a device.

📖 **Full Documentation:**
- [Real-Time Tracking API](docs/REALTIME_TRACKING_API.md)
- [Implementation Guide](docs/REALTIME_TRACKING_IMPLEMENTATION.md)
- [IoT API Testing Guide](docs/IOT_API_TESTING_GUIDE.md)
- [Postman Collection](docs/POSTMAN_DOCUMENTATION.md)

---

## Development

```bash
# Run with auto-reload
npm run dev

# Lint & format
npm run lint
npm run format

# Database
npx prisma studio       # GUI for database
npx prisma migrate dev  # Create migration

# Test realtime endpoints
node scripts/test-realtime-endpoints.js
```

---

## Production Deployment

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js --env production

# Monitor
pm2 monit
```

**Deployment checklist:**

- Set `NODE_ENV=production`
- Generate strong JWT_SECRET (64+ chars)
- Configure CORS whitelist
- Enable HTTPS
- Run `npx prisma migrate deploy`

**Version 2.0.0** | Built with Express.js, Prisma, and PostgreSQL
