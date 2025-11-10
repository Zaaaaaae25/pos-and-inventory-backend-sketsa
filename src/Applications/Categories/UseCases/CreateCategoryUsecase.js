import BaseCategoryUsecase from './BaseCategoryUsecase.js';

export default class CreateCategoryUsecase extends BaseCategoryUsecase {
  async execute(payload = {}) {
    const name = await this._assertNameAvailable(payload?.name);
    return this.categoryService.createCategory({ name });
  }
}

