"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  User, 
  TrendingUp, 
  Calendar,
  Download,
  MessageCircle
} from "lucide-react";
import withAuth from "@/components/withAuth"; // Import the withAuth HOC

function DonorDashboard() { // Changed to a regular function component
  return (
    <div className="space-y-8">
      {/* Donor Profile Header */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
            JS
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hello, John Smith</h1>
            <p className="text-gray-500">You've supported 3 children since August 2024</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => alert("Tax Receipts button clicked!")} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all">
            <Download size={18} />
            Tax Receipts
          </button>
          <button onClick={() => alert("Give Again button clicked!")} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
            <Heart size={18} />
            Give Again
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sponsored Children */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Your Sponsored Children</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Emmanuel Flomo", age: 8, school: "Monrovia Central", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200&auto=format&fit=crop" },
              { name: "Prince Kollie", age: 10, school: "Faith Academy", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=200&auto=format&fit=crop" }
            ].map((child, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={child.image} alt={child.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900">{child.name}</h3>
                    <p className="text-sm text-gray-500">{child.age} years old • {child.school}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert("Write Letter button clicked!")} className="flex-1 py-2 rounded-lg bg-orange-50 text-orange-600 text-sm font-bold hover:bg-orange-100 transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    Write Letter
                  </button>
                  <button onClick={() => alert("View Progress button clicked!")} className="flex-1 py-2 rounded-lg border border-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-all">
                    View Progress
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Impact Summary</h2>
          <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Heart size={120} />
            </div>
            
            <div className="relative z-10">
              <p className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-2">Total Contribution</p>
              <p className="text-4xl font-extrabold">$2,450.00</p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-gray-400 text-xs mb-1">Meals Provided</p>
                <p className="text-xl font-bold text-orange-400">420</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-gray-400 text-xs mb-1">Books Funded</p>
                <p className="text-xl font-bold text-green-400">12</p>
              </div>
            </div>

            <button onClick={() => alert("Download Annual Impact Report button clicked!")} className="w-full py-4 bg-orange-500 rounded-xl font-bold hover:bg-orange-600 transition-all relative z-10">
              Download Annual Impact Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DonorDashboard, ["donor"]);