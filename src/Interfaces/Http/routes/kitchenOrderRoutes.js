import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { kitchenOrders: koSchemas, common: commonSchemas } = validationSchemas;

export default function registerKitchenOrderRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('KITCHEN_ORDER_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewKitchenOrders = requirePermission('view_kitchen_operations', {
    requireAuth,
    authorize,
  });
  const canCreateKitchenOrders = requirePermission('add_kitchen_operations', {
    requireAuth,
    authorize,
  });
  const canUpdateKitchenOrders = requirePermission('edit_kitchen_operations', {
    requireAuth,
    authorize,
  });
  const canDeleteKitchenOrders = requirePermission('delete_kitchen_operations', {
    requireAuth,
    authorize,
  });

  router.get('/', ...canViewKitchenOrders, adapt(controller.listKitchenOrders.bind(controller)));
  router.post(
    '/',
    ...canCreateKitchenOrders,
    validateRequest({ body: koSchemas.create }),
    adapt(controller.createKitchenOrder.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewKitchenOrders,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getKitchenOrder.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateKitchenOrders,
    validateRequest({ params: commonSchemas.idParam, body: koSchemas.update }),
    adapt(controller.updateKitchenOrder.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteKitchenOrders,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteKitchenOrder.bind(controller)),
  );
  app.use('/api/kitchen-orders', router);
}

