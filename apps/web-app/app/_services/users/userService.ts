import apiClient from '@app/_shared/api-client'; // Đường dẫn tới file bạn vừa tạo
import { User, UserInput } from '@app/_types/users/user-types';
import { PaginatedResponse, SingleResponse } from '@app/_types/api-response';

export const userService = {
    getAll: (page: number = 1): Promise<PaginatedResponse<User>> =>
        apiClient.get(`/users?page=${page}`),

    getById: (id: string): Promise<SingleResponse<User>> =>
        apiClient.get(`/users/${id}`),

    create: (data: UserInput): Promise<SingleResponse<User>> =>
        apiClient.post('/users', data),

    update: (id: string, data: Partial<UserInput>): Promise<SingleResponse<User>> =>
        apiClient.put(`/users/${id}`, data),

    delete: (id: string): Promise<SingleResponse<User>> =>
        apiClient.delete(`/users/${id}`),
};