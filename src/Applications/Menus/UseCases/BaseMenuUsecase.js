import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseMenuUsecase {
  constructor({ menuService } = {}) { if (!menuService) throw new Error('MENU_USECASE.MISSING_SERVICE'); this.menuService = menuService; }
  _toInt(id, name='id') { const v=Number(id); if(!Number.isInteger(v)||v<=0) throw new ValidationError(`${name} must be a positive integer`); return v; }
}

