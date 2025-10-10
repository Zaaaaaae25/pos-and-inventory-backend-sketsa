import HttpStatus from '../Constants/HttpStatus.js';

export default class AppError extends Error {
  constructor(message, statusCode = HttpStatus.INTERNAL_SERVER_ERROR, details = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
