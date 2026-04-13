"use client";
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { userService } from '@admin.features/users/api/userService';
import { User, UserInput } from '@admin.features/users/types/user-types';
import { PaginationMeta, PaginatedResponse, SingleResponse } from '@app/_types/api-response';
import { useApi } from '@app/_shared/hooks/useApi';
import { validateUserCreate, validateUserUpdate } from '@admin.features/users/utils/user.validation';

export const useUsers = () => {
    // Hook cho Fetch data
    const {
        data: responseData,
        loading: fetchLoading,
        request: fetchRequest,
    } = useApi<PaginatedResponse<User>>();

    // Hook cho Actions
    const {
        loading: actionLoading,
        errors: actionErrors,
        request: actionRequest,
        setErrors,
        getFieldError
    } = useApi<SingleResponse<User>>();

    const [meta, setMeta] = useState<PaginationMeta | null>(null);

    // Fetch Users
    const onFetch = useCallback(async (page: number = 1, search?: string, role?: string, status?: string) => {
        const res = await fetchRequest(() => userService.getAll(page, search, role, status));
        if (res.success && res.data) {
            setMeta(res.data.meta);
        }
    }, [fetchRequest]);

    // Create User
    const onCreate = async (input: UserInput) => {
        const validation = validateUserCreate(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }

        const res = await actionRequest(() => userService.create(input));
        if (res.success) {
            toast.success("User created successfully");
            await onFetch(1);
            return true;
        }
        toast.error(res.error || "Lỗi khi tạo người dùng");
        return false;
    };

    // Update User
    const onUpdate = async (id: string, input: UserInput) => {
        const validation = validateUserUpdate(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }

        const res = await actionRequest(() => userService.update(id, input));
        if (res.success) {
            toast.success("User updated successfully");
            await onFetch();
            return true;
        }
        toast.error(res.error || "Lỗi khi cập nhật");
        return false;
    };

    // Delete User
    const onDelete = async (id: string) => {
        const res = await actionRequest(() => userService.delete(id));
        if (res.success) {
            toast.success("Xóa thành công");
            await onFetch(1);
            return true;
        }
        toast.error(res.error || "Lỗi khi xóa");
        return false;
    };

    return {
        // Data states
        users: responseData?.data || [],
        loading: fetchLoading || actionLoading,
        meta: responseData?.meta || meta,
        errors: actionErrors || {},
        // Actions
        getFieldError,
        onFetch,
        onCreate,
        onUpdate,
        onDelete,
        setErrors
    };
};