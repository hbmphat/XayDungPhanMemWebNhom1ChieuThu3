"use client";
import {
  SearchFilter,
  UserTable,
  Pagination,
  UserHeader,
  UserModal,
} from "@admin/_components/users/_index";
import { useUserManagement } from "@app/_hooks/users/userUserManegemet";

export default function UserPage() {
  const {
    users,
    loading,
    meta,
    isModalOpen,
    setIsModalOpen,
    handleCreateUser,
    fetchUsers,
  } = useUserManagement();

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
