import apiClient from "@app/_shared/api-client";
import { PaginatedResponse, SingleResponse } from "@app/_types/api-response";
import { Sim, SimInput } from "@admin.features/sims/types/sim-types";

export const simService = {
  getAll: (
    page: number = 1,
    search?: string,
    provider_id?: string,
    is_active?: boolean,
  ): Promise<PaginatedResponse<Sim>> =>
    apiClient.get("/sims", {
      params: { page, search, provider_id, is_active },
    }),

  getById: (id: string): Promise<SingleResponse<Sim>> => apiClient.get(`/sims/${id}`),

  create: (data: SimInput): Promise<SingleResponse<Sim>> => apiClient.post("/sims", data),

  update: (id: string, data: Partial<SimInput>): Promise<SingleResponse<Sim>> =>
    apiClient.put(`/sims/${id}`, data),

  delete: (id: string): Promise<SingleResponse<Sim>> => apiClient.delete(`/sims/${id}`),
};
