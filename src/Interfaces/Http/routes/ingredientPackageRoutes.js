import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { ingredientPackages: ipSchemas, common: commonSchemas } = validationSchemas;

export default function registerIngredientPackageRoutes(app, {
  controller,
  requireAuth,
  authorize,
} = {}) {
  if (!controller) throw new Error('INGREDIENT_PACKAGE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewIngredientPackages = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateIngredientPackages = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdateIngredientPackages = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeleteIngredientPackages = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewIngredientPackages, adapt(controller.listIngredientPackages.bind(controller)));
  router.post(
    '/',
    ...canCreateIngredientPackages,
    validateRequest({ body: ipSchemas.create }),
    adapt(controller.createIngredientPackage.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewIngredientPackages,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getIngredientPackage.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateIngredientPackages,
    validateRequest({ params: commonSchemas.idParam, body: ipSchemas.update }),
    adapt(controller.updateIngredientPackage.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteIngredientPackages,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteIngredientPackage.bind(controller)),
  );

  app.use('/api/ingredient-packages', router);
}

