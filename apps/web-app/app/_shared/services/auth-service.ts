import apiClient from "../api-client";

export interface AuthUser {
  user_id: string;
  role: string;
  status: string;
  user_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  date_of_birth: string | null;
  address: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
}

function setAccessTokenCookie(token: string) {
  document.cookie = `access_token=${token}; path=/; max-age=604800; samesite=lax`;
}

function clearAccessTokenCookie() {
  document.cookie = "access_token=; path=/; max-age=0; samesite=lax";
}

export async function login(payload: LoginPayload) {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);

  localStorage.setItem("access_token", response.data.token);
  localStorage.setItem("auth_user", JSON.stringify(response.data.user));
  setAccessTokenCookie(response.data.token);

  return response;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post<AuthResponse>("/auth/register", payload);

  localStorage.setItem("access_token", response.data.token);
  localStorage.setItem("auth_user", JSON.stringify(response.data.user));
  setAccessTokenCookie(response.data.token);

  return response;
}

export async function getMe() {
  return apiClient.get<MeResponse>("/auth/me");
}

export async function logout() {
  try {
    return await apiClient.post<LogoutResponse>("/auth/logout");
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_user");
    clearAccessTokenCookie();
  }
}