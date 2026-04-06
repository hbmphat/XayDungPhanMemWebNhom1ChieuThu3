import { User } from "@app/(admin)/admin/(AdminPanel)/_features/users/types/user-types";
import {
  Edit2,
  Trash2,
  Shield,
  User as UserIcon,
  HardHat,
  BadgeCheck,
} from "lucide-react";

export default function UserRow({
  user,
  onDelete,
  onEdit,
}: {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
}) {
  // 1. Mapping cho Roles (Icon và Màu sắc)
  const roleConfig: Record<
    string,
    { icon: any; color: string; label: string }
  > = {
    admin: {
      icon: Shield,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      label: "Admin",
    },
    inventory_manager: {
      icon: HardHat,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      label: "Inventory Manager",
    },
    moderator: {
      icon: BadgeCheck,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      label: "Moderator",
    },
    customer: {
      icon: UserIcon,
      color: "text-slate-500 bg-slate-50 border-slate-100",
      label: "Customer",
    },
  };

  // 2. Mapping cho Status (Màu sắc badge)
  const statusConfig: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    pending_kyc: "bg-blue-50 text-blue-700 border-blue-100",
    blocked: "bg-orange-50 text-orange-700 border-orange-100",
    banned: "bg-red-50 text-red-700 border-red-100",
    inactive: "bg-slate-50 text-slate-600 border-slate-100",
  };

  const role = roleConfig[user.role] || roleConfig.customer;
  const RoleIcon = role.icon;

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-bold text-slate-900">
          {user.user_name || "N/A"}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-700 font-medium">
        {user.full_name?.trim() ? user.full_name : "N/A"}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {user.date_of_birth
          ? new Date(user.date_of_birth).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {user.email ? user.email : "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {user.phone ? user.phone : "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-37.5">
        {user.address?.trim() ? user.address : "N/A"}
      </td>

      {/* Role Column */}
      <td className="px-6 py-4">
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${role.color}`}
        >
          <RoleIcon size={14} />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {role.label}
          </span>
        </div>
      </td>

      {/* Status Column */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border shadow-sm ${
            statusConfig[user.status] || statusConfig.inactive
          }`}
        >
          {user.status?.replace("_", " ")}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-slate-400 hover:text-primary hover:bg-primary-container rounded-lg transition-all active:scale-90"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(user.user_id)}
            className="p-2 text-slate-400 hover:text-error hover:bg-error-container rounded-lg transition-all active:scale-90"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
