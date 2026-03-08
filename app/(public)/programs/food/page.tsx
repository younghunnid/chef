"use client";

import { motion } from "framer-motion";
import { Utensils, Heart, Truck, Users, ArrowRight, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FoodProgram() {
  const initiatives = [
    {
      title: "Community Bakery Hub",
      description: "Baking 500+ fresh loaves daily to feed schools and generate sustainable income.",
      icon: Home,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "School Feeding Program",
      description: "Ensuring every student receives a warm, nutritious meal to fuel their learning.",
      icon: Utensils,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      title: "Agricultural Outreach",
      description: "Supporting local farmers to provide fresh ingredients for our feeding programs.",
      icon: Truck,
      color: "text-green-600",
      bg: "bg-green-50"
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
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Food Program"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6">
                  <Utensils size={16} className="text-orange-400" />
                  <span className="text-sm font-bold uppercase tracking-widest">Food & Nutrition</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Zero Hunger for a Brighter Future</h1>
                <p className="text-lg text-gray-300 font-medium leading-relaxed">
                  From our community bakery to school cafeterias, we are dedicated to eradicating hunger and ensuring every child in Liberia is well-nourished.
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
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Support our community bakery</h2>
              <p className="text-lg text-gray-600 font-medium mb-10">
                Our bakery not only feeds children but also provides employment for local mothers. Your support keeps the ovens running.
              </p>
              <Link 
                href="/donate" 
                className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
              >
                Donate to the Food Hub
              </Link>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
