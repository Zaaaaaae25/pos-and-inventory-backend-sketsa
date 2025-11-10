import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { inventoryStockDaily: isdSchemas, common: commonSchemas } = validationSchemas;

export default function registerInventoryStockDailyRoutes(app, { controller }) {
  if (!controller) throw new Error('INVENTORY_STOCK_DAILY_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.list.bind(controller)));
  router.post('/', validateRequest({ body: isdSchemas.create }), adapt(controller.create.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.get.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: isdSchemas.update }), adapt(controller.update.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.delete.bind(controller)));

  app.use('/api/inventory-stock-daily', router);
}

