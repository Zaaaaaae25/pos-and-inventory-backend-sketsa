import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseUserUsecase {
  constructor({ userService, outletService } = {}) {
    if (!userService) {
      throw new Error('USER_USECASE.MISSING_USER_SERVICE');
    }

    this.userService = userService;
    this.outletService = outletService ?? null;
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

  async _assertOutletExists(outletId) {
    if (outletId === undefined || outletId === null) {
      return null;
    }

    const normalizedId = Number(outletId);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
      throw new ValidationError('Outlet id must be a positive integer');
    }

    if (!this.outletService || typeof this.outletService.getOutlet !== 'function') {
      throw new Error('USER_USECASE.MISSING_OUTLET_SERVICE');
    }

    if (this.outletService.supportsOutletValidation === false) {
      return normalizedId;
    }

    const outlet = await this.outletService.getOutlet(normalizedId);
    if (!outlet) {
      throw new ValidationError('Outlet not found');
    }

    return normalizedId;
  }
}
