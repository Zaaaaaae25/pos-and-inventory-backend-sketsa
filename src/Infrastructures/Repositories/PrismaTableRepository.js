import TableRepository from '../../Domains/Tables/Repositories/TableRepository.js';

export default class PrismaTableRepository extends TableRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_TABLE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() {
    return this._prisma.table.findMany({ orderBy: { id: 'asc' } });
  }

  findById(id) {
    return this._prisma.table.findUnique({ where: { id } });
  }

  createTable(tableData) {
    return this._prisma.table.create({ data: tableData });
  }

  async updateTable({ id, tableData }) {
    try {
      return await this._prisma.table.update({ where: { id }, data: tableData });
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

