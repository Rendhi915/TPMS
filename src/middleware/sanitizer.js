/**
 * Input Sanitization Middleware
 * Removes dangerous characters and prevents XSS attacks
 */

/**
 * Sanitize string input - remove HTML tags and dangerous characters
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
};

/**
 * Sanitize email - basic email validation and sanitization
 * @param {string} email - Email to sanitize
 * @returns {string} - Sanitized email
 */
const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return email;
  
  // Convert to lowercase and trim
  let sanitized = email.toLowerCase().trim();
  
  // Remove any non-email characters (keep @ . - _ alphanumeric)
  sanitized = sanitized.replace(/[^a-z0-9@._-]/g, '');
  
  return sanitized;
};

/**
 * Sanitize phone number - remove non-numeric characters except + and -
 * @param {string} phone - Phone number to sanitize
 * @returns {string} - Sanitized phone number
 */
const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return phone;
  
  // Keep only numbers, +, -, and spaces
  let sanitized = phone.replace(/[^0-9+\s-]/g, '');
  
  return sanitized.trim();
};

/**
 * Sanitize object - recursively sanitize all string properties
 * @param {object} obj - Object to sanitize
 * @param {string[]} skipFields - Fields to skip sanitization
 * @returns {object} - Sanitized object
 */
const sanitizeObject = (obj, skipFields = ['password']) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip password and other sensitive fields
    if (skipFields.includes(key)) {
      sanitized[key] = value;
      continue;
    }
    
    // Sanitize based on type
    if (typeof value === 'string') {
      if (key === 'email') {
        sanitized[key] = sanitizeEmail(value);
      } else if (key === 'phone') {
        sanitized[key] = sanitizePhone(value);
      } else {
        sanitized[key] = sanitizeString(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, skipFields);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Express middleware to sanitize request body
 * @param {string[]} skipFields - Fields to skip sanitization
 */
const sanitizeBody = (skipFields = ['password']) => {
  return (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
      req.body = sanitizeObject(req.body, skipFields);
    }
    next();
  };
};

/**
 * Express middleware to sanitize query parameters
 */
const sanitizeQuery = () => {
  return (req, res, next) => {
    if (req.query && typeof req.query === 'object') {
      req.query = sanitizeObject(req.query, []);
    }
    next();
  };
};

module.exports = {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeObject,
  sanitizeBody,
  sanitizeQuery,
};
