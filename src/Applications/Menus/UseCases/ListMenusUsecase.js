import BaseMenuUsecase from './BaseMenuUsecase.js';

export default class ListMenusUsecase extends BaseMenuUsecase {
  async execute() { return this.menuService.listMenus(); }
}

