import { Request, Response, NextFunction } from 'express';

/**
 * Express middleware that requires the authenticated user to have admin role.
 * Must be stacked after requireAuth, which validates the JWT and attaches
 * both req.user (from getUser()) and req.jwtPayload (decoded JWT claims).
 *
 * The user_role claim is injected by the custom_access_token_hook Postgres
 * function and only exists in the raw JWT — not in the getUser() response.
 *
 * Usage: router.use(requireAuth, requireAdmin)
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || !req.jwtPayload) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  if (req.jwtPayload.user_role !== 'admin') {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  next();
}
