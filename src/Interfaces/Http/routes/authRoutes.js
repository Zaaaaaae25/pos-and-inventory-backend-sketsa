import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { auth: authSchemas } = validationSchemas;

export default function registerAuthRoutes(app, { controller, optionalAuth } = {}) {
  if (!controller) {
    throw new Error('AUTH_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.post(
    '/login',
    validateRequest({ body: authSchemas.login }),
    adapt(controller.login.bind(controller)),
  );

  const logoutMiddleware = typeof optionalAuth === 'function' ? [optionalAuth] : [];
  router.post('/logout', ...logoutMiddleware, adapt(controller.logout.bind(controller)));

  app.use('/api/auth', router);
}
