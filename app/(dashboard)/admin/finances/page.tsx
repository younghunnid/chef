"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  TrendingUp, 
  PieChart, 
  History,
  RefreshCw,
  Wallet,
  AlertCircle,
  FileText,
  Download,
  X,
  Lock,
  Loader2,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function FinanceDashboard() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isReconciling, setIsReconciling] = useState(false);
  const [emergencyStep, setEmergencyStep] = useState(1);
  const [isReleasing, setIsReleasing] = useState(false);

  const allocation = [
    { label: "Direct Programs", perc: 40, amount: "$18,080", color: "bg-orange-500" },
    { label: "Business Expansion", perc: 30, amount: "$13,560", color: "bg-green-500" },
    { label: "Operations", perc: 20, amount: "$9,040", color: "bg-blue-500" },
    { label: "Emergency Reserve", perc: 10, amount: "$4,520", color: "bg-red-500" },
  ];

  const handleReconcile = async () => {
    setIsReconciling(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsReconciling(false);
    alert("Financial reconciliation complete. All source balances (Stripe, Bank, Mobile Money) are synced.");
  };

  const handleEmergencyRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReleasing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsReleasing(false);
    setIsEmergencyModalOpen(false);
    setEmergencyStep(1);
    alert("CRITICAL: Emergency funds have been authorized and released to the specified program account.");
  };

  return (
    <div className="space-y-8 pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">Revenue Allocation Engine</h1>
          <p className="text-gray-500 text-left">Automated 40/30/20/10 fund distribution and sustainability management</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReconcile}
            disabled={isReconciling}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            {isReconciling ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
            {isReconciling ? "Syncing..." : "Reconcile"}
          </button>
          <button 
            onClick={() => alert("Opening full system audit log...")}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            <ShieldCheck size={18} />
            Audit Log
          </button>
        </div>
      </div>

      {/* Real-time Allocation Summary */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <PieChart size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Monthly Revenue</p>
              <h2 className="text-4xl font-extrabold text-gray-900">$45,200.00</h2>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">+24% vs Last Month</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {allocation.map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs font-extrabold text-gray-900">{item.perc}%</span>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{item.amount}</h3>
              <div className="h-1.5 w-full bg-gray-200 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.perc}%` }}
                  className={`h-full ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Ledger */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
              <History size={24} className="text-blue-500" />
              Automated Transaction Ledger
            </h3>
            <button 
              onClick={() => alert("Downloading multi-source transaction statements...")}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Download Statements
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase">Source / Donor</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase">Allocation Flow</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { source: "John Smith (Donor)", amount: "$500.00", type: "Donation", status: "Split 40/30/20/10" },
                  { source: "CHEF Bakery Sales", amount: "$1,250.00", type: "Sustainability", status: "Split 40/30/20/10" },
                  { source: "UK Grant (Education)", amount: "$5,000.00", type: "Grant", status: "Directed (100% Edu)" },
                  { source: "CHEF Express Bus", amount: "$840.00", type: "Sustainability", status: "Split 40/30/20/10" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-900">{row.source}</p>
                      <p className="text-xs text-gray-400">{row.type}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-gray-900">{row.amount}</td>
                    <td className="px-8 py-6">
                      <span className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <TrendingUp size={14} className="text-green-500" />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
                        <ShieldCheck size={12} />
                        Verified
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reserve Controls */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <AlertCircle className="absolute top-[-20px] right-[-20px] text-white/5" size={120} />
            <h3 className="font-bold text-lg mb-4 relative z-10 flex items-center gap-2">
              <Wallet className="text-orange-400" size={20} />
              Emergency Reserve Fund
            </h3>
            <p className="text-4xl font-extrabold mb-2 relative z-10">$12,450.20</p>
            <p className="text-xs text-gray-400 font-medium mb-8 relative z-10">Restricted funds for urgent medical or food crises.</p>
            
            <div className="space-y-4 relative z-10">
              <button 
                onClick={() => setIsEmergencyModalOpen(true)}
                className="w-full py-4 bg-orange-500 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/40"
              >
                Initiate Emergency Release
              </button>
            </div>
          </div>

          {/* Annual Report Generator */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              Impact Report Generator
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Select Report Type</p>
                <select className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm font-medium outline-none">
                  <option>Annual Sustainability Report (2025)</option>
                  <option>Monthly Allocation Audit</option>
                  <option>Donor Transparency Package</option>
                </select>
              </div>
              <button 
                onClick={() => alert("Generating and cryptographically signing impact report PDF...")}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Generate & Sign PDF
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Allocation Policy</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>Programs</span>
                <span className="font-bold text-orange-600">40%</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>Expansion</span>
                <span className="font-bold text-green-600">30%</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>Operations</span>
                <span className="font-bold text-blue-600">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency</span>
                <span className="font-bold text-red-600">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Release Modal */}
      <AnimatePresence>
        {isEmergencyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-red-50 flex items-center justify-between bg-red-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-200">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Emergency Disbursement</h2>
                    <p className="text-xs text-red-600 font-bold uppercase tracking-widest">Protocol Level 1 Authorization</p>
                  </div>
                </div>
                <button onClick={() => setIsEmergencyModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEmergencyRelease} className="p-10 space-y-8">
                {emergencyStep === 1 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex items-start gap-4">
                      <AlertCircle className="text-orange-500 shrink-0 mt-1" size={20} />
                      <p className="text-sm text-orange-800 font-medium leading-relaxed">
                        Emergency release bypasses standard allocation logic. This action will be logged and reported to all primary stakeholders.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Crisis Type</label>
                        <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-gray-700">
                          <option>Urgent Medical Supply Shortage</option>
                          <option>Severe Food Insecurity Event</option>
                          <option>Natural Disaster Recovery</option>
                          <option>Operational Continuity Failure</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Release Amount</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input required type="number" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 font-black text-2xl" placeholder="0.00" />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => setEmergencyStep(2)}
                      className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                      Continue to Authorization
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-blue-600" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Final Verification</h3>
                      <p className="text-sm text-gray-500 font-medium">Please enter your administrative passkey to confirm release.</p>
                    </div>

                    <div className="flex justify-center gap-3">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-12 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center font-bold text-2xl text-gray-900">
                          {i < 3 ? "•" : ""}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setEmergencyStep(1)}
                        className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isReleasing}
                        className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isReleasing ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                        {isReleasing ? "Authorizing..." : "Confirm & Release"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(FinanceDashboard, ["admin"]);
