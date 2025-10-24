import BaseUnitUsecase from './BaseUnitUsecase.js';

export default class ListUnitsUsecase extends BaseUnitUsecase {
  async execute() {
    return this.unitService.listUnits();
  }
}

