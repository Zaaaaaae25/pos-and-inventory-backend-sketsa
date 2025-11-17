import TransactionItem from '../../Domains/Transactions/Entities/TransactionItem.js';
import TransactionItemRepository from '../../Domains/Transactions/Repositories/TransactionItemRepository.js';

export default class PrismaTransactionItemRepository extends TransactionItemRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_TRANSACTION_ITEM_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.transactionItem.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => TransactionItem.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.transactionItem.findUnique({ where: { id } });
    return TransactionItem.fromPersistence(record);
  }

  async createItem(data) {
    const record = await this._prisma.transactionItem.create({ data });
    return TransactionItem.fromPersistence(record);
  }

  async updateItem({ id, data }) {
    try {
      const record = await this._prisma.transactionItem.update({ where: { id }, data });
      return TransactionItem.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      await this._prisma.transactionItem.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
