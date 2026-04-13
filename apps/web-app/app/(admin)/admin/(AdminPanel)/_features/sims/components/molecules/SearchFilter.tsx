import { Filter, Search, X } from "lucide-react";
import { Provider } from "@admin.features/sims/types/sim-types";

interface SearchFilterProps {
  searchTerm: string;
  providerFilter: string;
  statusFilter: string;
  providers: Provider[];
  onSearchChange: (value: string) => void;
  onProviderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function SearchFilter({
  searchTerm,
  providerFilter,
  statusFilter,
  providers,
  onSearchChange,
  onProviderChange,
  onStatusChange,
}: SearchFilterProps) {
  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </span>
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by SIM number, type, provider..."
            type="text"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex items-center">
            <Filter className="absolute left-3 w-4 h-4 text-slate-400" />
            <select
              value={providerFilter}
              onChange={(e) => onProviderChange(e.target.value)}
              className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="">All Providers</option>
              {providers.map((provider) => (
                <option key={provider.provider_id} value={provider.provider_id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}
