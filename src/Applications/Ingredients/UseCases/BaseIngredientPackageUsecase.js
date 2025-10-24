import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseIngredientPackageUsecase {
  constructor({ ingredientPackageService, ingredientService, packageService } = {}) {
    if (!ingredientPackageService) throw new Error('INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE');
    this.ingredientPackageService = ingredientPackageService;
    this.ingredientService = ingredientService ?? null;
    this.packageService = packageService ?? null;
  }

  async _validateIngredientId(ingredientId) {
    const id = Number(ingredientId);
    if (!Number.isInteger(id) || id <= 0) throw new ValidationError('ingredientId must be a positive integer');
    if (!this.ingredientService) return id;
    const found = await this.ingredientService.getIngredient(id);
    if (!found) throw new ValidationError('ingredientId not found');
    return id;
  }

  async _validatePackageId(packageId) {
    const id = Number(packageId);
    if (!Number.isInteger(id) || id <= 0) throw new ValidationError('packageId must be a positive integer');
    if (!this.packageService) return id;
    const found = await this.packageService.getPackage(id);
    if (!found) throw new ValidationError('packageId not found');
    return id;
  }
}

