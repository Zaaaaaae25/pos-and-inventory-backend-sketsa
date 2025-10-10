import BaseUserUsecase from './BaseUserUsecase.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import { hashSecret } from '../../../Commons/Utils/HashPassword.js';
import User from '../../../Domains/Users/Entities/User.js';
import Role from '../../../Domains/Users/Entities/Role.js';

export default class UpdateUserUsecase extends BaseUserUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(id, payload = {}) {
    if (Number.isNaN(Number(id))) {
      throw new ValidationError('Invalid user id');
    }

    const record = await this.userService.getUser(Number(id));
    if (!record) {
      throw new AppError('User not found', HttpStatus.NOT_FOUND);
    }

    const existingUser = User.fromPersistence(record);
    const requestedRoleName = payload.roleName || existingUser.role?.name;
    const roleRecord = await this._findRole(requestedRoleName);
    const role = Role.fromPersistence(roleRecord);
    const isCashier = role.isCashier();
    const wasCashier = existingUser.role ? existingUser.role.isCashier() : false;

    const userData = {};

    if (payload.name) {
      userData.name = payload.name.trim();
    }

    if (payload.status) {
      userData.status = payload.status;
    }

    if (isCashier) {
      if (payload.email || payload.password) {
        throw new ValidationError('Cashier accounts cannot have email or password');
      }

      if (payload.pin) {
        this._validatePin(payload.pin);
        userData.pinCodeHash = await hashSecret(payload.pin);
      } else if (existingUser.authenticationMethod !== 'pin') {
        throw new ValidationError('Cashier accounts require a PIN');
      }

      userData.email = null;
      userData.passwordHash = null;
    } else {
      if (payload.pin) {
        throw new ValidationError('Non-cashier accounts must not define PIN codes');
      }

      const normalizedEmail = User.normalizeEmail(payload.email) || existingUser.email;
      if (!normalizedEmail) {
        throw new ValidationError('Email is required for non-cashier roles');
      }

      if (normalizedEmail !== existingUser.email) {
        await this._assertEmailAvailable(normalizedEmail, existingUser.id);
      }

      userData.email = normalizedEmail;

      if (payload.password) {
        this._validatePassword(payload.password);
        userData.passwordHash = await hashSecret(payload.password);
      } else if (existingUser.authenticationMethod === 'pin') {
        const message = wasCashier
          ? 'Password is required when moving a cashier to a non-cashier role'
          : 'Password is required for non-cashier roles';
        throw new ValidationError(message);
      }

      userData.pinCodeHash = null;
    }

    const requestedOutletId =
      payload.outletId !== undefined ? payload.outletId : existingUser.outletId;
    const outletId = await this._assertOutletExists(requestedOutletId ?? null);

    try {
      const updated = await this.userService.updateUser({
        id: existingUser.id,
        userData,
        roleId: role.id,
        outletId,
      });

      return User.fromPersistence(updated);
    } catch (error) {
      if (
        error?.code === 'P2003' &&
        error?.meta?.constraint === 'user_roles_outlet_id_fkey'
      ) {
        throw new ValidationError('Outlet not found');
      }

      throw error;
    }
  }
}
