"use client";

import { Search, ShoppingCart, ArrowRight, CheckCircle, Zap, Wifi, Users } from "lucide-react";
import { useState } from "react";

// Sample SIM data
const sims = [
  {
    id: 1,
    number: "098.XXX.8888",
    price: "10,500,000đ",
    network: "Viettel",
    badge: "Lucky Number",
  },
  {
    id: 2,
    number: "088.XXX.6666",
    price: "8,750,000đ",
    network: "Vinaphone",
    badge: "Hot Deal",
  },
  {
    id: 3,
    number: "090.XXX.3333",
    price: "3,250,000đ",
    network: "Mobifone",
    badge: "Affordable",
  },
  {
    id: 4,
    number: "033.XXX.9999",
    price: "6,500,000đ",
    network: "Viettel",
    badge: "Premium",
  },
];

// Data packages
const packages = [
  {
    id: 1,
    name: "Power Basic",
    price: "179K",
    description: "Perfect for light users",
    features: [
      "4GB Data per month",
      "Unlimited calls to Viettel",
      "500 SMS/month",
      "Valid for 30 days",
      "24/7 customer support",
    ],
    highlighted: false,
  },
  {
    id: 2,
    name: "Extreme 5G",
    price: "499K",
    description: "For power users",
    features: [
      "50GB High-speed 5G",
      "Unlimited calls all networks",
      "Unlimited SMS/MMS",
      "Valid for 30 days",
      "Priority support",
      "Free international roaming (selected countries)",
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: "Ultra Pro",
    price: "799K",
    description: "Maximum connectivity",
    features: [
      "150GB Ultra-fast 5G",
      "Unlimited everything",
      "Valid for 90 days",
      "VIP support",
      "Exclusive perks",
    ],
    highlighted: false,
  },
];

// Benefits
const benefits = [
  {
    icon: Zap,
    title: "Ultra-Fast Speed",
    description: "Experience blazing-fast 5G speeds with our premium network infrastructure.",
  },
  {
    icon: Wifi,
    title: "Nationwide Coverage",
    description: "Reliable coverage across the entire nation with zero dead zones.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you 24/7.",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-gray-900 text-white overflow-hidden py-16 md:py-24 lg:py-32"
        id="buy-sim"
      >
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block bg-red-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-6 tracking-widest uppercase">
              New 5G Era
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Order Your <span className="text-blue-400">5G SIM</span> & Choose Your Lucky Number
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-10 max-w-2xl mx-auto lg:mx-0">
              Experience lightning-fast speeds and nationwide coverage. Pick a unique number that defines you and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40">
                Browse SIMs Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>

          {/* Right - SIM Card Visual */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
            <div className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-96 md:h-56 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl p-6 md:p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-4 right-6 md:top-6 md:right-8 text-white font-bold italic text-base md:text-xl">
                Simcard
              </div>
              <div className="mt-8 md:mt-12">
                <div className="text-white text-2xl md:text-3xl font-mono font-bold tracking-widest">
                  0988 888 888
                </div>
              </div>
              <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 text-[10px] md:text-xs text-white/70 uppercase tracking-widest">
                Cardholder Name
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Number Search Section */}
      <section className="py-12 -mt-10 md:-mt-14 relative z-20" id="search">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number Pattern</label>
                <input
                  type="text"
                  placeholder="e.g., 098..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Network</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                  <option>All Networks</option>
                  <option>Viettel</option>
                  <option>Vinaphone</option>
                  <option>Mobifone</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold">Featured SIM Numbers</h2>
              <p className="text-gray-500 mt-2 text-base">Handpicked lucky numbers just for you</p>
            </div>
            <a href="#" className="text-blue-600 font-semibold hover:underline flex items-center gap-2 text-base py-2">
              View All Numbers <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* SIM Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {sims.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 text-xs font-bold rounded bg-blue-100 text-blue-600">
                      {sim.network}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{sim.badge}</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-4 font-mono">{sim.number}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="text-2xl font-bold text-red-600">{sim.price}</p>
                    <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Packages Section */}
      <section className="py-16 md:py-24 bg-gray-50" id="packages">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Hot 4G/5G Data Packages</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base">
            Get the most out of your new SIM with our high-speed data plans tailored for every need.
          </p>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-8 md:p-10 flex flex-col ${
                  pkg.highlighted
                    ? "bg-white border-2 border-red-600 shadow-xl relative transform lg:scale-105 z-10"
                    : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-6 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div
                  className={`text-4xl md:text-5xl font-extrabold mb-6 ${
                    pkg.highlighted ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {pkg.price}
                </div>
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <p className="text-base text-gray-500 mb-8">{pkg.description}</p>

                <ul className="text-left space-y-5 mb-10 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all text-base ${
                    pkg.highlighted
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 lg:py-32" id="benefits">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose SIM Connect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="mb-6 p-4 bg-blue-100 rounded-full">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
