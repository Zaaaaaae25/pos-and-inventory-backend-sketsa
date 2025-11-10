import MenuVariantRepository from '../../Domains/MenuVariants/Repositories/MenuVariantRepository.js';

export default class PrismaMenuVariantRepository extends MenuVariantRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_MENUVARIANT_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.menuVariant.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.menuVariant.findUnique({ where: { id } }); }
  createMenuVariant(data) { return this._prisma.menuVariant.create({ data }); }
  async updateMenuVariant({ id, data }) { try { return await this._prisma.menuVariant.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteMenuVariant(id) { try { await this._prisma.menuVariant.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

