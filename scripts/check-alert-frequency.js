const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkAlertFrequency() {
  try {
    console.log('🔍 Checking alert frequency...\n');
    
    // Get alert count per truck in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const alertsByTruck = await prisma.alert_events.groupBy({
      by: ['truck_id'],
      where: {
        created_at: {
          gte: last24Hours
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });
    
    console.log('📊 Alert count by truck (last 24 hours):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    for (const group of alertsByTruck) {
      const truck = await prisma.truck.findUnique({
        where: { id: group.truck_id },
        select: { plate: true, name: true }
      });
      
      console.log(`Truck ID ${group.truck_id} (${truck?.plate}): ${group._count.id} alerts`);
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Get recent alerts (last 50)
    const recentAlerts = await prisma.alert_events.findMany({
      take: 50,
      orderBy: { created_at: 'desc' },
      include: {
        truck: {
          select: { plate: true }
        }
      }
    });
    
    console.log('📋 Last 50 alerts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const alertCounts = {};
    
    recentAlerts.forEach((alert, index) => {
      const plateKey = alert.truck?.plate || `Truck ${alert.truck_id}`;
      alertCounts[plateKey] = (alertCounts[plateKey] || 0) + 1;
      
      if (index < 20) { // Show first 20
        console.log(`${index + 1}. [${new Date(alert.created_at).toLocaleTimeString()}] ${plateKey}: ${alert.message}`);
      }
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Alert distribution in last 50 alerts:');
    Object.entries(alertCounts).forEach(([plate, count]) => {
      console.log(`   ${plate}: ${count} alerts (${(count / 50 * 100).toFixed(1)}%)`);
    });
    
    // Check alert frequency (interval between alerts)
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⏱️  Alert intervals for each truck:\n');
    
    for (const group of alertsByTruck.slice(0, 5)) {
      const truck = await prisma.truck.findUnique({
        where: { id: group.truck_id },
        select: { plate: true }
      });
      
      const alerts = await prisma.alert_events.findMany({
        where: { truck_id: group.truck_id },
        orderBy: { created_at: 'desc' },
        take: 10,
        select: { created_at: true }
      });
      
      if (alerts.length > 1) {
        const intervals = [];
        for (let i = 0; i < alerts.length - 1; i++) {
          const diff = (new Date(alerts[i].created_at) - new Date(alerts[i + 1].created_at)) / 1000 / 60;
          intervals.push(diff);
        }
        
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        console.log(`${truck?.plate}:`);
        console.log(`   Average interval: ${avgInterval.toFixed(1)} minutes`);
        console.log(`   Min: ${Math.min(...intervals).toFixed(1)} min, Max: ${Math.max(...intervals).toFixed(1)} min`);
        console.log(`   Last 5 intervals: ${intervals.slice(0, 5).map(i => i.toFixed(1) + 'min').join(', ')}`);
        console.log('');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAlertFrequency();
