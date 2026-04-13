import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useUsers } from "./useUsers";
import { userService } from "@admin.features/users/api/userService";
import { toast } from "sonner";
import { User, UserInput } from "../types/user-types";
import { PaginatedResponse, SingleResponse } from "@app/_types/api-response";

vi.mock("@admin.features/users/api/userService");
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("useUsers Integration Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("nên lấy danh sách người dùng thành công khi gọi onFetch", async () => {
        const mockResponse: PaginatedResponse<User> = {
            success: true,
            message: "Fetched successfully",
            data: [{ user_id: "1", user_name: "admin" } as User],
            meta: {
                total: 1,
                current_page: 1,
                last_page: 1,
                from: 1,
                to: 1,
                per_page: 15,
                path: ""
            }
        };

        // Mock trả về toàn bộ object Response (vì userService trả về cục này)
        (userService.getAll as Mock).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useUsers());

        await act(async () => {
            await result.current.onFetch(1);
        });

        // Đợi State cập nhật để tránh lỗi length = 0
        await waitFor(() => {
            expect(result.current.users).toHaveLength(1);
        });

        expect(userService.getAll).toHaveBeenCalledWith(1, undefined, undefined, undefined);
        expect(result.current.users[0].user_name).toBe("admin");
    });

    it("nên báo lỗi validation và không gọi API nếu dữ liệu input không hợp lệ (onCreate)", async () => {
        const { result } = renderHook(() => useUsers());

        const invalidInput = { user_name: "abc" } as Partial<UserInput>;

        let status;
        await act(async () => {
            status = await result.current.onCreate(invalidInput as UserInput);
        });

        expect(status).toBe(false);
        expect(userService.create).not.toHaveBeenCalled();
        expect(result.current.errors.user_name).toBeDefined();
    });

    it("nên gọi toast success và fetch lại data khi onCreate thành công", async () => {
        const validInput: UserInput = {
            user_name: "quang_admin",
            first_name: "Quang",
            last_name: "Nguyen",
            email: "quang@gmail.com",
            phone: "0987654321",
            address: "HCMC",
            date_of_birth: "2000-01-01",
            password: "password123",
            status: "active",
            role: "admin"
        };

        const mockSuccessResponse: SingleResponse<null> = {
            success: true,
            message: "User created successfully",
            data: null
        };

        const mockFetchResponse: PaginatedResponse<User> = {
            success: true,
            message: "Success",
            data: [],
            meta: { total: 0, current_page: 1, last_page: 1, from: null, to: null, per_page: 15, path: "" }
        };

        (userService.create as Mock).mockResolvedValue(mockSuccessResponse);
        (userService.getAll as Mock).mockResolvedValue(mockFetchResponse);

        const { result } = renderHook(() => useUsers());

        await act(async () => {
            await result.current.onCreate(validInput);
        });

        expect(toast.success).toHaveBeenCalledWith("User created successfully");
        expect(userService.getAll).toHaveBeenCalled();
    });
});