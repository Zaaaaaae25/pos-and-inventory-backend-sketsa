import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PermissionController {
  constructor({
    permissionPresenter,
    listPermissionsUsecase,
    getPermissionUsecase,
    createPermissionUsecase,
    updatePermissionUsecase,
    deletePermissionUsecase,
  }) {
    if (!permissionPresenter) {
      throw new Error('PermissionController requires a presenter');
    }

    const deps = [
      ['listPermissionsUsecase', listPermissionsUsecase],
      ['getPermissionUsecase', getPermissionUsecase],
      ['createPermissionUsecase', createPermissionUsecase],
      ['updatePermissionUsecase', updatePermissionUsecase],
      ['deletePermissionUsecase', deletePermissionUsecase],
    ];
    const missing = deps.find(([, v]) => !v);
    if (missing) throw new Error(`PermissionController requires ${missing[0]}`);

    this.permissionPresenter = permissionPresenter;
    this.listPermissionsUsecase = listPermissionsUsecase;
    this.getPermissionUsecase = getPermissionUsecase;
    this.createPermissionUsecase = createPermissionUsecase;
    this.updatePermissionUsecase = updatePermissionUsecase;
    this.deletePermissionUsecase = deletePermissionUsecase;
  }

  async listPermissions() {
    const records = await this.listPermissionsUsecase.execute();
    return { status: HttpStatus.OK, data: this.permissionPresenter.presentCollection(records) };
  }

  async getPermission({ params }) {
    const record = await this.getPermissionUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.permissionPresenter.present(record) };
  }

  async createPermission({ body }) {
    const record = await this.createPermissionUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.permissionPresenter.present(record) };
  }

  async updatePermission({ params, body }) {
    const record = await this.updatePermissionUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.permissionPresenter.present(record) };
  }

  async deletePermission({ params }) {
    await this.deletePermissionUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

