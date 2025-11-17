import Transaction from '../../Domains/Transactions/Entities/Transaction.js';
import TransactionRepository from '../../Domains/Transactions/Repositories/TransactionRepository.js';

export default class PrismaTransactionRepository extends TransactionRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_TRANSACTION_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.transaction.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Transaction.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.transaction.findUnique({ where: { id } });
    return Transaction.fromPersistence(record);
  }

  async createTransaction(data) {
    const record = await this._prisma.transaction.create({ data });
    return Transaction.fromPersistence(record);
  }

  async updateTransaction({ id, data }) {
    try {
      const record = await this._prisma.transaction.update({ where: { id }, data });
      return Transaction.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteTransaction(id) {
    try {
      await this._prisma.transaction.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
