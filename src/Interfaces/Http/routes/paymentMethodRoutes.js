import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { paymentMethods: pmSchemas, common: commonSchemas } = validationSchemas;

export default function registerPaymentMethodRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('PAYMENTMETHOD_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewPaymentMethods = requirePermission('view_payments', { requireAuth, authorize });
  const canCreatePaymentMethods = requirePermission('add_payments', { requireAuth, authorize });
  const canUpdatePaymentMethods = requirePermission('edit_payments', { requireAuth, authorize });
  const canDeletePaymentMethods = requirePermission('delete_payments', { requireAuth, authorize });

  router.get('/', ...canViewPaymentMethods, adapt(controller.listPaymentMethods.bind(controller)));
  router.post(
    '/',
    ...canCreatePaymentMethods,
    validateRequest({ body: pmSchemas.create }),
    adapt(controller.createPaymentMethod.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPaymentMethods,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPaymentMethod.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePaymentMethods,
    validateRequest({ params: commonSchemas.idParam, body: pmSchemas.update }),
    adapt(controller.updatePaymentMethod.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePaymentMethods,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePaymentMethod.bind(controller)),
  );

  app.use('/api/payment-methods', router);
}

