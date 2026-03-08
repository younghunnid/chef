"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect, useState } from "react";

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[] = [] // Optional: specify roles that can access this page
) {
  const ComponentWithAuth = (props: P) => {
    const { session, loading, userRole } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      // Don't do anything while auth is loading
      if (loading) return;

      console.log("withAuth: Checking access for", session ? "Authenticated user" : "Unauthenticated user");
      console.log("withAuth: Current role is:", userRole);
      console.log("withAuth: Allowed roles are:", allowedRoles);

      // No session - redirect to login
      if (!session) {
        console.warn("withAuth: No session, redirecting to login");
        router.replace("/login");
        return;
      }

      // 1. If no specific roles are required, anyone logged in can access
      if (allowedRoles.length === 0) {
        console.log("withAuth: Access granted (no specific roles required)");
        setIsAuthorized(true);
        return;
      }

      // 2. If roles ARE required, but we don't have a role yet (null or empty)
      // We allow access temporarily for stability as per requirements
      if (!userRole) {
        console.log("withAuth: Role missing but allowing temporarily for stability");
        setIsAuthorized(true);
        return;
      }

      // 3. If we HAVE a role, check if it's allowed
      const normalizedUserRole = String(userRole || "").toLowerCase().trim();
      const normalizedAllowedRoles = allowedRoles.map(r => String(r).toLowerCase().trim());

      // SPECIAL CASE: Admins have full access to everything for stability and management
      if (normalizedUserRole === "admin") {
        console.log("withAuth: Super-user access granted for Admin");
        setIsAuthorized(true);
        return;
      }

      console.log("withAuth: Normalized Role Check:", {
        user: normalizedUserRole,
        allowed: normalizedAllowedRoles,
        match: normalizedAllowedRoles.includes(normalizedUserRole)
      });

      if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
        console.error(`withAuth: Unauthorized. Role "${normalizedUserRole}" is not in [${normalizedAllowedRoles.join(", ")}]`);
        router.replace("/unauthorized");
        return;
      }

      // If all checks pass, the user is authorized
      console.log(`withAuth: Access granted for role: ${userRole}`);
      setIsAuthorized(true);
    }, [session, loading, userRole, allowedRoles, router]);

    // Handle initial loading state
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium tracking-wide">Authenticating...</p>
          </div>
        </div>
      );
    }

    // Only render the component if authorized
    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
}

function getDisplayName<P extends object>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
