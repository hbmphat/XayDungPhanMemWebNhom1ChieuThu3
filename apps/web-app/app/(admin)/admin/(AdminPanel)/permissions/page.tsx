"use client";

import { useEffect, useState } from "react";
import apiClient from "@app/_shared/api-client";

type Permission = {
  id: string;
  name: string;
};

export default function PermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingPermission, setEditingPermission] =
    useState<Permission | null>(null);
  const [editName, setEditName] = useState("");

  const fetchPermissions = async () => {
    try {
      const res = (await apiClient.get("/permissions")) as {
        data: { data: Permission[] } | Permission[];
      };

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setPermissions(list);
    } catch (error: unknown) {
      console.error("Lỗi lấy permission:", error);
      setPermissions([]);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      await apiClient.post("/permissions", { name: name.trim() });
      setName("");
      await fetchPermissions();
    } catch (error: unknown) {
      console.error("Lỗi thêm permission:", error);

      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";

      if (message.includes("Unique violation")) {
        alert("Permission đã tồn tại");
      } else {
        alert("Thêm permission thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Bạn có chắc muốn xóa permission?");
    if (!ok) return;

    try {
      setLoading(true);
      await apiClient.delete(`/permissions/${id}`);
      await fetchPermissions();
    } catch (error: unknown) {
      console.error("Lỗi xóa permission:", error);
      alert("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (p: Permission) => {
    setEditingPermission(p);
    setEditName(p.name);
  };

  const closeEdit = () => {
    setEditingPermission(null);
    setEditName("");
  };

  const handleUpdate = async () => {
    if (!editingPermission) return;

    if (!editName.trim()) {
      alert("Tên không được để trống");
      return;
    }

    try {
      setLoading(true);
      await apiClient.put(`/permissions/${editingPermission.id}`, {
        name: editName.trim(),
      });

      closeEdit();
      await fetchPermissions();
    } catch (error: unknown) {
      console.error("Lỗi sửa permission:", error);

      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";

      if (message.includes("Unique violation")) {
        alert("Tên đã tồn tại");
      } else {
        alert("Sửa thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý Permission
          </h1>
          <p className="text-sm text-slate-500">
            Thêm, sửa, xóa permission hệ thống
          </p>
        </div>

        <div className="bg-white px-4 py-3 rounded-xl shadow border text-center">
          <div className="text-xs text-slate-500">Tổng</div>
          <div className="text-xl font-bold text-purple-600">
            {permissions.length}
          </div>
        </div>
      </div>

      {/* CREATE */}
      <div className="bg-white p-4 rounded-xl shadow border mb-5">
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên permission..."
            className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? "..." : "Thêm"}
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="px-4 py-3 border-b bg-slate-50 font-medium">
          Danh sách permission
        </div>

        {permissions.length === 0 ? (
          <div className="p-6 text-slate-500 text-sm">
            Chưa có permission
          </div>
        ) : (
          <div>
            {permissions.map((p, index) => (
              <div
                key={p.id}
                className="flex justify-between items-center px-4 py-3 border-b last:border-none hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-purple-100 text-purple-600 flex items-center justify-center rounded-md text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{p.name}</span>
                </div>

                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL EDIT */}
      {editingPermission && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-xl w-[350px] shadow-lg">
            <h2 className="font-bold mb-3">Sửa Permission</h2>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeEdit}
                className="px-3 py-2 border rounded"
              >
                Hủy
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-2 bg-purple-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}