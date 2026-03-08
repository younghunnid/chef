import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
