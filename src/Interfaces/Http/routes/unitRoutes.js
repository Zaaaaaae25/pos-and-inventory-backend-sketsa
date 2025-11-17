import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { units: unitSchemas, common: commonSchemas } = validationSchemas;

export default function registerUnitRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('UNIT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewUnits = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateUnits = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdateUnits = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeleteUnits = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewUnits, adapt(controller.listUnits.bind(controller)));
  router.post(
    '/',
    ...canCreateUnits,
    validateRequest({ body: unitSchemas.create }),
    adapt(controller.createUnit.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewUnits,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getUnit.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateUnits,
    validateRequest({ params: commonSchemas.idParam, body: unitSchemas.update }),
    adapt(controller.updateUnit.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteUnits,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteUnit.bind(controller)),
  );

  app.use('/api/units', router);
}

