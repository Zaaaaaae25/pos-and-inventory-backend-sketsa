import BasePlaceUsecase from './BasePlaceUsecase.js';
import Place from '../../../Domains/Places/Entities/Place.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreatePlaceUsecase extends BasePlaceUsecase {
  async execute(payload = {}) {
    const normalized = this._normalizePayload(payload);

    if (typeof normalized.name === 'undefined') {
      throw new ValidationError('name is required');
    }

    const created = await this.placeService.createPlace({
      placeData: {
        name: normalized.name,
        address: normalized.address ?? null,
        phone: normalized.phone ?? null,
        logoPath: normalized.logoPath ?? null,
        type: normalized.type ?? null,
        isActive: normalized.isActive ?? true,
      },
    });

    return Place.fromPersistence(created);
  }
}
