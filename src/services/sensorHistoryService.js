const { prisma } = require('../config/prisma');

/**
 * Get location history with sensor snapshots for a truck
 * @param {number} truckId - Truck ID
 * @param {object} options - Query options (startDate, endDate, limit)
 * @returns {Promise<Array>} Location timeline with sensor data
 */
const getHistoryWithSensors = async (truckId, options = {}) => {
  const { startDate, endDate, limit = 100 } = options;

  try {
    // Get truck's device
    const device = await prisma.device.findFirst({
      where: {
        truck_id: truckId,
        status: 'active',
        deleted_at: null,
      },
    });

    if (!device) {
      throw new Error(`No active device found for truck ${truckId}`);
    }

    // Build where clause
    const where = {
      device_id: device.id,
    };

    if (startDate || endDate) {
      where.recorded_at = {};
      if (startDate) where.recorded_at.gte = new Date(startDate);
      if (endDate) where.recorded_at.lte = new Date(endDate);
    }

    // Get locations with sensor history
    const locations = await prisma.location.findMany({
      where,
      orderBy: { recorded_at: 'desc' },
      take: limit,
      include: {
        sensor_history: {
          orderBy: { tireNo: 'asc' },
          select: {
            tireNo: true,
            sensorNo: true,
            tempValue: true,
            tirepValue: true,
            exType: true,
            bat: true,
            recorded_at: true,
          },
        },
      },
    });

    // Transform to frontend-friendly format
    const timeline = locations.map((loc) => ({
      timestamp: loc.recorded_at,
      location: {
        lat: loc.lat,
        lng: loc.long,
      },
      tires: loc.sensor_history.map((sh) => ({
        tireNo: sh.tireNo,
        position: getTirePosition(sh.tireNo),
        temperature: sh.tempValue,
        pressure: sh.tirepValue,
        status: sh.exType,
        battery: sh.bat,
        timestamp: sh.recorded_at,
      })),
    }));

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
    const device = await prisma.device.findFirst({
      where: {
        truck_id: truckId,
        status: 'active',
        deleted_at: null,
      },
    });

    if (!device) {
      throw new Error(`No active device found for truck ${truckId}`);
    }

    const where = { device_id: device.id };
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
