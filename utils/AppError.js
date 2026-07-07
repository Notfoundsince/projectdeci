class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; //status code for error
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError; //central error handler