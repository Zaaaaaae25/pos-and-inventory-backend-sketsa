import { optionalAuth } from '../../Interfaces/Middlewares/AuthMiddleware.js';

export default function registerAuthContainer({ container, overrides = {} }) {
  const authMiddleware = overrides.optionalAuth ?? optionalAuth;
  container.set('optionalAuth', authMiddleware);
}
