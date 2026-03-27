"use client";
import Pagination from "@app/(admin)/admin/_components/users/Pagination";
import UserRow from "@app/(admin)/admin/_components/users/UserRow";
import { useUsers } from "@app/_hooks/users/useUsers";
import { useEffect } from "react";

export default function UserTable() {
  const { users, loading, meta, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers(1);
  }, []);

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center p-10 bg-white border rounded-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-500 text-sm">
          Đang tải danh sách...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-slate-200"
          id="user-management-table"
        >
          <thead className="bg-slate-50">
            <tr>
              {[
                "User",
                "Fullname",
                "Email",
                "Address",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users && users.length > 0 ? (
              users.map((user) => <UserRow key={user.id} user={user} />)
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {meta && (
        <Pagination meta={meta} onPageChange={(page) => fetchUsers(page)} />
      )}
    </div>
  );
}
