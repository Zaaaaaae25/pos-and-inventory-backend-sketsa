import BasePlaceUsecase from './BasePlaceUsecase.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class DeletePlaceUsecase extends BasePlaceUsecase {
  async execute(id) {
    const placeId = this._normalizeId(id);
    const existing = await this.placeService.getPlace(placeId);

    if (!existing) {
      throw new AppError('Place tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    await this.placeService.deletePlace(placeId);
  }
}
