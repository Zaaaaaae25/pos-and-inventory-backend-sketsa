import IngredientPackageRepository from '../../../Domains/Ingredients/Repositories/IngredientPackageRepository.js';

export default class IngredientPackageService {
  constructor({ ingredientPackageRepository } = {}) {
    if (!ingredientPackageRepository) throw new Error('INGREDIENT_PACKAGE_SERVICE.MISSING_REPOSITORY');
    if (!(ingredientPackageRepository instanceof IngredientPackageRepository)) {
      const methods = ['findAll','findById','createIngredientPackage','updateIngredientPackage','deleteIngredientPackage'];
      const missing = methods.find((m) => typeof ingredientPackageRepository[m] !== 'function');
      if (missing) throw new Error(`INGREDIENT_PACKAGE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._ingredientPackageRepository = ingredientPackageRepository;
  }

  listIngredientPackages() { return this._ingredientPackageRepository.findAll(); }
  getIngredientPackage(id) { return this._ingredientPackageRepository.findById(id); }
  createIngredientPackage(data) { return this._ingredientPackageRepository.createIngredientPackage(data); }
  updateIngredientPackage(payload) { return this._ingredientPackageRepository.updateIngredientPackage(payload); }
  deleteIngredientPackage(id) { return this._ingredientPackageRepository.deleteIngredientPackage(id); }
}

