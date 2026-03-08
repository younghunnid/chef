"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  Stethoscope, 
  BookOpen, 
  Heart, 
  Settings, 
  LogOut,
  TrendingUp,
  ShieldCheck,
  Globe,
  BarChart3,
  Wallet,
  Loader2
} from "lucide-react";
import { useState } from "react";

const adminLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Partner Portal", href: "/dashboard/partner", icon: Globe },
  { name: "Impact Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Revenue Allocation", href: "/admin/finances", icon: Wallet },
  { name: "Approvals Hub", href: "/admin/approvals", icon: ShieldCheck },
  { name: "Children", href: "/admin/children", icon: Users },
  { name: "Donations", href: "/admin/donations", icon: Heart },
  { name: "Health Program", href: "/admin/health", icon: Stethoscope },
  { name: "Bakery & Food Hub", href: "/admin/food/hub", icon: Utensils },
  { name: "Education Hub", href: "/admin/education/hub", icon: BookOpen },
  { name: "Sustainability", href: "/admin/income", icon: TrendingUp },
  { name: "Doctors/Volunteers", href: "/admin/volunteers", icon: ShieldCheck },
];

const donorLinks = [
  { name: "Dashboard", href: "/dashboard/donor", icon: LayoutDashboard },
  { name: "My Children", href: "/dashboard/donor/children", icon: Users },
  { name: "My Donations", href: "/dashboard/donor/donations", icon: Heart },
  { name: "Settings", href: "/dashboard/donor/settings", icon: Settings },
];

const doctorLinks = [
  { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { name: "Health Records", href: "/doctor/records", icon: Stethoscope },
  { name: "Outreach", href: "/doctor/outreach", icon: Heart },
];

const volunteerLinks = [
  { name: "Dashboard", href: "/dashboard/volunteer", icon: LayoutDashboard },
  { name: "My Tasks", href: "/dashboard/volunteer/tasks", icon: Users },
  { name: "Impact", href: "/dashboard/volunteer/impact", icon: TrendingUp },
];

const partnerLinks = [
  { name: "Dashboard", href: "/dashboard/partner", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/partner/projects", icon: Globe },
  { name: "Grants", href: "/dashboard/partner/grants", icon: Wallet },
  { name: "Reports", href: "/dashboard/partner/reports", icon: BarChart3 },
];

const sponsorLinks = [
  { name: "Dashboard", href: "/dashboard/sponsor", icon: LayoutDashboard },
  { name: "My Children", href: "/dashboard/sponsor/children", icon: Users },
  { name: "Messages", href: "/dashboard/sponsor/messages", icon: Heart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { userRole, logout } = useAuth();
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

  const getNavLinksByRole = () => {
    switch (userRole) {
      case "admin":
        return adminLinks;
      case "donor":
        return donorLinks;
      case "doctor":
        return doctorLinks;
      case "volunteer":
        return volunteerLinks;
      case "partner":
        return partnerLinks;
      case "sponsor":
        return sponsorLinks;
      default:
        return [];
    }
  };

  const getPortalTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Portal";
      case "donor":
        return "Donor Portal";
      case "doctor":
        return "Doctor Portal";
      case "volunteer":
        return "Volunteer Portal";
      case "partner":
        return "Partner Portal";
      case "sponsor":
        return "Sponsor Portal";
      default:
        return "Portal";
    }
  };

  const navLinks = getNavLinksByRole();
  const portalTitle = getPortalTitle();

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="bg-orange-500 p-1.5 rounded-lg">
          <span className="text-white font-bold text-lg">CHEF</span>
        </div>
        <span className="font-bold text-xl tracking-tight">{portalTitle}</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all"
        >
          {isLoggingOut ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}
          <span className="font-medium">{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );
}
