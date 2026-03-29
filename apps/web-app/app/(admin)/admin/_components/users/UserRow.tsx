import { User } from "@app/_types/users/user-types";
import { Edit2, Trash2, Shield, User as UserIcon } from "lucide-react";

export default function UserRow({ user }: { user: User }) {
  console.log(`User: ${user.user_name} | Status: ${user.status}`);
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-900">
            {user.user_name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-700 font-medium">
        {user.full_name}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {user.phone || "---"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-37.5">
        {user.address}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          {user.role === "admin" ? (
            <Shield size={14} className="text-indigo-500" />
          ) : (
            <UserIcon size={14} className="text-slate-400" />
          )}
          <span className="text-xs font-semibold capitalize">{user.role}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
            user.status === "active"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-50 text-slate-600 border-slate-100"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-start gap-1 ">
          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
