"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, ShieldCheck, Stethoscope, HandHelping, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("donor");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { id: "donor", title: "Donor & Sponsor", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
    { id: "doctor", title: "Volunteer Doctor", icon: Stethoscope, color: "text-green-500", bg: "bg-green-50" },
    { id: "volunteer", title: "General Volunteer", icon: HandHelping, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "partner", title: "Corporate Partner", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
            role: role,
          },
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // Create profile in the profiles table
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          full_name: `${firstName} ${lastName}`,
          role: role,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
          alert("Account created but profile setup failed. Please contact support.");
          setLoading(false);
          return;
        }
      }

      // If email confirmation is enabled
      if (!data.session) {
        alert("Check your email to confirm your account.");
      } else {
        router.replace("/programs");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-12">
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Heart className="text-white" size={20} />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">CHEF</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-500 font-medium">Join our mission and start making an impact in Liberia.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Choose Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      role === r.id ? "border-orange-500 bg-orange-50/50 shadow-md" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className={`${r.bg} ${r.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                      <r.icon size={20} />
                    </div>
                    <p className="font-bold text-sm text-gray-900 leading-tight">{r.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="name@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} title="At least 8 characters" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-gray-300" id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the <Link href="#" className="text-orange-600 font-bold underline">Terms of Service</Link> and <Link href="#" className="text-orange-600 font-bold underline">Privacy Policy</Link>.
                </label>
              </div>

              <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 group">
                Create Account
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>

          <p className="text-center text-gray-500 font-medium pb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block relative bg-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 via-orange-500 to-orange-600"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[60px] border-white/10 rounded-full animate-pulse"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center p-16 text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 max-w-md"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto">
              <ShieldCheck size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">Secure & Trusted Infrastructure</h2>
            <p className="text-orange-100 text-lg">
              We use bank-level encryption to protect your data and ensure your contributions reach those who need it most.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8 text-left">
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-orange-100 text-sm">Secure Data</p>
              </div>
              <div>
                <p className="text-2xl font-bold">Encrypted</p>
                <p className="text-orange-100 text-sm">Financials</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
