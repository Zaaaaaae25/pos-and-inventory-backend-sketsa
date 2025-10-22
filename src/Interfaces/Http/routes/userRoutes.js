import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { users: userSchemas, common: commonSchemas } = validationSchemas;

export default function registerUserRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('USER_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listUsers.bind(controller)));
  router.post(
    '/',
    validateRequest({ body: userSchemas.create }),
    adapt(controller.createUser.bind(controller)),
  );
  router.get(
    '/:id',
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getUser.bind(controller)),
  );
  router.patch(
    '/:id',
    validateRequest({
      params: commonSchemas.idParam,
      body: userSchemas.update,
    }),
    adapt(controller.updateUser.bind(controller)),
  );

  app.use('/api/users', router);
}
