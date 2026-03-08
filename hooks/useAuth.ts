"use client";

import { useAuth as useAuthContext } from "@/context/AuthContext";

/**
 * A simplified hook that provides access to the authentication context.
 * Redirection and role-based access are handled by the 'withAuth' HOC.
 */
export function useAuth() {
  return useAuthContext();
}
