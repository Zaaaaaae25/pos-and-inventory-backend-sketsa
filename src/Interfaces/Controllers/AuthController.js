import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class AuthController {
  constructor({ loginUsecase, logoutUsecase, userPresenter } = {}) {
    if (!loginUsecase) {
      throw new Error('AUTH_CONTROLLER.MISSING_LOGIN_USECASE');
    }

    if (!logoutUsecase) {
      throw new Error('AUTH_CONTROLLER.MISSING_LOGOUT_USECASE');
    }

    if (!userPresenter) {
      throw new Error('AUTH_CONTROLLER.MISSING_USER_PRESENTER');
    }

    this.loginUsecase = loginUsecase;
    this.logoutUsecase = logoutUsecase;
    this.userPresenter = userPresenter;
  }

  async login({ body }) {
    const { token, user } = await this.loginUsecase.execute(body);

    return {
      status: HttpStatus.OK,
      data: {
        token,
        tokenType: 'Bearer',
        user: this.userPresenter.present(user),
      },
    };
  }

  async logout(request) {
    const result = await this.logoutUsecase.execute({ user: request?.user ?? null });

    if (result && typeof result === 'object') {
      const { status = HttpStatus.NO_CONTENT, data } = result;
      return { status, data };
    }

    return { status: HttpStatus.NO_CONTENT };
  }
}
