import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseTransactionUsecase {
  _ensureObject(payload) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
  }

  _positiveInt(value, fieldName) {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) throw new ValidationError(`${fieldName} must be a positive integer`);
    return id;
  }
}

