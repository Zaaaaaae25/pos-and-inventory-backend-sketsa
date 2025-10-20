import BasePlaceUsecase from './BasePlaceUsecase.js';
import Place from '../../../Domains/Places/Entities/Place.js';

export default class ListPlacesUsecase extends BasePlaceUsecase {
  async execute() {
    const records = await this.placeService.listPlaces();
    return records.map((record) => Place.fromPersistence(record));
  }
}
