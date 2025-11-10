import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { reportFiles: rfSchemas, common: commonSchemas } = validationSchemas;

export default function registerReportFileRoutes(app, { controller }) {
  if (!controller) throw new Error('REPORTFILE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listReportFiles.bind(controller)));
  router.post('/', validateRequest({ body: rfSchemas.create }), adapt(controller.createReportFile.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getReportFile.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: rfSchemas.update }), adapt(controller.updateReportFile.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteReportFile.bind(controller)));

  app.use('/api/report-files', router);
}

