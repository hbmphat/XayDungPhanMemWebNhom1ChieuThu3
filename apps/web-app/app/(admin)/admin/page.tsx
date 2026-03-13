"use client"; // Bắt buộc cho các tương tác client-side

import { toast, Toaster } from "sonner";

export default function Admin() {
  const handleCallLaravel = async () => {
    // Gọi đến API của Laravel trên Render
    const apiUrl = "https://your-render-url.onrender.com";

    try {
      const res = await fetch(`${apiUrl}/api/hello`);
      const data = await res.json();

      // Hiển thị toast khi thành công
      toast.success(data.message || "Kết nối thành công!");
    } catch (error) {
      // Hiển thị toast khi lỗi
      toast.error("Không thể kết nối đến Laravel");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Toaster position="top-right" /> {/* Component hiển thị toast */}
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-zinc-400 dark:bg-black sm:items-start">
        <div className="m-auto flex flex-col items-center gap-4">
          <div className="text-white">Welcome to the Admin Page</div>

          <button
            onClick={handleCallLaravel}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Gọi Laravel API
          </button>
        </div>
      </main>
    </div>
  );
}
