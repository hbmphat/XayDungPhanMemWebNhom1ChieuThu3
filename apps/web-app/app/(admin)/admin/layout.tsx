import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | HTH4438 Web App",
  description: "Trang quản lý kho sim và đơn hàng",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-home">
      <header className="text-center bg-amber-400">Navbar Khách Hàng</header>
      <main>{children}</main>
      <footer className="text-center bg-amber-600">Footer Khách Hàng</footer>
    </div>
  );
}
