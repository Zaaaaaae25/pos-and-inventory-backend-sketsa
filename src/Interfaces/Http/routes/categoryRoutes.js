import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { categories: categorySchemas, common: commonSchemas } = validationSchemas;

export default function registerCategoryRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('CATEGORY_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewCategories = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateCategories = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateCategories = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteCategories = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewCategories, adapt(controller.listCategories.bind(controller)));
  router.post(
    '/',
    ...canCreateCategories,
    validateRequest({ body: categorySchemas.create }),
    adapt(controller.createCategory.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewCategories,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getCategory.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateCategories,
    validateRequest({ params: commonSchemas.idParam, body: categorySchemas.update }),
    adapt(controller.updateCategory.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteCategories,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteCategory.bind(controller)),
  );

  app.use('/api/categories', router);
}

