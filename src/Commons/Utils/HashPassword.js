import crypto from 'node:crypto';

const KEY_LENGTH = Number(process.env.HASH_KEY_LENGTH || 64);
const SALT_LENGTH = Number(process.env.HASH_SALT_LENGTH || 16);

export function hashSecret(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return Promise.reject(new Error('Value to hash must be a non-empty string'));
  }

  const salt = crypto.randomBytes(SALT_LENGTH);

  return new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`${salt.toString('hex')}:${derivedKey.toString('hex')}`);
    });
  });
}

export function verifySecret(value, hash) {
  if (!hash) {
    return Promise.resolve(false);
  }

  const [saltHex, storedKeyHex] = hash.split(':');
  if (!saltHex || !storedKeyHex) {
    return Promise.resolve(false);
  }

  const salt = Buffer.from(saltHex, 'hex');
  const storedKey = Buffer.from(storedKeyHex, 'hex');

  return new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, storedKey.length, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        resolve(crypto.timingSafeEqual(storedKey, derivedKey));
      } catch (comparisonError) {
        reject(comparisonError);
      }
    });
  });
}
