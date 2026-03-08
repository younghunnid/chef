"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Utensils, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  X,
  Plus,
  Save,
  Loader2,
  PieChart,
  BarChart3,
  Calendar,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function SustainabilityDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = [
    { name: "CHEF Community Bakery", status: "Profitable", revenue: "$4,200", social: "2,500 Meals Funded", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "CHEF Express Transport", status: "Operational", revenue: "$1,850", social: "3 Mobile Clinics Supported", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "CHEF Tech Hub", status: "Scaling", revenue: "$950", social: "45 Youth Trained", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveModal(null);
    alert(activeModal === 'sales' 
      ? "Enterprise revenue has been successfully recorded and allocated." 
      : "Expansion roadmap updated. Stakeholders have been notified of the strategic shift."
    );
  };

  return (
    <div className="space-y-8 pb-12 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sustainability Engine</h1>
          <p className="text-gray-500 font-medium">Monitoring social enterprises that fund our core mission.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveModal('sales')}
            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Manage Sales
          </button>
          <button 
            onClick={() => setActiveModal('expansion')}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2"
          >
            <TrendingUp size={18} />
            Expansion Plan
          </button>
        </div>
      </header>

      {/* Sustainability Stats */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <TrendingUp size={200} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Self-Funding Ratio</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-gray-900">62%</h2>
              <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                <ArrowUpRight size={16} /> +5%
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed font-medium">
              Of our administrative and operational costs are covered by our own businesses.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Monthly Business Revenue</span>
                <span className="text-gray-900">$7,000</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[70%]" />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400">
                <span>Target: $10,000 (100% Self-Funded)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldCheck size={14} /> Low Risk
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase">Last Audit</p>
              <p className="text-sm font-bold text-gray-900">Oct 01, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full"
          >
            <div className={`${project.bg} ${project.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
              <project.icon size={28} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-6 block">{project.status}</span>
            
            <div className="mt-auto space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-medium">Monthly Rev.</span>
                <span className="text-sm font-bold text-gray-900">{project.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400 font-medium">Social Impact</span>
                <span className="text-sm font-bold text-orange-600">{project.social}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sustainability Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    {activeModal === 'sales' ? <DollarSign size={20} /> : <TrendingUp size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeModal === 'sales' ? "Enterprise Revenue Entry" : "Strategic Expansion Plan"}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      {activeModal === 'sales' ? "Sustainability Ledger" : "Growth Roadmap 2026-2028"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {activeModal === 'sales' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Enterprise</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
                          <option>CHEF Community Bakery</option>
                          <option>CHEF Express Transport</option>
                          <option>CHEF Tech Hub Services</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Revenue (USD)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input required type="number" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="0.00" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Social Impact Metric (e.g. Meals Funded)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="e.g. 450 school meals" />
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-3">
                      <ShieldCheck className="text-green-600 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-green-700 font-medium">Enterprise revenue is automatically split: 40% Programs, 30% Expansion, 20% Ops, 10% Reserve.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { title: "Bakery Hub II - Paynesville", status: "High Priority", deadline: "Q1 2026" },
                        { title: "Transport Fleet Electrification", status: "Planning", deadline: "Q3 2026" },
                        { title: "Solar Power Hub - Tech Center", status: "Funding", deadline: "Q2 2026" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-500 shadow-sm">
                              <Briefcase size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{item.title}</p>
                              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">Target: {item.deadline}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase">{item.status}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Strategic Objective</label>
                      <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none resize-none" placeholder="Outline the next phase of sustainability growth..."></textarea>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        {activeModal === 'sales' ? "Record Revenue" : "Save Roadmap"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(SustainabilityDashboard, ["admin"]);
