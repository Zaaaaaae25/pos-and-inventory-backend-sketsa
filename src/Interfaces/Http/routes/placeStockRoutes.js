import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { placeStocks: psSchemas, common: commonSchemas } = validationSchemas;

export default function registerPlaceStockRoutes(app, { controller }) {
  if (!controller) throw new Error('PLACESTOCK_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listPlaceStocks.bind(controller)));
  router.post('/', validateRequest({ body: psSchemas.create }), adapt(controller.createPlaceStock.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getPlaceStock.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: psSchemas.update }), adapt(controller.updatePlaceStock.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deletePlaceStock.bind(controller)));

  app.use('/api/place-stocks', router);
}

