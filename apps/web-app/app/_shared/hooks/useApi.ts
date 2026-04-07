import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const request = useCallback(async (
        apiCall: () => Promise<T>
    ): Promise<{ success: boolean; data?: T; error?: string }> => {
        setLoading(true);
        setErrors(null);
        try {
            const result = await apiCall();
            setData(result);
            return { success: true, data: result };
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;

                if (axiosError.response?.status === 422 && axiosError.response.data.errors) {
                    setErrors(axiosError.response.data.errors);
                }

                return {
                    success: false,
                    error: axiosError.response?.data?.message || axiosError.message || 'Validation Error'
                };
            }
            const genericError = err as Error;
            return {
                success: false,
                error: genericError.message || 'An unexpected error occurred'
            };
        } finally {
            setLoading(false);
        }
    }, []);

    const getFieldError = useCallback((field: string) => {
        return errors?.[field]?.[0] || '';
    }, [errors]);

    return { data, loading, errors, request, setErrors, setData, setLoading, getFieldError };
}