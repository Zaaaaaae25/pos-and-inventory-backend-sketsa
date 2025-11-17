import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { menuPrices: menuPriceSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuPriceRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('MENUPRICE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewMenuPrices = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateMenuPrices = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateMenuPrices = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteMenuPrices = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewMenuPrices, adapt(controller.listMenuPrices.bind(controller)));
  router.post(
    '/',
    ...canCreateMenuPrices,
    validateRequest({ body: menuPriceSchemas.create }),
    adapt(controller.createMenuPrice.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewMenuPrices,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getMenuPrice.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateMenuPrices,
    validateRequest({ params: commonSchemas.idParam, body: menuPriceSchemas.update }),
    adapt(controller.updateMenuPrice.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteMenuPrices,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteMenuPrice.bind(controller)),
  );

  app.use('/api/menu-prices', router);
}

