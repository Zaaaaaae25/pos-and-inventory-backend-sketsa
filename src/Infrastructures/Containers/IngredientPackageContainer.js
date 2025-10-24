import PrismaIngredientPackageRepository from '../Repositories/PrismaIngredientPackageRepository.js';
import IngredientPackageService from '../../Applications/Ingredients/Services/IngredientPackageService.js';
import {
  ListIngredientPackagesUsecase,
  GetIngredientPackageUsecase,
  CreateIngredientPackageUsecase,
  UpdateIngredientPackageUsecase,
  DeleteIngredientPackageUsecase,
} from '../../Applications/Ingredients/UseCases/ingredientPackagesIndex.js';
import IngredientPackagePresenter from '../../Interfaces/Presenters/IngredientPackagePresenter.js';
import IngredientPackageController from '../../Interfaces/Controllers/IngredientPackageController.js';
import IngredientService from '../../Applications/Ingredients/Services/IngredientService.js';
import PrismaIngredientRepository from '../Repositories/PrismaIngredientRepository.js';
import PackageService from '../../Applications/Packages/Services/PackageService.js';
import PrismaPackageRepository from '../Repositories/PrismaPackageRepository.js';

export default function registerIngredientPackageContainer({ container, overrides = {}, prisma }) {
  const ingredientPackageRepository = overrides.ingredientPackageRepository ?? new PrismaIngredientPackageRepository({ prisma });
  const ingredientPackageService = overrides.ingredientPackageService ?? new IngredientPackageService({ ingredientPackageRepository });

  let ingredientService = overrides.ingredientService ?? (container?.has('ingredientService') ? container.get('ingredientService') : null);
  if (!ingredientService && prisma) {
    ingredientService = new IngredientService({ ingredientRepository: new PrismaIngredientRepository({ prisma }) });
  }

  let packageService = overrides.packageService ?? (container?.has('packageService') ? container.get('packageService') : null);
  if (!packageService && prisma) {
    packageService = new PackageService({ packageRepository: new PrismaPackageRepository({ prisma }) });
  }

  const listIngredientPackagesUsecase = overrides.listIngredientPackagesUsecase ?? new ListIngredientPackagesUsecase({ ingredientPackageService, ingredientService, packageService });
  const getIngredientPackageUsecase = overrides.getIngredientPackageUsecase ?? new GetIngredientPackageUsecase({ ingredientPackageService, ingredientService, packageService });
  const createIngredientPackageUsecase = overrides.createIngredientPackageUsecase ?? new CreateIngredientPackageUsecase({ ingredientPackageService, ingredientService, packageService });
  const updateIngredientPackageUsecase = overrides.updateIngredientPackageUsecase ?? new UpdateIngredientPackageUsecase({ ingredientPackageService, ingredientService, packageService });
  const deleteIngredientPackageUsecase = overrides.deleteIngredientPackageUsecase ?? new DeleteIngredientPackageUsecase({ ingredientPackageService, ingredientService, packageService });

  const ingredientPackagePresenter = overrides.ingredientPackagePresenter ?? new IngredientPackagePresenter();
  const ingredientPackageController = overrides.ingredientPackageController ?? new IngredientPackageController({
    ingredientPackagePresenter,
    listIngredientPackagesUsecase,
    getIngredientPackageUsecase,
    createIngredientPackageUsecase,
    updateIngredientPackageUsecase,
    deleteIngredientPackageUsecase,
  });

  container.set('ingredientPackageRepository', ingredientPackageRepository);
  container.set('ingredientPackageService', ingredientPackageService);
  container.set('listIngredientPackagesUsecase', listIngredientPackagesUsecase);
  container.set('getIngredientPackageUsecase', getIngredientPackageUsecase);
  container.set('createIngredientPackageUsecase', createIngredientPackageUsecase);
  container.set('updateIngredientPackageUsecase', updateIngredientPackageUsecase);
  container.set('deleteIngredientPackageUsecase', deleteIngredientPackageUsecase);
  container.set('ingredientPackagePresenter', ingredientPackagePresenter);
  container.set('ingredientPackageController', ingredientPackageController);
}

