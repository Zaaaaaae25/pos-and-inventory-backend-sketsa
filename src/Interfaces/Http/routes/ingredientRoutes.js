import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { ingredients: ingredientSchemas, common: commonSchemas } = validationSchemas;

export default function registerIngredientRoutes(app, { controller }) {
  if (!controller) throw new Error('INGREDIENT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listIngredients.bind(controller)));
  router.post('/', validateRequest({ body: ingredientSchemas.create }), adapt(controller.createIngredient.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getIngredient.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: ingredientSchemas.update }), adapt(controller.updateIngredient.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteIngredient.bind(controller)));

  app.use('/api/ingredients', router);
}

