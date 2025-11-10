import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { menus: menuSchemas, common: commonSchemas } = validationSchemas;

export default function registerMenuRoutes(app, { controller }) {
  if (!controller) throw new Error('MENU_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listMenus.bind(controller)));
  router.post('/', validateRequest({ body: menuSchemas.create }), adapt(controller.createMenu.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getMenu.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: menuSchemas.update }), adapt(controller.updateMenu.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deleteMenu.bind(controller)));

  app.use('/api/menus', router);
}

