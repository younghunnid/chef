"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Globe, Users, CheckCircle2, ArrowRight, Stethoscope } from "lucide-react";

export default function VolunteerPage() {
  const volunteerRoles = [
    {
      title: "Volunteer Doctor",
      description: "Provide medical check-ups, health clinics, and outreach care",
      icon: Stethoscope,
      color: "text-green-500",
      bg: "bg-green-50",
      benefits: ["Make direct impact on children's health", "Work with international team", "Flexible commitment options"]
    },
    {
      title: "Community Volunteer",
      description: "Support local programs, distribute meals, teach activities",
      icon: Heart,
      color: "text-orange-500",
      bg: "bg-orange-50",
      benefits: ["Build relationships in community", "Learn about local culture", "Contribute to multiple programs"]
    },
    {
      title: "Partner Specialist",
      description: "Provide skills training, workshops, and strategic guidance",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-50",
      benefits: ["Share professional expertise", "Network globally", "Shape organizational impact"]
    },
    {
      title: "Remote Volunteer",
      description: "Support from anywhere - social media, translation, design",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-50",
      benefits: ["Work from home", "No travel required", "Flexible scheduling"]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Join Our <span className="text-orange-500">Volunteer Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you're a doctor, skilled professional, or passionate community member, CHEF Foundation welcomes your unique gifts and talents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register?role=volunteer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
              >
                Start Volunteering
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#roles"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-orange-300 transition-all"
              >
                Explore Roles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section id="roles" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect way to contribute your time and talents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className={`${role.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <role.icon className={`${role.color} w-8 h-8`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6">{role.description}</p>

                <ul className="space-y-2 mb-8">
                  {role.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className="inline-block w-full text-center py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-orange-500 mb-2">500+</div>
              <p className="text-lg text-gray-600 font-medium">Active Volunteers Worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-green-500 mb-2">50k+</div>
              <p className="text-lg text-gray-600 font-medium">Volunteer Hours Contributed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-blue-500 mb-2">40+</div>
              <p className="text-lg text-gray-600 font-medium">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Do I need experience to volunteer?",
                a: "No! We welcome volunteers of all experience levels. Whether you're a student, professional, or retiree, there's a role for you."
              },
              {
                q: "Can I volunteer remotely?",
                a: "Yes, we have many remote opportunities in translation, social media, design, and administration."
              },
              {
                q: "How long is the commitment?",
                a: "We offer flexible commitments - from one-time projects to ongoing partnerships. You decide what works best."
              },
              {
                q: "Will I be supported during my volunteer work?",
                a: "Absolutely. All volunteers receive training, mentoring, and support from our experienced team."
              },
              {
                q: "Why should I volunteer with CHEF?",
                a: "Because your work directly impacts real lives. We offer transparency, community, and the chance to be part of sustainable change."
              }
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-orange-300 transition-colors">
                <summary className="flex items-center justify-between font-bold text-gray-900">
                  {faq.q}
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of volunteers around the world who are transforming the lives of children in Liberia.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
          >
            Start Your Journey
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
