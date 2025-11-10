import BaseCategoryUsecase from './BaseCategoryUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteCategoryUsecase extends BaseCategoryUsecase {
  async execute(id) {
    const intId = Number(id);
    if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be a positive integer');
    const ok = await this.categoryService.deleteCategory(intId);
    if (!ok) throw new ValidationError('Category not found');
    return true;
  }
}

