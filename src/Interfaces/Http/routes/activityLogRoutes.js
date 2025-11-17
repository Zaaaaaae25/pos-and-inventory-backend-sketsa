import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { activityLogs: alSchemas, common: commonSchemas } = validationSchemas;

export default function registerActivityLogRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('ACTIVITYLOG_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewActivityLogs = requirePermission('view_reports', { requireAuth, authorize });
  const canCreateActivityLogs = requirePermission('add_reports', { requireAuth, authorize });
  const canDeleteActivityLogs = requirePermission('delete_reports', { requireAuth, authorize });

  router.get('/', ...canViewActivityLogs, adapt(controller.listActivityLogs.bind(controller)));
  router.post(
    '/',
    ...canCreateActivityLogs,
    validateRequest({ body: alSchemas.create }),
    adapt(controller.createActivityLog.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewActivityLogs,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getActivityLog.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteActivityLogs,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteActivityLog.bind(controller)),
  );

  app.use('/api/activity-logs', router);
}

