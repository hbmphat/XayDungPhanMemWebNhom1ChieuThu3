import SearchFilter from "@app/(admin)/admin/_components/users/SearchFilter";
import UserTable from "@admin/_components/users/UserTable";

export default function UsersPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <SearchFilter />
      <UserTable />
    </main>
  );
}
