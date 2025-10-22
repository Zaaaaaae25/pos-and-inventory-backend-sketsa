import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';


const { places: placeSchemas, common: commonSchemas } = validationSchemas;

export default function registerPlaceRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('PLACE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listPlaces.bind(controller)));
  router.post(
    '/',
    validateRequest({ body: placeSchemas.create }),
    adapt(controller.createPlace.bind(controller)),
  );
  router.get(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPlace.bind(controller)),
  );
  router.put(
    '/:id',
    validateRequest({
      params: commonSchemas.idParam,
      body: placeSchemas.update,
    }),
    adapt(controller.updatePlace.bind(controller)),
  );
  router.delete(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePlace.bind(controller)),
  );

  app.use('/api/places', router);
}
