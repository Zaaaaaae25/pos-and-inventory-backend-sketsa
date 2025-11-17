import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetCashierShiftUsecase {
  constructor({ cashierShiftService } = {}) { if (!cashierShiftService) throw new Error('GET_CASHIER_SHIFT.MISSING_SERVICE'); this.cashierShiftService = cashierShiftService; }
  async execute(id) { const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer'); const rec = await this.cashierShiftService.get(intId); if (!rec) throw new ValidationError('Cashier shift not found'); return rec; }
}

