import express from './ExpressShim.js';
import AppConfig from '../Config/AppConfig.js';
import logger from '../Logger/WinstonLogger.js';
import { disconnectPrisma } from '../DatabaseConfig.js';
import requestContextMiddleware from '../../Interfaces/Middlewares/RequestContextMiddleware.js';
import registerUserRoutes from '../../Interfaces/Http/routes/userRoutes.js';
import registerRoleRoutes from '../../Interfaces/Http/routes/roleRoutes.js';
import registerPlaceRoutes from '../../Interfaces/Http/routes/placeRoutes.js';
import registerPermissionRoutes from '../../Interfaces/Http/routes/permissionRoutes.js';
import registerUnitRoutes from '../../Interfaces/Http/routes/unitRoutes.js';
import registerTableRoutes from '../../Interfaces/Http/routes/tableRoutes.js';
import registerIngredientRoutes from '../../Interfaces/Http/routes/ingredientRoutes.js';
import registerPackageRoutes from '../../Interfaces/Http/routes/packageRoutes.js';
import registerCategoryRoutes from '../../Interfaces/Http/routes/categoryRoutes.js';
import registerMenuRoutes from '../../Interfaces/Http/routes/menuRoutes.js';
import registerMenuPriceRoutes from '../../Interfaces/Http/routes/menuPriceRoutes.js';
import registerMenuVariantRoutes from '../../Interfaces/Http/routes/menuVariantRoutes.js';
import registerMenuVariantItemRoutes from '../../Interfaces/Http/routes/menuVariantItemRoutes.js';
import registerRecipeRoutes from '../../Interfaces/Http/routes/recipeRoutes.js';
import registerPaymentMethodRoutes from '../../Interfaces/Http/routes/paymentMethodRoutes.js';
import registerDeliveryIntegrationRoutes from '../../Interfaces/Http/routes/deliveryIntegrationRoutes.js';
import registerReportFileRoutes from '../../Interfaces/Http/routes/reportFileRoutes.js';
import registerActivityLogRoutes from '../../Interfaces/Http/routes/activityLogRoutes.js';
import registerSystemLogRoutes from '../../Interfaces/Http/routes/systemLogRoutes.js';
import registerIngredientPackageRoutes from '../../Interfaces/Http/routes/ingredientPackageRoutes.js';
import registerSupplierRoutes from '../../Interfaces/Http/routes/supplierRoutes.js';
import registerSupplierProductRoutes from '../../Interfaces/Http/routes/supplierProductRoutes.js';
import registerTransactionRoutes from '../../Interfaces/Http/routes/transactionRoutes.js';
import registerTransactionItemRoutes from '../../Interfaces/Http/routes/transactionItemRoutes.js';
import registerTransactionItemVariantRoutes from '../../Interfaces/Http/routes/transactionItemVariantRoutes.js';
import registerKitchenOrderRoutes from '../../Interfaces/Http/routes/kitchenOrderRoutes.js';
import registerPlaceStockRoutes from '../../Interfaces/Http/routes/placeStockRoutes.js';
import registerInventoryStockDailyRoutes from '../../Interfaces/Http/routes/inventoryStockDailyRoutes.js';
import registerStockTransferRoutes from '../../Interfaces/Http/routes/stockTransferRoutes.js';
import registerWasteRoutes from '../../Interfaces/Http/routes/wasteRoutes.js';
import registerCashierShiftRoutes from '../../Interfaces/Http/routes/cashierShiftRoutes.js';
import registerPromotionRoutes from '../../Interfaces/Http/routes/promotionRoutes.js';
import registerPromotionRuleRoutes from '../../Interfaces/Http/routes/promotionRuleRoutes.js';
import registerAuthRoutes from '../../Interfaces/Http/routes/authRoutes.js';
import errorHandler from '../../Interfaces/Middlewares/ErrorHandler.js';
import createContainer from '../Containers/index.js';
import { createOpenApiDocument, createSwaggerHtml } from '../../Interfaces/Http/swagger.js';

export function createExpressApp({ container } = {}) {
  const app = express();

  app.use(requestContextMiddleware);
  app.use(express.json());

  const diContainer = container ?? createContainer();
  const userController = diContainer.resolve('userController');
  const roleController = diContainer.resolve('roleController');
  const placeController = diContainer.resolve('placeController');
  const permissionController = diContainer.resolve('permissionController');
  const unitController = diContainer.resolve('unitController');
  const tableController = diContainer.resolve('tableController');
  const ingredientController = diContainer.resolve('ingredientController');
  const packageController = diContainer.resolve('packageController');
  const categoryController = diContainer.resolve('categoryController');
  const menuController = diContainer.resolve('menuController');
  const menuPriceController = diContainer.resolve('menuPriceController');
  const menuVariantController = diContainer.resolve('menuVariantController');
  const menuVariantItemController = diContainer.resolve('menuVariantItemController');
  const recipeController = diContainer.resolve('recipeController');
  const paymentMethodController = diContainer.resolve('paymentMethodController');
  const deliveryIntegrationController = diContainer.resolve('deliveryIntegrationController');
  const reportFileController = diContainer.resolve('reportFileController');
  const activityLogController = diContainer.resolve('activityLogController');
  const systemLogController = diContainer.resolve('systemLogController');
  const ingredientPackageController = diContainer.resolve('ingredientPackageController');
  const supplierController = diContainer.resolve('supplierController');
  const supplierProductController = diContainer.resolve('supplierProductController');
  const transactionController = diContainer.resolve('transactionController');
  const placeStockController = diContainer.resolve('placeStockController');
  const inventoryStockDailyController = diContainer.resolve('inventoryStockDailyController');
  const stockTransferController = diContainer.resolve('stockTransferController');
  const wasteController = diContainer.resolve('wasteController');
  const cashierShiftController = diContainer.resolve('cashierShiftController');
  const promotionController = diContainer.resolve('promotionController');
  const promotionRuleController = diContainer.resolve('promotionRuleController');
  const authController = diContainer.resolve('authController');
  const optionalAuth = diContainer.resolve('optionalAuth');
  const requireAuth = diContainer.resolve('requireAuth');
  const authorize = diContainer.resolve('authorize');

  const middlewareDeps = { requireAuth, authorize };

  registerUserRoutes(app, { controller: userController, ...middlewareDeps });
  registerRoleRoutes(app, { controller: roleController, ...middlewareDeps });
  registerPlaceRoutes(app, { controller: placeController, ...middlewareDeps });
  registerPermissionRoutes(app, { controller: permissionController, ...middlewareDeps });
  registerUnitRoutes(app, { controller: unitController, ...middlewareDeps });
  registerTableRoutes(app, { controller: tableController, ...middlewareDeps });
  registerIngredientRoutes(app, { controller: ingredientController, ...middlewareDeps });
  registerPackageRoutes(app, { controller: packageController, ...middlewareDeps });
  registerCategoryRoutes(app, { controller: categoryController, ...middlewareDeps });
  registerMenuRoutes(app, { controller: menuController, ...middlewareDeps });
  registerMenuPriceRoutes(app, { controller: menuPriceController, ...middlewareDeps });
  registerMenuVariantRoutes(app, { controller: menuVariantController, ...middlewareDeps });
  registerMenuVariantItemRoutes(app, { controller: menuVariantItemController, ...middlewareDeps });
  registerRecipeRoutes(app, { controller: recipeController, ...middlewareDeps });
  registerPaymentMethodRoutes(app, { controller: paymentMethodController, ...middlewareDeps });
  registerDeliveryIntegrationRoutes(app, {
    controller: deliveryIntegrationController,
    ...middlewareDeps,
  });
  registerReportFileRoutes(app, { controller: reportFileController, ...middlewareDeps });
  registerActivityLogRoutes(app, { controller: activityLogController, ...middlewareDeps });
  registerSystemLogRoutes(app, { controller: systemLogController, ...middlewareDeps });
  registerIngredientPackageRoutes(app, { controller: ingredientPackageController, ...middlewareDeps });
  registerSupplierRoutes(app, { controller: supplierController, ...middlewareDeps });
  registerSupplierProductRoutes(app, { controller: supplierProductController, ...middlewareDeps });
  registerTransactionRoutes(app, { controller: transactionController, ...middlewareDeps });
  registerTransactionItemRoutes(app, { controller: transactionController, ...middlewareDeps });
  registerTransactionItemVariantRoutes(app, { controller: transactionController, ...middlewareDeps });
  registerKitchenOrderRoutes(app, { controller: transactionController, ...middlewareDeps });
  registerPlaceStockRoutes(app, { controller: placeStockController, ...middlewareDeps });
  registerInventoryStockDailyRoutes(app, {
    controller: inventoryStockDailyController,
    ...middlewareDeps,
  });
  registerStockTransferRoutes(app, { controller: stockTransferController, ...middlewareDeps });
  registerWasteRoutes(app, { controller: wasteController, ...middlewareDeps });
  registerCashierShiftRoutes(app, { controller: cashierShiftController, ...middlewareDeps });
  registerPromotionRoutes(app, { controller: promotionController, ...middlewareDeps });
  registerPromotionRuleRoutes(app, { controller: promotionRuleController, ...middlewareDeps });
  registerAuthRoutes(app, { controller: authController, optionalAuth });

  app.get('/api/docs.json', (req, res) => {
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    res.json(createOpenApiDocument({ serverUrl }));
  });

  app.get('/api/docs', (req, res) => {
    res.type('html').send(createSwaggerHtml({ specUrl: '/api/docs.json' }));
  });

  app.use(errorHandler);

  return app;
}

export function startServer() {
  const container = createContainer();
  const app = createExpressApp({ container });
  const port = AppConfig.port;

  const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  const shutdown = async () => {
    logger.info('Shutting down server');
    await disconnectPrisma();
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}
