import MenuPriceRepository from '../../Domains/MenuPrices/Repositories/MenuPriceRepository.js';

export default class PrismaMenuPriceRepository extends MenuPriceRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_MENUPRICE_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.menuPrice.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.menuPrice.findUnique({ where: { id } }); }
  createMenuPrice(data) { return this._prisma.menuPrice.create({ data }); }
  async updateMenuPrice({ id, data }) { try { return await this._prisma.menuPrice.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteMenuPrice(id) { try { await this._prisma.menuPrice.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

