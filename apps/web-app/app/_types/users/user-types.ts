export interface User {
  user_id: string;
  role: string;
  status: string;
  user_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  date_of_birth: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface UserInput {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  date_of_birth: string;
  phone: string;
  address: string;
  role?: string;
  status?: string;
}

export const initialUserInput: UserInput = {
  user_name: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  date_of_birth: '',
  phone: '',
  address: '',
  role: 'customer',
  status: 'active',
};