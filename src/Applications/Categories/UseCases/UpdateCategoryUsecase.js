import BaseCategoryUsecase from './BaseCategoryUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateCategoryUsecase extends BaseCategoryUsecase {
  async execute(id, payload = {}) {
    const intId = Number(id);
    if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be a positive integer');
    const data = {};
    if (typeof payload.name !== 'undefined') {
      data.name = await this._assertNameAvailable(payload.name, intId);
    }
    if (Object.keys(data).length === 0) throw new ValidationError('No valid fields to update');

    const updated = await this.categoryService.updateCategory({ id: intId, data });
    if (!updated) throw new ValidationError('Category not found');
    return updated;
  }
}

