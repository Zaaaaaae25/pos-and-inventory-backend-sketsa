import BaseIngredientUsecase from './BaseIngredientUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateIngredientUsecase extends BaseIngredientUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const unitId = await this._validateUnitId(payload.unitId);
    const name = String(payload.name ?? '').trim();
    if (!name) throw new ValidationError('name is required');
    return this.ingredientService.createIngredient({ name, unitId });
  }
}

