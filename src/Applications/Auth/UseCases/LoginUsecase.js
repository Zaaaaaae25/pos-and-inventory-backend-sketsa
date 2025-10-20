import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import LoginUser from '../../../Domains/Users/Entities/LoginUser.js';
import User from '../../../Domains/Users/Entities/User.js';
import { verifySecret } from '../../../Commons/Utils/HashPassword.js';
import { signToken as defaultSignToken } from '../../../Commons/Utils/JwtHelper.js';

export default class LoginUsecase {
  constructor({
    userService,
    tokenSigner = defaultSignToken,
    tokenExpiresIn = process.env.JWT_EXPIRES_IN ?? process.env.JWT_EXPIRATION ?? '1h',
  } = {}) {
    if (!userService) {
      throw new Error('LOGIN_USECASE.MISSING_USER_SERVICE');
    }

    if (typeof tokenSigner !== 'function') {
      throw new Error('LOGIN_USECASE.INVALID_TOKEN_SIGNER');
    }

    this.userService = userService;
    this.tokenSigner = tokenSigner;
    this.tokenExpiresIn = tokenExpiresIn ?? null;
  }

  async execute(payload = {}) {
    const loginUser = new LoginUser(payload);
    const normalizedUsername = User.normalizeEmail(loginUser.username);

    if (!normalizedUsername) {
      throw new ValidationError('LOGIN_USECASE.INVALID_USERNAME');
    }

    const record = await this.userService.findByEmail(normalizedUsername);

    if (!record) {
      throw new AppError('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }

    if (record.status && record.status !== 'active') {
      throw new AppError('User account is not active', HttpStatus.FORBIDDEN);
    }

    const hashedSecret = record.passwordHash ?? record.pinCodeHash ?? null;

    if (!hashedSecret) {
      throw new AppError('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }

    const isValidSecret = await verifySecret(loginUser.password, hashedSecret);

    if (!isValidSecret) {
      throw new AppError('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }

    const user = User.fromPersistence(record);

    const tokenPayload = {
      sub: user.id,
      name: user.name,
      role: user.role?.name ?? null,
      placeId: user.placeId,
    };

    const signOptions = {};

    if (this.tokenExpiresIn) {
      signOptions.expiresIn = this.tokenExpiresIn;
    }

    const token = this.tokenSigner(tokenPayload, signOptions);

    return {
      token,
      user,
    };
  }
}
