import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class LogoutUsecase {
  // Stateless logout; simply allows middleware hooks for future use.
  async execute() {
    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
