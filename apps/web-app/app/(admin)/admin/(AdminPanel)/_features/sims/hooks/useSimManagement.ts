"use client";

import { useEffect, useMemo, useState } from "react";
import { useSims } from "./useSims";
import { Sim, SimInput } from "@admin.features/sims/types/sim-types";

const normalizeNumber = (value: string) => value.replace(/\s+/g, "").trim();

export const useSimManagement = () => {
  const {
    sims,
    providers,
    loading,
    meta,
    onFetch,
    onFetchProviders,
    onCreate,
    onUpdate,
    onDelete,
    setErrors,
    getFieldError,
  } = useSims();

  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSim, setCurrentSim] = useState<Sim | null>(null);

  useEffect(() => {
    onFetchProviders();
    onFetch(1);
  }, [onFetch, onFetchProviders]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFetch(1, searchTerm, providerFilter, statusFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, providerFilter, statusFilter, onFetch]);

  const filteredSims = useMemo(() => {
    return sims;
  }, [sims]);

  const handleOpenModal = (sim: Sim | null = null) => {
    setCurrentSim(sim);
    setIsModalOpen(true);
    setErrors({});
  };

  const handleSubmit = async (data: SimInput) => {
    const payload = {
      ...data,
      sim_number: normalizeNumber(data.sim_number || ""),
      price: (data.price || "").toString().trim(),
      type: (data.type || "").trim(),
      description: (data.description || "").trim(),
      provider_id: (data.provider_id || "").trim(),
      is_active: data.is_active ?? false,
    };

    const success = currentSim
      ? await onUpdate(currentSim.sim_id, payload)
      : await onCreate(payload);

    if (!success) return false;

    setIsModalOpen(false);
    setCurrentSim(null);
    setErrors({});

    await onFetch(meta?.current_page ?? 1, searchTerm, providerFilter, statusFilter);
    return true;
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa SIM này?");
    if (!confirmed) {
      return;
    }

    const success = await onDelete(id);
    if (success) {
      await onFetch(meta?.current_page ?? 1, searchTerm, providerFilter, statusFilter);
    }
  };

  return {
    sims: filteredSims,
    providers,
    loading,
    searchTerm,
    providerFilter,
    statusFilter,
    isModalOpen,
    currentSim,
    total: meta?.total ?? sims.length,
    activeTotal: sims.filter((sim) => sim.is_active).length,
    setIsModalOpen,
    onFetch,
    handleOpenModal,
    handleSubmit,
    handleDelete,
    getFieldError,
    setSearchTerm,
    setProviderFilter,
    setStatusFilter,
  };
};
