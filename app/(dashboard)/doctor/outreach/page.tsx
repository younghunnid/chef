"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import withAuth from "@/components/withAuth";

function OutreachPortal() {
  const upcomingCampaigns = [
    {
      title: "West Point Community Health Day",
      date: "Oct 15, 2025",
      location: "West Point Community Center",
      expectedPatients: 200,
      volunteersNeeded: 5,
    },
    {
      title: "New Kru Town Nutrition Drive",
      date: "Nov 02, 2025",
      location: "New Kru Town High School",
      expectedPatients: 350,
      volunteersNeeded: 8,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Community Outreach</h1>
        <p className="text-gray-500 font-medium">Coordinate medical field visits and community health campaigns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Management */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Campaigns</h2>
            <button className="text-orange-600 font-bold text-sm hover:underline">Create New</button>
          </div>

          <div className="space-y-4">
            {upcomingCampaigns.map((camp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-orange-200 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{camp.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar size={14} />
                      {camp.date}
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Confirmed</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                      <MapPin size={14} className="text-orange-500" />
                      {camp.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                      <Users size={14} className="text-blue-500" />
                      {camp.expectedPatients} Patients
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-300 group-hover:text-orange-500 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Map Placeholder */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1548138034-79f18009b0ba?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Liberia Map"
            />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Heart size={24} className="text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Impact Geographic</h2>
              <p className="text-gray-400 font-medium max-w-xs">Tracking medical service delivery across 15 counties in Liberia.</p>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Montserrado</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[65%]" />
              </div>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-widest cursor-pointer hover:underline">
                View Detailed Coverage Map
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(OutreachPortal, ["doctor", "admin"]);
