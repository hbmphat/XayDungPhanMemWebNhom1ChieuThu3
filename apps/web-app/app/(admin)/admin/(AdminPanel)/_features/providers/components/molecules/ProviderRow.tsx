import { Provider } from "@admin.features/providers/types/provider-types";
import { Edit2, Trash2 } from "lucide-react";

export default function ProviderRow({
  provider,
  onDelete,
  onEdit,
}: {
  provider: Provider;
  onDelete: (id: string) => void;
  onEdit: (provider: Provider) => void;
}) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      {/* <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-bold text-slate-900">{provider.provider_id}</span>
      </td> */}
      <td className="px-6 py-4 text-sm text-slate-700 font-medium whitespace-nowrap">
        {provider.name || "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
        {provider.created_at || "N/A"}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
        {provider.updated_at || "N/A"}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(provider)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-90"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(provider.provider_id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
