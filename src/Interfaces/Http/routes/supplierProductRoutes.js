import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { supplierProducts: spSchemas, common: commonSchemas } = validationSchemas;

export default function registerSupplierProductRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('SUPPLIER_PRODUCT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewSupplierProducts = requirePermission('view_suppliers', { requireAuth, authorize });
  const canCreateSupplierProducts = requirePermission('add_suppliers', { requireAuth, authorize });
  const canUpdateSupplierProducts = requirePermission('edit_suppliers', { requireAuth, authorize });
  const canDeleteSupplierProducts = requirePermission('delete_suppliers', { requireAuth, authorize });

  router.get('/', ...canViewSupplierProducts, adapt(controller.listSupplierProducts.bind(controller)));
  router.post(
    '/',
    ...canCreateSupplierProducts,
    validateRequest({ body: spSchemas.create }),
    adapt(controller.createSupplierProduct.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewSupplierProducts,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getSupplierProduct.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateSupplierProducts,
    validateRequest({ params: commonSchemas.idParam, body: spSchemas.update }),
    adapt(controller.updateSupplierProduct.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteSupplierProducts,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteSupplierProduct.bind(controller)),
  );

  app.use('/api/supplier-products', router);
}

