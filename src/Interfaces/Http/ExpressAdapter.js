import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default function adapt(handler) {
  return async (req, res, next) => {
    try {
      const response = await handler({
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.user,
      });

      if (!response) {
        res.status(HttpStatus.NO_CONTENT).end();
        return;
      }

      const { status = HttpStatus.OK, data } = response;
      if (typeof data === 'undefined') {
        res.status(status).end();
        return;
      }

      res.status(status).json(data);
    } catch (error) {
      next(error);
    }
  };
}
