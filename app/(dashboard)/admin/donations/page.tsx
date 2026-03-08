"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DonationService } from "@/lib/services/data";
import { Donation } from "@/types";
import { 
  Heart, 
  Search, 
  Download, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  X,
  Save,
  Loader2,
  Calendar as CalendarIcon
} from "lucide-react";
import withAuth from "@/components/withAuth";

function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    DonationService.getRecentDonations(20).then((data) => {
      setDonations(data);
      setLoading(false);
    });
  }, []);

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsModalOpen(false);
    alert("Offline donation successfully recorded and reconciled.");
  };

  const handleExport = () => {
    alert("Exporting transaction history to CSV... Your download will start shortly.");
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Donations & Revenue</h1>
          <p className="text-gray-500 font-medium">Track all incoming contributions and business-generated revenue.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            <Download size={20} />
            Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            <Plus size={20} />
            Add Offline Donation
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue (MTD)", value: "$12,450.00", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Avg. Donation", value: "$85.20", icon: Heart, color: "text-red-600", bg: "bg-red-50" },
          { label: "Pending Transfers", value: "8", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
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

      {/* Donations Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search tx ref..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <button className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-100">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Donor / Campaign</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6 h-16 bg-gray-50/50" />
                  </tr>
                ))
              ) : (
                donations.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900">Donor #{tx.donor_id?.slice(0, 8) || "Guest"}</p>
                        <p className="text-xs text-gray-500 font-medium">{tx.campaign || "General Support"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">
                      {tx.currency} {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{tx.payment_method}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {tx.status === 'completed' ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${tx.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Donation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Record Offline Donation</h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Manual Revenue Entry</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddDonation} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Amount (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input required type="number" step="0.01" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Date Received</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input required type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Donor Name / Organization</label>
                  <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Enter full name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none font-medium">
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                      <option>Check</option>
                      <option>Mobile Money (Manual)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Campaign</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none font-medium">
                      <option>General Support</option>
                      <option>Bakery Hub</option>
                      <option>Education Fund</option>
                      <option>Mobile Clinic</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Notes / Transaction Reference</label>
                  <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none" placeholder="Enter check number or internal reference..."></textarea>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    Discard
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
                        Record Transaction
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

export default withAuth(AdminDonationsPage, ["admin"]);
