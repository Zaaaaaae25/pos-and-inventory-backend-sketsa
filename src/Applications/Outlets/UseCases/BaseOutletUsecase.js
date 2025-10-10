import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseOutletUsecase {
  constructor({ outletService } = {}) {
    if (!outletService) {
      throw new Error('OUTLET_USECASE.MISSING_SERVICE');
    }

    this.outletService = outletService;
  }

  _normalizeId(id) {
    const parsed = Number(id);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new ValidationError('id must be a positive integer');
    }

    return parsed;
  }

  _normalizePayload(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }

    const result = {};

    if (typeof payload.name !== 'undefined') {
      if (typeof payload.name !== 'string' || !payload.name.trim()) {
        throw new ValidationError('name is required');
      }
      result.name = payload.name.trim();
    }

    if (typeof payload.address !== 'undefined') {
      if (payload.address === null) {
        result.address = null;
      } else if (typeof payload.address === 'string') {
        result.address = payload.address.trim() || null;
      } else {
        throw new ValidationError('address must be a string or null');
      }
    }

    if (typeof payload.phone !== 'undefined') {
      if (payload.phone === null) {
        result.phone = null;
      } else if (typeof payload.phone === 'string') {
        result.phone = payload.phone.trim() || null;
      } else {
        throw new ValidationError('phone must be a string or null');
      }
    }

    if (typeof payload.isActive !== 'undefined') {
      if (typeof payload.isActive !== 'boolean') {
        throw new ValidationError('isActive must be a boolean');
      }
      result.isActive = payload.isActive;
    }

    return result;
  }
}
