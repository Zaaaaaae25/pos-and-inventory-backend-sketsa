import express from 'express';
import adapt from '../ExpressAdapter.js';

export default function registerUserRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('USER_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listUsers.bind(controller)));
  router.post('/', adapt(controller.createUser.bind(controller)));
  router.get('/:id', adapt(controller.getUser.bind(controller)));
  router.patch('/:id', adapt(controller.updateUser.bind(controller)));

  app.use('/api/users', router);
}
