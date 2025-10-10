import AppError from './AppError.js';
import HttpStatus from '../Constants/HttpStatus.js';

export default class ValidationError extends AppError {
  constructor(message, details = undefined) {
    super(message, HttpStatus.BAD_REQUEST, details);
  }
}
