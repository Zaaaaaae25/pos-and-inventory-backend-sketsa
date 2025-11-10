import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseMenuVariantItemUsecase {
  constructor({ menuVariantItemService } = {}) { if(!menuVariantItemService) throw new Error('MENUVARIANTITEM_USECASE.MISSING_SERVICE'); this.menuVariantItemService = menuVariantItemService; }
  _toInt(v,name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

