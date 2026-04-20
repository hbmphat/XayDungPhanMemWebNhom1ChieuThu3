export interface Provider {
  provider_id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Sim {
  sim_id: string;
  sim_number: string;
  price: number;
  type: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  provider_id: string;
  provider_name?: string;
}

export interface SimInput {
  sim_number?: string;
  price?: string;
  type?: string;
  description?: string;
  is_active?: boolean;
  provider_id?: string;
}

export const initialSimInput: SimInput = {
  sim_number: "",
  price: "",
  type: "",
  description: "",
  is_active: true,
  provider_id: "",
};
