import { User } from "@app/_types/users/user-types";
import { Edit2, Trash2 } from "lucide-react";
// const statusColors: Record<User["status"], string> = {
//   Active: "bg-green-100 text-green-800",
//   Inactive: "bg-slate-100 text-slate-800",
//   Pending: "bg-yellow-100 text-yellow-800",
// };
export default function UserRow({ user }: { user: User }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full border border-slate-200"
            src={user.avatar}
            alt={user.full_name}
          />
          <div className="ml-4">
            <div className="text-sm font-semibold text-slate-900">
              {user.user_name}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-sm text-slate-700">{user.email}</div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-700">{user.address}</td>
      <td className="px-6 py-4 text-sm text-slate-700">{user.status}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button className="p-1 text-slate-400 hover:text-indigo-600">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1 text-slate-400 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
