import User from '../../../Domains/Users/Entities/User.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class GetUserUsecase {
  constructor({ userService } = {}) {
    if (!userService) {
      throw new Error('GET_USER_USECASE.MISSING_USER_SERVICE');
    }

    this.userService = userService;
  }

  async execute(id) {
    if (Number.isNaN(Number(id))) {
      throw new ValidationError('Invalid user id');
    }

    const record = await this.userService.getUser(Number(id));

    if (!record) {
      throw new AppError('User not found', HttpStatus.NOT_FOUND);
    }

    return User.fromPersistence(record);
  }
}
