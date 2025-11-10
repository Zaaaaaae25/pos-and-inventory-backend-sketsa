import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { systemLogs: slSchemas, common: commonSchemas } = validationSchemas;

export default function registerSystemLogRoutes(app, { controller }) {
  if (!controller) throw new Error('SYSTEMLOG_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listSystemLogs.bind(controller)));
  router.post('/', validateRequest({ body: slSchemas.create }), adapt(controller.createSystemLog.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getSystemLog.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteSystemLog.bind(controller)));

  app.use('/api/system-logs', router);
}

