import User from '../../../Domains/Users/Entities/User.js';

export default class ListUsersUsecase {
  constructor({ userService } = {}) {
    if (!userService) {
      throw new Error('LIST_USERS_USECASE.MISSING_USER_SERVICE');
    }

    this.userService = userService;
  }

  async execute() {
    const records = await this.userService.listUsers();
    return records.map((record) => User.fromPersistence(record));
  }
}
