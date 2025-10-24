import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { supplierProducts: spSchemas, common: commonSchemas } = validationSchemas;

export default function registerSupplierProductRoutes(app, { controller }) {
  if (!controller) throw new Error('SUPPLIER_PRODUCT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listSupplierProducts.bind(controller)));
  router.post('/', validateRequest({ body: spSchemas.create }), adapt(controller.createSupplierProduct.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getSupplierProduct.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: spSchemas.update }), adapt(controller.updateSupplierProduct.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteSupplierProduct.bind(controller)));

  app.use('/api/supplier-products', router);
}

