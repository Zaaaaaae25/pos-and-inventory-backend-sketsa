import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseTableUsecase {
  constructor({ tableService, placeService } = {}) {
    if (!tableService) throw new Error('TABLE_USECASE.MISSING_SERVICE');
    this.tableService = tableService;
    this.placeService = placeService ?? null;
  }

  async _validatePlaceId(placeId) {
    const id = Number(placeId);
    if (!Number.isInteger(id) || id <= 0) throw new ValidationError('placeId must be a positive integer');
    if (!this.placeService || this.placeService.supportsPlaceValidation === false) return id;
    const place = await this.placeService.getPlace(id);
    if (!place) throw new ValidationError('placeId not found');
    return id;
  }
}

