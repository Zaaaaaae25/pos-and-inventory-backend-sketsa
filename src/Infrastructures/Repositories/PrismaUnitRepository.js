import Unit from '../../Domains/Units/Entities/Unit.js';
import UnitRepository from '../../Domains/Units/Repositories/UnitRepository.js';

export default class PrismaUnitRepository extends UnitRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_UNIT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.unit.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Unit.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.unit.findUnique({ where: { id } });
    return Unit.fromPersistence(record);
  }

  async findByName(name) {
    if (!name) return null;
    const record = await this._prisma.unit.findUnique({ where: { name } });
    return Unit.fromPersistence(record);
  }

  async createUnit(unitData) {
    const record = await this._prisma.unit.create({ data: unitData });
    return Unit.fromPersistence(record);
  }

  async updateUnit({ id, unitData }) {
    try {
      const record = await this._prisma.unit.update({ where: { id }, data: unitData });
      return Unit.fromPersistence(record);
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
