import RoleRepository from '../../Domains/Users/Repositories/RoleRepository.js';

const roleInclude = {
  rolePermissions: {
    include: {
      permission: true,
    },
  },
  userRoles: {
    select: { id: true },
  },
};

export default class PrismaRoleRepository extends RoleRepository {
  constructor({ prisma } = {}) {
    super();

    if (!prisma) {
      throw new Error('PRISMA_ROLE_REPOSITORY.MISSING_CLIENT');
    }

    this._prisma = prisma;
  }

  async findAll() {
    return this._prisma.role.findMany({
      include: roleInclude,
      orderBy: { id: 'asc' },
    });
  }

  async findById(id) {
    return this._prisma.role.findUnique({
      where: { id },
      include: roleInclude,
    });
  }

  async findByName(name) {
    if (!name) {
      return null;
    }

    return this._prisma.role.findUnique({
      where: { name },
      include: roleInclude,
    });
  }

  async findPermissionsByNames(permissionNames) {
    if (!permissionNames || permissionNames.length === 0) {
      return [];
    }

    return this._prisma.permission.findMany({
      where: {
        name: { in: permissionNames },
      },
    });
  }

  async createRole({ roleData, permissionIds }) {
    return this._prisma.$transaction(async (tx) => {
      const created = await tx.role.create({ data: roleData });

      if (permissionIds && permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({
            roleId: created.id,
            permissionId,
          })),
          skipDuplicates: true,
        });
      }

      return tx.role.findUnique({
        where: { id: created.id },
        include: roleInclude,
      });
    });
  }

  async updateRole({ id, roleData, permissionIds }) {
    return this._prisma.$transaction(async (tx) => {
      const updated = await tx.role.update({
        where: { id },
        data: roleData,
      });

      await tx.rolePermission.deleteMany({ where: { roleId: id } });

      if (permissionIds && permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({
            roleId: id,
            permissionId,
          })),
          skipDuplicates: true,
        });
      }

      return tx.role.findUnique({
        where: { id: updated.id },
        include: roleInclude,
      });
    });
  }

  async deleteRole(id) {
    await this._prisma.role.delete({ where: { id } });
  }
}
