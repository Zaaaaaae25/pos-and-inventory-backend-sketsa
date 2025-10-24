import SupplierProductRepository from '../../../Domains/Suppliers/Repositories/SupplierProductRepository.js';

export default class SupplierProductService {
  constructor({ supplierProductRepository } = {}) {
    if (!supplierProductRepository) throw new Error('SUPPLIER_PRODUCT_SERVICE.MISSING_REPOSITORY');
    if (!(supplierProductRepository instanceof SupplierProductRepository)) {
      const methods = ['findAll','findById','createSupplierProduct','updateSupplierProduct','deleteSupplierProduct'];
      const missing = methods.find((m) => typeof supplierProductRepository[m] !== 'function');
      if (missing) throw new Error(`SUPPLIER_PRODUCT_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._supplierProductRepository = supplierProductRepository;
  }

  listSupplierProducts() { return this._supplierProductRepository.findAll(); }
  getSupplierProduct(id) { return this._supplierProductRepository.findById(id); }
  createSupplierProduct(data) { return this._supplierProductRepository.createSupplierProduct(data); }
  updateSupplierProduct(payload) { return this._supplierProductRepository.updateSupplierProduct(payload); }
  deleteSupplierProduct(id) { return this._supplierProductRepository.deleteSupplierProduct(id); }
}

