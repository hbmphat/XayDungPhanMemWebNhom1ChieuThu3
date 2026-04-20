"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      user_name: userName,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role: "customer",
    };

    // Lưu user vào localStorage
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Đăng ký thành công");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full p-3 border rounded-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Họ"
            className="w-full p-3 border rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Tên"
            className="w-full p-3 border rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-brand text-black py-3 rounded-lg hover:bg-secondary hover:text-white transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-brand hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
