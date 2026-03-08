"use client";

import { motion } from "framer-motion";
import { Utensils, Stethoscope, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Food (Bakery Project)",
    description: "Operating a community bakery in Monrovia providing daily bread and nutritional school meals.",
    icon: Utensils,
    href: "/programs/food",
    color: "text-orange-600",
    lightColor: "bg-orange-50",
    stats: "15.4k Meals Served"
  },
  {
    title: "Health Services",
    description: "Free medical check-ups and health clinics powered by local and international volunteer doctors.",
    icon: Stethoscope,
    href: "/programs/health",
    color: "text-green-600",
    lightColor: "bg-green-50",
    stats: "3.2k Treated"
  },
  {
    title: "Education Support",
    description: "Distributing books and computers to empower the next generation with digital literacy.",
    icon: BookOpen,
    href: "/programs/education",
    color: "text-blue-600",
    lightColor: "bg-blue-50",
    stats: "5k Books Given"
  },
  {
    title: "Computer School",
    description: "A state-of-the-art learning center teaching coding and computer skills to Liberian youth.",
    icon: GraduationCap,
    href: "/programs/education", // Linked to education as it's part of digital literacy
    color: "text-purple-600",
    lightColor: "bg-purple-50",
    stats: "120+ Graduates"
  }
];

export default function ProgramsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Core Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            We provide holistic support through four key pillars designed to create lasting change in children's lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Link key={index} href={program.href}>
              <motion.div
                whileHover={{ y: -10 }}
                className="p-8 h-full rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
              >
                <div className={`${program.lightColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <program.icon className={`w-8 h-8 ${program.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed font-medium">
                  {program.description}
                </p>
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className={`text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${program.color}`}>
                    Details <ArrowRight size={14} />
                  </span>
                  <span className={`text-sm font-bold ${program.color}`}>{program.stats}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
