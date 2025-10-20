import UserRepository from '../../Domains/Users/Repositories/UserRepository.js';

const userInclude = {
  userRoles: {
    include: {
      role: {
        include: {
          rolePermissions: {
            include: { permission: true },
          },
        },
      },
    },
  },
};

export default class PrismaUserRepository extends UserRepository {
  constructor({ prisma } = {}) {
    super();

    if (!prisma) {
      throw new Error('PRISMA_USER_REPOSITORY.MISSING_CLIENT');
    }

    this._prisma = prisma;
  }

  async findAll() {
    return this._prisma.user.findMany({
      include: userInclude,
      orderBy: { id: 'asc' },
    });
  }

  async findById(id) {
    return this._prisma.user.findUnique({
      where: { id },
      include: userInclude,
    });
  }

  async findRoleByName(roleName) {
    return this._prisma.role.findUnique({
      where: { name: roleName.toLowerCase() },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });
  }

  async findByEmail(email) {
    if (!email) {
      return null;
    }

    return this._prisma.user.findUnique({
      where: { email },
      include: userInclude,
    });
  }

  async createUser({ userData, roleId, placeId }) {
    return this._prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({ data: userData });

      await tx.userRole.create({
        data: {
          userId: createdUser.id,
          roleId,
          placeId: placeId ?? null,
        },
      });

      return tx.user.findUnique({
        where: { id: createdUser.id },
        include: userInclude,
      });
    });
  }

  async updateUser({ id, userData, roleId, placeId }) {
    return this._prisma.$transaction(async (tx) => {
      const savedUser = await tx.user.update({
        where: { id },
        data: userData,
      });

      const assignment = await tx.userRole.findFirst({
        where: { userId: savedUser.id },
      });

      if (assignment) {
        await tx.userRole.update({
          where: { id: assignment.id },
          data: {
            roleId,
            placeId: placeId ?? assignment.placeId ?? null,
          },
        });
      } else {
        await tx.userRole.create({
          data: {
            userId: savedUser.id,
            roleId,
            placeId: placeId ?? null,
          },
        });
      }

      return tx.user.findUnique({
        where: { id: savedUser.id },
        include: userInclude,
      });
    });
  }
}
