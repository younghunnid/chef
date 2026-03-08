"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  PieChart, 
  FileText, 
  Download, 
  TrendingUp, 
  Globe,
  CheckCircle2,
  Users,
  Utensils,
  Stethoscope,
  BookOpen
} from "lucide-react";

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-orange-600 bg-orange-50 rounded-full">
              Trust & Accountability
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Our Commitment to <span className="text-orange-500">Full Transparency</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              At CHEF, we believe that every dollar donated is a sacred trust. We are committed to showing exactly where your money goes and the impact it creates on the ground in Liberia.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <ShieldCheck className="text-green-500" size={32} />
              <div className="text-left">
                <p className="font-bold text-gray-900">Audited Financials</p>
                <p className="text-sm text-gray-500">Every year by third-parties</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <Globe className="text-blue-500" size={32} />
              <div className="text-left">
                <p className="font-bold text-gray-900">Global Standards</p>
                <p className="text-sm text-gray-500">UNICEF-aligned reporting</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <PieChart className="text-orange-500" size={32} />
              <div className="text-left">
                <p className="font-bold text-gray-900">Real-time Impact</p>
                <p className="text-sm text-gray-500">Live distribution tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Money Goes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Where Your Money Goes
              </h2>
              <p className="text-lg text-gray-600">
                We maintain extremely low overhead costs by utilizing income-generating projects and volunteer specialists. This ensures that the vast majority of your donation goes directly to the children.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "Direct Programs (Food, Health, Edu)", percentage: 40, color: "bg-orange-500" },
                  { label: "Expansion (Bakery, Transport Growth)", percentage: 30, color: "bg-green-500" },
                  { label: "Operations & Logistics", percentage: 20, color: "bg-blue-500" },
                  { label: "Emergency Reserve Fund", percentage: 10, color: "bg-red-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{item.label}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-400 font-medium italic">
                *Based on our 2024 Audited Financial Statement.
              </p>
            </div>
            
            <div className="flex-1 bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp size={200} />
              </div>
              <h3 className="text-2xl font-bold mb-8 relative z-10">The CHEF Sustainability Multiplier</h3>
              <p className="text-gray-400 mb-8 relative z-10 leading-relaxed">
                For every **$1.00** donated, our local businesses generate an additional **$0.40** in profit. 
                <br /><br />
                This means your donation is amplified by our sustainable ecosystem, creating a cycle of impact that doesn't just rely on external aid.
              </p>
              <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                <div className="text-4xl font-extrabold text-orange-500">1.4x</div>
                <div className="text-sm text-gray-400">Total impact value of every dollar donated.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-24 bg-orange-500 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Lives Transformed in Real-Time</h2>
            <p className="text-orange-100 max-w-2xl mx-auto">
              Our impact is not just a number; it's a child fed, a disease treated, and a future secured.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Meals Served", value: "15,402", icon: Utensils },
              { label: "Health Check-ups", value: "3,210", icon: Stethoscope },
              { label: "Books Distributed", value: "5,420", icon: BookOpen },
              { label: "Digital Graduates", value: "124", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
                <stat.icon className="mx-auto mb-4 text-orange-200" size={32} />
                <p className="text-4xl lg:text-5xl font-extrabold mb-2">{stat.value}</p>
                <p className="text-orange-100 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accountability Reports Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Accountability Reports</h2>
              <p className="text-gray-500 max-w-2xl">
                Download our detailed impact and financial reports to see the full scope of our operations in Liberia and our international partnerships.
              </p>
            </div>
            <button className="flex items-center gap-2 text-orange-600 font-bold hover:underline">
              View All Documents
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "2024 Annual Impact Report", size: "4.2 MB", type: "PDF", date: "Jan 2025" },
              { title: "2024 Financial Audit Statement", size: "2.8 MB", type: "PDF", date: "Dec 2024" },
              { title: "CHEF 5-Year Strategy Blueprint", size: "6.1 MB", type: "PDF", date: "Nov 2024" },
              { title: "Bakery Project Performance", size: "1.5 MB", type: "PDF", date: "Oct 2024" },
              { title: "School Feeding Audit Log", size: "3.4 MB", type: "PDF", date: "Sept 2024" },
              { title: "UK Partnership Impact Review", size: "2.2 MB", type: "PDF", date: "Aug 2024" },
            ].map((report, i) => (
              <div key={i} className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-orange-50 transition-colors">
                    <FileText className="text-gray-400 group-hover:text-orange-500" size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{report.type}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{report.title}</h4>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <span className="text-xs text-gray-400 font-bold">{report.date} • {report.size}</span>
                  <button className="p-2 bg-white rounded-lg text-gray-400 hover:text-orange-500 hover:shadow-md transition-all">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Seal Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <CheckCircle2 className="text-green-500" />
              Verified Charity
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <CheckCircle2 className="text-green-500" />
              Impact Certified
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <CheckCircle2 className="text-green-500" />
              Safe Giving
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <CheckCircle2 className="text-green-500" />
              Data Protected
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
