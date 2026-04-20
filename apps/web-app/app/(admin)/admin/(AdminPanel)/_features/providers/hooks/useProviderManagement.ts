"use client";

import { useEffect, useMemo, useState } from "react";
import { Provider, ProviderInput } from "@admin.features/providers/types/provider-types";
import { useProviders } from "./useProviders";

export const useProviderManagement = () => {
  const {
    providers,
    loading,
    meta,
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    setErrors,
    getFieldError,
  } = useProviders();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);

  useEffect(() => {
    onFetch(1);
  }, [onFetch]);

  const filteredProviders = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) {
      return providers;
    }

    return providers.filter((provider) => {
      return [provider.provider_id, provider.name, provider.created_at, provider.updated_at]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [providers, searchTerm]);

  const handleOpenModal = (provider: Provider | null = null) => {
    setCurrentProvider(provider);
    setIsModalOpen(true);
    setErrors({});
  };

  const handleSubmit = async (data: ProviderInput) => {
    const payload = {
      name: data.name?.trim(),
    };

    const success = currentProvider
      ? await onUpdate(currentProvider.provider_id, payload)
      : await onCreate(payload);

    if (!success) return false;

    setIsModalOpen(false);
    setCurrentProvider(null);
    setErrors({});
    await onFetch(meta?.current_page ?? 1);
    return true;
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa nhà mạng này?");
    if (!confirmed) return;

    const success = await onDelete(id);
    if (success) {
      await onFetch(meta?.current_page ?? 1);
    }
  };

  return {
    providers: filteredProviders,
    loading,
    meta,
    searchTerm,
    isModalOpen,
    currentProvider,
    setIsModalOpen,
    handleOpenModal,
    handleSubmit,
    handleDelete,
    getFieldError,
    setSearchTerm,
  };
};
