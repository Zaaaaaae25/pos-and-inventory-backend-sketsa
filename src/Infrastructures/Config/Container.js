import { getPrisma } from './DatabaseConfig.js';
import PrismaUserRepository from '../Repositories/PrismaUserRepository.js';
import UserService from '../../Applications/Users/Services/UserService.js';
import {
  ListUsersUsecase,
  GetUserUsecase,
  CreateUserUsecase,
  UpdateUserUsecase,
} from '../../Applications/Users/UseCases/index.js';
import UserPresenter from '../../Interfaces/Presenters/UserPresenter.js';
import UserController from '../../Interfaces/Controllers/UserController.js';

export default function createContainer(overrides = {}) {

  const prismaClient = overrides.userRepository
    ? overrides.prisma ?? null
    : overrides.prisma ?? getPrisma();

  const userRepository =
    overrides.userRepository ?? new PrismaUserRepository({ prisma: prismaClient });

  const userService = overrides.userService ?? new UserService({ userRepository });

  const listUsersUsecase =
    overrides.listUsersUsecase ?? new ListUsersUsecase({ userService });

  const getUserUsecase =
    overrides.getUserUsecase ?? new GetUserUsecase({ userService });

  const createUserUsecase =
    overrides.createUserUsecase ?? new CreateUserUsecase({ userService });

  const updateUserUsecase =
    overrides.updateUserUsecase ?? new UpdateUserUsecase({ userService });

  const userPresenter = overrides.userPresenter ?? new UserPresenter();

  const userController =
    overrides.userController ??
    new UserController({
      userPresenter,
      listUsersUsecase,
      getUserUsecase,
      createUserUsecase,
      updateUserUsecase,
    });

  const values = new Map([
    ['prisma', prismaClient],
    ['userRepository', userRepository],
    ['userService', userService],
    ['listUsersUsecase', listUsersUsecase],
    ['getUserUsecase', getUserUsecase],
    ['createUserUsecase', createUserUsecase],
    ['updateUserUsecase', updateUserUsecase],
    ['userPresenter', userPresenter],
    ['userController', userController],
  ]);

  return {
    resolve(token) {
      if (Object.prototype.hasOwnProperty.call(overrides, token)) {
        return overrides[token];
      }

      if (!values.has(token)) {
        throw new Error(`CONTAINER.UNREGISTERED_TOKEN: ${token}`);
      }

      return values.get(token);
    },
  };
}
