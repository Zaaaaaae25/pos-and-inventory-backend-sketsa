import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseUserUsecase {
  constructor({ userService, placeService } = {}) {
    if (!userService) {
      throw new Error('USER_USECASE.MISSING_USER_SERVICE');
    }

    this.userService = userService;
    this.placeService = placeService ?? null;
  }

  async _findRole(roleName) {
    const normalized = String(roleName ?? '').trim().toLowerCase();

    if (!normalized) {
      throw new ValidationError('roleName is required');
    }

    const role = await this.userService.findRoleByName(normalized);

    if (!role) {
      throw new ValidationError(`Role ${normalized} is not registered`);
    }

    return role;
  }

  async _assertEmailAvailable(email, ignoreUserId = null) {
    if (!email) {
      return;
    }

    const existing = await this.userService.findByEmail(email);
    if (existing && existing.id !== ignoreUserId) {
      throw new ValidationError('Email is already in use');
    }
  }

  _validatePin(pin) {
    const normalized = String(pin ?? '');
    if (!/^\d{4,6}$/.test(normalized)) {
      throw new ValidationError('PIN must be a numeric string with 4 to 6 digits');
    }
  }

  _validatePassword(password) {
    if (String(password ?? '').length < 8) {
      throw new ValidationError('Password must be at least 8 characters long');
    }
  }

  async _assertPlaceExists(placeId) {
    if (placeId === undefined || placeId === null) {
      return null;
    }

    const normalizedId = Number(placeId);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
      throw new ValidationError('Place id must be a positive integer');
    }

    if (!this.placeService || typeof this.placeService.getPlace !== 'function') {
      throw new Error('USER_USECASE.MISSING_PLACE_SERVICE');
    }

    if (this.placeService.supportsPlaceValidation === false) {
      return normalizedId;
    }

    const place = await this.placeService.getPlace(normalizedId);
    if (!place) {
      throw new ValidationError('Place not found');
    }

    return normalizedId;
  }
}
