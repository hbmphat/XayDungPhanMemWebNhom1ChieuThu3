"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Đọc user ngay khi Navbar load
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    // Lắng nghe thay đổi localStorage (phòng khi login ở trang khác)
    const handleStorageChange = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Hàm lấy tên hiển thị
  const getDisplayName = () => {
    if (!user) return "";
    if (user.first_name || user.last_name)
      return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    if (user.user_name) return user.user_name;
    return user.email;
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-brand">
        STU Simshop
      </Link>

      <div className="flex items-center gap-4">

        {/* Nếu chưa đăng nhập */}
        {!user && (
          <>
            <Link href="/login" className="text-black hover:text-secondary">
              Đăng nhập
            </Link>

            <Link
              href="/register"
              className="px-3 py-1 bg-brand text-black rounded-md hover:bg-secondary hover:text-white transition"
            >
              Đăng ký
            </Link>
          </>
        )}

        {/* Nếu đã đăng nhập */}
        {user && (
          <>
            <span className="text-black">
              Xin chào, <b>{getDisplayName()}</b>
            </span>

            {user.role === "admin" && (
              <Link
                href="/admin"
                className="text-black hover:text-secondary font-semibold"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
