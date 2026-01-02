const { prisma } = require('../config/prisma');

/**
 * Get location history with sensor snapshots for a truck
 * 
 * IMPORTANT: Menggunakan snapshot data dari sensor_history
 * Sehingga data history tetap dapat ditampilkan meskipun master data sudah dihapus
 * 
 * @param {number} truckId - Truck ID (optional, bisa null jika truck sudah dihapus)
 * @param {object} options - Query options (startDate, endDate, limit, truckPlate)
 * @returns {Promise<Array>} Location timeline with sensor data
 */
const getHistoryWithSensors = async (truckId, options = {}) => {
  const { startDate, endDate, limit = 100, truckPlate } = options;

  try {
    // Build where clause - support both truck_id and truck_plate (snapshot)
    const where = {};
    
    // Query by truck_id (works for both active and deleted trucks via snapshot)
    if (truckId) {
      where.truck_id = truckId;
    }
    
    // If truckPlate provided, search by snapshot plate (alternative identifier)
    if (truckPlate) {
      where.truck_plate = truckPlate;
    }

    if (startDate || endDate) {
      where.recorded_at = {};
      if (startDate) where.recorded_at.gte = new Date(startDate);
      if (endDate) where.recorded_at.lte = new Date(endDate);
    }
    
    console.log('🔍 Query sensor_history with:', { truckId, truckPlate, startDate, endDate, limit });

    // Query sensor_history directly (tidak via join ke truck)
    // Karena kita ingin tetap dapat data meskipun truck sudah dihapus
    const sensorHistories = await prisma.sensor_history.findMany({
      where,
      orderBy: { recorded_at: 'desc' },
      take: limit,
      include: {
        location: {
          select: {
            id: true,
            lat: true,
            long: true,
            speed: true,
            heading: true,
            recorded_at: true
          }
        }
      }
    });
    
    console.log(`✅ Found ${sensorHistories.length} sensor history records for truck ${truckId}`);
    
    if (sensorHistories.length === 0) {
      console.log(`ℹ️ No sensor history found for truck ${truckId} in date range`);
      return [];
    }

    // Group by location_id untuk mengelompokkan sensor data
    const locationMap = new Map();
    
    sensorHistories.forEach(sh => {
      const locId = sh.location_id;
      if (!locationMap.has(locId)) {
        locationMap.set(locId, {
          location_id: locId,
          timestamp: sh.recorded_at,
          location: sh.location ? {
            lat: sh.location.lat,
            lng: sh.location.long,
            speed: sh.location.speed,
            heading: sh.location.heading
          } : null,
          // Gunakan snapshot data untuk truck info (tidak dari relasi)
          truck_info: {
            truck_id: sh.truck_id,
            truck_name: sh.truck_name,
            truck_plate: sh.truck_plate,
            truck_vin: sh.truck_vin,
            truck_model: sh.truck_model,
            truck_year: sh.truck_year,
            driver_name: sh.driver_name,
            vendor_name: sh.vendor_name
          },
          tires: []
        });
      }
      
      // Add tire data
      locationMap.get(locId).tires.push({
        tireNo: sh.tireNo,
        position: getTirePosition(sh.tireNo),
        temperature: sh.tempValue,
        pressure: sh.tirepValue,
        status: sh.exType,
        battery: sh.bat,
        sensor_sn: sh.sensor_sn,
        timestamp: sh.recorded_at
      });
    });

    // Convert map to array and sort tires by tireNo
    const timeline = Array.from(locationMap.values()).map(item => ({
      ...item,
      tires: item.tires.sort((a, b) => a.tireNo - b.tireNo)
    }));

    console.log(`✅ Processed ${timeline.length} location points with tire data`);
    return timeline;
  } catch (error) {
    console.error('Error fetching sensor history:', error);
    throw error;
  }
};

/**
 * Get tire position label
 */
const getTirePosition = (tireNo) => {
  const positions = {
    1: 'Front Left Outer',
    2: 'Front Left Inner',
    3: 'Front Right Inner',
    4: 'Front Right Outer',
    5: 'Rear Left Outer',
    6: 'Rear Left Inner',
    7: 'Rear Center Left',
    8: 'Rear Center Right',
    9: 'Rear Right Inner',
    10: 'Rear Right Outer',
  };
  return positions[tireNo] || `Tire ${tireNo}`;
};

/**
 * Get sensor history statistics for a truck
 */
const getHistoryStats = async (truckId, options = {}) => {
  const { startDate, endDate } = options;

  try {
    const where = { truck_id: truckId };
    if (startDate || endDate) {
      where.recorded_at = {};
      if (startDate) where.recorded_at.gte = new Date(startDate);
      if (endDate) where.recorded_at.lte = new Date(endDate);
    }

    const stats = await prisma.sensor_history.groupBy({
      by: ['tireNo'],
      where,
      _avg: {
        tempValue: true,
        tirepValue: true,
      },
      _min: {
        tempValue: true,
        tirepValue: true,
      },
      _max: {
        tempValue: true,
        tirepValue: true,
      },
      _count: {
        id: true,
      },
    });

    return stats.map((stat) => ({
      tireNo: stat.tireNo,
      position: getTirePosition(stat.tireNo),
      averageTemp: stat._avg.tempValue ? parseFloat(stat._avg.tempValue.toFixed(2)) : null,
      averagePressure: stat._avg.tirepValue ? parseFloat(stat._avg.tirepValue.toFixed(2)) : null,
      minTemp: stat._min.tempValue,
      maxTemp: stat._max.tempValue,
      minPressure: stat._min.tirepValue,
      maxPressure: stat._max.tirepValue,
      recordCount: stat._count.id,
    }));
  } catch (error) {
    console.error('Error fetching history stats:', error);
    throw error;
  }
};

module.exports = {
  getHistoryWithSensors,
  getHistoryStats,
  getTirePosition,
};
