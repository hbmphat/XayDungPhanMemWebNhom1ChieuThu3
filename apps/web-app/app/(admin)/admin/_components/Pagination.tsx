import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
          href="#"
        >
          Previous
        </a>
        <a
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
          href="#"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium"> 1 </span> to
            <span className="font-medium"> 10 </span> of
            <span className="font-medium"> 20 </span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          >
            <a
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              href="#"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5"></ChevronLeft>
            </a>
            <a
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              href="#"
            >
              1
            </a>
            <a
              className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              href="#"
            >
              2
            </a>
            <a
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              href="#"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5"></ChevronRight>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
