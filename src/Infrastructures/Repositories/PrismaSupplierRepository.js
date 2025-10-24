import SupplierRepository from '../../Domains/Suppliers/Repositories/SupplierRepository.js';

export default class PrismaSupplierRepository extends SupplierRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_SUPPLIER_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() { return this._prisma.supplier.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.supplier.findUnique({ where: { id } }); }
  createSupplier(data) { return this._prisma.supplier.create({ data }); }
  async updateSupplier({ id, data }) {
    try { return await this._prisma.supplier.update({ where: { id }, data }); }
    catch (error) { if (error?.code === 'P2025') return null; throw error; }
  }
  async deleteSupplier(id) {
    try { await this._prisma.supplier.delete({ where: { id } }); return true; }
    catch (error) { if (error?.code === 'P2025') return false; throw error; }
  }
}

