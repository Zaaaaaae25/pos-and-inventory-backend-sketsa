import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class RoleController {
  constructor({
    rolePresenter,
    listRolesUsecase,
    getRoleUsecase,
    createRoleUsecase,
    updateRoleUsecase,
    deleteRoleUsecase,
  }) {
    if (!rolePresenter) {
      throw new Error('RoleController requires a presenter');
    }

    const requiredUsecases = [
      ['listRolesUsecase', listRolesUsecase],
      ['getRoleUsecase', getRoleUsecase],
      ['createRoleUsecase', createRoleUsecase],
      ['updateRoleUsecase', updateRoleUsecase],
      ['deleteRoleUsecase', deleteRoleUsecase],
    ];

    const missing = requiredUsecases.find(([, usecase]) => !usecase);
    if (missing) {
      throw new Error(`RoleController requires ${missing[0]}`);
    }

    this.rolePresenter = rolePresenter;
    this.listRolesUsecase = listRolesUsecase;
    this.getRoleUsecase = getRoleUsecase;
    this.createRoleUsecase = createRoleUsecase;
    this.updateRoleUsecase = updateRoleUsecase;
    this.deleteRoleUsecase = deleteRoleUsecase;
  }

  async listRoles() {
    const roles = await this.listRolesUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.rolePresenter.presentCollection(roles),
    };
  }

  async getRole({ params }) {
    const role = await this.getRoleUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.rolePresenter.present(role),
    };
  }

  async createRole({ body }) {
    const role = await this.createRoleUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      data: this.rolePresenter.present(role),
    };
  }

  async updateRole({ params, body }) {
    const role = await this.updateRoleUsecase.execute(params.id, body);
    return {
      status: HttpStatus.OK,
      data: this.rolePresenter.present(role),
    };
  }

  async deleteRole({ params }) {
    await this.deleteRoleUsecase.execute(params.id);
    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
