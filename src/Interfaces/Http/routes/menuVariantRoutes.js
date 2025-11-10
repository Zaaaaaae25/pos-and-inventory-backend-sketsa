import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { menuVariants: menuVariantSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuVariantRoutes(app, { controller }) {
  if (!controller) throw new Error('MENUVARIANT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listMenuVariants.bind(controller)));
  router.post('/', validateRequest({ body: menuVariantSchemas.create }), adapt(controller.createMenuVariant.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getMenuVariant.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: menuVariantSchemas.update }), adapt(controller.updateMenuVariant.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteMenuVariant.bind(controller)));

  app.use('/api/menu-variants', router);
}

