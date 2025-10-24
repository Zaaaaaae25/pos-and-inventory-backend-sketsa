import BaseTableUsecase from './BaseTableUsecase.js';

export default class ListTablesUsecase extends BaseTableUsecase {
  async execute() {
    return this.tableService.listTables();
  }
}

