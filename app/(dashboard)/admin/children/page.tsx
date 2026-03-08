"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChildrenService } from "@/lib/services/data";
import { Child } from "@/types";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  MapPin,
  GraduationCap,
  Calendar,
  X,
  Camera,
  Heart,
  Save,
  Loader2,
  FileText,
  User,
  Activity,
  Award,
  ShieldCheck,
  Stethoscope,
  History,
  Clipboard,
  FileCheck,
  Download,
  ExternalLink
} from "lucide-react";
import withAuth from "@/components/withAuth";

function ChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    school_grade: "Preschool",
    bio: ""
  });

  const fetchChildren = async () => {
    setLoading(true);
    const data = await ChildrenService.getAllChildren();
    setChildren(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleRegisterChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newChild: Partial<Child> = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        location: formData.location,
        school_grade: formData.school_grade,
        bio: formData.bio,
        photo_url: `https://ui-avatars.com/api/?name=${formData.first_name}+${formData.last_name}&background=random`,
        needs_sponsorship: true,
        created_at: new Date().toISOString()
      };

      const { data, error } = await ChildrenService.createChild(newChild);

      if (data) {
        await fetchChildren();
      }

      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ first_name: "", last_name: "", location: "", school_grade: "Preschool", bio: "" });
      alert("New beneficiary successfully registered in the system!");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("An error occurred during registration.");
    }
  };

  const filteredChildren = children.filter(child => 
    `${child.first_name} ${child.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Children Portal</h1>
          <p className="text-gray-500 font-medium">Manage and track the progress of beneficiaries across all programs.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
        >
          <Plus size={20} />
          Register New Child
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by name, ID, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={() => alert("Beneficiary filters active.")}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-3xl" />
          ))
        ) : (
          filteredChildren.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-md">
                  <img 
                    src={child.photo_url || `https://ui-avatars.com/api/?name=${child.first_name}+${child.last_name}&background=random`} 
                    alt={child.first_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {child.first_name} {child.last_name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      <MapPin size={14} className="text-orange-500" />
                      {child.location || "Monrovia"}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      <GraduationCap size={14} className="text-blue-500" />
                      {child.school_grade || "Grade 1"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Program Progress</span>
                    <span className="text-orange-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${child.needs_sponsorship ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {child.needs_sponsorship ? "Needs Sponsor" : "Sponsored"}
                  </span>
                  <button 
                    onClick={() => setSelectedChild(child)}
                    className="text-orange-500 font-bold text-sm hover:underline"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Registration Modal */}
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
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <Users size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Register New Beneficiary</h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Administrative Intake Form</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleRegisterChild} className="p-8 space-y-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1 hover:bg-gray-50 transition-all cursor-pointer">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold uppercase">Upload Photo</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                    <input required type="text" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input required type="text" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                    <input required type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="e.g. West Point" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">School Grade</label>
                    <select value={formData.school_grade} onChange={(e) => setFormData({...formData, school_grade: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
                      <option>Preschool</option>
                      <option>Grade 1</option>
                      <option>Grade 2</option>
                      <option>Grade 3</option>
                      <option>Grade 4</option>
                      <option>Grade 5</option>
                      <option>Grade 6</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Special Needs / Health Notes</label>
                  <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none" placeholder="Medical conditions..."></textarea>
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} />Save Beneficiary</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedChild && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChild(null)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side: Photo & Status */}
              <div className="md:w-2/5 bg-gray-900 relative">
                <img 
                  src={selectedChild.photo_url || `https://ui-avatars.com/api/?name=${selectedChild.first_name}+${selectedChild.last_name}&background=random`} 
                  className="w-full h-full object-cover opacity-80"
                  alt={selectedChild.first_name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${selectedChild.needs_sponsorship ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {selectedChild.needs_sponsorship ? "Awaiting Sponsor" : "Active Sponsorship"}
                  </span>
                </div>
                <button onClick={() => setSelectedChild(null)} className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all md:hidden">
                  <X size={20} />
                </button>
              </div>

              {/* Right Side: Info */}
              <div className="md:w-3/5 p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">
                      {selectedChild.first_name}<br />{selectedChild.last_name}
                    </h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Beneficiary ID: #CHEF-{selectedChild.id.slice(0, 5)}</p>
                  </div>
                  <button onClick={() => setSelectedChild(null)} className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-all">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Location</span>
                    </div>
                    <p className="font-bold text-gray-700">{selectedChild.location || "Monrovia"}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GraduationCap size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Education</span>
                    </div>
                    <p className="font-bold text-gray-700">{selectedChild.school_grade || "Grade 1"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Beneficiary Bio</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                    "{selectedChild.bio || "No biographical information available for this beneficiary."}"
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveSubModal('health')}
                    className="py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Activity size={16} />
                    Health Logs
                  </button>
                  <button 
                    onClick={() => setActiveSubModal('sponsor')}
                    className="py-4 bg-orange-500 text-white rounded-2xl font-bold text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                  >
                    <Heart size={16} />
                    Sponsor Docs
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Health & Sponsor Sub-Modals */}
      <AnimatePresence>
        {activeSubModal && selectedChild && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubModal(null)}
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${activeSubModal === 'health' ? 'bg-red-500' : 'bg-orange-500'}`}>
                    {activeSubModal === 'health' ? <Stethoscope size={20} /> : <ShieldCheck size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeSubModal === 'health' ? "Medical History" : "Sponsorship Documentation"}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      Beneficiary: {selectedChild.first_name} {selectedChild.last_name}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveSubModal(null)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {activeSubModal === 'health' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Last Weight</p>
                        <p className="text-xl font-black text-red-600">24.5 kg</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Last Height</p>
                        <p className="text-xl font-black text-blue-600">112 cm</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Clinical Visits</h4>
                      {[
                        { date: "Feb 12, 2026", type: "General Checkup", doctor: "Dr. Saydee", notes: "Normal development, no issues." },
                        { date: "Jan 05, 2026", type: "Vaccination", doctor: "Nurse Kollie", notes: "MMR Booster administered." },
                      ].map((visit, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-gray-900">{visit.type}</span>
                            <span className="text-[10px] font-bold text-gray-400">{visit.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{visit.notes}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                            <User size={10} />
                            {visit.doctor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-orange-600 uppercase mb-1">Sponsorship Status</p>
                        <p className="text-2xl font-black text-orange-900">{selectedChild.needs_sponsorship ? "Pending" : "Fully Sponsored"}</p>
                      </div>
                      <ShieldCheck size={40} className="text-orange-200" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Documents</h4>
                      {[
                        { name: "Birth Certificate", status: "Verified", icon: FileCheck },
                        { name: "Sponsorship Agreement", status: "Active", icon: Clipboard },
                        { name: "Academic Reports", status: "Updated", icon: GraduationCap },
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-orange-200 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-orange-500 transition-all">
                              <doc.icon size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                              <p className="text-[10px] text-green-500 font-bold uppercase">{doc.status}</p>
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                            <Download size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                <button 
                  onClick={() => setActiveSubModal(null)}
                  className="flex-1 py-4 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Close
                </button>
                <button 
                  onClick={() => alert("Redirecting to detailed reports and archive...")}
                  className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  Detailed Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(ChildrenPage, ["admin"]);
