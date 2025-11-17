import TransactionItemVariant from '../../Domains/Transactions/Entities/TransactionItemVariant.js';
import TransactionItemVariantRepository from '../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js';

export default class PrismaTransactionItemVariantRepository extends TransactionItemVariantRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_TRANSACTION_ITEM_VARIANT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.transactionItemVariant.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => TransactionItemVariant.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.transactionItemVariant.findUnique({ where: { id } });
    return TransactionItemVariant.fromPersistence(record);
  }

  async createVariant(data) {
    const record = await this._prisma.transactionItemVariant.create({ data });
    return TransactionItemVariant.fromPersistence(record);
  }

  async deleteVariant(id) {
    try {
      await this._prisma.transactionItemVariant.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
