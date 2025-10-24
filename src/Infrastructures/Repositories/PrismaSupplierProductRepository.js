import SupplierProductRepository from '../../Domains/Suppliers/Repositories/SupplierProductRepository.js';

export default class PrismaSupplierProductRepository extends SupplierProductRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_SUPPLIER_PRODUCT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() { return this._prisma.supplierProduct.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.supplierProduct.findUnique({ where: { id } }); }
  createSupplierProduct(data) { return this._prisma.supplierProduct.create({ data }); }
  async updateSupplierProduct({ id, data }) {
    try { return await this._prisma.supplierProduct.update({ where: { id }, data }); }
    catch (error) { if (error?.code === 'P2025') return null; throw error; }
  }
  async deleteSupplierProduct(id) {
    try { await this._prisma.supplierProduct.delete({ where: { id } }); return true; }
    catch (error) { if (error?.code === 'P2025') return false; throw error; }
  }
}

