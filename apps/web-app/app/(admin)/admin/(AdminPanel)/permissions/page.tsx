"use client";

import { useEffect, useMemo, useState } from "react";
import apiClient from "@app/_shared/api-client";

type Permission = {
  id: string;
  name: string;
};

export default function PermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [keyword, setKeyword] = useState(""); // State cho thanh tìm kiếm
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [editName, setEditName] = useState("");

  const fetchPermissions = async () => {
    try {
      const res = await apiClient.get("/permissions") as any;
      const list = Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
      setPermissions(list);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // LOGIC TÌM KIẾM: Tự động lọc khi Quân gõ từ khóa
  const filteredPermissions = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return permissions;
    return permissions.filter((p) => p.name.toLowerCase().includes(q));
  }, [permissions, keyword]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      await apiClient.post("/permissions", { name: name.trim() });
      setName("");
      await fetchPermissions();
    } catch (error) {
      alert("Thêm thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Quân chắc chắn muốn xóa quyền này chứ?")) return;
    try {
      setLoading(true);
      await apiClient.delete(`/permissions/${id}`);
      await fetchPermissions();
    } catch (error) {
      alert("Xóa thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (p: Permission) => {
    setEditingPermission(p);
    setEditName(p.name);
  };

  const handleUpdate = async () => {
    if (!editingPermission || !editName.trim()) return;
    try {
      setLoading(true);
      await apiClient.put(`/permissions/${editingPermission.id}`, { name: editName.trim() });
      setEditingPermission(null);
      await fetchPermissions();
    } catch (error) {
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" suppressHydrationWarning>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Permission</h1>
          <p className="text-sm text-slate-500">Thêm, sửa, xóa, tìm kiếm permission hệ thống</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow border text-purple-600 font-bold text-center">
          <div className="text-[10px] uppercase text-slate-400">Tổng số</div>
          {permissions.length}
        </div>
      </div>

      {/* BOX THÊM MỚI & TÌM KIẾM */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-5 space-y-4">
        <div className="flex gap-3">
          <input
            suppressHydrationWarning
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên permission mới..."
            className="flex-1 border border-slate-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 font-semibold shadow-md active:scale-95 transition"
          >
            {loading ? "..." : "Thêm"}
          </button>
        </div>

        {/* THANH TÌM KIẾM ĐÃ QUAY TRỞ LẠI */}
        <div className="relative">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="🔍 Tìm nhanh permission (ví dụ: 'bao cao')..."
            className="w-full bg-slate-50 border border-slate-200 px-10 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b flex justify-between items-center">
          <span className="text-sm font-bold text-slate-700">Danh sách quyền hạn</span>
          <span className="text-xs text-slate-500">Đang lọc: {filteredPermissions.length} kết quả</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">STT</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tên Permission</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPermissions.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-400">
                  <div className="text-lg">😕</div>
                  Không tìm thấy quyền nào phù hợp Quân ơi...
                </td>
              </tr>
            ) : (
              filteredPermissions.map((p, index) => (
                <tr key={p.id} className="hover:bg-slate-50 transition group">
                  <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-5">
                    <button onClick={() => openEdit(p)} className="text-blue-500 hover:text-blue-700 text-sm font-bold transition">Sửa</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 text-sm font-bold transition">Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL SỬA */}
      {editingPermission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black mb-1 text-slate-800">Cập nhật quyền</h2>
            <p className="text-sm text-slate-500 mb-6">Thay đổi tên cho permission #{editingPermission.id}</p>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-slate-300 p-4 rounded-2xl mb-8 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium"
            />
            <div className="flex gap-3">
              <button onClick={() => setEditingPermission(null)} className="flex-1 px-4 py-3 border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition">Hủy</button>
              <button onClick={handleUpdate} className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95">Lưu lại ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}