import Supplier from '../../Domains/Suppliers/Entities/Supplier.js';
import SupplierRepository from '../../Domains/Suppliers/Repositories/SupplierRepository.js';

export default class PrismaSupplierRepository extends SupplierRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_SUPPLIER_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.supplier.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Supplier.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.supplier.findUnique({ where: { id } });
    return Supplier.fromPersistence(record);
  }

  async createSupplier(data) {
    const record = await this._prisma.supplier.create({ data });
    return Supplier.fromPersistence(record);
  }

  async updateSupplier({ id, data }) {
    try {
      const record = await this._prisma.supplier.update({ where: { id }, data });
      return Supplier.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteSupplier(id) {
    try {
      await this._prisma.supplier.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
