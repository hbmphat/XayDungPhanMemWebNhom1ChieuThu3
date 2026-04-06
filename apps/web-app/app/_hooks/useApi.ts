import { useState, useCallback } from "react";

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const request = useCallback(async (
        apiCall: () => Promise<any>
    ) => {
        setLoading(true);
        setErrors(null);
        try {
            const response = await apiCall();
            const result = response;
            setData(result);
            return { success: true, data: result };
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
            else if (err.errors) {
                setErrors(err.errors);
            }
            return {
                success: false,
                error: err.response?.data?.message || err.message || 'Validation Error'
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