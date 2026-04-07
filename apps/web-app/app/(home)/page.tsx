"use client";
import { Search, ShoppingCart, Phone } from "lucide-react";
// Dữ liệu giả lập
const sims = [
  {
    id: 1,
    number: "098.333.8888",
    price: "120.000.000đ",
    network: "Viettel",
    color: "bg-red-600 text-white",
  },
  {
    id: 2,
    number: "088.666.9999",
    price: "88.000.000đ",
    network: "Vinaphone",
    color: "bg-blue-600 text-white",
  },
  {
    id: 3,
    number: "090.123.4567",
    price: "3.500.000đ",
    network: "Mobifone",
    color: "bg-gray-300 text-blue-600",
  },
  {
    id: 4,
    number: "033.789.9999",
    price: "9.900.000đ",
    network: "Viettel",
    color: "bg-red-600 text-white",
  },
];
export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 2. Hero Section */}
      <section className="relative h-125 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-blue-500/90" />{" "}
        {/* Thay thế ảnh bằng overlay màu cho nhanh */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Tìm Số Điện Thoại Như Ý
          </h1>
          <div className="bg-white p-2 rounded-xl shadow-2xl flex max-w-2xl mx-auto">
            <input
              className="grow p-4 text-gray-800 rounded-l-lg outline-none"
              placeholder="Nhập số bạn muốn tìm..."
            />
            <div>
              <a
                href="#"
                className="bg-secondary text-gray-400 px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
              >
                <Search className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content (Sử dụng Map để render các card) */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">SIM Bán Chạy Nhất</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sims.map((sim) => (
            <div
              key={sim.id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded ${sim.color}`}
                >
                  {sim.network}
                </span>
                <span className="text-xs text-gray-400">Trả trước</span>
              </div>
              <p className="text-2xl font-bold text-brand mb-4">{sim.number}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-secondary">{sim.price}</p>
                <button className="bg-brand text-white p-2 rounded-lg hover:bg-blue-800">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button className="bg-gray-600 text-white p-4 rounded-full shadow-lg animate-bounce">
          <Phone />
        </button>
      </div>
    </div>
  );
}
