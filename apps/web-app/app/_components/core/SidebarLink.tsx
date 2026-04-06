import Link from "next/link"; // Hoặc "next/link" tùy phiên bản Next.js bạn dùng
import { ReactNode } from "react";

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void; // Thêm prop để nhận hàm close từ Sidebar
}

export default function SidebarLink({
  href,
  icon,
  label,
  active = false,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
        active
          ? "text-white bg-indigo-600 shadow-sm"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      }`}
    >
      <span className={`${active ? "text-white" : "text-slate-400"}`}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
