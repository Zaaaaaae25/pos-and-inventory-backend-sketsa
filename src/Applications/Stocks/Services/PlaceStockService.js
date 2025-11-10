import PlaceStockRepository from '../../../Domains/Stocks/Repositories/PlaceStockRepository.js';

export default class PlaceStockService {
  constructor({ placeStockRepository } = {}) {
    if (!placeStockRepository) throw new Error('PLACESTOCK_SERVICE.MISSING_REPOSITORY');
    if (!(placeStockRepository instanceof PlaceStockRepository)) {
      const req=['findAll','findById','createPlaceStock','updatePlaceStock','deletePlaceStock'];
      const miss=req.find((m)=>typeof placeStockRepository[m] !== 'function');
      if(miss) throw new Error(`PLACESTOCK_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = placeStockRepository;
  }
  listPlaceStocks(){ return this._repo.findAll(); }
  getPlaceStock(id){ return this._repo.findById(id); }
  createPlaceStock(data){ return this._repo.createPlaceStock(data); }
  updatePlaceStock({id,data}){ return this._repo.updatePlaceStock({id,data}); }
  deletePlaceStock(id){ return this._repo.deletePlaceStock(id); }
}

