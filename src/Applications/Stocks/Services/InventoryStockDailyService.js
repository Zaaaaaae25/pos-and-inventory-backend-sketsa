import InventoryStockDailyRepository from '../../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js';

export default class InventoryStockDailyService {
  constructor({ inventoryStockDailyRepository } = {}) {
    if (!inventoryStockDailyRepository) throw new Error('INVENTORY_STOCK_DAILY_SERVICE.MISSING_REPOSITORY');
    if (!(inventoryStockDailyRepository instanceof InventoryStockDailyRepository)) {
      const req=['findAll','findById','createRecord','updateRecord','deleteRecord'];
      const miss=req.find((m)=>typeof inventoryStockDailyRepository[m] !== 'function');
      if(miss) throw new Error(`INVENTORY_STOCK_DAILY_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = inventoryStockDailyRepository;
  }
  list(){ return this._repo.findAll(); }
  get(id){ return this._repo.findById(id); }
  create(data){ return this._repo.createRecord(data); }
  update({id,data}){ return this._repo.updateRecord({id,data}); }
  delete(id){ return this._repo.deleteRecord(id); }
}

