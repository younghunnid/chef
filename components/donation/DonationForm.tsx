"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DonationForm() {
  const [amount, setAmount] = useState("50");
  const [frequency, setFrequency] = useState("one-time");
  const [loading, setLoading] = useState(false);

  const presets = ["25", "50", "100", "250", "500"];

  const getImpactText = (val: string) => {
    const num = parseInt(val) || 0;
    if (num <= 30) return `Provides ${num * 2} nutritional meals for children.`;
    if (num <= 60) return `Covers school supplies and books for 2 students.`;
    if (num <= 150) return `Funds a pediatric check-up and medication for 5 children.`;
    return `Supports our community bakery production for 2 full days.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Stripe redirect
    setTimeout(() => {
      window.location.href = "/donate/success";
    }, 1500);
  };

  return (
    <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
          <button
            onClick={() => setFrequency("one-time")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              frequency === "one-time" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setFrequency("monthly")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              frequency === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Amount Selection */}
        <div className="space-y-4">
          <label className="block text-center text-sm font-bold text-gray-400 uppercase tracking-widest">Select Amount (USD)</label>
          <div className="grid grid-cols-3 gap-3">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p)}
                className={`py-4 rounded-2xl font-extrabold text-xl transition-all ${
                  amount === p 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105" 
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                ${p}
              </button>
            ))}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
              <input
                type="number"
                placeholder="Other"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-200 rounded-2xl font-bold text-lg focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <motion.div 
          key={amount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4"
        >
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <Heart size={20} fill="currentColor" />
          </div>
          <p className="text-orange-900 font-medium leading-relaxed">
            <span className="font-bold">Your Impact:</span> {getImpactText(amount)}
          </p>
        </motion.div>

        {/* Payment Details (Simulation) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <CreditCard size={18} />
            Payment Information
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name on Card" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Card Number" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" required />
                <input type="text" placeholder="CVC" className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" required />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3 group"
        >
          {loading ? "Processing Securely..." : `Donate $${amount} Now`}
          {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <div className="flex items-center justify-center gap-6 text-gray-400">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
            <ShieldCheck size={16} className="text-green-500" />
            SSL Encrypted
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
            <CheckCircle2 size={16} className="text-green-500" />
            PCI Compliant
          </div>
        </div>
      </form>
    </div>
  );
}
