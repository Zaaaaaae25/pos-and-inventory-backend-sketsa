import Menu from '../../Domains/Menus/Entities/Menu.js';
import MenuRepository from '../../Domains/Menus/Repositories/MenuRepository.js';

export default class PrismaMenuRepository extends MenuRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_MENU_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.menu.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Menu.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.menu.findUnique({ where: { id } });
    return Menu.fromPersistence(record);
  }

  async createMenu(data) {
    const record = await this._prisma.menu.create({ data });
    return Menu.fromPersistence(record);
  }

  async updateMenu({ id, data }) {
    try {
      const record = await this._prisma.menu.update({ where: { id }, data });
      return Menu.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteMenu(id) {
    try {
      await this._prisma.menu.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
