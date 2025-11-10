import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { menuPrices: menuPriceSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuPriceRoutes(app, { controller }) {
  if (!controller) throw new Error('MENUPRICE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listMenuPrices.bind(controller)));
  router.post('/', validateRequest({ body: menuPriceSchemas.create }), adapt(controller.createMenuPrice.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getMenuPrice.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: menuPriceSchemas.update }), adapt(controller.updateMenuPrice.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteMenuPrice.bind(controller)));

  app.use('/api/menu-prices', router);
}

