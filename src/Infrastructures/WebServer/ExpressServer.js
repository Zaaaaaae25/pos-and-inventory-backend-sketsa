import express from './ExpressShim.js';
import AppConfig from '../Config/AppConfig.js';
import logger from '../Logger/WinstonLogger.js';
import { disconnectPrisma } from '../DatabaseConfig.js';
import registerUserRoutes from '../../Interfaces/Http/routes/userRoutes.js';
import registerRoleRoutes from '../../Interfaces/Http/routes/roleRoutes.js';
import registerPlaceRoutes from '../../Interfaces/Http/routes/placeRoutes.js';
import registerAuthRoutes from '../../Interfaces/Http/routes/authRoutes.js';
import errorHandler from '../../Interfaces/Middlewares/ErrorHandler.js';
import createContainer from '../Containers/index.js';
import { createOpenApiDocument, createSwaggerHtml } from '../../Interfaces/Http/swagger.js';

export function createExpressApp({ container } = {}) {
  const app = express();

  app.use(express.json());

  const diContainer = container ?? createContainer();
  const userController = diContainer.resolve('userController');
  const roleController = diContainer.resolve('roleController');
  const placeController = diContainer.resolve('placeController');
  const authController = diContainer.resolve('authController');
  const optionalAuth = diContainer.resolve('optionalAuth');

  registerUserRoutes(app, { controller: userController });
  registerRoleRoutes(app, { controller: roleController });
  registerPlaceRoutes(app, { controller: placeController });
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
