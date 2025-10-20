import PrismaUserRepository from '../Repositories/PrismaUserRepository.js';
import PrismaPlaceRepository from '../Repositories/PrismaPlaceRepository.js';
import UserService from '../../Applications/Users/Services/UserService.js';
import PlaceService from '../../Applications/Places/Services/PlaceService.js';
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

  let placeService =
    overrides.userPlaceService ??
    overrides.placeService ??
    (container?.has('placeService') ? container.get('placeService') : null);

  if (!placeService && prisma) {
    const placeRepository =
      overrides.userPlaceRepository ?? new PrismaPlaceRepository({ prisma });
    placeService = new PlaceService({ placeRepository });
  }

  if (!placeService) {
    placeService = {
      supportsPlaceValidation: false,
      async getPlace() {
        return null;
      },
    };
  }

  const listUsersUsecase =
    overrides.listUsersUsecase ?? new ListUsersUsecase({ userService });

  const getUserUsecase =
    overrides.getUserUsecase ?? new GetUserUsecase({ userService });

  const createUserUsecase =
    overrides.createUserUsecase ?? new CreateUserUsecase({ userService, placeService });

  const updateUserUsecase =
    overrides.updateUserUsecase ?? new UpdateUserUsecase({ userService, placeService });

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
