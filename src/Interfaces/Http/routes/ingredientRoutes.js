import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { ingredients: ingredientSchemas, common: commonSchemas } = validationSchemas;

export default function registerIngredientRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('INGREDIENT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewIngredients = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateIngredients = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdateIngredients = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeleteIngredients = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewIngredients, adapt(controller.listIngredients.bind(controller)));
  router.post(
    '/',
    ...canCreateIngredients,
    validateRequest({ body: ingredientSchemas.create }),
    adapt(controller.createIngredient.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewIngredients,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getIngredient.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateIngredients,
    validateRequest({ params: commonSchemas.idParam, body: ingredientSchemas.update }),
    adapt(controller.updateIngredient.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteIngredients,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteIngredient.bind(controller)),
  );

  app.use('/api/ingredients', router);
}

