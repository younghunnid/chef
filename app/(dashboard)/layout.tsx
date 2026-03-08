"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Settings,
  Stethoscope,
  Globe,
  HandHelping,
  Award,
  LogOut, // Added for mobile sign out
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react"; // Added useState

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, userRole, loading, logout } = useAuth(); // Added logout
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Added state

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    if (session?.user?.user_metadata?.full_name) {
      return `Welcome Back, ${session.user.user_metadata.full_name.split(" ")[0]}`;
    }
    switch (userRole) {
      case "admin":
        return "Welcome Back, Admin";
      case "donor":
        return "Welcome Back, Donor";
      case "doctor":
        return "Welcome Back, Doctor";
      case "volunteer":
        return "Welcome Back, Volunteer";
      case "partner":
        return "Welcome Back, Partner";
      case "sponsor":
        return "Welcome Back, Sponsor";
      default:
        return "Welcome Back";
    }
  };

  // Define mobile navigation links based on user role
  const mobileNavLinks = (() => {
    switch (userRole) {
      case "admin":
        return [
          { name: "Home", href: "/admin", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Children", href: "/admin/children", icon: Users, color: "text-gray-400" },
          { name: "Donations", href: "/admin/donations", icon: Heart, color: "text-gray-400" },
          { name: "Settings", href: "/admin/settings", icon: Settings, color: "text-gray-400" },
        ];
      case "donor":
        return [
          { name: "Home", href: "/dashboard/donor", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Children", href: "/dashboard/donor/children", icon: Users, color: "text-gray-400" }, // Assuming donor can see children they sponsor
          { name: "Donations", href: "/dashboard/donor/donations", icon: Heart, color: "text-gray-400" }, // Assuming donor can see their donations
        ];
      case "doctor":
        return [
          { name: "Home", href: "/doctor", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Records", href: "/doctor/records", icon: Stethoscope, color: "text-gray-400" },
        ];
      case "volunteer":
        return [
          { name: "Home", href: "/dashboard/volunteer", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Tasks", href: "/dashboard/volunteer/tasks", icon: HandHelping, color: "text-gray-400" },
        ];
      case "partner":
        return [
          { name: "Home", href: "/dashboard/partner", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Projects", href: "/dashboard/partner/projects", icon: Globe, color: "text-gray-400" },
        ];
      case "sponsor":
        return [
          { name: "Home", href: "/dashboard/sponsor", icon: LayoutDashboard, color: "text-orange-600" },
          { name: "Sponsored", href: "/dashboard/sponsor/children", icon: Users, color: "text-gray-400" }, // Assuming sponsor can see children they sponsor
        ];
      default:
        return [];
    }
  })();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col pb-20 lg:pb-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-[10px] lg:text-sm font-medium text-gray-400 uppercase tracking-widest">Dashboard</h2>
            <p className="text-lg lg:text-xl font-bold text-gray-900 leading-none">{getWelcomeMessage()}</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="lg:hidden p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Sign Out"
            >
              {isLoggingOut ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <LogOut size={20} />
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border-2 border-white shadow-sm">
              {session?.user?.user_metadata?.full_name ? session.user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("") : "JD"}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        {mobileNavLinks.map((link) => (
          <Link key={link.name} href={link.href} className="flex flex-col items-center gap-1">
            <link.icon size={24} className={link.color} />
            <span className="text-[10px] font-bold">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

