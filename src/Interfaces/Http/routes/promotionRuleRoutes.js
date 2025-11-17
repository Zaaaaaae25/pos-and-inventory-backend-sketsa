import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';
import { requirePermission } from './permissionGuards.js';

const { promotionRules: prSchemas, common: commonSchemas } = validationSchemas;

export default function registerPromotionRuleRoutes(app, { controller, requireAuth, authorize } = {}) {
  if (!controller) throw new Error('PROMOTION_RULE_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  const canViewPromotionRules = requirePermission('view_promotions', { requireAuth, authorize });
  const canCreatePromotionRules = requirePermission('add_promotions', { requireAuth, authorize });
  const canDeletePromotionRules = requirePermission('delete_promotions', { requireAuth, authorize });

  router.get('/', ...canViewPromotionRules, adapt(controller.list.bind(controller)));
  router.post(
    '/',
    ...canCreatePromotionRules,
    validateRequest({ body: prSchemas.create }),
    adapt(controller.create.bind(controller)),
  );
  router.get(
    '/:id',
    ...canViewPromotionRules,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.get.bind(controller)),
  );
  router.delete(
    '/:id',
    ...canDeletePromotionRules,
    validateRequest({ params: commonSchemas.idParam }),
    adapt(controller.delete.bind(controller)),
  );
  app.use('/api/promotion-rules', router);
}

