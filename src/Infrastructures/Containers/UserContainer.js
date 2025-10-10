import PrismaUserRepository from '../Repositories/PrismaUserRepository.js';
import PrismaOutletRepository from '../Repositories/PrismaOutletRepository.js';
import UserService from '../../Applications/Users/Services/UserService.js';
import OutletService from '../../Applications/Outlets/Services/OutletService.js';
import {
  ListUsersUsecase,
  GetUserUsecase,
  CreateUserUsecase,
  UpdateUserUsecase,
} from '../../Applications/Users/UseCases/index.js';
import UserPresenter from '../../Interfaces/Presenters/UserPresenter.js';
import UserController from '../../Interfaces/Controllers/UserController.js';

export default function registerUserContainer({ container, overrides = {}, prisma }) {
  const userRepository =
    overrides.userRepository ?? new PrismaUserRepository({ prisma });

  const userService = overrides.userService ?? new UserService({ userRepository });

  let outletService =
    overrides.userOutletService ??
    overrides.outletService ??
    (container?.has('outletService') ? container.get('outletService') : null);

  if (!outletService && prisma) {
    const outletRepository =
      overrides.userOutletRepository ?? new PrismaOutletRepository({ prisma });
    outletService = new OutletService({ outletRepository });
  }

  if (!outletService) {
    outletService = {
      supportsOutletValidation: false,
      async getOutlet() {
        return null;
      },
    };
  }

  const listUsersUsecase =
    overrides.listUsersUsecase ?? new ListUsersUsecase({ userService });

  const getUserUsecase =
    overrides.getUserUsecase ?? new GetUserUsecase({ userService });

  const createUserUsecase =
    overrides.createUserUsecase ?? new CreateUserUsecase({ userService, outletService });

  const updateUserUsecase =
    overrides.updateUserUsecase ?? new UpdateUserUsecase({ userService, outletService });

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

  container.set('userRepository', userRepository);
  container.set('userService', userService);
  container.set('listUsersUsecase', listUsersUsecase);
  container.set('getUserUsecase', getUserUsecase);
  container.set('createUserUsecase', createUserUsecase);
  container.set('updateUserUsecase', updateUserUsecase);
  container.set('userPresenter', userPresenter);
  container.set('userController', userController);
}
