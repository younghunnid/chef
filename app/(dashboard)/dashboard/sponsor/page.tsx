"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  History, 
  Download, 
  Calendar, 
  ArrowRight,
  Utensils,
  Stethoscope,
  BookOpen,
  Send,
  Users // Import Users from lucide-react
} from "lucide-react";
import Link from "next/link";
import withAuth from "@/components/withAuth"; // Import the withAuth HOC

function SponsorDashboard() { // Changed to a regular function component
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
            JS
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, John Smith</h1>
            <p className="text-gray-500">Sponsoring Emmanuel Flomo since August 2024</p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all">
            <Download size={18} />
            Impact Report
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
            <Heart size={18} />
            Extra Gift
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Child Progress Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-orange-50/30">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Users className="text-orange-500" size={20} />
                Emmanuel's Latest Update
              </h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Feb 2026</span>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300&auto=format&fit=crop" 
                  alt="Emmanuel" 
                  className="w-full md:w-48 h-64 md:h-48 rounded-2xl object-cover shadow-md"
                />
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Academic Breakthrough!</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Emmanuel has shown exceptional progress in his Science class this month. He recently completed a project on local plant life and received an 'A' grade. His attendance is at 98%.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-2">
                        <Utensils size={18} />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nutrition</p>
                      <p className="font-bold text-gray-900">Good</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-2">
                        <Stethoscope size={18} />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Health</p>
                      <p className="font-bold text-gray-900">Healthy</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-2">
                        <BookOpen size={18} />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Education</p>
                      <p className="font-bold text-gray-900">Excelling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Letter Center */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <MessageCircle className="text-blue-500" size={20} />
                Letter Center
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2">
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[80%]">
                    Hello John! Thank you for the books. I am reading the one about stars every night.
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase ml-2">Emmanuel • Jan 20</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-orange-500 p-4 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%]">
                    Hi Emmanuel! I'm so glad you like the books. Keep studying hard!
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase mr-2">You • Jan 22</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Write a message to Emmanuel..." 
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <button className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Financials & Impact Stats */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs mb-4">
                <History size={16} />
                Sponsorship History
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Contributions</p>
              <h3 className="text-4xl font-extrabold mb-8">$640.00</h3>
              
              <div className="space-y-4">
                {[
                  { date: "Feb 01, 2026", amount: "$35.00", status: "Processed" },
                  { date: "Jan 01, 2026", amount: "$35.00", status: "Processed" },
                  { date: "Dec 01, 2025", amount: "$35.00", status: "Processed" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <p className="font-bold text-sm">{row.date}</p>
                      <p className="text-xs text-gray-500">Monthly Sponsorship</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{row.amount}</p>
                      <p className="text-[10px] text-green-400 font-bold uppercase">{row.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-4 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10">
                View All Transactions
              </button>
            </div>
          </div>

          {/* Quick Impact Metrics */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Your Indirect Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Utensils size={18} className="text-orange-500" />
                  <span className="text-sm font-medium">Meals Funded</span>
                </div>
                <span className="font-bold text-orange-700">124</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Stethoscope size={18} className="text-green-500" />
                  <span className="text-sm font-medium">Check-ups Funded</span>
                </div>
                <span className="font-bold text-green-700">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SponsorDashboard, ["sponsor"]);
