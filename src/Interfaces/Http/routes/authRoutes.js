import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';

export default function registerAuthRoutes(app, { controller, optionalAuth } = {}) {
  if (!controller) {
    throw new Error('AUTH_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.post('/login', adapt(controller.login.bind(controller)));

  const logoutMiddleware = typeof optionalAuth === 'function' ? [optionalAuth] : [];
  router.post('/logout', ...logoutMiddleware, adapt(controller.logout.bind(controller)));

  app.use('/api/auth', router);
}
