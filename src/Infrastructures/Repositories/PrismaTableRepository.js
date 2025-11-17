import Table from '../../Domains/Tables/Entities/Table.js';
import TableRepository from '../../Domains/Tables/Repositories/TableRepository.js';

export default class PrismaTableRepository extends TableRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_TABLE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.table.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Table.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.table.findUnique({ where: { id } });
    return Table.fromPersistence(record);
  }

  async createTable(tableData) {
    const record = await this._prisma.table.create({ data: tableData });
    return Table.fromPersistence(record);
  }

  async updateTable({ id, tableData }) {
    try {
      const record = await this._prisma.table.update({ where: { id }, data: tableData });
      return Table.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteTable(id) {
    try {
      await this._prisma.table.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
