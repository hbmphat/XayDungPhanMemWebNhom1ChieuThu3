import apiClient from "@app/_shared/api-client";
import { PaginatedResponse, SingleResponse } from "@app/_types/api-response";
import { Provider, ProviderInput } from "@admin.features/providers/types/provider-types";

export const providerService = {
  getAll: (page: number = 1, search?: string): Promise<PaginatedResponse<Provider>> =>
    apiClient.get("/providers", {
      params: { page, search },
    }),

  getById: (id: string): Promise<SingleResponse<Provider>> => apiClient.get(`/providers/${id}`),

  create: (data: ProviderInput): Promise<SingleResponse<Provider>> =>
    apiClient.post("/providers", data),

  update: (id: string, data: Partial<ProviderInput>): Promise<SingleResponse<Provider>> =>
    apiClient.put(`/providers/${id}`, data),

  delete: (id: string): Promise<SingleResponse<Provider>> => apiClient.delete(`/providers/${id}`),
};
