import BaseCategoryUsecase from './BaseCategoryUsecase.js';

export default class ListCategoriesUsecase extends BaseCategoryUsecase {
  async execute() { return this.categoryService.listCategories(); }
}

