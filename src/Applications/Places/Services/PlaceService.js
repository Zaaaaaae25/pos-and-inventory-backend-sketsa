import PlaceRepository from '../../../Domains/Places/Repositories/PlaceRepository.js';

export default class PlaceService {
  constructor({ placeRepository } = {}) {
    if (!placeRepository) {
      throw new Error('PLACE_SERVICE.MISSING_REPOSITORY');
    }

    if (!(placeRepository instanceof PlaceRepository)) {
      const requiredMethods = [
        'findAll',
        'findById',
        'createPlace',
        'updatePlace',
        'deletePlace',
      ];

      const missingMethod = requiredMethods.find(
        (method) => typeof placeRepository[method] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`PLACE_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._placeRepository = placeRepository;
    this.supportsPlaceValidation = true;
  }

  async listPlaces() {
    return this._placeRepository.findAll();
  }

  async getPlace(id) {
    return this._placeRepository.findById(id);
  }

  async createPlace(placeData) {
    return this._placeRepository.createPlace(placeData);
  }

  async updatePlace(payload) {
    return this._placeRepository.updatePlace(payload);
  }

  async deletePlace(id) {
    return this._placeRepository.deletePlace(id);
  }
}
