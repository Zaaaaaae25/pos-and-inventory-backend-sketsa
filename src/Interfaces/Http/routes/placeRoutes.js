import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';


const { places: placeSchemas, common: commonSchemas } = validationSchemas;

export default function registerPlaceRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) {
    throw new Error('PLACE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();
  const canViewPlaces = requirePermission('view_places', { requireAuth, authorize });
  const canCreatePlaces = requirePermission('add_places', { requireAuth, authorize });
  const canUpdatePlaces = requirePermission('edit_places', { requireAuth, authorize });
  const canDeletePlaces = requirePermission('delete_places', { requireAuth, authorize });

  router.get('/', ...canViewPlaces, adapt(controller.listPlaces.bind(controller)));
  router.post(
    '/',
    ...canCreatePlaces,
    validateRequest({ body: placeSchemas.create }),
    adapt(controller.createPlace.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPlaces,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPlace.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePlaces,
    validateRequest({
      params: commonSchemas.idParam,
      body: placeSchemas.update,
    }),
    adapt(controller.updatePlace.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePlaces,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePlace.bind(controller)),
  );

  app.use('/api/places', router);
}
