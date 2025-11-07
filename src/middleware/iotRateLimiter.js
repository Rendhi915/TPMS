const { RateLimiterMemory } = require('rate-limiter-flexible');

// ==========================================
// RATE LIMITER CONFIGURATIONS
// ==========================================

// General API rate limiter (for authenticated users)
const generalRateLimiter = new RateLimiterMemory({
  keyPrefix: 'api_general',
  points: 100, // 100 requests
  duration: 60, // Per 60 seconds
  blockDuration: 60, // Block for 60 seconds if exceeded
});

// IoT Hardware rate limiter (more permissive for continuous data ingestion)
const iotHardwareRateLimiter = new RateLimiterMemory({
  keyPrefix: 'iot_hardware',
  points: 300, // 300 requests (IoT sends data frequently)
  duration: 60, // Per 60 seconds (5 req/sec average)
  blockDuration: 30, // Block for 30 seconds only
});

// Admin CRUD rate limiter (more restrictive for manual operations)
const adminCrudRateLimiter = new RateLimiterMemory({
  keyPrefix: 'admin_crud',
  points: 60, // 60 requests
  duration: 60, // Per 60 seconds
  blockDuration: 120, // Block for 2 minutes if exceeded
});

// Auth endpoints rate limiter (very restrictive to prevent brute force)
const authRateLimiter = new RateLimiterMemory({
  keyPrefix: 'auth',
  points: 5, // Only 5 attempts
  duration: 300, // Per 5 minutes
  blockDuration: 900, // Block for 15 minutes if exceeded
});

// ==========================================
// MIDDLEWARE FUNCTIONS
// ==========================================

const createRateLimiterMiddleware = (limiter, limiterName = 'general') => {
  return async (req, res, next) => {
    // Use IP address or user ID as the key
    const key = req.user?.userId || req.ip || req.connection.remoteAddress;

    try {
      await limiter.consume(key);
      next();
    } catch (rejRes) {
      const remainingPoints = rejRes.remainingPoints || 0;
      const msBeforeNext = rejRes.msBeforeNext || 1000;

      // Set rate limit headers
      res.set({
        'Retry-After': Math.round(msBeforeNext / 1000) || 1,
        'X-RateLimit-Limit': limiter.points,
        'X-RateLimit-Remaining': Math.max(0, remainingPoints),
        'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString(),
      });

      console.warn(
        `⚠️ [Rate Limit] ${limiterName} exceeded for ${key} - Retry after ${Math.round(msBeforeNext / 1000)}s`
      );

      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.round(msBeforeNext / 1000),
        limiter: limiterName,
      });
    }
  };
};

// Export middleware for different use cases
module.exports = {
  // General rate limiter (default)
  rateLimiterMiddleware: createRateLimiterMiddleware(generalRateLimiter, 'general'),

  // Specific rate limiters
  iotHardwareRateLimit: createRateLimiterMiddleware(iotHardwareRateLimiter, 'iot_hardware'),
  adminCrudRateLimit: createRateLimiterMiddleware(adminCrudRateLimiter, 'admin_crud'),
  authRateLimit: createRateLimiterMiddleware(authRateLimiter, 'auth'),

  // Export limiter instances for custom usage
  generalRateLimiter,
  iotHardwareRateLimiter,
  adminCrudRateLimiter,
  authRateLimiter,
};
