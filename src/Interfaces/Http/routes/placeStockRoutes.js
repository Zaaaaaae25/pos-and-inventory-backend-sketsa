import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { placeStocks: psSchemas, common: commonSchemas } = validationSchemas;

export default function registerPlaceStockRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('PLACESTOCK_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewPlaceStocks = requirePermission('view_inventory', { requireAuth, authorize });
  const canCreatePlaceStocks = requirePermission('add_inventory', { requireAuth, authorize });
  const canUpdatePlaceStocks = requirePermission('edit_inventory', { requireAuth, authorize });
  const canDeletePlaceStocks = requirePermission('delete_inventory', { requireAuth, authorize });

  router.get('/', ...canViewPlaceStocks, adapt(controller.listPlaceStocks.bind(controller)));
  router.post(
    '/',
    ...canCreatePlaceStocks,
    validateRequest({ body: psSchemas.create }),
    adapt(controller.createPlaceStock.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPlaceStocks,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPlaceStock.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePlaceStocks,
    validateRequest({ params: commonSchemas.idParam, body: psSchemas.update }),
    adapt(controller.updatePlaceStock.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePlaceStocks,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePlaceStock.bind(controller)),
  );

  app.use('/api/place-stocks', router);
}

