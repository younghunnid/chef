"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tokenReceived, setTokenReceived] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is coming from a password reset email (with a #access_token in URL)
    // Supabase automatically handles the session exchange for password reset tokens.
    // If a session is active, it means the token was successfully processed.
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        setTokenReceived(true);
      } else {
        setError("Invalid or expired password reset link.");
      }
    });
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage("Your password has been updated successfully!");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router.push("/login"); // Redirect to login after successful update
      }, 3000);
    }
    setLoading(false);
  };

  if (!tokenReceived) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 text-center">
          {loading ? (
             <p className="text-gray-500">Verifying reset link...</p>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold text-gray-900">Invalid Link</h1>
              <p className="mt-2 text-gray-500 font-medium">
                {error || "The password reset link is invalid or has expired. Please request a new one."}
              </p>
              <Link href="/forgot-password" className="text-orange-600 font-bold hover:underline">
                Request New Link
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Set New Password</h1>
          <p className="mt-2 text-gray-500 font-medium">
            Enter your new password below.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleUpdatePassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group"
          >
            {loading ? "Updating password..." : "Update Password"}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
