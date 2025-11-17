import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { roles: roleSchemas, common: commonSchemas } = validationSchemas;

export default function registerRoleRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) {
    throw new Error('ROLE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();
  const canViewRoles = requirePermission('view_roles', { requireAuth, authorize });
  const canCreateRoles = requirePermission('add_roles', { requireAuth, authorize });
  const canUpdateRoles = requirePermission('edit_roles', { requireAuth, authorize });
  const canDeleteRoles = requirePermission('delete_roles', { requireAuth, authorize });

  router.get('/', ...canViewRoles, adapt(controller.listRoles.bind(controller)));
  router.post(
    '/',
    ...canCreateRoles,
    validateRequest({ body: roleSchemas.create }),
    adapt(controller.createRole.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewRoles,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getRole.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateRoles,
    validateRequest({
      params: commonSchemas.idParam,
      body: roleSchemas.update,
    }),
    adapt(controller.updateRole.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteRoles,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteRole.bind(controller)),
  );

  app.use('/api/roles', router);
}
