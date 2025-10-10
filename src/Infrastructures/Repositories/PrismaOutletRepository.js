import OutletRepository from '../../Domains/Outlets/Repositories/OutletRepository.js';

export default class PrismaOutletRepository extends OutletRepository {
  constructor({ prisma } = {}) {
    super();

    if (!prisma) {
      throw new Error('PRISMA_OUTLET_REPOSITORY.MISSING_CLIENT');
    }

    this._prisma = prisma;
  }

  async findAll() {
    return this._prisma.outlet.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findById(id) {
    return this._prisma.outlet.findUnique({
      where: { id },
    });
  }

  async createOutlet({ outletData }) {
    return this._prisma.outlet.create({
      data: outletData,
    });
  }

  async updateOutlet({ id, outletData }) {
    try {
      return await this._prisma.outlet.update({
        where: { id },
        data: outletData,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        return null;
      }

      throw error;
    }
  }

  async deleteOutlet(id) {
    try {
      await this._prisma.outlet.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') {
        return false;
      }

      throw error;
    }
  }
}
