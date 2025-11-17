import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { transactionItemVariants: tivSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionItemVariantRoutes(app, {
  controller,
  requireAuth,
  authorize,
} = {}) {
  if (!controller) throw new Error('TRANSACTION_ITEM_VARIANT_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewTransactionItemVariants = requirePermission('view_orders', { requireAuth, authorize });
  const canCreateTransactionItemVariants = requirePermission('add_orders', { requireAuth, authorize });
  const canDeleteTransactionItemVariants = requirePermission('delete_orders', { requireAuth, authorize });

  router.get('/', ...canViewTransactionItemVariants, adapt(controller.listTransactionItemVariants.bind(controller)));
  router.post(
    '/',
    ...canCreateTransactionItemVariants,
    validateRequest({ body: tivSchemas.create }),
    adapt(controller.createTransactionItemVariant.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewTransactionItemVariants,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getTransactionItemVariant.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteTransactionItemVariants,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteTransactionItemVariant.bind(controller)),
  );
  app.use('/api/transaction-item-variants', router);
}

