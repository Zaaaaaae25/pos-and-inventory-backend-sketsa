import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { tables: tableSchemas, common: commonSchemas } = validationSchemas;

export default function registerTableRoutes(app, { controller }) {
  if (!controller) throw new Error('TABLE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listTables.bind(controller)));
  router.post('/', validateRequest({ body: tableSchemas.create }), adapt(controller.createTable.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getTable.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: tableSchemas.update }), adapt(controller.updateTable.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteTable.bind(controller)));

  app.use('/api/tables', router);
}

