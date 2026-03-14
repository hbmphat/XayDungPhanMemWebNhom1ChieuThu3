"use client"; // Bắt buộc cho các tương tác client
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        href="/admin"
        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${pathname === "/admin" ? "bg-primary-50 text-primary-700" : "text-slate-600"}`}
      >
        Dashboard
      </Link>
    </nav>
  );
}
