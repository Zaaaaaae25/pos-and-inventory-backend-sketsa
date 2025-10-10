import express from 'express';
import AppConfig from '../Config/AppConfig.js';
import logger from '../Logger/WinstonLogger.js';
import { disconnectPrisma } from '../Config/DatabaseConfig.js';
import registerUserRoutes from '../../Interfaces/Http/routes/userRoutes.js';
import errorHandler from '../../Interfaces/Middlewares/ErrorHandler.js';
import createContainer from '../Config/Container.js';

export function createExpressApp({ container } = {}) {
  const app = express();

  app.use(express.json());

  const diContainer = container ?? createContainer();
  const userController = diContainer.resolve('userController');

  registerUserRoutes(app, { controller: userController });

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
