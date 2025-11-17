import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { transactions: trxSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('TRANSACTION_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewTransactions = requirePermission('view_orders', { requireAuth, authorize });
  const canCreateTransactions = requirePermission('add_orders', { requireAuth, authorize });
  const canUpdateTransactions = requirePermission('edit_orders', { requireAuth, authorize });
  const canDeleteTransactions = requirePermission('delete_orders', { requireAuth, authorize });

  router.get('/', ...canViewTransactions, adapt(controller.listTransactions.bind(controller)));
  router.post(
    '/',
    ...canCreateTransactions,
    validateRequest({ body: trxSchemas.create }),
    adapt(controller.createTransaction.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewTransactions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getTransaction.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateTransactions,
    validateRequest({ params: commonSchemas.idParam, body: trxSchemas.update }),
    adapt(controller.updateTransaction.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteTransactions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteTransaction.bind(controller)),
  );
  app.use('/api/transactions', router);
}

