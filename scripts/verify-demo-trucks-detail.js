require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');

async function verifyDetails() {
  const prisma = new PrismaClient();
  
  try {
    const trucks = await prisma.truck.findMany({
      where: {
        name: {
          in: ['truck-spiderman', 'truck-ironman']
        }
      },
      include: {
        device: {
          include: {
            sensor: true,
            gps_position: {
              take: 1,
              orderBy: { ts: 'desc' }
            }
          }
        },
        tire_position_config: true
      }
    });
    
    console.log('\n🔍 Detailed Demo Trucks Verification\n');
    
    for (const truck of trucks) {
      console.log(`\n${'='.repeat(70)}`);
      console.log(`🚛 ${truck.name.toUpperCase()}`);
      console.log(`${'='.repeat(70)}`);
      console.log(`   📋 Basic Info:`);
      console.log(`      - ID: ${truck.id}`);
      console.log(`      - Code: ${truck.code}`);
      console.log(`      - Model: ${truck.model_name}`);
      console.log(`      - Year: ${truck.year}`);
      console.log(`      - Status: ${truck.status}`);
      
      const devices = truck.device || [];
      console.log(`\n   📱 Devices (${devices.length}):`);
      for (const device of devices) {
        console.log(`      - Device SN: ${device.sn}`);
        console.log(`        Type: ${device.type}`);
        console.log(`        SIM: ${device.sim_number}`);
        
        const sensors = device.sensor || [];
        console.log(`        Sensors: ${sensors.length} sensors`);
        if (sensors.length > 0) {
          console.log(`          Types: ${sensors.map(s => `${s.type}#${s.position_no}`).slice(0, 5).join(', ')}${sensors.length > 5 ? '...' : ''}`);
        }
        
        const gps = device.gps_position || [];
        if (gps.length > 0) {
          const latest = gps[0];
          console.log(`        Latest GPS: [${latest.longitude}, ${latest.latitude}]`);
          console.log(`        Timestamp: ${latest.ts}`);
        }
      }
      
      const tires = truck.tire_position_config || [];
      console.log(`\n   🛞 Tire Positions (${tires.length}):`);
      const tiresByType = {};
      for (const tire of tires) {
        tiresByType[tire.wheel_type] = (tiresByType[tire.wheel_type] || 0) + 1;
      }
      for (const [type, count] of Object.entries(tiresByType)) {
        console.log(`      - ${type}: ${count} wheels`);
      }
      
      // Check tire pressure data
      const pressureData = await prisma.tire_pressure_event.count({
        where: {
          device: {
            truck_id: truck.id
          }
        }
      });
      console.log(`\n   📊 Data Events:`);
      console.log(`      - Tire Pressure Events: ${pressureData}`);
      
      // Check sensor raw data
      const rawData = await prisma.sensor_data_raw.count({
        where: {
          truck_id: truck.id
        }
      });
      console.log(`      - Sensor Raw Data: ${rawData}`);
    }
    
    console.log(`\n${'='.repeat(70)}\n`);
    console.log('✅ Verification complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDetails();
