"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  Activity, 
  UserPlus, 
  Calendar, 
  Search, 
  Filter, 
  Plus,
  Heart,
  TrendingUp,
  AlertCircle,
  X,
  MapPin,
  Users,
  Package,
  Save,
  Loader2,
  Syringe,
  Mail,
  ShieldCheck,
  Send
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/components/withAuth";

function HealthProgramPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = [
    { label: "Patients Treated", value: "3,210", change: "+12%", icon: Activity, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Doctors", value: "24", change: "+2", icon: Stethoscope, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Scheduled Clinics", value: "12", change: "Next: Oct 15", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const recentCheckups = [
    { name: "Prince Freeman", age: "8", diagnosis: "Healthy", date: "Today", doctor: "Dr. Kpoto" },
    { name: "Blessing Kollie", age: "6", diagnosis: "Malnutrition - Level 1", date: "Today", doctor: "Dr. Johnson" },
    { name: "Samuel Doe", age: "10", diagnosis: "Malaria - Treated", date: "Yesterday", doctor: "Dr. Kpoto" },
  ];

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveModal(null);
    alert(activeModal === 'invite' 
      ? "Invitation sent! The medical professional will receive an email to complete their verification."
      : activeModal === 'procurement'
      ? "Procurement request submitted! Our logistics team will process the order for medical supplies."
      : activeModal === 'staffing'
      ? "Medical staff assignments have been saved. Assigned doctors will receive notifications."
      : "Medical outreach session successfully scheduled and doctors notified."
    );

  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Health Program Hub</h1>
          <p className="text-gray-500 font-medium">Monitoring medical outreach and pediatric care efficiency.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveModal('invite')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            <UserPlus size={20} />
            Invite Doctor
          </button>
          <button 
            onClick={() => setActiveModal('session')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
          >
            <Plus size={20} />
            New Clinic Session
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.change}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Medical Visits</h2>
            <button 
              onClick={() => alert("Accessing complete pediatric health record database...")}
              className="text-orange-500 font-bold text-sm hover:underline"
            >
              View All Records
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentCheckups.map((check, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{check.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{check.age} years old</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${check.diagnosis.includes("Mal") ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {check.diagnosis}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{check.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{check.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Center */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Heart className="text-red-500" size={20} />
                Medical Inventory
              </h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">Critical supplies status</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>Vaccines</span>
                    <span className="text-orange-400">Low Stock (12%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[12%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>First Aid Kits</span>
                    <span className="text-green-400">Healthy (85%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveModal('procurement')}
                className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all border border-white/10"
              >
                Order Supplies
              </button>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <div className="flex items-center gap-3 text-orange-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="font-bold">Next Field Clinic</h3>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-4">
              Scheduled for <strong>Oct 15</strong> at West Point Community Center. Expected turnout: 200+ patients.
            </p>
            <div className="flex -space-x-2 mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-orange-200 border-2 border-orange-50 flex items-center justify-center text-[10px] font-bold text-orange-600">
                  DR
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-50 flex items-center justify-center text-[10px] font-bold text-orange-400">
                +5
              </div>
            </div>
            <button 
              onClick={() => setActiveModal('staffing')}
              className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-all"
            >
              Manage Staffing
            </button>
          </div>
        </div>

      </div>

      {/* Shared Modals */}
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
                    {activeModal === 'invite' ? <UserPlus size={20} /> : activeModal === 'procurement' ? <Package size={20} /> : activeModal === 'staffing' ? <Users size={20} /> : <Stethoscope size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeModal === 'invite' ? 'Invite Medical Professional' : activeModal === 'procurement' ? 'Procurement Request' : activeModal === 'staffing' ? 'Staff Assignment' : 'Schedule Medical Outreach'}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                      {activeModal === 'invite' ? 'Clinical Staff Onboarding' : activeModal === 'procurement' ? 'Logistics & Supply Chain' : activeModal === 'staffing' ? 'Volunteer Management' : 'Field Mission Planning'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white rounded-full transition-all">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAction} className="p-8 space-y-6">
                {activeModal === 'invite' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                          <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="Dr. Jane Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="jane@hospital.com" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none font-medium text-sm">
                          <option>Pediatrics</option>
                          <option>General Medicine</option>
                          <option>Nursing</option>
                          <option>Nutritionist</option>
                          <option>Dental</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Account Type</label>
                        <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-xl text-orange-600">
                          <ShieldCheck size={18} />
                          <span className="text-xs font-bold uppercase tracking-tight">Verified Doctor Role</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Inviting a doctor grants them access to pediatric health records and clinical outreach scheduling tools. They must provide a valid medical license number during the onboarding process.
                      </p>
                    </div>
                  </div>
                ) : activeModal === 'procurement' ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={24} />
                        <div>
                          <p className="text-sm font-bold text-red-900">Critical Stock Warning</p>
                          <p className="text-xs text-red-600">Vaccines are below 15% threshold.</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-red-500 text-white px-2 py-1 rounded uppercase">Urgent</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Supply Category</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
                          <option>Vaccines (MMR/Polio/BCG)</option>
                          <option>Antimalarial Kits</option>
                          <option>Pediatric Antibiotics</option>
                          <option>First Aid & Trauma Kits</option>
                          <option>Diagnostic Tests (Malaria/HIV)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Quantity Requested</label>
                        <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="e.g. 500 units" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Priority Level</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Standard', 'High', 'Emergency'].map(level => (
                          <div key={level} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-center cursor-pointer hover:border-orange-500 transition-all">
                            <span className="text-xs font-bold text-gray-600">{level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-900 rounded-2xl text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp size={20} className="text-green-400" />
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Budget</p>
                          <p className="text-lg font-black">$1,450.00</p>
                        </div>
                      </div>
                      <button type="button" className="text-xs font-bold text-orange-400 hover:underline">View Breakdown</button>
                    </div>
                  </div>
                ) : activeModal === 'staffing' ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Available Medical Professionals</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Dr. Abraham Kpoto", role: "Pediatrician", status: "Available" },
                          { name: "Dr. Sarah Johnson", role: "General Medicine", status: "Busy" },
                          { name: "Nurse Mary Kollie", role: "Nutritionist", status: "Available" },
                        ].map((staff, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-orange-200 cursor-pointer transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                {staff.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{staff.name}</p>
                                <p className="text-[10px] text-gray-500 font-medium uppercase">{staff.role}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase ${staff.status === 'Available' ? 'text-green-500' : 'text-gray-400'}`}>
                              {staff.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                      <Users className="text-blue-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-blue-700 font-medium leading-relaxed">
                        Select professionals to assign them to the next outreach session. They will receive automated SMS and email notifications once you save the assignments.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Target Date</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location / Community</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="e.g. West Point" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Required Resource Kits</p>
                      <div className="grid grid-cols-2 gap-3">
                        {["Antimalarials", "First Aid", "Basic Vaccines", "Nutritional Bars"].map(kit => (
                          <div key={kit} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-orange-200 cursor-pointer transition-all">
                            <div className="w-4 h-4 rounded border border-gray-300 bg-white" />
                            <span className="text-xs font-bold text-gray-700">{kit}</span>
                          </div>
                        ))}
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
                        {activeModal === 'invite' ? <Send size={20} /> : <Save size={20} />}
                        {activeModal === 'invite' ? 'Send Invitation' : activeModal === 'procurement' ? 'Submit Order' : activeModal === 'staffing' ? 'Save Assignments' : 'Launch Session'}
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

export default withAuth(HealthProgramPage, ["admin"]);
