"use client";

import { useEffect, useMemo, useState } from "react";
import apiClient from "@app/_shared/api-client";

type Permission = {
  id: string;
  name: string;
};

type Role = {
  id: string;
  name: string;
  permissions?: Permission[];
};

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editName, setEditName] = useState("");

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    []
  );

  const fetchRoles = async () => {
    try {
      const res = (await apiClient.get("/roles")) as {
        data: { data: Role[] } | Role[];
      };

      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setRoles(list);
    } catch (error: unknown) {
      console.error("Lỗi lấy role:", error);
      setRoles([]);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = (await apiClient.get("/permissions")) as {
        data: { data: Permission[] } | Permission[];
      };

      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPermissions(list);
    } catch (error: unknown) {
      console.error("Lỗi lấy permission:", error);
      setPermissions([]);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const filteredRoles = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((role) => role.name.toLowerCase().includes(q));
  }, [roles, keyword]);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên role");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post("/roles", { name: name.trim() });
      setName("");
      await fetchRoles();
    } catch (error: unknown) {
      console.error("Lỗi tạo role:", error);
      alert("Thêm role thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa role này không?")) return;

    try {
      setLoading(true);
      await apiClient.delete(`/roles/${id}`);
      await fetchRoles();
    } catch (error: unknown) {
      console.error("Lỗi xóa role:", error);
      alert("Xóa role thất bại");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setEditName(role.name);
  };

  const closeEdit = () => {
    setEditingRole(null);
    setEditName("");
  };

  const handleUpdate = async () => {
    if (!editingRole) return;

    if (!editName.trim()) {
      alert("Vui lòng nhập tên role");
      return;
    }

    try {
      setLoading(true);
      await apiClient.put(`/roles/${editingRole.id}`, {
        name: editName.trim(),
      });
      closeEdit();
      await fetchRoles();
    } catch (error: unknown) {
      console.error("Lỗi sửa role:", error);
      alert("Sửa role thất bại");
    } finally {
      setLoading(false);
    }
  };

  const openAssign = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissionIds(role.permissions?.map((p) => p.id) || []);
  };

  const closeAssign = () => {
    setSelectedRole(null);
    setSelectedPermissionIds([]);
  };

  const togglePermission = (id: string) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedRole) return;

    try {
      setLoading(true);
      await apiClient.post(`/roles/${selectedRole.id}/permissions`, {
        permission_ids: selectedPermissionIds,
      });
      closeAssign();
      await fetchRoles();
    } catch (error: unknown) {
      console.error("Lỗi gán permission:", error);
      alert("Gán permission thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Role</h1>
          <p className="text-sm text-slate-500">
            Thêm / sửa / xóa / gán permission cho role
          </p>
        </div>

        <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-200 min-w-[120px] text-center">
          <div className="text-xs text-slate-500">Tổng</div>
          <div className="text-2xl font-bold text-purple-600">
            {roles.length}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên role..."
            className="flex-1 border border-slate-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Thêm"}
          </button>
        </div>

        <div className="mt-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm role..."
            className="w-full border border-slate-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Danh sách role
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hiển thị {filteredRoles.length} / {roles.length} role
            </p>
          </div>
        </div>

        {filteredRoles.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Không có role phù hợp
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredRoles.map((role, index) => (
              <div
                key={role.id}
                className="px-5 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        {role.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Role #{role.id}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {role.permissions && role.permissions.length > 0 ? (
                          role.permissions.map((p) => (
                            <span
                              key={p.id}
                              className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-medium"
                            >
                              {p.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            Chưa có permission
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openAssign(role)}
                      className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
                    >
                      Gán quyền
                    </button>

                    <button
                      onClick={() => openEdit(role)}
                      className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(role.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingRole && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[420px] shadow-lg border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Sửa Role</h2>
            <p className="text-sm text-slate-500 mb-4">
              Cập nhật tên role trong hệ thống
            </p>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Nhập tên role..."
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeEdit}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdate}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRole && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[620px] max-h-[85vh] overflow-auto shadow-lg border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              Gán Permission
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Role:{" "}
              <span className="font-medium text-slate-700">
                {selectedRole.name}
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permissions.map((p) => {
                const checked = selectedPermissionIds.includes(p.id);

                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${
                      checked
                        ? "border-purple-400 bg-purple-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(p.id)}
                      className="w-4 h-4"
                    />

                    <div>
                      <div className="text-sm font-medium text-slate-800">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Permission #{p.id}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end mt-5 gap-2">
              <button
                onClick={closeAssign}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={handleAssign}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
              >
                Lưu quyền
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}