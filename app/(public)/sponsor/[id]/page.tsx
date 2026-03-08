"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Utensils, 
  Stethoscope, 
  BookOpen, 
  ArrowLeft,
  Share2,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data for the dynamic page (In production, this would fetch from Supabase)
const childrenData = {
  "1": { 
    name: "Emmanuel Flomo", 
    age: 8, 
    location: "West Point, Monrovia", 
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    bio: "Emmanuel is a bright 8-year-old living in the West Point community. He dreams of becoming a pediatric doctor one day because he wants to help other children in his neighborhood stay healthy. He is currently in the 3rd grade and his favorite subject is Science.",
    story: "Born into a family of five, Emmanuel's parents struggle to find consistent work in the local market. Despite the challenges, Emmanuel remains one of the top students in his class. His primary challenge is nutrition; he often attends school on an empty stomach, which affects his concentration and growth. Through CHEF Foundation, we aim to provide him with daily bread from our bakery and cover his full tuition and medical check-ups.",
    needs: [
      { label: "Daily Nutritional Meals", icon: Utensils, status: "Critical" },
      { label: "3rd Grade Tuition & Books", icon: BookOpen, status: "Partial" },
      { label: "Annual Health Screening", icon: Stethoscope, status: "Pending" }
    ],
    progress: { food: 40, health: 80, edu: 60 },
    updates: [
      { date: "Feb 12, 2026", title: "New School Uniform", desc: "Emmanuel received his new school uniform and kit today!", icon: CheckCircle2 },
      { date: "Jan 15, 2026", title: "Monthly Health Check", desc: "Weight and height check completed. General health is good.", icon: Stethoscope },
      { date: "Dec 20, 2025", title: "Bakery Enrollment", desc: "Added to the daily bread distribution list at West Point Elementary.", icon: Utensils }
    ]
  }
};

export default function ChildProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const child = childrenData[id as keyof typeof childrenData] || childrenData["1"];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/sponsor" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-bold mb-8 transition-colors">
            <ArrowLeft size={18} />
            Back to Children
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Image & Quick Stats */}
            <div className="flex-1 lg:max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
              >
                <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h1 className="text-4xl font-extrabold">{child.name}</h1>
                  <p className="flex items-center gap-2 opacity-90 font-medium">
                    <MapPin size={18} /> {child.location}
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-orange-50 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Age</p>
                  <p className="text-xl font-bold text-gray-900">{child.age} yrs</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-xl font-bold text-gray-900">Waiting</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Goal</p>
                  <p className="text-xl font-bold text-gray-900">$35/mo</p>
                </div>
              </div>
            </div>

            {/* Right: Story & Sponsorship Action */}
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">The Story of {child.name.split(' ')[0]}</h2>
                  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-orange-500 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed italic">
                  "{child.bio}"
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {child.story}
                </p>
              </div>

              {/* Impact Bars */}
              <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                <h3 className="font-bold text-gray-900 text-xl">Current Support Level</h3>
                <div className="space-y-5">
                  {[
                    { label: "Food Security", val: child.progress.food, color: "bg-orange-500", icon: Utensils },
                    { label: "Healthcare Access", val: child.progress.health, color: "bg-green-500", icon: Stethoscope },
                    { label: "Education Quality", val: child.progress.edu, color: "bg-blue-500", icon: BookOpen },
                  ].map((p, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-gray-700">
                        <span className="flex items-center gap-2"><p.icon size={16} /> {p.label}</span>
                        <span>{p.val}%</span>
                      </div>
                      <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.val}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className={`h-full ${p.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Link 
                  href="/donate" 
                  className="w-full py-6 bg-orange-500 text-white rounded-[2rem] font-bold text-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3 group"
                >
                  <Heart fill="white" size={24} />
                  Sponsor {child.name.split(' ')[0]} Now
                </Link>
                <p className="text-center text-sm text-gray-400 font-medium mt-4">
                  100% of your sponsorship goes to {child.name}'s specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact Timeline</h2>
            <p className="text-gray-500">Track the milestones and updates for {child.name}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {child.updates.map((update, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-orange-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <update.icon size={18} />
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-900">{update.title}</div>
                    <time className="font-bold text-xs text-orange-600 uppercase">{update.date}</time>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">{update.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
