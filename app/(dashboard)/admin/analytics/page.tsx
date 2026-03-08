"use client";

import withAuth from '@/components/withAuth';
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  Download,
  ArrowUpRight,
  PieChart as PieChartIcon,
  BarChart3,
  Loader2,
  FileText,
  X
} from "lucide-react";
import { useState } from "react";

const donationData = [
  { month: "Sept", amount: 4200, meals: 8400 },
  { month: "Oct", amount: 5100, meals: 10200 },
  { month: "Nov", amount: 4800, meals: 9600 },
  { month: "Dec", amount: 7200, meals: 14400 },
  { month: "Jan", amount: 6400, meals: 12800 },
  { month: "Feb", amount: 8500, meals: 17000 },
];

const allocationData = [
  { name: "Direct Programs", value: 40, color: "#FF8C00" },
  { name: "Business Expansion", value: 30, color: "#2E8B57" },
  { name: "Operations", value: 20, color: "#1E3A8A" },
  { name: "Emergency Reserve", value: 10, color: "#EF4444" },
];

const sustainabilityData = [
  { name: "Bakery", donations: 3000, business: 4500 },
  { name: "Transport", donations: 2000, business: 5200 },
  { name: "Donations", donations: 8500, business: 0 },
];

function AnalyticsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const intervals = [20, 45, 75, 90, 100];
    for (const p of intervals) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(p);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsGenerating(false);
    alert("Impact Report (Q1 2026) has been generated and is ready for download.");
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Impact Analytics</h1>
          <p className="text-gray-500 font-medium">Real-time tracking of funding efficiency and program growth.</p>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-70"
        >
          {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          {isGenerating ? "Processing..." : "Generate Report"}
        </button>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Growth Rate", value: "+24.5%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Avg. Support / Child", value: "$42.00", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "New Donors", value: "128", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Efficiency", value: "94%", icon: ArrowUpRight, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Trends */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={20} className="text-orange-500" />
              Funding & Impact Growth
            </h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#FF8C00" strokeWidth={4} dot={{ r: 6, fill: '#FF8C00', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="meals" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <PieChartIcon size={20} className="text-orange-500" />
              Budget Allocation
            </h3>
          </div>
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sustainability Index */}
      <div className="bg-gray-900 p-8 rounded-[40px] text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-8">Sustainability Engine Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sustainabilityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #374151' }}
                />
                <Bar dataKey="donations" fill="#FF8C00" radius={[6, 6, 0, 0]} />
                <Bar dataKey="business" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Generation Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-orange-600">
                <FileText size={40} className="animate-bounce" />
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 mb-2">Generating Impact Report</h2>
              <p className="text-gray-500 font-medium mb-8 uppercase tracking-widest text-[10px]">Aggregating Global Data Points</p>
              
              <div className="space-y-4">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-orange-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>{progress}% Complete</span>
                  <span>Finalizing PDF...</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(AnalyticsPage, ["admin"]);
