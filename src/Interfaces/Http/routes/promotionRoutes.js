import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { promotions: promoSchemas, common: commonSchemas } = validationSchemas;

export default function registerPromotionRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('PROMOTION_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewPromotions = requirePermission('view_promotions', { requireAuth, authorize });
  const canCreatePromotions = requirePermission('add_promotions', { requireAuth, authorize });
  const canUpdatePromotions = requirePermission('edit_promotions', { requireAuth, authorize });
  const canDeletePromotions = requirePermission('delete_promotions', { requireAuth, authorize });

  router.get('/', ...canViewPromotions, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreatePromotions,
    validateRequest({ body: promoSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPromotions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.put(
    '/:id',
    ...canUpdatePromotions,
    validateRequest({ params: commonSchemas.idParam, body: promoSchemas.update }),
    adapt(controller.update.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePromotions,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );
  app.use('/api/promotions', router);
}

