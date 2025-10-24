import BaseSupplierUsecase from './BaseSupplierUsecase.js';

export default class ListSuppliersUsecase extends BaseSupplierUsecase {
  async execute() { return this.supplierService.listSuppliers(); }
}

