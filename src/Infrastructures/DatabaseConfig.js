import { createRequire } from 'node:module';

let PrismaClient;

try {
  const require = createRequire(import.meta.url);
  ({ PrismaClient } = require('@prisma/client'));
} catch (error) {
  PrismaClient = null;
}

let prismaInstance;

export function getPrisma() {
  if (!PrismaClient) {
    throw new Error('PRISMA_CLIENT.NOT_AVAILABLE');
  }

  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }

  return prismaInstance;
}

export async function disconnectPrisma() {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = undefined;
  }
}
