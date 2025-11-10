import BaseCategoryUsecase from './BaseCategoryUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetCategoryUsecase extends BaseCategoryUsecase {
  async execute(id) {
    const intId = Number(id);
    if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be a positive integer');
    const rec = await this.categoryService.getCategory(intId);
    if (!rec) throw new ValidationError('Category not found');
    return rec;
  }
}

