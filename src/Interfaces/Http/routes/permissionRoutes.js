import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { permissions: permissionSchemas, common: commonSchemas } = validationSchemas;

export default function registerPermissionRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('PERMISSION_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listPermissions.bind(controller)));
  router.post(
    '/',
    validateRequest({ body: permissionSchemas.create }),
    adapt(controller.createPermission.bind(controller)),
  );
  router.get(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getPermission.bind(controller)),
  );
  router.put(
    '/:id',
    validateRequest({ params: commonSchemas.idParam, body: permissionSchemas.update }),
    adapt(controller.updatePermission.bind(controller)),
  );
  router.delete(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deletePermission.bind(controller)),
  );

  app.use('/api/permissions', router);
}

