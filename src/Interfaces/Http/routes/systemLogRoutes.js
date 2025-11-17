import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { systemLogs: slSchemas, common: commonSchemas } = validationSchemas;

export default function registerSystemLogRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('SYSTEMLOG_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewSystemLogs = requirePermission('view_reports', { requireAuth, authorize });
  const canCreateSystemLogs = requirePermission('add_reports', { requireAuth, authorize });
  const canDeleteSystemLogs = requirePermission('delete_reports', { requireAuth, authorize });

  router.get('/', ...canViewSystemLogs, adapt(controller.listSystemLogs.bind(controller)));
  router.post(
    '/',
    ...canCreateSystemLogs,
    validateRequest({ body: slSchemas.create }),
    adapt(controller.createSystemLog.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewSystemLogs,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getSystemLog.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteSystemLogs,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteSystemLog.bind(controller)),
  );

  app.use('/api/system-logs', router);
}

