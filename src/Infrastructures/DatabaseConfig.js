import { createRequire } from 'node:module';
import { registerActivityLogMiddleware } from './Database/ActivityLogMiddleware.js';

let PrismaClient;
let PrismaNamespace;

try {
  // Force Node-API engine so Prisma middleware `$use` is available (disable accelerate/edge)
  if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
    // eslint-disable-next-line no-process-env
    process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';
  }

  const require = createRequire(import.meta.url);
  ({ PrismaClient, Prisma: PrismaNamespace } = require('@prisma/client'));
} catch (error) {
  PrismaClient = null;
  PrismaNamespace = null;
}

let prismaInstance;

export function getPrisma() {
  if (!PrismaClient) {
    throw new Error('PRISMA_CLIENT.NOT_AVAILABLE');
  }

  if (!prismaInstance) {
    const baseClient = new PrismaClient();
    // registerActivityLogMiddleware may return an extended client when $use is unavailable
    prismaInstance = registerActivityLogMiddleware(baseClient, { PrismaNamespace }) ?? baseClient;
  }

  return prismaInstance;
}

export async function disconnectPrisma() {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = undefined;
  }
}
