const errorHandler = (error, req, res, next) => {
  console.error('Error occurred:', error);

  // Prisma errors
  if (error.code && error.code.startsWith('P')) {
    return handlePrismaError(error, res);
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(error.errors).map((err) => err.message),
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message: message,
    error:
      process.env.NODE_ENV === 'development'
        ? {
            stack: error.stack,
            details: error,
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
