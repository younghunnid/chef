"use client";

import { motion } from "framer-motion";
import { Heart, Users, HandHelping, Globe } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs lg:text-sm font-bold tracking-wider uppercase text-orange-600 bg-orange-50 rounded-full">
                CHEF Foundation - Monrovia, Liberia
              </span>
              <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Feeding Minds. <br className="hidden lg:block" /><span className="text-orange-500">Healing Lives.</span> <br className="hidden lg:block" />One Child at a Time.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                Join CHEF in our mission to provide sustainable food, quality healthcare, and transformative education to children across Monrovia. 
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 max-w-lg mx-auto lg:mx-0"
            >
              <Link href="/donate" className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                <Heart size={20} />
                Donate Now
              </Link>
              <Link href="/become-volunteer" className="flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-xl text-lg font-bold hover:border-orange-200 transition-all">
                <HandHelping size={20} />
                Volunteer
              </Link>
              <Link href="/partners" className="flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-xl text-lg font-bold hover:border-green-200 transition-all">
                <Globe size={20} />
                Partner With Us
              </Link>
              <Link href="/sponsor" className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                <Users size={20} />
                Sponsor a Child
              </Link>
            </motion.div>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Placeholder for high-impact image */}
              <div className="aspect-[4/5] rounded-[2rem] bg-gray-200 overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Children in Liberia" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Impact Card Floating */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">15,000+</p>
                    <p className="text-sm text-gray-500">Children Supported</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
