const { RateLimiterMemory } = require('rate-limiter-flexible');

// Create rate limiter instance
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds (1 minute)
  blockDuration: 60, // Block for 60 seconds if limit exceeded
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // Use IP address as the key
    const key = req.ip || req.connection.remoteAddress;

    await rateLimiter.consume(key);
    next();
  } catch (rejRes) {
    const remainingPoints = rejRes.remainingPoints || 0;
    const msBeforeNext = rejRes.msBeforeNext || 1000;

    // Set rate limit headers
    res.set({
      'Retry-After': Math.round(msBeforeNext / 1000) || 1,
      'X-RateLimit-Limit': 100,
      'X-RateLimit-Remaining': remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString(),
    });

    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.round(msBeforeNext / 1000),
    });
  }
};

module.exports = rateLimiterMiddleware;
