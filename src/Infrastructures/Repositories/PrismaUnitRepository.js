import UnitRepository from '../../Domains/Units/Repositories/UnitRepository.js';

export default class PrismaUnitRepository extends UnitRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_UNIT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() {
    return this._prisma.unit.findMany({ orderBy: { id: 'asc' } });
  }

  findById(id) {
    return this._prisma.unit.findUnique({ where: { id } });
  }

  findByName(name) {
    if (!name) return null;
    return this._prisma.unit.findUnique({ where: { name } });
  }

  createUnit(unitData) {
    return this._prisma.unit.create({ data: unitData });
  }

  async updateUnit({ id, unitData }) {
    try {
      return await this._prisma.unit.update({ where: { id }, data: unitData });
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteUnit(id) {
    try {
      await this._prisma.unit.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}

