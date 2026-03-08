"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Home, 
  TrendingUp, 
  Truck, 
  Clock, 
  Settings, 
  Plus, 
  AlertCircle,
  CheckCircle2,
  PieChart,
  X,
  Save,
  Loader2,
  Scale,
  Package,
  MapPin
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function BakeryHub() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inventory = [
    { item: "Wheat Flour", stock: "15 Bags", status: "Healthy" },
    { item: "Yeast", stock: "2 Bags", status: "Low" },
    { item: "Fuel (Diesel)", stock: "45 Liters", status: "Healthy" },
  ];

  const recentLogs = [
    { date: "Oct 08", baked: "520 Loaves", sold: "310", donated: "210", revenue: "$775" },
    { date: "Oct 07", baked: "480 Loaves", sold: "280", donated: "200", revenue: "$700" },
    { date: "Oct 06", baked: "550 Loaves", sold: "350", donated: "200", revenue: "$875" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveModal(null);
    alert(activeModal === 'batch' 
      ? "Today's production log has been saved and financial estimates updated." 
      : "Hub operational settings have been updated successfully."
    );
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bakery & Food Hub</h1>
          <p className="text-gray-500 font-medium">Production monitoring and community feeding logistics.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveModal('settings')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            <Settings size={20} />
            Hub Settings
          </button>
          <button 
            onClick={() => setActiveModal('batch')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            <Plus size={20} />
            Log Today's Batch
          </button>
        </div>
      </header>

      {/* Production Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Daily Output", value: "520", unit: "Loaves", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Revenue", value: "$775", unit: "Today", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Community Fed", value: "210", unit: "Children", icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Deliveries", value: "4", unit: "Pending", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              <span className="text-xs font-bold text-gray-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Production Log */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Batch History</h2>
            <button 
              onClick={() => alert("Opening detailed production and distribution analytics...")}
              className="text-orange-500 font-bold text-sm hover:underline"
            >
              Full Analytics
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Baked</th>
                  <th className="px-6 py-4">Sold/Donated</th>
                  <th className="px-6 py-4">Daily Revenue</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{log.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{log.baked}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-600">{log.sold} sold</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-xs font-bold text-blue-600">{log.donated} donated</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">{log.revenue}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-600">
                        <CheckCircle2 size={14} />
                        Verified
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-orange-500" />
              Stock Inventory
            </h3>
            <div className="space-y-4">
              {inventory.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.item}</p>
                    <p className="text-xs text-gray-500 font-medium">{item.stock}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.status === 'Low' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => alert("Opening bakery inventory and supply chain management...")}
              className="w-full mt-6 py-3 border-2 border-gray-100 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
            >
              Manage Supplies
            </button>
          </div>

          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400 mb-4">
                <Clock size={20} />
                <h3 className="font-bold">Next Delivery</h3>
              </div>
              <p className="text-lg font-bold mb-1">Morning Glory School</p>
              <p className="text-sm text-gray-400 mb-6 font-medium">200 Loaves • 8:30 AM Tomorrow</p>
              <button 
                onClick={() => setActiveModal('route')}
                className="w-full py-3 bg-orange-500 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
              >
                <Truck size={18} />
                View Route Map
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Shared Bakery Modals */}
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
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                    {activeModal === 'batch' ? <Scale size={20} /> : activeModal === 'route' ? <Truck size={20} /> : <Settings size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeModal === 'batch' ? "Daily Production Log" : activeModal === 'route' ? "Route Optimization" : "Hub Configuration"}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      {activeModal === 'batch' ? "Sinkor Central Hub" : activeModal === 'route' ? "Fleet Tracking & Logistics" : "Operational Parameters"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {activeModal === 'route' ? (
                <div className="p-8 space-y-8">
                  <div className="relative h-64 bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    
                    {/* Route Path */}
                    <svg className="absolute inset-0 w-full h-full">
                      <motion.path
                        d="M 50 200 L 150 150 L 350 100 L 550 50"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="4"
                        strokeDasharray="10,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </svg>

                    {/* Delivery Points */}
                    <div className="absolute top-[190px] left-[40px] flex flex-col items-center">
                      <div className="w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg" />
                      <span className="text-[10px] font-bold text-gray-900 mt-1 bg-white px-2 py-0.5 rounded shadow-sm">Sinkor Hub</span>
                    </div>

                    <div className="absolute top-[40px] right-[40px] flex flex-col items-center">
                      <MapPin className="text-orange-500 animate-bounce" size={24} />
                      <span className="text-[10px] font-bold text-gray-900 mt-1 bg-white px-2 py-0.5 rounded shadow-sm">Morning Glory</span>
                    </div>

                    {/* Live Vehicle */}
                    <motion.div 
                      animate={{ x: [50, 150, 350], y: [200, 150, 100] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute z-20"
                    >
                      <div className="p-2 bg-gray-900 text-white rounded-lg shadow-xl">
                        <Truck size={16} />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Est. Time", value: "24 mins", icon: Clock },
                      { label: "Distance", value: "8.2 km", icon: Package },
                      { label: "Vehicle", value: "Van #02", icon: Truck },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <item.icon size={16} className="text-gray-400 mb-2" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</p>
                        <p className="text-sm font-black text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Schedule</h4>
                    <div className="space-y-2">
                      {[
                        { school: "Morning Glory School", loaves: 200, time: "08:30 AM", status: "Active" },
                        { school: "Faith Academy", loaves: 150, time: "09:45 AM", status: "Pending" },
                      ].map((stop, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${stop.status === 'Active' ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'}`} />
                            <div>
                              <p className="text-sm font-bold text-gray-900">{stop.school}</p>
                              <p className="text-[10px] text-gray-500 font-medium">{stop.loaves} Loaves</p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-gray-900">{stop.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                  >
                    Close Logistics View
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {activeModal === 'batch' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Total Baked</label>
                        <input required type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="e.g. 500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Public Sales</label>
                        <input required type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="e.g. 300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Program Donation (Free)</label>
                      <input required type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold" placeholder="e.g. 200" />
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                      <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-blue-700 font-medium">Donated loaves are automatically deducted from inventory but generate $0 revenue. Ensure school delivery slips are attached.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price Per Loaf (LRD)</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" defaultValue="150" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Primary Delivery Hub</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
                        <option>Sinkor Central</option>
                        <option>Bushrod Island</option>
                        <option>Paynesville Hub</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Auto-Reorder Supplies</p>
                        <p className="text-xs text-gray-500 font-medium">Alert procurement when flour is below 5 bags.</p>
                      </div>
                      <div className="w-12 h-6 bg-orange-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
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
                        {activeModal === 'batch' ? "Save Production" : "Update Settings"}
                      </>
                    )}
                  </button>
                </div>
              </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(BakeryHub, ["admin"]);
