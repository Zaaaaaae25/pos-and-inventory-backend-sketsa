import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { transactionItemVariants: tivSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionItemVariantRoutes(app, { controller }) {
  if (!controller) throw new Error('TRANSACTION_ITEM_VARIANT_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  router.get('/', adapt(controller.listTransactionItemVariants.bind(controller)));
  router.post('/', validateRequest({ body: tivSchemas.create }), adapt(controller.createTransactionItemVariant.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getTransactionItemVariant.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteTransactionItemVariant.bind(controller)));
  app.use('/api/transaction-item-variants', router);
}

