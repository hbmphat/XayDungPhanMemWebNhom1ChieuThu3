"use client";
import { useState } from 'react';
import { userService } from '@services/users/userService';
import { User, UserInput } from '@app/_types/users/user-types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PaginationMeta } from '@app_types/api-response'
export const useUsers = () => {
    // Define States & Hooks
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const router = useRouter();

    // fetchUsers
    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const res = await userService.getAll(page);
            setUsers(res.data || []);
            setMeta(res.meta || null);
        } catch (error) {
            setUsers([]);
            setMeta(null);
        } finally {
            setLoading(false);
        }
    };

    // creatUser
    const creatUser = async (input: UserInput) => {
        setLoading(true);
        try {
            const res = await userService.create(input);
            if (res.success) {
                toast.success(res.message || "Success");
                return true;
            }
            return false;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    };
    // updateUser
    const updateUser = async (id: string, input: UserInput) => {
        setLoading(true);
        try {
            const res = await userService.update(id, input);
            if (res.success) {
                toast.success(res.message || "Success");
                return true;
            }
            return false;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    // deleteUser
    const deleteUser = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
        try {
            const res = await userService.delete(id);
            if (res.success) {
                toast.success(res.message || "Success");
                return true;
            }
            return false;
        } catch (error) {
        }
    };

    return { users, loading, meta, fetchUsers, creatUser, updateUser, deleteUser };
};