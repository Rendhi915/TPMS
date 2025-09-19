const pool = require('../config/database');
const { broadcastTruckLocationUpdate } = require('./websocketService');

const startRealTimeSimulation = () => {
  setInterval(async () => {
    try {
      // Get random active trucks to update
      const trucksQuery = `
        SELECT 
          id, 
          longitude, 
          latitude, 
          fuel_percentage, 
          speed, 
          heading
        FROM trucks 
        WHERE status = 'active' 
        AND latitude IS NOT NULL 
        AND longitude IS NOT NULL
        ORDER BY RANDOM() 
        LIMIT $1
      `;

      const trucksToUpdate = Math.floor(Math.random() * 50) + 10; // Update 10-60 trucks
      const result = await pool.query(trucksQuery, [trucksToUpdate]);

      for (const truck of result.rows) {
        // Ensure all values are properly parsed and within PT INDOBARA bounds
        const currentLng = parseFloat(truck.longitude) || 115.545;
        const currentLat = parseFloat(truck.latitude) || -3.575;
        const currentFuel = parseFloat(truck.fuel_percentage) || 50;
        // const currentSpeed = parseFloat(data.speed_kph || 0); // Unused variable
        const currentHeading = parseInt(truck.heading) || 0;

        // Simulate movement (small random displacement within PT INDOBARA)
        const newLng = parseFloat((currentLng + (Math.random() - 0.5) * 0.002).toFixed(8));
        const newLat = parseFloat((currentLat + (Math.random() - 0.5) * 0.002).toFixed(8));

        // Ensure bounds are within PT INDOBARA mining area
        const boundedLng = Math.max(115.432199323066001, Math.min(115.658299919322602, newLng));
        const boundedLat = Math.max(-3.717200000114277, Math.min(-3.431898966201222, newLat));

        // Generate new values with proper bounds and types
        const newSpeed = Math.round(Math.random() * 60); // 0-60 km/h as integer
        const newHeading = Math.round((currentHeading + (Math.random() - 0.5) * 30) % 360); // Keep within 0-359
        const newFuel = parseFloat(Math.max(0, currentFuel - Math.random() * 0.5).toFixed(2)); // Decimal with 2 places

        // Ensure heading is positive
        const finalHeading = newHeading < 0 ? newHeading + 360 : newHeading;

        // Update truck in database with proper data types and explicit casting
        await pool.query(
          `
          UPDATE trucks 
          SET 
            longitude = $1::DECIMAL(11,8),
            latitude = $2::DECIMAL(10,8),
            speed = $3, 
            heading = $4, 
            fuel_percentage = $5::DECIMAL(5,2), 
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $6
        `,
          [
            boundedLng, // DECIMAL longitude
            boundedLat, // DECIMAL latitude
            newSpeed, // INTEGER speed
            finalHeading, // INTEGER heading (0-359)
            newFuel, // DECIMAL fuel percentage
            truck.id, // INTEGER truck id
          ]
        );

        // Insert location history record for tracking
        await pool.query(
          `
          INSERT INTO location_history (truck_id, latitude, longitude, speed, heading, fuel_percentage, recorded_at)
          VALUES ($1, $2::DECIMAL(10,8), $3::DECIMAL(11,8), $4, $5, $6::DECIMAL(5,2), CURRENT_TIMESTAMP)
        `,
          [truck.id, boundedLat, boundedLng, newSpeed, finalHeading, newFuel]
        );

        // Occasionally update tire pressures (10% chance)
        if (Math.random() < 0.1) {
          const pressureChange = parseFloat(((Math.random() - 0.5) * 4).toFixed(1)); // -2.0 to +2.0 PSI

          await pool.query(
            `
            UPDATE tire_pressures 
            SET 
              tire_pressure = GREATEST(50, LEAST(150, tire_pressure + $1::DECIMAL(5,1))),
              status = CASE 
                WHEN tire_pressure + $1::DECIMAL(5,1) < 80 THEN 'low'
                WHEN tire_pressure + $1::DECIMAL(5,1) > 120 THEN 'high'
                ELSE 'normal'
              END,
              recorded_at = CURRENT_TIMESTAMP
            WHERE truck_id = $2
          `,
            [pressureChange, truck.id]
          );
        }
      }

      // Broadcast updates to subscribed clients
      broadcastTruckLocationUpdate({
        timestamp: new Date(),
        updatedCount: result.rows.length,
      });
    } catch (error) {
      console.error('Error updating real-time data:', error);
      // Log detailed error for debugging
      if (error.code) {
        console.error(`Database Error Code: ${error.code}`);
        console.error(`Error Detail: ${error.detail}`);
      }
    }
  }, 5000); // Update every 5 seconds
};

module.exports = {
  startRealTimeSimulation,
};
