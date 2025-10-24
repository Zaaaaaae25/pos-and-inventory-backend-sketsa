import BaseSupplierUsecase from './BaseSupplierUsecase.js';

export default class CreateSupplierUsecase extends BaseSupplierUsecase {
  async execute(payload = {}) {
    const name = this._requireText(payload.name, 'name');
    return this.supplierService.createSupplier({
      name,
      contactName: this._textOrNull(payload.contactName),
      phone: this._textOrNull(payload.phone),
      email: this._textOrNull(payload.email),
      address: this._textOrNull(payload.address),
    });
  }
}

