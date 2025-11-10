import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { activityLogs: alSchemas, common: commonSchemas } = validationSchemas;

export default function registerActivityLogRoutes(app, { controller }) {
  if (!controller) throw new Error('ACTIVITYLOG_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listActivityLogs.bind(controller)));
  router.post('/', validateRequest({ body: alSchemas.create }), adapt(controller.createActivityLog.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getActivityLog.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteActivityLog.bind(controller)));

  app.use('/api/activity-logs', router);
}

