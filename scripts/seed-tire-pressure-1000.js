const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

// Determine wheel count by truck code to get variety: max 8, then 6, then 4
function getWheelCountByCode(code) {
  const n = parseInt(code, 10);
  if (n % 3 === 0) return 8; // largest
  if (n % 2 === 0) return 6; // mid
  return 4; // smallest
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

async function ensureDeviceForTruck(truck) {
  const sn = `DUMMY-${truck.code}`;
  const existing = await prisma.device.findUnique({ where: { sn } }).catch(() => null);
  if (existing) {
    if (existing.truck_id !== truck.id) {
      await prisma.device.update({ where: { sn }, data: { truck_id: truck.id } });
    }
    return { id: existing.id, sn };
  }
  const device = await prisma.device.create({
    data: {
      truck_id: truck.id,
      sn,
      sim_number: null,
    },
  });
  return { id: device.id, sn };
}

async function seedTireEventsForTruck(truck, deviceId, wheelCount, readingsPerTire = 2) {
  const ops = [];
  const now = Date.now();
  for (let tire = 1; tire <= wheelCount; tire++) {
    // Generate a baseline health for the tire
    const basePressure = randomInt(900, 1200); // kPa
    const baseTemp = randomInt(30, 55); // C
    const baseBattery = randomInt(60, 100); // %

    for (let r = 0; r < readingsPerTire; r++) {
      const ts = new Date(now - (tire * 7 + r) * 60 * 1000); // stagger timestamps
      const pressure = Math.max(
        700,
        Math.min(1300, Math.round(basePressure + randomFloat(-40, 40)))
      );
      const temp = Math.max(20, Math.min(85, Math.round(baseTemp + randomFloat(-3, 3))));
      const battery = Math.max(10, Math.min(100, Math.round(baseBattery - r - randomFloat(0, 1))));

      ops.push(
        prisma.tire_pressure_event.create({
          data: {
            device_id: deviceId,
            truck_id: truck.id,
            tire_no: tire,
            pressure_kpa: pressure,
            temp_celsius: temp,
            battery_level: battery,
            changed_at: ts,
          },
        })
      );
    }
  }
  // Run in small batches to avoid overwhelming DB
  const chunkSize = 200;
  for (let i = 0; i < ops.length; i += chunkSize) {
    const chunk = ops.slice(i, i + chunkSize);
    await Promise.all(chunk);
  }
}

async function main() {
  try {
    console.log('🔧 Seeding tire pressure dummy data for trucks 0001-1000...');

    const trucks = await prisma.truck.findMany({
      where: { code: { gte: '0001', lte: '1000' } },
      select: { id: true, code: true, name: true },
    });

    if (trucks.length === 0) {
      console.log('No trucks found in code range 0001-1000. Aborting.');
      process.exit(0);
    }

    console.log(`Found ${trucks.length} trucks. Starting seeding...`);

    // Limit concurrency to avoid DB overload
    const concurrency = 10;
    let index = 0;

    async function worker(workerId) {
      while (index < trucks.length) {
        const i = index++;
        const truck = trucks[i];
        const wheelCount = getWheelCountByCode(truck.code || '0006');
        try {
          const device = await ensureDeviceForTruck(truck);
          await seedTireEventsForTruck(truck, device.id, wheelCount, 2);
          if ((i + 1) % 50 === 0 || i === trucks.length - 1) {
            console.log(
              `Worker ${workerId}: Seeded ${i + 1}/${trucks.length} (truck ${truck.code}, wheels=${wheelCount})`
            );
          }
        } catch (e) {
          console.error(`Worker ${workerId}: Failed seeding for truck ${truck.code}:`, e.message);
        }
      }
    }

    const workers = [];
    for (let w = 0; w < concurrency; w++) workers.push(worker(w + 1));
    await Promise.all(workers);

    console.log('✅ Completed seeding tire pressure events for 1000 trucks.');
  } catch (e) {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
