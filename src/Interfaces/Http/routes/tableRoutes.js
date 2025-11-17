import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { tables: tableSchemas, common: commonSchemas } = validationSchemas;

export default function registerTableRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('TABLE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewTables = requirePermission('view_tables', { requireAuth, authorize });
  const canCreateTables = requirePermission('add_tables', { requireAuth, authorize });
  const canUpdateTables = requirePermission('edit_tables', { requireAuth, authorize });
  const canDeleteTables = requirePermission('delete_tables', { requireAuth, authorize });

  router.get('/', ...canViewTables, adapt(controller.listTables.bind(controller)));
  router.post(
    '/',
    ...canCreateTables,
    validateRequest({ body: tableSchemas.create }),
    adapt(controller.createTable.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewTables,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getTable.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateTables,
    validateRequest({ params: commonSchemas.idParam, body: tableSchemas.update }),
    adapt(controller.updateTable.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteTables,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteTable.bind(controller)),
  );

  app.use('/api/tables', router);
}

