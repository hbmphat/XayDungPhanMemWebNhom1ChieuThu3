import UserTable from "@admin/_components/UserTable";
import SearchFilter from "@admin/_components/SearchFilter";

export default function Dashboard() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <SearchFilter />
      <UserTable />
    </main>
  );
}
