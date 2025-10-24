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
    return this._prisma.permission.findMany({ orderBy: { id: 'asc' } });
  }

  async findById(id) {
    return this._prisma.permission.findUnique({ where: { id } });
  }

  async findByName(name) {
    if (!name) return null;
    return this._prisma.permission.findUnique({ where: { name } });
  }

  async createPermission(permissionData) {
    return this._prisma.permission.create({ data: permissionData });
  }

  async updatePermission({ id, permissionData }) {
    try {
      return await this._prisma.permission.update({ where: { id }, data: permissionData });
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

