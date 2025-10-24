import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseIngredientUsecase {
  constructor({ ingredientService, unitService } = {}) {
    if (!ingredientService) throw new Error('INGREDIENT_USECASE.MISSING_SERVICE');
    this.ingredientService = ingredientService;
    this.unitService = unitService ?? null;
  }

  async _validateUnitId(unitId) {
    const id = Number(unitId);
    if (!Number.isInteger(id) || id <= 0) throw new ValidationError('unitId must be a positive integer');
    if (!this.unitService) return id;
    const unit = await this.unitService.getUnit(id);
    if (!unit) throw new ValidationError('unitId not found');
    return id;
  }
}

