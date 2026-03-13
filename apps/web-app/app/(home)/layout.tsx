export default function HomeLayout({
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
