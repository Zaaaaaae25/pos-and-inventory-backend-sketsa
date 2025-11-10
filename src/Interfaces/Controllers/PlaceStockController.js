import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PlaceStockController {
  constructor({ placeStockPresenter, listPlaceStocksUsecase, getPlaceStockUsecase, createPlaceStockUsecase, updatePlaceStockUsecase, deletePlaceStockUsecase } = {}) {
    const deps = [
      ['placeStockPresenter', placeStockPresenter],
      ['listPlaceStocksUsecase', listPlaceStocksUsecase],
      ['getPlaceStockUsecase', getPlaceStockUsecase],
      ['createPlaceStockUsecase', createPlaceStockUsecase],
      ['updatePlaceStockUsecase', updatePlaceStockUsecase],
      ['deletePlaceStockUsecase', deletePlaceStockUsecase],
    ];
    const miss = deps.find(([,v]) => !v); if (miss) throw new Error(`PlaceStockController requires ${miss[0]}`);
    Object.assign(this, Object.fromEntries(deps));
  }

  async listPlaceStocks(){ const records = await this.listPlaceStocksUsecase.execute(); return { status: HttpStatus.OK, data: this.placeStockPresenter.presentCollection(records) }; }
  async getPlaceStock({ params }){ const rec = await this.getPlaceStockUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.placeStockPresenter.present(rec) }; }
  async createPlaceStock({ body }){ const rec = await this.createPlaceStockUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.placeStockPresenter.present(rec) }; }
  async updatePlaceStock({ params, body }){ const rec = await this.updatePlaceStockUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.placeStockPresenter.present(rec) }; }
  async deletePlaceStock({ params }){ await this.deletePlaceStockUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

