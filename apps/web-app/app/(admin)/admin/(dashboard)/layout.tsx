import { Metadata } from "next";
import AdminLayoutWrapper from "../_components/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Admin | STU Simshop",
  description: "Trang quản lý STU Simshop",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
