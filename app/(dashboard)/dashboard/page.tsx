"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ArrowRight, Star, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import withAuth from "@/components/withAuth";

function DashboardLanding() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-8"
      >
        <LayoutDashboard size={40} />
      </motion.div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Welcome to your Dashboard
      </h1>
      
      <p className="text-lg text-gray-500 font-medium max-w-lg mb-12">
        We're glad to have you on board. Your role-specific portal is being configured. 
        In the meantime, you can explore our latest programs and initiatives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link 
          href="/programs" 
          className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left group"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Star size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Programs</h3>
          <p className="text-gray-500 font-medium mb-6">See how your support is making a difference in Liberia.</p>
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link 
          href="/donate" 
          className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left group"
        >
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Heart size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Support a Cause</h3>
          <p className="text-gray-500 font-medium mb-6">Your direct contribution helps us reach more children.</p>
          <div className="flex items-center gap-2 text-red-600 font-bold">
            Donate Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="mt-16 flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-widest">
        <ShieldCheck size={16} className="text-green-500" />
        Secure & Verified Portal
      </div>
    </div>
  );
}

export default withAuth(DashboardLanding);
