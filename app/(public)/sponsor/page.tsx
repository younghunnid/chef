"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, Filter, Heart, Utensils, BookOpen, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChildrenService } from "@/lib/services/data";
import { Child } from "@/types";

export default function SponsorshipGallery() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChildren() {
      const data = await ChildrenService.getAllChildren();
      if (data.length === 0) {
        // Fallback mock data for prototype if DB is empty
        setChildren([
          { 
            id: "1", first_name: "Emmanuel", last_name: "Flomo", dob: "2018-05-12", location: "West Point, Monrovia", 
            photo_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
            bio: "Emmanuel dreams of becoming a doctor. He loves school but often goes without a morning meal.",
            needs_sponsorship: true, progress_food: 40, progress_health: 80, progress_education: 60 
          },
          { 
            id: "2", first_name: "Blessing", last_name: "Weah", dob: "2020-02-15", location: "New Kru Town", 
            photo_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
            bio: "Blessing is a bright young girl who loves to sing. She needs support for her primary education.",
            needs_sponsorship: true, progress_food: 30, progress_health: 50, progress_education: 20 
          },
          { 
            id: "3", first_name: "Prince", last_name: "Kollie", dob: "2016-11-20", location: "Red Light District", 
            photo_url: "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?q=80&w=600&auto=format&fit=crop",
            bio: "Prince is an aspiring coder who spends his time learning computer basics.",
            needs_sponsorship: false, progress_food: 70, progress_health: 60, progress_education: 85 
          },
        ] as any);
      } else {
        setChildren(data);
      }
      setLoading(false);
    }
    loadChildren();
  }, []);

  const calculateAge = (dob: string | null) => {
    if (!dob) return "?";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Sponsor a <span className="text-orange-500">Child</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your monthly sponsorship provides a child with life-changing food, healthcare, and education support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 sticky top-20 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
              <Filter size={18} />
              Age
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
              <Filter size={18} />
              Needs
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[500px] bg-gray-50 animate-pulse rounded-[2rem]"></div>
            ))
          ) : (
            children.map((child, i) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={child.photo_url || "/placeholder-child.jpg"} 
                    alt={child.first_name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {calculateAge(child.dob)} Years Old
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                    child.needs_sponsorship ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                  }`}>
                    {child.needs_sponsorship ? "Waiting" : "Sponsored"}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{child.first_name} {child.last_name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{child.location || "Monrovia, Liberia"}</p>
                  
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                    {child.bio}
                  </p>

                  {/* Progress Indicators */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-orange-600">
                        <Utensils size={12} />
                        {child.progress_food}%
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `${child.progress_food}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-green-600">
                        <Stethoscope size={12} />
                        {child.progress_health}%
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${child.progress_health}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-blue-600">
                        <BookOpen size={12} />
                        {child.progress_education}%
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${child.progress_education}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href={`/sponsor/${child.id}`}
                    className="mt-auto w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-orange-500 transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    {child.needs_sponsorship ? `Sponsor ${child.first_name}` : `View ${child.first_name}'s Story`}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
