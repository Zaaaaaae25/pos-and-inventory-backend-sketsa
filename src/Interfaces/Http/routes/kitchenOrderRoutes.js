import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { kitchenOrders: koSchemas, common: commonSchemas } = validationSchemas;

export default function registerKitchenOrderRoutes(app, { controller }) {
  if (!controller) throw new Error('KITCHEN_ORDER_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  router.get('/', adapt(controller.listKitchenOrders.bind(controller)));
  router.post('/', validateRequest({ body: koSchemas.create }), adapt(controller.createKitchenOrder.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getKitchenOrder.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: koSchemas.update }), adapt(controller.updateKitchenOrder.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteKitchenOrder.bind(controller)));
  app.use('/api/kitchen-orders', router);
}

