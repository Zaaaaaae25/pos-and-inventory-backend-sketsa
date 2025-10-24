import PackageRepository from '../../Domains/Packages/Repositories/PackageRepository.js';

export default class PrismaPackageRepository extends PackageRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_PACKAGE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() { return this._prisma.package.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.package.findUnique({ where: { id } }); }
  findByName(name) { if (!name) return null; return this._prisma.package.findUnique({ where: { name } }); }
  createPackage(packageData) { return this._prisma.package.create({ data: packageData }); }
  async updatePackage({ id, packageData }) {
    try { return await this._prisma.package.update({ where: { id }, data: packageData }); }
    catch (error) { if (error?.code === 'P2025') return null; throw error; }
  }
  async deletePackage(id) {
    try { await this._prisma.package.delete({ where: { id } }); return true; }
    catch (error) { if (error?.code === 'P2025') return false; throw error; }
  }
}

