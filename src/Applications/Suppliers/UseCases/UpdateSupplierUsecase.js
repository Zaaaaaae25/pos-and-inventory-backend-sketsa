import BaseSupplierUsecase from './BaseSupplierUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateSupplierUsecase extends BaseSupplierUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.supplierService.getSupplier(numericId);
    if (!existing) throw new ValidationError('Supplier not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      update.name = this._requireText(payload.name, 'name');
    }
    const fields = ['contactName','phone','email','address'];
    for (const f of fields) {
      if (Object.prototype.hasOwnProperty.call(payload, f)) {
        update[f] = this._textOrNull(payload[f]);
      }
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.supplierService.updateSupplier({ id: numericId, data: update });
  }
}

