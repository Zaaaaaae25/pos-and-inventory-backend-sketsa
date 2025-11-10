import BaseMenuVariantUsecase from './BaseMenuVariantUsecase.js';

export default class ListMenuVariantsUsecase extends BaseMenuVariantUsecase {
  async execute(){ return this.menuVariantService.listMenuVariants(); }
}

