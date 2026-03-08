"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationForm from "@/components/donation/DonationForm";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, Heart, ShieldCheck } from "lucide-react";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-gray-50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-0 opacity-10">
          <div className="w-[600px] h-[600px] bg-orange-300 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Persuasion Content */}
            <div className="flex-1 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-orange-600 bg-orange-100 rounded-full">
                  Change a life today
                </span>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                  Your Support <br />Is Their <span className="text-orange-500">Future.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Every donation to CHEF directly funds our mission to provide food, healthcare, and education to children in Monrovia, Liberia. We don't just provide aid; we build sustainable systems for long-term change.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-bold">
                    <CheckCircle2 className="text-green-500" />
                    100% Transparency
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Track every dollar. Our public ledger shows exactly how your funds are distributed across our programs.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-bold">
                    <Globe className="text-blue-500" />
                    International Gift Aid
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    UK donors can claim Gift Aid, increasing the value of their contribution by 25% at no extra cost.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-bold text-gray-900 text-xl">The Sustainability Difference</h3>
                <p className="text-gray-600 text-sm">
                  Because of our income-generating bakery and transport projects, we cover our own administration costs. This means your donation goes directly to the children.
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Donor" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Joined by 2,400+ Donors</p>
                </div>
              </div>
            </div>

            {/* Right: Donation Form */}
            <div className="flex-1 w-full lg:max-w-[500px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <DonationForm />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
