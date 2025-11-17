import Permission from '../../Domains/Permissions/Entities/Permission.js';
import PermissionRepository from '../../Domains/Permissions/Repositories/PermissionRepository.js';

export default class PrismaPermissionRepository extends PermissionRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) {
      throw new Error('PRISMA_PERMISSION_REPOSITORY.MISSING_CLIENT');
    }
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.permission.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Permission.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.permission.findUnique({ where: { id } });
    return Permission.fromPersistence(record);
  }

  async findByName(name) {
    if (!name) return null;
    const record = await this._prisma.permission.findUnique({ where: { name } });
    return Permission.fromPersistence(record);
  }

  async createPermission(permissionData) {
    const record = await this._prisma.permission.create({ data: permissionData });
    return Permission.fromPersistence(record);
  }

  async updatePermission({ id, permissionData }) {
    try {
      const record = await this._prisma.permission.update({ where: { id }, data: permissionData });
      return Permission.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async deletePermission(id) {
    try {
      await this._prisma.permission.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}
