import apiClient from '@services/api-client'; // Đường dẫn tới file bạn vừa tạo
import { User, UserInput } from '@app/_types/users/user-types';
import { BaseResponse } from '@app_types/api';

export const userService = {
    getAll: (page: number = 1) =>
        apiClient.get<BaseResponse<User[]>>(`/users?page=${page}`),

    getById: (id: string) =>
        apiClient.get<BaseResponse<User>>(`/users/${id}`),

    create: (data: UserInput) =>
        apiClient.post<BaseResponse<User>>('/users', data),

    update: (id: string, data: UserInput) =>
        apiClient.put<BaseResponse<User>>(`/users/${id}`, data),

    delete: (id: string) =>
        apiClient.delete<BaseResponse<null>>(`/users/${id}`),
};