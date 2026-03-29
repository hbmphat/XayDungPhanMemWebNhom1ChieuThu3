import { useEffect, useState } from "react";
import { useUsers } from "./useUsers";
import { UserInput } from "@app/_types/users/user-types";

// @app/_hooks/users/useUserManagement.ts
export const useUserManagement = () => {
    // Define States & Hooks
    const { users, loading, meta, fetchUsers, creatUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // fetchUsers
    useEffect(() => {
        fetchUsers(1);
    }, []);

    // CreateUser
    const handleCreateUser = async (data: UserInput) => {
        const success = await creatUser(data);
        if (success) {
            fetchUsers(1);
            setIsModalOpen(false);
        }
    };

    return {
        users,
        loading,
        meta,
        isModalOpen,
        setIsModalOpen,
        handleCreateUser,
        fetchUsers
    };
};