import MenuRepository from '../../Domains/Menus/Repositories/MenuRepository.js';

export default class PrismaMenuRepository extends MenuRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_MENU_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.menu.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.menu.findUnique({ where: { id } }); }
  createMenu(data) { return this._prisma.menu.create({ data }); }
  async updateMenu({ id, data }) { try { return await this._prisma.menu.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deleteMenu(id) { try { await this._prisma.menu.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

