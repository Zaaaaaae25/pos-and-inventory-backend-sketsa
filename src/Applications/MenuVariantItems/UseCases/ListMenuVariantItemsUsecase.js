import BaseMenuVariantItemUsecase from './BaseMenuVariantItemUsecase.js';

export default class ListMenuVariantItemsUsecase extends BaseMenuVariantItemUsecase {
  async execute(){ return this.menuVariantItemService.listMenuVariantItems(); }
}

