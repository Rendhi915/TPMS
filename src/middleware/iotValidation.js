const { body, param, query, validationResult } = require('express-validator');

// ==========================================
// VALIDATION ERROR HANDLER
// ==========================================
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

// ==========================================
// UNIFIED ENDPOINT VALIDATION (IoT Hardware)
// ==========================================
const validateIoTData = [
  body('sn')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Serial number must be 3-50 characters')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens and underscores'),

  body('cmd')
    .trim()
    .notEmpty()
    .withMessage('Command is required')
    .isIn(['tpdata', 'hubdata', 'device', 'state', 'sensor'])
    .withMessage('Invalid command. Must be: tpdata, hubdata, device, state, or sensor'),

  body('method')
    .optional()
    .trim()
    .isIn(['create', 'read', 'update', 'delete'])
    .withMessage('Invalid method. Must be: create, read, update, or delete'),

  body('data').isObject().withMessage('Data field must be an object'),

  // Conditional validation based on cmd
  body('data.tireNo')
    .optional()
    .isInt({ min: 1, max: 24 })
    .withMessage('Tire number must be between 1-24'),

  body('data.tiprValue')
    .optional()
    .isFloat({ min: 0, max: 2000 })
    .withMessage('Tire pressure must be between 0-2000 kPa'),

  body('data.tempValue')
    .optional()
    .isFloat({ min: -50, max: 200 })
    .withMessage('Temperature must be between -50 to 200°C'),

  body('data.bat')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery must be between 0-100'),

  body('data.bat1')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery 1 must be between 0-100'),

  body('data.bat2')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery 2 must be between 0-100'),

  body('data.bat3')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery 3 must be between 0-100'),

  body('data.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 to 90'),

  body('data.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 to 180'),

  body('data.lock').optional().isInt({ min: 0, max: 1 }).withMessage('Lock must be 0 or 1'),

  body('data.is_lock').optional().isInt({ min: 0, max: 1 }).withMessage('is_lock must be 0 or 1'),

  body('data.exType')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('exType must not exceed 50 characters'),

  body('data.simNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('SIM number must not exceed 20 characters')
    .matches(/^[0-9+\-() ]+$/)
    .withMessage('SIM number can only contain numbers and phone symbols'),

  body('data.sensorNo')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Sensor number must be between 1-100'),

  handleValidationErrors,
];

// ==========================================
// DEVICE CRUD VALIDATION
// ==========================================
const validateCreateDevice = [
  body('truck_id')
    .notEmpty()
    .withMessage('Truck ID is required')
    .isInt({ min: 1 })
    .withMessage('Truck ID must be a positive integer'),

  body('sn')
    .trim()
    .notEmpty()
    .withMessage('Serial number is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Serial number must be 3-50 characters')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens and underscores'),

  body('sim_number')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('SIM number must not exceed 20 characters')
    .matches(/^[0-9+\-() ]+$/)
    .withMessage('SIM number can only contain numbers and phone symbols'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  handleValidationErrors,
];

const validateUpdateDevice = [
  param('id').isInt({ min: 1 }).withMessage('Device ID must be a positive integer'),

  body('truck_id').optional().isInt({ min: 1 }).withMessage('Truck ID must be a positive integer'),

  body('sn')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Serial number must be 3-50 characters')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens and underscores'),

  body('sim_number')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('SIM number must not exceed 20 characters')
    .matches(/^[0-9+\-() ]+$/)
    .withMessage('SIM number can only contain numbers and phone symbols'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  handleValidationErrors,
];

const validateGetDevices = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1-100')
    .toInt(),

  query('truck_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Truck ID must be a positive integer')
    .toInt(),

  query('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query must not exceed 100 characters'),

  handleValidationErrors,
];

const validateDeviceId = [
  param('id').isInt({ min: 1 }).withMessage('Device ID must be a positive integer'),
  handleValidationErrors,
];

// ==========================================
// SENSOR CRUD VALIDATION
// ==========================================
const validateCreateSensor = [
  body('device_id')
    .notEmpty()
    .withMessage('Device ID is required')
    .isInt({ min: 1 })
    .withMessage('Device ID must be a positive integer'),

  body('sn')
    .trim()
    .notEmpty()
    .withMessage('Serial number is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Serial number must be 3-50 characters')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens and underscores'),

  body('tireNo')
    .notEmpty()
    .withMessage('Tire number is required')
    .isInt({ min: 1, max: 24 })
    .withMessage('Tire number must be between 1-24'),

  body('simNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('SIM number must not exceed 20 characters')
    .matches(/^[0-9+\-() ]+$/)
    .withMessage('SIM number can only contain numbers and phone symbols'),

  body('sensorNo')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Sensor number must be between 1-100'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  handleValidationErrors,
];

const validateUpdateSensor = [
  param('id').isInt({ min: 1 }).withMessage('Sensor ID must be a positive integer'),

  body('device_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Device ID must be a positive integer'),

  body('sn')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Serial number must be 3-50 characters')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens and underscores'),

  body('tireNo')
    .optional()
    .isInt({ min: 1, max: 24 })
    .withMessage('Tire number must be between 1-24'),

  body('simNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('SIM number must not exceed 20 characters')
    .matches(/^[0-9+\-() ]+$/)
    .withMessage('SIM number can only contain numbers and phone symbols'),

  body('sensorNo')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Sensor number must be between 1-100'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  handleValidationErrors,
];

const validateGetSensors = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1-100')
    .toInt(),

  query('device_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Device ID must be a positive integer')
    .toInt(),

  query('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be: active, inactive, or maintenance'),

  handleValidationErrors,
];

const validateSensorId = [
  param('id').isInt({ min: 1 }).withMessage('Sensor ID must be a positive integer'),
  handleValidationErrors,
];

// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  // Unified endpoint
  validateIoTData,

  // Device validations
  validateCreateDevice,
  validateUpdateDevice,
  validateGetDevices,
  validateDeviceId,

  // Sensor validations
  validateCreateSensor,
  validateUpdateSensor,
  validateGetSensors,
  validateSensorId,

  // Utility
  handleValidationErrors,
};
