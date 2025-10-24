import PrismaPermissionRepository from '../Repositories/PrismaPermissionRepository.js';
import PermissionService from '../../Applications/Permissions/Services/PermissionService.js';
import {
  ListPermissionsUsecase,
  GetPermissionUsecase,
  CreatePermissionUsecase,
  UpdatePermissionUsecase,
  DeletePermissionUsecase,
} from '../../Applications/Permissions/UseCases/index.js';
import PermissionPresenter from '../../Interfaces/Presenters/PermissionPresenter.js';
import PermissionController from '../../Interfaces/Controllers/PermissionController.js';

export default function registerPermissionContainer({ container, overrides = {}, prisma }) {
  const permissionRepository =
    overrides.permissionRepository ?? new PrismaPermissionRepository({ prisma });
  const permissionService =
    overrides.permissionService ?? new PermissionService({ permissionRepository });

  const listPermissionsUsecase =
    overrides.listPermissionsUsecase ?? new ListPermissionsUsecase({ permissionService });
  const getPermissionUsecase =
    overrides.getPermissionUsecase ?? new GetPermissionUsecase({ permissionService });
  const createPermissionUsecase =
    overrides.createPermissionUsecase ?? new CreatePermissionUsecase({ permissionService });
  const updatePermissionUsecase =
    overrides.updatePermissionUsecase ?? new UpdatePermissionUsecase({ permissionService });
  const deletePermissionUsecase =
    overrides.deletePermissionUsecase ?? new DeletePermissionUsecase({ permissionService });

  const permissionPresenter = overrides.permissionPresenter ?? new PermissionPresenter();
  const permissionController =
    overrides.permissionController ??
    new PermissionController({
      permissionPresenter,
      listPermissionsUsecase,
      getPermissionUsecase,
      createPermissionUsecase,
      updatePermissionUsecase,
      deletePermissionUsecase,
    });

  container.set('permissionRepository', permissionRepository);
  container.set('permissionService', permissionService);
  container.set('listPermissionsUsecase', listPermissionsUsecase);
  container.set('getPermissionUsecase', getPermissionUsecase);
  container.set('createPermissionUsecase', createPermissionUsecase);
  container.set('updatePermissionUsecase', updatePermissionUsecase);
  container.set('deletePermissionUsecase', deletePermissionUsecase);
  container.set('permissionPresenter', permissionPresenter);
  container.set('permissionController', permissionController);
}

