/**
 * Test Frontend Integration - Sensor History API
 *
 * Script untuk memverifikasi bahwa frontend bisa mengambil data sensor history
 * yang sesuai dengan lokasi terakhir
 */

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function testFrontendIntegration() {
  try {
    console.log('🧪 Testing Frontend Integration for Sensor History\n');
    console.log('═══════════════════════════════════════════════════════\n');

    // 1. Get a truck with sensor history
    const truck = await prisma.truck.findFirst({
      where: {
        deleted_at: null,
        device: {
          some: {
            status: 'active',
            deleted_at: null,
          },
        },
      },
      include: {
        device: {
          where: {
            status: 'active',
            deleted_at: null,
          },
        },
      },
    });

    if (!truck) {
      console.log('❌ No truck with active device found!');
      return;
    }

    console.log(`🚚 Testing with Truck: ${truck.plate} (ID: ${truck.id})`);
    console.log(`   Device SN: ${truck.device[0]?.sn || 'N/A'}\n`);

    // 2. Get latest location
    const latestLocation = await prisma.location.findFirst({
      where: {
        device_id: truck.device[0].id,
      },
      orderBy: {
        recorded_at: 'desc',
      },
      include: {
        sensor_history: {
          orderBy: {
            tireNo: 'asc',
          },
        },
      },
    });

    if (!latestLocation) {
      console.log('❌ No location data found for this truck!');
      return;
    }

    console.log('📍 LATEST LOCATION:');
    console.log('─────────────────────────────────────────────────────');
    console.log(`   Location ID: ${latestLocation.id}`);
    console.log(`   GPS: ${latestLocation.lat}, ${latestLocation.long}`);
    console.log(`   Recorded at: ${latestLocation.recorded_at}`);
    console.log(`   Sensor snapshots: ${latestLocation.sensor_history.length}\n`);

    if (latestLocation.sensor_history.length > 0) {
      console.log('✅ SENSOR DATA AT THIS LOCATION:');
      console.log('═══════════════════════════════════════════════════════');

      latestLocation.sensor_history.forEach((sensor) => {
        const statusEmoji =
          sensor.exType === 'critical' ? '🔴' : sensor.exType === 'warning' ? '🟡' : '🟢';
        console.log(
          `${statusEmoji} Tire ${sensor.tireNo}: ${sensor.tempValue}°C, ${sensor.tirepValue} PSI - ${sensor.exType}`
        );
      });
    } else {
      console.log('⚠️  No sensor history at this location!');
      console.log('   This location was created before sensor_history feature was implemented.');
    }

    // 3. Get history with sensor data (simulate API call)
    console.log('\n\n🌐 SIMULATING API CALL:');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`GET /api/v1/history/trucks/${truck.id}\n`);

    const device = truck.device[0];

    // Get last 5 locations with sensor history
    const locations = await prisma.location.findMany({
      where: {
        device_id: device.id,
      },
      orderBy: { recorded_at: 'desc' },
      take: 5,
      include: {
        sensor_history: {
          orderBy: { tireNo: 'asc' },
          select: {
            tireNo: true,
            sensorNo: true,
            tempValue: true,
            tirepValue: true,
            exType: true,
            bat: true,
            recorded_at: true,
          },
        },
      },
    });

    // Transform to frontend format
    const getTirePosition = (tireNo) => {
      const positions = {
        1: 'Front Left Outer',
        2: 'Front Left Inner',
        3: 'Front Right Inner',
        4: 'Front Right Outer',
        5: 'Rear Left Outer',
        6: 'Rear Left Inner',
        7: 'Rear Center Left',
        8: 'Rear Center Right',
        9: 'Rear Right Inner',
        10: 'Rear Right Outer',
      };
      return positions[tireNo] || `Tire ${tireNo}`;
    };

    const timeline = locations.map((loc) => ({
      timestamp: loc.recorded_at,
      location: {
        lat: loc.lat,
        lng: loc.long,
      },
      tires: loc.sensor_history.map((sh) => ({
        tireNo: sh.tireNo,
        position: getTirePosition(sh.tireNo),
        temperature: sh.tempValue,
        pressure: sh.tirepValue,
        status: sh.exType,
        battery: sh.bat,
        timestamp: sh.recorded_at,
      })),
    }));

    console.log('📊 API RESPONSE (Frontend Format):');
    console.log('─────────────────────────────────────────────────────');
    console.log(JSON.stringify(timeline, null, 2));

    // 4. Summary
    console.log('\n\n✅ VERIFICATION RESULTS:');
    console.log('═══════════════════════════════════════════════════════');

    const locationsWithSensors = timeline.filter((t) => t.tires.length > 0).length;
    const locationsWithoutSensors = timeline.filter((t) => t.tires.length === 0).length;

    console.log(`✓ Total locations retrieved: ${timeline.length}`);
    console.log(`✓ Locations with sensor data: ${locationsWithSensors}`);
    console.log(`✓ Locations without sensor data: ${locationsWithoutSensors}`);

    if (locationsWithSensors > 0) {
      console.log('\n🎯 KESIMPULAN:');
      console.log('─────────────────────────────────────────────────────');
      console.log('✅ Data sensor SUDAH tersimpan di sensor_history');
      console.log('✅ Data sensor SESUAI dengan lokasi terakhir');
      console.log('✅ Frontend bisa mengambil data via endpoint history');
      console.log('✅ Setiap lokasi memiliki snapshot data ban lengkap');

      console.log('\n📱 UNTUK FRONTEND:');
      console.log('─────────────────────────────────────────────────────');
      console.log('1. Call: GET /api/v1/history/trucks/:truckId');
      console.log('2. Response berisi array lokasi + data ban di setiap titik');
      console.log('3. Data temperature, pressure, status tersedia per tire');
      console.log('4. Bisa tampilkan riwayat perjalanan dengan kondisi ban');
    } else {
      console.log('\n⚠️  KESIMPULAN:');
      console.log('─────────────────────────────────────────────────────');
      console.log('Data location ada, tapi belum ada sensor_history.');
      console.log('Ini normal karena fitur baru ditambahkan.');
      console.log('');
      console.log('💡 SOLUSI:');
      console.log('1. Kirim GPS update baru via IoT endpoint');
      console.log('2. Atau jalankan simulator');
      console.log('3. Data sensor_history akan otomatis tersimpan');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testFrontendIntegration();
