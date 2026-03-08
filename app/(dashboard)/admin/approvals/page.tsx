"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  UserCheck, 
  Heart, 
  Stethoscope, 
  Clock, 
  CheckCircle, 
  XCircle,
  X,
  FileText,
  User,
  ExternalLink,
  MessageSquare,
  Save,
  Loader2
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function ApprovalsHub() {
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isProcessing, setIsSubmitting] = useState(false);

  const pendingApprovals = [
    { id: 1, type: "Doctor Application", name: "Dr. Abraham Johnson", details: "Pediatrics Specialist - License #8822", date: "Oct 05, 2025", email: "a.johnson@medical.lr", documents: ["Medical License.pdf", "CV.pdf"] },
    { id: 2, type: "Sponsorship Request", name: "Mercy Foundation", details: "Requesting to sponsor 50 children in the Food Program", date: "Oct 04, 2025", email: "partnerships@mercy.org", documents: ["Organization_Profile.pdf"] },
    { id: 3, type: "New Partner", name: "Eco-Liberia Inc.", details: "Sustainability project proposal for the Bakery Hub", date: "Oct 03, 2025", email: "contact@ecolib.com", documents: ["Proposal_V1.pdf", "Tax_ID.pdf"] },
  ];

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSelectedApp(null);
    alert(`${selectedApp.name} has been ${action === 'approve' ? 'officially approved' : 'rejected'}. Notification email sent.`);
  };

  return (
    <div className="space-y-8 relative">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Approvals & Verification</h1>
        <p className="text-gray-500 font-medium">Review and authorize new applications, partnerships, and high-value donations.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {pendingApprovals.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                {item.type.includes("Doctor") ? <Stethoscope size={24} /> : 
                 item.type.includes("Sponsor") ? <Heart size={24} /> : <ShieldCheck size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{item.type}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{item.details}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedApp(item)}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                Review Details
              </button>
            </div>
          </motion.div>
        ))}

        {pendingApprovals.length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <UserCheck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
            <p className="text-gray-500 font-medium">There are no pending approvals at this time.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
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
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Application Review</h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{selectedApp.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-white rounded-full transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Applicant Info */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                    <p className="font-bold text-gray-900">{selectedApp.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="font-bold text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Summary</p>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{selectedApp.details}</p>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verification Documents</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedApp.documents.map((doc: string, i: number) => (
                      <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-orange-200 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-orange-500 shadow-sm">
                            <FileText size={16} />
                          </div>
                          <span className="text-xs font-bold text-gray-700">{doc}</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Internal Review Notes</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-sm" placeholder="Enter notes for the audit trail..."></textarea>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAction('reject')}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <XCircle size={20} />
                    Reject Application
                  </button>
                  <button 
                    onClick={() => handleAction('approve')}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <CheckCircle size={20} className="text-green-400" />
                        Approve & Verify
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(ApprovalsHub, ["admin"]);
