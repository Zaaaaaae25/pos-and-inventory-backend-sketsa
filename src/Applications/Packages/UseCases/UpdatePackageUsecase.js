import BasePackageUsecase from './BasePackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdatePackageUsecase extends BasePackageUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.packageService.getPackage(numericId);
    if (!existing) throw new ValidationError('Package not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      update.name = await this._assertNameAvailable(payload.name, numericId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'description')) {
      update.description = payload.description === null ? null : String(payload.description).trim() || null;
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.packageService.updatePackage({ id: numericId, packageData: update });
  }
}

