"use client";
import { useUsers } from "@app/_hooks/users/useUsers";
import { useEffect, useState } from "react";
import SearchFilter from "@admin/_components/users/SearchFilter";
import UserTable from "@admin/_components/users/UserTable";
import Pagination from "@admin/_components/users/Pagination";
import UserHeader from "@admin/_components/users/UserHeader";
import UserModal from "@admin/_components/users/UserModal";
import { UserInput } from "@app/_types/users/user-types";

export default function UserPage() {
  const { users, loading, meta, fetchUsers, creatUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy danh sách user khi vừa render
  useEffect(() => {
    fetchUsers(1);
  }, []);
  // xử lý tạo user
  const handleCreateUser = async (data: UserInput) => {
    const success = await creatUser(data);
    if (success) {
      fetchUsers(1);
    }
  };
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
      <UserModal
        isOpen={isModalOpen}
        isLoading={loading}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </>
  );
}
