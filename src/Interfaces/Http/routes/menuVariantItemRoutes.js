import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { menuVariantItems: mviSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuVariantItemRoutes(app, { controller }) {
  if (!controller) throw new Error('MENUVARIANTITEM_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listMenuVariantItems.bind(controller)));
  router.post('/', validateRequest({ body: mviSchemas.create }), adapt(controller.createMenuVariantItem.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getMenuVariantItem.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: mviSchemas.update }), adapt(controller.updateMenuVariantItem.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteMenuVariantItem.bind(controller)));

  app.use('/api/menu-variant-items', router);
}

