import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { paymentMethods: pmSchemas, common: commonSchemas } = validationSchemas;

export default function registerPaymentMethodRoutes(app, { controller }) {
  if (!controller) throw new Error('PAYMENTMETHOD_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listPaymentMethods.bind(controller)));
  router.post('/', validateRequest({ body: pmSchemas.create }), adapt(controller.createPaymentMethod.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getPaymentMethod.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: pmSchemas.update }), adapt(controller.updatePaymentMethod.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deletePaymentMethod.bind(controller)));

  app.use('/api/payment-methods', router);
}

