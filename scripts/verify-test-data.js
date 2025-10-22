// Verify test data in database
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function verifyTestData() {
  try {
    console.log('\n📊 Verifying Test Data in Database');
    console.log('='.repeat(70));

    // 1. Check sensor_data_raw (audit trail)
    const rawDataCount = await prisma.sensor_data_raw.count();
    const rawDataRecent = await prisma.sensor_data_raw.findMany({
      take: 5,
      orderBy: { received_at: 'desc' },
      select: {
        id: true,
        device_sn: true,
        cmd_type: true,
        processed: true,
        received_at: true
      }
    });

    console.log(`\n1️⃣  Raw Sensor Data (Audit Trail):`);
    console.log(`   Total records: ${rawDataCount}`);
    console.log(`   Recent 5 records:`);
    rawDataRecent.forEach((r, i) => {
      console.log(`   ${i+1}. SN: ${r.device_sn}, CMD: ${r.cmd_type}, Processed: ${r.processed}`);
    });

    // 2. Check tire_pressure_event
    const tpCount = await prisma.tire_pressure_event.count();
    const tpRecent = await prisma.tire_pressure_event.findMany({
      take: 3,
      orderBy: { changed_at: 'desc' },
      include: { truck: { select: { name: true } } }
    });

    console.log(`\n2️⃣  Tire Pressure Events:`);
    console.log(`   Total records: ${tpCount}`);
    console.log(`   Recent 3 records:`);
    tpRecent.forEach((r, i) => {
      console.log(`   ${i+1}. Truck: ${r.truck.name}, Tire #${r.tire_no}, ${r.pressure_kpa} kPa, ${r.temp_celsius}°C`);
    });

    // 3. Check hub_temperature_event
    const hubCount = await prisma.hub_temperature_event.count();
    const hubRecent = await prisma.hub_temperature_event.findMany({
      take: 3,
      orderBy: { changed_at: 'desc' },
      include: { truck: { select: { name: true } } }
    });

    console.log(`\n3️⃣  Hub Temperature Events:`);
    console.log(`   Total records: ${hubCount}`);
    console.log(`   Recent 3 records:`);
    hubRecent.forEach((r, i) => {
      console.log(`   ${i+1}. Truck: ${r.truck.name}, Hub #${r.hub_no}, ${r.temp_celsius}°C`);
    });

    // 4. Check gps_position
    const gpsCount = await prisma.gps_position.count();
    console.log(`\n4️⃣  GPS Position Events:`);
    console.log(`   Total records: ${gpsCount}`);

    // 5. Check device_status_event
    const deviceStatusCount = await prisma.device_status_event.count();
    const deviceStatusRecent = await prisma.device_status_event.findMany({
      take: 3,
      orderBy: { reported_at: 'desc' },
      include: { truck: { select: { name: true } } }
    });

    console.log(`\n5️⃣  Device Status Events:`);
    console.log(`   Total records: ${deviceStatusCount}`);
    console.log(`   Recent 3 records:`);
    deviceStatusRecent.forEach((r, i) => {
      console.log(`   ${i+1}. Truck: ${r.truck.name}, Host: ${r.host_bat}%, Rep1: ${r.repeater1_bat}%, Rep2: ${r.repeater2_bat}%`);
    });

    // 6. Check lock_event
    const lockCount = await prisma.lock_event.count();
    const lockRecent = await prisma.lock_event.findMany({
      take: 3,
      orderBy: { reported_at: 'desc' },
      include: { truck: { select: { name: true } } }
    });

    console.log(`\n6️⃣  Lock Events:`);
    console.log(`   Total records: ${lockCount}`);
    console.log(`   Recent 3 records:`);
    lockRecent.forEach((r, i) => {
      console.log(`   ${i+1}. Truck: ${r.truck.name}, Lock: ${r.is_lock ? 'Locked' : 'Unlocked'}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('✅ Data verification complete!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTestData();
