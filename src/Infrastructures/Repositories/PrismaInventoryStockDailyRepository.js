import InventoryStockDaily from '../../Domains/Stocks/Entities/InventoryStockDaily.js';
import InventoryStockDailyRepository from '../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js';

export default class PrismaInventoryStockDailyRepository extends InventoryStockDailyRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_INVENTORY_STOCK_DAILY_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.inventoryStockDaily.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => InventoryStockDaily.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.inventoryStockDaily.findUnique({ where: { id } });
    return InventoryStockDaily.fromPersistence(record);
  }

  async createRecord(data) {
    const record = await this._prisma.inventoryStockDaily.create({ data });
    return InventoryStockDaily.fromPersistence(record);
  }

  async updateRecord({ id, data }) {
    try {
      const record = await this._prisma.inventoryStockDaily.update({ where: { id }, data });
      return InventoryStockDaily.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteRecord(id) {
    try {
      await this._prisma.inventoryStockDaily.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
