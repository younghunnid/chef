"use client";

import Link from "next/link";
import { Menu, X, Heart, Utensils, BookOpen, Stethoscope, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { session, userRole, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case "admin": return "/admin";
      case "donor": return "/dashboard/donor";
      case "doctor": return "/doctor";
      case "volunteer": return "/dashboard/volunteer";
      case "partner": return "/dashboard/partner";
      case "sponsor": return "/dashboard/sponsor";
      default: return "/dashboard";
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">CHEF</span>
              </div>
              <span className="hidden md:block font-bold text-xl text-gray-800">Liberia</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
            <Link href="/programs" className="text-gray-600 hover:text-orange-600 font-medium">Programs</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium">Our Mission</Link>
            <Link href="/transparency" className="text-gray-600 hover:text-orange-600 font-medium">Transparency</Link>
            
            {session ? (
              <>
                <Link href={getDashboardLink()} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "..." : "Sign Out"}
                </button>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                <User size={18} />
                Login
              </Link>
            )}
            
            <Link href="/donate" className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all">
              Donate Now
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-6 pt-4 pb-12 space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-lg font-bold text-gray-900 border-b border-gray-50">Home</Link>
              <Link href="/programs" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">Our Programs</Link>
              <Link href="/transparency" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">Transparency</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">Mission & Vision</Link>
              
              <div className="pt-6 grid grid-cols-2 gap-4">
                {session ? (
                  <>
                    <Link 
                      href={getDashboardLink()} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-4 rounded-xl border border-gray-200 font-bold text-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      disabled={isLoggingOut}
                      className="flex items-center justify-center py-4 rounded-xl border border-red-100 bg-red-50 font-bold text-red-600"
                    >
                      {isLoggingOut ? "..." : "Sign Out"}
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-4 rounded-xl border border-gray-200 font-bold text-gray-700"
                  >
                    Log In
                  </Link>
                )}
                <Link 
                  href="/donate" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-4 rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-200"
                >
                  Donate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
