"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useApi } from "@app/_shared/hooks/useApi";
import { PaginationMeta, PaginatedResponse, SingleResponse } from "@app/_types/api-response";
import { providerService } from "@admin.features/sims/api/providerService";
import { simService } from "@admin.features/sims/api/simService";
import { Provider, Sim, SimInput } from "@admin.features/sims/types/sim-types";
import { validateSimCreate, validateSimUpdate } from "@admin.features/sims/utils/sim.validation";

interface ProviderListResponse {
  success: boolean;
  message: string;
  data: Provider[];
}

export const useSims = () => {
  const {
    data: simResponseData,
    loading: fetchLoading,
    request: fetchRequest,
  } = useApi<PaginatedResponse<Sim>>();

  const {
    data: providerResponseData,
    request: providerRequest,
  } = useApi<ProviderListResponse>();

  const {
    loading: actionLoading,
    errors: actionErrors,
    request: actionRequest,
    setErrors,
    getFieldError,
  } = useApi<SingleResponse<Sim>>();

  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const onFetchProviders = useCallback(async () => {
    await providerRequest(() => providerService.getAll());
  }, [providerRequest]);

  const onFetch = useCallback(
    async (page: number = 1, search?: string, providerId?: string, status?: string) => {
      const isActive =
        status === "active" ? true : status === "inactive" ? false : undefined;

      const res = await fetchRequest(() =>
        simService.getAll(page, search, providerId, isActive),
      );

      if (res.success && res.data) {
        setMeta(res.data.meta);
      }
    },
    [fetchRequest],
  );

  const onCreate = async (input: SimInput) => {
    const validation = validateSimCreate(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    const res = await actionRequest(() => simService.create(input));
    if (res.success) {
      toast.success("SIM created successfully");
      await onFetch(1);
      return true;
    }

    toast.error(res.error || "Lỗi khi tạo SIM");
    return false;
  };

  const onUpdate = async (id: string, input: SimInput) => {
    const validation = validateSimUpdate(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    const res = await actionRequest(() => simService.update(id, input));
    if (res.success) {
      toast.success("SIM updated successfully");
      await onFetch(meta?.current_page ?? 1);
      return true;
    }

    toast.error(res.error || "Lỗi khi cập nhật SIM");
    return false;
  };

  const onDelete = async (id: string) => {
    const res = await actionRequest(() => simService.delete(id));
    if (res.success) {
      toast.success("Deleted successfully");
      await onFetch(meta?.current_page ?? 1);
      return true;
    }

    toast.error(res.error || "Lỗi khi xóa SIM");
    return false;
  };

  return {
    sims: simResponseData?.data || [],
    providers: providerResponseData?.data || [],
    loading: fetchLoading || actionLoading,
    meta: simResponseData?.meta || meta,
    errors: actionErrors || {},
    getFieldError,
    setErrors,
    onFetch,
    onFetchProviders,
    onCreate,
    onUpdate,
    onDelete,
  };
};
