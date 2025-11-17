import Package from '../../Domains/Packages/Entities/Package.js';
import PackageRepository from '../../Domains/Packages/Repositories/PackageRepository.js';

export default class PrismaPackageRepository extends PackageRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_PACKAGE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.package.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Package.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.package.findUnique({ where: { id } });
    return Package.fromPersistence(record);
  }

  async findByName(name) {
    if (!name) return null;
    const record = await this._prisma.package.findUnique({ where: { name } });
    return Package.fromPersistence(record);
  }

  async createPackage(packageData) {
    const record = await this._prisma.package.create({ data: packageData });
    return Package.fromPersistence(record);
  }

  async updatePackage({ id, packageData }) {
    try {
      const record = await this._prisma.package.update({ where: { id }, data: packageData });
      return Package.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deletePackage(id) {
    try {
      await this._prisma.package.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
