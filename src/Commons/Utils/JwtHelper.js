import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const jwt = loadJsonWebToken();

function loadJsonWebToken() {
  try {
    const imported = require('jsonwebtoken');
    return imported.default ?? imported;
  } catch (error) {
    const fallback = require('./VendorJsonWebToken.cjs');
    return fallback.default ?? fallback;
  }
}

function resolveSecret(providedSecret) {
  const secret = providedSecret ?? process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_HELPER.MISSING_SECRET');
  }

  return secret;
}

export function signToken(payload, options = {}) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('JWT_HELPER.INVALID_PAYLOAD');
  }

  const { secret, ...jwtOptions } = options;
  const signingSecret = resolveSecret(secret);

  return jwt.sign(payload, signingSecret, jwtOptions);
}

export function verifyToken(token, options = {}) {
  if (!token) {
    throw new Error('JWT_HELPER.MISSING_TOKEN');
  }

  const { secret, ...jwtOptions } = options;
  const verificationSecret = resolveSecret(secret);

  return jwt.verify(token, verificationSecret, jwtOptions);
}
