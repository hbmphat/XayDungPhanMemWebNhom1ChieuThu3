import { useEffect, useState } from "react";
import { useUsers } from "./useUsers";
import { User, UserInput } from "@app/_types/users/user-types";

// @app/_hooks/users/useUserManagement.ts
export const useUserManagement = () => {
    //  Define States & Hooks
    const { users, loading, meta, errors, onFetch, onCreate, onDelete, onUpdate, setErrors, getFieldError } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    // FetchUsers
    useEffect(() => {
        const timer = setTimeout(() => {
            onFetch(1, searchTerm, roleFilter, statusFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, roleFilter, statusFilter, onFetch]);

    //  OpenModal
    const handleOpenModal = (user: User | null = null) => {
        setCurrentUser(user);
        setIsModalOpen(true);
        setErrors({});
    };
    const handleFormSubmit = async (data: UserInput) => {
        const success = currentUser
            ? await onUpdate(currentUser.user_id, data)
            : await onCreate(data);
        if (success) {
            setIsModalOpen(false);
            onFetch(currentUser ? (meta?.current_page ?? 1) : 1);
        }
    };



    //  DeleteUser
    const handleDelete = async (id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            const success = await onDelete(id);
            if (success) {
                onFetch(meta?.current_page ?? 1);
            }
        }
    };
    return {
        // Data states
        users,
        loading,
        meta,
        errors,
        searchTerm,
        roleFilter,
        statusFilter,
        // Modal states
        isModalOpen,
        currentUser,
        // Actions
        onFetch,
        setIsModalOpen,
        handleOpenModal,
        handleFormSubmit,
        handleDelete,
        setErrors,
        getFieldError,
        setSearchTerm,
        setRoleFilter,
        setStatusFilter
    };
};