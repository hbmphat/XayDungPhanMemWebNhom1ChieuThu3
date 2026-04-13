"use client";

import { useEffect, useState } from "react";
import { getMe, logout, AuthUser } from "../_shared/services/auth-service";
import { useRouter } from "next/navigation";

export default function MePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch (err: any) {
        setError(err?.message || "Không lấy được user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Info</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(user, null, 2)}
      </pre>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </main>
  );
}