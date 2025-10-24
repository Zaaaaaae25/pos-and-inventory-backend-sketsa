import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { suppliers: supplierSchemas, common: commonSchemas } = validationSchemas;

export default function registerSupplierRoutes(app, { controller }) {
  if (!controller) throw new Error('SUPPLIER_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listSuppliers.bind(controller)));
  router.post('/', validateRequest({ body: supplierSchemas.create }), adapt(controller.createSupplier.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getSupplier.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: supplierSchemas.update }), adapt(controller.updateSupplier.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteSupplier.bind(controller)));

  app.use('/api/suppliers', router);
}

