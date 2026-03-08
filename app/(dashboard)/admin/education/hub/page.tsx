"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Laptop, 
  GraduationCap, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight,
  TrendingUp,
  Award,
  X,
  Save,
  Loader2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
  SearchCode,
  Activity,
  Wifi,
  Battery,
  Monitor,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
import { DigitalLabService } from "@/lib/services/data";
import { DigitalLabStatus } from "@/types";

function EducationHub() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [labStatus, setLabStatus] = useState<DigitalLabStatus | null>(null);
  const [isLoadingLab, setIsLoadingLab] = useState(true);

  useEffect(() => {
    const fetchLabStatus = async () => {
      const status = await DigitalLabService.getLabStatus();
      setLabStatus(status);
      setIsLoadingLab(false);
    };
    fetchLabStatus();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLabStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const inventory = [
    { item: "Laptops (Chromebooks)", count: "42", condition: "Active" },
    { item: "Textbooks (Math/Science)", count: "1,200", condition: "Distributed" },
    { item: "School Kits", count: "150", condition: "In Stock" },
  ];

  const recentGraduates = [
    { name: "Jefferson Toe", course: "Digital Literacy", date: "Sep 2025", grade: "A" },
    { name: "Martha Kollie", course: "Intro to Python", date: "Aug 2025", grade: "A+" },
    { name: "Samuel Vah", course: "Web Basics", date: "Aug 2025", grade: "B+" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveModal(null);
    alert(activeModal === 'resource' 
      ? "Educational resource has been logged into the inventory database." 
      : "Scholarship status updated and beneficiary notified."
    );
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Education Hub</h1>
          <p className="text-gray-500 font-medium">Managing digital literacy, scholarships, and academic resources.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveModal('scholarship')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            <GraduationCap size={20} />
            View Scholarships
          </button>
          <button 
            onClick={() => setActiveModal('resource')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            <Plus size={20} />
            Add New Resource
          </button>
        </div>
      </header>

      {/* Program Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Students", value: "450", change: "+15", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Course Graduates", value: "128", change: "+12%", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Books Distributed", value: "5,420", change: "Total", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Active Hubs", value: "3", change: "Counties", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              <span className="text-[10px] font-bold text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Resource Inventory */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Inventory & Assets</h2>
            <button 
              onClick={() => alert("Opening full asset and inventory management portal...")}
              className="text-orange-500 font-bold text-sm hover:underline"
            >
              Manage Stock
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {inventory.map((item, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">{item.item}</p>
                <p className="text-2xl font-black text-gray-900 mb-1">{item.count}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${item.condition === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.condition}
                </span>
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t border-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">Recent Graduates</h3>
            <div className="space-y-3">
              {recentGraduates.map((grad, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                      {grad.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{grad.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{grad.course} • {grad.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">{grad.grade}</span>
                    <ArrowRight size={14} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Lab Status */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <Laptop className="absolute top-[-20px] right-[-20px] text-white/5" size={150} />
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">{labStatus?.lab_name || "Digital Lab Alpha"}</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">Computer school uptime & connectivity</p>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase">Network Status</span>
                  <span className={`flex items-center gap-1 text-xs font-bold ${labStatus?.is_online ? 'text-green-400' : 'text-red-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${labStatus?.is_online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                    {labStatus?.is_online ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase">Solar Battery</span>
                  <span className="text-xs font-bold">{labStatus?.solar_battery_percentage || 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${labStatus?.solar_battery_percentage || 0}%` }}
                    className="h-full bg-orange-500" 
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setActiveModal('remotelab')}
                className="w-full mt-8 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <Activity size={16} />
                Access Remote Lab
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">New Library Shipment</h3>
            <p className="text-sm text-blue-700 font-medium mb-4">
              500+ books from UK partners arrived at the port. Needs sorting and distribution plan.
            </p>
            <button 
              onClick={() => alert("Initiating book sorting protocol and warehouse assignment...")}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Initiate Sorting
            </button>
          </div>
        </div>

      </div>

      {/* Shared Education Modals */}
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
                    {activeModal === 'resource' ? <Plus size={20} /> : activeModal === 'remotelab' ? <Activity size={20} /> : <GraduationCap size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeModal === 'resource' ? "Add Academic Resource" : activeModal === 'remotelab' ? "Remote Lab Monitor" : "Scholarship Management"}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      {activeModal === 'resource' ? "Asset & Inventory Entry" : activeModal === 'remotelab' ? "Real-time Lab Diagnostics" : "Beneficiary Grant Tracking"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {activeModal === 'remotelab' ? (
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Connectivity", value: labStatus?.is_online ? "Stable" : "Down", icon: Wifi, color: labStatus?.is_online ? "text-green-600" : "text-red-600", bg: labStatus?.is_online ? "bg-green-50" : "bg-red-50" },
                      { label: "Solar Battery", value: `${labStatus?.solar_battery_percentage}%`, icon: Battery, color: "text-orange-600", bg: "bg-orange-50" },
                      { label: "Active PCs", value: `${labStatus?.active_computers}/${labStatus?.total_computers}`, icon: Monitor, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Last Ping", value: "2s ago", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                    ].map((stat, i) => (
                      <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-white shadow-sm`}>
                        <stat.icon size={18} className={`${stat.color} mb-2`} />
                        <p className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</p>
                        <p className={`text-sm font-black ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Active Sessions</h3>
                      <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md uppercase">Live Feed</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div>
                            <p className="text-xs font-bold text-gray-900">Station 0{i+1}</p>
                            <p className="text-[10px] text-gray-500">User: Jefferson T.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-gray-900 rounded-3xl text-white">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-orange-500" />
                        <span className="text-sm font-bold">Network Speed</span>
                      </div>
                      <span className="text-xl font-black">{labStatus?.network_speed_mbps} Mbps</span>
                    </div>
                    <div className="h-24 flex items-end gap-1">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.random() * 60 + 20}%` }}
                          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", delay: i * 0.1 }}
                          className="flex-1 bg-orange-500/40 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                  >
                    Close Monitor
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {activeModal === 'resource' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Resource Category</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
                          <option>Hardware (Laptops/Tablets)</option>
                          <option>Textbooks & Stationery</option>
                          <option>Lab Equipment</option>
                          <option>School Furniture</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                        <input required type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="e.g. 50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Description / Serial Range</label>
                      <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="e.g. Grade 4 Mathematics - Oxford Edition" />
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                      <Database className="text-orange-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-orange-700 font-medium">This entry will update the real-time Education Inventory and reflect in the County Distribution report.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users size={20} className="text-blue-600" />
                        <div>
                          <p className="text-sm font-bold text-blue-900">Pending Applications</p>
                          <p className="text-xs text-blue-600">8 students awaiting review</p>
                        </div>
                      </div>
                      <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-200">
                        Process Batch
                      </button>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Scholarship Search</label>
                      <div className="relative">
                        <SearchCode size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="Search by student ID or school..." />
                      </div>
                    </div>

                    <div className="divide-y divide-gray-50">
                      {[
                        { name: "Blessing K.", school: "Faith Academy", status: "Active", amount: "$150/yr" },
                        { name: "Prince F.", school: "City High", status: "Review", amount: "$200/yr" },
                      ].map((item, i) => (
                        <div key={i} className="py-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
                            <div>
                              <p className="text-sm font-bold text-gray-900">{item.name}</p>
                              <p className="text-[10px] text-gray-500 font-medium">{item.school}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-gray-900">{item.amount}</p>
                            <span className={`text-[10px] font-bold uppercase ${item.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>{item.status}</span>
                          </div>
                        </div>
                      ))}
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
                        {activeModal === 'resource' ? "Save to Inventory" : "Update Database"}
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

export default withAuth(EducationHub, ["admin"]);
