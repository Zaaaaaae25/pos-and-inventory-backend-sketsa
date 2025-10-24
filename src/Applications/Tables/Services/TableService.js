import TableRepository from '../../../Domains/Tables/Repositories/TableRepository.js';

export default class TableService {
  constructor({ tableRepository } = {}) {
    if (!tableRepository) throw new Error('TABLE_SERVICE.MISSING_REPOSITORY');
    if (!(tableRepository instanceof TableRepository)) {
      const methods = ['findAll','findById','createTable','updateTable','deleteTable'];
      const missing = methods.find((m) => typeof tableRepository[m] !== 'function');
      if (missing) throw new Error(`TABLE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._tableRepository = tableRepository;
  }

  listTables() { return this._tableRepository.findAll(); }
  getTable(id) { return this._tableRepository.findById(id); }
  createTable(tableData) { return this._tableRepository.createTable(tableData); }
  updateTable(payload) { return this._tableRepository.updateTable(payload); }
  deleteTable(id) { return this._tableRepository.deleteTable(id); }
}

