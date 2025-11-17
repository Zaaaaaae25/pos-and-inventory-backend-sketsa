import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { reportFiles: rfSchemas, common: commonSchemas } = validationSchemas;

export default function registerReportFileRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('REPORTFILE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewReportFiles = requirePermission('view_reports', { requireAuth, authorize });
  const canCreateReportFiles = requirePermission('add_reports', { requireAuth, authorize });
  const canUpdateReportFiles = requirePermission('edit_reports', { requireAuth, authorize });
  const canDeleteReportFiles = requirePermission('delete_reports', { requireAuth, authorize });

  router.get('/', ...canViewReportFiles, adapt(controller.listReportFiles.bind(controller)));
  router.post(
    '/',
    ...canCreateReportFiles,
    validateRequest({ body: rfSchemas.create }),
    adapt(controller.createReportFile.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewReportFiles,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getReportFile.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateReportFiles,
    validateRequest({ params: commonSchemas.idParam, body: rfSchemas.update }),
    adapt(controller.updateReportFile.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteReportFiles,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteReportFile.bind(controller)),
  );

  app.use('/api/report-files', router);
}

