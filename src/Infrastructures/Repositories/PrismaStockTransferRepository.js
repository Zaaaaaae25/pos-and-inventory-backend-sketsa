import StockTransfer from '../../Domains/Stocks/Entities/StockTransfer.js';
import StockTransferRepository from '../../Domains/Stocks/Repositories/StockTransferRepository.js';

export default class PrismaStockTransferRepository extends StockTransferRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_STOCK_TRANSFER_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.stockTransfer.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => StockTransfer.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.stockTransfer.findUnique({ where: { id } });
    return StockTransfer.fromPersistence(record);
  }

  async createTransfer(data) {
    const record = await this._prisma.stockTransfer.create({ data });
    return StockTransfer.fromPersistence(record);
  }

  async deleteTransfer(id) {
    try {
      await this._prisma.stockTransfer.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
