import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

const storage = new AsyncLocalStorage();

function buildInitialContext(overrides = {}) {
  const baseContext = {
    requestId: overrides.requestId ?? randomUUID(),
    source: overrides.source ?? 'system',
    user: overrides.user ?? null,
    userId: overrides.user?.id ?? overrides.userId ?? null,
    skipActivityLogging: overrides.skipActivityLogging ?? false,
    metadata: {},
  };

  if (overrides.metadata && typeof overrides.metadata === 'object') {
    baseContext.metadata = { ...overrides.metadata };
  }

  return baseContext;
}

export function runWithRequestContext(overrides = {}, callback) {
  const context = buildInitialContext(overrides);
  return storage.run(context, callback);
}

export function getRequestContext() {
  return storage.getStore() ?? null;
}

export function setRequestContextUser(user) {
  const store = storage.getStore();
  if (!store) return;
  store.user = user ?? null;
  store.userId = user?.id ?? null;
}

export function setRequestContextValue(key, value) {
  if (!key) return;
  const store = storage.getStore();
  if (!store) return;
  store[key] = value;
}

export function withActivityLoggingSuppressed(callback) {
  const store = storage.getStore();
  if (!store) {
    return callback();
  }

  const previous = store.skipActivityLogging === true;
  store.skipActivityLogging = true;

  try {
    const result = callback();
    if (result && typeof result.then === 'function') {
      return result.finally(() => {
        store.skipActivityLogging = previous;
      });
    }
    store.skipActivityLogging = previous;
    return result;
  } catch (error) {
    store.skipActivityLogging = previous;
    throw error;
  }
}
