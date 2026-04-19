"use client";

import { ShieldCheck, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user_name = formData.get("user_name");
    const password = formData.get("password");

    // LOGIC ĐĂNG NHẬP TẠM THỜI (Quân có thể thay bằng fetch API sau)
    console.log("Đang xử lý đăng nhập...", { user_name, password });

    try {
      // Giả lập chờ 1 giây để tạo cảm giác thật
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiểm tra tài khoản admin (Khớp với Seeder của Quân)
      if (user_name === "admin" && password === "password") {
        // Sau này Quân lưu Token vào Cookie/LocalStorage ở đây nhé
        router.push("/admin/permissions");
      } else {
        alert("Sai tài khoản hoặc mật khẩu! (Thử: admin / password)");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đã có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      <main className="w-full max-w-md" data-purpose="login-wrapper">
        {/* Logo Section */}
        <div className="mb-8 text-center" data-purpose="brand-identity">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white mb-4 shadow-xl shadow-primary/20">
            <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Admin Portal
          </h1>
        </div>

        {/* LoginForm Card */}
        <div className="glass-card rounded-2xl p-8" data-purpose="login-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* UserName Field */}
            <div data-purpose="form-group">
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Tài khoản
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                  <User size={18} strokeWidth={2} />
                </div>
                <input
                  autoComplete="user_name"
                  className="form-input"
                  id="user_name"
                  name="user_name"
                  placeholder="Tên đăng nhập"
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Password Field */}
            <div data-purpose="form-group">
              <label
                className="block text-sm font-semibold text-on-surface mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  autoComplete="current-password"
                  className="form-input"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between" data-purpose="form-options">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary border-outline-variant rounded cursor-pointer"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-on-surface-variant cursor-pointer"
                  htmlFor="remember-me"
                >
                  Ghi nhớ
                </label>
              </div>
              <a className="text-sm font-medium text-primary hover:underline" href="#">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              className={`btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}