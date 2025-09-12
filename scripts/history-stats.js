// scripts/history-stats.js
// Generate comprehensive statistics for location history data

const { PrismaClient } = require('@prisma/client');
const moment = require('moment');
const fs = require('fs').promises;

const prisma = new PrismaClient();

class HistoryStatsGenerator {
  async generateStats() {
    console.log('📊 Fleet Management - Location History Statistics');
    console.log('='.repeat(60));

    try {
      const stats = await this.calculateAllStats();
      await this.displayStats(stats);
      await this.generateReport(stats);
    } catch (error) {
      console.error('❌ Error generating statistics:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async calculateAllStats() {
    console.log('🔄 Calculating statistics...\n');

    // Basic counts
    const basicStats = await this.getBasicStats();

    // Time-based analysis
    const timeStats = await this.getTimeBasedStats();

    // Speed and movement analysis
    const speedStats = await this.getSpeedStats();

    // Fuel consumption analysis
    const fuelStats = await this.getFuelStats();

    // Location distribution
    const locationStats = await this.getLocationStats();

    // Per-truck analysis
    const truckStats = await this.getPerTruckStats();

    // Activity patterns
    const activityStats = await this.getActivityPatterns();

    return {
      basic: basicStats,
      time: timeStats,
      speed: speedStats,
      fuel: fuelStats,
      location: locationStats,
      trucks: truckStats,
      activity: activityStats,
      generatedAt: new Date(),
    };
  }

  async getBasicStats() {
    const [totalRecords, uniqueTrucks, dateRange, trucksWithHistory] = await Promise.all([
      prisma.locationHistory.count(),

      prisma.locationHistory.groupBy({
        by: ['truckId'],
        _count: true,
      }),

      prisma.locationHistory.aggregate({
        _min: { recordedAt: true },
        _max: { recordedAt: true },
      }),

      prisma.truck.count({
        where: {
          locationHistory: {
            some: {},
          },
        },
      }),
    ]);

    return {
      totalRecords,
      uniqueTrucks: uniqueTrucks.length,
      trucksWithHistory,
      dateRange: {
        start: dateRange._min.recordedAt,
        end: dateRange._max.recordedAt,
        days: moment(dateRange._max.recordedAt).diff(moment(dateRange._min.recordedAt), 'days'),
      },
      avgRecordsPerTruck: Math.round(totalRecords / uniqueTrucks.length),
    };
  }

  async getTimeBasedStats() {
    // Records by hour of day
    const hourlyData = await prisma.$queryRaw`
      SELECT 
        EXTRACT(HOUR FROM recorded_at) as hour,
        COUNT(*) as record_count,
        AVG(speed) as avg_speed,
        COUNT(CASE WHEN speed > 0 THEN 1 END) as active_records
      FROM location_history 
      GROUP BY EXTRACT(HOUR FROM recorded_at)
      ORDER BY hour
    `;

    // Records by day of week
    const dailyData = await prisma.$queryRaw`
      SELECT 
        EXTRACT(DOW FROM recorded_at) as day_of_week,
        COUNT(*) as record_count,
        AVG(speed) as avg_speed
      FROM location_history 
      GROUP BY EXTRACT(DOW FROM recorded_at)
      ORDER BY day_of_week
    `;

    // Last 7 days activity
    const recentActivity = await prisma.$queryRaw`
      SELECT 
        DATE(recorded_at) as date,
        COUNT(*) as record_count,
        COUNT(DISTINCT truck_id) as active_trucks,
        AVG(speed) as avg_speed,
        MAX(speed) as max_speed
      FROM location_history 
      WHERE recorded_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(recorded_at)
      ORDER BY date DESC
    `;

    return {
      hourlyDistribution: hourlyData,
      dailyDistribution: dailyData,
      recentActivity: recentActivity,
    };
  }

  async getSpeedStats() {
    const speedData = await prisma.locationHistory.aggregate({
      _avg: { speed: true },
      _max: { speed: true },
      _min: { speed: true },
    });

    // Speed distribution
    const speedDistribution = await prisma.$queryRaw`
      SELECT 
        CASE 
          WHEN speed = 0 THEN 'Stationary (0 km/h)'
          WHEN speed <= 10 THEN 'Very Slow (1-10 km/h)'
          WHEN speed <= 25 THEN 'Slow (11-25 km/h)'
          WHEN speed <= 40 THEN 'Medium (26-40 km/h)'
          WHEN speed <= 60 THEN 'Fast (41-60 km/h)'
          ELSE 'Very Fast (>60 km/h)'
        END as speed_category,
        COUNT(*) as record_count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
      FROM location_history
      GROUP BY 
        CASE 
          WHEN speed = 0 THEN 'Stationary (0 km/h)'
          WHEN speed <= 10 THEN 'Very Slow (1-10 km/h)'
          WHEN speed <= 25 THEN 'Slow (11-25 km/h)'
          WHEN speed <= 40 THEN 'Medium (26-40 km/h)'
          WHEN speed <= 60 THEN 'Fast (41-60 km/h)'
          ELSE 'Very Fast (>60 km/h)'
        END
      ORDER BY 
        CASE 
          WHEN speed = 0 THEN 0
          WHEN speed <= 10 THEN 1
          WHEN speed <= 25 THEN 2
          WHEN speed <= 40 THEN 3
          WHEN speed <= 60 THEN 4
          ELSE 5
        END
    `;

    return {
      average: parseFloat(speedData._avg.speed || 0),
      maximum: parseFloat(speedData._max.speed || 0),
      minimum: parseFloat(speedData._min.speed || 0),
      distribution: speedDistribution,
    };
  }

  async getFuelStats() {
    const fuelData = await prisma.locationHistory.aggregate({
      _avg: { fuelPercentage: true },
      _min: { fuelPercentage: true },
      _max: { fuelPercentage: true },
    });

    // Low fuel incidents
    const lowFuelIncidents = await prisma.$queryRaw`
      SELECT 
        truck_id,
        COUNT(*) as low_fuel_records,
        MIN(fuel_percentage) as lowest_fuel,
        AVG(fuel_percentage) as avg_fuel_during_low
      FROM location_history 
      WHERE fuel_percentage < 20
      GROUP BY truck_id
      ORDER BY low_fuel_records DESC
      LIMIT 10
    `;

    // Fuel consumption patterns
    const fuelPatterns = await prisma.$queryRaw`
      SELECT 
        CASE 
          WHEN fuel_percentage >= 80 THEN 'High (80-100%)'
          WHEN fuel_percentage >= 60 THEN 'Medium-High (60-79%)'
          WHEN fuel_percentage >= 40 THEN 'Medium (40-59%)'
          WHEN fuel_percentage >= 20 THEN 'Low (20-39%)'
          ELSE 'Critical (<20%)'
        END as fuel_level,
        COUNT(*) as record_count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
      FROM location_history
      WHERE fuel_percentage IS NOT NULL
      GROUP BY 
        CASE 
          WHEN fuel_percentage >= 80 THEN 'High (80-100%)'
          WHEN fuel_percentage >= 60 THEN 'Medium-High (60-79%)'
          WHEN fuel_percentage >= 40 THEN 'Medium (40-59%)'
          WHEN fuel_percentage >= 20 THEN 'Low (20-39%)'
          ELSE 'Critical (<20%)'
        END
      ORDER BY 
        CASE 
          WHEN fuel_percentage >= 80 THEN 0
          WHEN fuel_percentage >= 60 THEN 1
          WHEN fuel_percentage >= 40 THEN 2
          WHEN fuel_percentage >= 20 THEN 3
          ELSE 4
        END
    `;

    return {
      average: parseFloat(fuelData._avg.fuelPercentage || 0),
      minimum: parseFloat(fuelData._min.fuelPercentage || 0),
      maximum: parseFloat(fuelData._max.fuelPercentage || 0),
      lowFuelIncidents: lowFuelIncidents,
      distribution: fuelPatterns,
    };
  }

  async getLocationStats() {
    // Geographic bounds of operations
    const bounds = await prisma.locationHistory.aggregate({
      _min: { latitude: true, longitude: true },
      _max: { latitude: true, longitude: true },
    });

    // Most active areas (simplified grid)
    const activeAreas = await prisma.$queryRaw`
      SELECT 
        ROUND(latitude, 3) as lat_grid,
        ROUND(longitude, 3) as lng_grid,
        COUNT(*) as activity_count,
        COUNT(DISTINCT truck_id) as unique_trucks,
        AVG(speed) as avg_speed
      FROM location_history
      GROUP BY ROUND(latitude, 3), ROUND(longitude, 3)
      HAVING COUNT(*) > 50
      ORDER BY activity_count DESC
      LIMIT 15
    `;

    return {
      operationalBounds: {
        minLatitude: parseFloat(bounds._min.latitude || 0),
        maxLatitude: parseFloat(bounds._max.latitude || 0),
        minLongitude: parseFloat(bounds._min.longitude || 0),
        maxLongitude: parseFloat(bounds._max.longitude || 0),
      },
      mostActiveAreas: activeAreas,
    };
  }

  async getPerTruckStats() {
    const truckStats = await prisma.$queryRaw`
      SELECT 
        t.truck_number,
        t.status,
        COUNT(lh.id) as total_records,
        MIN(lh.recorded_at) as first_record,
        MAX(lh.recorded_at) as last_record,
        AVG(lh.speed) as avg_speed,
        MAX(lh.speed) as max_speed,
        AVG(lh.fuel_percentage) as avg_fuel,
        MIN(lh.fuel_percentage) as min_fuel,
        COUNT(CASE WHEN lh.speed = 0 THEN 1 END) as stationary_records,
        ROUND(
          COUNT(CASE WHEN lh.speed = 0 THEN 1 END) * 100.0 / COUNT(lh.id), 2
        ) as stationary_percentage
      FROM trucks t
      LEFT JOIN location_history lh ON t.id = lh.truck_id
      WHERE lh.id IS NOT NULL
      GROUP BY t.id, t.truck_number, t.status
      ORDER BY total_records DESC
      LIMIT 20
    `;

    return truckStats;
  }

  async getActivityPatterns() {
    // Shift patterns analysis
    const shiftActivity = await prisma.$queryRaw`
      SELECT 
        CASE 
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 6 AND 18 THEN 'Day Shift (6-18h)'
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 18 AND 22 THEN 'Evening (18-22h)'
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 22 AND 24 OR EXTRACT(HOUR FROM recorded_at) BETWEEN 0 AND 6 THEN 'Night Shift (22-6h)'
        END as shift_period,
        COUNT(*) as total_records,
        COUNT(DISTINCT truck_id) as active_trucks,
        AVG(speed) as avg_speed,
        COUNT(CASE WHEN speed > 0 THEN 1 END) as moving_records,
        ROUND(COUNT(CASE WHEN speed > 0 THEN 1 END) * 100.0 / COUNT(*), 2) as activity_percentage
      FROM location_history
      GROUP BY 
        CASE 
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 6 AND 18 THEN 'Day Shift (6-18h)'
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 18 AND 22 THEN 'Evening (18-22h)'
          WHEN EXTRACT(HOUR FROM recorded_at) BETWEEN 22 AND 24 OR EXTRACT(HOUR FROM recorded_at) BETWEEN 0 AND 6 THEN 'Night Shift (22-6h)'
        END
      ORDER BY shift_period
    `;

    // Weekend vs weekday patterns
    const weekendPattern = await prisma.$queryRaw`
      SELECT 
        CASE 
          WHEN EXTRACT(DOW FROM recorded_at) IN (0, 6) THEN 'Weekend'
          ELSE 'Weekday'
        END as period_type,
        COUNT(*) as total_records,
        COUNT(DISTINCT truck_id) as active_trucks,
        AVG(speed) as avg_speed,
        COUNT(CASE WHEN speed > 0 THEN 1 END) as moving_records
      FROM location_history
      GROUP BY 
        CASE 
          WHEN EXTRACT(DOW FROM recorded_at) IN (0, 6) THEN 'Weekend'
          ELSE 'Weekday'
        END
      ORDER BY period_type
    `;

    return {
      shiftPatterns: shiftActivity,
      weekendVsWeekday: weekendPattern,
    };
  }

  async displayStats(stats) {
    console.log('📊 BASIC STATISTICS');
    console.log('-'.repeat(40));
    console.log(`Total Records: ${stats.basic.totalRecords.toLocaleString()}`);
    console.log(`Unique Trucks: ${stats.basic.uniqueTrucks}`);
    console.log(`Trucks with History: ${stats.basic.trucksWithHistory}`);
    console.log(
      `Date Range: ${moment(stats.basic.dateRange.start).format('YYYY-MM-DD')} to ${moment(stats.basic.dateRange.end).format('YYYY-MM-DD')} (${stats.basic.dateRange.days} days)`
    );
    console.log(`Avg Records/Truck: ${stats.basic.avgRecordsPerTruck}`);

    console.log('\n🚀 SPEED ANALYSIS');
    console.log('-'.repeat(40));
    console.log(`Average Speed: ${stats.speed.average.toFixed(2)} km/h`);
    console.log(`Maximum Speed: ${stats.speed.maximum.toFixed(2)} km/h`);
    console.log(`Speed Distribution:`);
    stats.speed.distribution.forEach((item) => {
      console.log(
        `  ${item.speed_category}: ${item.record_count.toLocaleString()} (${item.percentage}%)`
      );
    });

    console.log('\n⛽ FUEL ANALYSIS');
    console.log('-'.repeat(40));
    console.log(`Average Fuel Level: ${stats.fuel.average.toFixed(2)}%`);
    console.log(`Minimum Fuel Level: ${stats.fuel.minimum.toFixed(2)}%`);
    console.log(`Fuel Distribution:`);
    stats.fuel.distribution.forEach((item) => {
      console.log(
        `  ${item.fuel_level}: ${item.record_count.toLocaleString()} (${item.percentage}%)`
      );
    });

    console.log('\n📍 LOCATION ANALYSIS');
    console.log('-'.repeat(40));
    const bounds = stats.location.operationalBounds;
    console.log(`Operational Area:`);
    console.log(`  Latitude: ${bounds.minLatitude.toFixed(6)} to ${bounds.maxLatitude.toFixed(6)}`);
    console.log(
      `  Longitude: ${bounds.minLongitude.toFixed(6)} to ${bounds.maxLongitude.toFixed(6)}`
    );
    console.log(`Most Active Areas (Top 5):`);
    stats.location.mostActiveAreas.slice(0, 5).forEach((area, index) => {
      console.log(
        `  ${index + 1}. Lat: ${area.lat_grid}, Lng: ${area.lng_grid} - ${area.activity_count} records`
      );
    });

    console.log('\n⏰ ACTIVITY PATTERNS');
    console.log('-'.repeat(40));
    console.log('Shift Activity:');
    stats.activity.shiftPatterns.forEach((shift) => {
      console.log(
        `  ${shift.shift_period}: ${shift.total_records.toLocaleString()} records, ${shift.activity_percentage}% active`
      );
    });

    console.log('Weekend vs Weekday:');
    stats.activity.weekendVsWeekday.forEach((period) => {
      console.log(
        `  ${period.period_type}: ${period.total_records.toLocaleString()} records, ${period.active_trucks} trucks`
      );
    });

    console.log('\n🚛 TOP ACTIVE TRUCKS (Top 10)');
    console.log('-'.repeat(40));
    stats.trucks.slice(0, 10).forEach((truck, index) => {
      const lastActivity = moment(truck.last_record).fromNow();
      console.log(`${index + 1}. ${truck.truck_number} (${truck.status})`);
      console.log(
        `   Records: ${truck.total_records.toLocaleString()}, Avg Speed: ${parseFloat(truck.avg_speed || 0).toFixed(1)} km/h`
      );
      console.log(`   Last Activity: ${lastActivity}, Stationary: ${truck.stationary_percentage}%`);
    });
  }

  async generateReport(stats) {
    const reportData = {
      ...stats,
      summary: {
        reportGenerated: moment().format('YYYY-MM-DD HH:mm:ss'),
        dataQuality: this.assessDataQuality(stats),
        recommendations: this.generateRecommendations(stats),
      },
    };

    const reportFile = `logs/history-stats-${moment().format('YYYY-MM-DD-HH-mm')}.json`;
    await fs.writeFile(reportFile, JSON.stringify(reportData, null, 2));

    console.log(`\n📄 Report saved to: ${reportFile}`);

    // Also create a CSV summary for easy analysis
    await this.generateCSVSummary(stats);
  }

  async generateCSVSummary(stats) {
    const csvLines = [
      'Metric,Value,Unit',
      `Total Records,${stats.basic.totalRecords},count`,
      `Unique Trucks,${stats.basic.uniqueTrucks},count`,
      `Date Range Days,${stats.basic.dateRange.days},days`,
      `Average Speed,${stats.speed.average.toFixed(2)},km/h`,
      `Maximum Speed,${stats.speed.maximum.toFixed(2)},km/h`,
      `Average Fuel,${stats.fuel.average.toFixed(2)},%`,
      `Minimum Fuel,${stats.fuel.minimum.toFixed(2)},%`,
    ];

    const csvFile = `logs/history-summary-${moment().format('YYYY-MM-DD')}.csv`;
    await fs.writeFile(csvFile, csvLines.join('\n'));

    console.log(`📊 CSV summary saved to: ${csvFile}`);
  }

  assessDataQuality(stats) {
    const quality = {
      completeness: 'Good',
      consistency: 'Good',
      issues: [],
    };

    // Check for data gaps
    if (stats.basic.totalRecords < stats.basic.uniqueTrucks * 100) {
      quality.completeness = 'Poor';
      quality.issues.push('Low record count per truck');
    }

    // Check for unrealistic speeds
    if (stats.speed.maximum > 80) {
      quality.consistency = 'Warning';
      quality.issues.push('Unusually high speeds detected');
    }

    return quality;
  }

  generateRecommendations(stats) {
    const recommendations = [];

    if (stats.fuel.minimum < 5) {
      recommendations.push('Monitor trucks with critically low fuel levels');
    }

    if (stats.speed.maximum > 70) {
      recommendations.push('Review speed limits and safety protocols');
    }

    const stationaryRate = stats.speed.distribution.find((d) =>
      d.speed_category.includes('Stationary')
    );
    if (stationaryRate && parseFloat(stationaryRate.percentage) > 60) {
      recommendations.push('High stationary time detected - review operational efficiency');
    }

    return recommendations;
  }
}

// CLI interface
async function main() {
  const generator = new HistoryStatsGenerator();
  await generator.generateStats();
}

module.exports = { HistoryStatsGenerator };

if (require.main === module) {
  main().catch(console.error);
}
