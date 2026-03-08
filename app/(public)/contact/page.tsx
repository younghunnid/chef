"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Globe, 
  MessageSquare,
  Users,
  Building2,
  ArrowRight
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-6"
            >
              <span className="inline-block px-4 py-1.5 text-sm font-bold tracking-wider uppercase text-orange-600 bg-orange-50 rounded-full">
                Get in Touch
              </span>
              <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                We're here to <span className="text-orange-500">Listen & Act.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Whether you have a question about child sponsorship, medical volunteering, or partnership opportunities, our team in Monrovia and London is ready to assist.
              </p>
            </motion.div>
            
            <div className="flex-1 w-full lg:max-w-md">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Sponsorship", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
                  { label: "Medical", icon: Building2, color: "text-green-500", bg: "bg-green-50" },
                  { label: "Partnerships", icon: Globe, color: "text-blue-500", bg: "bg-blue-50" },
                  { label: "Media/Press", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <item.icon className={`mx-auto mb-3 ${item.color}`} size={24} />
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Form */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Inquiry Department</label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                      <option>General Inquiry</option>
                      <option>Child Sponsorship</option>
                      <option>Medical Volunteering</option>
                      <option>Bakery Program</option>
                      <option>Corporate Partnership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea rows={5} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="How can we help you today?"></textarea>
                  </div>
                  <button className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-3 group">
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Office Info & Map */}
            <div className="flex-1 space-y-12 order-1 lg:order-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="text-orange-500" />
                    Liberia Headquarters
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="flex items-start gap-3">
                      <span className="font-bold text-gray-900 min-w-[100px]">Address:</span>
                      CHEF Foundation HQ, 10th Street, Sinkor, Monrovia, Liberia.
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="font-bold text-gray-900 min-w-[100px]">Hours:</span>
                      Mon - Fri: 8:00 AM - 5:00 PM
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="font-bold text-gray-900 min-w-[100px]">Phone:</span>
                      +231 (0) 880 123 456
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Globe className="text-blue-500" />
                    International Office
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="flex items-start gap-3">
                      <span className="font-bold text-gray-900 min-w-[100px]">Location:</span>
                      London, United Kingdom (Strategic Partnership Hub)
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="font-bold text-gray-900 min-w-[100px]">Email:</span>
                      uk-support@chefliberia.org
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative aspect-video rounded-[2.5rem] bg-gray-100 overflow-hidden border-8 border-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-blue-50 flex flex-col items-center justify-center text-center p-8">
                  <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                    <MapPin size={32} className="text-orange-500 animate-bounce" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Monrovia Impact Map</h4>
                  <p className="text-sm text-gray-500 mt-2">Interactive map showing bakery distribution points and health outreach clinics is loading...</p>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-3xl text-white">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-orange-400" />
                  Response Promise
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We aim to respond to all inquiries within 24-48 business hours. If this is an emergency medical referral, please use the **Emergency Case Reporting** system in the Medical Portal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
