import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { transactions: trxSchemas, common: commonSchemas } = validationSchemas;

export default function registerTransactionRoutes(app, { controller }) {
  if (!controller) throw new Error('TRANSACTION_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  router.get('/', adapt(controller.listTransactions.bind(controller)));
  router.post('/', validateRequest({ body: trxSchemas.create }), adapt(controller.createTransaction.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getTransaction.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: trxSchemas.update }), adapt(controller.updateTransaction.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteTransaction.bind(controller)));
  app.use('/api/transactions', router);
}

