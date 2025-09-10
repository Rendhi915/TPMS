const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function upsertDeviceForTruck(truckId, code) {
  const sn = `DUMMY-${code}`;
  // Ensure device exists and linked to truck
  const existing = await prisma.device.findUnique({ where: { sn } }).catch(() => null);
  if (existing) {
    if (existing.truck_id !== truckId) {
      await prisma.device.update({ where: { sn }, data: { truck_id: truckId } });
    }
    return existing.id;
  }
  const device = await prisma.device.create({
    data: {
      truck_id: truckId,
      sn,
      sim_number: null,
    }
  });
  return device.id;
}

async function seedTireEventsForTruck(truck, deviceId, tires = 6, readingsPerTire = 3) {
  const events = [];
  const baseTs = new Date();
  for (let t = 1; t <= tires; t++) {
    for (let r = 0; r < readingsPerTire; r++) {
      const ts = new Date(baseTs.getTime() - (r * 10 + t) * 60000); // staggered minutes
      const pressure = 800 + Math.round(Math.random() * 400); // 800-1200 kPa
      const temp = 30 + Math.round(Math.random() * 20); // 30-50 C
      const battery = 60 + Math.round(Math.random() * 40); // 60-100%
      events.push(
        prisma.tire_pressure_event.create({
          data: {
            device_id: deviceId,
            truck_id: truck.id,
            tire_no: t,
            pressure_kpa: pressure,
            temp_celsius: temp,
            battery_level: battery,
            changed_at: ts,
          }
        })
      );
    }
  }
  await Promise.all(events);
}

async function main() {
  try {
    const codes = ['0001','0002','0003','0004','0005'];
    const trucks = await prisma.truck.findMany({
      where: { code: { in: codes } },
      select: { id: true, code: true, name: true }
    });

    if (trucks.length === 0) {
      console.log('No trucks found for codes', codes);
      process.exit(0);
    }

    for (const truck of trucks) {
      const deviceId = await upsertDeviceForTruck(truck.id, truck.code);
      await seedTireEventsForTruck(truck, deviceId, 6, 3);
      console.log(`Seeded tire events for truck ${truck.code} (${truck.id}) with device ${deviceId}`);
    }

    console.log('✅ Dummy tire pressure data seeded successfully.');
  } catch (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
