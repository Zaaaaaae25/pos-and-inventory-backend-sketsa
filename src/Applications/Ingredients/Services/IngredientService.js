import IngredientRepository from '../../../Domains/Ingredients/Repositories/IngredientRepository.js';

export default class IngredientService {
  constructor({ ingredientRepository } = {}) {
    if (!ingredientRepository) throw new Error('INGREDIENT_SERVICE.MISSING_REPOSITORY');
    if (!(ingredientRepository instanceof IngredientRepository)) {
      const methods = ['findAll','findById','createIngredient','updateIngredient','deleteIngredient'];
      const missing = methods.find((m) => typeof ingredientRepository[m] !== 'function');
      if (missing) throw new Error(`INGREDIENT_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._ingredientRepository = ingredientRepository;
  }

  listIngredients() { return this._ingredientRepository.findAll(); }
  getIngredient(id) { return this._ingredientRepository.findById(id); }
  createIngredient(ingredientData) { return this._ingredientRepository.createIngredient(ingredientData); }
  updateIngredient(payload) { return this._ingredientRepository.updateIngredient(payload); }
  deleteIngredient(id) { return this._ingredientRepository.deleteIngredient(id); }
}

