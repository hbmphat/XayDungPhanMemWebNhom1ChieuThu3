"use client";
import { useCallback, useState } from 'react';
import { userService } from '@services/users/userService';
import { User, UserInput } from '@app/_types/users/user-types';
import { toast } from 'sonner';
import { PaginationMeta } from '@app_types/api-response'
import { useApi } from '@hooks/useApi';
import { validateUser } from '@app/_shared/utils/validation';
export const useUsers = () => {
    // Define States & Hooks
    const [users, setUsers] = useState<User[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const { loading, errors, request, setErrors } = useApi<User[]>();

    // Fetch Users
    const onFetch = useCallback(async (page: number) => {
        const res = await userService.getAll(page);
        if (res.success) {
            setUsers(res.data || []);
            setMeta(res.meta || null);
        } else {
            setUsers([]);
            setMeta(null);
        }
    }, [request]);
    // creatUser
    const onCreate = async (input: UserInput) => {
        const validation = validateUser(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }
        const res = await userService.create(input);
        if (res.success) {
            toast.success(res.message || "Success");
            return true;
        }
        return false;

    };
    // updateUser
    const onUpdate = async (id: string, input: UserInput) => {
        const validation = validateUser(input);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return false;
        }
        const res = await userService.update(id, input);
        if (res.success) {
            toast.success(res.message || "Success");
            return true;
        }
        return false;
    };

    // deleteUser
    const onDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
        const res = await userService.delete(id);
        if (res.success) {
            toast.success(res.message || "Success");
            return true;
        }
        return false;
    };

    return {
        // Data states
        users,
        loading,
        meta,
        errors: errors || {},
        // Actions
        onFetch,
        onCreate,
        onUpdate,
        onDelete,
        setErrors
    };
};