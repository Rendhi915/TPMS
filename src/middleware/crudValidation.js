const { body, param, query, validationResult } = require('express-validator');

// ==========================================
// VALIDATION HELPERS
// ==========================================

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

// ==========================================
// VENDOR VALIDATION
// ==========================================

const validateVendorCreate = [
  body('name')
    .notEmpty()
    .withMessage('Vendor name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Vendor name must be between 2 and 255 characters'),
  body('address')
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('telephone')
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Telephone number must not exceed 50 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('contact_person')
    .optional({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage('Contact person must not exceed 255 characters'),
  handleValidationErrors,
];

const validateVendorUpdate = [
  param('vendorId').isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('name')
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 255 })
    .withMessage('Vendor name must be between 2 and 255 characters'),
  body('address')
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('telephone')
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Telephone number must not exceed 50 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('contact_person')
    .optional({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage('Contact person must not exceed 255 characters'),
  handleValidationErrors,
];

// ==========================================
// TRUCK VALIDATION
// ==========================================

const validateTruckCreate = [
  body('name')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Truck name must be between 1 and 255 characters'),
  body('plate')
    .notEmpty()
    .withMessage('Truck plate is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Plate must be between 1 and 50 characters'),
  body('vin')
    .optional()
    .isLength({ min: 17, max: 17 })
    .withMessage('VIN must be exactly 17 characters')
    .matches(/^[A-HJ-NPR-Z0-9]+$/)
    .withMessage('Invalid VIN format'),
  body('model')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Model must not exceed 255 characters'),
  body('type').optional().isLength({ max: 100 }).withMessage('Type must not exceed 100 characters'),
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid year'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('driver_id').optional().isInt({ min: 1 }).withMessage('Invalid driver ID'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be active, inactive, or maintenance'),
  handleValidationErrors,
];

const validateTruckUpdate = [
  param('id').isInt({ min: 1 }).withMessage('Invalid truck ID - must be a positive integer'),
  body('name')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Truck name must be between 1 and 255 characters'),
  body('plate')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Plate must be between 1 and 50 characters'),
  body('vin')
    .optional()
    .isLength({ min: 17, max: 17 })
    .withMessage('VIN must be exactly 17 characters')
    .matches(/^[A-HJ-NPR-Z0-9]+$/)
    .withMessage('Invalid VIN format'),
  body('model')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Model must not exceed 255 characters'),
  body('type').optional().isLength({ max: 100 }).withMessage('Type must not exceed 100 characters'),
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid year'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('driver_id').optional().isInt({ min: 1 }).withMessage('Invalid driver ID'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be active, inactive, or maintenance'),
  handleValidationErrors,
];

// ==========================================
// DEVICE VALIDATION
// ==========================================

const validateDeviceCreate = [
  body('truck_id')
    .notEmpty()
    .withMessage('Truck ID is required')
    .isInt({ min: 1 })
    .withMessage('Invalid truck ID format - must be a positive integer'),
  body('sn')
    .notEmpty()
    .withMessage('Serial number is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Serial number must be between 1 and 255 characters')
    .matches(/^[A-Za-z0-9\-_]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens, and underscores'),
  body('sim_number')
    .optional()
    .isLength({ max: 50 })
    .withMessage('SIM number must not exceed 50 characters')
    .matches(/^[\d\s\-+]+$/)
    .withMessage('Invalid SIM number format'),
  handleValidationErrors,
];

const validateDeviceUpdate = [
  param('deviceId').isInt({ min: 1 }).withMessage('Invalid device ID - must be a positive integer'),
  body('truck_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid truck ID format - must be a positive integer'),
  body('sn')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Serial number must be between 1 and 255 characters')
    .matches(/^[A-Za-z0-9\-_]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens, and underscores'),
  body('sim_number')
    .optional()
    .isLength({ max: 50 })
    .withMessage('SIM number must not exceed 50 characters')
    .matches(/^[\d\s\-+]+$/)
    .withMessage('Invalid SIM number format'),
  handleValidationErrors,
];

// ==========================================
// SENSOR VALIDATION
// ==========================================

const validateSensorCreate = [
  body('device_id')
    .notEmpty()
    .withMessage('Device ID is required')
    .isInt({ min: 1 })
    .withMessage('Invalid device ID format - must be a positive integer'),
  body('position_no')
    .notEmpty()
    .withMessage('Position number is required')
    .isInt({ min: 1, max: 50 })
    .withMessage('Position number must be between 1 and 50'),
  body('type')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Sensor type must not exceed 50 characters')
    .matches(/^[A-Za-z0-9\s\-_]+$/)
    .withMessage('Sensor type can only contain letters, numbers, spaces, hyphens, and underscores'),
  body('sn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Serial number must not exceed 255 characters')
    .matches(/^[A-Za-z0-9\-_]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens, and underscores'),
  handleValidationErrors,
];

const validateSensorUpdate = [
  param('sensorId').isInt({ min: 1 }).withMessage('Invalid sensor ID - must be a positive integer'),
  body('device_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid device ID format - must be a positive integer'),
  body('position_no')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Position number must be between 1 and 50'),
  body('type')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Sensor type must not exceed 50 characters')
    .matches(/^[A-Za-z0-9\s\-_]+$/)
    .withMessage('Sensor type can only contain letters, numbers, spaces, hyphens, and underscores'),
  body('sn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Serial number must not exceed 255 characters')
    .matches(/^[A-Za-z0-9\-_]+$/)
    .withMessage('Serial number can only contain letters, numbers, hyphens, and underscores'),
  handleValidationErrors,
];

// ==========================================
// DRIVER VALIDATION
// ==========================================

const validateDriverCreate = [
  body('name')
    .notEmpty()
    .withMessage('Driver name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Driver name must be between 2 and 255 characters'),
  body('license_number')
    .notEmpty()
    .withMessage('License number is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('License number must be between 1 and 50 characters'),
  body('telephone')
    .optional({ checkFalsy: true })
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid telephone number format')
    .isLength({ max: 50 })
    .withMessage('Telephone number must not exceed 50 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('license_type')
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('License type must not exceed 20 characters'),
  body('license_expiry')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('License expiry must be a valid date'),
  body('vendor_id')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Invalid vendor ID'),
  body('status')
    .optional()
    .isIn(['aktif', 'nonaktif'])
    .withMessage('Status must be either "aktif" or "nonaktif"'),
  handleValidationErrors,
];

const validateDriverUpdate = [
  param('driverId').isInt({ min: 1 }).withMessage('Invalid driver ID'),
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Driver name must be between 2 and 255 characters'),
  body('license_number')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('License number must be between 1 and 50 characters'),
  body('telephone')
    .optional({ checkFalsy: true })
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid telephone number format')
    .isLength({ max: 50 })
    .withMessage('Telephone number must not exceed 50 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('license_type')
    .optional({ checkFalsy: true })
    .isLength({ max: 20 })
    .withMessage('License type must not exceed 20 characters'),
  body('license_expiry')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('License expiry must be a valid date'),
  body('vendor_id')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Invalid vendor ID'),
  body('status')
    .optional()
    .isIn(['aktif', 'nonaktif'])
    .withMessage('Status must be either "aktif" or "nonaktif"'),
  handleValidationErrors,
];

// ==========================================
// MINING AREA VALIDATION
// ==========================================

const validateMiningZoneCreate = [
  body('name')
    .notEmpty()
    .withMessage('Zone name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Zone name must be between 2 and 255 characters'),
  body('type')
    .optional()
    .isIn(['mining', 'loading', 'dumping', 'restricted', 'maintenance'])
    .withMessage('Invalid zone type'),
  body('coordinates').optional().isArray().withMessage('Coordinates must be an array'),
  body('radius')
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Radius must be between 0 and 10000 meters'),
  handleValidationErrors,
];

const validateMiningZoneUpdate = [
  param('zoneId').isInt({ min: 1 }).withMessage('Invalid zone ID - must be a positive integer'),
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Zone name must be between 2 and 255 characters'),
  body('type')
    .optional()
    .isIn(['mining', 'loading', 'dumping', 'restricted', 'maintenance'])
    .withMessage('Invalid zone type'),
  body('coordinates').optional().isArray().withMessage('Coordinates must be an array'),
  body('radius')
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Radius must be between 0 and 10000 meters'),
  handleValidationErrors,
];

// ==========================================
// COMMON VALIDATIONS
// ==========================================

const validateUUIDParam = (paramName) => [
  param(paramName).isUUID().withMessage(`Invalid ${paramName}`),
  handleValidationErrors,
];

const validateIntParam = (paramName) => [
  param(paramName).isInt({ min: 1 }).withMessage(`Invalid ${paramName}`),
  handleValidationErrors,
];

const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 200 })
    .withMessage('Limit must be between 1 and 200'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateVendorCreate,
  validateVendorUpdate,
  validateTruckCreate,
  validateTruckUpdate,
  validateDeviceCreate,
  validateDeviceUpdate,
  validateSensorCreate,
  validateSensorUpdate,
  validateDriverCreate,
  validateDriverUpdate,
  validateMiningZoneCreate,
  validateMiningZoneUpdate,
  validateUUIDParam,
  validateIntParam,
  validatePagination,
};
