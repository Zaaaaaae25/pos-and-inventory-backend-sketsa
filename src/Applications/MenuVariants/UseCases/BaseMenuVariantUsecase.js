import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseMenuVariantUsecase {
  constructor({ menuVariantService } = {}) { if(!menuVariantService) throw new Error('MENUVARIANT_USECASE.MISSING_SERVICE'); this.menuVariantService = menuVariantService; }
  _toInt(v, name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

