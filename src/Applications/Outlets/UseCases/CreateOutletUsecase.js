import BaseOutletUsecase from './BaseOutletUsecase.js';
import Outlet from '../../../Domains/Outlets/Entities/Outlet.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateOutletUsecase extends BaseOutletUsecase {
  async execute(payload = {}) {
    const normalized = this._normalizePayload(payload);

    if (typeof normalized.name === 'undefined') {
      throw new ValidationError('name is required');
    }

    const created = await this.outletService.createOutlet({
      outletData: {
        name: normalized.name,
        address: normalized.address ?? null,
        phone: normalized.phone ?? null,
        isActive: normalized.isActive ?? true,
      },
    });

    return Outlet.fromPersistence(created);
  }
}
