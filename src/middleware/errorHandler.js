const errorHandler = (err, req, res) => {
  console.error('Error occurred:', err);

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return handlePrismaError(err, res);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message: message,
    error:
      process.env.NODE_ENV === 'development'
        ? {
            stack: err.stack,
            details: err,
          }
        : undefined,
  });
};

const handlePrismaError = (error, res) => {
  const errorMap = {
    P2002: {
      status: 400,
      message: 'Unique constraint violation. Record already exists.',
    },
    P2014: {
      status: 400,
      message: 'Invalid ID. Related record does not exist.',
    },
    P2003: {
      status: 400,
      message: 'Foreign key constraint violation.',
    },
    P2025: {
      status: 404,
      message: 'Record not found.',
    },
    P1008: {
      status: 408,
      message: 'Database operation timed out.',
    },
    P1002: {
      status: 503,
      message: 'Database connection failed.',
    },
  };

  const errorInfo = errorMap[error.code] || {
    status: 500,
    message: 'Database operation failed.',
  };

  return res.status(errorInfo.status).json({
    success: false,
    message: errorInfo.message,
    error:
      process.env.NODE_ENV === 'development'
        ? {
            code: error.code,
            meta: error.meta,
            details: error.message,
          }
        : undefined,
  });
};

module.exports = errorHandler;
