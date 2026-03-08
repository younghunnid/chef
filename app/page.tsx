import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramsGrid from "@/components/ProgramsGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Impact Ribbon */}
      <div className="bg-orange-500 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-12 text-white font-bold text-xl uppercase tracking-widest opacity-90">
          <span>Transparency • Accountability • Local Impact • International Partnership •</span>
          <span>Transparency • Accountability • Local Impact • International Partnership •</span>
          <span>Transparency • Accountability • Local Impact • International Partnership •</span>
        </div>
      </div>

      {/* Programs Section */}
      <ProgramsGrid />

      {/* Call to Action Section */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] border-[60px] border-orange-500 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to make a difference?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Whether you donate, volunteer, or partner with us, your contribution directly changes the life of a child in Monrovia.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/donate" className="bg-orange-500 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group">
              Get Started Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="bg-transparent text-white border-2 border-white/20 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <span className="text-white font-bold text-lg">CHEF</span>
            </div>
            <span className="font-bold text-lg text-gray-800">Liberia</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CHEF – Children Health Education Food. All rights reserved. Registered Charity in Liberia & UK.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-orange-500">Twitter</Link>
            <Link href="#" className="text-gray-400 hover:text-orange-500">Facebook</Link>
            <Link href="#" className="text-gray-400 hover:text-orange-500">Instagram</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
