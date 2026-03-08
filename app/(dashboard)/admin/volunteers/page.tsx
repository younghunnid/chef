"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowRight,
  X,
  Plus,
  Save,
  Loader2,
  FileSearch,
  UserPlus,
  UserCheck
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function VolunteersManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const volunteers = [
    { name: "Dr. Sarah Kpoto", role: "Volunteer Doctor", email: "sarah.k@example.com", phone: "+231 88 123 4567", status: "Active", joined: "Jan 2024" },
    { name: "Michael Doe", role: "General Volunteer", email: "m.doe@example.com", phone: "+231 77 987 6543", status: "Pending", joined: "Mar 2024" },
    { name: "Grace Tweh", role: "Corporate Partner", email: "g.tweh@bank.com", phone: "+231 88 555 1234", status: "Active", joined: "Nov 2023" },
  ];

  const handleOnboardVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsModalOpen(false);
    alert("Volunteer onboarded! Verification emails and background check requests have been dispatched.");
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Volunteers & Staff</h1>
          <p className="text-gray-500 font-medium">Manage and monitor our global network of change-makers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
        >
          <UserPlus size={20} />
          Add Volunteer
        </button>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name & Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {volunteers.map((vol, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                        {vol.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{vol.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{vol.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail size={12} className="text-gray-400" />
                        {vol.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone size={12} className="text-gray-400" />
                        {vol.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-600 font-medium">
                    {vol.joined}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      vol.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {vol.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <button 
                      onClick={() => alert(`Opening detailed activity log and impact score for ${vol.name}...`)}
                      className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
                    >
                      <ArrowRight size={18} className="text-gray-300" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboarding Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                    <UserPlus size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Volunteer Onboarding</h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Network Intake & Verification</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleOnboardVolunteer} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="name@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Volunteer Role</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none font-medium">
                      <option>General Support</option>
                      <option>Health Professional</option>
                      <option>Education Mentor</option>
                      <option>Logistics & Delivery</option>
                      <option>IT & Digital Hub</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="+231..." />
                  </div>
                </div>

                <div className="p-6 bg-orange-50 border border-orange-100 rounded-[2rem] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Background Check Required</p>
                        <p className="text-xs text-orange-600 font-medium uppercase tracking-tighter">Safety Protocol Level 2</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-orange-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    By enabling this, an automated background check request will be sent to the volunteer via our partner agency. Access to sensitive children's data will be restricted until cleared.
                  </p>
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
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
                        <UserCheck size={20} />
                        Add to Network
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

export default withAuth(VolunteersManagement, ["admin"]);
