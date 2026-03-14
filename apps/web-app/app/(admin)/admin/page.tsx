"use client";
import {
  User,
  LayoutDashboard,
  Search,
  Plus,
  Settings,
  Bell,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn Tèo",
    email: "teonguyen@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Lê Văn Tý",
    email: "lety@example.com",
    role: "User",
    status: "Active",
  },
];

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            <a href="/admin">Admin Panel</a>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            href="/admin"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            href="/admin"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </span>
            <input
              className="pl-10 pr-3 py-2 border border-slate-300 rounded-lg"
              placeholder="Search users..."
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-slate-400 cursor-pointer hover:text-slate-600" />
            <button className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              <Plus className="mr-2 h-5 w-5" />
              Add New User
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="p-8">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full ${user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      Edit
                    </button>
                    <button className="text-rose-600 hover:text-rose-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
