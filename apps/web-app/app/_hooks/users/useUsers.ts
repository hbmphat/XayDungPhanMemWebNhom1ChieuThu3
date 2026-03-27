"use client";
import { useState } from 'react';
import { userService } from '@services/users/userService';
import { User, UserInput } from '@app/_types/users/user-types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState(null);
    const router = useRouter();
    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const res = await userService.getAll(page);
            setUsers(res?.data.data || []);
            setMeta(res?.data.meta || null);
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const creatUser = async (input: UserInput) => {
        setLoading(true);
        try {
            const res = await userService.create(input);
            if (res.data.success) {
                toast.success(res.data.message || "Success");
                router.refresh();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    const updateUser = async (id: string, input: UserInput) => {
        setLoading(true);
        try {
            const res = await userService.update(id, input);
            if (res.data.success) {
                toast.success(res.data.message || "Success");
                router.refresh();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    const deleteUser = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
        try {
            await userService.delete(id);
            toast.success('Xóa thành công!');
            fetchUsers();
        } catch (error) {
        }
    };

    return { users, loading, meta, fetchUsers, creatUser, updateUser, deleteUser };
};