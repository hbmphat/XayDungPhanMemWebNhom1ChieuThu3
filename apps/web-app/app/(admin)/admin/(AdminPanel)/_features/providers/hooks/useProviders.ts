"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useApi } from "@app/_shared/hooks/useApi";
import { PaginationMeta, PaginatedResponse, SingleResponse } from "@app/_types/api-response";
import { providerService } from "@admin.features/providers/api/providerService";
import { Provider, ProviderInput } from "@admin.features/providers/types/provider-types";
import { validateProviderCreate, validateProviderUpdate } from "@admin.features/providers/utils/provider.validation";

export const useProviders = () => {
  const {
    data: responseData,
    loading: fetchLoading,
    request: fetchRequest,
  } = useApi<PaginatedResponse<Provider>>();

  const {
    loading: actionLoading,
    errors: actionErrors,
    request: actionRequest,
    setErrors,
    getFieldError,
  } = useApi<SingleResponse<Provider>>();

  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const onFetch = useCallback(async (page: number = 1, search?: string) => {
    const res = await fetchRequest(() => providerService.getAll(page, search));
    if (res.success && res.data) {
      setMeta(res.data.meta);
    }
  }, [fetchRequest]);

  const onCreate = async (input: ProviderInput) => {
    const validation = validateProviderCreate(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    const res = await actionRequest(() => providerService.create(input));
    if (res.success) {
      toast.success("Provider created successfully");
      await onFetch(1);
      return true;
    }

    toast.error(res.error || "Lỗi khi tạo nhà mạng");
    return false;
  };

  const onUpdate = async (id: string, input: ProviderInput) => {
    const validation = validateProviderUpdate(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    const res = await actionRequest(() => providerService.update(id, input));
    if (res.success) {
      toast.success("Provider updated successfully");
      await onFetch(meta?.current_page ?? 1);
      return true;
    }

    toast.error(res.error || "Lỗi khi cập nhật nhà mạng");
    return false;
  };

  const onDelete = async (id: string) => {
    const res = await actionRequest(() => providerService.delete(id));
    if (res.success) {
      toast.success("Deleted successfully");
      await onFetch(meta?.current_page ?? 1);
      return true;
    }

    toast.error(res.error || "Lỗi khi xóa nhà mạng");
    return false;
  };

  return {
    providers: responseData?.data || [],
    loading: fetchLoading || actionLoading,
    meta: responseData?.meta || meta,
    errors: actionErrors || {},
    getFieldError,
    setErrors,
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
  };
};
