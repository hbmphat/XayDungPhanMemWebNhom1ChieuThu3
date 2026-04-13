"use client";

import { Search, ShoppingCart, User, Menu, X, Phone, Package, Globe, LifeBuoy, ArrowRight, Zap, Wifi, Users } from "lucide-react";
import { useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="layout-home">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-blue-600">
              STU<span className="text-red-600">SIMSHOP</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
            <a className="flex items-center gap-2 hover:text-blue-600 transition-colors" href="#buy-sim">
              <Phone className="w-4 h-4" /> Buy SIM
            </a>
            <a className="flex items-center gap-2 hover:text-blue-600 transition-colors" href="#packages">
              <Package className="w-4 h-4" /> Packages
            </a>
            <a className="flex items-center gap-2 hover:text-blue-600 transition-colors" href="#network">
              <Globe className="w-4 h-4" /> Network
            </a>
            <a className="flex items-center gap-2 hover:text-blue-600 transition-colors" href="#support">
              <LifeBuoy className="w-4 h-4" /> Support
            </a>
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden xl:flex items-center bg-gray-100 px-3 py-2 rounded-full">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-32 xl:w-40 p-0 outline-none"
                placeholder="Search numbers..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="p-3 md:p-2 hover:bg-gray-100 rounded-full relative" title="Cart">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>

              <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all text-sm">
                <User className="w-4 h-4" />
                Sign In
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#buy-sim" className="flex items-center gap-4 py-3 text-lg font-semibold text-blue-600">
                <Phone className="w-6 h-6" /> Buy SIM
              </a>
              <a href="#packages" className="flex items-center gap-4 py-3 text-lg font-semibold hover:text-blue-600">
                <Package className="w-6 h-6" /> Packages
              </a>
              <a href="#network" className="flex items-center gap-4 py-3 text-lg font-semibold hover:text-blue-600">
                <Globe className="w-6 h-6" /> Network
              </a>
              <a href="#support" className="flex items-center gap-4 py-3 text-lg font-semibold hover:text-blue-600">
                <LifeBuoy className="w-6 h-6" /> Support
              </a>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold text-base shadow-lg">
                <User className="w-5 h-5" /> Sign In
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 text-center md:text-left">
            {/* Brand Info */}
            <div>
              <div className="text-2xl font-bold text-white mb-6 flex items-center gap-2 justify-center md:justify-start">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span>
                  STU<span className="text-red-600">SIMSHOP</span>
                </span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xs mx-auto md:mx-0">
                Experience lightning-fast 5G speeds with our premium SIM cards and nationwide coverage. Choose your lucky number today.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                  f
                </a>
                <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                  𝕏
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h5 className="text-xl font-bold mb-8">Products</h5>
              <ul className="space-y-4 text-gray-400 text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    SIM Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    5G Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    eSIM
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roaming
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="text-xl font-bold mb-8">Support</h5>
              <ul className="space-y-4 text-gray-400 text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-xl font-bold mb-8">Newsletter</h5>
              <p className="text-gray-400 text-base mb-6">Get the latest updates and exclusive offers delivered to your inbox.</p>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <p>© 2024 STU SIMSHOP. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <a className="hover:text-white transition" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-white transition" href="#">
                Terms of Service
              </a>
              <a className="hover:text-white transition" href="#">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
