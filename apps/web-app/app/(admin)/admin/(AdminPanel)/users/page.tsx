"use client";
import { useUsers } from "@app/_hooks/users/useUsers";
import { useEffect, useState } from "react";
import SearchFilter from "@admin/_components/users/SearchFilter";
import UserTable from "@admin/_components/users/UserTable";
import Pagination from "@admin/_components/users/Pagination";
import UserHeader from "@admin/_components/users/UserHeader";
import UserModal from "@admin/_components/users/UserModal";

export default function UserPage() {
  const { users, loading, meta, fetchUsers } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy danh sách user khi vừa render
  useEffect(() => {
    fetchUsers(1);
  }, []);

  return (
    <>
      <UserHeader
        total={users.length}
        onAddClick={() => setIsModalOpen(true)}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter />
        <UserTable users={users} isLoading={loading} />
        {meta && (
          <Pagination meta={meta} onPageChange={(page) => fetchUsers(page)} />
        )}
      </main>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
