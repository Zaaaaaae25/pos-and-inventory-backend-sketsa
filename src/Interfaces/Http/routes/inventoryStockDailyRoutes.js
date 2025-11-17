import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { inventoryStockDaily: isdSchemas, common: commonSchemas } = validationSchemas;

export default function registerInventoryStockDailyRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('INVENTORY_STOCK_DAILY_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewInventoryStock = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateInventoryStock = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdateInventoryStock = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeleteInventoryStock = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewInventoryStock, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreateInventoryStock,
    validateRequest({ body: isdSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewInventoryStock,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateInventoryStock,
    validateRequest({ params: commonSchemas.idParam, body: isdSchemas.update }),
    adapt(controller.update.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteInventoryStock,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );

  app.use('/api/inventory-stock-daily', router);
}

