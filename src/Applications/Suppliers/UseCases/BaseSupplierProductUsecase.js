import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseSupplierProductUsecase {
  constructor({ supplierProductService, supplierService, ingredientService, packageService } = {}) {
    if (!supplierProductService) throw new Error('SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE');
    this.supplierProductService = supplierProductService;
    this.supplierService = supplierService ?? null;
    this.ingredientService = ingredientService ?? null;
    this.packageService = packageService ?? null;
  }

  async _validateSupplierId(id) {
    const value = Number(id);
    if (!Number.isInteger(value) || value <= 0) throw new ValidationError('supplierId must be a positive integer');
    if (!this.supplierService) return value;
    const exists = await this.supplierService.getSupplier(value);
    if (!exists) throw new ValidationError('supplierId not found');
    return value;
  }

  async _validateIngredientId(id) {
    const value = Number(id);
    if (!Number.isInteger(value) || value <= 0) throw new ValidationError('ingredientId must be a positive integer');
    if (!this.ingredientService) return value;
    const exists = await this.ingredientService.getIngredient(value);
    if (!exists) throw new ValidationError('ingredientId not found');
    return value;
  }

  async _validatePackageId(id) {
    const value = Number(id);
    if (!Number.isInteger(value) || value <= 0) throw new ValidationError('packageId must be a positive integer');
    if (!this.packageService) return value;
    const exists = await this.packageService.getPackage(value);
    if (!exists) throw new ValidationError('packageId not found');
    return value;
  }
}

