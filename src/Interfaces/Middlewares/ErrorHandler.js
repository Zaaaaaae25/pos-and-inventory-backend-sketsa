import AppError from '../../Commons/Errors/AppError.js';
import HttpStatus from '../../Commons/Constants/HttpStatus.js';
import logger from '../../Infrastructures/Logger/WinstonLogger.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    const payload = {
      message: err.message,
    };

    if (err.details) {
      payload.details = err.details;
    }

    res.status(err.statusCode).json(payload);
    return;
  }

  logger.error('Unhandled error occurred', { error: err });
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
}
