import SupplierProduct from '../../Domains/Suppliers/Entities/SupplierProduct.js';
import SupplierProductRepository from '../../Domains/Suppliers/Repositories/SupplierProductRepository.js';

export default class PrismaSupplierProductRepository extends SupplierProductRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_SUPPLIER_PRODUCT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.supplierProduct.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => SupplierProduct.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.supplierProduct.findUnique({ where: { id } });
    return SupplierProduct.fromPersistence(record);
  }

  async createSupplierProduct(data) {
    const record = await this._prisma.supplierProduct.create({ data });
    return SupplierProduct.fromPersistence(record);
  }

  async updateSupplierProduct({ id, data }) {
    try {
      const record = await this._prisma.supplierProduct.update({ where: { id }, data });
      return SupplierProduct.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteSupplierProduct(id) {
    try {
      await this._prisma.supplierProduct.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
