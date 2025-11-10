import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class CategoryController {
  constructor({
    categoryPresenter,
    listCategoriesUsecase,
    getCategoryUsecase,
    createCategoryUsecase,
    updateCategoryUsecase,
    deleteCategoryUsecase,
  }) {
    if (!categoryPresenter) throw new Error('CategoryController requires a presenter');
    const deps = [
      ['listCategoriesUsecase', listCategoriesUsecase],
      ['getCategoryUsecase', getCategoryUsecase],
      ['createCategoryUsecase', createCategoryUsecase],
      ['updateCategoryUsecase', updateCategoryUsecase],
      ['deleteCategoryUsecase', deleteCategoryUsecase],
    ];
    const miss = deps.find(([, v]) => !v);
    if (miss) throw new Error(`CategoryController requires ${miss[0]}`);

    this.categoryPresenter = categoryPresenter;
    this.listCategoriesUsecase = listCategoriesUsecase;
    this.getCategoryUsecase = getCategoryUsecase;
    this.createCategoryUsecase = createCategoryUsecase;
    this.updateCategoryUsecase = updateCategoryUsecase;
    this.deleteCategoryUsecase = deleteCategoryUsecase;
  }

  async listCategories() {
    const records = await this.listCategoriesUsecase.execute();
    return { status: HttpStatus.OK, data: this.categoryPresenter.presentCollection(records) };
  }
  async getCategory({ params }) {
    const record = await this.getCategoryUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.categoryPresenter.present(record) };
  }
  async createCategory({ body }) {
    const record = await this.createCategoryUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.categoryPresenter.present(record) };
  }
  async updateCategory({ params, body }) {
    const record = await this.updateCategoryUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.categoryPresenter.present(record) };
  }
  async deleteCategory({ params }) {
    await this.deleteCategoryUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

