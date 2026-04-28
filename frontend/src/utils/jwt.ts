/**
 * Decodes the payload of a JWT without verifying the signature.
 * Only call this after the token has been validated server-side or
 * via supabase.auth.getSession() (which Supabase validates automatically).
 *
 * Custom claims injected by Supabase Auth Hooks (e.g. user_role) only
 * live in the JWT payload — they are NOT returned by supabase.auth.getUser().
 */
export function getJwtPayload(token: string): Record<string, unknown> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}
