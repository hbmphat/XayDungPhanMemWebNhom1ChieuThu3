"use client";
import { useCallback, useState } from 'react';
import { userService } from '@services/users/userService';
import { User, UserInput } from '@app/_types/users/user-types';
import { toast } from 'sonner';
import { PaginationMeta } from '@app_types/api-response'
import { useApi } from '@hooks/useApi';
import { validateUserCreate, validateUserUpdate } from '@app/_shared/utils/validation/_index';
export const useUsers = () => {
    // Define States & Hooks
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const {
        data: usersData,
        loading,
        errors,
        request,
        setErrors,
        getFieldError
    } = useApi<User[]>();

    // Fetch Users
    const onFetch = useCallback(async (page: number, search?: string, role?: string, status?: string) => {
        const res = await request(() => userService.getAll(page, search, role, status));
        if (res.success && res.data) {
            setMeta(res.data.meta || null);
        }
    }, [request]);

    // creatUser
    const onCreate = async (input: UserInput) => {
        const validation = validateUserCreate(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }

        const res = await request(() => userService.create(input));
        if (res.success) {
            toast.success("User created successfully");
            return true;
        }
        toast.error(res.error);
        return false;
    };
    // updateUser
    const onUpdate = async (id: string, input: UserInput) => {
        const validation = validateUserUpdate(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }

        const res = await request(() => userService.update(id, input));
        if (res.success) {
            toast.success("User updated successfully");
            return true;
        }
        return false;
    };
    const onDelete = async (id: string) => {
        const res = await request(() => userService.delete(id));
        if (res.success) {
            toast.success("Xóa thành công");
            await onFetch(1); // Refresh lại danh sách
            return true;
        }
        return false;
    };

    return {
        // Data states
        users: (usersData as any)?.data || (Array.isArray(usersData) ? usersData : []),
        loading,
        meta,
        errors: errors || {},
        // Actions
        getFieldError,
        onFetch,
        onCreate,
        onUpdate,
        onDelete,
        setErrors
    };
};