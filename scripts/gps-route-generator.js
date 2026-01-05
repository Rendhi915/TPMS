/**
 * GPS Route Generator - Generate realistic vehicle routes within GeoJSON area
 *
 * Features:
 * - Reads GeoJSON Polygon/MultiPolygon boundaries
 * - Generates continuous routes entirely within the area
 * - Realistic vehicle movement with smooth transitions
 * - Automatic boundary collision detection and avoidance
 * - Configurable route patterns and behaviors
 *
 * @module gps-route-generator
 */

const turf = require('@turf/turf');

/**
 * GPS Route Generator Class
 */
class GPSRouteGenerator {
  /**
   * @param {Object} geoJsonArea - GeoJSON Polygon or MultiPolygon
   * @param {Object} options - Configuration options
   */
  constructor(geoJsonArea, options = {}) {
    this.geoJsonArea = geoJsonArea;

    // Configuration
    this.config = {
      // Movement parameters
      minSpeed: options.minSpeed || 15, // km/h
      maxSpeed: options.maxSpeed || 25, // km/h
      avgSpeed: options.avgSpeed || 20, // km/h

      // Route generation
      pointInterval: options.pointInterval || 3, // seconds between points
      totalDuration: options.totalDuration || 8 * 3600, // 8 hours in seconds

      // Boundary handling
      boundaryMargin: options.boundaryMargin || 0.0001, // ~11 meters safety margin
      boundarySamplePoints: options.boundarySamplePoints || 100,

      // Movement patterns
      turnProbability: options.turnProbability || 0.1, // 10% chance to turn per point
      maxTurnAngle: options.maxTurnAngle || 45, // degrees

      // Route behavior
      routePattern: options.routePattern || 'random_walk', // 'random_walk', 'patrol', 'circular', 'zigzag'
      preferredDirection: options.preferredDirection || null, // null, 'north', 'south', 'east', 'west'

      // Start position (optional - will use last known location)
      startLat: options.startLat || null,
      startLng: options.startLng || null,

      ...options,
    };

    // Internal state
    this.polygon = null;
    this.bbox = null;
    this.centroid = null;
    this.validArea = null;
    this.currentHeading = null;

    this._initialize();
  }

  /**
   * Initialize generator - parse GeoJSON and calculate boundaries
   */
  _initialize() {
    // Convert to Turf polygon if needed
    if (this.geoJsonArea.type === 'FeatureCollection') {
      this.polygon = this.geoJsonArea.features[0];
    } else if (this.geoJsonArea.type === 'Feature') {
      this.polygon = this.geoJsonArea;
    } else {
      this.polygon = turf.feature(this.geoJsonArea);
    }

    // Calculate bounding box and centroid
    this.bbox = turf.bbox(this.polygon);
    this.centroid = turf.centroid(this.polygon);

    // Create buffered polygon for safety margin (slightly smaller area)
    try {
      this.validArea = turf.buffer(this.polygon, -this.config.boundaryMargin * 111, {
        units: 'kilometers',
      });
    } catch (error) {
      console.warn('⚠️  Could not create buffer, using original polygon:', error.message);
      this.validArea = this.polygon;
    }

    console.log('📍 GPS Route Generator Initialized:');
    console.log(`   📐 Bounding Box: [${this.bbox.join(', ')}]`);
    console.log(`   🎯 Centroid: (${this.centroid.geometry.coordinates.join(', ')})`);
    console.log(`   ⚙️  Speed Range: ${this.config.minSpeed}-${this.config.maxSpeed} km/h`);
    console.log(`   🕐 Point Interval: ${this.config.pointInterval}s`);
    console.log(`   🔄 Route Pattern: ${this.config.routePattern}`);
  }

  /**
   * Check if a point is inside the valid area
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @returns {boolean}
   */
  isPointInside(lat, lng) {
    const point = turf.point([lng, lat]);
    return turf.booleanPointInPolygon(point, this.validArea);
  }

  /**
   * Find a random point inside the area
   * @returns {Object} {lat, lng}
   */
  findRandomPointInside() {
    const maxAttempts = 1000;
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Generate random point within bounding box
      const lng = this.bbox[0] + Math.random() * (this.bbox[2] - this.bbox[0]);
      const lat = this.bbox[1] + Math.random() * (this.bbox[3] - this.bbox[1]);

      if (this.isPointInside(lat, lng)) {
        return { lat, lng };
      }

      attempts++;
    }

    // Fallback to centroid
    console.warn('⚠️  Could not find random point, using centroid');
    return {
      lat: this.centroid.geometry.coordinates[1],
      lng: this.centroid.geometry.coordinates[0],
    };
  }

  /**
   * Calculate new position based on bearing and distance
   * @param {number} lat - Starting latitude
   * @param {number} lng - Starting longitude
   * @param {number} bearing - Direction in degrees (0-360)
   * @param {number} distance - Distance in kilometers
   * @returns {Object} {lat, lng}
   */
  calculateNewPosition(lat, lng, bearing, distance) {
    const from = turf.point([lng, lat]);
    const destination = turf.destination(from, distance, bearing, { units: 'kilometers' });

    return {
      lat: destination.geometry.coordinates[1],
      lng: destination.geometry.coordinates[0],
    };
  }

  /**
   * Calculate distance between two points in kilometers
   * @param {number} lat1
   * @param {number} lng1
   * @param {number} lat2
   * @param {number} lng2
   * @returns {number} Distance in km
   */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const from = turf.point([lng1, lat1]);
    const to = turf.point([lng2, lat2]);
    return turf.distance(from, to, { units: 'kilometers' });
  }

  /**
   * Calculate bearing between two points
   * @param {number} lat1
   * @param {number} lng1
   * @param {number} lat2
   * @param {number} lng2
   * @returns {number} Bearing in degrees
   */
  calculateBearing(lat1, lng1, lat2, lng2) {
    const from = turf.point([lng1, lat1]);
    const to = turf.point([lng2, lat2]);
    return turf.bearing(from, to);
  }

  /**
   * Find a valid next point that stays within boundary
   * @param {number} currentLat
   * @param {number} currentLng
   * @param {number} preferredBearing - Preferred direction
   * @param {number} speed - Speed in km/h
   * @returns {Object} {lat, lng, bearing}
   */
  findNextValidPoint(currentLat, currentLng, preferredBearing, speed) {
    // Calculate distance for this time step
    const timeStepHours = this.config.pointInterval / 3600;
    const targetDistance = speed * timeStepHours; // km

    // Try preferred direction first
    let testBearing = preferredBearing;
    let newPos = this.calculateNewPosition(currentLat, currentLng, testBearing, targetDistance);

    if (this.isPointInside(newPos.lat, newPos.lng)) {
      return { ...newPos, bearing: testBearing };
    }

    // If preferred direction goes outside, try different angles
    const angleIncrements = [0, 45, -45, 90, -90, 135, -135, 180];

    for (const angleOffset of angleIncrements) {
      testBearing = (preferredBearing + angleOffset + 360) % 360;
      newPos = this.calculateNewPosition(currentLat, currentLng, testBearing, targetDistance);

      if (this.isPointInside(newPos.lat, newPos.lng)) {
        return { ...newPos, bearing: testBearing };
      }
    }

    // If still no valid point, try with reduced distance
    for (let distMultiplier = 0.5; distMultiplier > 0.1; distMultiplier -= 0.1) {
      const reducedDistance = targetDistance * distMultiplier;

      for (const angleOffset of angleIncrements) {
        testBearing = (preferredBearing + angleOffset + 360) % 360;
        newPos = this.calculateNewPosition(currentLat, currentLng, testBearing, reducedDistance);

        if (this.isPointInside(newPos.lat, newPos.lng)) {
          return { ...newPos, bearing: testBearing };
        }
      }
    }

    // Last resort: stay at current position
    console.warn('⚠️  Could not find valid next point, staying in place');
    return { lat: currentLat, lng: currentLng, bearing: preferredBearing };
  }

  /**
   * Generate random heading based on current heading and turn probability
   * @param {number} currentHeading
   * @returns {number} New heading in degrees
   */
  generateNextHeading(currentHeading) {
    if (currentHeading === null) {
      // Initial heading - random
      return Math.random() * 360;
    }

    // Check if vehicle should turn
    if (Math.random() < this.config.turnProbability) {
      // Turn by a random angle within maxTurnAngle
      const turnAngle = (Math.random() - 0.5) * 2 * this.config.maxTurnAngle;
      return (currentHeading + turnAngle + 360) % 360;
    }

    // Continue in same direction with slight variation (±5 degrees)
    const variation = (Math.random() - 0.5) * 10;
    return (currentHeading + variation + 360) % 360;
  }

  /**
   * Generate route pattern based on configuration
   * @param {number} currentLat
   * @param {number} currentLng
   * @param {number} currentHeading
   * @param {number} pointIndex
   * @returns {number} Target heading
   */
  getPatternHeading(currentLat, currentLng, currentHeading, pointIndex) {
    switch (this.config.routePattern) {
      case 'circular': {
        // Move in circular pattern around centroid
        const centroidLng = this.centroid.geometry.coordinates[0];
        const centroidLat = this.centroid.geometry.coordinates[1];
        const bearingToCentroid = this.calculateBearing(
          currentLat,
          currentLng,
          centroidLat,
          centroidLng
        );
        return (bearingToCentroid + 90) % 360; // Perpendicular to centroid = circular
      }

      case 'patrol': {
        // Back and forth pattern
        const patrolCycle = 200; // points before reversing
        const shouldReverse = Math.floor(pointIndex / patrolCycle) % 2 === 1;
        return shouldReverse ? (currentHeading + 180) % 360 : currentHeading;
      }

      case 'zigzag': {
        // Zigzag pattern
        const zigzagCycle = 50;
        const zigzagPhase = Math.floor(pointIndex / zigzagCycle) % 2;
        return zigzagPhase === 0 ? 45 : 315; // NE or NW
      }

      case 'random_walk':
      default:
        return this.generateNextHeading(currentHeading);
    }
  }

  /**
   * Generate complete route with timestamps
   * @param {Date} startTime - Start time for the route
   * @returns {Array} Array of {lat, lng, timestamp}
   */
  generateRoute(startTime = new Date()) {
    const route = [];
    const totalPoints = Math.floor(this.config.totalDuration / this.config.pointInterval);

    console.log(`\n🚀 Starting route generation...`);
    console.log(`   📊 Total points to generate: ${totalPoints}`);
    console.log(`   ⏱️  Duration: ${this.config.totalDuration / 3600}h`);

    // Find starting point - use provided start location if available
    let currentPos;
    if (this.config.startLat && this.config.startLng) {
      // Verify start position is inside area
      if (this.isPointInside(this.config.startLat, this.config.startLng)) {
        currentPos = { lat: this.config.startLat, lng: this.config.startLng };
        console.log(
          `   📍 Starting from last known position: (${currentPos.lat.toFixed(6)}, ${currentPos.lng.toFixed(6)})`
        );
      } else {
        console.warn(`   ⚠️  Start position outside boundary, finding valid position nearby...`);
        currentPos = this.findRandomPointInside();
      }
    } else {
      currentPos = this.findRandomPointInside();
      console.log(
        `   📍 Starting from random position: (${currentPos.lat.toFixed(6)}, ${currentPos.lng.toFixed(6)})`
      );
    }

    let currentTime = new Date(startTime);
    this.currentHeading = Math.random() * 360; // Random initial heading

    route.push({
      lat: currentPos.lat,
      lng: currentPos.lng,
      timestamp: new Date(currentTime),
    });

    // Generate route points
    for (let i = 1; i < totalPoints; i++) {
      // Advance time
      currentTime = new Date(currentTime.getTime() + this.config.pointInterval * 1000);

      // Determine target heading based on pattern
      const targetHeading = this.getPatternHeading(
        currentPos.lat,
        currentPos.lng,
        this.currentHeading,
        i
      );

      // Random speed variation
      const speedVariation = 0.8 + Math.random() * 0.4; // 80-120% of avg speed
      const currentSpeed = this.config.avgSpeed * speedVariation;

      // Find next valid point
      const nextPoint = this.findNextValidPoint(
        currentPos.lat,
        currentPos.lng,
        targetHeading,
        currentSpeed
      );

      currentPos = { lat: nextPoint.lat, lng: nextPoint.lng };
      this.currentHeading = nextPoint.bearing;

      route.push({
        lat: currentPos.lat,
        lng: currentPos.lng,
        timestamp: new Date(currentTime),
      });

      // Progress indicator
      if (i % 100 === 0) {
        const progress = ((i / totalPoints) * 100).toFixed(1);
        console.log(`   📍 Progress: ${progress}% (${i}/${totalPoints} points)`);
      }
    }

    console.log(`✅ Route generation completed!`);
    console.log(`   📍 Total points: ${route.length}`);
    console.log(`   🎯 Start: (${route[0].lat.toFixed(6)}, ${route[0].lng.toFixed(6)})`);
    console.log(
      `   🏁 End: (${route[route.length - 1].lat.toFixed(6)}, ${route[route.length - 1].lng.toFixed(6)})`
    );

    return route;
  }

  /**
   * Generate route segments (useful for multi-day simulation)
   * @param {Date} startDate - Start date
   * @param {number} numSegments - Number of route segments
   * @param {number} hoursPerSegment - Hours per segment
   * @returns {Array} Array of route segments
   */
  generateMultiDayRoutes(startDate, numSegments = 7, hoursPerSegment = 8) {
    const segments = [];

    console.log(`\n🗓️  Generating ${numSegments} route segments (${hoursPerSegment}h each)...`);

    for (let day = 0; day < numSegments; day++) {
      const segmentStartTime = new Date(startDate);
      segmentStartTime.setDate(segmentStartTime.getDate() + day);
      segmentStartTime.setHours(8, 0, 0, 0); // Start at 8 AM

      // Save original config
      const originalDuration = this.config.totalDuration;

      // Set duration for this segment
      this.config.totalDuration = hoursPerSegment * 3600;

      console.log(`\n📅 Day ${day + 1}: ${segmentStartTime.toLocaleDateString()}`);

      const route = this.generateRoute(segmentStartTime);
      segments.push({
        day: day + 1,
        date: segmentStartTime,
        route: route,
        startPoint: route[0],
        endPoint: route[route.length - 1],
      });

      // Restore original config
      this.config.totalDuration = originalDuration;
    }

    console.log(`\n✅ Multi-day route generation completed!`);
    console.log(`   📊 Total segments: ${segments.length}`);
    console.log(`   📍 Total points: ${segments.reduce((sum, seg) => sum + seg.route.length, 0)}`);

    return segments;
  }

  /**
   * Export route to GeoJSON LineString
   * @param {Array} route - Route array
   * @returns {Object} GeoJSON Feature
   */
  exportToGeoJSON(route) {
    const coordinates = route.map((point) => [point.lng, point.lat]);

    return turf.lineString(coordinates, {
      timestamps: route.map((p) => p.timestamp.toISOString()),
      totalPoints: route.length,
      duration: route.length * this.config.pointInterval,
      pattern: this.config.routePattern,
    });
  }

  /**
   * Validate entire route is within boundary
   * @param {Array} route
   * @returns {Object} {valid, invalidPoints}
   */
  validateRoute(route) {
    const invalidPoints = [];

    for (let i = 0; i < route.length; i++) {
      if (!this.isPointInside(route[i].lat, route[i].lng)) {
        invalidPoints.push({
          index: i,
          lat: route[i].lat,
          lng: route[i].lng,
          timestamp: route[i].timestamp,
        });
      }
    }

    return {
      valid: invalidPoints.length === 0,
      totalPoints: route.length,
      invalidPoints: invalidPoints,
      validPercentage: (((route.length - invalidPoints.length) / route.length) * 100).toFixed(2),
    };
  }
}

module.exports = GPSRouteGenerator;
