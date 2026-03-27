import { Bell, Menu, UserPlus } from "lucide-react";

export default function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <header
      className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10"
      data-purpose="header"
    >
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          onClick={onOpen}
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800 truncate">
            User Management
          </h1>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            Total: 1,284
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full">
          <Bell className="w-5 h-5"></Bell>
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <UserPlus className="w-4 h-5"></UserPlus>
          Add User
        </button>
      </div>
    </header>
  );
}
