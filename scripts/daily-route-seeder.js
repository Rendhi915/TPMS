const { PrismaClient } = require('../prisma/generated/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Helper functions
function randomFloat(min, max, decimals = 6) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate realistic mining area coordinates for Indonesia
function generateMiningAreaCoordinates() {
  const miningAreas = [
    {
      name: 'Kalimantan Coal Mine',
      center: { lat: -2.5461, lng: 118.0149 },
      radius: 0.05, // ~5km radius
    },
    {
      name: 'East Java Quarry',
      center: { lat: -7.2575, lng: 112.7521 },
      radius: 0.03, // ~3km radius
    },
    {
      name: 'Sumatra Coal Field',
      center: { lat: 0.7893, lng: 100.6543 },
      radius: 0.04, // ~4km radius
    },
    {
      name: 'West Java Mining Site',
      center: { lat: -6.9175, lng: 107.6191 },
      radius: 0.025, // ~2.5km radius
    },
    {
      name: 'South Kalimantan Mine',
      center: { lat: -3.3194, lng: 114.5906 },
      radius: 0.035, // ~3.5km radius
    },
  ];

  return randomChoice(miningAreas);
}

// Generate a realistic route path with multiple waypoints
function generateRoutePoints(area, pointCount) {
  const points = [];
  const center = area.center;
  const radius = area.radius;

  // Start point (depot/base)
  const startPoint = {
    lat: center.lat + randomFloat(-radius * 0.3, radius * 0.3),
    lng: center.lng + randomFloat(-radius * 0.3, radius * 0.3),
  };
  points.push(startPoint);

  // Generate intermediate waypoints in a logical sequence
  let currentPoint = { ...startPoint };

  for (let i = 1; i < pointCount - 1; i++) {
    // Create a path that moves generally in one direction with some variation
    const angle = (i / pointCount) * 2 * Math.PI + randomFloat(-0.5, 0.5);
    const distance = randomFloat(radius * 0.2, radius * 0.8);

    const nextPoint = {
      lat: center.lat + Math.cos(angle) * distance,
      lng: center.lng + Math.sin(angle) * distance,
    };

    points.push(nextPoint);
    currentPoint = nextPoint;
  }

  // End point (return to depot or nearby location)
  const endPoint = {
    lat: startPoint.lat + randomFloat(-radius * 0.2, radius * 0.2),
    lng: startPoint.lng + randomFloat(-radius * 0.2, radius * 0.2),
  };
  points.push(endPoint);

  return points;
}

// Convert points to PostGIS LINESTRING format
function pointsToLineString(points) {
  const coordinates = points.map((p) => `${p.lng} ${p.lat}`).join(', ');
  return `LINESTRING(${coordinates})`;
}

// Generate date range for the last 30 days
function generateDateRange(days = 30) {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Set to start of day
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
}

async function seedDailyRoutes() {
  console.log('🛣️ Seeding Daily Routes...');

  try {
    // Get all trucks from database
    const trucks = await prisma.truck.findMany({
      select: { id: true, name: true },
    });

    if (trucks.length === 0) {
      console.log('❌ No trucks found in database. Please run the comprehensive seeder first.');
      return;
    }

    console.log(`📊 Found ${trucks.length} trucks in database`);

    // Clear existing daily routes
    console.log('🧹 Clearing existing daily routes...');
    await prisma.daily_route.deleteMany({});

    const dates = generateDateRange(30); // Last 30 days
    const routes = [];

    // Generate routes for each truck for each date (with some probability)
    for (const truck of trucks) {
      console.log(`🚛 Generating routes for truck: ${truck.name}`);

      for (const date of dates) {
        // 70% chance a truck has a route on any given day
        if (Math.random() < 0.7) {
          const area = generateMiningAreaCoordinates();
          const pointCount = randomInt(8, 25); // 8-25 waypoints per route
          const routePoints = generateRoutePoints(area, pointCount);
          const lineString = pointsToLineString(routePoints);

          try {
            // Use raw SQL to insert with PostGIS geometry
            await prisma.$executeRaw`
              INSERT INTO daily_route (id, truck_id, route_date, geom, point_count, generated_at)
              VALUES (
                gen_random_uuid(),
                ${truck.id},
                ${date}::date,
                ST_GeogFromText(${lineString}),
                ${pointCount},
                NOW()
              )
            `;

            routes.push({
              truckId: truck.id,
              routeDate: date,
              pointCount: pointCount,
              area: area.name,
            });
          } catch (error) {
            console.error(
              `❌ Error creating route for truck ${truck.name} on ${date.toISOString().split('T')[0]}:`,
              error.message
            );
          }
        }
      }
    }

    console.log(`✅ Successfully created ${routes.length} daily routes`);

    // Summary statistics
    const routesByArea = routes.reduce((acc, route) => {
      acc[route.area] = (acc[route.area] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Routes by Mining Area:');
    Object.entries(routesByArea).forEach(([area, count]) => {
      console.log(`  - ${area}: ${count} routes`);
    });

    const avgPointsPerRoute =
      routes.reduce((sum, route) => sum + route.pointCount, 0) / routes.length;
    console.log(`\n📍 Average waypoints per route: ${avgPointsPerRoute.toFixed(1)}`);

    // Verify data in database
    const totalRoutes = await prisma.daily_route.count();
    console.log(`\n✅ Total routes in database: ${totalRoutes}`);

    // Show sample of created routes
    const sampleRoutes = await prisma.daily_route.findMany({
      take: 5,
      include: {
        truck: {
          select: { name: true },
        },
      },
      orderBy: { route_date: 'desc' },
    });

    console.log('\n📋 Sample routes created:');
    sampleRoutes.forEach((route) => {
      console.log(
        `  - ${route.truck.name}: ${route.route_date.toISOString().split('T')[0]} - ${route.point_count} points`
      );
    });
  } catch (error) {
    console.error('❌ Error during daily route seeding:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Daily Route Seeding...\n');

  try {
    await seedDailyRoutes();
    console.log('\n🎉 Daily route seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { seedDailyRoutes };
