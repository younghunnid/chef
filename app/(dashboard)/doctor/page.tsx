"use client";

import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Users, 
  Activity, 
  Calendar, 
  FileText, 
  Plus, 
  Search,
  AlertCircle,
  Heart
} from "lucide-react";
import withAuth from "@/components/withAuth";

function DoctorDashboard() {
  const stats = [
    { label: "Patients Today", value: "14", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Surgeries Done", value: "2", icon: Activity, color: "text-red-600", bg: "bg-red-50" },
    { label: "Next Outreach", value: "3d", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Doctor Portal</h1>
          <p className="text-gray-500 font-medium">Clinical overview and pediatric patient management.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            <FileText size={18} />
            Medical Reports
          </button>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
            <Plus size={18} />
            New Patient Record
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Patient Queue */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Today's Appointment Queue</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search patient..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none" />
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: "Blessing Kollie", time: "09:30 AM", type: "Vaccination", status: "Waiting" },
              { name: "Prince Freeman", time: "10:15 AM", type: "General Checkup", status: "In Progress" },
              { name: "Samuel Doe", time: "11:00 AM", type: "Malaria Screening", status: "Scheduled" },
            ].map((patient, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {patient.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{patient.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{patient.type} • {patient.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  patient.status === 'In Progress' ? 'bg-orange-100 text-orange-600' : 
                  patient.status === 'Waiting' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Alerts */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <Stethoscope className="absolute top-[-20px] right-[-20px] text-white/5" size={150} />
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-400" size={20} />
                Critical Inventory
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Antimalarials</span>
                  <span className="text-red-400">Critical (5%)</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[5%]" />
                </div>
              </div>
              <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                Request Supplies
              </button>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <Heart size={24} />
              <h3 className="font-bold">Next Outreach</h3>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-4">
              Community health drive in <strong>New Kru Town</strong> starts in 3 days. 
            </p>
            <div className="p-3 bg-white rounded-xl border border-red-100 mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Expected Patients</p>
              <p className="text-lg font-black text-gray-900">350+</p>
            </div>
            <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
              Confirm Availability
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default withAuth(DoctorDashboard, ["doctor", "admin"]);
