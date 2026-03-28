import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | STU Simshop",
    default: "Trang chủ | STU Simshop",
  },
  description: "STU Simshop - Sim số đẹp, giá rẻ, giao hàng nhanh chóng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased h-full">
        {children}
      </body>
    </html>
  );
}
