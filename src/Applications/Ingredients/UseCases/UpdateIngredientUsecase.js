import BaseIngredientUsecase from './BaseIngredientUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateIngredientUsecase extends BaseIngredientUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.ingredientService.getIngredient(numericId);
    if (!existing) throw new ValidationError('Ingredient not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      const name = String(payload.name ?? '').trim();
      if (!name) throw new ValidationError('name cannot be empty');
      update.name = name;
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'unitId')) {
      update.unitId = await this._validateUnitId(payload.unitId);
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.ingredientService.updateIngredient({ id: numericId, ingredientData: update });
  }
}

