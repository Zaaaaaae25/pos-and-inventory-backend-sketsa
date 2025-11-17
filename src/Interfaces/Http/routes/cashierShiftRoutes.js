import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { cashierShifts: csSchemas, common: commonSchemas } = validationSchemas;

export default function registerCashierShiftRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('CASHIER_SHIFT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewCashierShifts = requirePermission('view_payments', { requireAuth, authorize });
  const canCreateCashierShifts = requirePermission('add_payments', { requireAuth, authorize });
  const canUpdateCashierShifts = requirePermission('edit_payments', { requireAuth, authorize });
  const canDeleteCashierShifts = requirePermission('delete_payments', { requireAuth, authorize });

  router.get('/', ...canViewCashierShifts, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreateCashierShifts,
    validateRequest({ body: csSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewCashierShifts,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateCashierShifts,
    validateRequest({ params: commonSchemas.idParam, body: csSchemas.update }),
    adapt(controller.update.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteCashierShifts,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );

  app.use('/api/cashier-shifts', router);
}

