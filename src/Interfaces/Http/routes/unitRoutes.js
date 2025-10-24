import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { units: unitSchemas, common: commonSchemas } = validationSchemas;

export default function registerUnitRoutes(app, { controller }) {
  if (!controller) throw new Error('UNIT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listUnits.bind(controller)));
  router.post('/', validateRequest({ body: unitSchemas.create }), adapt(controller.createUnit.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getUnit.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: unitSchemas.update }), adapt(controller.updateUnit.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteUnit.bind(controller)));

  app.use('/api/units', router);
}

