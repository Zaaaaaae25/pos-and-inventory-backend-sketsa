export default class ListCashierShiftsUsecase {
  constructor({ cashierShiftService } = {}) { if (!cashierShiftService) throw new Error('LIST_CASHIER_SHIFTS.MISSING_SERVICE'); this.cashierShiftService = cashierShiftService; }
  async execute() { return this.cashierShiftService.list(); }
}

