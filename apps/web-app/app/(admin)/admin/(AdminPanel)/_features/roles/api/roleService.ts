import apiClient from '@app/_shared/api-client';

export type Permission = {
  id: string;
  name: string;
};

export type Role = {
  id: string;
  name: string;
  permissions?: Permission[];
};

export type RoleInput = {
  name: string;
};

type ApiListResponse<T> = {
  data: T[];
};

type ApiItemResponse<T> = {
  data: T;
};

export const roleService = {
  getAll: (): Promise<ApiListResponse<Role>> =>
    apiClient.get('/roles'),

  getById: (id: string): Promise<ApiItemResponse<Role>> =>
    apiClient.get(`/roles/${id}`),

  create: (data: RoleInput): Promise<ApiItemResponse<Role>> =>
    apiClient.post('/roles', data),

  update: (id: string, data: { name: string }): Promise<ApiItemResponse<Role>> =>
    apiClient.put(`/roles/${id}`, data),

  delete: (id: string): Promise<{ message: string }> =>
    apiClient.delete(`/roles/${id}`),

  assignPermissions: (
    id: string,
    permission_ids: string[]
  ): Promise<ApiItemResponse<Role>> =>
    apiClient.post(`/roles/${id}/permissions`, { permission_ids }),
};