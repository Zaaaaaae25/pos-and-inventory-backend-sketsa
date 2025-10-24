import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { packages: packageSchemas, common: commonSchemas } = validationSchemas;

export default function registerPackageRoutes(app, { controller }) {
  if (!controller) throw new Error('PACKAGE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.listPackages.bind(controller)));
  router.post('/', validateRequest({ body: packageSchemas.create }), adapt(controller.createPackage.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.getPackage.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: packageSchemas.update }), adapt(controller.updatePackage.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.deletePackage.bind(controller)));

  app.use('/api/packages', router);
}

