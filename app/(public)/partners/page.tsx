"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Globe, 
  Building2, 
  Church, 
  Handshake, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText
} from "lucide-react";

export default function PartnershipPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-50 rounded-full">
              Global Collaboration
            </span>
            <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Partner with <span className="text-blue-600">CHEF Foundation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Join our network of international NGOs, corporate leaders, and faith-based organizations to scale sustainable impact across Liberia.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#request-form" className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
                Start a Partnership
                <ArrowRight size={18} />
              </a>
              <a href="/transparency" className="px-8 py-4 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                View Impact Reports
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Tracks */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Partnership Tracks</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We offer specialized collaboration frameworks designed to align with your organization's mission and goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "International NGOs",
                icon: Globe,
                color: "text-blue-600",
                bg: "bg-blue-50",
                features: ["Joint Program Implementation", "Field Logistics Support", "Grant Management", "Impact Monitoring"]
              },
              {
                title: "Corporate CSR",
                icon: Building2,
                color: "text-orange-600",
                bg: "bg-orange-50",
                features: ["Sustainable Business Support", "Employee Engagement", "Brand Alignment", "Impact Reporting"]
              },
              {
                title: "Churches & Networks",
                icon: Church,
                color: "text-green-600",
                bg: "bg-green-50",
                features: ["Sponsorship Campaigns", "Missionary Integration", "Child Advocacy", "Resource Distribution"]
              }
            ].map((track, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className={`${track.bg} ${track.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <track.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{track.title}</h3>
                <ul className="space-y-3">
                  {track.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle2 size={16} className={track.color} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">The CHEF Partnership <span className="text-orange-500">Advantage</span></h2>
              <p className="text-xl text-gray-400">We are more than just a charity; we are a sustainable impact engine built on transparency and local empowerment.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Financial Transparency", desc: "Access to real-time allocation dashboards and annual third-party audits.", icon: ShieldCheck },
                  { title: "Sustainability Focus", desc: "Our businesses cover operational costs, ensuring your funds reach the children.", icon: TrendingUp },
                  { title: "Local Expertise", desc: "Deep-rooted community connections in Monrovia ensure effective field delivery.", icon: Handshake }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="p-3 bg-white/10 rounded-xl text-orange-500 h-fit">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-12 rounded-[3rem] shadow-2xl relative z-10">
                <FileText size={48} className="mb-6 opacity-50" />
                <h3 className="text-3xl font-bold mb-6">Strategic Alliances</h3>
                <p className="text-orange-100 mb-8 leading-relaxed">
                  We are currently looking for partners in the UK and USA to help scale our **Computer School** and **Bakery Expansion** programs.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <CheckCircle2 className="text-white" size={20} />
                    Tax-deductible contributions
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <CheckCircle2 className="text-white" size={20} />
                    Branding on all outreach materials
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <CheckCircle2 className="text-white" size={20} />
                    Quarterly high-level impact reviews
                  </li>
                </ul>
                <button className="w-full py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all">
                  Download Partnership Prospectus
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Request Form */}
      <section id="request-form" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Partnership Request Form</h2>
            <p className="text-gray-500">Submit your details and our Partnership Director will contact you within 48 hours.</p>
          </div>

          <form className="bg-gray-50 p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 space-y-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Organization Name</label>
                <input type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="e.g. World Vision UK" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Organization Type</label>
                <select className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                  <option>International NGO</option>
                  <option>Corporate Sponsor</option>
                  <option>Church / Religious Network</option>
                  <option>UK Donor Network</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Primary Contact Person</label>
                <input type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Professional Email</label>
                <input type="email" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="partnerships@org.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Area of Interest</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Food Program", "Health Services", "Education", "Sustainability"].map((area) => (
                  <label key={area} className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-xs font-bold text-gray-600">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message / Collaboration Vision</label>
              <textarea rows={4} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Tell us how you'd like to work with CHEF Foundation..."></textarea>
            </div>

            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3">
              Send Partnership Request
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
