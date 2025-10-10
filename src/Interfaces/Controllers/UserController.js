import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class UserController {
  constructor({
    userPresenter,
    listUsersUsecase,
    getUserUsecase,
    createUserUsecase,
    updateUserUsecase,
  }) {
    if (!userPresenter) {
      throw new Error('UserController requires a presenter');
    }

    if (!listUsersUsecase || !getUserUsecase || !createUserUsecase || !updateUserUsecase) {
      throw new Error('UserController requires all user usecases');
    }

    this.userPresenter = userPresenter;
    this.listUsersUsecase = listUsersUsecase;
    this.getUserUsecase = getUserUsecase;
    this.createUserUsecase = createUserUsecase;
    this.updateUserUsecase = updateUserUsecase;
  }

  async listUsers() {
    const users = await this.listUsersUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.userPresenter.presentCollection(users),
    };
  }

  async getUser({ params }) {
    const user = await this.getUserUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.userPresenter.present(user),
    };
  }

  async createUser({ body }) {
    const user = await this.createUserUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      data: this.userPresenter.present(user),
    };
  }

  async updateUser({ params, body }) {
    const user = await this.updateUserUsecase.execute(params.id, body);
    return {
      status: HttpStatus.OK,
      data: this.userPresenter.present(user),
    };
  }
}
