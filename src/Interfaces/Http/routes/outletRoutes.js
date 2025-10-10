import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';

export default function registerOutletRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('OUTLET_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listOutlets.bind(controller)));
  router.post('/', adapt(controller.createOutlet.bind(controller)));
  router.get('/:id', adapt(controller.getOutlet.bind(controller)));
  router.put('/:id', adapt(controller.updateOutlet.bind(controller)));
  router.delete('/:id', adapt(controller.deleteOutlet.bind(controller)));

  app.use('/api/outlets', router);
}
