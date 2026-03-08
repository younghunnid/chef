"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldAlert, UserCircle, ChevronDown, ChevronUp, Code } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UnauthorizedPage() {
  const { userRole, session } = useAuth();
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="text-center bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Lock className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Access Restricted</h1>
        
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          You do not have the required permissions to view this administrative portal. 
          Please ensure you are logged in with an authorized account.
        </p>

        {session && (
          <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left">
            <div className="flex items-center gap-3 mb-4">
              <UserCircle className="text-gray-400" size={20} />
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Current Session Info</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-bold">Email:</span> {session.user.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Detected Role:</span> 
                <span className={`ml-2 px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${userRole === 'admin' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {userRole || "No Role Assigned"}
                </span>
              </p>
            </div>

            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
            >
              <Code size={14} />
              {showDebug ? "Hide" : "Show"} Debug Details
              {showDebug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showDebug && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-4 p-4 bg-gray-900 rounded-xl overflow-hidden"
              >
                <pre className="text-[10px] text-green-400 font-mono overflow-x-auto">
                  {JSON.stringify({
                    id: session.user.id,
                    metadata: session.user.user_metadata,
                    role_source: "AuthContext.fetchUserRole"
                  }, null, 2)}
                </pre>
              </motion.div>
            )}

            {!userRole && (
              <p className="mt-6 text-xs text-orange-600 font-medium flex items-start gap-2 pt-6 border-t border-gray-200">
                <ShieldAlert size={14} className="shrink-0" />
                Note: Standard users cannot access admin tools. To fix this, manually set the "role" to "admin" in your Supabase Dashboard (Auth &rarr; Users &rarr; Edit Metadata).
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-gray-200 text-base font-bold rounded-xl text-gray-600 hover:bg-gray-50 transition-all gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link
            href="/login"
            className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-orange-500 text-white text-base font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
