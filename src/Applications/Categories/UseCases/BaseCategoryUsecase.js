import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseCategoryUsecase {
  constructor({ categoryService } = {}) {
    if (!categoryService) throw new Error('CATEGORY_USECASE.MISSING_SERVICE');
    this.categoryService = categoryService;
  }
  _normalize(text) { return String(text ?? '').trim().toLowerCase(); }
  async _assertNameAvailable(name, ignoreId = null) {
    const normalized = this._normalize(name);
    if (!normalized) throw new ValidationError('Category name is required');
    const existing = await this.categoryService.getCategoryByName(normalized);
    if (existing && existing.id !== ignoreId) {
      throw new ValidationError(`Category ${normalized} already exists`);
    }
    return normalized;
  }
}

