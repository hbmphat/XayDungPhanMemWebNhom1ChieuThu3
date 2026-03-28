import { Metadata } from "next";
import UserTable from "@admin/_components/UserTable";
import SearchFilter from "@admin/_components/SearchFilter";

export const metadata: Metadata = {
  title: "Admin | STU Simshop",
  description: "Trang quản lý STU Simshop",
};
export default function Users() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <SearchFilter />
      <UserTable />
    </main>
  );
}
