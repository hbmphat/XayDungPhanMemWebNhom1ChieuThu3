import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "@app_types/api";
interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}
export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, total, per_page } = meta;
  // Tính số bản ghi
  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total);

  // Tạo mảng trang để render
  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  return (
    <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
      {/* Mobile view */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium"> {from} </span> to
            <span className="font-medium"> {to} </span> of
            <span className="font-medium"> {total} </span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          >
            {/* Nút Previous */}
            <button
              onClick={() => onPageChange(current_page - 1)}
              disabled={current_page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Danh sách các trang */}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={current_page === page ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  current_page === page
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Nút Next */}
            <button
              onClick={() => onPageChange(current_page + 1)}
              disabled={current_page === last_page}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
