import BasePlaceUsecase from './BasePlaceUsecase.js';
import Place from '../../../Domains/Places/Entities/Place.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class GetPlaceUsecase extends BasePlaceUsecase {
  async execute(id) {
    const placeId = this._normalizeId(id);
    const record = await this.placeService.getPlace(placeId);

    if (!record) {
      throw new AppError('Place tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return Place.fromPersistence(record);
  }
}
