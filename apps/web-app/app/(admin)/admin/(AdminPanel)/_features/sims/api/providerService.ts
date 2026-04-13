import apiClient from "@app/_shared/api-client";
import { Provider } from "@admin.features/sims/types/sim-types";

interface ProviderListResponse {
  success: boolean;
  message: string;
  data: Provider[];
}

export const providerService = {
  getAll: (): Promise<ProviderListResponse> => apiClient.get("/providers"),
};
