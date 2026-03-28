export interface User {
  id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  avatar?: string
  created_at?: string;
  updated_at?: string;
}
export interface UserInput {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}