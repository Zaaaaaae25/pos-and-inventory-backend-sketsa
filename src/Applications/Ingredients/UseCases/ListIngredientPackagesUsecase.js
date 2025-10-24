import BaseIngredientPackageUsecase from './BaseIngredientPackageUsecase.js';

export default class ListIngredientPackagesUsecase extends BaseIngredientPackageUsecase {
  async execute() { return this.ingredientPackageService.listIngredientPackages(); }
}

