import KitchenOrderRepository from '../../Domains/Transactions/Repositories/KitchenOrderRepository.js';

export default class PrismaKitchenOrderRepository extends KitchenOrderRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_KITCHEN_ORDER_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.kitchenOrder.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.kitchenOrder.findUnique({ where: { id } }); }
  createKitchenOrder(data) { return this._prisma.kitchenOrder.create({ data }); }
  async updateKitchenOrder({ id, data }) { try { return await this._prisma.kitchenOrder.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deleteKitchenOrder(id) { try { await this._prisma.kitchenOrder.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

