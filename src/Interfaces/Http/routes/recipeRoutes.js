import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { recipes: recipeSchemas, common: commonSchemas } = validationSchemas;

export default function registerRecipeRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('RECIPE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewRecipes = requirePermission('view_menus', { requireAuth, authorize });
  const canCreateRecipes = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdateRecipes = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeleteRecipes = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewRecipes, adapt(controller.listRecipes.bind(controller)));
  router.post(
    '/',
    ...canCreateRecipes,
    validateRequest({ body: recipeSchemas.create }),
    adapt(controller.createRecipe.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewRecipes,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getRecipe.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateRecipes,
    validateRequest({ params: commonSchemas.idParam, body: recipeSchemas.update }),
    adapt(controller.updateRecipe.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteRecipes,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteRecipe.bind(controller)),
  );

  app.use('/api/recipes', router);
}

