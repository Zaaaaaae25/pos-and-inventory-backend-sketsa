import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';

export default function registerRoleRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('ROLE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listRoles.bind(controller)));
  router.post('/', adapt(controller.createRole.bind(controller)));
  router.get('/:id', adapt(controller.getRole.bind(controller)));
  router.put('/:id', adapt(controller.updateRole.bind(controller)));
  router.delete('/:id', adapt(controller.deleteRole.bind(controller)));

  app.use('/api/roles', router);
}
