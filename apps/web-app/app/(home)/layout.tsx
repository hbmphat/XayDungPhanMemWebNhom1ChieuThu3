import { Search, ShoppingCart, User } from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-home">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="bg-brand text-white py-2 px-4 text-center text-sm">
          Chào mừng đến với STU SimShop - Hệ thống SIM số 1 Việt Nam
        </div>

        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-brand">STU SimShop</div>

          <ul className="hidden lg:flex space-x-8 font-semibold text-gray-700">
            <li>
              <a href="/" className="text-brand">
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary">
                Kho SIM
              </a>
            </li>
          </ul>

          <div className="flex gap-4 items-center">
            <Search className="h-6 w-6 text-gray-600 cursor-pointer" />

            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>

            {/* ADMIN */}
            <a href="/admin">
              <div className="flex items-center gap-1 text-gray-600 hover:text-secondary transition-colors">
                <User className="h-6 w-6 cursor-pointer" />
                <p>Admin</p>
              </div>
            </a>

            {/* ĐĂNG NHẬP */}
            <a href="/login">
              <div className="flex items-center gap-1 text-gray-600 hover:text-secondary transition-colors">
                <User className="h-6 w-6 cursor-pointer" />
                <p>Đăng nhập</p>
              </div>
            </a>

            {/* ĐĂNG KÝ */}
            <a
  href="/register"
  className="px-3 py-1 bg-brand text-black rounded-md hover:bg-secondary transition-colors"
>
  Đăng ký
</a>

          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-6">
                STU SimShop
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Chúng tôi tự hào là đơn vị cung cấp SIM số đẹp hàng đầu Việt Nam
                với kho số đa dạng và dịch vụ chăm sóc khách hàng tận tâm.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Liên Kết Nhanh</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    Tìm kiếm SIM theo yêu cầu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    Tra cứu gói cước
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Danh Mục SIM</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    SIM Tứ Quý - Ngũ Quý
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    SIM Thần Tài - Lộc Phát
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand transition-colors">
                    SIM Giá Rẻ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Liên Hệ</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <span>📍 123 Cách Mạng Tháng 8, Quận 3, TP.HCM</span>
                </li>
                <li className="flex gap-3">
                  <span>📞 1900 1234</span>
                </li>
                <li className="flex gap-3">
                  <span>✉️ support@stusimshop.vn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>© 2026 STU SimShop.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
