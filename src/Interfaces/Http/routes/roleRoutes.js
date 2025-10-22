import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { roles: roleSchemas, common: commonSchemas } = validationSchemas;

export default function registerRoleRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('ROLE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listRoles.bind(controller)));
  router.post(
    '/',
    validateRequest({ body: roleSchemas.create }),
    adapt(controller.createRole.bind(controller)),
  );
  router.get(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getRole.bind(controller)),
  );
  router.put(
    '/:id',
    validateRequest({
      params: commonSchemas.idParam,
      body: roleSchemas.update,
    }),
    adapt(controller.updateRole.bind(controller)),
  );
  router.delete(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteRole.bind(controller)),
  );

  app.use('/api/roles', router);
}
