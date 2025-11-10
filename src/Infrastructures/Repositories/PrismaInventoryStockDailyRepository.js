import InventoryStockDailyRepository from '../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js';

export default class PrismaInventoryStockDailyRepository extends InventoryStockDailyRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_INVENTORY_STOCK_DAILY_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.inventoryStockDaily.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.inventoryStockDaily.findUnique({ where: { id } }); }
  createRecord(data) { return this._prisma.inventoryStockDaily.create({ data }); }
  async updateRecord({ id, data }) { try { return await this._prisma.inventoryStockDaily.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deleteRecord(id) { try { await this._prisma.inventoryStockDaily.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

