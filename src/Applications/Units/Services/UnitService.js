import UnitRepository from '../../../Domains/Units/Repositories/UnitRepository.js';

export default class UnitService {
  constructor({ unitRepository } = {}) {
    if (!unitRepository) throw new Error('UNIT_SERVICE.MISSING_REPOSITORY');

    if (!(unitRepository instanceof UnitRepository)) {
      const methods = ['findAll','findById','findByName','createUnit','updateUnit','deleteUnit'];
      const missing = methods.find((m) => typeof unitRepository[m] !== 'function');
      if (missing) throw new Error(`UNIT_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._unitRepository = unitRepository;
  }

  listUnits() { return this._unitRepository.findAll(); }
  getUnit(id) { return this._unitRepository.findById(id); }
  getUnitByName(name) { return this._unitRepository.findByName(name); }
  createUnit(unitData) { return this._unitRepository.createUnit(unitData); }
  updateUnit(payload) { return this._unitRepository.updateUnit(payload); }
  deleteUnit(id) { return this._unitRepository.deleteUnit(id); }
}

