const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();

let isRunning = true;

async function simulateTruckMovement() {
  try {
    console.log('🚛 Starting Truck Movement Simulator...\n');
    
    // Get all active devices
    const devices = await prisma.device.findMany({
      where: { 
        status: 'active',
        deleted_at: null 
      },
      include: {
        truck: {
          select: {
            id: true,
            name: true,
            plate: true
          }
        }
      },
      take: 6
    });
    
    console.log(`📊 Found ${devices.length} active devices\n`);
    
    // Truck scenarios
    const scenarios = [
      { name: 'Parked', speedRange: [0, 0.5], icon: '🅿️' },
      { name: 'Idle', speedRange: [1, 9], icon: '⏸️' },
      { name: 'Moving Slow', speedRange: [10, 30], icon: '🚛' },
      { name: 'Moving Normal', speedRange: [30, 60], icon: '🚛' },
      { name: 'Moving Fast', speedRange: [60, 90], icon: '🚛' },
      { name: 'Stationary', speedRange: [0, 0], icon: '🅿️' },
    ];
    
    let iteration = 0;
    
    const simulate = async () => {
      if (!isRunning) return;
      
      iteration++;
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🔄 Iteration ${iteration} - ${new Date().toLocaleTimeString()}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
      
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        const scenario = scenarios[i % scenarios.length];
        
        // Generate random speed within scenario range
        const [minSpeed, maxSpeed] = scenario.speedRange;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        
        // Generate random heading (0-360 degrees)
        const heading = Math.random() * 360;
        
        // Generate position (slight variation for movement)
        const baseLat = -0.5 + (i * 0.01);
        const baseLong = 117.1 + (i * 0.01);
        const latVariation = (Math.random() - 0.5) * 0.001 * (speed / 10);
        const longVariation = (Math.random() - 0.5) * 0.001 * (speed / 10);
        
        // Create location record
        await prisma.location.create({
          data: {
            device_id: device.id,
            lat: baseLat + latVariation,
            long: baseLong + longVariation,
            speed: parseFloat(speed.toFixed(2)),
            heading: parseFloat(heading.toFixed(2)),
            altitude: 100 + Math.random() * 50,
            accuracy: Math.random() * 10,
            recorded_at: new Date(),
          }
        });
        
        // Determine status based on speed
        let status;
        if (speed < 1) status = '🅿️ PARKED';
        else if (speed < 10) status = '⏸️ IDLE';
        else if (speed < 30) status = '🚛 MOVING (Slow)';
        else if (speed < 60) status = '🚛 MOVING (Normal)';
        else status = '🚛 MOVING (Fast)';
        
        console.log(
          `${scenario.icon} Device ${device.sn} | ` +
          `Truck: ${device.truck?.plate || 'N/A'} | ` +
          `Speed: ${speed.toFixed(1)} km/h | ` +
          `Heading: ${heading.toFixed(0)}° | ` +
          `Status: ${status}`
        );
      }
      
      // Statistics
      const stats = await prisma.location.groupBy({
        by: ['device_id'],
        _count: true,
        orderBy: {
          device_id: 'asc'
        }
      });
      
      const speedStats = await prisma.$queryRaw`
        SELECT 
          COUNT(*) FILTER (WHERE speed < 1) as parked,
          COUNT(*) FILTER (WHERE speed >= 1 AND speed < 10) as idle,
          COUNT(*) FILTER (WHERE speed >= 10) as moving,
          COUNT(*) as total
        FROM location
        WHERE created_at > NOW() - INTERVAL '5 minutes'
      `;
      
      console.log('\n📊 Last 5 Minutes Statistics:');
      console.log(`   🅿️ Parked: ${speedStats[0].parked}`);
      console.log(`   ⏸️ Idle: ${speedStats[0].idle}`);
      console.log(`   🚛 Moving: ${speedStats[0].moving}`);
      console.log(`   📍 Total: ${speedStats[0].total}`);
      
      console.log('\n⏱️  Next update in 5 seconds...');
    };
    
    // Run first iteration immediately
    await simulate();
    
    // Then run every 5 seconds
    const interval = setInterval(simulate, 5000);
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n\n🛑 Stopping simulator...');
      isRunning = false;
      clearInterval(interval);
      await prisma.$disconnect();
      console.log('✅ Simulator stopped gracefully');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Start simulator
simulateTruckMovement();
