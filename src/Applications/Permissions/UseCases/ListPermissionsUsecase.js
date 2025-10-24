import BasePermissionUsecase from './BasePermissionUsecase.js';

export default class ListPermissionsUsecase extends BasePermissionUsecase {
  async execute() {
    return this.permissionService.listPermissions();
  }
}

