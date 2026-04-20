"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "@app/_types/api-response";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, total, per_page } = meta;

  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total);

  // --- LOGIC MỚI: Tạo danh sách trang có dấu ba chấm ---
  const getPages = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // Hiển thị 1 trang bên cạnh trang hiện tại

    // Nếu tổng số trang nhỏ hơn hoặc bằng 7, hiển thị hết (không cần dấu ...)
    if (last_page <= 7) {
      return Array.from({ length: last_page }, (_, i) => i + 1);
    }

    // Luôn có trang đầu
    pages.push(1);

    const leftSiblingIndex = Math.max(current_page - siblingCount, 2);
    const rightSiblingIndex = Math.min(
      current_page + siblingCount,
      last_page - 1,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < last_page - 1;

    if (shouldShowLeftDots) pages.push("...");

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    if (shouldShowRightDots) pages.push("...");

    // Luôn có trang cuối
    pages.push(last_page);

    return pages;
  };

  const pages = getPages();

  // --- LOGIC MỚI: Chặn click trang hiện tại ---
  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page !== current_page) {
      onPageChange(page);
    }
  };

  return (
    <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
      {/* Mobile view - Giữ nguyên */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => handlePageClick(current_page - 1)}
          disabled={current_page === 1}
          className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageClick(current_page + 1)}
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
            <button
              onClick={() => handlePageClick(current_page - 1)}
              disabled={current_page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                disabled={page === "..."}
                aria-current={current_page === page ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  current_page === page
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : page === "..."
                      ? "bg-white border-slate-300 text-slate-500 cursor-default"
                      : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(current_page + 1)}
              disabled={current_page === last_page}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
