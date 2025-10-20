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
  body('nama_vendor')
    .notEmpty()
    .withMessage('Vendor name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Vendor name must be between 2 and 255 characters'),
  body('address')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('nomor_telepon')
    .optional()
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid phone number format')
    .isLength({ max: 50 })
    .withMessage('Phone number must not exceed 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('kontak_person')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Contact person must not exceed 255 characters'),
  handleValidationErrors,
];

const validateVendorUpdate = [
  param('vendorId').isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('nama_vendor')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Vendor name must be between 2 and 255 characters'),
  body('address')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('nomor_telepon')
    .optional()
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid phone number format')
    .isLength({ max: 50 })
    .withMessage('Phone number must not exceed 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('kontak_person')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Contact person must not exceed 255 characters'),
  handleValidationErrors,
];

// ==========================================
// TRUCK VALIDATION
// ==========================================

const validateTruckCreate = [
  body('name')
    .notEmpty()
    .withMessage('Truck name is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Truck name must be between 1 and 255 characters'),
  body('code')
    .optional()
    .isLength({ max: 4 })
    .withMessage('Truck code must not exceed 4 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Truck code must contain only uppercase letters and numbers'),
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
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid year'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('fleet_group_id').optional().isUUID().withMessage('Invalid fleet group ID'),
  handleValidationErrors,
];

const validateTruckUpdate = [
  param('id').isUUID().withMessage('Invalid truck ID'),
  body('name')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Truck name must be between 1 and 255 characters'),
  body('code')
    .optional()
    .isLength({ max: 4 })
    .withMessage('Truck code must not exceed 4 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Truck code must contain only uppercase letters and numbers'),
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
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid year'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
  body('fleet_group_id').optional().isUUID().withMessage('Invalid fleet group ID'),
  handleValidationErrors,
];

// ==========================================
// DEVICE VALIDATION
// ==========================================

const validateDeviceCreate = [
  body('truck_id')
    .notEmpty()
    .withMessage('Truck ID is required')
    .isUUID()
    .withMessage('Invalid truck ID format'),
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
  param('deviceId').isUUID().withMessage('Invalid device ID'),
  body('truck_id').optional().isUUID().withMessage('Invalid truck ID format'),
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
    .isUUID()
    .withMessage('Invalid device ID format'),
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
  param('sensorId').isUUID().withMessage('Invalid sensor ID'),
  body('device_id').optional().isUUID().withMessage('Invalid device ID format'),
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
  body('license_type')
    .notEmpty()
    .withMessage('License type is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('License type must be between 1 and 20 characters'),
  body('license_expiry')
    .notEmpty()
    .withMessage('License expiry date is required')
    .isISO8601()
    .withMessage('Invalid license expiry date format'),
  body('id_card_number')
    .notEmpty()
    .withMessage('ID card number is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('ID card number must be between 1 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid phone number format')
    .isLength({ max: 50 })
    .withMessage('Phone number must not exceed 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
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
  body('license_type')
    .optional()
    .isLength({ min: 1, max: 20 })
    .withMessage('License type must be between 1 and 20 characters'),
  body('license_expiry').optional().isISO8601().withMessage('Invalid license expiry date format'),
  body('id_card_number')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('ID card number must be between 1 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\d\s\-+()]+$/)
    .withMessage('Invalid phone number format')
    .isLength({ max: 50 })
    .withMessage('Phone number must not exceed 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  body('vendor_id').optional().isInt({ min: 1 }).withMessage('Invalid vendor ID'),
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
  param('zoneId').isUUID().withMessage('Invalid zone ID'),
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
