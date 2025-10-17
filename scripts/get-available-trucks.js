/**
 * Helper Script: Get Available Trucks for Device Assignment
 * 
 * This script helps you find valid truck_id values from the database
 * that can be used when creating new devices via API.
 * 
 * Usage:
 *   node scripts/get-available-trucks.js
 */

const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function getAvailableTrucks() {
  try {
    console.log('\n🚛 Fetching available trucks from database...\n');

    // Get all trucks with their device status
    const trucks = await prisma.truck.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        model: true,
        year: true,
        vin: true,
        device: {
          select: {
            id: true,
            sn: true,
            sim_number: true,
            removed_at: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: 50, // Limit to first 50 trucks
    });

    if (trucks.length === 0) {
      console.log('❌ No trucks found in database.');
      console.log('💡 You may need to run the seeder script first:');
      console.log('   node scripts/comprehensive-seeder.js\n');
      return;
    }

    console.log(`✅ Found ${trucks.length} trucks in database\n`);
    console.log('═'.repeat(100));

    // Separate trucks with and without devices
    const trucksWithoutDevice = [];
    const trucksWithDevice = [];

    trucks.forEach((truck) => {
      const activeDevice = truck.device.find((d) => d.removed_at === null);
      if (activeDevice) {
        trucksWithDevice.push({ ...truck, activeDevice });
      } else {
        trucksWithoutDevice.push(truck);
      }
    });

    // Display trucks WITHOUT devices (recommended for new device assignment)
    if (trucksWithoutDevice.length > 0) {
      console.log('\n✨ TRUCKS WITHOUT DEVICES (Recommended for new device assignment):');
      console.log('─'.repeat(100));
      console.log(
        '| No | Truck ID                             | Name           | Model          | Code   |'
      );
      console.log('─'.repeat(100));

      trucksWithoutDevice.slice(0, 10).forEach((truck, index) => {
        const name = (truck.name || 'N/A').padEnd(14);
        const model = (truck.model || 'N/A').padEnd(14);
        const code = (truck.code || 'N/A').padEnd(6);
        const no = String(index + 1).padStart(2);

        console.log(`| ${no} | ${truck.id} | ${name} | ${model} | ${code} |`);
      });

      console.log('─'.repeat(100));
      console.log(`\n📋 Total trucks without devices: ${trucksWithoutDevice.length}`);

      // Show example API request
      if (trucksWithoutDevice.length > 0) {
        const exampleTruck = trucksWithoutDevice[0];
        console.log('\n📝 EXAMPLE API REQUEST for Postman:');
        console.log('─'.repeat(100));
        console.log('POST http://localhost:3001/api/devices');
        console.log('Headers: Authorization: Bearer <your_token>');
        console.log('Body (raw JSON):');
        console.log(
          JSON.stringify(
            {
              truck_id: exampleTruck.id,
              sn: 'DEVICE' + Date.now(),
              sim_number: '0812345678' + Math.floor(Math.random() * 100),
            },
            null,
            2
          )
        );
        console.log('─'.repeat(100));
      }
    } else {
      console.log('\n⚠️  All trucks already have devices assigned.');
    }

    // Display trucks WITH devices (for reference)
    if (trucksWithDevice.length > 0) {
      console.log('\n\n📱 TRUCKS WITH DEVICES (Already assigned):');
      console.log('─'.repeat(100));
      console.log(
        '| No | Truck ID                             | Name           | Device SN      | SIM        |'
      );
      console.log('─'.repeat(100));

      trucksWithDevice.slice(0, 5).forEach((truck, index) => {
        const name = (truck.name || 'N/A').padEnd(14);
        const deviceSn = (truck.activeDevice.sn || 'N/A').padEnd(14);
        const sim = (truck.activeDevice.sim_number || 'N/A').padEnd(10);
        const no = String(index + 1).padStart(2);

        console.log(`| ${no} | ${truck.id} | ${name} | ${deviceSn} | ${sim} |`);
      });

      console.log('─'.repeat(100));
      console.log(`\n📋 Total trucks with devices: ${trucksWithDevice.length}`);
    }

    console.log('\n✅ Done! Copy one of the Truck IDs above to use in your Postman request.\n');
  } catch (error) {
    console.error('❌ Error fetching trucks:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. Database is running');
    console.error('   2. .env file has correct DATABASE_URL');
    console.error('   3. Database has been seeded with data\n');
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
getAvailableTrucks();
