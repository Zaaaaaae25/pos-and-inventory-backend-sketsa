import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class IngredientController {
  constructor({
    ingredientPresenter,
    listIngredientsUsecase,
    getIngredientUsecase,
    createIngredientUsecase,
    updateIngredientUsecase,
    deleteIngredientUsecase,
  }) {
    if (!ingredientPresenter) throw new Error('IngredientController requires a presenter');
    const reqs = [
      ['listIngredientsUsecase', listIngredientsUsecase],
      ['getIngredientUsecase', getIngredientUsecase],
      ['createIngredientUsecase', createIngredientUsecase],
      ['updateIngredientUsecase', updateIngredientUsecase],
      ['deleteIngredientUsecase', deleteIngredientUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`IngredientController requires ${miss[0]}`);

    this.ingredientPresenter = ingredientPresenter;
    this.listIngredientsUsecase = listIngredientsUsecase;
    this.getIngredientUsecase = getIngredientUsecase;
    this.createIngredientUsecase = createIngredientUsecase;
    this.updateIngredientUsecase = updateIngredientUsecase;
    this.deleteIngredientUsecase = deleteIngredientUsecase;
  }

  async listIngredients() {
    const records = await this.listIngredientsUsecase.execute();
    return { status: HttpStatus.OK, data: this.ingredientPresenter.presentCollection(records) };
  }
  async getIngredient({ params }) {
    const record = await this.getIngredientUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.ingredientPresenter.present(record) };
  }
  async createIngredient({ body }) {
    const record = await this.createIngredientUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.ingredientPresenter.present(record) };
  }
  async updateIngredient({ params, body }) {
    const record = await this.updateIngredientUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.ingredientPresenter.present(record) };
  }
  async deleteIngredient({ params }) {
    await this.deleteIngredientUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

