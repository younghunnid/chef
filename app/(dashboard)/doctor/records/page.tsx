"use client";

import { useState } from "react";
import { 
  Search, 
  User, 
  Stethoscope, 
  History, 
  Plus, 
  ArrowLeft,
  Activity,
  ChevronRight,
  Clipboard // Import Clipboard from lucide-react
} from "lucide-react";
import Link from "next/link";
import withAuth from "@/components/withAuth"; // Import the withAuth HOC

function EHRSystem() { // Changed to a regular function component
  const [searchTerm, setSearchTerm] = useState("");

  const children = [
    { id: "1", name: "Emmanuel Flomo", lastCheckup: "Feb 18, 2026", status: "Healthy" },
    { id: "2", name: "Blessing Weah", lastCheckup: "Feb 20, 2026", status: "Critical" },
    { id: "3", name: "Prince Kollie", lastCheckup: "Feb 21, 2026", status: "Follow-up" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">Electronic Health Records</h1>
          <p className="text-gray-500 text-left">Manage and log clinical data for beneficiaries</p>
        </div>
        <Link href="/doctor" className="flex items-center gap-2 text-gray-500 font-bold hover:text-green-600 transition-all">
          <ArrowLeft size={18} />
          Back to Portal
        </Link>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search child by name or ID number..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Recently Seen Children</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <div key={child.id} className="p-6 rounded-3xl border border-gray-100 bg-white hover:shadow-xl transition-all group cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-100 group-hover:text-green-600 transition-all font-bold">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{child.name}</p>
                    <p className="text-xs text-gray-500">Last Checkup: {child.lastCheckup}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                    <Plus size={14} />
                    New Record
                  </button>
                  <button className="flex-1 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
                    History
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EHR Entry Form Placeholder */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-green-600">
              <Clipboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">New Clinical Entry</h3>
          </div>
          <span className="text-sm font-bold text-gray-400">Date: Feb 22, 2026</span>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weight (kg)</label>
                <input type="number" step="0.1" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" placeholder="0.0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Height (cm)</label>
                <input type="number" step="0.1" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" placeholder="0.0" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Primary Diagnosis</label>
              <textarea rows={3} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter findings..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Treatment Prescribed</label>
              <textarea rows={3} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter medications/advice..."></textarea>
            </div>
          </div>

          {/* Clinical Checkbox List */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Activity size={18} className="text-red-500" />
                Vitals & Screening
              </h4>
              <div className="space-y-4">
                {[
                  "Immunizations Up to Date",
                  "Nutritional Deficiency Suspected",
                  "Infectious Disease Screening Done",
                  "Dental Checkup Required",
                  "Malaria Rapid Test Performed"
                ].map((check, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-green-500 transition-all">
                      <div className="w-3 h-3 bg-green-500 rounded-sm opacity-0 group-has-[:checked]:opacity-100"></div>
                      <input type="checkbox" className="hidden" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{check}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-5 bg-green-600 text-white rounded-[2rem] font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2">
              Submit Record to Foundation
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EHRSystem, ["doctor"]);
