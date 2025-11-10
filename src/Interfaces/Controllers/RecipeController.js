import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class RecipeController {
  constructor({
    recipePresenter,
    listRecipesUsecase,
    getRecipeUsecase,
    createRecipeUsecase,
    updateRecipeUsecase,
    deleteRecipeUsecase,
  }){
    if(!recipePresenter) throw new Error('RecipeController requires a presenter');
    const deps=[
      ['listRecipesUsecase',listRecipesUsecase],
      ['getRecipeUsecase',getRecipeUsecase],
      ['createRecipeUsecase',createRecipeUsecase],
      ['updateRecipeUsecase',updateRecipeUsecase],
      ['deleteRecipeUsecase',deleteRecipeUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`RecipeController requires ${miss[0]}`);
    this.recipePresenter=recipePresenter;
    this.listRecipesUsecase=listRecipesUsecase;
    this.getRecipeUsecase=getRecipeUsecase;
    this.createRecipeUsecase=createRecipeUsecase;
    this.updateRecipeUsecase=updateRecipeUsecase;
    this.deleteRecipeUsecase=deleteRecipeUsecase;
  }

  async listRecipes(){ const recs=await this.listRecipesUsecase.execute(); return { status: HttpStatus.OK, data: this.recipePresenter.presentCollection(recs) }; }
  async getRecipe({params}){ const rec=await this.getRecipeUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.recipePresenter.present(rec) }; }
  async createRecipe({body}){ const rec=await this.createRecipeUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.recipePresenter.present(rec) }; }
  async updateRecipe({params,body}){ const rec=await this.updateRecipeUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.recipePresenter.present(rec) }; }
  async deleteRecipe({params}){ await this.deleteRecipeUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

