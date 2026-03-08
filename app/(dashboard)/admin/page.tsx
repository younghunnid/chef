"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImpactService } from "@/lib/services/data";
import { ImpactStats } from "@/types";
import { 
  Users, 
  Heart, 
  Utensils, 
  Stethoscope, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import withAuth from "@/components/withAuth"; // Import the withAuth HOC

function AdminDashboard() {
  const [stats, setStats] = useState<ImpactStats | null>(null);

  useEffect(() => {
    ImpactService.getGlobalStats().then(setStats);
  }, []);

  const statCards = stats ? [
    { label: "Total Children", value: stats.total_children.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Donations", value: `$${stats.total_donations.toLocaleString()}`, icon: Heart, color: "text-red-600", bg: "bg-red-50" },
    { label: "Meals Distributed", value: stats.meals_served.toLocaleString(), icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Health Checks", value: stats.health_checks.toLocaleString(), icon: Stethoscope, color: "text-green-600", bg: "bg-green-50" },
  ] : [];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!stats ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl" />
          ))
        ) : (
          statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                  <TrendingUp size={16} />
                  +12%
                </span>
              </div>
              <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Recent Impact Distribution</h3>
            <button 
              onClick={() => alert("Redirecting to detailed impact distribution logs...")}
              className="text-orange-500 text-sm font-bold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">500 Loaves Distributed</p>
                    <p className="text-sm text-gray-500">School Feeding Program - West Point Community</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Required / Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <AlertCircle size={20} />
              <h3 className="font-bold">Pending Approvals</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">New Doctors</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Sponsorship Applications</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Volunteer Reviews</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">8</span>
              </div>
              <button 
                onClick={() => alert("Opening Approvals Hub...")}
                className="w-full mt-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
              >
                Review Now
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg mb-2">Bakery Revenue</h3>
            <p className="opacity-80 mb-4 text-sm font-medium">Funds 60% of daily meals</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold">$1,250.00</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-lg">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, ["admin"]);
