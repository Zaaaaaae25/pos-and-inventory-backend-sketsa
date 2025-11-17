import { runWithRequestContext } from '../../Infrastructures/Context/RequestContext.js';

export default function requestContextMiddleware(req, res, next) {
  const requestIdHeader = req.get?.('x-request-id') ?? req.headers?.['x-request-id'];

  runWithRequestContext(
    {
      requestId: requestIdHeader,
      source: 'http',
      metadata: {
        method: req.method,
        path: req.path,
      },
    },
    () => next(),
  );
}
