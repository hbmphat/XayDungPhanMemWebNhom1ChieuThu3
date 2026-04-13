"use client";

import {
  SearchFilter,
  SimHeader,
  SimModal,
  SimTable,
} from "@admin.features/sims/components";
import { useSimManagement } from "@admin.features/sims/hooks/useSimManagement";

export default function SimPage() {
  const {
    sims,
    loading,
    providers,
    total,
    activeTotal,
    isModalOpen,
    currentSim,
    searchTerm,
    providerFilter,
    statusFilter,
    setIsModalOpen,
    handleOpenModal,
    handleSubmit,
    handleDelete,
    getFieldError,
    setSearchTerm,
    setProviderFilter,
    setStatusFilter,
  } = useSimManagement();

  return (
    <>
      <SimHeader
        total={total}
        activeTotal={activeTotal}
        onAddClick={() => handleOpenModal()}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <SearchFilter
          searchTerm={searchTerm}
          providerFilter={providerFilter}
          statusFilter={statusFilter}
          providers={providers}
          onSearchChange={setSearchTerm}
          onProviderChange={setProviderFilter}
          onStatusChange={setStatusFilter}
        />

        <SimTable
          sims={sims}
          isLoading={loading}
          onDelete={handleDelete}
          onEdit={handleOpenModal}
        />
      </main>

      {isModalOpen && (
        <SimModal
          key={currentSim?.sim_id || "new-sim-modal"}
          isOpen={isModalOpen}
          isLoading={loading}
          currentSim={currentSim}
          providers={providers}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          getFieldError={getFieldError}
        />
      )}
    </>
  );
}
