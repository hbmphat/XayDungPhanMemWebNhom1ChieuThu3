import { Sim } from "@admin.features/sims/types/sim-types";
import { Edit2, Trash2 } from "lucide-react";

export default function SimRow({
  sim,
  onDelete,
  onEdit,
}: {
  sim: Sim;
  onDelete: (id: string) => void;
  onEdit: (sim: Sim) => void;
}) {
  const statusClass = sim.is_active
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-slate-50 text-slate-600 border-slate-100";

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(sim.price);

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-bold text-slate-900">{sim.sim_number}</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-700 font-medium whitespace-nowrap">
        {formattedPrice}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{sim.type || "N/A"}</td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{sim.provider_name || "N/A"}</td>
      <td className="px-6 py-4 text-sm text-slate-600 max-w-72 truncate">{sim.description || "N/A"}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border shadow-sm ${statusClass}`}>
          {sim.is_active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
        {sim.created_at || "N/A"}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(sim)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-90"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(sim.sim_id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
