import http from 'node:http';
import { URL } from 'node:url';

export default function createExpressStub() {
  function express() {
    return createContainer({ isRouter: false });
  }

  express.Router = function Router() {
    const router = createContainer({ isRouter: true });
    router._isRouter = true;
    return router;
  };

  express.json = function json() {
    return (req, res, next) => {
      if (req._jsonParsed) {
        next();
        return;
      }

      if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        req.body = req.body ?? {};
        req._jsonParsed = true;
        next();
        return;
      }

      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        if (!data) {
          req.body = {};
          req._jsonParsed = true;
          next();
          return;
        }

        try {
          req.body = JSON.parse(data);
          req._jsonParsed = true;
          next();
        } catch (error) {
          next(new Error('Invalid JSON payload'));
        }
      });

      req.on('error', (error) => {
        next(error);
      });
    };
  };

  return express;
}

function createContainer({ isRouter }) {
  const stack = [];

  const container = {
    use(pathOrHandler, maybeHandler) {
      let path = '/';
      let handler = pathOrHandler;

      if (typeof pathOrHandler === 'string') {
        path = normalizePath(pathOrHandler);
        handler = maybeHandler;
      }

      if (!handler) {
        throw new Error('EXPRESS_STUB.MISSING_HANDLER');
      }

      const layer = {
        type: 'middleware',
        path,
        handler,
        isRouter: Boolean(handler._isRouter),
        isError: handler.length === 4,
      };

      stack.push(layer);
      return container;
    },

    get(path, handler) {
      registerRoute('GET', path, handler);
      return container;
    },

    post(path, handler) {
      registerRoute('POST', path, handler);
      return container;
    },

    put(path, handler) {
      registerRoute('PUT', path, handler);
      return container;
    },

    patch(path, handler) {
      registerRoute('PATCH', path, handler);
      return container;
    },

    delete(path, handler) {
      registerRoute('DELETE', path, handler);
      return container;
    },

    listen(port, callback) {
      if (isRouter) {
        throw new Error('EXPRESS_STUB.ROUTER_CANNOT_LISTEN');
      }

      const server = http.createServer((req, res) => {
        prepareRequest(req);
        prepareResponse(res);
        req._expressPath = new URL(req.url, 'http://localhost').pathname;

        handleStack({ stack, req, res, isRouter }, 0, null, (err) => {
          if (err && !res.writableEnded) {
            res.statusCode = 500;
            res.end(err.message ?? 'Internal Server Error');
            return;
          }

          if (!res.writableEnded) {
            res.statusCode = 404;
            res.end('Not Found');
          }
        });
      });

      return server.listen(port, callback);
    },

    _handle(req, res, done, err = null) {
      handleStack({ stack, req, res, isRouter }, 0, err, done);
    },
  };

  function registerRoute(method, path, handler) {
    const matcher = compileMatcher(normalizePath(path));
    stack.push({ type: 'route', method, matcher, handler });
  }

  container._stack = stack;
  return container;
}

function prepareRequest(req) {
  if (!req.query) {
    const url = new URL(req.url, 'http://localhost');
    req.query = Object.fromEntries(url.searchParams.entries());
  }

  if (!req.params) {
    req.params = {};
  }
}

function prepareResponse(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.json = function json(payload) {
    if (!res.headersSent) {
      res.setHeader('content-type', 'application/json');
    }
    res.end(JSON.stringify(payload));
  };

  res.send = function send(payload) {
    if (typeof payload === 'object' && payload !== null && !Buffer.isBuffer(payload)) {
      res.json(payload);
      return;
    }

    res.end(payload);
  };

  res.type = function type(value) {
    const lower = String(value).toLowerCase();
    const types = {
      json: 'application/json',
      html: 'text/html; charset=utf-8',
      text: 'text/plain; charset=utf-8',
    };

    res.setHeader('content-type', types[lower] ?? value);
    return res;
  };
}

function handleStack(context, index, err, done) {
  const { stack, req, res, isRouter = false } = context;

  const next = (nextErr) => {
    handleStack(context, index + 1, nextErr ?? null, done);
  };

  if (index >= stack.length) {
    if (err) {
      if (done) {
        done(err);
      } else if (!res.writableEnded) {
        res.statusCode = 500;
        res.end(err.message ?? 'Internal Server Error');
      }
      return;
    }

    if (done) {
      done();
    }
    return;
  }

  const layer = stack[index];
  const currentPath = req._expressPath ?? '/';

  if (layer.type === 'middleware') {
    if (!matchPath(layer.path, currentPath)) {
      handleStack(context, index + 1, err, done);
      return;
    }

    if (err) {
      if (layer.isError) {
        callErrorMiddleware(layer.handler, err, req, res, next);
        return;
      }

      handleStack(context, index + 1, err, done);
      return;
    }

    if (layer.isRouter) {
      const previousPath = req._expressPath;
      req._expressPath = trimPath(currentPath, layer.path);
      layer.handler._handle(req, res, (routerErr) => {
        req._expressPath = previousPath;
        handleStack(context, index + 1, routerErr ?? null, done);
      });
      return;
    }

    if (layer.isError) {
      handleStack(context, index + 1, err, done);
      return;
    }

    callMiddleware(layer.handler, req, res, next);
    return;
  }

  if (layer.type === 'route') {
    if (err) {
      handleStack(context, index + 1, err, done);
      return;
    }

    if (layer.method !== req.method) {
      handleStack(context, index + 1, err, done);
      return;
    }

    const match = layer.matcher(req._expressPath ?? '/');
    if (!match) {
      handleStack(context, index + 1, err, done);
      return;
    }

    req.params = match.params;
    callRoute(layer.handler, req, res, next);
    return;
  }

  handleStack(context, index + 1, err, done);
}

function callMiddleware(fn, req, res, next) {
  try {
    const result = fn(req, res, next);
    if (isPromise(result)) {
      result.then(() => next()).catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
}

function callErrorMiddleware(fn, err, req, res, next) {
  try {
    const result = fn(err, req, res, next);
    if (isPromise(result)) {
      result.then(() => next()).catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
}

function callRoute(fn, req, res, next) {
  try {
    const result = fn(req, res, next);
    if (isPromise(result)) {
      result.catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
}

function isPromise(value) {
  return value && typeof value.then === 'function';
}

function normalizePath(path) {
  if (!path) {
    return '/';
  }

  if (path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) || '/' : path;
}

function trimPath(fullPath, basePath) {
  if (basePath === '/' || !fullPath.startsWith(basePath)) {
    return fullPath || '/';
  }

  const trimmed = fullPath.slice(basePath.length);
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function matchPath(layerPath, currentPath) {
  if (layerPath === '/') {
    return true;
  }

  if (currentPath === layerPath) {
    return true;
  }

  return currentPath.startsWith(layerPath.endsWith('/') ? layerPath : `${layerPath}/`);
}

function compileMatcher(path) {
  const segments = path.split('/').filter(Boolean);

  return (currentPath) => {
    const pathSegments = (currentPath || '/').split('/').filter(Boolean);

    if (segments.length !== pathSegments.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i];
      const value = pathSegments[i];

      if (segment.startsWith(':')) {
        const key = segment.slice(1);
        params[key] = decodeURIComponent(value);
        continue;
      }

      if (segment !== value) {
        return null;
      }
    }

    return { params };
  };
}
