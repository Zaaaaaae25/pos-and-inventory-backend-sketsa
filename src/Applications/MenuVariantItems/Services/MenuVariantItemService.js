import MenuVariantItemRepository from '../../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js';

export default class MenuVariantItemService {
  constructor({ menuVariantItemRepository } = {}) {
    if (!menuVariantItemRepository) throw new Error('MENUVARIANTITEM_SERVICE.MISSING_REPOSITORY');
    if (!(menuVariantItemRepository instanceof MenuVariantItemRepository)) {
      const methods=['findAll','findById','createMenuVariantItem','updateMenuVariantItem','deleteMenuVariantItem'];
      const missing=methods.find((m)=>typeof menuVariantItemRepository[m] !== 'function');
      if (missing) throw new Error(`MENUVARIANTITEM_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo = menuVariantItemRepository;
  }
  listMenuVariantItems(){ return this._repo.findAll(); }
  getMenuVariantItem(id){ return this._repo.findById(id); }
  createMenuVariantItem(data){ return this._repo.createMenuVariantItem(data); }
  updateMenuVariantItem(payload){ return this._repo.updateMenuVariantItem(payload); }
  deleteMenuVariantItem(id){ return this._repo.deleteMenuVariantItem(id); }
}

