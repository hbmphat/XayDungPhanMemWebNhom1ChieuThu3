"use client";
import {
  X,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import SidebarLink from "@admin/_components/SidebarLink";
import { usePathname } from "next/navigation";
export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shrink-0 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Admin Panel</span>
        </div>
        <button
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <SidebarLink
          href="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={pathname === "/admin/dashboard"}
        />
        <SidebarLink
          href="/admin/users"
          icon={<Users size={20} />}
          label="Users"
          active={pathname === "/admin/users"}
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
            <img
              alt="Avatar"
              src="https://ui-avatars.com/api/?name=Alex+Admin"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Admin</p>
            <p className="text-xs text-slate-400 truncate">Super Admin</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
