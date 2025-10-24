import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class TableController {
  constructor({
    tablePresenter,
    listTablesUsecase,
    getTableUsecase,
    createTableUsecase,
    updateTableUsecase,
    deleteTableUsecase,
  }) {
    if (!tablePresenter) throw new Error('TableController requires a presenter');
    const reqs = [
      ['listTablesUsecase', listTablesUsecase],
      ['getTableUsecase', getTableUsecase],
      ['createTableUsecase', createTableUsecase],
      ['updateTableUsecase', updateTableUsecase],
      ['deleteTableUsecase', deleteTableUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`TableController requires ${miss[0]}`);

    this.tablePresenter = tablePresenter;
    this.listTablesUsecase = listTablesUsecase;
    this.getTableUsecase = getTableUsecase;
    this.createTableUsecase = createTableUsecase;
    this.updateTableUsecase = updateTableUsecase;
    this.deleteTableUsecase = deleteTableUsecase;
  }

  async listTables() {
    const records = await this.listTablesUsecase.execute();
    return { status: HttpStatus.OK, data: this.tablePresenter.presentCollection(records) };
  }
  async getTable({ params }) {
    const record = await this.getTableUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.tablePresenter.present(record) };
  }
  async createTable({ body }) {
    const record = await this.createTableUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.tablePresenter.present(record) };
  }
  async updateTable({ params, body }) {
    const record = await this.updateTableUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.tablePresenter.present(record) };
  }
  async deleteTable({ params }) {
    await this.deleteTableUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

