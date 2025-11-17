import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { menuVariants: menuVariantSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuVariantRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('MENUVARIANT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewMenuVariants = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateMenuVariants = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateMenuVariants = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteMenuVariants = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewMenuVariants, adapt(controller.listMenuVariants.bind(controller)));
  router.post(
    '/',
    ...canCreateMenuVariants,
    validateRequest({ body: menuVariantSchemas.create }),
    adapt(controller.createMenuVariant.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewMenuVariants,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getMenuVariant.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateMenuVariants,
    validateRequest({ params: commonSchemas.idParam, body: menuVariantSchemas.update }),
    adapt(controller.updateMenuVariant.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteMenuVariants,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteMenuVariant.bind(controller)),
  );

  app.use('/api/menu-variants', router);
}

