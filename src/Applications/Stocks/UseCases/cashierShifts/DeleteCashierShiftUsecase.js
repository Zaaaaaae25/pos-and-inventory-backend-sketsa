import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteCashierShiftUsecase {
  constructor({ cashierShiftService } = {}) { if (!cashierShiftService) throw new Error('DELETE_CASHIER_SHIFT.MISSING_SERVICE'); this.cashierShiftService = cashierShiftService; }
  async execute(id) { const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer'); const ok = await this.cashierShiftService.delete(intId); if (!ok) throw new ValidationError('Cashier shift not found'); return true; }
}

