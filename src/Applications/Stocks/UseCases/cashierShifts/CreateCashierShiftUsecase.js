import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreateCashierShiftUsecase {
  constructor({ cashierShiftService } = {}) { if (!cashierShiftService) throw new Error('CREATE_CASHIER_SHIFT.MISSING_SERVICE'); this.cashierShiftService = cashierShiftService; }
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {
      placeId: Number(payload.placeId),
      cashierId: Number(payload.cashierId),
      ipAddress: String(payload.ipAddress),
    };
    if (payload.openingBalance !== undefined) data.openingBalance = Number(payload.openingBalance);
    if (payload.status !== undefined) data.status = String(payload.status);
    return this.cashierShiftService.create(data);
  }
}

