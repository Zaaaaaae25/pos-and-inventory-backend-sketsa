import MenuPriceRepository from '../../../Domains/MenuPrices/Repositories/MenuPriceRepository.js';

export default class MenuPriceService {
  constructor({ menuPriceRepository } = {}) {
    if (!menuPriceRepository) throw new Error('MENUPRICE_SERVICE.MISSING_REPOSITORY');
    if (!(menuPriceRepository instanceof MenuPriceRepository)) {
      const methods = ['findAll','findById','createMenuPrice','updateMenuPrice','deleteMenuPrice'];
      const missing = methods.find((m) => typeof menuPriceRepository[m] !== 'function');
      if (missing) throw new Error(`MENUPRICE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo = menuPriceRepository;
  }
  listMenuPrices() { return this._repo.findAll(); }
  getMenuPrice(id) { return this._repo.findById(id); }
  createMenuPrice(data) { return this._repo.createMenuPrice(data); }
  updateMenuPrice(payload) { return this._repo.updateMenuPrice(payload); }
  deleteMenuPrice(id) { return this._repo.deleteMenuPrice(id); }
}

