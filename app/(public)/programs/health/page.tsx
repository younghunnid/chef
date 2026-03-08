"use client";

import { motion } from "framer-motion";
import { Stethoscope, Heart, Activity, UserPlus, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HealthProgram() {
  const initiatives = [
    {
      title: "Mobile Medical Clinics",
      description: "Bringing doctors and medicine directly to remote villages and urban slums.",
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Electronic Health Records",
      description: "Modernizing medical tracking to ensure consistent care for every child.",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Volunteer Doctor Network",
      description: "Connecting local and international medical professionals with the children who need them.",
      icon: UserPlus,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 font-bold mb-12 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Programs
          </Link>

          <div className="space-y-12 pb-20">
            <header className="relative py-16 px-8 bg-gray-900 rounded-3xl overflow-hidden text-white">
              <div className="absolute inset-0 opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173bdb999ef?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Health Program"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6">
                  <Stethoscope size={16} className="text-orange-400" />
                  <span className="text-sm font-bold uppercase tracking-widest">Health & Wellness</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Healthy Bodies, Healthy Futures</h1>
                <p className="text-lg text-gray-300 font-medium leading-relaxed">
                  Our health program provides essential medical checkups, vaccinations, and treatment to children who would otherwise have no access to healthcare.
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-orange-600 font-bold group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <section className="bg-orange-50 rounded-3xl p-12 text-center max-w-4xl mx-auto border border-orange-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Support a medical outreach</h2>
              <p className="text-lg text-gray-600 font-medium mb-10">
                Your donation helps us buy life-saving medicine and fuel our mobile clinics to reach the most isolated communities.
              </p>
              <Link 
                href="/donate" 
                className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
              >
                Sponsor a Clinic
              </Link>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
