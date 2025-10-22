const db = require('../src/config/database');

async function checkTrucksAndDevices() {
  try {
    console.log('\n========================================');
    console.log('CHECKING TRUCKS AND DEVICES');
    console.log('========================================\n');

    // Check Trucks
    console.log('📦 TRUCKS OVERVIEW\n');
    
    const trucks = await db.query(`
      SELECT 
        t.*,
        v.name as vendor_name,
        d.serial_number as device_serial,
        d.device_type,
        d.status as device_status,
        COUNT(DISTINCT s.sensor_id) as sensor_count
      FROM truck t
      LEFT JOIN vendor v ON t.vendor_id = v.id
      LEFT JOIN device d ON t.id = d.truck_id
      LEFT JOIN sensor s ON t.id = s.truck_id
      GROUP BY t.id, v.name, d.serial_number, d.device_type, d.status
      ORDER BY t.name
    `);

    const trucksArray = trucks.rows;

    console.log(`Total Trucks: ${trucksArray.length}\n`);

    // Group by status
    const byStatus = {};
    for (const truck of trucksArray) {
      byStatus[truck.status] = (byStatus[truck.status] || 0) + 1;
    }

    console.log('By Status:');
    for (const [status, count] of Object.entries(byStatus)) {
      console.log(`  - ${status}: ${count} trucks`);
    }

    // Group by vendor
    const byVendor = {};
    for (const truck of trucksArray) {
      const vendorName = truck.vendor_name || 'No Vendor';
      byVendor[vendorName] = (byVendor[vendorName] || 0) + 1;
    }

    console.log('\nBy Vendor:');
    const vendorEntries = Object.entries(byVendor).sort((a, b) => b[1] - a[1]);
    for (const [vendor, count] of vendorEntries) {
      console.log(`  - ${vendor}: ${count} trucks`);
    }

    // Trucks without devices
    const trucksWithoutDevices = trucksArray.filter(t => !t.device_serial);
    console.log(`\n⚠️  Trucks without devices: ${trucksWithoutDevices.length}`);
    if (trucksWithoutDevices.length > 0 && trucksWithoutDevices.length <= 5) {
      for (const truck of trucksWithoutDevices) {
        console.log(`     - ${truck.name} (${truck.code})`);
      }
    }

    // Trucks without sensors
    const trucksWithoutSensors = trucksArray.filter(t => parseInt(t.sensor_count) === 0);
    console.log(`⚠️  Trucks without sensors: ${trucksWithoutSensors.length}`);
    if (trucksWithoutSensors.length > 0 && trucksWithoutSensors.length <= 5) {
      for (const truck of trucksWithoutSensors) {
        console.log(`     - ${truck.name} (${truck.code})`);
      }
    }

    // Sample trucks with full data
    const trucksWithFullData = trucksArray.filter(t => t.device_serial && parseInt(t.sensor_count) > 0);
    console.log(`✅ Trucks with complete data (device + sensors): ${trucksWithFullData.length}`);
    if (trucksWithFullData.length > 0) {
      console.log('\n   Sample trucks with complete setup:');
      for (let i = 0; i < Math.min(3, trucksWithFullData.length); i++) {
        const truck = trucksWithFullData[i];
        console.log(`     - ${truck.name}: Device SN ${truck.device_serial}, ${truck.sensor_count} sensors`);
      }
    }

    // Check Devices
    console.log('\n\n========================================');
    console.log('📱 DEVICES OVERVIEW\n');

    const devices = await db.query(`
      SELECT 
        d.*,
        t.name as truck_name,
        t.code as truck_code
      FROM device d
      LEFT JOIN truck t ON d.truck_id = t.id
      ORDER BY d.created_at DESC
    `);

    const devicesArray = devices.rows;
    console.log(`Total Devices: ${devicesArray.length}\n`);

    // Group by type
    const byType = {};
    for (const device of devicesArray) {
      byType[device.device_type] = (byType[device.device_type] || 0) + 1;
    }

    console.log('By Type:');
    for (const [type, count] of Object.entries(byType)) {
      console.log(`  - ${type}: ${count} devices`);
    }

    // Group by status
    const devicesByStatus = {};
    for (const device of devicesArray) {
      devicesByStatus[device.status] = (devicesByStatus[device.status] || 0) + 1;
    }

    console.log('\nBy Status:');
    for (const [status, count] of Object.entries(devicesByStatus)) {
      console.log(`  - ${status}: ${count} devices`);
    }

    // Devices without trucks
    const devicesWithoutTrucks = devicesArray.filter(d => !d.truck_name);
    console.log(`\n⚠️  Devices not assigned to trucks: ${devicesWithoutTrucks.length}`);
    if (devicesWithoutTrucks.length > 0 && devicesWithoutTrucks.length <= 10) {
      for (const device of devicesWithoutTrucks) {
        console.log(`     - ${device.device_type} (SN: ${device.serial_number})`);
      }
    }

    // Recent devices
    console.log('\n   Recent devices (last 5):');
    for (let i = 0; i < Math.min(5, devicesArray.length); i++) {
      const device = devicesArray[i];
      const truckInfo = device.truck_name ? `→ ${device.truck_name}` : '(unassigned)';
      console.log(`     - ${device.device_type} SN:${device.serial_number} ${truckInfo}`);
    }

    // Check Sensors
    console.log('\n\n========================================');
    console.log('🔧 SENSORS OVERVIEW\n');

    const sensors = await db.query(`
      SELECT 
        s.*,
        t.name as truck_name,
        t.code as truck_code
      FROM sensor s
      LEFT JOIN truck t ON s.truck_id = t.id
    `);

    const sensorsArray = sensors.rows;
    console.log(`Total Sensors: ${sensorsArray.length}\n`);

    // Group by type
    const sensorsByType = {};
    for (const sensor of sensorsArray) {
      sensorsByType[sensor.sensor_type] = (sensorsByType[sensor.sensor_type] || 0) + 1;
    }

    console.log('By Type:');
    for (const [type, count] of Object.entries(sensorsByType)) {
      console.log(`  - ${type}: ${count} sensors`);
    }

    // Group by status
    const sensorsByStatus = {};
    for (const sensor of sensorsArray) {
      sensorsByStatus[sensor.status] = (sensorsByStatus[sensor.status] || 0) + 1;
    }

    console.log('\nBy Status:');
    for (const [status, count] of Object.entries(sensorsByStatus)) {
      console.log(`  - ${status}: ${count} sensors`);
    }

    // Group by position
    const sensorsByPosition = {};
    for (const sensor of sensorsArray) {
      const pos = sensor.position || 'unassigned';
      sensorsByPosition[pos] = (sensorsByPosition[pos] || 0) + 1;
    }

    console.log('\nBy Position:');
    const order = ['front_left', 'front_right', 'rear_left_outer', 'rear_left_inner', 
                   'rear_right_inner', 'rear_right_outer', 'spare', 'unassigned'];
    const sortedPositions = Object.entries(sensorsByPosition).sort((a, b) => {
      return order.indexOf(a[0]) - order.indexOf(b[0]);
    });
    for (const [position, count] of sortedPositions) {
      console.log(`  - ${position}: ${count} sensors`);
    }

    // Sensors without trucks
    const sensorsWithoutTrucks = sensorsArray.filter(s => !s.truck_id);
    console.log(`\n⚠️  Sensors not assigned to trucks: ${sensorsWithoutTrucks.length}`);

    // Trucks with sensor counts
    const truckSensorCounts = await db.query(`
      SELECT 
        t.name,
        t.code,
        COUNT(s.sensor_id) as sensor_count
      FROM truck t
      LEFT JOIN sensor s ON t.id = s.truck_id
      GROUP BY t.id, t.name, t.code
      HAVING COUNT(s.sensor_id) > 0
    `);

    const trucksWithFullSensors = truckSensorCounts.rows.filter(t => parseInt(t.sensor_count) === 10);
    const trucksWithPartialSensors = truckSensorCounts.rows.filter(t => {
      const count = parseInt(t.sensor_count);
      return count > 0 && count < 10;
    });

    console.log(`\n✅ Trucks with full sensor setup (10 sensors): ${trucksWithFullSensors.length}`);
    console.log(`⚠️  Trucks with partial sensor setup (<10): ${trucksWithPartialSensors.length}`);
    
    if (trucksWithPartialSensors.length > 0 && trucksWithPartialSensors.length <= 5) {
      for (const truck of trucksWithPartialSensors) {
        console.log(`     - ${truck.name}: ${truck.sensor_count} sensors`);
      }
    }

    // Summary
    console.log('\n\n========================================');
    console.log('📊 SUMMARY\n');
    console.log(`✅ Total Trucks: ${trucksArray.length}`);
    console.log(`✅ Total Devices: ${devicesArray.length}`);
    console.log(`✅ Total Sensors: ${sensorsArray.length}`);
    console.log(`\n⚠️  Issues to address:`);
    console.log(`   - Trucks without devices: ${trucksWithoutDevices.length}`);
    console.log(`   - Trucks without sensors: ${trucksWithoutSensors.length}`);
    console.log(`   - Devices unassigned: ${devicesWithoutTrucks.length}`);
    console.log(`   - Sensors unassigned: ${sensorsWithoutTrucks.length}`);
    console.log(`   - Trucks with partial sensors: ${trucksWithPartialSensors.length}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('Error checking trucks and devices:', error);
  } finally {
    await db.end();
  }
}

checkTrucksAndDevices();
