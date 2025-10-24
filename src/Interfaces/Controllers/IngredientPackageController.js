import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class IngredientPackageController {
  constructor({
    ingredientPackagePresenter,
    listIngredientPackagesUsecase,
    getIngredientPackageUsecase,
    createIngredientPackageUsecase,
    updateIngredientPackageUsecase,
    deleteIngredientPackageUsecase,
  }) {
    if (!ingredientPackagePresenter) throw new Error('IngredientPackageController requires a presenter');
    const reqs = [
      ['listIngredientPackagesUsecase', listIngredientPackagesUsecase],
      ['getIngredientPackageUsecase', getIngredientPackageUsecase],
      ['createIngredientPackageUsecase', createIngredientPackageUsecase],
      ['updateIngredientPackageUsecase', updateIngredientPackageUsecase],
      ['deleteIngredientPackageUsecase', deleteIngredientPackageUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`IngredientPackageController requires ${miss[0]}`);

    this.ingredientPackagePresenter = ingredientPackagePresenter;
    this.listIngredientPackagesUsecase = listIngredientPackagesUsecase;
    this.getIngredientPackageUsecase = getIngredientPackageUsecase;
    this.createIngredientPackageUsecase = createIngredientPackageUsecase;
    this.updateIngredientPackageUsecase = updateIngredientPackageUsecase;
    this.deleteIngredientPackageUsecase = deleteIngredientPackageUsecase;
  }

  async listIngredientPackages() {
    const records = await this.listIngredientPackagesUsecase.execute();
    return { status: HttpStatus.OK, data: this.ingredientPackagePresenter.presentCollection(records) };
  }
  async getIngredientPackage({ params }) {
    const record = await this.getIngredientPackageUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.ingredientPackagePresenter.present(record) };
  }
  async createIngredientPackage({ body }) {
    const record = await this.createIngredientPackageUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.ingredientPackagePresenter.present(record) };
  }
  async updateIngredientPackage({ params, body }) {
    const record = await this.updateIngredientPackageUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.ingredientPackagePresenter.present(record) };
  }
  async deleteIngredientPackage({ params }) {
    await this.deleteIngredientPackageUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

