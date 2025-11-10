import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { transactionItems: tiSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionItemRoutes(app, { controller }) {
  if (!controller) throw new Error('TRANSACTION_ITEM_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  router.get('/', adapt(controller.listTransactionItems.bind(controller)));
  router.post('/', validateRequest({ body: tiSchemas.create }), adapt(controller.createTransactionItem.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getTransactionItem.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: tiSchemas.update }), adapt(controller.updateTransactionItem.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteTransactionItem.bind(controller)));
  app.use('/api/transaction-items', router);
}

