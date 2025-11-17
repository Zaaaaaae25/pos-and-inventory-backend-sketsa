import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { wastes: wSchemas, common: commonSchemas } = validationSchemas;

export default function registerWasteRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('WASTE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewWastes = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreateWastes = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdateWastes = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeleteWastes = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewWastes, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreateWastes,
    validateRequest({ body: wSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewWastes,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateWastes,
    validateRequest({ params: commonSchemas.idParam, body: wSchemas.update }),
    adapt(controller.update.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteWastes,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );

  app.use('/api/wastes', router);
}

