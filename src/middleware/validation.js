const { body, validationResult, oneOf } = require('express-validator');

// ==========================================
// SENSOR DATA VALIDATION MIDDLEWARE
// ==========================================

const validateSensorData = (sensorType) => {
  switch (sensorType) {
    case 'tpdata':
      return [
        oneOf(
          [
            body('sn').notEmpty(),
            body('deviceSn').notEmpty(),
            body('truckId').notEmpty(),
            body('truck_id').notEmpty(),
            body('truckCode').notEmpty(),
            body('code').notEmpty(),
            body('truckName').notEmpty(),
            body('name').notEmpty(),
          ],
          'Provide sn/deviceSn or a valid truck identifier (truckId/truck_id/truckCode/code/truckName/name)'
        ),
        body('cmd').optional().equals('tpdata').withMessage('When provided, cmd must be tpdata'),
        body('data').isObject().withMessage('Data must be an object'),
        body('data.tireNo')
          .optional()
          .isInt({ min: 1, max: 12 })
          .withMessage('Tire number must be between 1-12'),
        body('data.tiprValue')
          .optional()
          .isFloat({ min: 0, max: 1000 })
          .withMessage('Tire pressure must be between 0-1000 kPa'),
        body('data.pressure')
          .optional()
          .isFloat({ min: 0, max: 1000 })
          .withMessage('Tire pressure must be between 0-1000 kPa'),
        body('data.pressureKpa')
          .optional()
          .isFloat({ min: 0, max: 1000 })
          .withMessage('Tire pressure must be between 0-1000 kPa'),
        body('data.tempValue')
          .optional()
          .isFloat({ min: -50, max: 150 })
          .withMessage('Temperature must be between -50 to 150°C'),
        body('data.tempCelsius')
          .optional()
          .isFloat({ min: -50, max: 150 })
          .withMessage('Temperature must be between -50 to 150°C'),
        body('data.bat')
          .optional()
          .isInt({ min: 0, max: 100 })
          .withMessage('Battery level must be between 0-100'),
        body('data.simNumber').optional().isString(),
        body('data.exType').optional().isString(),
      ];

    case 'hubdata':
      return [
        body('sn').notEmpty().withMessage('Device serial number is required'),
        body('cmd').equals('hubdata').withMessage('Command must be hubdata'),
        body('data.tireNo')
          .isInt({ min: 1, max: 12 })
          .withMessage('Tire number must be between 1-12'),
        body('data.tempValue')
          .isFloat({ min: -50, max: 150 })
          .withMessage('Temperature must be between -50 to 150°C'),
        body('data.bat')
          .isInt({ min: 0, max: 100 })
          .withMessage('Battery level must be between 0-100'),
        body('data.simNumber').optional().isString(),
        body('data.exType').optional().isString(),
      ];

    case 'device':
      return [
        body('sn').notEmpty().withMessage('Device serial number is required'),
        body('cmd').equals('device').withMessage('Command must be device'),
        body('data.lng')
          .isFloat({ min: -180, max: 180 })
          .withMessage('Longitude must be between -180 to 180'),
        body('data.lat')
          .isFloat({ min: -90, max: 90 })
          .withMessage('Latitude must be between -90 to 90'),
        body('data.bat1')
          .isInt({ min: 0, max: 100 })
          .withMessage('Host battery must be between 0-100'),
        body('data.bat2')
          .optional()
          .isInt({ min: 0, max: 100 })
          .withMessage('Repeater1 battery must be between 0-100'),
        body('data.bat3')
          .optional()
          .isInt({ min: 0, max: 100 })
          .withMessage('Repeater2 battery must be between 0-100'),
        body('data.lock').isInt({ min: 0, max: 1 }).withMessage('Lock state must be 0 or 1'),
        body('data.simNumber').optional().isString(),
      ];

    case 'state':
      return [
        body('sn').notEmpty().withMessage('Device serial number is required'),
        body('cmd').equals('state').withMessage('Command must be state'),
        body('data.is_lock').isInt({ min: 0, max: 1 }).withMessage('Lock state must be 0 or 1'),
      ];

    default:
      return [
        body('sn').notEmpty().withMessage('Device serial number is required'),
        body('cmd').notEmpty().withMessage('Command is required'),
        body('data').isObject().withMessage('Data must be an object'),
      ];
  }
};

// ==========================================
// AUTH VALIDATION MIDDLEWARE
// ==========================================

const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3-50 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// ==========================================
// TRUCK VALIDATION MIDDLEWARE
// ==========================================

const validateTruckStatus = [
  body('status')
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be one of: active, inactive, maintenance'),
];

const validateBulkTruckUpdate = [
  body('truckIds').isArray({ min: 1 }).withMessage('truckIds must be a non-empty array'),
  body('truckIds.*').isInt({ min: 1 }).withMessage('Each truck ID must be a positive integer'),
  body('status')
    .isIn(['active', 'inactive', 'maintenance'])
    .withMessage('Status must be one of: active, inactive, maintenance'),
];

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
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

module.exports = {
  validateSensorData,
  validateLogin,
  validateTruckStatus,
  validateBulkTruckUpdate,
  handleValidationErrors,
};
