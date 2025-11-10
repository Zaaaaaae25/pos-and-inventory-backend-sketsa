import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { recipes: recipeSchemas, common: commonSchemas } = validationSchemas;

export default function registerRecipeRoutes(app, { controller }) {
  if (!controller) throw new Error('RECIPE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listRecipes.bind(controller)));
  router.post('/', validateRequest({ body: recipeSchemas.create }), adapt(controller.createRecipe.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getRecipe.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: recipeSchemas.update }), adapt(controller.updateRecipe.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteRecipe.bind(controller)));

  app.use('/api/recipes', router);
}

