"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { session, loading: authLoading, userRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If a session already exists and auth is finished loading, 
    // we redirect to the appropriate dashboard
    if (!authLoading && session) {
      redirectToDashboard(userRole);
    }
  }, [session, authLoading, userRole, router]);

  const redirectToDashboard = (role: string | null) => {
    switch (role) {
      case "admin":
        router.replace("/admin");
        break;
      case "donor":
        router.replace("/dashboard/donor");
        break;
      case "doctor":
        router.replace("/doctor");
        break;
      case "volunteer":
        router.replace("/dashboard/volunteer");
        break;
      case "sponsor":
        router.replace("/dashboard/sponsor");
        break;
      case "partner":
        router.replace("/dashboard/partner");
        break;
      default:
        // For default or unknown roles, we send them to programs
        // which acts as a general landing area for any authenticated user.
        router.replace("/programs");
        break;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // Successful login will trigger onAuthStateChange in AuthContext,
      // and the useEffect above will handle the redirection.
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-wide">Connecting...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of login form if already authenticated
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">Accessing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT SIDE: Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Heart className="text-white" size={20} />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">
                CHEF
              </span>
            </Link>

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-gray-500 font-medium">
              Log in to manage your impact and contributions.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px]">
                    Password
                  </label>

                  <Link href="/forgot-password" className="text-xs font-bold text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

          </form>

          <p className="text-center text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-orange-600 font-bold hover:underline">
              Sign up for free
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE: Visual Content */}
      <div className="hidden lg:block relative overflow-hidden bg-gray-900 rounded-l-3xl">

        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105"
          alt="Impact"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 p-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md"
          >
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
              "Every meal shared is a future secured."
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>

              <div>
                <p className="text-white font-bold text-lg">Jefferson Doe</p>
                <p className="text-orange-400 font-medium">
                  CHEF Founder, Monrovia
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
}
