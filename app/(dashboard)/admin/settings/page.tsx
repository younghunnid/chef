"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Mail, 
  Lock,
  UserPlus,
  RefreshCw
} from "lucide-react";
import withAuth from "@/components/withAuth";

function AdminSettings() {
  const sections = [
    {
      title: "System Configuration",
      icon: Settings,
      items: [
        { name: "Platform Maintenance Mode", desc: "Disable public access for scheduled updates", type: "toggle", status: false },
        { name: "Global Currency", desc: "Set the default currency for all transactions", type: "select", value: "USD ($)" },
      ]
    },
    {
      title: "Security & Access",
      icon: Shield,
      items: [
        { name: "Two-Factor Authentication", desc: "Require 2FA for all administrative accounts", type: "toggle", status: true },
        { name: "IP Whitelisting", desc: "Restrict portal access to specific IP ranges", type: "button", label: "Manage IPs" },
      ]
    },
    {
      title: "Data Management",
      icon: Database,
      items: [
        { name: "Automated Backups", desc: "Last backup: 2 hours ago", type: "toggle", status: true },
        { name: "Export System Logs", desc: "Generate a full audit trail of system events", type: "button", label: "Generate Report" },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-gray-500 font-medium">Configure global platform behavior and security protocols.</p>
      </header>

      <div className="max-w-4xl space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600 shadow-sm">
                <section.icon size={20} />
              </div>
              <h2 className="font-bold text-gray-900">{section.title}</h2>
            </div>
            
            <div className="divide-y divide-gray-50">
              {section.items.map((item, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                  </div>
                  
                  {item.type === 'toggle' && (
                    <button className={`w-12 h-6 rounded-full transition-all relative ${item.status ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.status ? 'left-7' : 'left-1'}`} />
                    </button>
                  )}
                  
                  {item.type === 'select' && (
                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-500">
                      <option>{item.value}</option>
                      <option>LRD (L$)</option>
                      <option>GBP (£)</option>
                    </select>
                  )}
                  
                  {item.type === 'button' && (
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-all">
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 flex justify-end gap-4">
          <button className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Discard Changes
          </button>
          <button className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminSettings, ["admin"]);
