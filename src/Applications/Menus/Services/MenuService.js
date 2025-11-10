import MenuRepository from '../../../Domains/Menus/Repositories/MenuRepository.js';

export default class MenuService {
  constructor({ menuRepository } = {}) {
    if (!menuRepository) throw new Error('MENU_SERVICE.MISSING_REPOSITORY');
    if (!(menuRepository instanceof MenuRepository)) {
      const methods = ['findAll','findById','createMenu','updateMenu','deleteMenu'];
      const missing = methods.find((m) => typeof menuRepository[m] !== 'function');
      if (missing) throw new Error(`MENU_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo = menuRepository;
  }
  listMenus() { return this._repo.findAll(); }
  getMenu(id) { return this._repo.findById(id); }
  createMenu(data) { return this._repo.createMenu(data); }
  updateMenu(payload) { return this._repo.updateMenu(payload); }
  deleteMenu(id) { return this._repo.deleteMenu(id); }
}

