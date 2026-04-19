"use client";

import { useEffect, useMemo, useState } from "react";
import apiClient from "@app/_shared/api-client";

type Permission = { id: string; name: string; };
type Role = { id: string; name: string; permissions?: Permission[]; };

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editName, setEditName] = useState("");

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

  const fetchRoles = async () => {
    try {
      const res = await apiClient.get("/roles") as any;
      const list = Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
      setRoles(list);
    } catch (error) { console.error("Lỗi lấy role:", error); }
  };

  const fetchPermissions = async () => {
    try {
      const res = await apiClient.get("/permissions") as any;
      const list = Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
      setPermissions(list);
    } catch (error) { console.error("Lỗi lấy permission:", error); }
  };

  useEffect(() => { fetchRoles(); fetchPermissions(); }, []);

  const filteredRoles = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((role) => role.name.toLowerCase().includes(q));
  }, [roles, keyword]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      await apiClient.post("/roles", { name: name.trim() });
      setName("");
      await fetchRoles();
    } catch (error) { alert("Thêm role thất bại"); } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa role này nhé Quân?")) return;
    try {
      await apiClient.delete(`/roles/${id}`);
      await fetchRoles();
    } catch (error) { alert("Xóa thất bại"); }
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setEditName(role.name);
  };

  const handleUpdate = async () => {
    if (!editingRole || !editName.trim()) return;
    try {
      setLoading(true);
      await apiClient.put(`/roles/${editingRole.id}`, { name: editName.trim() });
      setEditingRole(null);
      await fetchRoles();
    } catch (error) { alert("Cập nhật thất bại"); } finally { setLoading(false); }
  };

  const openAssign = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissionIds(role.permissions?.map((p) => p.id) || []);
  };

  const handleAssign = async () => {
    if (!selectedRole) return;
    try {
      setLoading(true);
      await apiClient.post(`/roles/${selectedRole.id}/permissions`, {
        permission_ids: selectedPermissionIds,
      });
      setSelectedRole(null);
      await fetchRoles();
    } catch (error) { alert("Gán quyền thất bại"); } finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" suppressHydrationWarning>
      <h1 className="text-2xl font-bold text-slate-800 mb-5">Quản lý Vai trò (Role)</h1>

      {/* INPUT THÊM MỚI & TÌM KIẾM */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-5 space-y-4">
        <div className="flex gap-3">
          <input
            suppressHydrationWarning
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên role mới..."
            className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button onClick={handleCreate} disabled={loading} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-purple-700 transition">Thêm</button>
        </div>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="🔍 Tìm nhanh vai trò..."
          className="w-full bg-slate-50 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* DANH SÁCH ROLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredRoles.length === 0 ? (
            <div className="p-10 text-center text-slate-400">Chưa có vai trò nào.</div>
          ) : (
            filteredRoles.map((role) => (
              <div key={role.id} className="p-5 hover:bg-slate-50 transition flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-700 truncate">{role.name}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {role.permissions?.map(p => (
                      <span key={p.id} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold border border-blue-100 max-w-[150px] truncate">
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openAssign(role)} className="text-emerald-600 text-xs font-bold border border-emerald-100 px-3 py-2 rounded-lg hover:bg-emerald-50">Gán quyền</button>
                  <button onClick={() => openEdit(role)} className="text-blue-600 text-xs font-bold border border-blue-100 px-3 py-2 rounded-lg hover:bg-blue-50">Sửa</button>
                  <button onClick={() => handleDelete(role.id)} className="text-red-500 text-xs font-bold border border-red-100 px-3 py-2 rounded-lg hover:bg-red-50">Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL SỬA TÊN ROLE */}
      {editingRole && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold mb-4">Sửa vai trò</h2>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingRole(null)} className="px-4 py-2 text-slate-500">Hủy</button>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GÁN QUYỀN (FIX LỖI NHẢY CHỮ) */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4 shrink-0">Gán quyền cho: {selectedRole.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1 mb-6 pr-2">
              {permissions.map(p => (
                <label key={p.id} className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition min-w-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4 shrink-0"
                    checked={selectedPermissionIds.includes(p.id)}
                    onChange={() => setSelectedPermissionIds(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                  />
                  <span className="text-sm text-slate-700 truncate" title={p.name}>{p.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 shrink-0 pt-4 border-t">
              <button onClick={() => setSelectedRole(null)} className="px-4 py-2 text-slate-500 font-bold">Hủy</button>
              <button onClick={handleAssign} className="bg-purple-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg">Lưu quyền</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}