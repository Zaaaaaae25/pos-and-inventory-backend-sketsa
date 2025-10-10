import PrismaRoleRepository from '../Repositories/PrismaRoleRepository.js';
import RoleService from '../../Applications/Roles/Services/RoleService.js';
import {
  ListRolesUsecase,
  GetRoleUsecase,
  CreateRoleUsecase,
  UpdateRoleUsecase,
  DeleteRoleUsecase,
} from '../../Applications/Roles/UseCases/index.js';
import RolePresenter from '../../Interfaces/Presenters/RolePresenter.js';
import RoleController from '../../Interfaces/Controllers/RoleController.js';

export default function registerRoleContainer({ container, overrides = {}, prisma }) {
  const roleRepository =
    overrides.roleRepository ?? new PrismaRoleRepository({ prisma });

  const roleService = overrides.roleService ?? new RoleService({ roleRepository });

  const listRolesUsecase = overrides.listRolesUsecase ?? new ListRolesUsecase({ roleService });
  const getRoleUsecase = overrides.getRoleUsecase ?? new GetRoleUsecase({ roleService });
  const createRoleUsecase =
    overrides.createRoleUsecase ?? new CreateRoleUsecase({ roleService });
  const updateRoleUsecase =
    overrides.updateRoleUsecase ?? new UpdateRoleUsecase({ roleService });
  const deleteRoleUsecase =
    overrides.deleteRoleUsecase ?? new DeleteRoleUsecase({ roleService });

  const rolePresenter = overrides.rolePresenter ?? new RolePresenter();
  const roleController =
    overrides.roleController ??
    new RoleController({
      rolePresenter,
      listRolesUsecase,
      getRoleUsecase,
      createRoleUsecase,
      updateRoleUsecase,
      deleteRoleUsecase,
    });

  container.set('roleRepository', roleRepository);
  container.set('roleService', roleService);
  container.set('listRolesUsecase', listRolesUsecase);
  container.set('getRoleUsecase', getRoleUsecase);
  container.set('createRoleUsecase', createRoleUsecase);
  container.set('updateRoleUsecase', updateRoleUsecase);
  container.set('deleteRoleUsecase', deleteRoleUsecase);
  container.set('rolePresenter', rolePresenter);
  container.set('roleController', roleController);
}
