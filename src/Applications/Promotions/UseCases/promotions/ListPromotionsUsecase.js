export default class ListPromotionsUsecase {
  constructor({ promotionService } = {}) { if (!promotionService) throw new Error('LIST_PROMOTIONS.MISSING_SERVICE'); this.promotionService = promotionService; }
  async execute(){ return this.promotionService.list(); }
}

