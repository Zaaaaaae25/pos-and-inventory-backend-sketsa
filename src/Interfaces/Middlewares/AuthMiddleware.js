import AppError from '../../Commons/Errors/AppError.js';
import HttpStatus from '../../Commons/Constants/HttpStatus.js';
import { verifyToken } from '../../Commons/Utils/JwtHelper.js';

export function optionalAuth(req, res, next) {
  req.user = null;

  const authorization = req.get('authorization');
  if (!authorization) {
    next();
    return;
  }

  const [scheme, token] = authorization.split(' ');

  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
    next(new AppError('Invalid authorization header', HttpStatus.UNAUTHORIZED));
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', HttpStatus.UNAUTHORIZED));
  }
}
