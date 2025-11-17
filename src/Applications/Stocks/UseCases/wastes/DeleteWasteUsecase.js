import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteWasteUsecase {
  constructor({ wasteService } = {}) { if (!wasteService) throw new Error('DELETE_WASTE.MISSING_SERVICE'); this.wasteService = wasteService; }
  async execute(id) { const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer'); const ok = await this.wasteService.delete(intId); if (!ok) throw new ValidationError('Waste not found'); return true; }
}

