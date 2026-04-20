"use client";

import {
  ProviderHeader,
  ProviderModal,
  ProviderTable,
  SearchFilter,
} from "@admin.features/providers/components";
import { useProviderManagement } from "@admin.features/providers/hooks/useProviderManagement";

export default function ProviderPage() {
  const {
    providers,
    loading,
    meta,
    isModalOpen,
    currentProvider,
    searchTerm,
    setIsModalOpen,
    handleOpenModal,
    handleSubmit,
    handleDelete,
    getFieldError,
    setSearchTerm,
  } = useProviderManagement();

  return (
    <>
      <ProviderHeader
        total={meta?.total || providers.length}
        onAddClick={() => handleOpenModal()}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <ProviderTable
          providers={providers}
          isLoading={loading}
          onDelete={handleDelete}
          onEdit={handleOpenModal}
        />
      </main>

      {isModalOpen && (
        <ProviderModal
          key={currentProvider?.provider_id || "new-provider-modal"}
          isOpen={isModalOpen}
          isLoading={loading}
          currentProvider={currentProvider}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          getFieldError={getFieldError}
        />
      )}
    </>
  );
}
