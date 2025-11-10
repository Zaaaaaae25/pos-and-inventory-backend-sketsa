import MenuVariantItemRepository from '../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js';

export default class PrismaMenuVariantItemRepository extends MenuVariantItemRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_MENUVARIANTITEM_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.menuVariantItem.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.menuVariantItem.findUnique({ where: { id } }); }
  createMenuVariantItem(data) { return this._prisma.menuVariantItem.create({ data }); }
  async updateMenuVariantItem({ id, data }) { try { return await this._prisma.menuVariantItem.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteMenuVariantItem(id) { try { await this._prisma.menuVariantItem.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

