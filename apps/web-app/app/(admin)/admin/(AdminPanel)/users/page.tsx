"use client";
import {
  SearchFilter,
  UserTable,
  Pagination,
  UserHeader,
  UserModal,
} from "@admin/_components/users/_index";
import { useUserManagement } from "@app/_hooks/users/useUserManagement";

export default function UserPage() {
  const {
    users,
    loading,
    meta,
    isModalOpen,
    currentUser,
    searchTerm,
    roleFilter,
    statusFilter,
    setIsModalOpen,
    onFetch,
    handleOpenModal,
    handleFormSubmit,
    handleDelete,
    getFieldError,
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
  } = useUserManagement();

  return (
    <>
      <UserHeader
        total={meta?.total || 0}
        onAddClick={() => handleOpenModal()}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onRoleChange={setRoleFilter}
          onStatusChange={setStatusFilter}
        />
        <UserTable
          users={users}
          isLoading={loading}
          onDelete={handleDelete}
          onEdit={handleOpenModal}
        />
        {meta ? (
          <Pagination meta={meta} onPageChange={(page) => onFetch(page)} />
        ) : (
          <div className="p-4 animate-pulse bg-slate-100 rounded-lg mx-6 mb-4 h-12" />
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
          getFieldError={getFieldError}
        />
      )}
    </>
  );
}
