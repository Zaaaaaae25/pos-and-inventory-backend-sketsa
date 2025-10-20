import BasePlaceUsecase from './BasePlaceUsecase.js';
import Place from '../../../Domains/Places/Entities/Place.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class UpdatePlaceUsecase extends BasePlaceUsecase {
  async execute(id, payload = {}) {
    const placeId = this._normalizeId(id);
    const normalized = this._normalizePayload(payload);

    if (Object.keys(normalized).length === 0) {
      throw new ValidationError('At least one field must be provided');
    }

    const updated = await this.placeService.updatePlace({
      id: placeId,
      placeData: normalized,
    });

    if (!updated) {
      throw new AppError('Place tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return Place.fromPersistence(updated);
  }
}
