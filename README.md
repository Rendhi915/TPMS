# TPMS Backend API

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.19-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Enterprise REST API for Tire Pressure Monitoring System**

Real-time monitoring and management system for mining fleet tire pressure sensors. Handles IoT data processing, automated alerts, fleet management, and analytics dashboards.

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

# Start server
npm run dev
```

Server runs at `http://localhost:5000`

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
