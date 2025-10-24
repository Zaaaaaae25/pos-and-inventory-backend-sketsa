import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { ingredientPackages: ipSchemas, common: commonSchemas } = validationSchemas;

export default function registerIngredientPackageRoutes(app, { controller }) {
  if (!controller) throw new Error('INGREDIENT_PACKAGE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listIngredientPackages.bind(controller)));
  router.post('/', validateRequest({ body: ipSchemas.create }), adapt(controller.createIngredientPackage.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getIngredientPackage.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: ipSchemas.update }), adapt(controller.updateIngredientPackage.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteIngredientPackage.bind(controller)));

  app.use('/api/ingredient-packages', router);
}

