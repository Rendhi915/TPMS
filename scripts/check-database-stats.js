// Script to check database statistics
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function checkDatabaseStats() {
  try {
    console.log('\n📊 DATABASE STATISTICS CHECK\n');
    console.log('='.repeat(60));

    // Check main tables
    const truckCount = await prisma.truck.count();
    const deviceCount = await prisma.device.count();
    const sensorCount = await prisma.sensor.count();
    const vendorCount = await prisma.vendors.count();
    const driverCount = await prisma.drivers.count();
    const fleetGroupCount = await prisma.fleet_group.count();

    console.log('\n📁 MASTER DATA:');
    console.log(`   Trucks:       ${truckCount.toLocaleString()}`);
    console.log(`   Devices:      ${deviceCount.toLocaleString()}`);
    console.log(`   Sensors:      ${sensorCount.toLocaleString()}`);
    console.log(`   Vendors:      ${vendorCount.toLocaleString()}`);
    console.log(`   Drivers:      ${driverCount.toLocaleString()}`);
    console.log(`   Fleet Groups: ${fleetGroupCount.toLocaleString()}`);

    // Check telemetry data
    const tirePressureCount = await prisma.tire_pressure_event.count();
    const gpsCount = await prisma.gps_position.count();
    const alertCount = await prisma.alert_event.count();
    const sensorRawCount = await prisma.sensor_data_raw.count();
    const hubTempCount = await prisma.hub_temperature_event.count();
    const fuelCount = await prisma.fuel_level_event.count();

    console.log('\n📡 TELEMETRY DATA:');
    console.log(`   Tire Pressure Events:    ${tirePressureCount.toLocaleString()}`);
    console.log(`   GPS Positions:           ${gpsCount.toLocaleString()}`);
    console.log(`   Hub Temperature Events:  ${hubTempCount.toLocaleString()}`);
    console.log(`   Fuel Level Events:       ${fuelCount.toLocaleString()}`);
    console.log(`   Alert Events:            ${alertCount.toLocaleString()}`);
    console.log(`   Sensor Raw Data:         ${sensorRawCount.toLocaleString()}`);

    // Calculate total records
    const totalRecords = truckCount + deviceCount + sensorCount + vendorCount + 
                        driverCount + fleetGroupCount + tirePressureCount + 
                        gpsCount + alertCount + sensorRawCount + hubTempCount + fuelCount;

    console.log('\n💾 TOTAL RECORDS:');
    console.log(`   ${totalRecords.toLocaleString()} records across all tables`);

    // Estimate storage size (rough estimate: 1KB per record average)
    const estimatedSizeMB = Math.round(totalRecords / 1000);
    console.log(`   Estimated size: ~${estimatedSizeMB} MB`);

    // Check date ranges for telemetry
    console.log('\n📅 DATA DATE RANGES:');
    
    if (tirePressureCount > 0) {
      const tpmsRange = await prisma.tire_pressure_event.aggregate({
        _min: { changed_at: true },
        _max: { changed_at: true },
      });
      console.log(`   TPMS Data:   ${tpmsRange._min.changed_at?.toISOString().split('T')[0]} to ${tpmsRange._max.changed_at?.toISOString().split('T')[0]}`);
    }

    if (gpsCount > 0) {
      const gpsRange = await prisma.gps_position.aggregate({
        _min: { ts: true },
        _max: { ts: true },
      });
      console.log(`   GPS Data:    ${gpsRange._min.ts?.toISOString().split('T')[0]} to ${gpsRange._max.ts?.toISOString().split('T')[0]}`);
    }

    // Check for trucks with specific codes (seeded data)
    const seededTrucks = await prisma.truck.count({
      where: {
        code: {
          gte: '0001',
          lte: '1000'
        }
      }
    });

    console.log('\n🎯 SEEDED DATA DETECTION:');
    console.log(`   Trucks with codes 0001-1000: ${seededTrucks}`);

    // Sample truck codes
    const sampleTrucks = await prisma.truck.findMany({
      select: { code: true, name: true },
      take: 10,
      orderBy: { code: 'asc' }
    });

    if (sampleTrucks.length > 0) {
      console.log('\n📝 SAMPLE TRUCK CODES (first 10):');
      sampleTrucks.forEach(t => {
        console.log(`   ${t.code} - ${t.name}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Database statistics check completed!\n');

  } catch (error) {
    console.error('❌ Error checking database stats:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseStats();
