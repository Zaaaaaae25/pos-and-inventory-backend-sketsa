import SupplierRepository from '../../../Domains/Suppliers/Repositories/SupplierRepository.js';

export default class SupplierService {
  constructor({ supplierRepository } = {}) {
    if (!supplierRepository) throw new Error('SUPPLIER_SERVICE.MISSING_REPOSITORY');
    if (!(supplierRepository instanceof SupplierRepository)) {
      const methods = ['findAll','findById','createSupplier','updateSupplier','deleteSupplier'];
      const missing = methods.find((m) => typeof supplierRepository[m] !== 'function');
      if (missing) throw new Error(`SUPPLIER_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._supplierRepository = supplierRepository;
  }

  listSuppliers() { return this._supplierRepository.findAll(); }
  getSupplier(id) { return this._supplierRepository.findById(id); }
  createSupplier(data) { return this._supplierRepository.createSupplier(data); }
  updateSupplier(payload) { return this._supplierRepository.updateSupplier(payload); }
  deleteSupplier(id) { return this._supplierRepository.deleteSupplier(id); }
}

