import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { menus: menuSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('MENU_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewMenus = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateMenus = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateMenus = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteMenus = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewMenus, adapt(controller.listMenus.bind(controller)));
  router.post(
    '/',
    ...canCreateMenus,
    validateRequest({ body: menuSchemas.create }),
    adapt(controller.createMenu.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewMenus,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getMenu.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateMenus,
    validateRequest({ params: commonSchemas.idParam, body: menuSchemas.update }),
    adapt(controller.updateMenu.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteMenus,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteMenu.bind(controller)),
  );

  app.use('/api/menus', router);
}

