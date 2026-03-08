"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Share2, CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-48 pb-32 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl space-y-6"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900">Thank you for your <span className="text-orange-500">kindness.</span></h1>
          <p className="text-xl text-gray-500 font-medium">
            Your contribution has been received. A child in Monrovia will feel the direct impact of your generosity today.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donor" className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              View Your Impact Dashboard
              <ArrowRight size={18} />
            </Link>
            <button className="px-8 py-4 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Share2 size={18} />
              Share the Mission
            </button>
          </div>
        </motion.div>

        {/* Impact Certificate Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] max-w-lg w-full bg-gray-50/50"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction Success</p>
              <p className="text-lg font-bold text-gray-900">Gift ID: #CHEF-99201</p>
            </div>
            <Heart className="text-orange-500" fill="currentColor" />
          </div>
          <p className="text-sm text-gray-500 text-left leading-relaxed">
            A confirmation email has been sent to your inbox. You can now log in to your **Donor Portal** to write letters to children, track meal distributions, and download your annual tax receipts.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
