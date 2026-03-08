"use client";

import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mounted = useRef(false);

  // Helper to fetch role
  const fetchUserRole = async (userObj: User | null) => {
    if (!userObj) {
      console.log("AuthContext: No user object");
      return null;
    }
    try {
      let rawRole = null;

      // 1. Metadata Check
      if (userObj.user_metadata?.role) {
        rawRole = userObj.user_metadata.role;
        console.log("AuthContext: Role in metadata:", rawRole);
      } else {
        // 2. Database Check
        console.log("AuthContext: Checking DB for UID:", userObj.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userObj.id)
          .maybeSingle();

        if (error) console.error("AuthContext: DB Error:", error);
        rawRole = data?.role;
        console.log("AuthContext: Role in DB:", rawRole);
      }

      if (!rawRole) return null;

      // Ensure it's a string and normalized
      const normalizedRole = String(rawRole).toLowerCase().trim();
      console.log("AuthContext: Normalized role:", normalizedRole);
      return normalizedRole;
    } catch (err) {
      console.error("AuthContext: Fetch exception:", err);
      return null;
    }
  };

  useEffect(() => {
    mounted.current = true;

    const initializeAuth = async () => {
      try {
        // Get initial session safely
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          // If we get a "Failed to fetch" here, it's often transient or network related
          console.warn("Auth initialization warning:", error.message);
        }

        if (mounted.current) {
          setSession(initialSession);
          setUser(initialSession?.user || null);
          if (initialSession?.user) {
            const role = await fetchUserRole(initialSession.user);
            if (mounted.current) setUserRole(role);
          }
        }
      } catch (err) {
        // Catch critical "Failed to fetch" or other network errors
        console.error("Critical Auth Initialization Error:", err);
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    initializeAuth();

    // Set up listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted.current) return;

        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          const role = await fetchUserRole(currentSession.user);
          if (mounted.current) setUserRole(role);
        } else {
          setUserRole(null);
        }

        if (event === 'SIGNED_OUT') {
          router.push("/login");
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setUserRole(null);
      router.push("/login");
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, userRole, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
