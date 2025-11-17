import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { deliveryIntegrations: diSchemas, common: commonSchemas } = validationSchemas;

export default function registerDeliveryIntegrationRoutes(app, {
  controller,
  requireAuth,
  authorize,
} = {}) {
  if (!controller) throw new Error('DELIVERYINTEGRATION_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  const canViewDeliveryIntegrations = requirePermission('view_delivery_channels', {
    requireAuth,
    authorize,
  });
  const canCreateDeliveryIntegrations = requirePermission('add_delivery_channels', {
    requireAuth,
    authorize,
  });
  const canUpdateDeliveryIntegrations = requirePermission('edit_delivery_channels', {
    requireAuth,
    authorize,
  });
  const canDeleteDeliveryIntegrations = requirePermission('delete_delivery_channels', {
    requireAuth,
    authorize,
  });

  router.get('/', ...canViewDeliveryIntegrations, adapt(controller.listDeliveryIntegrations.bind(controller)));
  router.post(
    '/',
    ...canCreateDeliveryIntegrations,
    validateRequest({ body: diSchemas.create }),
    adapt(controller.createDeliveryIntegration.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewDeliveryIntegrations,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.getDeliveryIntegration.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdateDeliveryIntegrations,
    validateRequest({ params: commonSchemas.idParam, body: diSchemas.update }),
    adapt(controller.updateDeliveryIntegration.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeleteDeliveryIntegrations,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.deleteDeliveryIntegration.bind(controller)),
  );

  app.use('/api/delivery-integrations', router);
}

