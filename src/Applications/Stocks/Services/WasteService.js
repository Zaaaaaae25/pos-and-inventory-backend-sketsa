import WasteRepository from '../../../Domains/Stocks/Repositories/WasteRepository.js';

export default class WasteService {
  constructor({ wasteRepository } = {}) {
    if (!wasteRepository) throw new Error('WASTE_SERVICE.MISSING_REPOSITORY');
    if (!(wasteRepository instanceof WasteRepository)) {
      const req = ['findAll','findById','createWaste','updateWaste','deleteWaste'];
      const miss = req.find((m) => typeof wasteRepository[m] !== 'function');
      if (miss) throw new Error(`WASTE_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = wasteRepository;
  }
  list() { return this._repo.findAll(); }
  get(id) { return this._repo.findById(id); }
  create(data) { return this._repo.createWaste(data); }
  update({ id, data }) { return this._repo.updateWaste({ id, data }); }
  delete(id) { return this._repo.deleteWaste(id); }
}

