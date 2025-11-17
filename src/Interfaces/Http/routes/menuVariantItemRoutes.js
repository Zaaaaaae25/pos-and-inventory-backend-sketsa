import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { menuVariantItems: mviSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuVariantItemRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('MENUVARIANTITEM_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewMenuVariantItems = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateMenuVariantItems = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateMenuVariantItems = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteMenuVariantItems = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewMenuVariantItems, adapt(controller.listMenuVariantItems.bind(controller)));
  router.post(
    '/',
    ...canCreateMenuVariantItems,
    validateRequest({ body: mviSchemas.create }),
    adapt(controller.createMenuVariantItem.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewMenuVariantItems,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getMenuVariantItem.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateMenuVariantItems,
    validateRequest({ params: commonSchemas.idParam, body: mviSchemas.update }),
    adapt(controller.updateMenuVariantItem.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteMenuVariantItems,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteMenuVariantItem.bind(controller)),
  );

  app.use('/api/menu-variant-items', router);
}

