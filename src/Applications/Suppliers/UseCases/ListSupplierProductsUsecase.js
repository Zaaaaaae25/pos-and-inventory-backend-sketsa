import BaseSupplierProductUsecase from './BaseSupplierProductUsecase.js';

export default class ListSupplierProductsUsecase extends BaseSupplierProductUsecase {
  async execute() { return this.supplierProductService.listSupplierProducts(); }
}

