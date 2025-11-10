import PrismaRecipeRepository from '../Repositories/PrismaRecipeRepository.js';
import RecipeService from '../../Applications/Recipes/Services/RecipeService.js';
import { ListRecipesUsecase, GetRecipeUsecase, CreateRecipeUsecase, UpdateRecipeUsecase, DeleteRecipeUsecase } from '../../Applications/Recipes/UseCases/index.js';
import RecipePresenter from '../../Interfaces/Presenters/RecipePresenter.js';
import RecipeController from '../../Interfaces/Controllers/RecipeController.js';

export default function registerRecipeContainer({ container, overrides = {}, prisma }) {
  const recipeRepository = overrides.recipeRepository ?? new PrismaRecipeRepository({ prisma });
  const recipeService = overrides.recipeService ?? new RecipeService({ recipeRepository });
  const listRecipesUsecase = overrides.listRecipesUsecase ?? new ListRecipesUsecase({ recipeService });
  const getRecipeUsecase = overrides.getRecipeUsecase ?? new GetRecipeUsecase({ recipeService });
  const createRecipeUsecase = overrides.createRecipeUsecase ?? new CreateRecipeUsecase({ recipeService });
  const updateRecipeUsecase = overrides.updateRecipeUsecase ?? new UpdateRecipeUsecase({ recipeService });
  const deleteRecipeUsecase = overrides.deleteRecipeUsecase ?? new DeleteRecipeUsecase({ recipeService });
  const recipePresenter = overrides.recipePresenter ?? new RecipePresenter();
  const recipeController = overrides.recipeController ?? new RecipeController({
    recipePresenter,
    listRecipesUsecase,
    getRecipeUsecase,
    createRecipeUsecase,
    updateRecipeUsecase,
    deleteRecipeUsecase,
  });

  container.set('recipeRepository', recipeRepository);
  container.set('recipeService', recipeService);
  container.set('listRecipesUsecase', listRecipesUsecase);
  container.set('getRecipeUsecase', getRecipeUsecase);
  container.set('createRecipeUsecase', createRecipeUsecase);
  container.set('updateRecipeUsecase', updateRecipeUsecase);
  container.set('deleteRecipeUsecase', deleteRecipeUsecase);
  container.set('recipePresenter', recipePresenter);
  container.set('recipeController', recipeController);
}

