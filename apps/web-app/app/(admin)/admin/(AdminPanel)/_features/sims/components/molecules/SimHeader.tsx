"use client";

import { Bell, Menu, CirclePlus } from "lucide-react";
import { useSidebar } from "@shared/contexts/SidebarContext";

interface SimHeaderProps {
  total?: number;
  activeTotal?: number;
  onAddClick: () => void;
}

export default function SimHeader({ total = 0, activeTotal = 0, onAddClick }: SimHeaderProps) {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          onClick={toggle}
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800 truncate">
            SIM Management
          </h1>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
            Total: {total.toLocaleString()}
          </span>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            Active: {activeTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2" />
        <button
          onClick={onAddClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200"
        >
          <CirclePlus className="w-4 h-4" />
          Add SIM
        </button>
      </div>
    </header>
  );
}
