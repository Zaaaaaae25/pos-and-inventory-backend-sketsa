export default class ListPlaceStocksUsecase {
  constructor({ placeStockService } = {}) { if (!placeStockService) throw new Error('LIST_PLACESTOCKS.MISSING_SERVICE'); this.placeStockService = placeStockService; }
  async execute(){ return this.placeStockService.listPlaceStocks(); }
}

