import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { users: userSchemas, common: commonSchemas } = validationSchemas;

export default function registerUserRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) {
    throw new Error('USER_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();
  const canViewUsers = requirePermission('view_staff', { requireAuth, authorize });
  const canCreateUsers = requirePermission('add_staff', { requireAuth, authorize });
  const canUpdateUsers = requirePermission('edit_staff', { requireAuth, authorize });

  router.get('/', ...canViewUsers, adapt(controller.listUsers.bind(controller)));
  router.post(
    '/',
    ...canCreateUsers,
    validateRequest({ body: userSchemas.create }),
    adapt(controller.createUser.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewUsers,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getUser.bind(controller)),
  );
  router.patch(
    '/:id',
    ...canUpdateUsers,
    validateRequest({
      params: commonSchemas.idParam,
      body: userSchemas.update,
    }),
    adapt(controller.updateUser.bind(controller)),
  );

  app.use('/api/users', router);
}
