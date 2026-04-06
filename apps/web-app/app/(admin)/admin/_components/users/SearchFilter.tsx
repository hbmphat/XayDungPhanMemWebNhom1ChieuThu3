import { Download, Filter, Search, X } from "lucide-react";
interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
}
export default function SearchFilter({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleChange,
}: SearchFilterProps) {
  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400"></Search>
          </span>
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by name, email..."
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
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Filter className="absolute left-3 w-4 h-4 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => onRoleChange(e.target.value)}
              className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="">All Roles</option>
              <option value="admin">System Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
