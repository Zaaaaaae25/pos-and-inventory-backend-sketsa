import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseSupplierUsecase {
  constructor({ supplierService } = {}) {
    if (!supplierService) throw new Error('SUPPLIER_USECASE.MISSING_SERVICE');
    this.supplierService = supplierService;
  }

  _textOrNull(value) {
    if (typeof value === 'undefined') return undefined;
    if (value === null) return null;
    return String(value).trim() || null;
  }

  _requireText(value, field) {
    const text = String(value ?? '').trim();
    if (!text) throw new ValidationError(`${field} is required`);
    return text;
  }
}

