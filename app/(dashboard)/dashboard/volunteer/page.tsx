"use client";

import { motion } from "framer-motion";
import { 
  HandHelping, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageSquare,
  Users,
  Award
} from "lucide-react";
import withAuth from "@/components/withAuth";

function VolunteerDashboard() {
  const stats = [
    { label: "Total Hours", value: "124", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Tasks Done", value: "18", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Impact Score", value: "98", icon: Award, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Volunteer Portal</h1>
          <p className="text-gray-500 font-medium">Manage your assignments and track your contribution to Liberia's growth.</p>
        </div>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
          <Calendar size={18} />
          Sign Up for Shifts
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Task Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 px-2">Assigned Tasks</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "Bakery Hub Morning Shift", time: "06:00 AM - 10:00 AM", location: "Sinkor Hub", date: "Tomorrow", priority: "High" },
              { title: "School Supply Sorting", time: "02:00 PM - 05:00 PM", location: "Central Warehouse", date: "Oct 15", priority: "Medium" },
              { title: "Mobile Clinic Support", time: "08:00 AM - 04:00 PM", location: "West Point", date: "Oct 18", priority: "High" },
            ].map((task, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${task.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <HandHelping size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock size={14} /> {task.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <MapPin size={14} /> {task.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-orange-600">
                        <Calendar size={14} /> {task.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all">
                  Check In
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Communication & Impact */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="text-green-400" size={20} />
                Your Community Impact
              </h3>
              <p className="text-sm text-gray-400 mb-8 font-medium">Your contribution has helped <strong>450+ children</strong> this month.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span>Level 4 Volunteer</span>
                  <span className="text-green-400">85% to Level 5</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%]" />
                </div>
              </div>
              
              <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                View Impact Badge
              </button>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-orange-500" />
              Latest Updates
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Bakery Hub</p>
                <p className="text-sm text-gray-700 font-medium">New automated ovens installed. Training required for morning shift.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Admin</p>
                <p className="text-sm text-gray-700 font-medium">Volunteer meeting on Saturday at 10 AM.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default withAuth(VolunteerDashboard, ["volunteer", "admin"]);
