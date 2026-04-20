export interface Provider {
  provider_id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProviderInput {
  name?: string;
}

export const initialProviderInput: ProviderInput = {
  name: "",
};
