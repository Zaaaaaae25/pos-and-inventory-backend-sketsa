import PlaceStockRepository from '../../Domains/Stocks/Repositories/PlaceStockRepository.js';

export default class PrismaPlaceStockRepository extends PlaceStockRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_PLACESTOCK_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.placeStock.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.placeStock.findUnique({ where: { id } }); }
  createPlaceStock(data) { return this._prisma.placeStock.create({ data }); }
  async updatePlaceStock({ id, data }) { try { return await this._prisma.placeStock.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deletePlaceStock(id) { try { await this._prisma.placeStock.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

