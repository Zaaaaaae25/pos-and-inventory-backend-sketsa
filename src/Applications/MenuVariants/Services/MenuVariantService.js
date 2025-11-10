import MenuVariantRepository from '../../../Domains/MenuVariants/Repositories/MenuVariantRepository.js';

export default class MenuVariantService {
  constructor({ menuVariantRepository } = {}) {
    if (!menuVariantRepository) throw new Error('MENUVARIANT_SERVICE.MISSING_REPOSITORY');
    if (!(menuVariantRepository instanceof MenuVariantRepository)) {
      const methods=['findAll','findById','createMenuVariant','updateMenuVariant','deleteMenuVariant'];
      const missing=methods.find((m)=>typeof menuVariantRepository[m]!== 'function');
      if(missing) throw new Error(`MENUVARIANT_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo = menuVariantRepository;
  }
  listMenuVariants(){ return this._repo.findAll(); }
  getMenuVariant(id){ return this._repo.findById(id); }
  createMenuVariant(data){ return this._repo.createMenuVariant(data); }
  updateMenuVariant(payload){ return this._repo.updateMenuVariant(payload); }
  deleteMenuVariant(id){ return this._repo.deleteMenuVariant(id); }
}

