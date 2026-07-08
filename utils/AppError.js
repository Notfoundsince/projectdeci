class AppError extends Error {
  constructor(message, statusCode) {
    super(message);//message of the error
    this.statusCode = statusCode; //status code of the error
    this.isOperational = true;//indicates if the error is operational or not
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError; //call this if you want to create a new error object