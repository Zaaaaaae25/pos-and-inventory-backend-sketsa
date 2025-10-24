import BasePackageUsecase from './BasePackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreatePackageUsecase extends BasePackageUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const name = await this._assertNameAvailable(payload.name);
    let description = null;
    if (typeof payload.description !== 'undefined') {
      description = payload.description === null ? null : String(payload.description).trim() || null;
    }
    return this.packageService.createPackage({ name, description });
  }
}

