"use client";

import { motion } from "framer-motion";
import { BookOpen, Utensils, Stethoscope, ArrowRight, Heart, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProgramsPage() {
  const programs = [
    {
      title: "Education Program",
      description: "Empowering children with books, scholarships, and digital literacy labs.",
      icon: BookOpen,
      href: "/programs/education",
      color: "text-blue-600",
      bg: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
    },
    {
      title: "Food & Nutrition",
      description: "Our community bakery and school feeding programs fight childhood hunger.",
      icon: Utensils,
      href: "/programs/food",
      color: "text-orange-600",
      bg: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Health & Wellness",
      description: "Mobile clinics and digital health records ensuring care for every child.",
      icon: Stethoscope,
      href: "/programs/health",
      color: "text-green-600",
      bg: "bg-green-50",
      image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-6"
            >
              <ShieldCheck size={16} className="text-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Our Core Mission</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Holistic Care for Every Child
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              CHEF Liberia operates three primary pillars of support, ensuring that health, hunger, and education are never barriers to a child's success.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={program.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={program.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className={`${program.bg} ${program.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                      <program.icon size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-1">
                    {program.description}
                  </p>
                  <Link 
                    href={program.href} 
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all group-hover:gap-3"
                  >
                    View Program Details
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="mt-32 p-12 bg-gray-900 rounded-[40px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Globe size={300} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Want to make a direct impact?</h2>
              <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed">
                Whether you're a doctor looking to volunteer, a donor wanting to sponsor a child, or a corporate partner seeking to fund an entire program, we have a place for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20">
                  Join our Network
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/20 transition-all">
                  Contact our Team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
