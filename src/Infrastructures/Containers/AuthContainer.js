import {
  optionalAuth as optionalAuthMiddleware,
  createRequireAuthMiddleware,
  createAuthorizeMiddleware,
} from '../../Interfaces/Middlewares/AuthMiddleware.js';
import { LoginUsecase, LogoutUsecase } from '../../Applications/Auth/UseCases/index.js';
import AuthController from '../../Interfaces/Controllers/AuthController.js';
import UserPresenter from '../../Interfaces/Presenters/UserPresenter.js';

export default function registerAuthContainer({ container, overrides = {} }) {
  const optionalAuth = overrides.optionalAuth ?? optionalAuthMiddleware;
  container.set('optionalAuth', optionalAuth);

  const userService =
    overrides.authUserService ??
    overrides.userService ??
    (container?.has('userService') ? container.get('userService') : null);

  if (!userService) {
    throw new Error('AUTH_CONTAINER.MISSING_USER_SERVICE');
  }

  const requireAuth =
    overrides.requireAuth ??
    createRequireAuthMiddleware({
      userService,
      tokenVerifier: overrides.authTokenVerifier ?? overrides.tokenVerifier ?? undefined,
    });
  container.set('requireAuth', requireAuth);

  const authorize = overrides.authorize ?? createAuthorizeMiddleware();
  container.set('authorize', authorize);

  const tokenExpiresIn =
    overrides.tokenExpiresIn ?? process.env.JWT_EXPIRES_IN ?? process.env.JWT_EXPIRATION ?? '1h';

  const loginUsecase =
    overrides.loginUsecase ??
    new LoginUsecase({
      userService,
      tokenSigner: overrides.tokenSigner,
      tokenExpiresIn,
    });

  const logoutUsecase = overrides.logoutUsecase ?? new LogoutUsecase();

  const userPresenter =
    overrides.authUserPresenter ??
    overrides.userPresenter ??
    (container?.has('userPresenter') ? container.get('userPresenter') : new UserPresenter());

  const authController =
    overrides.authController ??
    new AuthController({ loginUsecase, logoutUsecase, userPresenter });

  container.set('loginUsecase', loginUsecase);
  container.set('logoutUsecase', logoutUsecase);
  container.set('authController', authController);
}
