import CashierShiftRepository from '../../../Domains/CashierShifts/Repositories/CashierShiftRepository.js';

export default class CashierShiftService {
  constructor({ cashierShiftRepository } = {}) {
    if (!cashierShiftRepository) throw new Error('CASHIER_SHIFT_SERVICE.MISSING_REPOSITORY');
    if (!(cashierShiftRepository instanceof CashierShiftRepository)) {
      const req = ['findAll','findById','createShift','updateShift','deleteShift'];
      const miss = req.find((m) => typeof cashierShiftRepository[m] !== 'function');
      if (miss) throw new Error(`CASHIER_SHIFT_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = cashierShiftRepository;
  }
  list() { return this._repo.findAll(); }
  get(id) { return this._repo.findById(id); }
  create(data) { return this._repo.createShift(data); }
  update({ id, data }) { return this._repo.updateShift({ id, data }); }
  delete(id) { return this._repo.deleteShift(id); }
}

