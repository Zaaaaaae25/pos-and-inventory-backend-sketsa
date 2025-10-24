import PrismaIngredientRepository from '../Repositories/PrismaIngredientRepository.js';
import IngredientService from '../../Applications/Ingredients/Services/IngredientService.js';
import {
  ListIngredientsUsecase,
  GetIngredientUsecase,
  CreateIngredientUsecase,
  UpdateIngredientUsecase,
  DeleteIngredientUsecase,
} from '../../Applications/Ingredients/UseCases/index.js';
import IngredientPresenter from '../../Interfaces/Presenters/IngredientPresenter.js';
import IngredientController from '../../Interfaces/Controllers/IngredientController.js';
import UnitService from '../../Applications/Units/Services/UnitService.js';
import PrismaUnitRepository from '../Repositories/PrismaUnitRepository.js';

export default function registerIngredientContainer({ container, overrides = {}, prisma }) {
  const ingredientRepository = overrides.ingredientRepository ?? new PrismaIngredientRepository({ prisma });
  const ingredientService = overrides.ingredientService ?? new IngredientService({ ingredientRepository });

  let unitService = overrides.unitService ?? (container?.has('unitService') ? container.get('unitService') : null);
  if (!unitService && prisma) {
    unitService = new UnitService({ unitRepository: new PrismaUnitRepository({ prisma }) });
  }

  const listIngredientsUsecase = overrides.listIngredientsUsecase ?? new ListIngredientsUsecase({ ingredientService, unitService });
  const getIngredientUsecase = overrides.getIngredientUsecase ?? new GetIngredientUsecase({ ingredientService, unitService });
  const createIngredientUsecase = overrides.createIngredientUsecase ?? new CreateIngredientUsecase({ ingredientService, unitService });
  const updateIngredientUsecase = overrides.updateIngredientUsecase ?? new UpdateIngredientUsecase({ ingredientService, unitService });
  const deleteIngredientUsecase = overrides.deleteIngredientUsecase ?? new DeleteIngredientUsecase({ ingredientService, unitService });

  const ingredientPresenter = overrides.ingredientPresenter ?? new IngredientPresenter();
  const ingredientController = overrides.ingredientController ?? new IngredientController({
    ingredientPresenter,
    listIngredientsUsecase,
    getIngredientUsecase,
    createIngredientUsecase,
    updateIngredientUsecase,
    deleteIngredientUsecase,
  });

  container.set('ingredientRepository', ingredientRepository);
  container.set('ingredientService', ingredientService);
  container.set('listIngredientsUsecase', listIngredientsUsecase);
  container.set('getIngredientUsecase', getIngredientUsecase);
  container.set('createIngredientUsecase', createIngredientUsecase);
  container.set('updateIngredientUsecase', updateIngredientUsecase);
  container.set('deleteIngredientUsecase', deleteIngredientUsecase);
  container.set('ingredientPresenter', ingredientPresenter);
  container.set('ingredientController', ingredientController);
}

