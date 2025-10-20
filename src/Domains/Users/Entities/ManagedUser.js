import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class ManagedUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, email, password, status = 'active', placeId = null } = payload;

    this.name = name.trim();
    this.email = ManagedUser.normalizeEmail(email);
    this.password = password;
    this.status = status;
    this.placeId = ManagedUser.normalizePlaceId(placeId);
  }

  static normalizeEmail(email) {
    if (!email) {
      return null;
    }

    return String(email).trim().toLowerCase() || null;
  }

  _verifyPayload(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new ValidationError('MANAGED_USER.PAYLOAD_NOT_OBJECT');
    }

    const { name, email, password, status, placeId } = payload;

    if (!name || !email || !password) {
      throw new ValidationError('MANAGED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string') {
      throw new ValidationError('MANAGED_USER.NAME_NOT_STRING');
    }

    if (typeof email !== 'string') {
      throw new ValidationError('MANAGED_USER.EMAIL_NOT_STRING');
    }

    if (typeof password !== 'string') {
      throw new ValidationError('MANAGED_USER.PASSWORD_NOT_STRING');
    }

    if (!name.trim()) {
      throw new ValidationError('MANAGED_USER.NAME_EMPTY');
    }

    const normalizedEmail = ManagedUser.normalizeEmail(email);
    if (!normalizedEmail) {
      throw new ValidationError('MANAGED_USER.EMAIL_INVALID');
    }

    if (status !== undefined && typeof status !== 'string') {
      throw new ValidationError('MANAGED_USER.STATUS_NOT_STRING');
    }

    ManagedUser.normalizePlaceId(placeId);
  }

  static normalizePlaceId(placeId) {
    if (placeId === undefined || placeId === null || placeId === '') {
      return null;
    }

    const numeric = Number(placeId);

    if (Number.isNaN(numeric)) {
      throw new ValidationError('MANAGED_USER.PLACE_ID_NOT_NUMBER');
    }

    return numeric;
  }
}
