const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  return { statusCode: 400, message: `Validation Error: ${errors.join(', ')}` };
};

const handleCastError = (err) => {
  return { statusCode: 400, message: `Invalid ID format: ${err.value}` };
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyPattern)[0];
  const value = err.keyValue[field];
  return {
    statusCode: 409,
    message: `Duplicate value '${value}' for field '${field}'. Please use a different value.`,
  };
};

const errorHandler = (err, req, res, next) => {
  console.error('  Error:', err.message);
  console.error('   Stack:', err.stack);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    const result = handleValidationError(err);
    statusCode = result.statusCode;
    message = result.message;
  } else if (err.name === 'CastError') {
    const result = handleCastError(err);
    statusCode = result.statusCode;
    message = result.message;
  } else if (err.code === 11000) {
    const result = handleDuplicateKeyError(err);
    statusCode = result.statusCode;
    message = result.message;
  } else if (err.isOperational) {
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler; // the central error handler, must be last middleware (reminder to self: focus)