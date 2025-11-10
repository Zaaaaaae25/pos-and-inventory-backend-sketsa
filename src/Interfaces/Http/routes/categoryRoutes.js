import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { categories: categorySchemas, common: commonSchemas } = validationSchemas;

export default function registerCategoryRoutes(app, { controller }) {
  if (!controller) throw new Error('CATEGORY_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listCategories.bind(controller)));
  router.post('/', validateRequest({ body: categorySchemas.create }), adapt(controller.createCategory.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getCategory.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: categorySchemas.update }), adapt(controller.updateCategory.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteCategory.bind(controller)));

  app.use('/api/categories', router);
}

