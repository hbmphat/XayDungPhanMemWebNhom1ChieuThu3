import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useUserManagement } from "./useUserManagement";
import { useUsers } from "./useUsers";
import { User, UserInput } from "../types/user-types";
import { PaginationMeta } from "@app/_types/api-response";

vi.mock("./useUsers", () => ({
    useUsers: vi.fn(),
}));

describe("useUserManagement Coordinator Hook", () => {
    const mockOnFetch = vi.fn();
    const mockOnCreate = vi.fn();
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const mockSetErrors = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        const mockMeta: PaginationMeta = {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 15,
            from: null,
            to: null,
            path: ""
        };

        (useUsers as Mock).mockReturnValue({
            users: [],
            loading: false,
            meta: mockMeta,
            errors: {},
            onFetch: mockOnFetch,
            onCreate: mockOnCreate,
            onUpdate: mockOnUpdate,
            onDelete: mockOnDelete,
            setErrors: mockSetErrors,
            getFieldError: vi.fn(),
        });
    });

    it("nên gọi onFetch sau 500ms khi searchTerm thay đổi (Debounce)", async () => {
        const { result } = renderHook(() => useUserManagement());

        act(() => {
            result.current.setSearchTerm("quang");
        });

        expect(mockOnFetch).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(mockOnFetch).toHaveBeenCalledWith(1, "quang", "", "");
    });

    it("nên mở Modal và reset lỗi khi gọi handleOpenModal", () => {
        const { result } = renderHook(() => useUserManagement());
        const mockUser = { user_id: "1", user_name: "admin" } as User;

        act(() => {
            result.current.handleOpenModal(mockUser);
        });

        expect(result.current.isModalOpen).toBe(true);
        expect(result.current.currentUser).toEqual(mockUser);
        expect(mockSetErrors).toHaveBeenCalledWith({});
    });

    it("nên gọi onUpdate nếu currentUser tồn tại khi submit form", async () => {
        mockOnUpdate.mockResolvedValue(true);
        const { result } = renderHook(() => useUserManagement());

        act(() => {
            result.current.handleOpenModal({ user_id: "100" } as User);
        });

        const updateData = { user_name: "new_name" } as UserInput;

        await act(async () => {
            await result.current.handleFormSubmit(updateData);
        });

        expect(mockOnUpdate).toHaveBeenCalledWith("100", updateData);
        expect(result.current.isModalOpen).toBe(false);
    });

    it("nên yêu cầu xác nhận trước khi xóa người dùng", async () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
        mockOnDelete.mockResolvedValue(true);

        const { result } = renderHook(() => useUserManagement());

        await act(async () => {
            await result.current.handleDelete("123");
        });

        expect(confirmSpy).toHaveBeenCalled();
        expect(mockOnDelete).toHaveBeenCalledWith("123");
        confirmSpy.mockRestore();
    });
});