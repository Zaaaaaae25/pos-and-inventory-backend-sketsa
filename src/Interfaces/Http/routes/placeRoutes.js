import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';

export default function registerPlaceRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('PLACE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listPlaces.bind(controller)));
  router.post('/', adapt(controller.createPlace.bind(controller)));
  router.get('/:id', adapt(controller.getPlace.bind(controller)));
  router.put('/:id', adapt(controller.updatePlace.bind(controller)));
  router.delete('/:id', adapt(controller.deletePlace.bind(controller)));

  app.use('/api/places', router);
}
