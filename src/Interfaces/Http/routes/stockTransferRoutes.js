import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { stockTransfers: stSchemas, common: commonSchemas } = validationSchemas;

export default function registerStockTransferRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('STOCK_TRANSFER_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewStockTransfers = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateStockTransfers = requirePermission('add_inventory', { requireAuth, authorize });
  const canDeleteStockTransfers = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewStockTransfers, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreateStockTransfers,
    validateRequest({ body: stSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewStockTransfers,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteStockTransfers,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );

  app.use('/api/stock-transfers', router);
}

