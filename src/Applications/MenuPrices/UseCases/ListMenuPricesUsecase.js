import BaseMenuPriceUsecase from './BaseMenuPriceUsecase.js';

export default class ListMenuPricesUsecase extends BaseMenuPriceUsecase {
  async execute() { return this.menuPriceService.listMenuPrices(); }
}

