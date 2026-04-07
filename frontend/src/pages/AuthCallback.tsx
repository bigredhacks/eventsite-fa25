import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes - detectSessionInUrl handles the code exchange
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        // Ignore these events
      }
    });

    // Also check if session already exists (in case onAuthStateChange already fired)
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };

    // Small delay to let detectSessionInUrl process the URL first
    const timeout = setTimeout(checkExistingSession, 100);

    // Fallback: if no session after 5 seconds, redirect to login
    const fallbackTimeout = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
      clearTimeout(fallbackTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red1 to-red3 flex items-center justify-center">
      <p className="text-white font-poppins text-2xl">Signing you in...</p>
    </div>
  );
}
