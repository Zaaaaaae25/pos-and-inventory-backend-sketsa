import KitchenOrder from '../../Domains/Transactions/Entities/KitchenOrder.js';
import KitchenOrderRepository from '../../Domains/Transactions/Repositories/KitchenOrderRepository.js';

export default class PrismaKitchenOrderRepository extends KitchenOrderRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_KITCHEN_ORDER_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.kitchenOrder.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => KitchenOrder.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.kitchenOrder.findUnique({ where: { id } });
    return KitchenOrder.fromPersistence(record);
  }

  async createKitchenOrder(data) {
    const record = await this._prisma.kitchenOrder.create({ data });
    return KitchenOrder.fromPersistence(record);
  }

  async updateKitchenOrder({ id, data }) {
    try {
      const record = await this._prisma.kitchenOrder.update({ where: { id }, data });
      return KitchenOrder.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteKitchenOrder(id) {
    try {
      await this._prisma.kitchenOrder.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
