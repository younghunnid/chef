"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  BarChart3, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Calendar,
  ShieldCheck,
  FileText,
  X,
  Plus,
  Save,
  Loader2,
  Upload,
  CheckCircle2,
  Download,
  FileArchive
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function PartnerDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const projectMetrics = [
    { label: "Active Projects", value: "12", change: "+2", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Community Reach", value: "15.4k", change: "+12%", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Funding Deployed", value: "$142k", change: "85%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveModal(null);
    alert("Submission successful! Our strategic team will review and respond within 48 hours.");
  };

  const handleDownloadAudit = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Fast progress simulation
    const steps = [15, 40, 65, 85, 100];
    for (const p of steps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setDownloadProgress(p);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsDownloading(false);
    alert("Audit Package (Full Transparency Report 2025) has been compiled and downloaded.");
  };

  return (
    <div className="space-y-8 pb-12 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Partner Portal</h1>
          <p className="text-gray-500 font-medium">Strategic overview of collaborative impact and resource deployment.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveModal("report")}
            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <FileText size={18} />
            Submit Report
          </button>
          <button 
            onClick={() => setActiveModal("proposal")}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2"
          >
            <Briefcase size={18} />
            New Proposal
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectMetrics.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.bg} ${metric.color} p-3 rounded-xl`}>
                <metric.icon size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{metric.change}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{metric.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Initiatives */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Active Initiatives</h2>
            <button 
              onClick={() => alert("Viewing all active collaborative projects...")}
              className="text-orange-500 font-bold text-sm hover:underline"
            >
              View All Projects
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: "Bakery Expansion Phase II", partner: "UK Aid", status: "In Progress", progress: 65 },
              { name: "West Point Nutrition Hub", partner: "WFP Liberia", status: "Deployed", progress: 100 },
              { name: "Digital Literacy Drive", partner: "Google.org", status: "Planning", progress: 15 },
            ].map((project, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">Lead Partner: {project.partner}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    project.status === 'Deployed' ? 'bg-green-100 text-green-600' : 
                    project.status === 'Planning' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                    <span>Project Milestone</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      className={`h-full ${project.progress === 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Compliance */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <Globe className="absolute top-[-20px] right-[-20px] text-white/5" size={150} />
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <ShieldCheck className="text-orange-400" size={20} />
                Transparency Rating
              </h3>
              <p className="text-4xl font-black mb-2">A+</p>
              <p className="text-xs text-gray-400 font-medium mb-8">CHEF adheres to IATI international transparency standards.</p>
              <button 
                onClick={handleDownloadAudit}
                disabled={isDownloading}
                className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isDownloading ? "Compiling..." : "Download Audit Package"}
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-blue-500" />
              Strategic Timeline
            </h3>
            <div className="space-y-6">
              {[
                { date: "Oct 12", event: "Q3 Impact Briefing" },
                { date: "Nov 05", event: "Annual Partner Summit" },
                { date: "Dec 15", event: "Grant Cycle Closure" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-xs font-bold text-orange-500 uppercase shrink-0 w-12">{item.date}</div>
                  <p className="text-sm font-bold text-gray-700">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shared Partner Modal */}
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
                    {activeModal === 'report' ? <FileText size={20} /> : <Briefcase size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeModal === 'report' ? 'Submit Progress Report' : 'New Project Proposal'}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      {activeModal === 'report' ? 'Grant Compliance Documentation' : 'Strategic Collaboration Request'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-white rounded-full transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Selection</label>
                  <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
                    <option>Bakery Expansion Phase II</option>
                    <option>West Point Nutrition Hub</option>
                    <option>Digital Literacy Drive</option>
                    <option>New Strategic Initiative</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    {activeModal === 'report' ? 'Summary of Achievements' : 'Executive Summary'}
                  </label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none" placeholder="Provide a high-level overview..."></textarea>
                </div>

                <div className="p-6 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-all cursor-pointer group">
                  <Upload size={32} className="mb-2 group-hover:text-orange-500 transition-colors" />
                  <p className="text-sm font-bold text-gray-900 mb-1">Upload Documents</p>
                  <p className="text-xs font-medium uppercase tracking-tighter">PDF, XLSX, or DOCX up to 25MB</p>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        {activeModal === 'report' ? 'Submit Audit Report' : 'Send Proposal'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Download Progress Overlay */}
      <AnimatePresence>
        {isDownloading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-600">
                <FileArchive size={40} className="animate-bounce" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Compiling Audit Package</h2>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mb-8">Full Transparency Report v2.0</p>
              
              <div className="space-y-4">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${downloadProgress}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  <span>{downloadProgress}% Complete</span>
                  <span>Encrypting Data...</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(PartnerDashboard, ["partner", "admin"]);
