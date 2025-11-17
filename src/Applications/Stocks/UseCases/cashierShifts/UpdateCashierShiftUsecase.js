import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class UpdateCashierShiftUsecase {
  constructor({ cashierShiftService } = {}) { if (!cashierShiftService) throw new Error('UPDATE_CASHIER_SHIFT.MISSING_SERVICE'); this.cashierShiftService = cashierShiftService; }
  async execute(id, payload = {}) {
    const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer');
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {};
    if (payload.closedAt !== undefined) data.closedAt = payload.closedAt == null ? null : new Date(payload.closedAt);
    if (payload.closingBalance !== undefined) data.closingBalance = payload.closingBalance == null ? null : Number(payload.closingBalance);
    if (payload.systemBalance !== undefined) data.systemBalance = payload.systemBalance == null ? null : Number(payload.systemBalance);
    if (payload.status !== undefined) data.status = String(payload.status);
    const rec = await this.cashierShiftService.update({ id: intId, data });
    if (!rec) throw new ValidationError('Cashier shift not found');
    return rec;
  }
}

