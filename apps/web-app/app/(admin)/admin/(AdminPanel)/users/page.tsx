"use client";
import SearchFilter from "@app/(admin)/admin/_components/users/SearchFilter";
import UserTable from "@admin/_components/users/UserTable";
import { useUsers } from "@app/_hooks/users/useUsers";
import { useEffect } from "react";
import Pagination from "@admin/_components/users/Pagination";
import UserHeader from "@admin/_components/users/UserHeader";

export default function UserPage() {
  const { users, loading, meta, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers(1);
  }, []);
  return (
    <>
      <UserHeader total={users.length} />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter />
        <UserTable users={users} isLoading={loading} />
        {meta && (
          <Pagination meta={meta} onPageChange={(page) => fetchUsers(page)} />
        )}
      </main>
    </>
  );
}
