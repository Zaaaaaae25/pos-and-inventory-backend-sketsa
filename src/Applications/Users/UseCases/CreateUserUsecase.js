import BaseUserUsecase from './BaseUserUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import { hashSecret } from '../../../Commons/Utils/HashPassword.js';
import User from '../../../Domains/Users/Entities/User.js';
import Role from '../../../Domains/Roles/Entities/Role.js';
import CashierUser from '../../../Domains/Users/Entities/CashierUser.js';
import ManagedUser from '../../../Domains/Users/Entities/ManagedUser.js';

export default class CreateUserUsecase extends BaseUserUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(payload = {}) {
    const { roleName } = payload;

    if (!payload.name || !roleName) {
      throw new ValidationError('Name and roleName are required');
    }

    const roleRecord = await this._findRole(roleName);
    const role = Role.fromPersistence(roleRecord);
    const isCashier = role.isCashier();

    const userEntity = isCashier ? new CashierUser(payload) : new ManagedUser(payload);

    if (isCashier) {
      if (payload.email || payload.password) {
        throw new ValidationError('Cashier accounts cannot have email or password');
      }

      this._validatePin(userEntity.pin);
    } else {
      await this._assertEmailAvailable(userEntity.email);
      this._validatePassword(userEntity.password);
    }

    const userData = {
      name: userEntity.name,
      status: userEntity.status,
      email: isCashier ? null : userEntity.email,
      passwordHash: isCashier ? null : await hashSecret(userEntity.password),
      pinCodeHash: isCashier ? await hashSecret(userEntity.pin) : null,
    };

    const placeId = await this._assertPlaceExists(userEntity.placeId);

    try {
      const created = await this.userService.createUser({
        userData,
        roleId: role.id,
        placeId,
      });

      return User.fromPersistence(created);
    } catch (error) {
      if (
        error?.code === 'P2003' &&
        error?.meta?.constraint === 'user_roles_place_id_fkey'
      ) {
        throw new ValidationError('Place not found');
      }

      throw error;
    }
  }
}
