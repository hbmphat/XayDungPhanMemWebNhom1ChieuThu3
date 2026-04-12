import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { userService } from "./userService";
import apiClient from "@app/_shared/api-client";

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

    describe("Error Handling", () => {
        it("nên ném ra lỗi nếu API bị sập", async () => {

            (apiClient.get as Mock).mockRejectedValue(new Error("Network Error"));

            await expect(userService.getById("1")).rejects.toThrow("Network Error");
        });
    });
});