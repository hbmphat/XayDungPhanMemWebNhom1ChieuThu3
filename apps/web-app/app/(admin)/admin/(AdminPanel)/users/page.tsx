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
    currentUser,
    onFetch,
    handleOpenModal,
    handleFormSubmit,
    handleDelete,
  } = useUserManagement();

  return (
    <>
      <UserHeader
        total={meta?.total || 0}
        onAddClick={() => handleOpenModal()}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter />
        <UserTable
          users={users}
          isLoading={loading}
          onDelete={handleDelete}
          onEdit={handleOpenModal}
        />
        {meta && (
          <Pagination meta={meta} onPageChange={(page) => onFetch(page)} />
        )}
      </main>
      {isModalOpen && (
        <UserModal
          key={currentUser?.user_id || "new-user-modal"}
          isOpen={isModalOpen}
          isLoading={loading}
          currentUser={currentUser}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
