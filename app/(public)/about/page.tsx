"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Globe, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4 block">About CHEF Foundation</span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Feeding Minds. Healing Lives. <span className="text-orange-500">One Child at a Time.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We are a humanitarian organization in Monrovia, Liberia, building sustainable futures through food, health, and education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-orange-50 p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-10 opacity-10">
              <Heart size={200} className="text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Our Mission</h2>
            <p className="text-lg text-gray-700 relative z-10 leading-relaxed">
              To ensure every child in Liberia has access to nutritious food, quality healthcare, and education. We don't stop until every child is fed, treated, and learning.
            </p>
          </div>

          <div className="bg-green-50 p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-10 opacity-10">
              <Globe size={200} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Our Vision</h2>
            <p className="text-lg text-gray-700 relative z-10 leading-relaxed">
              A Liberia where no child goes hungry, untreated, or uneducated. We envision a future where local communities are empowered to sustain their own growth.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { title: "Compassion", icon: Heart, desc: "Serving with heart." },
              { title: "Transparency", icon: ShieldCheck, desc: "Open books, always." },
              { title: "Accountability", icon: Users, desc: "Responsible impact." },
              { title: "Sustainability", icon: TrendingUp, desc: "Building specifically for the future." },
              { title: "Community", icon: Globe, desc: "Partnership over charity." },
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <value.icon className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Engine */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Beyond Traditional <br /><span className="text-orange-500">Charity.</span></h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                CHEF Foundation operates on a unique hybrid model. We believe that dependency on donations alone is not sustainable for Liberia's future. 
                <br /><br />
                That's why we built the <strong>CHEF Sustainability Engine</strong>—a series of local businesses including our community bakery, computer school, and transport fleet. These businesses generate profit that covers our administrative costs, ensuring that 100% of your donation reaches the children.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-orange-50 rounded-2xl">
                  <p className="text-2xl font-bold text-orange-600">60%+</p>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Self-Funded Ops</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <p className="text-2xl font-bold text-blue-600">100%</p>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Local Employment</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Sustainability"
                />
                <div className="absolute inset-0 bg-orange-500/20 mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
