import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { transactionItems: tiSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionItemRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('TRANSACTION_ITEM_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewTransactionItems = requirePermission('view_orders', { requireAuth, authorize });
  const canCreateTransactionItems = requirePermission('add_orders', { requireAuth, authorize });
  const canUpdateTransactionItems = requirePermission('edit_orders', { requireAuth, authorize });
  const canDeleteTransactionItems = requirePermission('delete_orders', { requireAuth, authorize });

  router.get('/', ...canViewTransactionItems, adapt(controller.listTransactionItems.bind(controller)));
  router.post(
    '/',
    ...canCreateTransactionItems,
    validateRequest({ body: tiSchemas.create }),
    adapt(controller.createTransactionItem.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewTransactionItems,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getTransactionItem.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateTransactionItems,
    validateRequest({ params: commonSchemas.idParam, body: tiSchemas.update }),
    adapt(controller.updateTransactionItem.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteTransactionItems,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteTransactionItem.bind(controller)),
  );
  app.use('/api/transaction-items', router);
}

