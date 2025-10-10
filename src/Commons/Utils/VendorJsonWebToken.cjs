const crypto = require('node:crypto');

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function parseExpiration(expiresIn) {
  if (typeof expiresIn === 'number' && Number.isFinite(expiresIn)) {
    return expiresIn;
  }

  if (typeof expiresIn !== 'string') {
    return null;
  }

  const match = expiresIn.trim().match(/^(\d+)([smhd])$/i);
  if (!match) {
    return Number.parseInt(expiresIn, 10) || null;
  }

  const value = Number.parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const multipliers = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return value * multipliers[unit];
}

function applyStandardClaims(payload, options = {}) {
  const now = Math.floor(Date.now() / 1000);
  const claims = { ...payload };

  if (options.expiresIn) {
    const expiresIn = parseExpiration(options.expiresIn);
    if (expiresIn) {
      claims.exp = now + expiresIn;
    }
  }

  if (options.notBefore) {
    const notBefore = parseExpiration(options.notBefore);
    if (notBefore) {
      claims.nbf = now + notBefore;
    }
  }

  return claims;
}

function sign(payload, secret, options = {}) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('JWT sign payload must be an object');
  }

  if (typeof secret !== 'string' || secret.length === 0) {
    throw new Error('JWT secret must be a non-empty string');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const claims = applyStandardClaims(payload, options);

  const headerSegment = base64UrlEncode(JSON.stringify(header));
  const payloadSegment = base64UrlEncode(JSON.stringify(claims));
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64url');

  return `${signingInput}.${signature}`;
}

function verify(token, secret) {
  if (typeof token !== 'string' || token.length === 0) {
    throw new Error('JWT token must be a non-empty string');
  }

  if (typeof secret !== 'string' || secret.length === 0) {
    throw new Error('JWT secret must be a non-empty string');
  }

  const segments = token.split('.');

  if (segments.length !== 3) {
    throw new Error('Invalid JWT token structure');
  }

  const [headerSegment, payloadSegment, signatureSegment] = segments;
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64url');

  const provided = Buffer.from(signatureSegment, 'base64url');
  const expected = Buffer.from(expectedSignature, 'base64url');

  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    throw new Error('Invalid JWT signature');
  }

  const payload = JSON.parse(base64UrlDecode(payloadSegment));
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp && now >= payload.exp) {
    throw new Error('JWT expired');
  }

  if (payload.nbf && now < payload.nbf) {
    throw new Error('JWT not active');
  }

  return payload;
}

module.exports = {
  sign,
  verify,
  default: {
    sign,
    verify,
  },
};
