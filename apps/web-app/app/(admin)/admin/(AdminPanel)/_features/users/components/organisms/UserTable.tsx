"use client";
import UserRow from "../molecules/UserRow";
import { User } from "@app/(admin)/admin/(AdminPanel)/_features/users/types/user-types";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
}

export default function UserTable({
  users,
  isLoading,
  onDelete,
  onEdit,
}: UserTableProps) {
  const tableHeaders = [
    "User",
    "Fullname",
    "Date of Birth",
    "Email",
    "Phone",
    "Address",
    "Role",
    "Status",
    "Actions",
  ];

  return (
    <div className="px-8 py-4">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {tableHeaders.map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan={8}
                      className="px-6 py-6 border-b border-slate-100"
                    >
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <UserRow
                    key={user.user_id}
                    user={user}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm font-medium">
                        Không tìm thấy người dùng nào.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
