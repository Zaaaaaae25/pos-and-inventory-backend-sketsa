import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CashierUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, pin, status = 'active', outletId = null } = payload;

    this.name = name.trim();
    this.pin = String(pin).trim();
    this.status = status;
    this.outletId = CashierUser.normalizeOutletId(outletId);
  }

  _verifyPayload(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new ValidationError('CASHIER_USER.PAYLOAD_NOT_OBJECT');
    }

    const { name, pin, status, outletId } = payload;

    if (!name || pin === undefined || pin === null) {
      throw new ValidationError('CASHIER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string') {
      throw new ValidationError('CASHIER_USER.NAME_NOT_STRING');
    }

    if (typeof pin !== 'string' && typeof pin !== 'number') {
      throw new ValidationError('CASHIER_USER.PIN_NOT_VALID_TYPE');
    }

    if (status !== undefined && typeof status !== 'string') {
      throw new ValidationError('CASHIER_USER.STATUS_NOT_STRING');
    }

    CashierUser.normalizeOutletId(outletId);

    if (!name.trim()) {
      throw new ValidationError('CASHIER_USER.NAME_EMPTY');
    }
  }

  static normalizeOutletId(outletId) {
    if (outletId === undefined || outletId === null || outletId === '') {
      return null;
    }

    const numeric = Number(outletId);

    if (Number.isNaN(numeric)) {
      throw new ValidationError('CASHIER_USER.OUTLET_ID_NOT_NUMBER');
    }

    return numeric;
  }
}
