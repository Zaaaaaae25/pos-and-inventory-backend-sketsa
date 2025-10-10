import { createRequire } from 'node:module';
import createExpressStub from './ExpressStub.js';

let expressInstance;

try {
  const require = createRequire(import.meta.url);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  expressInstance = require('express');
} catch (error) {
  expressInstance = createExpressStub();
}

export default expressInstance;
