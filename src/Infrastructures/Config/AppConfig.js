import { createRequire } from 'node:module';

let dotenv;

try {
  const require = createRequire(import.meta.url);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  dotenv = require('dotenv');
} catch (error) {
  dotenv = { config() {} };
}

dotenv.config();

const AppConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
};

export default AppConfig;
