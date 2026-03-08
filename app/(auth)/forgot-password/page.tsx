"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // Make sure to create this page
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Check your email for the password reset link!");
      setEmail("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 mb-8 text-gray-500 hover:text-orange-600">
            <ArrowLeft size={18} />
            Back to Login
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Forgot your password?</h1>
          <p className="mt-2 text-gray-500 font-medium">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                placeholder="name@example.com"
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
            {loading ? "Sending link..." : "Send Reset Link"}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
