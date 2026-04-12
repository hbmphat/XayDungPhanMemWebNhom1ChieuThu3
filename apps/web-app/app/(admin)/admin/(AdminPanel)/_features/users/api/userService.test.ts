import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { userService } from "./userService";
import apiClient from "@app/_shared/api-client";
import { UserInput } from "../types/user-types";

// 1. Mock apiClient
vi.mock("@app/_shared/api-client", () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

describe("userService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getAll", () => {
        it("nên gọi đúng URL và tham số khi lấy danh sách users", async () => {
            const mockData = { data: [], meta: { total: 0 } };
            (apiClient.get as Mock).mockResolvedValue(mockData);

            const result = await userService.getAll(2, "john", "admin", "active");

            expect(apiClient.get).toHaveBeenCalledWith("/users", {
                params: { page: 2, search: "john", role: "admin", status: "active" },
            });
            expect(result).toEqual(mockData);
        });

        it("nên sử dụng giá trị mặc định page = 1 nếu không truyền", async () => {
            (apiClient.get as Mock).mockResolvedValue({ data: [] });

            await userService.getAll();
            expect(apiClient.get).toHaveBeenCalledWith("/users", {
                params: { page: 1, search: undefined, role: undefined, status: undefined },
            });
        });
    });

    describe("getById", () => {
        it("nên gọi đúng URL với ID tương ứng", async () => {
            const mockUser = { user_id: "1", user_name: "test" };
            (apiClient.get as Mock).mockResolvedValue({ data: mockUser });

            const result = await userService.getById("1");

            expect(apiClient.get).toHaveBeenCalledWith("/users/1");
            expect(result).toEqual({ data: mockUser });
        });
    });

    describe("Create, Update, Delete Operations", () => {
        const mockInput: UserInput = {
            user_name: "new_user",
            email: "new@test.com",
            role: "customer"
        };

        it("nên gọi phương thức POST với dữ liệu đúng khi tạo mới", async () => {
            (apiClient.post as Mock).mockResolvedValue({ success: true });

            await userService.create(mockInput);

            expect(apiClient.post).toHaveBeenCalledWith("/users", mockInput);
        });

        it("nên gọi phương thức PUT với dữ liệu đúng khi cập nhật", async () => {
            (apiClient.put as Mock).mockResolvedValue({ success: true });

            await userService.update("1", mockInput);

            expect(apiClient.put).toHaveBeenCalledWith("/users/1", mockInput);
        });

        it("nên gọi phương thức DELETE khi xóa người dùng", async () => {
            (apiClient.delete as Mock).mockResolvedValue({ success: true });

            await userService.delete("1");

            expect(apiClient.delete).toHaveBeenCalledWith("/users/1");
        });
    });

    describe("Error Handling", () => {
        it("nên ném ra lỗi nếu API bị sập", async () => {
            (apiClient.get as Mock).mockRejectedValue(new Error("Network Error"));

            await expect(userService.getById("1")).rejects.toThrow("Network Error");
        });
    });
});