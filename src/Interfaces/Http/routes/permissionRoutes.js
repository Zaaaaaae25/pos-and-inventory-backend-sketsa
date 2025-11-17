import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { permissions: permissionSchemas, common: commonSchemas } = validationSchemas;

export default function registerPermissionRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) {
    throw new Error('PERMISSION_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();
  const canViewPermissions = requirePermission('view_permissions', { requireAuth, authorize });
  const canCreatePermissions = requirePermission('add_permissions', {
    requireAuth,
    authorize,
  });
  const canUpdatePermissions = requirePermission('edit_permissions', { requireAuth, authorize });
  const canDeletePermissions = requirePermission('delete_permissions', {
    requireAuth,
    authorize,
  });

  router.get('/', ...canViewPermissions, adapt(controller.listPermissions.bind(controller)));
  router.post(
    '/',
    ...canCreatePermissions,
    validateRequest({ body: permissionSchemas.create }),
    adapt(controller.createPermission.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPermissions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPermission.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePermissions,
    validateRequest({ params: commonSchemas.idParam, body: permissionSchemas.update }),
    adapt(controller.updatePermission.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePermissions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePermission.bind(controller)),
  );

  app.use('/api/permissions', router);
}

