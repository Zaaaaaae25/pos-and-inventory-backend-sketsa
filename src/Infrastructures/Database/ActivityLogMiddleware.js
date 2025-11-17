import {
  getRequestContext,
  runWithRequestContext,
  withActivityLoggingSuppressed,
} from '../Context/RequestContext.js';

const CRUD_ACTIONS = new Set(['create', 'update', 'delete']);
const EXCLUDED_MODELS = new Set(['ActivityLog', 'SystemLog']);

function buildModelTableMap(PrismaNamespace) {
  if (!PrismaNamespace?.dmmf?.datamodel?.models) {
    return {};
  }

  return PrismaNamespace.dmmf.datamodel.models.reduce((acc, model) => {
    const tableName = model.dbName ?? model.name;
    if (tableName) {
      acc[model.name] = tableName;
    }
    return acc;
  }, {});
}

function sanitizeValue(value, DecimalClass) {
  if (value === null || typeof value === 'undefined') {
    return value ?? null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'bigint') {
    return Number(value);
  }

  if (DecimalClass && value instanceof DecimalClass) {
    if (typeof value.toNumber === 'function') {
      return value.toNumber();
    }
    if (typeof value.toString === 'function') {
      return value.toString();
    }
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, DecimalClass));
  }

  if (typeof value === 'object') {
    if (typeof value.toJSON === 'function') {
      return value.toJSON();
    }

    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = sanitizeValue(val, DecimalClass);
      return acc;
    }, {});
  }

  return value;
}

function sanitizeRecord(record, DecimalClass) {
  if (!record || typeof record !== 'object') {
    return record ?? null;
  }

  return sanitizeValue({ ...record }, DecimalClass);
}

function extractEntityId(source) {
  if (source === null || typeof source === 'undefined') {
    return null;
  }

  if (typeof source === 'number' && Number.isFinite(source)) {
    return Math.trunc(source);
  }

  if (typeof source === 'bigint') {
    return Number(source);
  }

  if (typeof source === 'string') {
    const parsed = Number.parseInt(source, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  if (Array.isArray(source)) {
    for (const candidate of source) {
      const extracted = extractEntityId(candidate);
      if (extracted !== null) {
        return extracted;
      }
    }
    return null;
  }

  if (typeof source === 'object') {
    if (Object.prototype.hasOwnProperty.call(source, 'id')) {
      return extractEntityId(source.id);
    }

    if (Object.prototype.hasOwnProperty.call(source, 'where')) {
      return extractEntityId(source.where);
    }
  }

  return null;
}

async function fetchSnapshot({ prisma, tableName, entityId, DecimalClass }) {
  if (!tableName || !entityId) {
    return null;
  }

  const rows = await withActivityLoggingSuppressed(() =>
    prisma.$queryRawUnsafe(
      `SELECT row_to_json(t) AS data FROM "${tableName}" AS t WHERE id = $1 LIMIT 1`,
      entityId,
    ),
  );

  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  const payload = rows[0]?.data ?? null;
  return sanitizeRecord(payload, DecimalClass);
}

function buildPayload({ action, tableName, entityId, before, after, context }) {
  if (!entityId || !action || !tableName) {
    return null;
  }

  const actionLabel = `${action}_${tableName}`;
  const userId = context?.userId ?? context?.user?.id ?? null;

  return {
    userId,
    action: actionLabel,
    entityType: tableName,
    entityId,
    contextJson: {
      before: before ?? null,
      after: after ?? null,
    },
  };
}

async function persistActivityLog(prisma, payload) {
  if (!payload) {
    return;
  }

  try {
    await withActivityLoggingSuppressed(() => prisma.activityLog.create({ data: payload }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to persist activity log:', error.message);
  }
}

async function handleActivityLogging({ prisma, params, next, tableNameMap, DecimalClass }) {
  const context = getRequestContext();
  if (context?.skipActivityLogging) {
    return next(params);
  }

  const modelName = params.model;
  const action = params.action?.toLowerCase();

  if (!modelName || !CRUD_ACTIONS.has(action) || EXCLUDED_MODELS.has(modelName)) {
    return next(params);
  }

  const tableName = tableNameMap[modelName] ?? modelName;
  let entityId = extractEntityId(params.args);
  let beforeSnapshot = null;

  if ((action === 'update' || action === 'delete') && entityId) {
    beforeSnapshot = await fetchSnapshot({ prisma, tableName, entityId, DecimalClass });
  }

  const result = await next(params);

  if (!entityId) {
    entityId = extractEntityId(result);
  }

  if (!entityId) {
    return result;
  }

  const afterSnapshot = action === 'delete' ? null : sanitizeRecord(result, DecimalClass);
  const payload = buildPayload({
    action,
    tableName,
    entityId,
    before: action === 'create' ? null : beforeSnapshot,
    after: action === 'delete' ? null : afterSnapshot,
    context,
  });

  await persistActivityLog(prisma, payload);
  return result;
}

export function registerActivityLogMiddleware(prisma, { PrismaNamespace } = {}) {
  const prismaType = typeof prisma;
  const ctor = prisma && prisma.constructor ? prisma.constructor.name : undefined;
  const hasUse = prisma ? typeof prisma.$use === 'function' : false;
  const hasExtends = prisma ? typeof prisma.$extends === 'function' : false;

  if (!prisma) {
    // eslint-disable-next-line no-console
    console.warn('[ActivityLogMiddleware] prisma client missing', { prismaType, ctor });
    return prisma;
  }

  if (prisma._activityLogMiddlewareRegistered) {
    // Already wired
    return prisma;
  }

  const tableNameMap = buildModelTableMap(PrismaNamespace);
  const DecimalClass = PrismaNamespace?.Decimal ?? null;

  if (hasUse) {
    prisma.$use((params, next) => {
      const runner = () =>
        handleActivityLogging({
          prisma,
          params,
          next,
          tableNameMap,
          DecimalClass,
        });

      if (getRequestContext()) {
        return runner();
      }

      return runWithRequestContext({ source: 'prisma' }, runner);
    });

    prisma._activityLogMiddlewareRegistered = true;
    return prisma;
  }

  if (hasExtends) {
    const extended = prisma.$extends({
      query: {
        $allModels: {
          $allOperations({ model, operation, args, query }) {
            const params = { model, action: operation, args };
            const next = (overrideParams = params) => {
              const callArgs =
                overrideParams && Object.prototype.hasOwnProperty.call(overrideParams, 'args')
                  ? overrideParams.args
                  : args;
              return query(callArgs);
            };

            const runner = () =>
              handleActivityLogging({
                prisma,
                params,
                next,
                tableNameMap,
                DecimalClass,
              });

            if (getRequestContext()) {
              return runner();
            }

            return runWithRequestContext({ source: 'prisma' }, runner);
          },
        },
      },
    });

    extended._activityLogMiddlewareRegistered = true;
    return extended;
  }

  // eslint-disable-next-line no-console
  console.warn('[ActivityLogMiddleware] prisma client missing middleware hooks', {
    prismaType,
    ctor,
    hasUse,
    hasExtends,
  });

  return prisma;
}
