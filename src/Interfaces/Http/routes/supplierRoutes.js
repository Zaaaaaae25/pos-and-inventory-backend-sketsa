import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { suppliers: supplierSchemas, common: commonSchemas } = validationSchemas;

export default function registerSupplierRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('SUPPLIER_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewSuppliers = requirePermission('view_suppliers', { requireAuth, authorize });
  const canCreateSuppliers = requirePermission('add_suppliers', { requireAuth, authorize });
  const canUpdateSuppliers = requirePermission('edit_suppliers', { requireAuth, authorize });
  const canDeleteSuppliers = requirePermission('delete_suppliers', { requireAuth, authorize });

  router.get('/', ...canViewSuppliers, adapt(controller.listSuppliers.bind(controller)));
  router.post(
    '/',
    ...canCreateSuppliers,
    validateRequest({ body: supplierSchemas.create }),
    adapt(controller.createSupplier.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewSuppliers,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getSupplier.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateSuppliers,
    validateRequest({ params: commonSchemas.idParam, body: supplierSchemas.update }),
    adapt(controller.updateSupplier.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteSuppliers,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteSupplier.bind(controller)),
  );

  app.use('/api/suppliers', router);
}

