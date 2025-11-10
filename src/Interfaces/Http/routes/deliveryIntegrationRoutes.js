import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { deliveryIntegrations: diSchemas, common: commonSchemas } = validationSchemas;

export default function registerDeliveryIntegrationRoutes(app, { controller }) {
  if (!controller) throw new Error('DELIVERYINTEGRATION_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listDeliveryIntegrations.bind(controller)));
  router.post('/', validateRequest({ body: diSchemas.create }), adapt(controller.createDeliveryIntegration.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getDeliveryIntegration.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: diSchemas.update }), adapt(controller.updateDeliveryIntegration.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteDeliveryIntegration.bind(controller)));

  app.use('/api/delivery-integrations', router);
}

