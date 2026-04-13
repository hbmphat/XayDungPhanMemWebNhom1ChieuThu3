import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { useApi } from "./useApi";
import axios from "axios";
import { SingleResponse, PaginatedResponse } from "@app/_types/api-response";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("useApi Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("nên xử lý request thành công với SingleResponse", async () => {
        const mockData = { id: 1, name: "Test User" };
        // Giả lập một SingleResponse chuẩn
        const mockResponse: SingleResponse<typeof mockData> = {
            success: true,
            message: "Success",
            data: mockData
        };

        const apiCall = vi.fn().mockResolvedValue(mockResponse);
        const { result } = renderHook(() => useApi<SingleResponse<typeof mockData>>());

        let response: { success: boolean; data?: SingleResponse<typeof mockData>; error?: string } | undefined;

        await act(async () => {
            response = await result.current.request(apiCall);
        });

        expect(result.current.data?.success).toBe(true);
        expect(result.current.data?.data.name).toBe("Test User");
        expect(response?.success).toBe(true);
    });

    it("nên xử lý request thành công với PaginatedResponse", async () => {
        const mockUsers = [{ id: 1, name: "Admin" }];
        const mockPaginatedResponse: PaginatedResponse<(typeof mockUsers)[0]> = {
            success: true,
            message: "Fetched",
            data: mockUsers,
            meta: {
                current_page: 1,
                from: 1,
                last_page: 1,
                path: "/users",
                per_page: 15,
                to: 1,
                total: 1
            }
        };

        const apiCall = vi.fn().mockResolvedValue(mockPaginatedResponse);
        const { result } = renderHook(() => useApi<PaginatedResponse<unknown>>());

        await act(async () => {
            await result.current.request(apiCall);
        });

        expect(result.current.data?.data).toHaveLength(1);
        expect(result.current.data?.meta.total).toBe(1);
    });

    it("nên xử lý lỗi Validation (422) và trích xuất đúng message", async () => {
        const validationErrors = { email: ["Email không hợp lệ"] };
        const axiosError = {
            isAxiosError: true,
            response: {
                status: 422,
                data: { errors: validationErrors, message: "Validation failed" }
            }
        };

        const apiCall = vi.fn().mockRejectedValue(axiosError);
        mockedAxios.isAxiosError.mockReturnValue(true as unknown as boolean);

        const { result } = renderHook(() => useApi());

        let response: { success: boolean; error?: string } | undefined;
        await act(async () => {
            response = await result.current.request(apiCall as () => Promise<unknown>);
        });

        expect(result.current.errors).toEqual(validationErrors);
        expect(result.current.getFieldError("email")).toBe("Email không hợp lệ");
        expect(response?.error).toBe("Validation failed");
    });
});