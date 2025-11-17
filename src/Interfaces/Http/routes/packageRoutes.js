import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { packages: packageSchemas, common: commonSchemas } = validationSchemas;

export default function registerPackageRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('PACKAGE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewPackages = requirePermission('view_menus', { requireAuth, authorize });
  const canCreatePackages = requirePermission('add_menus', { requireAuth, authorize });
  const canUpdatePackages = requirePermission('edit_menus', { requireAuth, authorize });
  const canDeletePackages = requirePermission('delete_menus', { requireAuth, authorize });

  router.get('/', ...canViewPackages, adapt(controller.listPackages.bind(controller)));
  router.post(
    '/',
    ...canCreatePackages,
    validateRequest({ body: packageSchemas.create }),
    adapt(controller.createPackage.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPackages,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPackage.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePackages,
    validateRequest({ params: commonSchemas.idParam, body: packageSchemas.update }),
    adapt(controller.updatePackage.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePackages,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePackage.bind(controller)),
  );

  app.use('/api/packages', router);
}

