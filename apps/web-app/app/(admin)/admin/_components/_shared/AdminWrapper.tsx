"use client";
import Sidebar from "@admin/_components/_shared/Sidebar";
import { SidebarProvider } from "@app/_shared/contexts/SidebarContext";

export default function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children} {/* Page sẽ nằm ở đây */}
        </div>
      </div>
    </SidebarProvider>
  );
}
