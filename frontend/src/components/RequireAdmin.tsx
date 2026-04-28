import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { getJwtPayload } from "../utils/jwt";

interface RequireAdminProps {
  children: React.ReactNode;
}

/**
 * Route guard that allows only authenticated users whose JWT carries
 * user_role === 'admin' (injected by the custom_access_token_hook).
 *
 * - No session → redirect /login
 * - Authenticated but not admin → redirect /dashboard
 * - Admin → render children
 *
 * The role lives only in the JWT payload, not in session.user.app_metadata,
 * so we decode the access_token directly. Max staleness = JWT TTL (~1 hour).
 */
export function RequireAdmin({ children }: RequireAdminProps) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      if (session) {
        const payload = getJwtPayload(session.access_token);
        setIsAdmin(payload.user_role === "admin");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red1 to-red3 flex items-center justify-center">
        <p className="text-white font-poppins text-2xl">Loading...</p>
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
